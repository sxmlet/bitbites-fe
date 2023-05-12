import {WebAuth} from 'auth0-js';
import jwt from 'jsonwebtoken';
import {config} from "@/libs/config";

/**
 * Primary interface for authentication related actions.
 */
class Auth {

  auth = new WebAuth({
    domain: config.domain,
    clientID: config.clientId,
    redirectUri: config.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid'
  });


  login() {
    this.auth.authorize()
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.auth.logout({
      returnTo: window.location.origin,
    });
  }

  async storeHash() {
    await this.auth.parseHash(async (error, decoded): Promise<void> => {
      if (error) {
        console.log(error);
        return;
      }

      const token = decoded?.idToken ?? '';
      sessionStorage.setItem('accessToken', token);
      sessionStorage.setItem('uid', this.getUserIdFromToken(token));
    })

  }

  // @todo: Implement token renewal.
  refresh() {
    //this.auth.renewAuth()
  }

  getAccessToken(): string {
    return sessionStorage.getItem('accessToken') ?? '';
  }

  getUid(): string {
    return sessionStorage.getItem('uid') ?? '';
  }

  private getUserIdFromToken(token: string): string {
    const decoded = jwt.decode(token) as {sub: string}
    return decoded.sub
  }

}

export const auth = new Auth();
