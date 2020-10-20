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
      const { original_sentence } = row;
      return <p>{original_sentence?.substring(0, 80) + "..."}</p>;
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
      "refere-se a regras sobre atividade anticancerígena reconhecidas nas sentenças do resumo contendo a(s) entidade(s) buscada(s).",
  },
  {
    title: "P2",
    description:
      "refere-se a regras sobre a atividade de regulação de genes reconhecidas nas sentenças do resumo contendo a(s) entidade(s) buscada(s).",
  },
  {
    title: "P3",
    description:
      "frequência total de ocorrências da(s) entidade(s) buscada(s) no resumo.",
  },
  {
    title: "P4",
    description: "média ponderada gerada a partir das pontuações P1, P2 e P3",
  },
  {
    title: "P5",
    description:
      "medida resultante da classificação múltipla de textos, utilizando aprendizado de máquina supervisionado",
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
    width: "45%",
  },
  {
    name: "PMID",
    selector: "pmid",
    sortable: true,
    width: "10%",
    center: true,
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
