import React from "react";

const SecondForm = ({ setFormData, data }) => {
    const handleSubmit = () => {
        setFormData(data, 0);
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-lg btn-primary w-100 submit mt-3"
                style={{ backgroundColor: "#7E56DA" }}
                onClick={handleSubmit}
            >
                <i className="la la-spinner fa-spin d-none" /> Back
            </button>
        </>
    );
};

export default SecondForm;
