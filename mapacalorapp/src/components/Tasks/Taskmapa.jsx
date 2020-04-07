 
import React, { Component } from "react";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";


export class Taskmapa extends Component {
  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };
  render() {
    const tasks_title = [
      'Covid-19',
      "Extorsion",
      "Sicariato",
      "Maras",
      'Drogas'
    ];
    var tasks = [];
    var number;
    for (var i = 0; i < tasks_title.length; i++) {
      number = "checkbox" + i;
      tasks.push(
        <tr key={i}>
          <td>
            <Checkbox
              number={number}
            />
          </td>
          <td>{tasks_title[i]}</td>
        </tr>
      );
    }
    return <tbody>{tasks}</tbody>;
  }
}

export default Taskmapa;
