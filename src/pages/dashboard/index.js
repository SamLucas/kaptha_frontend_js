import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { Container } from "./styles";

import ReactLoading from "react-loading";

import { GrSearch } from "react-icons/gr";
import Pagination from "react-js-pagination";
import Searching from "../../assets/svg/searching.svg";
import api from "../../config/api";

export default function Dashboard() {
  const [dataResponse, setDataResponse] = useState([]);
  const [dataSearch, setDataSearch] = useState("");

  const [colapseStatus, setColapseStatus] = useState(-1);

  const [limit] = useState(4);
  const [loading, setLoading] = useState(false);

  const [totalPage, setTotalPage] = useState(0);
  const [totalregister, setTotalRegister] = useState(0);
  const [indexPage, setIndexPage] = useState(1);

  const searchAPI = (numberPage = 1) => {
    setLoading(true);

    api
      .get("/search", {
        params: {
          dataSearch,
          limit,
          page: typeof numberPage === "number" ? numberPage : 1,
        },
      })
      .then((res) => {
        const response = res.data;

        setLoading(false);

        if (totalregister !== response.pages) {
          var aux = parseInt(response.pages / limit);
          if (aux * limit !== response.pages) aux += 1;
          setTotalPage(aux);
          setTotalRegister(response.pages);
        }

        setDataResponse(response.articles);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleFindPhrase = (text, frase) => {
    frase.forEach((element) => {
      text = text
        .split(element.original_sentence)
        .join(
          `<span style="font-weight:bold;">${element.original_sentence}</span>`
        );
    });

    return text;
  };

  return (
    <Container>
      <header>
        <h1>Kaptha</h1>
        <div>
          <input
            type="text"
            value={dataSearch}
            placeholder={"Enter terms separated by commas."}
            onChange={(e) => setDataSearch(e.target.value)}
          />
          <button type="button" onClick={searchAPI}>
            <GrSearch className={"buttonSearch"} color="#FFF" />
          </button>
        </div>
      </header>

      {loading ? (
        <section className={"loading"}>
          <ReactLoading
            className={"spinner"}
            type={"spin"}
            color="#000"
            width="200px"
            height="200px"
          />
          <p>Carregando...</p>
        </section>
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
            <p>Termos pesquisados: {dataSearch}</p>
          </div>

          {dataResponse.map((ele, index) => (
            <div key={JSON.stringify(index)} className="cardContainer">
              <h1>{ele.title_article}</h1>
              {colapseStatus === index ? (
                <Collapse isOpened={colapseStatus === index}>
                  <p
                    id="colapseTrue"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: handleFindPhrase(
                        ele.abstract_article,
                        ele.ruleAssociationsExtracted
                      ),
                    }}
                  />
                </Collapse>
              ) : (
                <p id="colapseFalse">{ele.abstract_article}</p>
              )}

              <button
                id="button"
                type="button"
                onClick={() =>
                  setColapseStatus((state) => (state === index ? -1 : index))
                }
              >
                {!colapseStatus ? "Mais detalhes..." : "Menos detalhes..."}
              </button>
            </div>
          ))}

          <Pagination
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
              searchAPI(k);
              setIndexPage(k);
            }}
          />
        </section>
      ) : (
        <section className="containerInformationSearch">
          <img className="img" src={Searching} alt="" />
          {/* <p>
            Digite os termos separados por virgula para realizar a busca em
            nossa base de dados.
          </p> */}
        </section>
      )}
    </Container>
  );
}
