import React, { useEffect, useState } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { ColorAssociation } from 'src/config/colors'

import api from "src/config/api";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
    // padding: 10,
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: "black",
    color: "white",
    width: 300,
  },
}));

export default function MouseOverPopover({ data, color, children }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [dataEntitie, setDataEntitie] = useState({})

  useEffect(() => {
    if (data) {
      const { entity_type, term_id, mesh_id } = data;
      api.get(
        "detailsTerms",
        { params: { entity_type, term_id, mesh_id } }
      ).then(({ data }) => setDataEntitie(data))
    }
  }, [data])

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <span
        onMouseEnter={handlePopoverOpen}
        // onMouseLeave={handlePopoverClose}
        // onMouseOut={handlePopoverClose}
        style={{
          padding: 2,
          color: "white",
          borderRadius: 5,
          fontWeight: "bold",
          textDecoration: "none",
          backgroundColor: color,
        }}
      >
        {children}
      </span>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        onBlur={handlePopoverClose}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
      // disableRestoreFocus
      >
        <div>
          <h1>{data.db_equivalence}</h1>
          <p style={{ borderColor: "white", borderWidth: 1 }} >
            {data.db_term} -  {ColorAssociation[data.entity_type].description}
          </p>


          {dataEntitie.term_definition && dataEntitie.term_definition !== "null" && <div style={{ marginTop: 20, marginBottom: 20 }}>
            {dataEntitie.term_description && <p>{dataEntitie.term_description}</p>}
            {dataEntitie.term_definition && <p>{dataEntitie.term_definition}</p>}
          </div>}

          {dataEntitie.DrugBankID &&
            <a
              href={`https://go.drugbank.com/drugs/${dataEntitie.DrugBankID}`}
              target="_blanck">
              DrugBankID
             </a>
          }

          {dataEntitie.PubChemCompoundID &&
            <a
              href={`https://pubchem.ncbi.nlm.nih.gov/#query=${dataEntitie.PubChemCompoundID}`}
              target="_blanck">
              PubChem
             </a>
          }

          {dataEntitie.link_wiki &&
            <a
              href={dataEntitie.link_wiki}
              target="_blanck">
              Link Wiki
            </a>
          }

        </div>
      </Popover>
    </>
  );
}
