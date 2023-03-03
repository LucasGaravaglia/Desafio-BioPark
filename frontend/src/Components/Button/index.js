import "./styles.css";

const Button = ({ isSelected = false, children, onClick, style }) => {
  const Selected = isSelected ? "selected" : "";
  return (
    <div
      style={style}
      className={`ButtonContainer ${Selected}`}
      onClick={() => onClick()}
    >
      <h1 className="TextButton">{children}</h1>
    </div>
  );
};

export default Button;
