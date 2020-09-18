import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { Container } from "./styles";

import { GrSearch } from "react-icons/gr";
import Pagination from "react-js-pagination";
import Searching from "../../assets/svg/searching.svg";
import noData from "../../assets/svg/noData.svg";

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

  const handleSearch = async (numberPage = 1) => {
    setLoading(true);
    setNoDataFound(false);

    const { data } = await searchApi({
      dataSearchPolyphenol,
      dataSearchChemical,
    });

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

  return (
    <Container>
      <header>
        <h1>Kaptha</h1>

        <input
          type="text"
          value={dataSearchPolyphenol}
          placeholder={"Enter with polyphenol."}
          onChange={(e) => {
            const str = e.target.value;
            var splitStr = str.toLowerCase().split(" ");
            for (var i = 0; i < splitStr.length; i++) {
              // You do not need to check if i is larger than splitStr length, as your for does that for you
              // Assign it back to the array
              splitStr[i] =
                splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            // Directly return the joined string

            setDataSearchPolyphenol(splitStr.join(" "));
          }}
          autoCapitalize="characters"
        />
        <input
          type="text"
          value={dataSearchChemical}
          placeholder={"Enter with chemical."}
          onChange={(e) => {
            const str = e.target.value;
            var splitStr = str.toLowerCase().split(" ");
            for (var i = 0; i < splitStr.length; i++) {
              // You do not need to check if i is larger than splitStr length, as your for does that for you
              // Assign it back to the array
              splitStr[i] =
                splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            // Directly return the joined string

            setDataSearchChemical(splitStr.join(" "));
          }}
          autoCapitalize="characters"
        />
        <button type="button" onClick={handleSearch}>
          <GrSearch className={"buttonSearch"} color="#FFF" />
        </button>
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
            <p>
              Termos pesquisados:{" "}
              {JSON.parse(JSON.stringify(dataSearchPolyphenol))}{" "}
              {dataSearchChemical !== "" && dataSearchPolyphenol !== "" && ", "}{" "}
              {JSON.parse(JSON.stringify(dataSearchChemical))}.
            </p>
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
