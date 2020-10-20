import React, { useEffect, useState } from "react";

import { Container } from "src/styles/Search";

import DataTable from "react-data-table-component";
import Button from "@material-ui/core/Button";

import Searching from "src/assets/svg/searching.svg";
import noData from "src/assets/svg/noData.svg";

import InputAutoComplete from "src/components/InputAutoComplete";
import Loading from "src/components/loading";
import Header from "src/components/Header";
import ExpandleComponent from "src/components/ExpandleComponent";

import { columns, customStyles } from "src/config/DataTableConfig";

import SearchController from "src/controller/Search";
import CrossSearchController from "src/controller/CrossSearch";
// import { Result } from "./moocks";

export default function CrossSearch() {
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
      }${dataSearchChemical}.`;
      setTextSearch(text);
    }

    setTotalRegister(Array.isArray(data) ? data.length : 0);
    setDataResponse(Array.isArray(data) ? data : []);
    setLoading(false);
    data.length === 0 && setNoDataFound(true);
  };

  const [dataCompletePolyphenol, setDataCompletePolyphenol] = useState([]);
  const [dataCompleteCancer, setDataCompleteCancer] = useState([]);
  const [loadingAutoCompleteP, setLoadingAutoCompleteP] = useState(false);
  const [loadingAutoCompleteC, setLoadingAutoCompleteC] = useState(false);

  const resetInputComplete = () => {
    const listCancer = CrossSearchController.listCancer();
    const listPolifenols = CrossSearchController.listPolifenols();

    setDataSearchPolyphenol("");
    setDataSearchChemical("");

    setDataCompleteCancer(listCancer);
    setDataCompletePolyphenol(listPolifenols);
  };

  useEffect(() => {
    setLoadingAutoCompleteP(true);
    setLoadingAutoCompleteC(true);
    setLoading(true);

    resetInputComplete();

    setLoading(false);
    setLoadingAutoCompleteP(true);
    setLoadingAutoCompleteC(true);
  }, []);

  useEffect(() => {
    setLoadingAutoCompleteC(true);
    if (dataSearchPolyphenol !== "") {
      const newList = CrossSearchController.sortedByPolifenol(
        dataSearchPolyphenol
      );
      setDataCompleteCancer(newList);
    } else resetInputComplete();
    setLoadingAutoCompleteC(false);
  }, [dataSearchPolyphenol]);

  useEffect(() => {
    setLoadingAutoCompleteP(true);
    if (dataSearchChemical !== "") {
      const newList = CrossSearchController.sortedByCancer(dataSearchChemical);

      setDataCompletePolyphenol(newList);
    } else resetInputComplete();
    setLoadingAutoCompleteP(false);
  }, [dataSearchChemical]);

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
            paginationRowsPerPageOptions={[100, 20, 30, 40]}
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

  return (
    <Header>
      <Container>
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
              onClick={handleSearch}
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
