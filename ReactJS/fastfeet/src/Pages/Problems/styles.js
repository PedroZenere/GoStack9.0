import styled from 'styled-components';

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

    button {
      background: none;
      border: 0;
      margin-left: 20px;
    }
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 16px;
  }
`;
