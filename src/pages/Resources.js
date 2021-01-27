import React from "react";
import Header from "src/components/Header";

import ResourceT1 from "src/assets/ResourceT1.png"
import ResourceT2 from "src/assets/ResourceT2.jpeg"
import ResourceT3 from "src/assets/ResourceT3.png"

export default function Resources() {

  return (
    <Header>
      <h2>Kaphta Resources</h2>
      <p style={{ margin: "15px 0" }}>
        The supplementary materials generated in the implementation of the rules dictionary for the Kaphta architecture are presented below:
      </p>

      <ul style={{ marginLeft: 50 }}>
        <li>
          <a
            href="https://drive.google.com/file/d/1DotCACylU7GueHaPJkstwriWsJElFyI3/view?usp=sharing"
            target="_blanck"
          >
            Rules Dictionary Implementation [pdf file]
          </a>
        </li>
        <li>
          <a
            href="https://drive.google.com/file/d/14w960ksCUXtgk_Arf3cDgPMoiNDYtKD-/view?usp=sharing"
            target="_blanck"
          >
            Patterns identified on sequence pattern mining [zip file]
          </a>
        </li>
      </ul>

      <p style={{ margin: "15px 0" }}>
        The following are the resources and supplementary materials generated in the execution of the Kaphta architecture steps:
      </p>

      <ul style={{ marginLeft: 50 }}>
        <li>
          <a
            href="https://drive.google.com/file/d/1KfCmazI57hHXE_bKTgDTAnKUkP_El64L/view?usp=sharing"
            target="_blanck"
          >
            Entities dictionary [zip file]
          </a>
        </li>
        <li>
          <a
            href="https://drive.google.com/file/d/1ZxQOrWO0SXXDvnnz4yIwlIhWNvw_uDVH/view?usp=sharing"
            target="_blanck"
          >
            Textual corpus of PubMed abstracts [tsv file]
          </a>
        </li>
        <li>
          <a
            href="https://drive.google.com/file/d/1d7zAn3D0Ze5DZDWHpKsYiV9c3WtlA2Ay/view?usp=sharing"
            target="_blanck"
          >
            PubMed abstracts rotulated corpus (400 articles) [zip file]
          </a>
        </li>
        <li>
          <a
            href="https://drive.google.com/file/d/1h0N2nhncYouKWS2oey3jAL6Q-b5tM6To/view?usp=sharing"
            target="_blanck"
          >
            PubMed abstracts classified with anticancer activity [tsv file]
          </a>
        </li>
      </ul>



      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 40
      }}>
        <h3>
          Table with results of machine learning algorithms training
        </h3>
        <img
          src={ResourceT1}
          alt="Table with results of machine learning algorithms training"
        />
      </div>


      <h2>Information extraction</h2>
      <ul style={{ marginLeft: 50, marginTop: 20 }}>
        <li>
          <a
            href="https://drive.google.com/file/d/1My5GIfM364w7Pi2AdfkCQBgzNUHr1Qx-/view?usp=sharing"
            target="_blanck"
          >
            Named entity recognition [zip file]
          </a>
        </li>
        <li>
          <a
            href="https://drive.google.com/file/d/1bjuxPWNX0a4qdAWUznGKgflDF12Ka69n/view?usp=sharing"
            target="_blanck"
          >
            Sentences with associations recognized [tsv file]
          </a>
        </li>
      </ul>

      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 50
      }}>
        <h3>
          Table with total of recognized sentences associations for sentence type
        </h3>
        <img
          src={ResourceT2}
          alt="Table with total of recognized sentences associations for sentence type"
        />
        <p style={{ margin: "15px 0" }}>
          Legend (PC - sentences with polyphenol-cancer entities; PG - sentences with polyphenol-gene entities; P - sentences with polyphenol only)
      </p>
      </div>

      <h2>Indexing of information extracted</h2>
      <ul style={{ marginLeft: 50, margin: "20px 50px" }}>
        <li>
          <a
            href="https://drive.google.com/file/d/1J44pgGAZsURJLG8RT8dPUlVwT3W-u85t/view?usp=sharing">
            Entities and cross associations indexed [zip file]
          </a>
        </li>
      </ul>

      <h2>System of recuperation and ranking of information</h2>

      <p style={{ margin: "15px 0" }}>Algorithm for ranking abstracts</p>

      <ul style={{ margin: "20px 50px" }}>
        <li>
          Input: a list of abstracts indexed according to the entity (ies) informed by the user in the search.
        </li>
        <li>
          Start of the repetition structure: for each summary of the entry list, the scores are calculated, according to the type of search:
          <ul style={{ marginLeft: 20 }}>

            <li>
              If the search is for a <strong>polyphenol (P)</strong>:
            <ul style={{ marginLeft: 40 }}>
                <li>
                  P1 = sum of points from rules R1 to R10, R14, R16 and T1 for the sentence types PC and P, where P corresponds to the polyphenol sought and C can be any cancer;
              </li>
                <li>
                  P2 = sum of points in rules R11 and R12 for phrase types PG and G, where P corresponds to the searched polyphenol;
              </li>
                <li>
                  P3 = sum of the number of P entities identified in the summary;
              </li>
              </ul>
            </li>

            <li>
              If the search is for <strong>cancer (C)</strong>:
            <ul style={{ marginLeft: 40 }}>
                <li>
                  P1 = sum of points in rules R1 to R10, R14, R16 and T1 for the sentence types PC, P and C, where C corresponds to the cancer sought and P can be any polyphenol;
              </li>
                <li>
                  P2 = sum of points in rules R11 and R12 for phrase types PG and G, where P corresponds to any polyphenol;
              </li>
                <li>
                  P3 = sum of the number of C entities identified in the summary;
              </li>
              </ul>
            </li>

            <li>
              If the search is for <strong>gene (G)</strong>:

            <ul style={{ marginLeft: 40 }}>
                <li>
                  P1 = sum of points in rules R1 to R10, R14, R16 and T1 for the sentence types PC, P and C, where P and C correspond to any polyphenol or cancer;
              </li>
                <li>
                  P2 = sum of points in rules R11 and R12 for the sentence types PG and G, where G corresponds to the searched gene, and P to any polyphenol;
              </li>
                <li>
                  P3 = sum of the number of G entities identified in the summary;
              </li>
              </ul>
            </li>
            <li>
              If the search is for a <strong>polyphenol (P) and a cancer (C)</strong>:
            <ul style={{ marginLeft: 40 }}>
                <li>
                  P1 = sum of points from rules R1 to R10, R14, R16 and T1 for the sentence types PC, P and C, where P and C correspond to the polyphenol and cancer sought;
              </li>
                <li>
                  P2 = sum of the scores of rules R11 and R12 for phrase types PG and G, where P corresponds to the searched polyphenol;
              </li>
                <li>
                  P3 = sum of the number of entities P and C identified in the summary;
              </li>
              </ul>
            </li>
            <li>
              If the search is for a <strong>polyphenol (P) and a gene (G)</strong>:
            <ul style={{ marginLeft: 40 }}>
                <li>
                  P1 = sum of points from rules R1 to R10, R14, R16 and T1 for the types of sentences PC, P and C, where P corresponds to the sought polyphenol;
              </li>
                <li>
                  P2 = sum of the scores of rules R11 and R12 for the sentence types PG and G, where P and G correspond to the polyphenol and gene sought;
              </li>
                <li>
                  P3 = sum of the number of entities P and G identified in the summary;
              </li>
              </ul>
            </li>
          </ul>
        </li>

        <li>
          End of repetition structure
          <ul style={{ marginLeft: 20 }}>
            <li>
              Normalization of P1, P2 and P3 scores on a single scale (0 to 1);
            </li>
            <li>P4 → (5*P1 + 2*P2 + 3*P3) / 10;</li>
            <li>P5 → result of multiple text classification (ensemble);</li>
          </ul>
        </li>
        <li>
          Output → summary list with extracted information and calculated ranking scores.
        </li>
      </ul>


      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 50
      }}>
        <h3>
          Points table used to calculate scores in the ranking algorithm
        </h3>
        <img
          src={ResourceT3}
          alt="Points table used to calculate scores in the ranking algorithm"
        />
        <p style={{ margin: "15px 30px", textAlign: "center" }}>
          Legend (PC - sentences with polyphenol-cancer; PG - sentences with polyphenol-gene; P - sentences with only polyphenol; C - sentences with only cancer; G - sentences with only genes).
      </p>
      </div>

    </Header>
  );
}
