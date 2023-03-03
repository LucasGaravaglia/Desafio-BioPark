import "./style.css";
// import { Link } from "react-router-dom";

import Button from "../../Components/Button";

function Home() {
  return (
    <div id="container">
      <Button onClick={() => console.log("Teste")}>Botão</Button>
    </div>
  );
}

export default Home;
