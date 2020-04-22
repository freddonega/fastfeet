import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
  @keyframes glow {
    0%, 20%, 100%{
      box-shadow: 0 0 0 0;
    }
    10%{
      box-shadow:0 0 0 5px #7d40e785;
    }
  }
  @keyframes glowMore {
    0%, 20%, 100%{
      box-shadow: 0 0 0 0;
    }
    10%{
      box-shadow:0 0 0 10px #7d40e785;
    }
  }

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  *:focus{
    outline: 0;
  }

  html, body, #root{
    height: 100%;
    background: #f5f5f5;
  }

  body{
    -webkit-font-smoothing: antialiased;
    color: #444444;
  }

  body, input, button{
    font: 14px 'Roboto', sans-serif;
  }

  a{
    text-decoration:none;
  }

  ul{
    list-style:none;
  }
  button{
    cursor: pointer;
  }
  hr{
    border: 0;
    background: #EEEEEE;
    margin: 10px 0px;
    height: 1px;
    width: 100%;
  }
  img{
    max-width: 100%;
  }

`;
