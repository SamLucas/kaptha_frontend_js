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
    const { start_pos, end_pos, association_type } = element;
    const phare = text.substr(start_pos, end_pos);
    const colorPhare = ColorAssociation[association_type].color;

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
