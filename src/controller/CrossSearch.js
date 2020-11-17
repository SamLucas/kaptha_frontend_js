import CrossCancer from "src/data/dfCrossIndexCancer";
import CrossPolifenol from "src/data/dfCrossIndexPolifenol";
import CrossGene from "src/data/dfCrossIndexGeneDistribuicao";

function CrossSearch() {
  function sortedByPolifenol(polifenol) {
    let response = [];
    CrossPolifenol.forEach((ele) => {
      const { polifenol: polifenolMap, cancer, quant } = ele;
      if (polifenolMap === polifenol) {
        response = [
          ...new Set([
            ...response,
            {
              label: `${cancer} (${quant})`,
              value: cancer,
              extraData: {
                ...ele,
                termIdentificator: cancer,
                typeTerm: "cancer",
              },
            },
          ]),
        ];
      }
    });

    return response;
  }

  function sortedByPolifenolGene(polifenol) {
    let response = [];
    CrossGene.forEach((ele) => {
      const { polifenol: polifenolMap, gene, quant } = ele;
      if (polifenolMap === polifenol) {
        response = [
          ...new Set([
            ...response,
            {
              label: `${gene} (${quant})`,
              value: gene,
              extraData: {
                ...ele,
                termIdentificator: gene,
                typeTerm: "gene",
              },
            },
          ]),
        ];
      }
    });

    return response;
  }

  function sortedByCancer(cancer) {
    let response = [];
    CrossPolifenol.forEach((ele) => {
      const { polifenol, cancer: cancerMap, quant } = ele;
      if (cancerMap === cancer) {
        response = [
          ...new Set([
            ...response,
            {
              label: `${polifenol} (${quant})`,
              value: polifenol,
              extraData: {
                ...ele,
                termIdentificator: polifenol,
                typeTerm: "polifenol",
              },
            },
          ]),
        ];
      }
    });

    return response;
  }

  function sortedByGene(cancer) {
    let response = [];
    CrossGene.forEach((ele) => {
      const { polifenol, gene: geneMap, quant } = ele;
      if (geneMap === cancer) {
        response = [
          ...new Set([
            ...response,
            {
              label: `${polifenol} (${quant})`,
              value: polifenol,
              extraData: {
                ...ele,
                termIdentificator: polifenol,
                typeTerm: "polifenol",
              },
            },
          ]),
        ];
      }
    });

    return response;
  }

  function listPolifenols() {
    let response = [];
    CrossPolifenol.forEach(
      (ele) => (response = [...new Set([...response, ele.polifenol])])
    );

    return response.map((ele) => ({ label: ele, value: ele }));
  }

  function listCancer() {
    let response = [];
    CrossCancer.forEach(
      (ele) => (response = [...new Set([...response, ele.cancer])])
    );

    return response.map((ele) => ({ label: ele, value: ele }));
  }

  return {
    listCancer,
    listPolifenols,
    sortedByPolifenol,
    sortedByPolifenolGene,
    sortedByCancer,
    sortedByGene,
  };
}

export default CrossSearch();
