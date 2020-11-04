import React, { useEffect, useState } from "react";

import { Container } from "src/styles/Search";

import DataTable from "react-data-table-component";
import Button from "@material-ui/core/Button";

import Searching from "src/assets/svg/searching.svg";
import noData from "src/assets/svg/noData.svg";

import InputAutoComplete from "src/components/InputAutoComplete";
import Loading from "src/components/loading";

import ExpandleComponent from "src/components/ExpandleComponent";

import api from "src/config/api";
import { columns, customStyles } from "src/config/DataTableConfig";

import SearchController from "src/controller/Search";

export default function CancerSearch({ ative }) {
  const [dataResponse, setDataResponse] = useState([]);

  const [dataSearchChemical, setDataSearchChemical] = useState("");

  const [loading, setLoading] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);

  const [totalregister, setTotalRegister] = useState(0);

  const [textSearch, setTextSearch] = useState([]);

  const handleSearch = async (numberPage = 1) => {
    setLoading(true);
    setNoDataFound(false);

    const { data } = await SearchController.search({
      dataSearchChemical,
    });

    if (data) {
      const text = `${dataSearchChemical}.`;
      setTextSearch(text);
    }

    setDataSearchChemical("")

    setTotalRegister(Array.isArray(data) ? data.length : 0);
    setDataResponse(Array.isArray(data) ? data : []);
    setLoading(false);
    data.length === 0 && setNoDataFound(true);
  };

  const [dataCompleteCancer, setDataCompleteCancer] = useState([]);
  const [loadingAutoComplete, setLoadingAutoComplete] = useState(false);

  useEffect(() => {
    const data = { data: dataSearchChemical, name: "dataSearchChemical" };

    console.log(dataSearchChemical)
    dataSearchChemical !== "" ? debounceEvent(loadDataComplete, data, 2000) : loadDataComplete(data)
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
          type: "cancer",
        },
      })
      .then(({ data }) => data);
    setDataCompleteCancer(response);
    setLoadingAutoComplete(false);
  };

  const TotalRegisterAcount = () => {
    if (totalregister === 1) return `${totalregister} record found.`;
    else if (totalregister < 1) return "No record found.";
    else if (totalregister > 1) return `${totalregister} records found.`;
  };

  const SwitchVisibleContent = () => {
    if (loading) {
      return <Loading />;
    } else if (dataResponse.length > 0) {
      return (
        <section>
          <div className="classInformation">
            <h1 className={"registerFind"}>{TotalRegisterAcount()}</h1>
            <p>Search terms: {textSearch}</p>
          </div>

          <DataTable
            data={dataResponse}
            columns={columns}
            expandableRows
            expandableRowsComponent={<ExpandleComponent />}
            noHeader={true}
            customStyles={customStyles}
            pagination={true}
            paginationRowsPerPageOptions={[100, 50, 40, 30, 20]}
            paginationPerPage={100}
          />
        </section>
      );
    } else if (dataResponse.length === 0 && dataSearchChemical === "") {
      return (
        <section className="containerInformationSearch">
          <img className="img" src={Searching} alt="" />
          <p>Enter the terms to perform the search in our database.</p>
        </section>
      );
    }
  };

  if (!ative) return <></>;

  return (
    <Container>
      <header>
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
            disabled={loading || dataSearchChemical === ""}
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
  );
}
