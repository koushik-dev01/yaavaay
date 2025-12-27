import React from "react";
import './textStyle.css';
import TextList from "./TextList";
import columns from './images/columns.svg';

export default function TextSection({cName, textObject, backgroundImage }) {
  function conditionalRender(segment, index) {
    if (segment.type === "text") return <p key={index} className={segment.class} dangerouslySetInnerHTML={{ __html: segment.content }}></p>
    else if (segment.type === "list") return <TextList key={index} segmentClass={segment.class} listObject={segment.content} />
    else if (segment.type === "columns") return <img className={segment.class} key={index} src={columns} />
  }

  return (
    <section className="text-section"
      style={{
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <span className='bible-quote-test'>.</span>
    <div className="section-container">
      <h1>{textObject.title}</h1>
        {textObject.content.map((content, i) => {
          return <div key={i}>
            <h2>{content.title}</h2>
            <div className={"text-section-div"}>
              {content.text.map((segment, index) => {
                return conditionalRender(segment, 'child' + index)
              })}
            </div>
          </div>
        })}
        <p className={`footer ${cName}`}>{textObject.footer}</p>
    </div>
    </section>
  );
}