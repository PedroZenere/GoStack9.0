import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  max-width: 360px;
  max-height: 425px;
  text-align: center;

  background: #fff no-repeat padding-box;
  box-shadow: 0 0 10px #00000033;
  border-radius: 4px;
  opacity: 1;

  img {
    margin-top: 67px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    align-items: center;

    input {
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px solid #dddddd;
      border-radius: 4px;
      opacity: 1;
      height: 45px;
      width: 300px;
      padding: 0 15px;
      margin: 0 0 10px;

      &::placeholder {
        color: #999999;
      }
    }

    span {
      color: #f64c75;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      width: 300px;
      height: 45px;
      background: #7d40e7 0% 0% no-repeat padding-box;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;

      &:hover {
        background: ${darken(0.03, '#7D40E7')};
      }
    }
  }
`;
