import React from "react";
import { getTypesAssociation } from "../functions";
import { ColorAssociation } from "src/config/colors";

import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;

  p.title {
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

export function TagAssociation(ruleAssociationsExtracted) {
  return (
    <Container>
      <p className="title">Phrase ratings</p>
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

export function TagAssociationRules(rule) {
  let Types = [];
  rule.forEach((element) => {
    element.entitiesRules.forEach((rule) => {
      Types = [...new Set([...Types, rule.entity_type])];
    });
  });

  return (
    <Container>
      <p className="title">Entites found</p>
      <div className="DescriptionTypesAssociations">
        {Types.map((ele, index) => {
          const { color, description } = ColorAssociation[ele];
          return (
            <div key={index} className="contentTypeAssociation">
              <TagColor color={color} />
              <p>{description}</p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export default TagAssociation;
