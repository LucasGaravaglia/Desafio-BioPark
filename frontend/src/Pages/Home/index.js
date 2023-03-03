import "./style.css";

import { useNavigate } from "react-router-dom";

import Button from "../../Components/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="buttons">
        <Button onClick={() => navigate("/register-building")}>
          Novo edifício
        </Button>
        <Button onClick={() => navigate("/building")}>Mostrar edifícios</Button>
      </div>
    </div>
  );
}

export default Home;
