import React from "react";
import { Chart, Interval, Tooltip, Axis, Coordinate } from "bizcharts";
import DataSet from "@antv/data-set";

export default function GraphicInfo({ relatedEntities }) {

  let ds = new DataSet();
  let dv;

  const confTransform = {
    type: 'sort',
    callback(a, b) {

      const numberOne = parseInt(a.quant)
      const numberTwo = parseInt(b.quant)

      return numberOne - numberTwo < 0 ? -1 :
        numberOne - numberTwo === 0 ? 0 :
          1
    }
  }

  if (relatedEntities.length === 0) return <></>;

  if (relatedEntities.length <= 80) {

    const data = relatedEntities.map((ele) => ({
      quant: ele.quant,
      termIdentificator: ele.termIdentificator,
    }));

    dv = ds.createView().source(data);
    dv.transform(confTransform);

  } else {

    const total = relatedEntities
      .map((ele) => parseInt(ele.quant))
      .reduce((acc, val) => acc + val);

    const media = Math.floor(total / relatedEntities.length);

    const data = relatedEntities
      .filter((ele) => ele.quant > media)
      .map((ele) => ({
        quant: ele.quant,
        termIdentificator: ele.termIdentificator,
      }));

    dv = ds.createView().source(data);
    dv.transform(confTransform);

  }

  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <h1>Chart with entities most relevant to the search term</h1>
      <p style={{ marginBottom: 20 }}>
        The entities shown below are the result of a simple average of the
        number of articles from the entities related to the search term.
      </p>
      <Chart height={600} data={dv} autoFit>
        <Coordinate type="polar" />
        <Axis visible={false} />
        <Tooltip showTitle={false} />
        <Interval
          position="termIdentificator*quant"
          color="termIdentificator"
          adjust="stack"
          element-highlight
          style={{
            lineWidth: 1,
            stroke: "#fff",
          }}

        />
      </Chart>
    </div>
  );
}
