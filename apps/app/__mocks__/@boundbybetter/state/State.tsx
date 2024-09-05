import { logSetup } from '@boundbybetter/shared';

export interface StateProps {
  children: JSX.Element;
}
export function State(props: StateProps) {
  logSetup('State.MOCK');

  return props.children;
}
