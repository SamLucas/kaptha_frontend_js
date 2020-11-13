import React, { useEffect, useState } from "react";
import { Popover, PopoverHeader, PopoverBody, PopoverFooter } from 'reactstrap';

import { ColorAssociation } from 'src/config/colors'

import api from "src/config/api";

export default function MouseOverPopover({ data, color, children }) {

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dataEntitie, setDataEntitie] = useState({})

  const toggle = () => setPopoverOpen(!popoverOpen);

  useEffect(() => {
    if (data) {
      const { entity_type, term_id, mesh_id } = data;
      api.get(
        "detailsTerms",
        { params: { entity_type, term_id, mesh_id } }
      ).then(({ data }) => setDataEntitie(data))
    }
  }, [data])

  return (
    <>
      <span
        id={`Popover${data.id}`}
        style={{
          padding: 2,
          color: "white",
          borderRadius: 5,
          fontWeight: "bold",
          textDecoration: "none",
          backgroundColor: color,
          cursor: "pointer",
          outline: 0,
          border: "none"
        }}
      >
        {children}
      </span>
      <Popover
        placement="top"
        isOpen={popoverOpen}
        target={`Popover${data.id}`}
        toggle={toggle}>

        <div style={{
          backgroundColor: "white",
          padding: 10,
          border: "1px solid rgba(0,0,0,0.1)",
          maxWidth: 400
        }}>
          <PopoverHeader >
            <div style={{
              marginBottom: 10
            }}>
              <h1>{data.db_equivalence}</h1>
              <p style={{ borderColor: "black", borderWidth: 1 }} >
                {data.db_term} -  {ColorAssociation[data.entity_type].description}
              </p>
            </div>
          </PopoverHeader>
          <PopoverBody>
            <div>

              {console.log(dataEntitie)}

              {dataEntitie.term_definition &&
                dataEntitie.term_definition !== "null" &&
                <div style={{ marginBottom: 20 }}>
                  {dataEntitie.term_description && <p>{dataEntitie.term_description}</p>}
                  {dataEntitie.term_definition && <p>{dataEntitie.term_definition}</p>}
                </div>
              }

              {dataEntitie.DrugBankID &&
                dataEntitie.DrugBankID !== "NA" &&
                dataEntitie.DrugBankID !== "null" &&
                <a
                  href={`https://go.drugbank.com/drugs/${dataEntitie.DrugBankID}`}
                  target="_blanck">
                  DrugBankID
                </a>
              }

              {dataEntitie.PubChemCompoundID &&
                dataEntitie.PubChemCompoundID !== "NA" &&
                dataEntitie.PubChemCompoundID !== "null" &&
                <a
                  href={`https://pubchem.ncbi.nlm.nih.gov/#query=${dataEntitie.PubChemCompoundID}`}
                  target="_blanck">
                  PubChem
                </a>
              }

              {dataEntitie.link_wiki &&
                dataEntitie.link_wiki !== "NA" &&
                dataEntitie.link_wiki !== "null" &&
                <a
                  href={dataEntitie.link_wiki}
                  target="_blanck">
                  Link Wiki
                </a>
              }

              <p style={{
                fontWeight: "bold",
                color: "#3F3C56",
                cursor: "pointer",
                padding: "15px",
                textAlign: "right"
              }}
                onClick={toggle}>
                Close
              </p>
            </div>
          </PopoverBody>
        </div>
      </Popover>
    </>
  );
}
