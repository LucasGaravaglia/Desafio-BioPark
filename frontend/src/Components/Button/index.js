import "./styles.css";

const Button = ({ isSelected = false, children, onClick }) => {
  const Selected = isSelected ? "selected" : "";
  return (
    <div className={`ButtonContainer ${Selected}`} onClick={() => onClick()}>
      <h1 className="TextButton">{children}</h1>
    </div>
  );
};

export default Button;
