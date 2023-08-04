import React, { useEffect, useState } from "react";
import IconTasks from '../components/IconTasks';

const FirstForm = ({ setFormData, data }) => {
    const symptoms = ['Nausea', 'Diarrhea', 'Vomiting', 'Something else'];
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [isNotSure, setIsNotSure] = useState(false);
    const [fromWhere, setFromWhere] = useState("");
    const [body, setBody] = useState("");
    const [capturedData, setCapturedData] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false);

    useEffect(() => {
        if (data) {
            setSelectedSymptoms(data.symptoms);
            setIsNotSure(data.isNotSure);
            setFromWhere(data.information);
            setBody(data.body);
            setCapturedData(data.files);
            setIsPrivate(data.private);
        }
    }, [data])

    const handleToggle = (event) => {
        const isChecked = event.target.checked;
        setIsPrivate(isChecked);
    };

    const handleSymptomChange = (symptom) => {
        if (selectedSymptoms.includes(symptom)) {
            setSelectedSymptoms(selectedSymptoms.filter((item) => item !== symptom));
        } else {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        }
    };

    const handleSubmit = () => {
        let data = {
            symptoms: selectedSymptoms,
            location: isNotSure ? "Not sure" : fromWhere,
            information: body,
            files: capturedData,
            private: isPrivate,

        }
        setFormData(data, 1);
    };


    // For live location search - My api does not work
    const [address, setAddress] = useState('');
    const onPlaceChanged = (place) => {
        const { formatted_address } = place;
        setAddress(formatted_address);
    }

    return (
        <>
            <div>
                <h3 className="black-text ">Report a food safety issue</h3>
                <h3 className="black-text ">Protect Others!</h3>

                <p className="m-1 mt-3 black-text">I am reporting</p>
                <div className="m-1 scrollable-row row symptoms-container">
                    {symptoms.map((symptom, index) => (
                        <button
                            className={`symptom-btn ${selectedSymptoms.includes(symptom) ? "selected" : ""}`}
                            data-mapping={index + 1}
                            onClick={() => handleSymptomChange(symptom)}
                            key={index}
                        >
                            {symptom}
                        </button>
                    ))}
                </div>
            </div>

            <div className="d-flex justify-content-between m-1 mt-3">
                <label
                    className={`clickable-label ${isNotSure ? 'gray-text' : 'black-text'}`}
                    onClick={() => setIsNotSure(false)}
                >
                    Got Sick from
                </label>
                <label
                    className={`clickable-label ${!isNotSure ? 'gray-text' : 'black-text'}`}
                    onClick={() => setIsNotSure(true)}
                >
                    I'm not sure
                </label>
            </div>

            <div>
                {!isNotSure &&
                    <input value={fromWhere} onChange={(e) => setFromWhere(e.target.value)} type="text" className="form-control" name="title" placeholder="Where? e.g. Moe's Tavern" autoComplete="off" />
                }

                {/* <div>
          // for live location search
            <AddressAutocomplete />
          </div> */}

                <div className="form-group mt-2 position-relative">
                    <div className="icon-buttons position-absolute bottom-0 mt-2">
                        <IconTasks capturedData={capturedData} setCapturedData={setCapturedData} />
                        <div className="form-check form-switch mx-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked={isPrivate}
                                onChange={handleToggle}
                            />
                            <label className="form-check-label">Make it private</label>
                        </div>
                    </div>

                    <textarea
                        className="form-control mt-2"
                        placeholder="What happened and when? Describe your situation"
                        value={body}
                        style={{ height: "200px" }}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
            </div>
            <button
                type="button"
                className="btn btn-lg btn-primary w-100 submit mt-3"
                style={{ backgroundColor: "#7E56DA" }}
                onClick={handleSubmit}
            >
                <i className="la la-spinner fa-spin d-none" /> Continue
            </button>
        </>
    );
};

export default FirstForm;
