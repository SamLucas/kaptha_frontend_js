import React from "react";

import {
  TagAssociationRules,
  TagAssociation,
} from "src/components/TagAssociation";
import { columnsRule } from "src/config/DataTableConfig";

import DataTable from "react-data-table-component";
import SearchController from "src/controller/search/index";

const ExpandleComponentPhase = ({ data }) => {
  const { original_sentence, entitiesRules, end_pos, start_pos } = data;
  return (
    <div key={JSON.stringify(data)} className="cardContainer">
      <p
        id="colapseTrue"
        dangerouslySetInnerHTML={{
          __html: SearchController.handleFindEntitiesPharase(
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
          __html: SearchController.handleFindPhrase(
            article.abstract_article,
            rule
          ),
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
