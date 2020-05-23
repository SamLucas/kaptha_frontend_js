import React from "react";
import ReactLoading from "react-loading";

import styled from "styled-components";

const Container = styled.section`
  section.loading {
    margin: 200px 0;
    width: 100%;

    .spinner {
      background-color: transparent;
      margin: 0px auto;
    }

    p {
      margin-top: 50px;
      text-align: center;
    }
  }
`;

function Loading() {
  return (
    <Container>
      <section className={"loading"}>
        <ReactLoading
          className={"spinner"}
          type={"spin"}
          color="#000"
          width="200px"
          height="200px"
        />
        <p>Carregando...</p>
      </section>
    </Container>
  );
}

export default Loading;
