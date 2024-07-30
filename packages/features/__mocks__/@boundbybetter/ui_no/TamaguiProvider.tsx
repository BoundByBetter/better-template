import { logSetup } from '@boundbybetter/shared';

export interface TamaguiProviderProps {
  children: JSX.Element;
}
export function TamaguiProvider(props: TamaguiProviderProps) {
  logSetup('MyState.MOCK');

  return (props.children);
}

