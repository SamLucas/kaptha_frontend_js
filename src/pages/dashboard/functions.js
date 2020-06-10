import api from "../../config/api";
import { ColorAssociation } from "./moocks";

export const searchApi = (params) => {
  return api
    .get("/search", {
      params,
    })
    .then((res) => res)
    .catch((error) => {
      return null;
      // throw error;
    });
};

export const handleFindPhrase = (text, frase) => {
  frase.forEach((element) => {
    const { original_sentence, association_type } = element;
    const colorPhare = ColorAssociation[association_type].color;

    text = text
      .split(original_sentence)
      .join(
        `<span style="font-weight:bold;text-decoration: underline ${colorPhare};color:${colorPhare}">${original_sentence}</span>`
      );
  });

  return text;
};

export const handleFindEntitiesPhrase = (
  text,
  start_pos,
  end_pos,
  entitiesRules
) => {
  const textAux = text;
  entitiesRules.forEach((element) => {
    const { start, end, entity_type } = element;
    const phare = textAux.substr(start - start_pos, end - start);
    const colorPhare = ColorAssociation[entity_type].color;

    console.log(text.split(phare));
    text = text
      .split(phare)
      .join(
        `<span style="font-weight:bold;text-decoration: underline ${colorPhare};color:${colorPhare}">${phare}</span>`
      );
  });

  return text;
};

export const getTypesAssociation = (phare) => {
  const typeAssociationsPhares = phare.map((ele) => ele.association_type);
  const typeAssociationsNotRepet = new Set([...typeAssociationsPhares]);

  return [...typeAssociationsNotRepet].map((ele) => {
    return ColorAssociation[ele];
  });
};
