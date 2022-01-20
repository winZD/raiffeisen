import React, { useEffect, useMemo, useState, useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "./Bills.scss";
import { Container, Button, Card, Modal, Row, Col } from "react-bootstrap";
import { Table } from "../Table/Table";
import { fetchIncomingPayments } from "../../Data/fetchIncomingPayments";
import { fetchOutgoingPayments } from "../../Data/fetchOutgoingPayments";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import axios from "axios";

const options = [
  { value: 0, label: "----" },
  { value: 1, label: "Svi računi" },
];

export const Bills = () => {
  const arrayIncomePayment = [
    {
      date: "07.01.2022.",
      payer: "Maria Marić",
      amount: 200,
    },
    {
      date: "09.01.2022.",
      payer: "Mario MArić",
      amount: 200,
    },
    {
      date: "05.05.2022.",
      payer: "Antonia Ježić",
      amount: 200,
    },
    {
      date: "05.01.2022.",
      payer: "Ivan Marić",
      amount: 200,
    },
    {
      date: "12.01.2022.",
      payer: "Poslodavac",
      amount: 200,
    },
    {
      date: "05.01.2022.",
      payer: "Emanuel višić",
      amount: 200,
    },
  ];
  const arrayOutcomePayment = [
    {
      date: "05.01.2022.",
      payer: "Maria Marić",
      amount: 100,
    },
    {
      date: "05.01.2022.",
      payer: "Mario MArić",
      amount: 100,
    },
    {
      date: "05.01.2022.",
      payer: "CROATIA AIRLINES",
      amount: 100,
    },
    {
      date: "05.01.2022.",
      payer: "Ivan Marić",
      amount: 100,
    },
    {
      date: "05.01.2022.",
      payer: "Poslodavac",
      amount: 100,
    },
    {
      date: "05.01.2022.",
      payer: "Emanuel višić",
      amount: 100,
    },
  ];

  const pushToArrayIncome = (data) => {
    console.log("klik-----", data);

    arrayIncomePayment.push(data);
    console.log(arrayIncomePayment);
  };

  const pushToArrayOutcome = (data) => {
    arrayOutcomePayment.push(data);
    console.log(arrayOutcomePayment);
  };

  const [hideElement, setHideElement] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [tableData, setTableData] = useState([]);

  const [tableData2, setTableData2] = useState([]);

  const [sumIncome, setSumIncome] = useState();

  const [sumOutcome, setSumOutcome] = useState();

  const [accountBallance, setAccountBallance] = useState(2000);

  const [remainingBallance, setRemainingBallance] = useState(1000);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    setTableData(arrayIncomePayment);
    setTableData2(arrayOutcomePayment);
  }, []);

  const handleChangeSelectView = (e) => {
    setSelection(e.value);

    console.log(selection);
  };

  const [selection, setSelection] = useState(options[1].value);

  const calculateIncomingPayment = (data) => {
    setAccountBallance((prevAmount) => prevAmount + parseFloat(data.amount));
    setRemainingBallance((prevAmount) => prevAmount + parseFloat(data.amount));
  };

  const calculateOutgoingPayment = (data) => {
    setAccountBallance((prevAmount) => prevAmount - parseFloat(data.amount));
    setRemainingBallance((prevAmount) => prevAmount - parseFloat(data.amount));
  };

  const tableColumns = useMemo(() => [
    {
      Header: "Datum",
      accessor: "date",
      Cell: (props) => {
        return props.value
          ? format(new Date(props.value), "dd.MM.yyyy.")
          : null;
      },
    },

    {
      Header: "Platitelj",
      accessor: "payer",
    },
    {
      Header: "Iznos",
      accessor: "amount",
      Cell: (props) => {
        let calculatedSumIncome = parseFloat(
          props.rows.reduce((sum, row) => Number(row.values.amount) + sum, 0)
        );

        console.log("---------->", calculatedSumIncome);

        setSumIncome(
          //parseFloat(calculatedSumIncome).toFixed(2).replace(".", ",")
          parseFloat(calculatedSumIncome).toFixed(2)
        );

        return (
          <div style={{ color: "green" }}>
            <strong>
              {parseFloat(props.value).toFixed(2).replace(".", ",") + " kn"}
            </strong>
          </div>
        );
      },
    },
  ]);

  const tableColumns2 = useMemo(() => [
    {
      Header: "Datum",
      accessor: "date",
      Cell: (props) => {
        return props.value
          ? format(new Date(props.value), "dd.MM.yyyy.")
          : null;
      },
    },

    {
      Header: "Platitelj",
      accessor: "payer",
    },
    {
      Header: "Iznos",
      accessor: "amount",
      Cell: (props) => {
        let calculatedSumOutcome = parseFloat(
          props.rows.reduce((sum, row) => Number(row.values.amount) + sum, 0)
        );
        setSumOutcome(parseFloat(calculatedSumOutcome).toFixed(2));
        return (
          <div style={{ color: "red" }}>
            <strong>
              {"-" +
                parseFloat(props.value).toFixed(2).replace(".", ",") +
                " kn"}
            </strong>
          </div>
        );
      },
    },
  ]);

  const handleSubmitIncome = (values) => {
    saveDataIncome(values);
  };

  const handleSubmitOutcome = (values) => {
    saveDataOutcome(values);
  };

  const saveDataIncome = (data) => {
    pushToArrayIncome(data);
    setTableData((arr) => [...arr, data]);
    calculateIncomingPayment(data);
    handleCloseModal();
  };

  const saveDataOutcome = (data) => {
    pushToArrayOutcome(data);
    setTableData2((arr2) => [...arr2, data]);
    calculateOutgoingPayment(data);
    handleCloseModal();
  };

  const getValidationSchema = () => {
    return Yup.object().shape({
      date: Yup.date().required("Obavezno polje"),
      payer: Yup.string()
        .required("Obavezno polje")
        .matches(
          /^[a-zA-ZČčĆćŠšĐđŽž]{1,}(?: [a-zA-ZČčĆćŠšĐđŽž]{1,})+$/,

          "Obvezni podaci su ime i prezime, a dozvoljena samo slova!"
        ),
      amount: Yup.number()
        .required("Upišite običan ili decimalni broj!")
        .test(
          "Is positive?",
          "Iznos ne smije biti negativan",
          (value) => value > 0
        )
        .positive("Broj mora biti pozitivan"),
    });
  };
  return (
    <Container fluid>
      <Tabs
        defaultActiveKey="home"
        transition={true}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Stanje">
          <Select
            options={options}
            placeholder="Select Option"
            defaultValue={{ label: "Svi računi", value: 1 }}
            onChange={handleChangeSelectView}
          />
          <p></p>
          {selection === 1 && (
            <div style={{ display: "flex", direction: "row" }}>
              <Card
                onClick={() => setHideElement(false)}
                style={{
                  width: "18rem",
                  backgroundColor: !hideElement && "yellow",
                  cursor: "pointer",
                }}
              >
                <Card.Body>
                  <Card.Title>{"Moj tekući račun"}</Card.Title>

                  <Card.Text>HR12345575874849</Card.Text>
                  <br />
                  <Card.Title>{`${parseFloat(accountBallance)
                    .toFixed(2)
                    .replace(".", ",")} HRK`}</Card.Title>

                  <Card.Text>{`Raspoloživo ${parseFloat(remainingBallance)
                    .toFixed(2)
                    .replace(".", ",")} HRK`}</Card.Text>
                </Card.Body>
              </Card>
              <Card
                onClick={() => setHideElement(true)}
                style={{
                  width: "18rem",
                  marginLeft: "15px",
                  cursor: "pointer",
                  backgroundColor: hideElement && "yellow",
                }}
              >
                <Card.Body>
                  <Card.Title>Kunski žiro račun</Card.Title>

                  <Card.Text>HR12345575874849</Card.Text>
                  <br />
                  <Card.Title>{`${parseFloat(50000)
                    .toFixed(2)
                    .replace(".", ",")} HRK`}</Card.Title>

                  <Card.Text>{`${parseFloat(4000)
                    .toFixed(2)
                    .replace(".", ",")} HRK`}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}
          {selection === 1 && !hideElement && (
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "50%", margin: "5px 5px 5px 5px" }}>
                  <strong>{"Uplata"}</strong>
                  <Table columns={tableColumns} data={tableData} />
                </div>
                <div style={{ width: "50%", margin: "5px 5px 5px 5px" }}>
                  <strong>{"Isplata"}</strong>
                  <Table columns={tableColumns2} data={tableData2} />
                </div>
              </div>
              <Button
                onClick={handleShowModal}
                style={{ backgroundColor: "yellow", color: "black" }}
              >
                <strong>{"+"}</strong>
              </Button>
            </div>
          )}

          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Container fluid>
              <Row> </Row>
            </Container>

            <Tabs
              defaultActiveKey="uplate"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="uplate" title="Uplate">
                <Formik
                  enableReinitialize={true}
                  initialValues={{ date: new Date(), payer: "", amount: "" }}
                  validationSchema={getValidationSchema()}
                  onSubmit={(values) => handleSubmitIncome(values)}
                >
                  {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                      <Modal.Header closeButton>
                        <Modal.Title>{"Uplate"}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Container fluid>
                          <Row>
                            <label>{"Datum"}</label>
                            <Col>
                              {" "}
                              <DatePicker
                                selected={values.date}
                                dateFormat="d.MM.yyyy"
                                className="form-control"
                                name="date"
                                minDate={new Date()}
                                onChange={(date) => setFieldValue("date", date)}
                              />
                              {errors.date && touched.date ? (
                                <div style={{ color: "red" }}>
                                  {errors.date}
                                </div>
                              ) : null}
                            </Col>
                          </Row>
                          <Row>
                            <label>{"Platitelj"}</label>
                            <Col>
                              {" "}
                              <Field
                                type="payer"
                                name="payer"
                                className="form-control"
                              />
                              {errors.payer && touched.payer ? (
                                <div style={{ color: "red" }}>
                                  {errors.payer}
                                </div>
                              ) : null}
                            </Col>
                          </Row>
                          <Row>
                            <label>{"Količina"}</label>
                            <Col>
                              {" "}
                              <Field
                                type="amount"
                                name="amount"
                                className="form-control"
                              />
                              {errors.amount && touched.amount ? (
                                <div style={{ color: "red" }}>
                                  {errors.amount}
                                </div>
                              ) : null}
                            </Col>
                          </Row>
                        </Container>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleCloseModal}
                        >
                          {"Odustani"}
                        </Button>
                        <Button type="submit">{"Uplata"}</Button>
                      </Modal.Footer>
                    </Form>
                  )}
                </Formik>
              </Tab>
              <Tab eventKey="isplate" title="Isplate">
                <Formik
                  enableReinitialize={true}
                  initialValues={{ date: new Date(), payer: "", amount: "" }}
                  validationSchema={getValidationSchema()}
                  onSubmit={(values) => handleSubmitOutcome(values)}
                >
                  {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                      <Modal.Header closeButton>
                        <Modal.Title>{"Isplate"}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Container fluid>
                          <Row>
                            <label>{"Datum"}</label>
                            <Col>
                              {" "}
                              <DatePicker
                                selected={values.date}
                                dateFormat="d.MM.yyyy"
                                className="form-control"
                                name="date"
                                minDate={new Date()}
                                onChange={(date) => setFieldValue("date", date)}
                              />
                              {errors.date && touched.date ? (
                                <div style={{ color: "red" }}>
                                  {errors.date}
                                </div>
                              ) : null}
                            </Col>
                          </Row>
                          <Row>
                            <label>{"Platitelj"}</label>
                            <Col>
                              {" "}
                              <Field
                                type="payer"
                                name="payer"
                                className="form-control"
                              />
                              {errors.payer && touched.payer ? (
                                <div style={{ color: "red" }}>
                                  {errors.payer}
                                </div>
                              ) : null}
                            </Col>
                          </Row>
                          <Row>
                            <label>{"Količina"}</label>
                            <Col>
                              {" "}
                              <Field
                                type="amount"
                                name="amount"
                                className="form-control"
                              />
                              {errors.amount && touched.amount ? (
                                <div style={{ color: "red" }}>
                                  {errors.amount}
                                </div>
                              ) : null}
                            </Col>
                          </Row>
                        </Container>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleCloseModal}
                        >
                          {"Odustani"}
                        </Button>
                        <Button type="submit">{"Isplata"}</Button>
                      </Modal.Footer>
                    </Form>
                  )}
                </Formik>
              </Tab>
            </Tabs>
          </Modal>
        </Tab>
        <Tab eventKey="profile" title="Prometi">
          <h1>2</h1>
        </Tab>
      </Tabs>
    </Container>
  );
};
