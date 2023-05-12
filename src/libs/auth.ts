import {WebAuth} from 'auth0-js';
import jwt from 'jsonwebtoken';
import {useEffect, useState} from "react";

const authConfig = {
  domain: 'dev-d2mjz3ehsqoecv3g.us.auth0.com',
  clientId: 'omfOud1JH0zkj7g73JVVYQpYO66so7Ll',
  callbackUrl: 'http://localhost:3000/callback'
}

class Auth {

  idToken: string = '';
  accessToken: string = '';

  auth = new WebAuth({
    domain: authConfig.domain,
    clientID: authConfig.clientId,
    redirectUri: authConfig.callbackUrl,
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

      this.idToken = decoded?.idToken ?? '';
      sessionStorage.setItem('accessToken', this.idToken);
      sessionStorage.setItem('uid', getUserId(this.idToken));
    })

  }

  refresh() {
    //this.auth.renewAuth()
  }

  getAccessToken(): string {
    return sessionStorage.getItem('accessToken') ?? '';
  }

  getUid(): string {
    return sessionStorage.getItem('uid') ?? '';
  }

  async isLoggedIn(): Promise<boolean> {
    const token = await getIdToken();
    return !!token;
  }
}

export const auth = new Auth();


export async function getIdToken(): Promise<string> {
  const resp = await fetch('http://localhost:3000/api/auth', {
    next: {
      revalidate: 60
    }
  });
  const body = await resp.json();
  return body.idToken;
}

interface User {
  accessToken: string,
  uid: string,
}

export function useUid(): string {
  const [uid, setUid] = useState('');

  useEffect(() => {
    setUid(auth.getUid);
  }, [uid]);
  return uid;
}

export function useToken(): string {
  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(auth.getAccessToken);
  }, [token]);
  return token
}

export function getUserId(token: string): string {
  const decoded = jwt.decode(token) as {sub: string}
  return decoded.sub
}
