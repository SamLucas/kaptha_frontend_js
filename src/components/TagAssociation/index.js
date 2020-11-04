import React from "react";

import SearchController from "src/controller/Search";
import { ColorAssociation } from "src/config/colors";

import { Container, TagColor } from "./styles";

export function TagAssociation(ruleAssociationsExtracted) {
  return (
    <Container>
      <p className="title">Phrase ratings</p>
      <div className="DescriptionTypesAssociations">
        {SearchController.getTypesAssociation(ruleAssociationsExtracted).map(
          (ele, index) => (
            <div key={index} className="contentTypeAssociation">
              <TagColor underline color={ele.color} />
              <p>{ele.description}</p>
            </div>
          )
        )}
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

  let ColorsType = [...new Set(Types.map(ele => ColorAssociation[ele].description))]

  const colors = {
    Polifenol: "#33BBAF",
    Cancer: "#FFAB40",
    Gene: "#133B96",
    "Polifenol and Cancer": "#B2B2B2",
    "Polifenol and Gene": "#F67652"
  }

  return (
    <Container>
      <p className="title">Entites found</p>
      <div className="DescriptionTypesAssociations">
        {ColorsType.map((ele, index) => (
          <div key={index} className="contentTypeAssociation">
            <TagColor color={colors[ele]} />
            <p>{ele}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
