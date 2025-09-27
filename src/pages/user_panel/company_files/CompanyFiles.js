import "./CompanyFilesStyle.css";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import LocalStorageService from "../../../services/localStorageService";
import DocumentService from "../../../services/documentService";
import style from "../../../constans/overwriteMaterialUiStyle";
import {addDays, format, parse} from "date-fns";
import {DateField} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

function CompanyFiles() {

  const [documentDetailsModalOpen, setDocumentDetailsModalOpen] = useState(false);
  const [financialStatementModalOpen, setFinancialStatementModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(true);
  const [documentsArray, setDocumentsArray] = useState([]);
  const [documentPdfDetail, setDocumentPdfDetail] = useState("");
  const [periodStartDate, setPeriodStartDate] = useState(null);
  const [periodEndDate, setPeriodEndDate] = useState(null);
  const [companyEquity, setCompanyEquity] = useState("");
  const [companyTotalSum, setCompanyTotalSum] = useState("");
  const [companyNetProfit, setCompanyNetProfit] = useState("");
  const [companyNetIncrease, setCompanyNetIncrease] = useState("");
  const [managementBoardPresident, setManagementBoardPresident] = useState("");
  const [supervisoryBoardChairman, setSupervisoryBoardChairman] = useState("");
  const [supervisoryBoardMembers, setSupervisoryBoardMembers] = useState([""]);

  useEffect(() => {
    loadDefaultDate();
    getCompanyDocuments();
  }, []);

  const loadDefaultDate = () => {
    const formattedDateString = format(new Date(), "dd-MM-yyyy");
    setPeriodStartDate(formattedDateString);
    setPeriodEndDate(formattedDateString);
  };

  const closeDocumentDetailsModal = () => {
    URL.revokeObjectURL(documentPdfDetail);
    setDocumentDetailsModalOpen(false);
  };

  const openFinancialStatementModal = () => {
    setFinancialStatementModalOpen(true);
  };

  const closeFinancialStatementModal = () => {
    loadDefaultDate();
    eraseStates();
    setFinancialStatementModalOpen(false);
  };

  const eraseStates = () => {
    setCompanyEquity("0.00");
    setCompanyTotalSum("0.00");
    setCompanyNetProfit("0.00");
    setCompanyNetIncrease("0.00");
    setManagementBoardPresident("");
    setSupervisoryBoardChairman("");
    setSupervisoryBoardMembers([]);
  };

  const handlePeriodStartDateChange = (date) => {
    setPeriodStartDate(dateFormater(date));
  };

  const handlePeriodEndDateChange = (date) => {
    setPeriodEndDate(dateFormater(date));
  };

  const dateFormater = (date) => {
    const parsedDate = parse(`${date}`, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", new Date());
    return format(addDays(parsedDate, 1), "dd-MM-yyyy");
  }

  const modalDateFormatter = (selectedDate) => {
    let dateArray = selectedDate.split("-");
    return dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
  };

  const formatToMoney = (value) => {
    if (!value) {
      return "0.00";
    }
    const number = parseFloat(value.replace(/\D/g, "")) / 100;
    return number.toFixed(2);
  };

  const handleMemberChange = (index, value) => {
    const updated = [...supervisoryBoardMembers];
    updated[index] = value;
    setSupervisoryBoardMembers(updated);
  };

  const createNewSupervisoryBoardMember = () => {
    setSupervisoryBoardMembers([...supervisoryBoardMembers, ""]);
  };

  const deleteLastSupervisoryBoardMember = () => {
    setSupervisoryBoardMembers(supervisoryBoardMembers.slice(0, -1));
  };

  const convertBinaryString = (pdfContent) => {
    const binary = atob(pdfContent);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  };

  const createUrlObject = (bytes) => {
    const blob = new Blob([bytes], {type : "application/pdf"});
    return URL.createObjectURL(blob);
  };

  const showDocumentsDetails = (documentId) => {
    DocumentService.getDetailedCompanyDocument(documentId)
      .then((response) => {
        if (response.status === 200) {
          let bytes = convertBinaryString(response.data.evidenceContent);
          let url = createUrlObject(bytes);
          setDocumentPdfDetail(url);
          setDocumentDetailsModalOpen(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const getCompanyDocuments = () => {
    DocumentService.getAllCompanyDocuments()
        .then((response) => {
          setDocumentsArray(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
  };

  const editDocumentName = (documentId) => {
    // DocumentService.editEvidenceName(documentId)
    //   .then((response) => {
    //     return response;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
  };

  const deleteDocument = (documentId) => {
    DocumentService.deleteCompanyDocument(documentId)
      .then((response) => {
        if (response.status === 200) {
          setDocumentsArray(previousDocuments => previousDocuments.filter(evidence => evidence.evidenceId !== documentId));
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const createNewFinancialStatement = () => {
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
    };

    DocumentService.createNewFinancialStatement(documentData)
      .then((response) => {
        if (response.status === 201) {
          getCompanyDocuments();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    eraseStates();
    setFinancialStatementModalOpen(false);
  };

  return (
    <div className="company-files-container">
      <header className="company-files-header">
        <h1>Company Files</h1>
      </header>
      <hr className="company-files-hr-line animate__animated animate__fadeInLeftBig"></hr>
      <main className="company-files-body">
        <div className="company-files-navigation-box">
          <CreateIcon fontSize="large" className={`company-files-icon-container ${isCreateMode ? "company-files-icon-picked" : ""}`}
            onClick={() => setIsCreateMode(true)}/>
          <SearchIcon fontSize="large" className={`company-files-icon-container ${isCreateMode ? "" : "company-files-icon-picked"}`}
            onClick={() => setIsCreateMode(false)}/>
        </div>
        <div className="company-files-generator-box">
          {isCreateMode ? (
            <>
              <div className="company-files-generator-card" onClick={() => openFinancialStatementModal()}>
                <h3>Financial statement</h3>
              </div>
              <div className="company-files-generator-card">
                <h3>Other document</h3>
              </div>
            </>
          ) : (
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
          )}
        </div>
      </main>
      <hr className="company-files-hr-line animate__animated animate__fadeInLeftBig"></hr>
      {financialStatementModalOpen &&
        <div className="company-files-modal-container">
          <Dialog open={financialStatementModalOpen} onClose={closeFinancialStatementModal}>
            <DialogTitle sx={style.modalTitleStyle}>Create new financial statement</DialogTitle>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DialogContent>
                <Box sx={style.customModalBoxStyle}>
                  <DateField label="Start Date" defaultValue={dayjs(modalDateFormatter(periodStartDate))} format="DD-MM-YYYY" sx={style.customEventFieldsStyle} onChange={handlePeriodStartDateChange}/>
                  <DateField label="End Date" defaultValue={dayjs(modalDateFormatter(periodEndDate))} format="DD-MM-YYYY" sx={style.customEventFieldsStyle} onChange={handlePeriodEndDateChange}/>
                </Box>
                <Box sx={style.customModalBoxStyle}>
                  <TextField required label="Company Equity" sx={style.customTextFieldStyle} value={formatToMoney(companyEquity)} onChange={(e) => setCompanyEquity(e.target.value.replace(/\D/g, ""))}/>
                </Box>
                <Box sx={style.customModalBoxStyle}>
                  <TextField required label="Company Total Sum" sx={style.customTextFieldStyle} value={formatToMoney(companyTotalSum)} onChange={(e) => setCompanyTotalSum(e.target.value.replace(/\D/g, ""))}/>
                </Box>
                <Box sx={style.customModalBoxStyle}>
                  <TextField required label="Company Net Profit" sx={style.customTextFieldStyle} value={formatToMoney(companyNetProfit)} onChange={(e) => setCompanyNetProfit(e.target.value.replace(/\D/g, ""))}/>
                </Box>
                <Box sx={style.customModalBoxStyle}>
                  <TextField required label="Company Net Increase" sx={style.customTextFieldStyle} value={formatToMoney(companyNetIncrease)} onChange={(e) => setCompanyNetIncrease(e.target.value.replace(/\D/g, ""))}/>
                </Box>
                <Box sx={style.customModalBoxStyle}>
                  <TextField required label="Management Board President" sx={style.customTextFieldStyle} value={managementBoardPresident} onChange={(e) => setManagementBoardPresident(e.target.value)}/>
                </Box>
                <Box sx={style.customModalBoxStyle}>
                  <TextField required label="Supervisory Board Chairman" sx={style.customTextFieldStyle} value={supervisoryBoardChairman} onChange={(e) => setSupervisoryBoardChairman(e.target.value)}/>
                </Box>
                <>
                  {supervisoryBoardMembers.map((member, index) => (
                    <Box key={index} sx={style.customModalBoxStyle}>
                      <TextField label={`Supervisory Board Member ${index + 1}`} sx={style.customBoardMemberFieldsStyle} value={member} onChange={(e) => handleMemberChange(index, e.target.value)}/>
                      <DeleteForeverIcon className="list-element-icon-box" fontSize="large" sx={{color : "#a69044"}} onClick={() => deleteLastSupervisoryBoardMember()}/>
                    </Box>
                  ))}
                </>
                <Box sx={style.addExtraBoxStyle}>
                  <AddCircleIcon className="list-element-icon-box" fontSize="large" sx={{color : "#a69044"}} onClick={() => createNewSupervisoryBoardMember()}/>
                </Box>
              </DialogContent>
              <DialogActions className="modal-actions-buttons-container">
                <Button sx={style.loginButtonStyle} onClick={() => createNewFinancialStatement()}>Create</Button>
              </DialogActions>
            </LocalizationProvider>
          </Dialog>
        </div>
      }
      {documentDetailsModalOpen &&
        <div className="company-files-modal-container">
          <Dialog open={documentDetailsModalOpen} onClose={closeDocumentDetailsModal} PaperProps={{sx: style.modalDialogStyle}}>
            <DialogTitle sx={style.modalTitleStyle}>Document details</DialogTitle>
            <DialogContent>
              <iframe className="company-files-pdf-box" src={documentPdfDetail} title="PDF Viewer"/>
            </DialogContent>
          </Dialog>
        </div>
      }
    </div>
  );
}

export default CompanyFiles;