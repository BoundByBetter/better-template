/* istanbul ignore file */
export { MyState } from './MyState';
const selectUser = jest.fn();
const useAppDispatch = jest.fn();
const useAppSelector = jest.fn();

export { selectUser, useAppDispatch, useAppSelector }
