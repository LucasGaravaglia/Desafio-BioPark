import "./style.css";

import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Button from "../../Components/Button";

function Home() {
  const navigate = useNavigate();

  const handlerShowBuilding = () => {
    return navigate("/building");
  };

  return (
    <div className="container">
      <div className="buttons">
        <Button onClick={() => toast("Em desenvolvimento")}>
          Novo edifício
        </Button>
        <Button onClick={() => handlerShowBuilding()}>Mostrar edifícios</Button>
      </div>
      <Toaster />
    </div>
  );
}

export default Home;
