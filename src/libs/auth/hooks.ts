import {useEffect, useState} from "react";
import {auth} from "@/libs/auth/Auth";

/**
 * Returns the uid stored in the session storage.
 */
export function useUid(): string {
  const [uid, setUid] = useState('');

  useEffect(() => {
    setUid(auth.getUid);
  }, [uid]);
  return uid;
}

/**
 * Returns the access token stored in the session storage.
 */
export function useToken(): string {
  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(auth.getAccessToken);
  }, [token]);
  return token
}
