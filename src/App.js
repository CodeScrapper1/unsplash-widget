import { useState } from "react";
import Images from "./components/Images";
import { ImCross } from "react-icons/im";

function App() {
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div className="App">
      {openPopup ? <Images /> : null}
      <label onClick={() => setOpenPopup(!openPopup)}>
        <div className="widget-button">
          {!openPopup ? (
            <img
              src="https://res.cloudinary.com/my-umt-final-project/image/upload/v1715509445/logo_oh2ljc.png"
              width={40}
            />
          ) : (
            <ImCross />
          )}
        </div>
      </label>
    </div>
  );
}

export default App;
