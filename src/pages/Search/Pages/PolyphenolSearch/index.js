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

export default function PolyphenolSearch({ ative }) {
  const [dataResponse, setDataResponse] = useState([]);
  const [dataSearchPolyphenol, setDataSearchPolyphenol] = useState("");

  const [loading, setLoading] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);
  const [totalregister, setTotalRegister] = useState(0);

  const [textSearch, setTextSearch] = useState([]);

  const handleSearch = async (numberPage = 1) => {
    setLoading(true);
    setNoDataFound(false);

    const { data } = await SearchController.search({
      dataSearchPolyphenol,
    });

    if (data) {
      const text = `${dataSearchPolyphenol}.`;
      setTextSearch(text);
    }

    setDataSearchPolyphenol("")

    setTotalRegister(Array.isArray(data) ? data.length : 0);
    setDataResponse(Array.isArray(data) ? data : []);
    setLoading(false);
    data.length === 0 && setNoDataFound(true);
  };

  const [dataCompletePolyphenol, setDataCompletePolyphenol] = useState([]);
  const [loadingAutoComplete, setLoadingAutoComplete] = useState(false);

  useEffect(() => {
    const data = { data: dataSearchPolyphenol, name: "dataSearchPolyphenol" };
    debounceEvent(loadDataComplete, data, 2000);
  }, [dataSearchPolyphenol]);

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
          type: "polifenol",
        },
      })
      .then(({ data }) => data);

    setDataCompletePolyphenol(response);
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
            paginationRowsPerPageOptions={[100, 50, 40, 30, 20]}
            paginationPerPage={100}
          />
        </section>
      );
    } else if (dataResponse.length === 0 && dataSearchPolyphenol === "") {
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
          options={dataCompletePolyphenol}
          loading={loadingAutoComplete}
          setData={setDataSearchPolyphenol}
          data={dataSearchPolyphenol}
          label="Enter with polyphenol..."
        />

        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSearch}
            disabled={loading || dataSearchPolyphenol === ""}
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
