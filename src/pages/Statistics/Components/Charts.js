import React from "react";
import { Chart, Interval, Tooltip, Axis, Coordinate } from "bizcharts";

export default function GraphicInfo({ relatedEntities }) {
  if (relatedEntities.length === 0) return <></>;

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

  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <h1>Chart with entities most relevant to the search term</h1>
      <p style={{ marginBottom: 20 }}>
        The entities shown below are the result of a simple average of the
        number of articles from the entities related to the search term.
      </p>
      <Chart height={600} data={data} autoFit>
        <Coordinate type="polar" />
        <Axis visible={false} />
        <Tooltip showTitle={false} />
        <Interval
          position="termIdentificator*quant"
          adjust="stack"
          element-highlight
          color="termIdentificator"
          style={{
            lineWidth: 1,
            stroke: "#fff",
          }}
          label={[
            "year",
            {
              offset: -15,
            },
          ]}
        />
      </Chart>
    </div>
  );
}
