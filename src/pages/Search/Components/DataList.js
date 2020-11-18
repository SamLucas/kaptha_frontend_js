import React from 'react';

// import { Container } from './styles';

function DataList({
  data,
  handleSearch,
  dataSearchPolyphenol,
  dataSearchChemical,
  setDataList
}) {


  const _handleSearch = (ele) => {

    const { extraData: { typeTerm, termIdentificator } } = ele

    let _dataSearchPolyphenol = typeTerm === "polifenol" ? termIdentificator : dataSearchPolyphenol
    let _dataSearchChemical = typeTerm !== "polifenol" ? termIdentificator : dataSearchChemical

    handleSearch(_dataSearchPolyphenol, _dataSearchChemical)

    setDataList([])
  }

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h1>Entities related to the search term</h1>
        <p>Below are some search options:</p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 20
      }}>
        {data.sort(
          (a, b) => b.extraData.quant - a.extraData.quant
        )
          .map(ele => {
            const { extraData: { termIdentificator, quant } } = ele

            return (
              <span style={{
                padding: 20,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderRadius: 5,
                cursor: "pointer"
              }}
                onClick={() => _handleSearch(ele)}
              >
                <span>{termIdentificator}</span>
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  color: "white",
                  backgroundColor: "#3F3C56"
                }}>
                  <span >{quant}</span>
                </div>
              </span>
            )
          })}
      </div>
    </div>
  );
}

export default DataList;