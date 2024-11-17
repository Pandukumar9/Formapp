import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

export const roleGuard: CanActivateFn = async (route, state) => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  try {
    // Check if the user is authenticated
    const isAuthenticated = await keycloak.isLoggedIn();

    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      await keycloak.login({ redirectUri: state.url });
      return false;
    }

    // Retrieve required roles from the route data
    const requiredRoles = route.data?.['roles'] as string[] || [];

    // Check if the user has any of the required roles
    const hasRequiredRole = requiredRoles.some((role) => keycloak.isUserInRole(role));

    if (hasRequiredRole) {
      // Allow access if the user has the required role
      return true;
    }

    // Redirect to appropriate modules if roles don't match
    if (keycloak.isUserInRole('farmer')) {
      if (state.url !== 'admin-dash') {
        await router.navigate(['/admin-dash']); // Redirect to admin module
        return false;
      }
    } else if (keycloak.isUserInRole('custamer')) {
      if (state.url !== 'user') {
        await router.navigate(['/user']); // Redirect to user module
        return false;
      }
    } else {
      // No roles matched: show access denied message
      window.alert('Access Denied: Insufficient permissions.');
      await keycloak.login({ redirectUri: state.url });
    }

    return false; // Deny access if no roles match

  } catch (error) {
    console.error('Error in roleGuard:', error);
    await keycloak.login({ redirectUri: state.url });
    return false;
  }
};

