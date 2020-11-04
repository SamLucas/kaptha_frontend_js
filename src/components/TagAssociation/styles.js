import styled, { css } from "styled-components";

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

const underline = css`
  height: 3px;
  width: 10px;
`;

const circle = css`
  height: 10px;
  width: 10px;
  border-radius: 50px;
`;

export const TagColor = styled.div`
  margin: auto 5px;
  background-color: ${(props) => props.color};
  ${props => props.underline ? `${underline}` : `${circle}`}
  
`;
