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

export const Result = [
  {
    id: 17785,
    title_article:
      "Protoapigenone, a novel flavonoid, induces apoptosis in human prostate cancer cells through activation of p38 mitogen-activated protein kinase and c-Jun NH2-terminal kinase 1/2.",
    abstract_article:
      "In this study, we investigated the anticancer effect of protoapigenone on human prostate cancer cells. Protoapigenone inhibited cell growth through arresting cancer cells at S and G(2)/M phases as well as inducing apoptosis. Blockade of cell cycle by protoapigenone was associated with an increase in the levels of inactivated phospho (p)-Cdc25C (Ser216) and a decrease in the levels of activated p-cyclin B1 (Ser147), cyclin B1, and cyclin-dependent kinase (Cdk) 2. Protoapigenone triggered apoptosis by increasing the levels of cleaved poly(ADP-ribose) polymerase and caspase-3. In addition, activation of p38 mitogen-activated protein kinase (MAPK) and c-Jun NH2-terminal kinase (JNK)1/2 was a critical mediator in protoapigenone-induced cell death. Inhibition of the expression of p38 MAPK and JNK1/2 by pharmacological inhibitors or specific small interfering RNA reversed the protoapigenone-induced apoptosis through decreasing the level of cleaved caspase-3. In contrast, p38 MAPK, but not JNK1/2, was involved in the protoapigenone-mediated S and G(2)/M arrest by modulating the levels of Cdk2 and p-Cdc25C (Ser216). Moreover, in vivo xenograft study showed that protoapigenone had a significant inhibition of prostate tumor growth without major side effects on the mice we tested. This inhibition was associated with induction of apoptosis and activation of p38 MAPK and JNK1/2 in protoapigenone-treated tumor tissues. In conclusion, our results demonstrated protoapigenone suppressed prostate cancer cell growth through the activation of p38 MAPK and JNK1/2, with the potential to be developed as a chemotherapeutic agent for prostate cancer.",
    pmid: 18337475,
    peso_final: 979.228637413395,
    peso_rules_normalized: 220,
    peso_genes_normalized: 33,
    peso_entities_normalized: 33,
    ruleAssociationsExtracted: [
      {
        association_type: "polifenol-cancer",
        start_pos: "281",
        end_pos: "402",
        sentence:
          "CH& inhibited cell growth through arresting D&S cells at S and G(2)/M phases as well as inducing apoptosis.",
        peso_artigo: 20,
        peso_artigo_genes: 3,
      },
      {
        association_type: "polifenol-gene",
        start_pos: "645",
        end_pos: "758",
        sentence:
          "CH& triggered apoptosis by increasing the levels of cleaved poly(ADP-ribose) polymerase and G&N .",
        peso_artigo: 20,
        peso_artigo_genes: 3,
      },
      {
        association_type: "polifenol-gene",
        start_pos: "931",
        end_pos: "1143",
        sentence:
          "Inhibition of the expression of p38 MAPK and G&N by pharmacological inhibitors or specific small interfering RNA reversed the CH& -induced apoptosis through decreasing the level of cleaved G&N .",
        peso_artigo: 20,
        peso_artigo_genes: 3,
      },
      {
        association_type: "polifenol-gene",
        start_pos: "1144",
        end_pos: "1302",
        sentence:
          "In contrast, p38 MAPK, but not G&N, was involved in the CH& -mediated S and G(2)/M arrest by modulating the levels of G&N and p- G&N (Ser216).",
        peso_artigo: 20,
        peso_artigo_genes: 3,
      },
      {
        association_type: "polifenol-cancer",
        start_pos: "178",
        end_pos: "280",
        sentence:
          "In this study, we investigated the anticancer effect of CH& on human D&S cells.",
        peso_artigo: 20,
        peso_artigo_genes: 3,
      },
      {
        association_type: "polifenol-gene",
        start_pos: "759",
        end_pos: "930",
        sentence:
          "In addition, activation of G&N (MAPK) and c-Jun NH2-terminal kinase (JNK)1/2 was a critical mediator in CH& -induced cell death.",
        peso_artigo: 20,
        peso_artigo_genes: 3,
      },
      {
        association_type: "polifenol-cancer",
        start_pos: "1",
        end_pos: "178",
        sentence:
          "CH&, a novel CH& d, induces apoptosis in human D&S r cells through activation of G&N e and c-Jun NH2-terminal kinase 1/2.",
        peso_artigo: 20,
        peso_artigo_genes: 3,
      },
      {
        association_type: "polifenol-cancer",
        start_pos: "1303",
        end_pos: "1467",
        sentence:
          "Moreover, in vivo xenograft study showed that CH& had a significant inhibition of D&S growth without major side effects on the mice we tested.",
        peso_artigo: 20,
        peso_artigo_genes: 3,
      },
      {
        association_type: "polifenol-cancer",
        start_pos: "1606",
        end_pos: "1830",
        sentence:
          "In conclusion, our results demonstrated CH& suppressed D&S cell growth through the activation of p38 MAPK and G&N, with the potential to be developed as a chemotherapeutic agent for D&S.",
        peso_artigo: 20,
        peso_artigo_genes: 3,
      },
      {
        association_type: "polifenol-gene",
        start_pos: "403",
        end_pos: "644",
        sentence:
          "Blockade of cell cycle by CH& was associated with an increase in the levels of inactivated phospho (p)- G&N (Ser216) and a decrease in the levels of activated p- G&N (Ser147), G&N, and G&N .",
        peso_artigo: 20,
        peso_artigo_genes: 3,
      },
      {
        association_type: "polifenol-cancer",
        start_pos: "1468",
        end_pos: "1605",
        sentence:
          "This inhibition was associated with induction of apoptosis and activation of p38 MAPK and G&N in CH& -treated D&S tissues.",
        peso_artigo: 20,
        peso_artigo_genes: 3,
      },
    ],
  },
];
