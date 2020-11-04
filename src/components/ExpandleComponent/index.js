import React from "react";

import {
  TagAssociationRules,
  TagAssociation,
} from "src/components/TagAssociation";

import { columnsRule } from "src/config/DataTableConfig";

import SearchController from "src/controller/Search";

const ExpandleComponent = ({ data }) => {
  const { article, rule } = data;

  const TextMarkerAbstrac = SearchController.handleFindPhrase(
    article.abstract_article,
    rule,

  )
  const TextMarkerTitle = SearchController.handleFindPhrase(
    article.title_article,
    rule,
  )

  return (
    <div key={JSON.stringify(data)} className="cardContainer">
      <h1>{SearchController.joinTextElementPharase(TextMarkerTitle, true)}</h1>
      <p id="colapseTrue">
        {SearchController.joinTextElementPharase(TextMarkerAbstrac)}
      </p>

      {TagAssociation(rule)}
      {TagAssociationRules(rule)}
    </div>
  );
};
export default ExpandleComponent;
