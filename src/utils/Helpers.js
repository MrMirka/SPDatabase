import { DOMParser } from 'xmldom';

export function readChunks(buffer) {
    const chunks = [];
    const view = new DataView(buffer);

    // PNG файл начинается с 8-байтовой сигнатуры
    let offset = 8;

    while (offset < buffer.byteLength) {
        const length = view.getUint32(offset);
        offset += 4;

        const typeArray = new Uint8Array(buffer, offset, 4);
        const type = String.fromCharCode.apply(null, typeArray);
        offset += 4;

        const data = new Uint8Array(buffer, offset, length);
        offset += length;

        const crc = view.getUint32(offset);
        offset += 4;

        chunks.push({ length, type, data, crc });
    }

    return chunks;
}

export function getChankByType(file, type) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const chunks = readChunks(arrayBuffer);
            const iTXtChunk = chunks.find(chunk => chunk.type === type);
            if (iTXtChunk) {
                const textDecoder = new TextDecoder('utf-8');
                const descriptionText = textDecoder.decode(iTXtChunk.data);

                const doc = new DOMParser().parseFromString(descriptionText, 'text/xml');
                const descriptions = doc.getElementsByTagName('dc:description');

                if (descriptions.length > 0) {
                    const description = descriptions[0].textContent;
                    resolve(description);
                } else {
                    console.log('Описание <dc:description> не найдено');
                    resolve('');
                }
            } else {
                reject(new Error('Chunk type ' + type + ' not found.'));
            }
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsArrayBuffer(file);
    });
}
