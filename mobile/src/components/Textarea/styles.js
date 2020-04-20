import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 300px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #dddddd;

  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  flex: 1;
  justify-content: flex-start
  font-size: 15px;
  margin-left: ${(props) => (props.hasIcon ? '10px' : 0)};
`;
