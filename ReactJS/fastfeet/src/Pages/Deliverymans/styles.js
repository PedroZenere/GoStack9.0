import styled from 'styled-components';
import { darken } from 'polished';

import search from '../../assets/search.svg';

export const Container = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Manager = styled.div`
  width: 100%;
  margin-top: 34px;
  padding: 0 100px;
  align-items: center;

  > strong {
    display: block;
    font-size: 24px;
    color: #444444;
  }
`;

export const Teste = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    border-radius: 4px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-top: 45px;
    opacity: 1;
    height: 36px;
    width: 237px;
    padding: 0 30px;
    background: #fff url(${search}) no-repeat 10px center;
  }
`;

export const Button = styled.div`
  display: block;
  margin: 0 auto;

  a {
    margin-top: 45px;
    background: #7d40e7;
    border-radius: 4px;
    border: 0;
    width: 142px;
    height: 36px;

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
`;

export const OrderTable = styled.table`
  width: 100%;
  padding: 0 100px;
  margin-top: 20px;

  thead th {
    color: #444444;
    text-align: left;
    padding: 10px;
    font-weight: bold;
    font-size: 16px;
  }

  tbody td {
    color: #666666;
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid #eee;

    div {
      text-align: center;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }

    button {
      background: none;
      border: 0;
    }
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 16px;
  }
`;
