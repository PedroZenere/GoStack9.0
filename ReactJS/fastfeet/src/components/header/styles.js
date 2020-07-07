import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;

    img {
      width: 155px;
      height: 26px;
      padding-right: 30px;
      border-right: 1px solid #eee;
    }

    nav {
      margin-left: 30px;

      a {
        font-size: 14px;
        font-weight: bold;
        color: #999999;
        margin-right: 10px;

        &:hover {
          color: ${darken(0.5, '#999999')};
        }
      }
    }
  }
`;

export const Admin = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-top: 5px;
    color: #de3b3b;
  }
`;
