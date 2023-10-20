import React, { useState } from "react";
import InputFile from "../../helpers/UI/InputFile";
function AvatarElement({logoURL,file, setFile}) {

    const imageUrl = file ? URL.createObjectURL(file) : logoURL;

    return (
        <div>
            <img src={imageUrl} alt ='image'></img>
            <InputFile setFile={setFile} />
        </div>
    );
}

export default AvatarElement;