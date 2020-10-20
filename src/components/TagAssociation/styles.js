import styled from "styled-components";

export const Container = styled.div`
  margin-top: 20px;

  p.title {
    /* margin-top: 10px; */
    font-weight: bold;
  }

  .DescriptionTypesAssociations {
    display: flex;
    flex-direction: row;
    margin: 20px 0px;

    .contentTypeAssociation {
      display: flex;
      flex-direction: row;
      margin-right: 10px;
    }
  }
`;

export const TagColor = styled.div`
  height: 10px;
  width: 10px;
  margin: 4px 5px 2px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
`;
