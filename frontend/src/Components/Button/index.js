import "./styles.css";

const Button = ({
  isSelected = false,
  children,
  onClick,
  style,
  className,
}) => {
  const Selected = isSelected ? "selected" : "";
  return (
    <div
      style={style}
      className={`ButtonContainer ${Selected} ${className}`}
      onClick={() => onClick()}
    >
      <h1 className="TextButton">{children}</h1>
    </div>
  );
};

export default Button;
