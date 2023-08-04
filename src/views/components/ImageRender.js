import React, { useState } from 'react';

const ImageRender = ({ item, index, handleRemoveImage }) => {
    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    return (
        <div
            style={{
                position: 'relative',
                display: 'inline-block',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img key={index} src={item.data} alt={`img ${index + 1}`} style={{ height: "50pcx", width: "50px", marginRight: "5px" }} />
            {hover && (
                <div
                    className="hover"
                    onClick={() => handleRemoveImage(index)}>
                    <span style={{ color: '#fff', fontSize: '24px' }}>×</span>
                </div>
            )}
        </div>
    );
};

export default ImageRender;
