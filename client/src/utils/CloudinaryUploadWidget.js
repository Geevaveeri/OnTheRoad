// made with help from Roee Ben Ari

import React from "react";
import { useMutation } from '@apollo/client';
import { ADD_IMAGE } from './mutations';


const CloudinaryUploadWidget = params => {
    const [addImage] = useMutation(ADD_IMAGE);

    const handleUpload = async (url) => {
        try {
            await addImage({
                variables: {
                    url: url,
                    alt: 'User Image',
                    _id: params.roadtripId
                }
            })


        }
        catch (error) {
            console.log(error);
        }
    }

    var myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dne2ggd07",
            uploadPreset: "rnnidcq5",
            sources: ['local', 'url', 'facebook', 'instagram', 'google_drive']
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                handleUpload(result.info.secure_url);
            }
        }
    );

    return (
        <button id="upload_widget" className="submitBtn" onClick={() => myWidget.open()}>
            Upload
        </button>
    );
}

export default CloudinaryUploadWidget;
