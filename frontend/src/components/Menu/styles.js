import styled from 'styled-components';

export const MainMenu = styled.div`
  position: relative;
  float: right;
  .menu-mobile {
    display: none;
    cursor: pointer;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    width: 220px;
    background: #fff;
    flex-direction: column;
    position: absolute;
    left: -100px;
    top: 50px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border: #707070;
    border-radius: 4px;
    display: ${(props) => (props.visible ? 'block' : 'none')};

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
  }
`;

export const NavItem = styled.li`
  padding: 0 5px;
  a {
    font-size: 15px;
    font-weight: bold;
    color: ${(props) => (props.active ? '#444444' : '#999999')};
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    & + li {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #eeeeee;
    }
  }
`;
