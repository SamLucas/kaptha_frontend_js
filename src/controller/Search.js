import React from 'react'
import api from "src/config/api";
import { ColorAssociation } from "src/config/colors";

import PopoverEntites from 'src/components/PopoverEntities'

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
        element.end_pos,
        element.entitiesRules,
      );

      text = text
        .split(original_sentence)
        .join(
          `<spanLine>${TextPhrases}=|=${colorPhare}</spanLine>`
        );
    });

    return text;
  };

  const handleFindEntitiesPharase = (
    text,
    start_pos,
    end_pos,
    entitiesRules,
  ) => {

    const textAux = text;
    const words = []

    entitiesRules.map(ele => {

      let startReplaceStr = 0;
      let endReplaceStr = 0;

      if (start_pos >= textAux.length + 1 && end_pos >= textAux.length + 1) {

        const diff = end_pos - textAux.length
        startReplaceStr = Math.abs(diff - ele.start_pos)
        endReplaceStr = Math.abs(diff - ele.end_pos)
      } else {
        startReplaceStr = ele.start_pos
        endReplaceStr = ele.end_pos
      }

      const word = textAux.slice(startReplaceStr, endReplaceStr)
      const colorPhare = ColorAssociation[ele.entity_type].color;

      if (word) words.push({ word, colorPhare, element: ele })
    })

    const notRepeat = [...new Set([...words.map(ele => ele.word)])].sort((a, b) => {
      if (a.length < b.length) return -1;
      if (a.length > b.length) return 1;
      return 0
    })

    notRepeat.forEach(word => {
      const [data] = words.filter(ele => ele.word === word)
      if (data)
        text = text
          .split(word.trim())
          .join(`<spanbackground>${word}*|*${data.colorPhare}*|*${JSON.stringify(data.element)}</spanbackground>`);
    })

    // console.log(text)

    return text;
  };

  const getTypesAssociation = (phare) => {
    const typeAssociationsPhares = phare.map((ele) => ele.association_type);
    return [...new Set([...typeAssociationsPhares.map((ele) => ColorAssociation[ele])])];
  };

  const joinTextElementPopover = (txt) => {

    const textSeparate = []
    const words = txt.split(/<spanbackground>(.*?)<\/spanbackground>/g)

    txt.replace(
      /<spanbackground>(.*?)<\/spanbackground>/g,
      (match, g1) => textSeparate.push(g1))

    return words.map((ele, index) => {
      if (textSeparate.find(t => t === ele)) {
        const [term, color, data] = ele.split('*|*')
        return (
          <PopoverEntites
            key={`${JSON.stringify(ele)}${index}`}
            color={color}
            data={data}>
            {term}
          </PopoverEntites>
        )
      } else return <span key={`${JSON.stringify(ele)}${index}`}> {ele}</ span>
    })

  }

  const joinTextElementPharase = (txt, title = false) => {

    const textSeparate = []
    const words = txt.split(/<spanLine>(.*?)<\/spanLine>/g)

    txt.replace(/<spanLine>(.*?)<\/spanLine>/g, (match, g1) => textSeparate.push(g1))

    return words.map((ele, index) => {
      if (textSeparate.find(t => t === ele)) {
        const [phrase, color] = ele.split("=|=")
        return title ?
          <h3
            key={`${JSON.stringify(ele)}${index}`}
            style={{ textDecoration: `underline ${color}`, color }}>
            {joinTextElementPopover(phrase)}
          </h3> :
          <span
            key={`${JSON.stringify(ele)}${index}`}
            style={{ textDecoration: `underline ${color}`, color }}>
            {joinTextElementPopover(phrase)}
          </span>
      }

      return <span>{ele}</span>
    })
  }

  return {
    search,
    handleFindPhrase,
    getTypesAssociation,
    joinTextElementPharase,
    joinTextElementPopover,
    handleFindEntitiesPharase,
  };
}



export default Search();

