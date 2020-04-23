import styled from "styled-components";

export const Container = styled.div`
  header {
    padding: 20px;
    background-color: white;

    h1 {
      margin: 10px 0px;
    }

    input {
      background-color: rgba(0, 0, 0, 0.04);
      padding: 8px;
      border-radius: 5px;
      border: 2px;
      box-shadow: 1px 2px solid rgba(0, 0, 0, 0.2);
      margin-right: 10px;
      width: 30%;
    }

    button {
      color: white;
      padding: 8px 15px;
      background-color: black;
      border-radius: 5px;
      border: 0;
      cursor: pointer;
    }
  }

  section.loading {
    margin: 100px 0;
    width: 100%;

    .spinner {
      background-color: transparent;
      margin: 0px auto;
    }

    p {
      text-align: center;
    }
  }

  section {
    padding: 20px;

    h1.registerFind {
      margin: 25px 0px;
    }

    .paginateItem {
      padding: 15px 20px;
      border-width: 0px;
      background-color: white;
      border-radius: 50%;
      box-shadow: 1px 2px rgba(0, 0, 0, 0.2);
      margin: 0px 5px;
    }

    .paginateItemAtivo {
      padding: 15px 20px;
      border-width: 0px;
      background-color: black;
      color: white;
      border-radius: 50%;
      box-shadow: 1px 2px rgba(0, 0, 0, 0.2);
      margin: 0px 5px;
    }

    div.containerPaginate {
      margin: 10px 0px;
      background-color: transparent;
    }

    div {
      padding: 20px;
      background-color: white;
      border-radius: 5px;
      margin-bottom: 10px;

      h1 {
        font-weight: bold;
        margin: 5px 0px;
        padding: 10px 0px;
      }

      .ReactCollapse--collapse {
        padding: 0px;
      }

      .ReactCollapse--content {
        padding: 0px;
      }

      p#colapseTrue {
        padding: -20px;
      }

      p#colapseFalse {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      #button {
        font-weight: bold;
        padding: 15px 0px;
        border: 0px;
        background-color: white;
        cursor: pointer;
      }

      a {
        text-decoration: none;
        font-weight: bold;
        color: black;
        float: right;
        padding: 20px;
      }
    }
  }

  .modalcontainer {
    width: 80%;
    background-color: red;
  }
`;
