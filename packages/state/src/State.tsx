import { store } from './store';
import { Provider } from 'react-redux';
export interface StateProps {
  children: JSX.Element;
}
export function State(props: StateProps) {
  return <Provider store={store}>{props.children}</Provider>;
}
