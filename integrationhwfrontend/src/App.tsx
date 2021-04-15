import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container, Button, Form, Navbar, Table } from "react-bootstrap";
import axios from 'axios';

type SearchResponse = {
  ArtistName: string,
  ArtTitle: string
}

type DemoResponse = {
  Artistname: string,
  Birthplace: string,
  Buried: string
}

function App() {

  const [searchInput, setInput] = useState("");
  const [demoResponse, setDemoResponse] = useState([] as DemoResponse[]);
  const [searchResponse, setSearchResponse] = useState([] as SearchResponse[]);
  const [searchPressed, setSearchPressed] = useState(false);
  const [valid, setValid] = useState(true);
  const [demodatapressed, setDemoPressed] = useState(false);


  const searchUrl = "http://localhost:5000/artpiecequery";
  const addDataUrl = "http://localhost:5000/addDataDemo";
  const getTestDataUrl = "http://localhost:5000/getAddDataDemoData";

  let content = useRef(<div></div>);

  let sendSearchQuery = async () => {
    axios.get(searchUrl, { params: { name: searchInput } })
      .then((response) => {
        setSearchPressed(true);
        setSearchResponse(response.data);
        setValid(false);
      });
  }

  useEffect(() => {
    if (searchPressed) {
      if (searchResponse.length > 0) {
        content.current = (
          <Table striped bordered hover>
            <thead>
              <th>#</th>
              <th>Artist name</th>
              <th>Artpiece</th>
            </thead>
            <tbody>
              {searchResponse.map((item) => (
                <tr>
                  <td>{searchResponse.indexOf(item) + 1}</td>
                  <td>{item.ArtistName}</td>
                  <td>{item.ArtTitle}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      }
      else {
        content.current = (
          <div>No artists found.</div>
        )
      }
      setValid(true);
      setSearchResponse([] as SearchResponse[]);
      setSearchPressed(false);
    }
    else if (demodatapressed) {
      if (demoResponse.length > 0) {
        content.current = (
          <Table striped bordered hover>
            <thead>
              <th>#</th>
              <th>Artist name</th>
              <th>Birthplace</th>
              <th>Grave</th>
            </thead>
            <tbody>
              {demoResponse.map((item) => (
                <tr>
                  <td>{demoResponse.indexOf(item) + 1}</td>
                  <td>{item.Artistname}</td>
                  <td>{item.Birthplace}</td>
                  <td>{item.Buried}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      }
      else {
        <div>You haven't pressed the button " Add "birthplace" and "buried" to 3 artists!" yet! No data to show.</div>
      }
      setValid(true);
      setDemoPressed(false);
      setDemoResponse([] as DemoResponse[]);
    }
  }, [valid]);

  let addDataQuery = async () => {
    await axios.post(addDataUrl);
  }

  let getAddedDataQuery = async () => {
    axios.get(getTestDataUrl)
      .then((response) => {
        setDemoPressed(true);
        setDemoResponse(response.data);
        setValid(false);
      });
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-center" style={{ color: "white", fontWeight: 90 }}>
        Integration Techniques Homework
      </Navbar>
      <Container className="mt-5">
        <Row>
          <Col className="mr-5" sm={6}>
            <Form>
              <Form.Group as={Row} controlId="Search">
                <Col>
                  <Form.Control type="text" placeholder="Search for an artist..." value={searchInput} onChange={e => setInput(e.target.value)} />
                </Col>
                <Form.Label>
                  <Button variant="primary" onClick={sendSearchQuery}>
                    Search!
                </Button>
                </Form.Label>
              </Form.Group>
            </Form>
            <Row>
              <Button className="mt-5 ml-3" onClick={getAddedDataQuery}>
                Press me to get the birthplace, and graves of the demo artists!
            </Button>
            </Row>
            <Row>
              <Button className="mt-5 ml-3" onClick={addDataQuery}>
                Add "birthplace" and "buried" to 3 artists!
        </Button>
            </Row>
          </Col>
          <Col>
            {content.current}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
