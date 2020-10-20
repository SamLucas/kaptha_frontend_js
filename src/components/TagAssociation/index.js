import React from "react";

import SearchController from "src/controller/search/index";
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
              <TagColor color={ele.color} />
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
