import {WebAuth} from 'auth0-js';
import jwt from 'jsonwebtoken';
import {useEffect, useState} from "react";
import {config} from "@/libs/config";

class Auth {

  idToken: string = '';
  accessToken: string = '';

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

}

export const auth = new Auth();

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
