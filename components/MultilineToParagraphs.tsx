interface MultilineToParagraphsProps {
  text: string;
}

export default function MultilineToParagraphs(
  props: MultilineToParagraphsProps
) {
  return (
    <>
      {props.text.split("\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </>
  );
}
