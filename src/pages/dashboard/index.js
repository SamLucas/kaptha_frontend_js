import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { Container } from "./styles";

import { GrSearch } from "react-icons/gr";
import Pagination from "react-js-pagination";
import Searching from "../../assets/svg/searching.svg";
import noData from "../../assets/svg/noData.svg";

import api from "../../config/api";

import {
  searchApi,
  handleFindPhrase,
  getTypesAssociation,
  handleFindEntitiesPhrase,
} from "./functions";
import { ColorAssociation, Result } from "./moocks";

import Loading from "./components/loading";
import TagAssociation from "./components/tagAssociation";
import DataTable from "react-data-table-component";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function Dashboard() {
  const [dataResponse, setDataResponse] = useState([]);
  const [dataSearchPolyphenol, setDataSearchPolyphenol] = useState("");
  const [dataSearchChemical, setDataSearchChemical] = useState("");

  const [colapseStatus, setColapseStatus] = useState(-1);

  const [limit] = useState(15);
  const [loading, setLoading] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);

  const [, setTotalPage] = useState(0);
  const [totalregister, setTotalRegister] = useState(0);
  const [indexPage, setIndexPage] = useState(1);

  const [textSearch, setTextSearch] = useState([]);

  const handleSearch = async (numberPage = 1) => {
    setLoading(true);
    setNoDataFound(false);

    const { data } = await searchApi({
      dataSearchPolyphenol,
      dataSearchChemical,
    });

    if (data) {
      const text = `${dataSearchPolyphenol}${
        dataSearchChemical !== "" && dataSearchPolyphenol !== "" && ", "
      }${dataSearchChemical}.}`;
      setTextSearch(text);
    }

    setTotalRegister(Array.isArray(data) ? data.length : 0);
    setDataResponse(Array.isArray(data) ? data : []);
    setLoading(false);
    data.length === 0 && setNoDataFound(true);
  };

  const columnsRule = [
    {
      name: "Rule",
      width: "60%",
      cell: (row) => {
        const { original_sentence } = row;
        return <p>{original_sentence?.substring(0, 80) + "..."}</p>;
      },
    },
    {
      name: "Association Type",
      sortable: true,
      width: "15%",
      cell: (row) => {
        const { description } = ColorAssociation[row.association_type];
        return <p>{description}</p>;
      },
    },
    {
      name: "Phrase weight",
      selector: "peso_frase",
      sortable: true,
      center: true,
      width: "10%",
    },
    {
      name: "Gene weight",
      selector: "peso_genes",
      sortable: true,
      center: true,
      width: "10%",
    },
  ];

  const columns = [
    {
      name: "Title",
      sortable: true,
      cell: (row) => (
        <div style={{ padding: "20px 0px" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              paddingBottom: "4px",
            }}
          >
            {row.article.title_article?.substring(0, 120) + "..."}
          </div>
          {row.article.abstract_article?.substring(0, 120) + "..."}
        </div>
      ),
      width: "45%",
    },
    {
      name: "PMID",
      selector: "pmid",
      sortable: true,
      width: "10%",
      center: true,
    },
    {
      name: "Score Phare",
      selector: "peso_rules",
      sortable: true,
      width: "10%",
      center: true,
    },
    {
      name: "Pesso Entities",
      selector: "peso_entities",
      sortable: true,
      width: "10%",
      center: true,
    },
    {
      name: "Score Gene",
      selector: "peso_genes",
      sortable: true,
      width: "10%",
      center: true,
    },
    {
      name: "Score Total",
      selector: "peso_final",
      sortable: true,
      width: "10%",
      center: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        fontWeight: "bold", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
  };

  const ExpandleComponentPhase = ({ data }) => {
    const { original_sentence, entitiesRules, end_pos, start_pos } = data;

    return (
      <div key={JSON.stringify(data)} className="cardContainer">
        <p
          id="colapseTrue"
          dangerouslySetInnerHTML={{
            __html: handleFindEntitiesPhrase(
              original_sentence,
              start_pos,
              end_pos,
              entitiesRules
            ),
          }}
        />
      </div>
    );
  };

  const ExpandleComponent = ({ data }) => {
    const { article, rule } = data;

    return (
      <div key={JSON.stringify(data)} className="cardContainer">
        <h1>{article.title_article}</h1>

        <p
          id="colapseTrue"
          dangerouslySetInnerHTML={{
            __html: handleFindPhrase(article.abstract_article, rule),
          }}
        />

        {/* <p>{article.abstract_article}</p> */}

        {TagAssociation(rule)}

        <DataTable
          data={rule}
          columns={columnsRule}
          expandableRows
          expandableRowsComponent={<ExpandleComponentPhase />}
          noHeader={true}
          customStyles={{
            headCells: {
              style: {
                fontWeight: "bold", // override the cell padding for head cells
                paddingRight: "8px",
              },
            },
          }}
          pagination={true}
          paginationRowsPerPageOptions={[5, 10, 15]}
          paginationPerPage={5}
        />

        {/* <button id="button" type="button">
      {!colapseStatus ? "Mais detalhes..." : "Menos detalhes..."}
    </button> */}
      </div>
    );
  };

  const [dataCompletePolyphenol, setDataCompletePolyphenol] = useState([]);
  const [dataCompleteCancer, setDataCompleteCancer] = useState([]);
  const [loadingAutoComplete, setLoadingAutoComplete] = useState(false);

  useEffect(() => {
    const data = { data: dataSearchPolyphenol, name: "dataSearchPolyphenol" };
    debounceEvent(loadDataComplete, data, 2000);
  }, [dataSearchPolyphenol]);

  useEffect(() => {
    const data = { data: dataSearchChemical, name: "dataSearchChemical" };
    debounceEvent(loadDataComplete, data, 2000);
  }, [dataSearchChemical]);

  const debounceEvent = (fn, params, wait = 1000, time) => {
    clearTimeout(
      time,
      (time = setTimeout(() => {
        fn(params);
      }, wait))
    );
  };

  const loadDataComplete = async ({ data, name }) => {
    setLoadingAutoComplete(true);
    const response = await api
      .get("/searchTerms", {
        params: {
          name: data,
          type: name !== "dataSearchPolyphenol" ? "cancer" : "polifenol",
        },
      })
      .then(({ data }) => data);

    name === "dataSearchPolyphenol"
      ? setDataCompletePolyphenol(response)
      : setDataCompleteCancer(response);
    setLoadingAutoComplete(false);
  };

  return (
    <Container>
      <header>
        <h1>Kaptha</h1>

        <Autocomplete
          id="debug"
          debug
          disabled={loading}
          options={dataCompletePolyphenol}
          loading={loadingAutoComplete}
          getOptionLabel={(option) => option.label}
          onSelectCapture={(e) => {
            const txt = e.target.value;
            setDataSearchPolyphenol(txt);
          }}
          style={{ width: "30%", margin: "auto 0" }}
          renderInput={(params) => (
            <TextField
              {...params}
              value={dataSearchPolyphenol}
              onChange={(e) => setDataSearchPolyphenol(e.target.value)}
              label="Enter with polyphenol..."
              variant="outlined"
            />
          )}
        />

        <Autocomplete
          id="debug"
          debug
          disabled={loading}
          options={dataCompleteCancer}
          getOptionLabel={(option) => option.label}
          onSelectCapture={(e) => {
            const txt = e.target.value;
            setDataSearchChemical(txt);
          }}
          style={{
            width: "30%",
            margin: "auto 0",
            marginLeft: 10,
            marginRight: 20,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              value={dataSearchChemical}
              onChange={(e) => {
                const txt = e.target.value;
                setDataSearchChemical(txt);
              }}
              label="Enter with chemical..."
              variant="outlined"
            />
          )}
        />
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSearch}
            disabled={loading}
          >
            Search
          </Button>
        </div>
      </header>

      {loading ? (
        <Loading />
      ) : dataResponse.length > 0 ? (
        <section>
          <div className="classInformation">
            <h1 className={"registerFind"}>
              {totalregister === 1
                ? `${totalregister} record found.`
                : totalregister < 1
                ? "No record found."
                : `${totalregister} records found.`}
            </h1>
            <p>Termos pesquisados: {textSearch}</p>
          </div>

          <DataTable
            data={dataResponse}
            columns={columns}
            expandableRows
            expandableRowsComponent={<ExpandleComponent />}
            noHeader={true}
            customStyles={customStyles}
            pagination={true}
            paginationRowsPerPageOptions={[20, 30, 40]}
            paginationPerPage={20}
          />

          {/* <Pagination
            activePage={indexPage}
            itemsCountPerPage={4}
            totalItemsCount={totalregister}
            pageRangeDisplayed={5}
            innerClass={"containerPaginate"}
            itemClass={"paginateItem"}
            activeClass={"paginateItemAtivo"}
            itemClassFirst={"paginateItemAtivo"}
            itemClassPrev={"paginateItemAtivo"}
            itemClassNext={"paginateItemAtivo"}
            itemClassLast={"paginateItemAtivo"}
            onChange={(k) => {
              handleSearch(k);
              setIndexPage(k);
            }}
          /> */}
        </section>
      ) : (
        dataResponse.length === 0 &&
        dataSearchPolyphenol === "" &&
        dataSearchChemical === "" && (
          <section className="containerInformationSearch">
            <img className="img" src={Searching} alt="" />
            <p>Enter the terms to perform the search in our database.</p>
          </section>
        )
      )}

      {noDataFound && (
        <section className="containerInformationSearch">
          <img className="img" src={noData} alt="" />
          <p>No results found.</p>
        </section>
      )}
    </Container>
  );
}
