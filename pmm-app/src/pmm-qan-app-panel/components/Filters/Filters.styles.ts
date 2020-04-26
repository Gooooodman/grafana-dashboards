import { css } from 'emotion';

export const Styling = {
  filtersWrapper: css`
    border: 1px solid rgb(40, 40, 40);
    padding: 5px 16px !important;
    overflow-y: scroll;
  `,
  filtersHeader: css`
    display: flex;
    align-items: baseline;
    padding: 5px 0px !important;
    height: 50px !important;
    padding-top: 15px !important;
  `,
  showAllButton: css`
    padding: 0 !important;
    height: auto;
  `,
  title: css`
    margin: 3px;
    margin-right: 15px;
  `,
  resetButton: css`
    padding: 0 !important;
    height: auto;
    margin-left: auto !important;
  `,
};