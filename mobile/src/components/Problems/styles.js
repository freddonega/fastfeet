import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-color: #f8f9fd;
  border-top-width: 0;
  border-left-width: 0;
  border-bottom-width: 0;
  border-right-width: 0;
  elevation: 5;
  margin: 20px;
  margin-top: 0px;
  min-height: 100px;
  padding: 20px;
  border: 1px solid;

  border-radius: 4px;
`;

export const Problem = styled.Text`
  font-size: 16px;
  color: #999999;
`;

export const Date = styled.Text`
  font-size: 16px;
  color: #c1c1c1;
`;
