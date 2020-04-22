import styled from 'styled-components';

import { darken } from 'polished';
import { Form } from '@unform/web';

export const Wrapper = styled.div`
  height: 100%;
`;

export const SearchForm = styled(Form)`
  flex-direction: row !important;
  height: 36px;
  margin: 0 !important;
  width: auto !important;
  border-radius: 4px;
  align-items: center !important;
  background: #fff;
  padding: 0px 5px;
  button {
    background: transparent;
    border: none;
    display: flex;
    align-content: center;
    border-radius: 4px;
  }
  input {
    background: transparent !important;
    border: none !important;

    margin: 0 !important;
  }
  svg {
    transition: color 0.5s;
  }
  &:focus-within {
    button {
      background: #7d40e7;
      transition: background 0.5s;

      svg {
        color: #fff !important;
      }
      &:hover {
        background: ${darken(0.05, '#7d40e7')};
      }
    }
  }
`;
export const Container = styled.div`
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  padding: 30px;

  h1 {
    font-size: 24px;
  }

  .sb-avatar {
    span {
      line-height: 7px;
    }
  }

  ul.pagination {
    float: right;
    display: block;
    padding-left: 15px;
    padding-right: 15px;

    li {
      display: inline-block;
      padding: 0px 2px;
      cursor: pointer;
      a {
        background: #999;
        &:hover {
          background: ${darken(0.05, '#999')};
        }
      }
    }

    li.active {
      a {
        background: #7d40e7;
        &:hover {
          background: ${darken(0.05, '#7d40e7')};
        }
      }
    }
  }

  .pagination a {
    align-items: center;
    display: flex;
    background: #7d40e7;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    padding: 3px 15px;
    transition: background 0.2s;
    border-radius: 4px;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }

  .btn {
    align-items: center;
    display: flex;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    padding: 3px 15px;
    transition: background 0.2s;
    border-radius: 4px;
    border: none;
    position: relative;
    & + .btn {
      margin-left: 10px;
    }
  }

  .btn-primary {
    background: #7d40e7;

    &:hover {
      background: ${darken(0.05, '#7d40e7')};
    }
    &.animated {
      animation: glow 10s infinite;
      &::after {
        content: '';
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        border-radius: 4px;
        animation: glowMore 10s infinite;
      }
    }
  }

  .btn-default {
    background: #cccccc;
    &:hover {
      background: ${darken(0.05, '#CCCCCC')};
    }
  }
  .responsiveTable {
    width: 100%;
  }

  .responsiveTable td .tdBefore {
    display: none;
  }

  @media screen and (max-width: 1200px) {
    .responsiveTable table,
    .responsiveTable thead,
    .responsiveTable tbody,
    .responsiveTable th,
    .responsiveTable td,
    .responsiveTable tr {
      display: block;
    }

    .responsiveTable thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
      border-bottom: 2px solid #333;
    }

    .responsiveTable tbody tr {
      border: 0;
      background: transparent;
      height: auto;

      & + tr {
        margin-top: 10px;
      }
    }

    .responsiveTable td.pivoted {
      /* Behave like a "row" */
      border: none !important;
      position: relative;
      padding-left: calc(50% + 10px) !important;
      text-align: left !important;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      background: #fff;
      width: 100%;
      margin-bottom: 2px;
      border-radius: 4px;
      text-align: attr(align) !important;
    }

    .responsiveTable td .tdBefore {
      /* Now like a table header */
      position: absolute;
      display: block;

      /* Top/left values mimic padding */
      left: 1rem;
      width: calc(50% - 20px);
      white-space: pre-wrap;
      overflow-wrap: break-word;
      text-align: left !important;
      font-weight: 600;
    }
  }

  table {
    width: 100%;
    margin-top: 30px;
    border-collapse: separate;
    border-spacing: 0px 15px;
    font-size: 16px;

    thead {
      tr {
        th {
          color: #444444;
          text-align: left;
          padding: 0px 15px;
        }
      }
    }
    tbody {
      tr {
        background: #fff;
        height: 57px;

        td {
          padding: 10px;
        }
      }
    }
  }

  .hasBg * {
    display: none;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    font-size: 14px;
    div.inputGroup {
      flex: 1;
      & + .inputGroup {
        margin-left: 30px;
      }
    }
    label {
      font-weight: bold;
      margin-bottom: 5px;
      margin-top: 10px;
      color: #444444;
      padding: 0;
      margin: 0;
      margin-bottom: 5px;
    }

    input {
      background: #fff;
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #444;
      margin: 0 0 10px;
      width: 100%;
      font-size: 16px;

      &::placeholder {
        color: #999999;
      }
    }
  }

  .react-select input {
    height: 23px !important;
  }
  .react-select__indicator-separator {
    width: 0 !important;
  }
  .react-select__control {
    border: 1px solid #dddddd !important;
  }
  .react-select__single-value {
    color: #999999 !important;
  }
`;

export const Error = styled.span`
  color: #ff7979;
  font-weight: bold;
`;
