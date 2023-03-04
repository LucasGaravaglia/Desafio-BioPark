import "./style.css";

import { useNavigate } from "react-router-dom";
import api from "../../Services/api";

import Button from "../../Components/Button";
import DefinePrices from "../../Components/DefinePrices";
import { useEffect, useState } from "react";

function Home() {
  const [nameBuilding, setNameBuilding] = useState("");
  const [numberApartments, setNumberApartments] = useState(0);
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState(100.95);
  const [defaultPrice, setDefaultPrice] = useState(100.95);
  const [building_id, setBuilding_id] = useState(1);

  const [flag, setFlag] = useState(false);
  const apartmentsArray = Array.from(
    { length: numberApartments },
    (_, index) => index + 1
  );

  const store = () => {
    const tempArray = [];
    apartmentsArray.map((d) => {
      if (selected.includes(d)) {
        tempArray.push({ number: d, price: price });
      } else {
        tempArray.push({ number: d, price: defaultPrice });
      }
    });
    tempArray.map((d) => {
      api.post("apartment", {
        building_id: building_id,
        number: d.number,
        price: d.price,
      });
    });
    console.log(tempArray);
    handlerConfirm();
  };

  const navigate = useNavigate();

  const handlerConfirm = () => {
    if (!flag) {
      api
        .post("building", { name_building: nameBuilding })
        .then((d) => {
          setBuilding_id(d.data.id);
          setFlag(!flag);
        })
        .catch((err) => console.log(err));
    } else {
      setFlag(!flag);
      navigate("/");
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
        <div className="containerApartments">
          <ul>
            {apartmentsArray.map((data, key) => (
              <li
                key={key}
                onClick={() => {
                  if (selected.includes(data))
                    setSelected(selected.filter((item) => item !== data));
                  else setSelected([...selected, data]);
                }}
                className={
                  selected.includes(data) ? "liSelected" : "liNotSelected"
                }
              >
                <a>{data}</a>
              </li>
            ))}
          </ul>
          <div className="containerSidebar">
            <form>
              <a>Preço: </a>
              <input
                type={"number"}
                placeholder={price}
                value={price}
                onChange={(event) => {
                  setPrice(parseFloat(event.target.value));
                }}
              />
            </form>
            <form>
              <a>Preço padrão: </a>
              <input
                type={"number"}
                placeholder={defaultPrice}
                value={defaultPrice}
                onChange={(event) => {
                  setDefaultPrice(parseFloat(event.target.value));
                }}
              />
            </form>
            <Button className="customButton" onClick={() => store()}>
              Salvar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
