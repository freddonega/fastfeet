import styled from 'styled-components/native';

export const ImageAvatar = styled.View`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  overflow: hidden;
  border-radius: ${(props) => `${props.size}px`};
`;
export const Photo = styled.Image`
  flex: 1;
`;
