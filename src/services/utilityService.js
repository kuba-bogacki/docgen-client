import ModalContent from "../constans/modalContent";
import {useState} from "react";

const customCompanyData = (rawCompanyName) => {
  const separators = /[ ,\-"]+/;
  let rawCompanyNameArray = rawCompanyName.split(separators);
  for (let i = 0; i < rawCompanyNameArray.length; i++) {
    rawCompanyNameArray[i] = rawCompanyNameArray[i].charAt(0) + rawCompanyNameArray[i].slice(1).toLowerCase();
  }
  return rawCompanyNameArray.join(" ");
};

const companyName = (rawCompanyName) => {
  return customCompanyData(rawCompanyName).replace(/Spółka Z Ograniczoną Odpowiedzialnością/g, "Sp. z o.o");
};

const parseShareCapital = (number) => {
  return number.replace(",", ".");
};

const parseStreetName = (rawStreetName) => {
  return customCompanyData(rawStreetName).replace("Ul.", "")
};

const modalCompanyDataDisplay = (companyData) => {
  let modalBody = ModalContent.successVerifyCompanyDataBody;
  modalBody = modalBody.replace("{companyName}", companyData.companyName);
  modalBody = modalBody.replace("{companyKrsNumber}", companyData.companyKrsNumber);
  modalBody = modalBody.replace("{companyRegonNumber}", companyData.companyRegonNumber);
  modalBody = modalBody.replace("{companyNipNumber}", companyData.companyNipNumber);
  modalBody = modalBody.replace("{companyRegistrationDate}", companyData.companyRegistrationDate);
  return modalBody;
};

const fetchCompanyMembers = (rawCompanyMembersData) => {
  return rawCompanyMembersData.map((rawMember) => {
    return  {
      userFirstNameI : rawMember.nazwisko.nazwiskoICzlon,
      userFirstNameII : rawMember.nazwisko.nazwiskoIICzlon === undefined ? null : rawMember.nazwisko.nazwiskoIICzlon,
      userLastNameI : rawMember.imiona.imie,
      userLastNameII : rawMember.imiona.imieDrugie === undefined ? null : rawMember.imiona.drugieImie,
      userRole : rawMember.funkcjaWOrganie === "PREZES ZARZĄDU" || rawMember.funkcjaWOrganie === "PREZES" ? "DIRECTOR" : "TRUSTEE",
    };
  });
};

const UtilityService = {
  customCompanyData,
  companyName,
  parseShareCapital,
  parseStreetName,
  modalCompanyDataDisplay,
  fetchCompanyMembers
};

export default UtilityService;