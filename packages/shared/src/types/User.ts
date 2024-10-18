/* istanbul ignore file */
export interface User {
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  groups: string[];
  accessToken: string | null;
  idToken: string | null;
}
