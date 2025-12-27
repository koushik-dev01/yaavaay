export default function TextList({ segmentClass, listObject }) {
  return (
    <ul className={segmentClass}>
      {listObject.map((listElement, index) => {
        return <li key={index} dangerouslySetInnerHTML={{ __html: listElement }}></li>
      })}
    </ul>
  );
}