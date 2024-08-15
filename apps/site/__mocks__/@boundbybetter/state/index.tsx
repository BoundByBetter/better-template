/* istanbul ignore file */
export { MyState } from './MyState';
const selectUser = jest.fn();
const useAppDispatch = jest.fn();
const useAppSelector = jest.fn();
// jest.mock("@boundbybetter/state", () => {
//   const actual = jest.requireActual("@boundbybetter/state");
//   const Provider = jest.requireActual("react-redux").Provider;
//   const store = jest.requireActual("@boundbybetter/state").store;
//   return {
//     ...actual,
//     MyData: (props: { children?: React.ReactNode }) => {
//       return <Provider store={store}>{props.children}</Provider>;
//     },
//   };
// });

export { selectUser, useAppDispatch, useAppSelector };
