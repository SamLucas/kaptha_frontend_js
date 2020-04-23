import React, { useState, useEffect, useCallback } from "react";
import { Collapse } from "react-collapse";
import { Container } from "./styles";

import ReactLoading from "react-loading";

import api from "../../config/api";

export default function Dashboard() {
  const [dataSearch, setDataSearch] = useState([]);
  const [cancer, setCancer] = useState("Acquired Immunodeficiency Syndrome");
  const [chemicals, setChemicals] = useState("");

  const [colapseStatus, setColapseStatus] = useState(-1);

  const [limit] = useState(4);
  const [loading, setLoading] = useState(false);

  const [totalPage, setTotalPage] = useState(0);
  const [totalregister, setTotalRegister] = useState(0);
  const [indexPage, setIndexPage] = useState(1);

  const searchAPI = (page = null) => {
    setLoading(true);
    api
      .get("/search", {
        params: {
          cancer,
          chemicals,
          limit,
          page,
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

        setDataSearch(response.articles);
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

  const handlePaginate = () => {
    const number = [];
    for (let k = 1; k <= totalPage; k += 1) {
      number.push(
        <button
          key={k}
          type="button"
          className={!(k === indexPage) ? "paginateItem" : "paginateItemAtivo"}
          onClick={() => {
            searchAPI(k);
            setIndexPage(k);
          }}
        >
          {k}
        </button>
      );
    }
    return number;
  };

  return (
    <Container>
      <header>
        <h1>Kaptha</h1>
        <div>
          <input
            type="text"
            value={cancer}
            onChange={(e) => setCancer(e.target.value)}
          />
          <input
            type="text"
            value={chemicals}
            onChange={(e) => setChemicals(e.target.value)}
          />
          <button type="button" onClick={searchAPI}>
            Pesquisar
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
            delay="0"
          />
          <p center>Carregando...</p>
        </section>
      ) : (
        <section>
          {dataSearch.length > 0 && (
            <h1>
              {totalregister === 1
                ? `${totalregister} registro encontrado.`
                : totalregister < 1
                ? "Nenhum registro encontrado."
                : `${totalregister} registros encontrados.`}
            </h1>
          )}

          {dataSearch.length > 0 &&
            dataSearch.map((ele, index) => (
              <div key={JSON.stringify(index)}>
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

          {dataSearch.length > 0 && handlePaginate()}
        </section>
      )}
    </Container>
  );
}
