import React from "react";

import {
  TagAssociationRules,
  TagAssociation,
} from "src/components/TagAssociation";

import { columnsRule } from "src/config/DataTableConfig";

import SearchController from "src/controller/Search";

const ExpandleComponent = ({ data }) => {
  const { article, rule } = data;

  let title = ""
  let abstract = ""

  const {
    text: TextMarkerAbstrac,
    error: ErrorTitle,
    amountPhare: amountPhareTitle
  } = SearchController.handleFindPhrase(
    article.abstract_article,
    rule,
    article.title_article.length
  )

  const {
    text: TextMarkerTitle,
    error: ErrorAbstract,
    amountPhare: amountPhareAbstract
  } = SearchController.handleFindPhrase(
    article.title_article,
    rule,
  )

  title = SearchController.joinTextElementPharase(TextMarkerTitle, true)
  abstract = SearchController.joinTextElementPharase(TextMarkerAbstrac)

  return (
    <div key={JSON.stringify(data)} className="cardContainer">
      <h1>{title}</h1>
      <p id="colapseTrue">{abstract}</p>

      {console.log(amountPhareTitle,
        amountPhareAbstract)}

      {ErrorTitle &&
        ErrorAbstract &&
        amountPhareTitle + amountPhareAbstract === 0 ?
        <p style={{ margin: "20px 0px", color: "red" }}>
          It was not possible to mark the phrases and their entities, or the phrase does not match the text.
          </p>
        : <>
          {TagAssociation(rule)}
          {TagAssociationRules(rule)}
        </>
      }
    </div>
  );
};
export default ExpandleComponent;
