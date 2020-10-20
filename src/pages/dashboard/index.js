import React, { useEffect, useState } from "react";

import { Container } from "./styles";

import DataTable from "react-data-table-component";
import Button from "@material-ui/core/Button";

import Searching from "../../assets/svg/searching.svg";
import noData from "../../assets/svg/noData.svg";
import InputAutoComplete from "../../components/InputAutoComplete";
import ExpandleComponent from "../dashboard/components/expandleComponent";

import Header from "../../components/Header";
import Loading from "./components/loading";

import api from "../../config/api";
import { columns, customStyles } from "../../config/DataTableConfig";

import SearchController from "src/controller/search/index";
// import { Result } from "./moocks";

export default function Dashboard() {
  const [dataResponse, setDataResponse] = useState([]);
  const [dataSearchPolyphenol, setDataSearchPolyphenol] = useState("");
  const [dataSearchChemical, setDataSearchChemical] = useState("");

  const [loading, setLoading] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);

  const [totalregister, setTotalRegister] = useState(0);

  const [textSearch, setTextSearch] = useState([]);

  const handleSearch = async (numberPage = 1) => {
    setLoading(true);
    setNoDataFound(false);

    const { data } = await SearchController.search({
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

  const TotalRegisterAcount = () => {
    switch (totalregister) {
      case totalregister === 1:
        return `${totalregister} record found.`;
      case totalregister < 1:
        return "No record found.";
      case totalregister > 1:
        return `${totalregister} records found.`;
      default:
        return "";
    }
  };

  const SwitchVisibleContent = () => {
    if (loading) {
      return <Loading />;
    } else if (dataResponse.length > 0) {
      return (
        <section>
          <div className="classInformation">
            <h1 className={"registerFind"}>{TotalRegisterAcount()}</h1>
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
            paginationPerPage={100}
          />
        </section>
      );
    } else if (
      dataResponse.length === 0 &&
      dataSearchPolyphenol === "" &&
      dataSearchChemical === ""
    ) {
      return (
        <section className="containerInformationSearch">
          <img className="img" src={Searching} alt="" />
          <p>Enter the terms to perform the search in our database.</p>
        </section>
      );
    }
  };

  return (
    <Header>
      <Container>
        <header>
          <InputAutoComplete
            disabled={loading}
            options={dataCompletePolyphenol}
            loading={loadingAutoComplete}
            setData={setDataSearchPolyphenol}
            data={dataSearchPolyphenol}
            label="Enter with polyphenol..."
          />

          <InputAutoComplete
            disabled={loading}
            options={dataCompleteCancer}
            loading={loadingAutoComplete}
            setData={setDataSearchChemical}
            data={dataSearchChemical}
            label="Enter with chemical..."
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

        {SwitchVisibleContent()}

        {noDataFound && (
          <section className="containerInformationSearch">
            <img className="img" src={noData} alt="" />
            <p>No results found.</p>
          </section>
        )}
      </Container>
    </Header>
  );
}
