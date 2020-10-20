import CrossCancer from "src/data/dfCrossIndexCancer";
import CrossPolifenol from "src/data/dfCrossIndexPolifenol";

function CrossSearch() {
  function sortedByPolifenol(polifenol) {
    let response = [];
    CrossPolifenol.forEach((ele) => {
      const { polifenol: polifenolMap, cancer, quant } = ele;
      if (polifenolMap === polifenol) {
        response = [
          ...new Set([
            ...response,
            { label: `${cancer} (${quant})`, value: cancer },
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
            { label: `${polifenol} (${quant})`, value: polifenol },
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
    sortedByPolifenol,
    sortedByCancer,
    listPolifenols,
    listCancer,
  };
}

export default CrossSearch();
