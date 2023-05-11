'use client';

import Bites from '@/components/bites';
import AddBite from "@/components/add-bite";
import React, {useEffect, useState} from "react";
import newBitBitesClient, {Bite} from "@/libs/api/bites";
import useSWR from "swr";
import {useSWRConfig} from "swr";
import {useToken} from "@/libs/auth";

export default function Home() {
  const token = useToken();

  const {data, error, isLoading} = useSWR(['/api/v0/bites', token], async ([url, token]) => {
    const client = newBitBitesClient(token);
    return await client.getAllBites()
  });
  const {mutate} = useSWRConfig();
  const bites: Bite[] = data as Bite[];
  return <>
    {<Bites actionable={false} bites={bites ?? []} loading={isLoading} error={error?.info}/>}
    <AddBite onAddBite={() => mutate(['/api/v0/bites', token])}/>
  </>
}
