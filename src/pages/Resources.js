import React, { useState } from "react";
import Header from "src/components/Header";

import ResourceT1 from "src/assets/ResourceT1.png"
import ResourceT2 from "src/assets/ResourceT2.jpeg"
import ResourceT3 from "src/assets/ResourceT3.png"
import File from "src/assets/Rules-dictionary-implementation2.pdf"

export default function Resources() {

  const [toogle, setToogle] = useState(false)

  const downloadFile = () => {
    return (
      <iframe
        src={File}
        height={800}
        width={500}
      />
    )
  };

  return (
    <Header>
      <h2>Kaphta Resources</h2>
      <p style={{ margin: "15px 0" }}>
        In this session are presented supplementary material, details, and R Scripts about Kaphta architecture execution. Below are listed GitHub links para each step of architecture execution:

      </p>

      <ul style={{ marginLeft: 50 }}>
        <li>
          <a
            href="https://github.com/ramongsilva/Text-classification-of-pubmed-abstracts-on-polyphenols-anticancer-activity"
            target="_blanck"
          >
            Text classification of PubMed abstracts on cancer activity [GitHub link]
          </a>
        </li>
        <li>
          <a
            href="https://github.com/ramongsilva/Information-extraction-from-pubmed-abstracts-sentences-on-polyphenols-anticancer-activity"
            target="_blanck"
          >
            Information extraction [GitHub link]
          </a>
        </li>


        <li>
          <a
            href="https://github.com/ramongsilva/Indexing-of-extracted-information"
            target="_blanck"
          >
            Indexing of extracted information [GitHub link]
          </a>
        </li>
        <li>
          <a
            href="https://github.com/ramongsilva/System-for-the-retrieval-and-ranking-of-indexed-information"
            target="_blanck"
          >
            System for the retrieval and ranking of indexed information [GitHub link]
          </a>
        </li>
      </ul>

      <p style={{ margin: "15px 0" }}>
        Below are presented information about the creation of the Rules Dictionary, used in the Information extraction and System for the retrieval and ranking of indexed information steps:
      </p>

      <ul style={{ marginLeft: 50 }}>
        <li>
          <a
            href="https://github.com/ramongsilva/Sequential-pattern-mining-in-pubmed-abstracts-sentences-on-anticancer-activity"
            target="_blanck"
          >
            Sequential pattern mining process [GitHub link]
          </a>
        </li>
        <button onClick={() => setToogle(s => !s)} style={{
          padding: 5,
          marginTop: 5,
          background: "#3F3C56",
          color: 'white',
          cursor: "pointer"
        }}>
          Rules Dictionary implementation [PDF file]
        </button>

      </ul>

      {
        toogle && <iframe
          src={File}
          style={{ marginTop: "10px", width: "100%", height: "50vh" }}
        />
      }


      {/* 
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
      </div> */}

    </Header >
  );
}
