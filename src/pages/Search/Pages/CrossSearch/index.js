import React, { useEffect, useLayoutEffect, useState } from "react";
import api from "src/config/api"

import { Container } from "src/styles/Search";

import DataTable from "react-data-table-component";
import Button from "@material-ui/core/Button";

import Searching from "src/assets/svg/searching.svg";
import noData from "src/assets/svg/noData.svg";

import InputAutoComplete from "src/components/InputAutoComplete";
import Loading from "src/components/loading";

import ExpandleComponent from "src/components/ExpandleComponent";

import { columns, customStyles } from "src/config/DataTableConfig";

import SearchController from "src/controller/Search";
import CrossSearchController from "src/controller/CrossSearch";
import PageDataError from "src/components/PageDataError";
import { Result } from "src/data/moocks";

import DataList from 'src/pages/Search/Components/DataList'

export default function CrossSearch({ ative, dataSearch }) {
  const [dataResponse, setDataResponse] = useState([]);
  const [dataSearchPolyphenol, setDataSearchPolyphenol] = useState("");
  const [dataSearchChemical, setDataSearchChemical] = useState("");

  const [dataList, setDataList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errorDataSearch, setError] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);
  const [totalregister, setTotalRegister] = useState(0);
  const [textSearch, setTextSearch] = useState([]);

  const handleSearch = async (
    polifenol = dataSearchPolyphenol,
    cancer = dataSearchChemical
  ) => {
    setLoading(true);
    setNoDataFound(false);
    setError(false);

    const response = await SearchController.search({
      dataSearchPolyphenol: polifenol,
      dataSearchChemical: cancer,
    });

    if (response && response.data) {
      const { data } = response;
      const text = `${polifenol}${cancer !== "" && polifenol !== "" && ", "
        }${cancer}.`;
      setTextSearch(text);

      setTotalRegister(Array.isArray(data) ? data.length : 0);
      setDataResponse(Array.isArray(data) ? data : []);

      // resetInputComplete();

      setDataSearchPolyphenol("")
      setDataSearchChemical("")

      data.length === 0 && setNoDataFound(true);
    } else {
      setError(true);
    }

    setLoading(false);
  };

  const [dataCompletePolyphenol, setDataCompletePolyphenol] = useState([]);
  const [dataCompleteCancer, setDataCompleteCancer] = useState([]);
  const [loadingAutoCompleteP, setLoadingAutoCompleteP] = useState(false);
  const [loadingAutoCompleteC, setLoadingAutoCompleteC] = useState(false);


  useEffect(() => {
    const data = { data: dataSearchPolyphenol, name: "dataCompletePolyphenol" };
    debounceEvent(loadDataComplete, data, 2000)
  }, [dataSearchPolyphenol]);

  useEffect(() => {
    const data = { data: dataSearchChemical, name: "dataSearchChemical" };
    debounceEvent(loadDataComplete, data, 2000)
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
    setLoadingAutoCompleteP(true);
    setLoadingAutoCompleteC(true);

    const response = await api
      .get("/searchTerms", {
        params: {
          name: data,
          type: name === "dataCompletePolyphenol" ? "polifenol" : "cancer",
        },
      })
      .then(({ data }) => data);

    name === "dataCompletePolyphenol"
      ? setDataCompletePolyphenol(response)
      : setDataCompleteCancer(response);

    setLoadingAutoCompleteP(false);
    setLoadingAutoCompleteC(false);
  };


  // const resetInputComplete = () => {
  //   const listCancer = CrossSearchController.listCancer();
  //   const listPolifenols = CrossSearchController.listPolifenols();

  //   setDataSearchPolyphenol("");
  //   setDataSearchChemical("");

  //   setDataCompleteCancer(listCancer);
  //   setDataCompletePolyphenol(listPolifenols);
  // };

  useEffect(() => {
    if (typeof dataSearch === "object") {
      const { cancer, polifenol } = dataSearch;
      handleSearch(polifenol, cancer);
    }
  }, [dataSearch]);

  useLayoutEffect(() => {
    let isReady = true;
    if (isReady) {
      setLoadingAutoCompleteP(true);
      setLoadingAutoCompleteC(true);
      setLoading(true);

      // resetInputComplete();

      setLoading(false);
      setLoadingAutoCompleteP(false);
      setLoadingAutoCompleteC(false);
    }
    return () => (isReady = false);
  }, []);

  useEffect(() => {
    let isReady = true;
    if (dataSearchPolyphenol !== "") {
      const newList = CrossSearchController.sortedByPolifenol(
        dataSearchPolyphenol
      );
      isReady && setDataList(newList);
    }
    return () => (isReady = false);
  }, [dataSearchPolyphenol]);

  useEffect(() => {
    let isReady = true;
    if (dataSearchChemical !== "") {
      const newList = CrossSearchController.sortedByCancer(dataSearchChemical);
      isReady && setDataList(newList);
    }
    return () => (isReady = false);
  }, [dataSearchChemical]);

  useEffect(() => {
    dataSearchPolyphenol !== "" && dataSearchChemical !== "" && setDataList([])
  }, [dataSearchPolyphenol, dataSearchChemical])

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
    } else if (dataResponse.length === 0 && noDataFound === false) {
      return (
        <section className="containerInformationSearch">
          <img className="img" src={Searching} alt="" />
          <p>Enter the terms to perform the search in our database.</p>
        </section>
      );
    }
  };

  // console.log(loadingAutoCompleteC, loadingAutoCompleteP, loading);

  if (!ative) return <></>;

  if (errorDataSearch) return <PageDataError />;

  if (loading) return <Loading />;

  return (
    <Container ative>
      <header>
        <InputAutoComplete
          disabled={loading}
          options={dataCompletePolyphenol}
          loading={loadingAutoCompleteP}
          setData={setDataSearchPolyphenol}
          data={dataSearchPolyphenol}
          label="Enter with polyphenol..."
        />

        <InputAutoComplete
          disabled={loading}
          options={dataCompleteCancer}
          loading={loadingAutoCompleteC}
          setData={setDataSearchChemical}
          data={dataSearchChemical}
          label="Enter with chemical..."
        />

        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSearch()}
            disabled={
              loading ||
              dataSearchChemical === "" ||
              dataSearchPolyphenol === ""
            }
          >
            Search
          </Button>
        </div>
      </header>

      {dataList.length > 0 ?
        <DataList
          data={dataList}
          handleSearch={handleSearch}
          dataSearchPolyphenol={dataSearchPolyphenol}
          dataSearchChemical={dataSearchChemical}
          setDataList={setDataList} />
        : SwitchVisibleContent()
      }

      {noDataFound && (
        <section className="containerInformationSearch">
          <img className="img" src={noData} alt="" />
          <p>No results found.</p>
        </section>
      )}
    </Container>
  );
}