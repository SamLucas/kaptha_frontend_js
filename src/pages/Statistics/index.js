import React, { useState, useEffect } from "react";

import Header from "src/components/Header";
import InputAutoComplete from "src/components/InputAutoComplete";
import CrossSearchController from "src/controller/CrossSearch";

import TableInfo from "./Components/TableInfo";
import GraphicInfo from "./Components/Charts";

import { debounceEvent } from "src/Utils";
import Loading from "src/components/loading";

export default function Statistics() {
  const [relatedEntities, setRelatedEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const [entitieSelected, setEntitieSelected] = useState();

  useState(() => {
    setLoading(true);

    const listCancer = CrossSearchController.listCancer();
    const listPolyfenol = CrossSearchController.listPolifenols();

    setOptions([...listCancer, ...listPolyfenol]);
    setLoading(false);
  }, []);

  const handleLoadListEntitiesRelated = () => {
    const listCancer = CrossSearchController.sortedByCancer(entitieSelected);
    const listPolyfenol = CrossSearchController.sortedByPolifenol(
      entitieSelected
    );

    const entitiesFiltred =
      listCancer.length !== 0
        ? listCancer.map((ele) => ele.extraData)
        : listPolyfenol.map((ele) => ele.extraData);

    setLoading(false);
    setRelatedEntities(entitiesFiltred);
  };

  useEffect(() => {
    if (entitieSelected !== "") {
      setLoading(true);
      setRelatedEntities([]);
      debounceEvent(handleLoadListEntitiesRelated, {}, 500);
    }
  }, [entitieSelected]);

  return (
    <Header>
      <InputAutoComplete
        disabled={loading}
        options={options}
        loading={loading}
        setData={setEntitieSelected}
        data={entitieSelected}
        label="Select an entity by clicking on one of the options below"
        width="100%"
      />

      <GraphicInfo relatedEntities={relatedEntities} />
      <TableInfo
        relatedEntities={relatedEntities}
        entitieSelected={entitieSelected}
      />

      {loading && <Loading />}
    </Header>
  );
}
