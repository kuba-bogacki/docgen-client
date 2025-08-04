import "./CompanyFilesStyle.css";
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import Box from '@mui/material/Box';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {useEffect, useState} from "react";
import LocalStorageService from "../../../services/localStorageService";
import DocumentService from "../../../services/documentService";

function CompanyFiles() {

  const [isCreateIcon, setIsCreateIcon] = useState(true);
  const [boxContent, setBoxContent] = useState(<></>);
  const [documentsArray, setDocumentsArray] = useState([]);
  const [periodStartDate, setPeriodStartDate] = useState("");
  const [periodEndDate, setPeriodEndDate] = useState("");
  const [companyEquity, setCompanyEquity] = useState("");
  const [companyTotalSum, setCompanyTotalSum] = useState("");
  const [companyNetProfit, setCompanyNetProfit] = useState("");
  const [companyNetIncrease, setCompanyNetIncrease] = useState("");
  const [managementBoardPresident, setManagementBoardPresident] = useState("");
  const [supervisoryBoardChairman, setSupervisoryBoardChairman] = useState("");
  const [supervisoryBoardMembers, setSupervisoryBoardMembers] = useState([]);

  useEffect(() => {
    loadDefaultBox();
    getCompanyDocuments();
  }, []);

  const loadDefaultBox = () => {
    setBoxContent(
      <>
        <div className="company-files-generator-card" onClick={() => showDocumentTypes()}>
          <h3>Financial statement</h3>
        </div>
        <div className="company-files-generator-card" onClick={() => showPreviousDocuments()}>
          <h3>Other document</h3>
        </div>
      </>
    )
  }

  const showDocumentTypes = () => {
    console.log("Hello");
  }

  const showPreviousDocuments = () => {
    console.log("Hello");
  }

  const getCompanyDocuments = () => {
    DocumentService.getAllCompanyDocuments()
      .then((response) => {
        setDocumentsArray(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const showDocumentsDetails = (documentId) => {
    DocumentService.getDetailedCompanyDocument(documentId)
      .then((response) => {
        console.log(response.data)
        console.log(response.data.evidenceContent)
        // const blob =  response.data.evidenceContent.blob();
        // if (blob.type !== 'application/pdf') {
        //   console.warn('Niepoprawny typ pliku:', blob.type);
        // }
        return response;
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const editDocumentName = (documentId) => {
    // DocumentService.editEvidenceName(documentId)
    //   .then((response) => {
    //     return response;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
  }

  const deleteDocument = (documentId) => {
    DocumentService.deleteCompanyDocument(documentId)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const createNewDocument = () => {
    let documentData = {
      companyId : LocalStorageService.getCurrentCompany(),
      periodStartDate : periodStartDate,
      periodEndDate : periodEndDate,
      companyEquity : companyEquity,
      companyTotalSum : companyTotalSum,
      companyNetProfit : companyNetProfit,
      companyNetIncrease : companyNetIncrease,
      managementBoardPresident : managementBoardPresident,
      supervisoryBoardChairman : supervisoryBoardChairman,
      supervisoryBoardMembers : supervisoryBoardMembers
    }

  }

  const focusOnBox = (createNewDocument) => {
    if (createNewDocument === true) {
      setBoxContent(
        <>
          <div className="company-files-generator-card" onClick={() => showDocumentTypes()}>
            <h3>Financial statement</h3>
          </div>
          <div className="company-files-generator-card" onClick={() => showPreviousDocuments()}>
            <h3>Other document</h3>
          </div>
        </>
      );
      setIsCreateIcon(true);
    } else {
      setBoxContent(
        <>
          <div className="company-files-documents-list">
            <h3>List Documents</h3>
            {documentsArray.map((document, index) =>
              <div className="company-files-list-box" key={index}>
                <h4>{index + 1}. {document.evidenceName}</h4>
                <div className="company-files-list-element-icon-box">
                  <VisibilityIcon className="list-element-icon-box" fontSize="medium" onClick={() => showDocumentsDetails(document.evidenceId)}/>
                  <SaveAsIcon className="list-element-icon-box" fontSize="medium" onClick={() => editDocumentName(document.evidenceId)}/>
                  <DeleteForeverIcon className="list-element-icon-box" fontSize="medium" onClick={() => deleteDocument(document.evidenceId)}/>
                </div>
              </div>
            )}
          </div>
        </>
      );
      setIsCreateIcon(false);
    }
  };

  return (
    <div className="company-files-container">
      <header className="company-files-header">
        <h1>Company Files</h1>
      </header>
      <hr className="company-files-hr-line animate__animated animate__fadeInLeftBig"></hr>
      <main className="company-files-body">
        <div className="company-files-navigation-box">
          <CreateIcon fontSize="large" className={`company-files-icon-container ${isCreateIcon ? "company-files-icon-picked" : ""}`}
            onClick={() => focusOnBox(true)}/>
          <SearchIcon fontSize="large" className={`company-files-icon-container ${isCreateIcon ? "" : "company-files-icon-picked"}`}
            onClick={() => focusOnBox(false)}/>
        </div>
        <div className="company-files-generator-box">
          {boxContent}
        </div>
      </main>
      <hr className="company-files-hr-line animate__animated animate__fadeInLeftBig"></hr>
    </div>
  );
}

export default CompanyFiles;