import { store } from './store';
import { Provider } from 'react-redux';
export interface MyDataProps {
  children: JSX.Element;
}
export function MyState(props: MyDataProps) {
  return <Provider store={store}>{props.children}</Provider>;
}
