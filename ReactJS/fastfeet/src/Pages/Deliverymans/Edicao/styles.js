import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Manager = styled.div`
  width: 75%;
  margin-top: 34px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  div {
    > strong {
      display: block;
      font-size: 24px;
      color: #444444;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  margin: 0;

  div {
    display: flex;
    flex-direction: row;

    a {
      background: #cccccc;
      border-radius: 4px;
      border: 0;
      width: 112px;
      height: 36px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#cccccc')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 5px;
        margin-left: 7px;
        font-weight: bold;
      }

      > strong {
        font-size: 14px;
        color: #ffffff;
      }
    }

    button {
      background: #7d40e7;
      border-radius: 4px;
      border: 0;
      width: 112px;
      height: 36px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7159c1')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 5px;
        margin-left: 7px;
        font-weight: bold;
      }

      > strong {
        font-size: 14px;
        color: #ffffff;
      }
    }
  }
`;

export const Dados = styled.div`
  width: 100%;
  padding: 0 30px;
  background: #fff;

  div {
    display: block;
    margin-top: 30px;

    div {
      display: block;
      margin-right: 30px;

      p {
        color: #444444;
        font-size: 14px;
        margin-bottom: 10px;
        font-weight: bold;
      }

      input {
        width: 840px;
        height: 45px;
        border: 1px solid #dddddd;
        border-radius: 4px;
        padding: 0 10px;
        margin-bottom: 10px;
      }
    }
  }
`;

export const Avatar = styled.div`
  display: flex;
  padding: 0 30px;
  background: #fff;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
