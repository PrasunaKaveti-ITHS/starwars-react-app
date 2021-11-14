import React, { useState } from "react";
import { Table } from 'react-bootstrap';
function People({ charData }) {
  const { name, birth_year, height, mass } = charData;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="card_container"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        data-allow-toggle
      >
        <h4>{name}</h4>
      </button>
      {isOpen && (
        <div className="card_content">
          <Table className="text-left border-success border border-dashed text-uppercase" striped bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Year born </th>
                <th>Height</th>
                <th>Mass</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{name}</td>
                <td>{birth_year}</td>
                <td>{height}</td>
                <td>{mass}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default People;
