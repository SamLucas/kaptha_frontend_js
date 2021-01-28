import React from "react";
import Header from "src/components/Header";

import Unarerp from "src/assets/Unarerp.jpg"

export default function Architecture() {

  return (
    <Header>
      <h2 style={{
        margin: 20
      }}>
        Contact us
      </h2>

      <div style={{ margin: "0px 20px" }}>

        <div style={{ margin: "20px 0px" }}>
          <p>
            Mozart Marins (mmarins@gmb.bio.br) - Biotechnology Unit, Universidade de Ribeirão Preto, Brazil;<br />

            Ramon Gustavo Teodoro Marques da Silva - Computer Science Department of the Federal Institute of Education, Science and Technology of South of Minas Gerais, Muzambinho, Brazil.
          </p>
        </div>

        <div style={{ margin: "20px 0px" }}>


          <h5>ACKNOWLEDGEMENT</h5>
          <p>The authors gratefully acknowledge the Coordination for the Improvement of Higher Education (CAPES) for PROSUP scholarship  granted to RGTMST and the Federal Institute of Education, Science and Technology of South of Minas Gerais – IFSULDEMINAS for authorized leave of absence for the purpouse of postgraduation studies. </p>
        </div>

        <div style={{ margin: "20px 0px" }}>
          <h5>FUNDING</h5>
          <p>This work was supported by Biotechnology Unit, Universidade de Ribeirão Preto, Brazil; Federal Institute of Education, Science and Technology of South of Minas Gerais – IFSULDEMINAS, Brazil; São Paulo Research Foundation (FAPESP).</p>
        </div>

      </div>


      {/* <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
      }}>
        <img
          src={Unarerp}
          alt="Summary of information available on the Kaphta web tool"
        />
        <h3 style={{
          margin: 40,
          textAlign: "center",

        }}>
          Department of Biotechnology of the University of Ribeirão Preto - UNAERP and Computer Science Department of the Federal Institute of Education, Science and Technology of South of Minas Gerais (Muzambinho)
        </h3>
      </div> */}

    </Header>
  );
}


