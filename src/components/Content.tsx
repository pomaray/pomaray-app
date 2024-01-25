type ContentProps = {
    sections: { id: string; title: string; content: string }[];
  };
  
  function Content({ sections }: ContentProps) {
    return (
      <div style={{ marginLeft: '20%', padding: '20px' }}>
        {sections.map((section) => (
          <div key={section.id} id={section.id}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default Content;
  