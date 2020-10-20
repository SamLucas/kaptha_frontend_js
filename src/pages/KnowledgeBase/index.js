import React from "react";
import Header from "src/components/Header";

import KnowledgeBaseData from "src/data/dfCrossIndexCancerDistribuicao";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function KnowledgeBase() {
  const classes = useStyles();

  return (
    <Header>
      <h2>Knowledgebase Info</h2>
      <p style={{ margin: "15px 0" }}>
        CANCROX is a database developed from the text mining process of
        biomedical text literature that allows researchers to access information
        on drugs,combinations of drugs, genes and therapies associated with more
        than 40 types of cancer. This database was constructed from the
        identification of 477 homologous genes between human and canine
        associated with cancer. Researchers working with animal models can find
        in this database a complete set of information to aid in their research.
      </p>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                Type Of Information In The Database
              </StyledTableCell>
              <StyledTableCell align="right">
                Entries In The Database
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {KnowledgeBaseData.map((row) => {
              const { id, Var1, Freq } = row;
              return (
                <StyledTableRow key={id}>
                  <StyledTableCell component="th" scope="row">
                    {Var1}
                  </StyledTableCell>
                  <StyledTableCell align="right">{Freq}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Header>
  );
}
