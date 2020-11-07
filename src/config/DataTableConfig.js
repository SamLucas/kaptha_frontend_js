import React from "react";

import Popover from "src/components/Popover";

export const ColorAssociation = {
  "polifenol-": {
    description: "Polifenol",
    color: "#33BBAF",
  },
  "cancer-": {
    description: "Cancer",
    color: "#FFAB40",
  },
  "gene-": {
    description: "Cancer",
    color: "#133B96",
  },
  "polifenol-cancer": {
    description: "Polifenol and Cancer",
    color: "#B2B2B2",
  },
  "polifenol-gene": {
    description: "Polifenol and Gene",
    color: "#F67652",
  },
  cancer_type_entity_cell: {
    description: "Cancer",
    color: "#FFAB40",
  },
  cancer_type_entity_e: {
    description: "Cancer",
    color: "#FFAB40",
  },
  cancer_type_entity_p: {
    description: "Cancer",
    color: "#FFAB40",
  },
  chemical_entity_e: {
    description: "Polifenol",
    color: "#33BBAF",
  },
  chemical_entity_p: {
    description: "Polifenol",
    color: "#33BBAF",
  },
  gene_entity: {
    description: "Cancer",
    color: "#133B96",
  },
  gene_hgnc_entity: {
    description: "Cancer",
    color: "#133B96",
  },
};

export const columnsRule = [
  {
    name: "Rule",
    width: "60%",
    cell: (row) => {
      const { original_sentence, sentence } = row;
      if (original_sentence !== "NA")
        return <p>{original_sentence?.substring(0, 80) + "..."}</p>;
      else return <p>{sentence?.substring(0, 80) + "..."}</p>;
    },
  },
  {
    name: "Association Type",
    sortable: true,
    width: "15%",
    cell: (row) => {
      const { description } = ColorAssociation[row.association_type];
      return <p>{description}</p>;
    },
  },
  {
    name: "Phrase weight",
    selector: "peso_frase",
    sortable: true,
    center: true,
    width: "10%",
  },
  {
    name: "Gene weight",
    selector: "peso_genes",
    sortable: true,
    center: true,
    width: "10%",
  },
];

const HeaderDataTable = [
  {
    title: "P1",
    description:
      "Refers to rules on anticancer activity recognized in the sentences of the abstract containing the entity (ies) sought.",
  },
  {
    title: "P2",
    description:
      "Refers to rules on the activity of regulating genes recognized in the sentences of the abstract containing the entity (ies) sought.",
  },
  {
    title: "P3",
    description:
      "Total frequency of occurrences of the entity (ies) sought in the abstract.",
  },
  {
    title: "P4",
    description: "Weighted average generated from the scores P1, P2 and P3.",
  },
  {
    title: "P5",
    description:
      "Measure resulting from multiple text classification, using supervised machine learning.",
  },
];

export const columns = [
  {
    name: "Title",
    sortable: true,
    cell: (row) => (
      <div style={{ padding: "20px 0px" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "15px",
            paddingBottom: "4px",
          }}
        >
          {row.article.title_article?.substring(0, 120) + "..."}
        </div>
        {row.article.abstract_article?.substring(0, 120) + "..."}
      </div>
    ),
    width: "35%",
  },
  {
    name: "PMID",
    selector: "pmid",
    sortable: true,
    width: "10%",
    center: true,
    cell: (row) => (
      <div
        style={{
          padding: 10,
          borderRadius: 5,
          background: "#3F3C56",
        }}
      >
        <a
          href={`https://pubmed.ncbi.nlm.nih.gov/${row.pmid}`}
          style={{ fontWeight: "bold", textDecoration: "none", color: "white" }}
          target="_blanck"
        >
          {row.pmid}
        </a>
      </div>
    ),
  },
  {
    name: (
      <Popover
        title={HeaderDataTable[0].title}
        description={HeaderDataTable[0].description}
      />
    ),
    selector: "peso_rules",
    sortable: true,
    width: "10%",
    center: true,
  },
  {
    name: (
      <Popover
        title={HeaderDataTable[1].title}
        description={HeaderDataTable[1].description}
      />
    ),
    selector: "peso_entities",
    sortable: true,
    width: "10%",
    center: true,
  },
  {
    name: (
      <Popover
        title={HeaderDataTable[2].title}
        description={HeaderDataTable[2].description}
      />
    ),
    selector: "peso_genes",
    sortable: true,
    width: "10%",
    center: true,
  },
  {
    name: (
      <Popover
        title={HeaderDataTable[3].title}
        description={HeaderDataTable[3].description}
      />
    ),
    selector: "peso_final",
    sortable: true,
    width: "10%",
    center: true,
  },
  {
    name: (
      <Popover
        title={HeaderDataTable[4].title}
        description={HeaderDataTable[4].description}
      />
    ),
    selector: "article.med",
    sortable: true,
    width: "10%",
    center: true,
  },
];

export const customStyles = {

  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      fontWeight: "bold", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
};
