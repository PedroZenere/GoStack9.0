import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;

  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      margin-top: 30px;
      height: 150px;
      width: 150px;
      border-radius: 50%;
      border: 1.5px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;
