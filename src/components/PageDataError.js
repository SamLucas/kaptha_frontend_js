import React from "react";
import styled from "styled-components";

import bugFix from "src/assets/svg/bugFix.svg";

const Section = styled.section`
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;

  img {
    margin: 150px 0px 0px;
    width: 40vw;
    height: 40vh;
  }

  p {
    margin-top: 40px;
    text-align: center;
  }
`;

function PageDataError() {
  return (
    <Section className="containerInformationSearch">
      <img className="img" src={bugFix} alt="" />
      <p>Could not complete the search, try again.</p>
    </Section>
  );
}

export default PageDataError;
