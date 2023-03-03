import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import api from "../../Services/api";
import Button from "../../Components/Button";
import Back from "../../Components/Back";

import "./style.css";

function Building() {
  const [apartmentData, setApartmentData] = useState([]);
  const [buildingData, setBuildingData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    api
      .get("/building")
      .then((res) => {
        setBuildingData(res.data);
      })
      .catch((err) => {
        toast.error("Falha ao fazer requisição.");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .get(`apartment/${id}`)
      .then((res) => {
        setApartmentData(res.data);
      })
      .catch((err) => {
        toast.error("Falha ao fazer requisição.");
        console.log(err);
      });
  }, [id]);

  return (
    <div id="container">
      <div id="containerButtons">
        <Back style={{ width: 318 }} onClick={() => navigate("/building")} />
        {buildingData.map((data, key) => {
          console.log(key, id, key == id);
          return (
            <Button
              style={
                key + 1 == id
                  ? { backgroundColor: "#626262" }
                  : { backgroundColor: "#383838" }
              }
              key={key}
              onClick={() => navigate(`/apartment/${data.id}`)}
            >
              {data.name_building}
            </Button>
          );
        })}
      </div>
      <div>
        <h1>Apartamentos: </h1>
        <div id="containerApartments">
          <ul id="containerUl">
            {apartmentData.map((data, key) => {
              return (
                <li id="containerLi" key={key}>
                  <div
                    id="uniqueApartment"
                    style={
                      data.have_guest == 1
                        ? { backgroundColor: "#3f3" }
                        : { backgroundColor: "#f33" }
                    }
                  >
                    <span className="textApartment">{data.number}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Building;
