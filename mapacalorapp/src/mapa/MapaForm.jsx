
import React, { Component } from "react";
import Card from 'components/Card/Card';
import { Taskmapa } from "components/Tasks/Taskmapa.jsx";


import {
    Grid,
    Row,
    Col
  } from "react-bootstrap";


export class MapaForm extends Component {
    render() {
        return (
            <div className="content Incidentes-container"  >
                <Grid fluid>
                    <Row>
                        <Col md={2}>
                            <Card
                                category="Inicidentes"
                                content={
                                    <div className="table-full-width">
                                        <table className="table">
                                            <Taskmapa />
                                        </table>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default MapaForm;
