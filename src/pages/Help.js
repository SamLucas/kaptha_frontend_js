import React from "react";
import Header from "src/components/Header";

export default function Help() {

  return (
    <Header>
      <h2>Help</h2>
      <p style={{ margin: "15px 0" }}>
        How to use kaphta Web tool?

      </p>

      <p>See below a video with an example for cross search polyphenol-cancer, using “Luteolin” and “Lung Cancer”</p>

      {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/EzZSb7-ngrk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

      <iframe
        width={"100%"}
        height={"200%"}
        src="https://www.youtube.com/embed/EzZSb7-ngrk"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />

    </Header>
  );
}
