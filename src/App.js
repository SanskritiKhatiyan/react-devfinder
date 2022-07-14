import "./App.css";
import Search from "./Search";
import DisplayData from "./DisplayData";
import { useState } from "react";
import sunIcon from "./images/icons8-sun.svg";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [userdata, setUserdata] = useState();

  const onSubmitHandler = (data) => {
    console.log(data);
    setUserdata(data);
  };

  return (
    <BrowserRouter>
      <div className="header">
        <h3 className="devfinder"> devfinder</h3>
        <div className="theme">
          <div> LIGHT</div>
          <img src={sunIcon} />
        </div>
      </div>
      <Search onSubmit={onSubmitHandler} />
      {userdata ? <DisplayData userdata={userdata} /> : null}
    </BrowserRouter>
  );
}

export default App;
