import React from 'react';
import { CameraVideo, GeoAlt, Image, Mic } from 'react-bootstrap-icons';
import ImageRender from './ImageRender.js';

const IconTasks = (props) => {

    const handleRemoveImage = (index) => {
        const updatedCapturedData = props.capturedData.filter((item, i) => i !== index);
        props.setCapturedData(updatedCapturedData);
    };

    const handleUploadPicture = (event) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (event) => {
            const selectedFile = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = () => {
                props.setCapturedData([...props.capturedData, { type: 'image', data: reader.result }]);
            };
        };
        fileInput.click();
    };

    const handleGetLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const locationData = {
                type: 'location',
                data: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                },
            };
            props.setCapturedData([...props.capturedData, { type: 'location', data: locationData }]);
        }, (error) => {
            console.error('Error getting user location:', error);
        });
    };

    const handleOpenCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((stream) => {
                console.log('Camera stream:', stream);
            })
            .catch((error) => {
                console.error('Error accessing camera:', error);
            });
    };

    const handleRecordAudio = () => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((stream) => {
                const mediaRecorder = new MediaRecorder(stream);
                const audioChunks = [];

                mediaRecorder.ondataavailable = (event) => {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    console.log('Recorded audio blob:', audioBlob);
                };

                mediaRecorder.start();
                setTimeout(() => {
                    mediaRecorder.stop();
                }, 5000);
            })
            .catch((error) => {
                console.error('Error accessing audio:', error);
            });
    };

    return (
        <div>
            <div className="mx-3">
                {props.capturedData.map((item, index) => {
                    if (item.type === 'image') {
                        return (
                            <ImageRender key={`image-${index}`} item={item} index={index} handleRemoveImage={handleRemoveImage} />
                        )
                    }
                    return null;
                })}
            </div>

            <div className="btn-group" role="group" aria-label="Icon buttons">
                <button type="button" className="btn" onClick={handleUploadPicture}>
                    <Image size={20} />
                </button>
                <button type="button" className="btn" onClick={handleOpenCamera}>
                    <CameraVideo size={20} />
                </button>
                <button type="button" className="btn" onClick={handleGetLocation}>
                    <GeoAlt size={20} />
                </button>
                <button type="button" className="btn" onClick={handleRecordAudio}>
                    <Mic size={20} />
                </button>
            </div>
        </div>
    );
};

export default IconTasks;
