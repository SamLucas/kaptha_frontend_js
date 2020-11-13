import React from "react";
import Header from "src/components/Header";

import ImageTable from "src/assets/tableKnowledgebase.png"

export default function KnowledgeBase() {

  return (
    <Header>
      <h2>Knowledgebase Info</h2>
      <p style={{ margin: "15px 0" }}>
        The Web kaphta tool allows individual and binary searches to be carried out. In individual searches, you can search for polyphenol, cancer and gene entities, while in binary searches (cross-search) you can search for information about associations of polyphenol-cancer and polyphenol-gene entities. The following is a table with a summary of the information available for research on the web tool.
      </p>

      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <h3 style={{ marginTop: 10, marginBottom: 20 }}>
          Summary of information available on the kaptha web tool
        </h3>
        <img
          src={ImageTable}
          alt="Summary of information available on the kaptha web tool"
        />
      </div>

    </Header>
  );
}
