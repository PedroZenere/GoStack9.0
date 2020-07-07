import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;
  display: flex;
  background: none;
  border: 0;
  margin-left: 20px;
`;

export const ButtonList = styled.div`
  position: absolute;
  width: 150px;
  left: calc(50% - 50px);
  top: calc(100% + 10px);
  background: #ffffff;
  border-radius: 4px;

  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0px 0px 2px #00000026;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 120px;
  background: #fff;
`;

export const Button = styled.ul`
  color: #fff;

  li {
    border-bottom: 1px solid #eee;

    a,
    button {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 12px;
      border: 0;
      background: none;
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #999999;

      div {
        display: flex;
        align-items: center;
        margin-left: 10px;
        margin-right: 5px;
      }
    }
  }
`;
