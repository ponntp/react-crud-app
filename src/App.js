import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import EditProduct from "./components/product/edit.component";
import ProductList from "./components/product/list.component";
import CreateProduct from "./components/product/create.component";


function App() {
  return (
    <div style={{ backgroundColor: "#DDDDDD" }}>
      <Router>
        <Navbar style={{ backgroundColor: "#45526C" }}>
          <Container>
            <Link
              to={"/"}
              style={{ fontFamily: "Droid Sans", fontSize: 25 }}
              className="navbar-brand text-white"
            >
              My Portfolio
            </Link>
          </Container>
        </Navbar>

        <div className="container">
          <h1 className="hero__heading">
            <span
              style={{
                fontFamily: "Droid Sans",
                fontSize: 50,
                fontWeight: "bold",
                textAlign: "center",
                paddingLeft: 50,
              }}
            >
              Hello, My name is{" "}
            </span>
            <span
              style={{
                fontFamily: "Droid Sans",
                fontSize: 40,
                textAlign: "center",
                paddingLeft: 50,
              }}
            >
              Nattapon Khajornkasirat
            </span>
          </h1>
          
        </div>

        <Container className="mt-5">
          <Row>
            <Col md={12}>
              <Routes>
                <Route path="/product/create" element={<CreateProduct />} />
                <Route path="/product/edit/:id" element={<EditProduct />} />
                <Route exact path="/" element={<ProductList />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
