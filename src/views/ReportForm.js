import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import FirstForm from './forms/FirstForm';
import SecondForm from './forms/SecondForm';

const ReportForm = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [firstFormData, setFirstFormData] = useState({
    symptoms: [],
    location: "",
    information: "",
    files: [],
    private: false,

  });

  const setFormData = (data, page) => {
    {/* future logic for more pages  */ }
    if (page === 1) {
      setFirstFormData(data)
    } else {
      {/* future logic for more pages  */ }
    }
    setCurrentPage(page)
  }

  return (
    <div className="card m-3">
      <div className="card-body">
        {currentPage === 0 &&
          <FirstForm setFormData={setFormData} data={firstFormData} />
        }
        {currentPage === 1 &&
          <SecondForm setFormData={setFormData} />
        }
        {/* future logic for more pages  */}
      </div>
    </div>
  );
};

export default ReportForm;
