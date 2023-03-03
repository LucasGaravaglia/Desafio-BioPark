import "./style.css";

import { useNavigate } from "react-router-dom";
import api from "../../Services/api";

import Button from "../../Components/Button";
import { useState } from "react";

function Home() {
  const [nameBuilding, setNameBuilding] = useState("");
  const [numberApartments, setNumberApartments] = useState(0);
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();
  const handlerConfirm = () => {
    if (!flag) {
      api.post("building", { name_building: nameBuilding });
      setFlag(!flag);
    }
  };

  return (
    <div className="containerRegisterBuilding">
      {!flag ? (
        <div className="buildingData">
          <input
            className="inputBuildingData"
            placeholder="Nome do edifício"
            value={nameBuilding}
            onChange={(event) => {
              setNameBuilding(event.target.value);
            }}
          ></input>
          <input
            type="number"
            className="inputBuildingData"
            placeholder="Quantidade de apartamentos"
            value={numberApartments}
            onChange={(event) => {
              setNumberApartments(event.target.value);
            }}
          ></input>
          <Button onClick={() => handlerConfirm()}>Continuar</Button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Home;
