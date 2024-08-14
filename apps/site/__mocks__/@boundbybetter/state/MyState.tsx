import { logSetup } from "@boundbybetter/shared";

export interface MyStateProps {
  children: JSX.Element;
}
export function MyState(props: MyStateProps) {
  logSetup("MyState.MOCK");

  return props.children;
}
