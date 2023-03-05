import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import api from "../../Services/api";
import Button from "../../Components/Button";
import Back from "../../Components/Back";

import "./style.css";

function Building() {
  const [buildingData, setBuildingData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/building")
      .then((res) => {
        setBuildingData(res.data);
      })
      .catch((err) => {
        toast.error("Falha ao fazer requisição.", err);
      });
  }, []);

  return (
    <div id="containerBuilding">
      <div id="containerBack">
        <Back onClick={() => navigate("/")} />
      </div>
      <div id="buttons">
        {buildingData.map((data, key) => {
          return (
            <Button
              className="customButtonBuilding"
              key={key}
              onClick={() => navigate(`/apartment/${data.id}`)}
            >
              {data.name_building}
            </Button>
          );
        })}
      </div>
      <Toaster />
    </div>
  );
}

export default Building;
