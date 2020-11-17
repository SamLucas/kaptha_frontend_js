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
    const listGene = CrossSearchController.listGene();

    setOptions([...listCancer, ...listPolyfenol, ...listGene]);
    setLoading(false);
  }, []);

  const handleLoadListEntitiesRelated = () => {
    const listCancer = CrossSearchController.sortedByCancer(entitieSelected);
    const listGene = CrossSearchController.sortedByGene(entitieSelected);
    const listPolyfenol = CrossSearchController.sortedByPolifenol(
      entitieSelected,
      true
    );

    const entitiesFiltred =
      listCancer.length !== 0 ? listCancer.map((ele) => ele.extraData) :
        listGene.length !== 0 ? listGene.map((ele) => ele.extraData) :
          listPolyfenol.map((ele) => ele.extraData);

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

      <GraphicInfo relatedEntities={
        relatedEntities.sort(
          (a, b) => parseInt(a.quant) - parseInt(b.quant)
        )} />

      <TableInfo
        entitieSelected={entitieSelected}
        relatedEntities={
          relatedEntities.sort(
            (a, b) => parseInt(b.quant) - parseInt(a.quant)
          )}
      />

      {loading && <Loading />}
    </Header>
  );
}
