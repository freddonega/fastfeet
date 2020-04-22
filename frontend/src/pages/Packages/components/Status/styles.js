import styled from 'styled-components';

export const Container = styled.div`
  font-weight: bold;
  text-align: center;
  height: 25px;
  position: relative;
  border-radius: 25px;
  padding-left: 10px;
  text-transform: uppercase;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: '';
    height: 10px;
    width: 10px;
    border-radius: 10px;
    background: #fff;
    position: absolute;
    top: calc(50% - 5px);
    left: 6px;
  }

  &.status_2 {
    background: #dff0df;
    span {
      color: #2ca42b;
    }
    &::after {
      background: #2ca42b;
    }
  }

  &.status_1 {
    background: #bad2ff;
    span {
      color: #4d85ee;
    }
    &::after {
      background: #4d85ee;
    }
  }

  &.status_3 {
    background: #fab0b0;
    span {
      color: #de3b3b;
    }
    &::after {
      background: #de3b3b;
    }
  }

  &.status_0 {
    background: #f0f0df;
    span {
      color: #c1bc35;
    }
    &::after {
      background: #c1bc35;
    }
  }
`;
