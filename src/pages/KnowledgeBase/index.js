import React from "react";
import Header from "src/components/Header";

import ImageTable from "src/assets/tableKnowledgebase.jpg"

export default function KnowledgeBase() {

  return (
    <Header>
      <h2>Knowledgebase Info</h2>
      <p style={{ margin: "15px 0" }}>
        The kaphta Web tool allows individual and cross searches to be carried out. In individual searches, you can search for polyphenol, cancer and gene entities, while in cross searches you can search for information about associations of polyphenol-cancer and polyphenol-gene entities. The following is a table with a summary of the information available for search on the Kaphta Web tool.
      </p>

      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {/* <h3 style={{ marginTop: 10, marginBottom: 20 }}>
          Summary of information available on the Kaphta web tool
        </h3> */}
        <img
          src={ImageTable}
          alt="Summary of information available on the Kaphta web tool"
        />
      </div>

    </Header>
  );
}
