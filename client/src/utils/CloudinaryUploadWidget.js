// made with help from Roee Ben Ari

import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
    componentDidMount() {
        var myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dne2ggd07",
                uploadPreset: "rnnidcq5",
                sources: ['local', 'url', 'facebook', 'instagram', 'google_drive']
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log("Done! Here is the image info: ", result.info.secure_url);
                }
            }
        );
        document.getElementById("upload_widget").addEventListener(
            "click",
            function () {
                myWidget.open();
            },
            false
        );
    }

    render() {
        return (
            <button id="upload_widget" className="cloudinary-button">
                Upload
            </button>
        );
    }
}

export default CloudinaryUploadWidget;
