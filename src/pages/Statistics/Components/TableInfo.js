import React, { useEffect, useState } from "react";

import { withStyles, makeStyles, styled } from "@material-ui/core/styles";
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from '@material-ui/core/Input';
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";


import { Link } from "react-router-dom";

import { capitalize, debounceEvent } from 'src/Utils/index'

import CrossSearch from "src/controller/CrossSearch"

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

  const [dataSearch, setDataSearch] = useState([])
  const [inputSearch, setInputSearch] = useState("")
  const [searchLoading, setSearchLoading] = useState(false)
  const [resultNotFound, setResultNotFound] = useState(false)

  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(0);

  const typeTermSeach = CrossSearch.searchTerm(entitieSelected)

  const handleCrossSearch = (entite) => {
    const { typeTerm, termIdentificator } = entite;

    let dataSearchPolyphenol = "";
    let dataSearchChemical = "";
    let typeSearch = 0;

    if (typeTerm === "polifenol" && typeTermSeach !== "polifenol") {
      dataSearchPolyphenol = termIdentificator
      dataSearchChemical = entitieSelected
      typeSearch = typeTermSeach === "cancer" ? 0 : 1
      console.log("1", typeTermSeach)
    } else {
      dataSearchPolyphenol = entitieSelected
      dataSearchChemical = termIdentificator
      typeSearch = typeTerm === "cancer" ? 0 : 1
      console.log("2", typeTerm)
    }

    return {
      dataSearchPolyphenol,
      dataSearchChemical,
      typeSearch
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterData = () => {
    setSearchLoading(true)
    setResultNotFound(false)

    if (inputSearch !== "") {
      const response = relatedEntities.filter(e => {
        const regex = new RegExp(inputSearch, 'gi')
        const { termIdentificator } = e

        if (typeof termIdentificator == "string")
          return termIdentificator.match(regex)
        else
          return false
      })

      if (response.length > 0) setDataSearch(response)
      else {
        setDataSearch([])
        setResultNotFound(true)
      }
    } else setDataSearch([])

    setSearchLoading(false)
  }

  const _renderInfoTable = e =>
    e.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
      const { id, quant, typeTerm, termIdentificator } = row;

      const {
        dataSearchPolyphenol,
        dataSearchChemical,
        typeSearch
      } = handleCrossSearch(row);

      return (
        <StyledTableRow
          to={`/${typeSearch}/${dataSearchPolyphenol}/${dataSearchChemical}`}
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
          <StyledTableCell component="th" scope="row">
            {capitalize(typeTerm)}
          </StyledTableCell>
          <StyledTableCell align="right">{quant}</StyledTableCell>
        </StyledTableRow>
      );
    })

  if (relatedEntities.length === 0) return <></>;

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40
      }}>
        <div style={{
          width: "50%",
        }}>
          <h2>Related entities ({relatedEntities.length})</h2>
          <p style={{ margin: "15px 0" }}>
            List of entities related to the searched term.
            </p>
        </div>
        <div style={{
          width: "50%",
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end"
        }}>
          <div style={{
            marginRight: 10
          }}>
            <TextField
              type="search"
              value={inputSearch}
              id="standard-search"
              label="Search field"
              placeholder="Search for an entity"
              onChange={e => setInputSearch(e.target.value)}
            />
          </div>

          <div style={{
            marginRight: 10
          }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => filterData()}
              disabled={
                searchLoading
              }
            >
              Search
          </Button>
          </div>
        </div>
      </div>

      <p style={{
        textAlign: "right",
        marginTop: 5,
        marginBottom: 5
      }}>{
          searchLoading ?
            "Loading Search...." :
            resultNotFound ?
              `${dataSearch.length} result found.` : ""}
      </p>

      <div style={{
        marginTop: 40
      }}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Index</StyledTableCell>
                <StyledTableCell>Name of related entities</StyledTableCell>
                <StyledTableCell>Type of related entities</StyledTableCell>
                <StyledTableCell align="right">
                  Number of associated records
              </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSearch.length > 0 ?
                _renderInfoTable(dataSearch) :
                resultNotFound ?
                  _renderInfoTable([{
                    id: 0,
                    quant: 0,
                    termIdentificator: "Result not found"
                  }]) :
                  _renderInfoTable(relatedEntities)
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[100, 50, 25]}
          component="div"
          count={dataSearch.length > 0 ?
            dataSearch.length :
            resultNotFound ? 1 :
              relatedEntities.length
          }
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}
