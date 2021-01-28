import React from "react";
import Header from "src/components/Header";

import ImageArchitecture from "src/assets/Architecture.png"

export default function Architecture() {

  return (
    <Header>
      <h2>Kaphta Architecture</h2>
      <p style={{ margin: "15px 0" }}>
        The Kaphta architecture is divided into four steps (Figure below): text classification of abstracts on anticancer activity, information extraction, indexing of extracted information, and system for the retrieval and ranking of indexed information. These steps are described below.
      </p>

      ResourceT1

      <h2>Text classification of abstracts on anticancer activity</h2>
      <p style={{ margin: "15px 0" }}>
        First, a dictionary must be constructed or updated with the entities and synonyms of interest: types of cancer, polyphenols, and genes. The polyphenol entities of the dictionary are used to create search strings for retrieving abstracts from PubMed and the text corpus. Then, a sample containing about 1% to 10% of the text corpus is selected at random and the abstracts of the sample are read and two classes are annotated manually: 0 (abstracts not related to anticancer activity) and 1 (abstracts related to anticancer activity). The manually annotated abstracts are pre-processed, represented in a vector-space model, and used for the training and testing of text classifiers employing different supervised machine learning algorithms. Measures of accuracy are collected using cross-validation and a confusion matrix, and the models with the best performance are selected for the development of a text classifier based on ensemble method. Finally, all abstracts of the text corpus are submitted to text classification based on ensemble method and those classified as positive (class 1) are included in the step of information extraction.

      </p>

      <h2>Information extraction</h2>
      <p style={{ margin: "15px 0" }}>

        Two tasks are performed in this step: named entity recognition (NER) and association recognition (AR). First, NER is applied to the abstracts classified as positive (class 1). After NER, the abstracts are tokenized into sentences that are submitted to AR using a rules dictionary created for information extraction (see Rules Dictionary implementation, available at <a href="/resources" target="_blanck">https://portal.ifsuldeminas.edu.br/kaphtawebtool/resources</a>). The rules allow to identify sentences related to the anticancer activity of polyphenols and to the activity of involved regulatory genes in each abstract. Titles and passages related to the results/conclusion of the abstracts are also identified.


      </p>

      <h2>Indexing of information extracted</h2>
      <p style={{ margin: "15px 0" }}>
        Abstracts with recognized entities and associations are indexed at two levels using inverted lists: individual indexing and cross-indexing. In individual indexing, abstracts are indexed for the type of entity (polyphenol, cancer, and gene). In cross-indexing the abstracts are indexed for polyphenol-cancer and polyphenol-gene associations identified by cross-referencing individual indexed entities.

      </p>

      <h2>System of recuperation and ranking of indexed information</h2>
      <p style={{ margin: "15px 0" }}>
        n this step, a system for retrieving and ranking the abstracts based on the extracted and indexed information is implemented. Indexed abstracts are retrieved from the entities searched by the users and a ranking algorithm is applied that calculates four scores (S1, S2, S3 and S4) for each abstract:

      </p>

      <ul style={{ marginLeft: 50 }}>
        <li>
          S1: refers to anticancer activity and is formed by the sum of points of rules R1 to R10, R14 to R16 and T1 recognized in the sentences of the abstract containing the entity(ies) searched.

          </li>
        <li>
          S2: refers to the activity of gene regulation and is formed by the sum of points of rules R11 and R12 recognized in the sentences of the abstract containing the entity(ies) searched.

          </li>
        <li>
          S3: the total number of occurrences of the entity(ies) searched in the abstract.

          </li>
      </ul>

      <p style={{ margin: "15px 0" }}>

        Finally, S1, S2 and S3 are normalized (0 to 1) and are used to generate S4, a weighted mean derived from these measures. A table of points for the rules according to sentence type is used to calculate S1 and S2 (see meaning of the rules, algorithm and table of points at <a href="/resources" target="_blanck">https://portal.ifsuldeminas.edu.br/kaphtawebtool/resources</a>). After execution of the algorithm, S5 resulting from the text classification based on ensemble of each abstract is added and a list of the abstracts is then generated so that the user can analyze and interpret the retrieved information.

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
          // style={{ width: "80%" }}
          src={ImageArchitecture}
          alt="Summary of information available on the Kaphta web tool"
        />
      </div>


    </Header>
  );
}
