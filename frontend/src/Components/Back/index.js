import { FiArrowLeft } from "react-icons/fi";
import "./style.css";

const Button = ({ onClick }) => {
  return (
    <div id="ButtonContainer" onClick={() => onClick()}>
      <FiArrowLeft id="IconArrowLeft" size={40} color="#fff" />
    </div>
  );
};

export default Button;
