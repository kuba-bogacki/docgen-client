import "./SectionStyle.css";

function Section({sectionNumber, sectionHeader, sectionText}) {
  return (
    <div className={`section-container-${sectionNumber}`} id={`section-${sectionNumber}`}>
      <div className={`container-text-${sectionNumber}`}>
        <h2>{sectionHeader}</h2>
        <p>{sectionText}</p>
      </div>
    </div>
  );
}

export default Section;