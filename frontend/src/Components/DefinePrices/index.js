import { useState } from "react";
import Button from "../Button";
import "./style.css";

function DefinePrices({ numberApartments, setPriced, handlerSave }) {
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState(100.05);
  const [defaultPrice, setDefaultPrice] = useState(100.05);
  console.log(numberApartments);
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
      return;
    });
    tempArray.sort((a, b) => {
      if (a.number > b.number) {
        return 1;
      }
      if (a.number < b.number) {
        return -1;
      }
      return 0;
    });
    setPriced(tempArray);
    handlerSave();
  };
  return (
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
            className={selected.includes(data) ? "liSelected" : "liNotSelected"}
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
  );
}

export default DefinePrices;
