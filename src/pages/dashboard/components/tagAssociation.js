import React from "react";
import { getTypesAssociation } from "../functions";

import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;

  p {
    /* margin-top: 10px; */
    font-weight: bold;
  }

  .DescriptionTypesAssociations {
    display: flex;
    flex-direction: row;
    margin: 20px 0px;

    .contentTypeAssociation {
      display: flex;
      flex-direction: row;
      margin-right: 10px;
    }
  }
`;

const TagColor = styled.div`
  height: 10px;
  width: 10px;
  margin: 4px 5px 2px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
`;

function TagAssociation(ruleAssociationsExtracted) {
  return (
    <Container>
      <p>Phrase ratings</p>
      <div className="DescriptionTypesAssociations">
        {getTypesAssociation(ruleAssociationsExtracted).map((ele, index) => (
          <div key={index} className="contentTypeAssociation">
            <TagColor color={ele.color} />
            <p>{ele.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default TagAssociation;
