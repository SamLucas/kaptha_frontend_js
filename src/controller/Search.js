import React from 'react'
import api from "src/config/api";

import { makeid } from 'src/Utils/index'
import { ColorAssociation } from "src/config/colors";

import PopoverEntites from 'src/components/PopoverEntities'

function Search() {

  const preparData = (params) => {
    const { TYPE_PAGE } = params
    let newParams = {};

    if (TYPE_PAGE === "Gene") newParams = { dataSearchGene: params.dataSearch }
    else if (TYPE_PAGE === "Polifenol")
      newParams = {
        dataSearchPolyphenol: params.dataSearch
      }
    else if (TYPE_PAGE === "Cancer")
      newParams = {
        dataSearchChemical: params.dataSearch
      }
    else if (TYPE_PAGE === "PolifenolCancer")
      newParams = {
        dataSearchPolyphenol: params.dataSearchp,
        dataSearchChemical: params.dataSearchc
      }
    else if (TYPE_PAGE === "PolifenolGene")
      newParams = {
        dataSearchGene: params.dataSearchg,
        dataSearchPolyphenol: params.dataSearchp
      }

    return newParams
  }

  const search = (params) => {
    const newParams = preparData(params)
    return api.get("/search", {
      params: newParams
    })
      .then((res) => res)
      .catch((error) => null);
  }

  const handleFindPhrase = (text, frase) => {

    let error = false
    let amountPhare = 0

    frase.forEach((element) => {
      const { original_sentence, association_type } = element;
      const colorPhare = ColorAssociation[association_type].color;

      if (original_sentence !== "NA") {
        const TextPhrases = handleFindEntitiesPharase(
          original_sentence,
          element.start_pos,
          element.entitiesRules
        );

        if (text.split(original_sentence).length === 1) {
          error = true
          return
        } else amountPhare = amountPhare + 1

        text = text
          .split(original_sentence)
          .join(
            `<spanLine>${TextPhrases}=|=${colorPhare}</spanLine>`
          );


      } else error = true

    });

    return { text, error, amountPhare };
  };

  const handleFindEntitiesPharase = (
    text,
    start_pos,
    entitiesRules,
  ) => {

    const words = []
    const dataWords = {}

    entitiesRules.map(ele => {

      // if (textAux.length >= start_pos && end_pos - 1 <= textAux.length) {
      //   startReplaceStr = ele.start_pos === 1 ? 0 : ele.start_pos
      //   endReplaceStr = ele.end_pos
      //   word = textAux.slice(startReplaceStr, endReplaceStr)
      // }

      const colorPhare = ColorAssociation[ele.entity_type].color;

      const wordLength = ele.end_pos - ele.start_pos
      let distInitialPhareToWord = Math.abs(start_pos - ele.start_pos)

      const very = text.slice(
        distInitialPhareToWord,
        distInitialPhareToWord + wordLength
      )

      if (very[0] === " ") distInitialPhareToWord = distInitialPhareToWord + 1

      const partOne = text.substr(0, distInitialPhareToWord)
      const partTwo = text.substr(distInitialPhareToWord + wordLength)
      const word = text.slice(
        distInitialPhareToWord,
        distInitialPhareToWord + wordLength
      )

      let newWord = makeid(word.length);

      while (!words.filter(ele => ele === newWord)) {
        newWord = makeid(word.length)
      }

      words.push(newWord)
      dataWords[newWord] = { word, colorPhare, element: ele }
      text = partOne + newWord + partTwo
    })

    words.forEach(word => {
      const data = dataWords[word]
      text = text
        .split(word)
        .join(`<spanbackground>${data.word}*|*${data.colorPhare}*|*${JSON.stringify(data.element)}</spanbackground>`);

    })

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
            key={`${ele}${index}`}
            data={JSON.parse(data)}
            color={color}
          >
            {term}
          </PopoverEntites>
        )
      } else return <span key={`${JSON.stringify(ele)}${index}`}> {ele}</ span>
    })

  }

  const joinTextElementPharase = (txt) => {

    const textSeparate = []
    const words = txt.split(/<spanLine>(.*?)<\/spanLine>/g)

    txt.replace(
      /<spanLine>(.*?)<\/spanLine>/g,
      (match, g1) => textSeparate.push(g1)
    )

    // console.log(textSeparate, words)

    return words.map((ele, index) => {
      if (textSeparate.find(t => t === ele)) {
        const [phrase, color] = ele.split("=|=")
        return (
          <span
            key={`${JSON.stringify(ele)}${index}`}
            style={{ textDecoration: `underline ${color}`, color }}>
            {joinTextElementPopover(phrase)}
            {/* {phrase} */}
          </span>
        )
      }

      return <span key={`${JSON.stringify(ele)}${index}`}>{ele}</span>
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

