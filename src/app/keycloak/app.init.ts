import { KeycloakService } from 'keycloak-angular';

// export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
//     return () =>
//         keycloak.init({
//             config: {
//               url: 'http://localhost:8080/auth', // Keycloak server URL
//               realm: 'formapp',                // Replace with your realm name
//               clientId: 'form-app',            // Replace with your client name
//             },
//             initOptions: {
//                 checkLoginIframe: true,
//                 checkLoginIframeInterval: 25
//             },
//             loadUserProfileAtStartUp: true
//         });
// }


export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth', // Keycloak server URL
        realm: 'formapp',                // Replace with your realm name
        clientId: 'form-app',            // Replace with your client name
      },
      initOptions: {
        onLoad: 'login-required',         // Can also be 'check-sso'
        checkLoginIframe: false,

        // checkLoginIframeInterval: 25,
        // flow: 'standard'

        // onLoad: 'check-sso',              // Ensures session is checked
        // silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        // checkLoginIframe: true,           // Ensure session is refreshed automatically
      },
    });
}
