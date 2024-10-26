import { fetchDiscoveryAsync } from 'expo-auth-session';
import { logError, logMessage } from '@boundbybetter/shared';
import { useAuth } from './useAuth';
export const useLogOut = () => {
  const { clearCurrentUser } = useAuth(); // Use the clearCurrentUser method

  return async () => {
    try {
      const discovery = await fetchDiscoveryAsync(
        'https://boundbybettercustomers.ciamlogin.com/0009cc7a-b831-4911-be61-58865b14fccb/v2.0',
      );
      logMessage('handleSignOut starting', 'discovery', discovery);
      if (discovery?.endSessionEndpoint) {
        logMessage('handleSignOut revoking', 'discovery', discovery);
        // Redirect to the end session endpoint for logout
        const logoutUrl = `${discovery.endSessionEndpoint}?post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}`;
        window.location.href = logoutUrl; // Redirect to logout
      }
    } catch (error) {
      /* istanbul ignore next */
      logError(error);
    }
    clearCurrentUser(); // Clear the user from context
  };
};
