import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Store from "./pages/Store";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import "./styles.css";

function App() {
  return (
    <>

    <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Store />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </Container>

    </>
  );
}

export default App;
