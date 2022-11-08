const CardTechno = ({ cardName, cardImage, imageDescription }) => {
  return (
    <div className="flex flex-col text-center w-all gap-4 p-5">
      <img alt={imageDescription} src={cardImage} />
      <figcaption>
        <p>{cardName}</p>
      </figcaption>
    </div>
  );
};

export default CardTechno;
