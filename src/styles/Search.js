import styled from "styled-components";

export const Container = styled.div`
  header {
    padding: 20px;
    display: flex;
    flex-direction: row;
    background-color: white;
    align-content: "center";

    h1 {
      margin: 20px 40px;
      font-size: 30px;
      text-align: center;
    }

    div {
      margin: auto 0px;
    }
  }

  section {
    padding: 20px;

    div.classInformation {
      margin: 25px 0px 15px;

      h1.registerFind {
        margin-bottom: 5px;
      }
    }

    ul.containerPaginate {
      display: flex;
      justify-content: center;
      margin: 20px 0px 10px;
      /* background-color: red; */
      list-style: none;

      li.paginateItem {
        padding: 15px 20px;
        border-width: 0px;
        background-color: white;
        border-radius: 50%;
        box-shadow: 1px 2px rgba(0, 0, 0, 0.2);
        margin: 0px 5px;
        cursor: pointer;

        a {
          text-decoration: none;
          color: black;
        }
      }

      li.paginateItemAtivo {
        text-decoration: none;
        padding: 15px 20px;
        border-width: 0px;
        background-color: black;
        border-radius: 50%;
        box-shadow: 1px 2px rgba(0, 0, 0, 0.2);
        margin: 0px 5px;
        cursor: pointer;

        a {
          text-decoration: none;
          color: white;
        }
      }
      /* li .paginateItemAtivo a {
        text-decoration: none;
      } */
    }

    div.cardContainer {
      padding: 20px;
      background-color: white;
      border-radius: 5px;
      margin-bottom: 10px;
      width: 90vw;

      /* text-align: justify; */


      h1 {
        font-weight: bold;
        margin: 5px 0px;
        padding: 10px 0px;
        position: relative;
      }

      .ReactCollapse--collapse {
        padding: 0px;
      }

      .ReactCollapse--content {
        padding: 0px;
      }

      p#colapseTrue {
        padding: -20px;
        line-height: 24px;

        /* display: flex;
        flex-direction: row; */
      }

      p#colapseFalse {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height: 24px;
      }

      #button {
        font-weight: bold;
        padding: 15px 0px 5px;
        border: 0px;
        background-color: white;
        cursor: pointer;
      }

      a {
        text-decoration: none;
        font-weight: bold;
        color: black;
        float: right;
        padding: 15px 0px 5px;
        padding: 20px;
      }
    }
  }

  section.containerInformationSearch {
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;

    img {
      margin: 150px 0px 0px;
      width: 40vw;
      height: 40vh;
    }

    p {
      margin-top: 40px;
      text-align: center;
    }
  }

  .modalcontainer {
    width: 80%;
    background-color: red;
  }
`;
