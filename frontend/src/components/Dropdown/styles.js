import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: initial;
  .button {
    cursor: pointer;
  }
  &:hover {
    ul {
      display: block;
    }
  }
  ul {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    min-width: 150px;
    background: #fff;
    flex-direction: column;
    position: absolute;
    top: 30px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border: #707070;
    border-radius: 4px;
    z-index: 10;
    display: none;

    &::before {
      content: '';
      position: absolute;
      left: calc(50% - 10px);
      top: -10px;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #fff;
    }

    li {
      width: 100%;
      text-align: left;
      display: flex;
      align-items: center;
      white-space: nowrap;

      svg {
        margin-right: 10px;
      }
      button {
        background: transparent;
        border: 0;
        font-size: 16px;
        color: #999999;
      }
      a,
      a:hover {
        background: transparent;
        font-size: 16px;
        color: #999999;
        padding: 0;
        font-weight: normal;
      }
      & + li {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #eeeeee;
      }
    }
  }
`;
