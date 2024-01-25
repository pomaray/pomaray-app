type CoverProps = {
    title: string;
    coverImage: string;
  };
  
  function Cover({ title, coverImage }: CoverProps) {
    return (
      <div style={{ height: '30vh', backgroundImage: `url(${coverImage})`, backgroundSize: 'cover', filter: 'grayscale(100%)' }}>
        <h1>{title}</h1>
      </div>
    );
  }
  
  export default Cover;
  