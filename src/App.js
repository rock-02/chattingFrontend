import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/authentication/Authentication";
import HomePage from "./pages/homepage/HomePage";
import Message from "./pages/message/Message";
import { useEffect } from "react";
import { getProfileAction } from "./redux/Auth/auth.action";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  // console.log(jwt);

  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getProfileAction(jwt));
    console.log(auth.user);
  }, []);
  return (
    <div className="App ">
      {/* <Authentication /> */}
      <Routes>
        <Route
          path="/*"
          element={auth.user ? <HomePage /> : <Authentication />}
        />
        <Route path="/*" element={<HomePage />} />
        <Route path="/message" element={<Message />} />
      </Routes>
    </div>
  );
}

export default App;
