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

      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
      }}>
        <img
          src={Unarerp}
          alt="Summary of information available on the kaptha web tool"
        />
        <h3 style={{
          margin: 40,
          textAlign: "center",

        }}>
          Department of Biotechnology of the University of Ribeirão Preto - UNAERP and Computer Science Department of the Federal Institute of Education, Science and Technology of South of Minas Gerais (Muzambinho)
        </h3>
      </div>

    </Header>
  );
}


