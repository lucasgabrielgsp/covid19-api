import React, { useEffect, useState } from "react";

import api from "../services/api";
import "./styles.css";

export default function Covid() {
  const [cases, setCases] = useState([]);
  const [countries, setCountries] = useState("Brazil");
  const [titleCountries, setTitleCountries] = useState();

  useEffect(
    () => {
      api.get(`country/${countries}/status/confirmed`).then((response) => {
        setCases(response.data);
      });
    },[countries],[cases]);

  useEffect(() => {
    try {
      const redu = cases.reduce((a, obj) => obj.Country);
      setTitleCountries(redu);
    } catch (error) {
      setTitleCountries("Nenhum país encontrado.");
    }
  }, [ cases ]);


  return (
    <div>
      <nav><h1 className='titlepage'>Covid-19</h1></nav>


        <div className="top">
          <h3>Escolha um país:</h3>

        <select onChange={(e) => setCountries(e.target.value)}>
          <option>Brazil</option>
          <option>Argentina</option>
        </select>
        </div>

      
        <ul>
          <li>1 = Janeiro</li>
          <li>2 = Fevereiro</li>
          <li>3 = Março</li>
          <li>4 = Abril</li>
          <li>5 = Maio</li>
          <li>6 = Junho</li>
          <li>7 = Julho</li>
          <li>8 = Agosto</li>
          <li>9 = Setembro</li>
          <li>10 = Outubro</li>
          <li>11 = Novembro</li>
          <li>12 = Dezembro</li>
        </ul>
        

      <div className="title-countries">
        <p> Casos {titleCountries} agrupados por mês: </p>
      </div>


        {cases.map((caso) => (
                  <table> 
                    <thead>
                        <tr>
                            <th>Mês</th>
                            <th>Confirmados</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{caso.Date[6]}</td>
                            <td>{caso.Cases}</td>
                        </tr>
                    </tbody>
                </table>
        ))}

      </div>
  );
}
