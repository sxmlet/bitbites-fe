'use client';

import {useEffect} from 'react';
import {redirect} from 'next/navigation';
import {auth} from "@/libs/auth/Auth";

export default function Callback() {
  useEffect(() => {
    auth.storeHash();
    redirect('/')
  })
}
