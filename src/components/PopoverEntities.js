import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { ColorAssociation } from 'src/config/colors'

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

  const DataEntitie = JSON.parse(data)



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
        disableRestoreFocus
      >
        <div>
          <h1>{DataEntitie.db_equivalence}</h1>
          <p>{DataEntitie.db_term} -  {ColorAssociation[DataEntitie.entity_type].description}</p>


          {DataEntitie.link_wiki && <a href={DataEntitie.linl_wiki} target="_blanck" >Link Wiki</a>}
          {DataEntitie.DrugBankID && <a href={`https://go.drugbank.com/drugs/${DataEntitie.DrugBankID}`} target="_blanck" >DrugBankID</a>}
          {DataEntitie.PubChemCompoundID && <a href={`https://pubchem.ncbi.nlm.nih.gov/#query=${DataEntitie.PubChemCompoundID}`} target="_blanck" >PubChem</a>}
          {DataEntitie.link_wiki && <a href={DataEntitie.linl_wiki} target="_blanck" >Link Wiki</a>}
        </div>
      </Popover>
    </>
  );
}
