import React from "react";

import { handleFindEntitiesPhrase, handleFindPhrase } from "../functions";
import { columnsRule } from "../../../config/DataTableConfig";
import TagAssociation, { TagAssociationRules } from "./tagAssociation";

import DataTable from "react-data-table-component";

const ExpandleComponentPhase = ({ data }) => {
  const { original_sentence, entitiesRules, end_pos, start_pos } = data;
  return (
    <div key={JSON.stringify(data)} className="cardContainer">
      <p
        id="colapseTrue"
        dangerouslySetInnerHTML={{
          __html: handleFindEntitiesPhrase(
            original_sentence,
            start_pos,
            end_pos,
            entitiesRules
          ),
        }}
      />
    </div>
  );
};

const ExpandleComponent = ({ data }) => {
  const { article, rule } = data;

  return (
    <div key={JSON.stringify(data)} className="cardContainer">
      <h1>{article.title_article}</h1>
      <p
        id="colapseTrue"
        dangerouslySetInnerHTML={{
          __html: handleFindPhrase(article.abstract_article, rule),
        }}
      />

      {TagAssociation(rule)}
      {TagAssociationRules(rule)}

      <DataTable
        data={rule}
        columns={columnsRule}
        expandableRows
        expandableRowsComponent={<ExpandleComponentPhase />}
        noHeader={true}
        customStyles={{
          headCells: {
            style: {
              fontWeight: "bold",
              paddingRight: "8px",
            },
          },
        }}
        pagination={true}
        paginationRowsPerPageOptions={[5, 10, 15]}
        paginationPerPage={5}
      />
    </div>
  );
};
export default ExpandleComponent;
