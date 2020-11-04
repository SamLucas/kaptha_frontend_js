import React from "react";

import { withStyles, makeStyles, styled } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#3F3C56",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function TableInfo({ relatedEntities, entitieSelected }) {
  const classes = useStyles();

  const handleCrossSearch = (entite) => {
    const { typeTerm, termIdentificator } = entite;

    const dataSearchPolyphenol =
      typeTerm === "polifenol" ? termIdentificator : entitieSelected;
    const dataSearchChemical =
      typeTerm === "cancer" ? termIdentificator : entitieSelected;

    return { dataSearchPolyphenol, dataSearchChemical };
  };

  if (relatedEntities.length === 0) return <></>;

  return (
    <>
      <h2>Related entities ({relatedEntities.length})</h2>
      <p style={{ margin: "15px 0" }}>
        List of entities related to the searched term.
      </p>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Index</StyledTableCell>
              <StyledTableCell>Name of related entities</StyledTableCell>
              <StyledTableCell align="right">
                Number of associated records
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {relatedEntities
              .sort((a, b) => parseInt(b.quant) - parseInt(a.quant))
              .map((row, index) => {
                const { id, quant, termIdentificator } = row;
                const {
                  dataSearchPolyphenol,
                  dataSearchChemical,
                } = handleCrossSearch(row);

                return (
                  <StyledTableRow
                    to={`/${dataSearchPolyphenol}/${dataSearchChemical}`}
                    style={{ textDecoration: "none" }}
                    component={Link}
                    target="_blank"
                    key={id}
                  >
                    <StyledTableCell component="th" scope="row">
                      {index}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {termIdentificator}
                    </StyledTableCell>
                    <StyledTableCell align="right">{quant}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
