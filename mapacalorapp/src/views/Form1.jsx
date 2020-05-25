import React, { Component } from "react";
import {
  Form,
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { TasksForm } from "components/Tasks/TasksForm.jsx";



export default class Form1 extends Component {
  render() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        setValidated(true);
    };
    return (
      <div className="content">
        <Grid fluid>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <Card
                title="Crear Ficha"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                      properties={[
                        {
                          label: "Ticket",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "numero de ticket",
                          defaultValue: "Creative Code Inc.",
                        },
                        {
                          label: "Latitud",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          defaultValue: "Latitudy",
                          disabled: true
                        },
                        {
                          label: "Longitud",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Longitud",
                          disabled: true,
                        },
                        {
                          label: "Usuaurio",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Usuario",
                          disabled: true
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                      properties={[
                        {
                          label: "#Incidente",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Numero de Incidente",
                          disabled: true
                        },
                        {
                          label: "Municipio",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Municpio",
                          disabled: true
                        },
                        {
                          label: "Departamento",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Departamento",
                          disabled: true
                        },
                        {
                          label: "Fecha",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Fecha"
                        }                      
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Direccion",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Direccion de Evento",
                        }
                      ]}
                    />
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Descripcion del Evento</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Descripcion del Evento"
                            />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col md={3}>
                      <Card
                        title="Despacho"
                        stats="Actualizado: en unos segundos"
                        statsIcon="fa fa-history"
                        content={
                          <div className="table-full-width">
                            <table className="table">
                              <TaskForm />
                            </table>
                          </div>
                        }
                      />
                    </Col>
                    <Col md={3}>
                      <FormGroup controlId="formControlsEvento">
                          <ControlLabel>Evento</ControlLabel>
                          <FormControl as="select">
                            <option>1</option>
                          </FormControl>
                        </FormGroup>
                      </Col>



                    </Row>


 


                    <Button bsStyle="info" pullRight fill type="submit">
                    Guardar
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />



            </Col>
            <Col md={4}>
              
            </Col>
          </Row>
        </Form>
        </Grid>

      </div>
    );
  }
}