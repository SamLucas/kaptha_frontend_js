import React from "react";
import Header from "src/components/Header";

export default function Help() {

  return (
    <Header>
      <h2>Help</h2>
      <p style={{ margin: "15px 0" }}>
        How to search a information in the kaphta web tool?
      </p>

      <iframe
        width={"100%"}
        height={"200%"}
        src="https://www.youtube.com/embed/nMkXRcIDRjs"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />

    </Header>
  );
}
