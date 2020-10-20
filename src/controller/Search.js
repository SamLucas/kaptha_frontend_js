import api from "src/config/api";
import { ColorAssociation } from "src/config/colors";

function Search() {
  const search = (params) =>
    api
      .get("/search", {
        params,
      })
      .then((res) => res)
      .catch((error) => null);

  const handleFindPhrase = (text, frase) => {
    frase.forEach((element) => {
      const { original_sentence, association_type } = element;
      const colorPhare = ColorAssociation[association_type].color;

      const TextPhrases = handleFindEntitiesPharase(
        original_sentence,
        element.start_pos,
        0,
        element.entitiesRules,
        true
      );

      text = text
        .split(original_sentence)
        .join(
          `<span style="font-weight:bold;text-decoration: underline ${colorPhare};color:${colorPhare}">${TextPhrases}</span>`
        );
    });

    return text;
  };

  const handleFindEntitiesPharase = (
    text,
    start_pos,
    end_pos,
    entitiesRules,
    background
  ) => {
    const textAux = text;
    entitiesRules.forEach((element) => {
      const { start, end, entity_type } = element;
      const phare = textAux.substr(start - start_pos, end + 1 - (start + 1));
      const colorPhare = ColorAssociation[entity_type].color;

      if (phare) {
        text = text
          .split(phare)
          .join(
            background
              ? `<span style="font-weight:bold;background-color:${colorPhare};color:white">${phare}</span>`
              : `<span style="font-weight:bold;text-decoration: underline ${colorPhare};color:${colorPhare}">${phare}</span>`
          );
      }
    });

    return text;
  };

  const getTypesAssociation = (phare) => {
    const typeAssociationsPhares = phare.map((ele) => ele.association_type);
    const typeAssociationsNotRepet = new Set([...typeAssociationsPhares]);

    return [...typeAssociationsNotRepet].map((ele) => {
      return ColorAssociation[ele];
    });
  };

  return {
    search,
    handleFindPhrase,
    handleFindEntitiesPharase,
    getTypesAssociation,
  };
}

export default Search();
