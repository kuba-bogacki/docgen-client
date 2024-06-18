import "./CompanyFilesStyle.css";

function CompanyFiles() {

  return (
    <div className="company-files-container">
      <header className="company-files-header">
        <h1>Company Files</h1>
      </header>
      <hr className="company-files-hr-line animate__animated animate__fadeInLeftBig"></hr>
      <main className="company-files-body">
        <div className="company-files-card">
          <h3>Generate New Document</h3>
        </div>
        <div className="company-files-card">
          <h3>Show Previous Documents</h3>
        </div>
      </main>
      <hr className="company-files-hr-line animate__animated animate__fadeInLeftBig"></hr>
    </div>
  );
}

export default CompanyFiles;