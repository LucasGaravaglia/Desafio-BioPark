import { FiArrowLeft } from "react-icons/fi";
import "./style.css";

const Button = ({ onClick, style }) => {
  return (
    <div id="ButtonContainer" style={style} onClick={() => onClick()}>
      <FiArrowLeft id="IconArrowLeft" size={40} color="#fff" />
    </div>
  );
};

export default Button;
