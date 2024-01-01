const items = Array.from({ length: 20 }).map((_, index) => (
    <div
      key={index}
      style={{
        height: index % 2 ? "200px" : "250px",
        background: "#" + Math.floor(Math.random() * 16777215).toString(16),
        margin: "10px",
        borderRadius: "8px"
      }}
    />
  ));