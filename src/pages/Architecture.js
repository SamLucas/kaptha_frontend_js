import React from "react";
import Header from "src/components/Header";

import ImageArchitecture from "src/assets/Architecture.jpeg"

export default function Architecture() {

  return (
    <Header>
      <h2>Kaphta Architecture</h2>
      <p style={{ margin: "15px 0" }}>
        The Kaphta architecture is organized in 4 stages (Figure 1): text classification of abstracts about cancer activity, information extraction, indexing of information extracted, system of recuperation and ranking of indexed information, which are presented below:
      </p>

      ResourceT1

      <h2>Text classification of abstracts about cancer activity</h2>
      <p style={{ margin: "15px 0" }}>
        Initially, the dictionary should be built or updated with the entities and synonyms of interest: types of cancer, polyphenols and genes. The polyphenol entities in the built dictionary are used to create search strings for retrieving abstracts from PubMed, and to create the textual corpus. Then, a sample with about 1% to 10% of the textual corpus is selected at random and the sample abstracts are read and labeled manually in two classes: 0 (abstracts not related to anticancer activity) and 1 (abstracts related to anticancer activity ). The manually labeled abstracts are pre-processed, represented in the space-vector model, and used in the training and testing of text classifiers, using different supervised machine learning algorithms. Using cross validation and confusion matrix, accuracy measures are collected, and those with the best performances are selected for the composition of a multiple text classifier (ensemble). At the end, all abstracts of the textual corpus are subjected to multiple classification, in which those classified as positive (class 1) are submitted to the information extraction stage.
      </p>

      <h2>Information extraction</h2>
      <p style={{ margin: "15px 0" }}>
        This stage is organized into two well-defined tasks: REN (Recognition of named entities) and RA (Recognition of associations). Initially, REN occurs in abstracts classified as positive (class 1). After the REN, abstracts are tokenized in sentences that are submitted to the RA, using a rules dictionary created for the extraction of information (see Rules Dictionary, available at <a href="/resources" target="_blanck">www.kaphta.com/resources</a>). The rules make it possible to identify, in each summary, the sentences related to the anti-cancer activity of polyphenols and the activity of regulatory genes involved. Titles and excerpts related to the results / conclusion of the abstracts are also identified.
      </p>

      <h2>Indexing of information extracted</h2>
      <p style={{ margin: "15px 0" }}>
        Abstracts with recognized entities and associations (rules) are indexed using inverted lists, on 2 levels: individual indexing and cross indexing. In individual indexing, abstracts are indexed by type of entity (polyphenol, cancer, and gene). In cross-indexing abstracts are indexed for polyphenol-cancer and polyphenol-gene associations, identified from the intersection of the indexed individual entities.
      </p>

      <h2>System of recuperation and ranking of indexed information</h2>
      <p style={{ margin: "15px 0" }}>
        In this step, a system for retrieving and ranking abstracts occurs with the extracted and indexed information. From a user search, containing a polyphenol and / or type of cancer, indexed abstracts are retrieved. These are submitted to a ranking algorithm that calculates 4 scores (P1, P2, P3 and P4) for each summary:
      </p>

      <ul style={{ marginLeft: 50 }}>
        <li>
          P1 score: refers to anticancer activity, being formed by the sum of the points of rules R1 to R10, R14, R16 and T1 recognized in the sentences of the summary containing the entity (ies) sought.
          </li>
        <li>
          P2 score: refers to the activity of gene regulation, it is formed by the sum of the points of rules R11 and R12 recognized in the sentences of the summary containing the entity (ies) sought.
          </li>
        <li>
          P3 score: total number of occurrences of the entity (ies) sought in the summary.
          </li>
      </ul>

      <p style={{ margin: "15px 0" }}>
        At the end, measures P1, P2 and P3 are normalized (0 to 1) and used to generate measure P4, a weighted average from these measures. A table of points for the rules by sentence type is used in the calculation of the scores P1 and P2. At the end of the algorithm's execution, the P5 measure resulting from the multiple classification (ensemble) of each summary is added, and then the summary list is generated for the user to analyze and interpret the retrieved information.
      </p>
    </Header>
  );
}
