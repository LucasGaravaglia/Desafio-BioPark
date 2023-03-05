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
        toast.error("Falha ao fazer requisição.", err);
      });
  }, []);

  const requestApartments = () => {
    api
      .get(`apartment/${id}`)
      .then((res) => {
        res.data.sort((a, b) => {
          if (a.number > b.number) {
            return 1;
          }
          if (a.number < b.number) {
            return -1;
          }
          return 0;
        });
        setApartmentData(res.data);
      })
      .catch((err) => {
        toast.error("Falha ao fazer requisição.");
      });
  };

  useEffect(() => {
    requestApartments();
  }, [id]);

  const handlerDetails = (data) => {
    setSelected(data);
  };

  const dif =
    new Date(selected.busy_until) < new Date()
      ? 0
      : (new Date(selected.busy_until) - new Date()) / (1000 * 60 * 60 * 24);

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
        <div className="containerTitles">
          {" "}
          <h1>Apartamentos: </h1>
          <h5>Selecione o apartamento que deseja ocupar/desocupar. </h5>
        </div>

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
                        ? data.id == selected.id
                          ? { backgroundColor: "#555" }
                          : { backgroundColor: "#f33" }
                        : data.id == selected.id
                        ? { backgroundColor: "#555" }
                        : { backgroundColor: "#3f3" }
                    }
                  >
                    <span className="textApartment">{data.number}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="containerDetailsConfig">
          <div className="divDetails">
            <a>Apartamento número {selected.number}</a>
            <a
              onClick={() => {
                const copySelected = { ...selected };
                if (copySelected.have_guest == 1) copySelected.have_guest = 0;
                else copySelected.have_guest = 1;
                setSelected(copySelected);
              }}
              className={`isOccupied ${
                selected.have_guest == 1 ? "occupied" : "free"
              }`}
            >
              {selected.have_guest == 1 ? "Ocupado" : "Livre"}
            </a>
            <form>
              <a>Preço por mês: </a>
              <input
                type="number"
                step="any"
                value={selected.price}
                onChange={(event) => {
                  const copySelected = { ...selected };
                  copySelected.price = parseFloat(event.target.value);
                  setSelected(copySelected);
                }}
              />
            </form>
            {selected.have_guest == 1 ? (
              <>
                <form>
                  <a>Nome do hóspede: </a>
                  <input
                    step="any"
                    value={selected.name_guest}
                    onChange={(event) => {
                      const copySelected = { ...selected };
                      copySelected.name_guest = event.target.value;
                      setSelected(copySelected);
                    }}
                  />
                </form>
                <form>
                  <a>Contato do hóspede: </a>
                  <input
                    step="any"
                    value={selected.contact_guest}
                    onChange={(event) => {
                      const copySelected = { ...selected };
                      copySelected.contact_guest = event.target.value;
                      setSelected(copySelected);
                    }}
                  />
                </form>
                <form>
                  <a>
                    Ficará livre em: {Math.floor(dif)} dias.
                    <input
                      type="date"
                      onChange={(event) => {
                        const copySelected = { ...selected };
                        copySelected.busy_until = event.target.value;
                        setSelected(copySelected);
                      }}
                    />
                  </a>
                </form>
              </>
            ) : (
              <></>
            )}
          </div>
          <Button
            className="buttonDetails"
            onClick={() => {
              api
                .put(`apartment/${parseInt(selected.id)}`, selected)
                .then(() => {
                  toast.success("Alteração feita com sucesso.");
                  requestApartments();
                })
                .catch(() => {
                  toast.error("Ocorreu um erro, tente novamente.");
                });
            }}
          >
            Salvar
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Building;
