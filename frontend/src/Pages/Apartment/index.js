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
  const [selected, setSelected] = useState({
    id: 0,
    number: 0,
    building_id: 0,
    have_guest: 0,
    name_guest: "",
    contact_guest: "",
    price: 0,
    busy_until: "",
  });
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

  const handlerDetails = (data) => {
    setSelected(data);
  };
  const Details = () => {
    let target = new Date(selected.busy_until);
    let actual = new Date();
    let dif = (target.getTime() - actual.getTime()) / (1000 * 60 * 60 * 24);
    return (
      <div className="divDetails">
        <a>Numero do Apartamento: {selected.number}</a>
        <a>{selected.have_guest == 1 ? "Ocupado" : "Livre"}</a>
        <a>Preço: {selected.price}</a>
        {selected.have_guest == 1 ? (
          <>
            <a>Nome do hóspede: {selected.name_guest}.</a>
            <a>Contato do hóspede: {selected.contact_guest}.</a>

            <a>Ficará livre em: {Math.floor(dif)} dias. </a>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <div id="container">
      <div id="containerButtons">
        <Back style={{ width: 318 }} onClick={() => navigate("/building")} />
        {buildingData.map((data, key) => {
          return (
            <Button
              className="customButtonApartment"
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
                    onClick={() => handlerDetails(data)}
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
        <Details />
      </div>
      <Toaster />
    </div>
  );
}

export default Building;
