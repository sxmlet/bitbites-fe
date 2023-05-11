'use client';

import Bites from "@/components/bites";
import useSWR, {useSWRConfig} from "swr";
import newBitBitesClient, {Bite, } from "@/libs/bites";
import {useToken, useUid} from "@/libs/auth";
import AddBite from "@/components/add-bite";
import React from "react";

export default function MyBites() {
  const uid = useUid();
  const token = useToken();
  const {mutate} = useSWRConfig();

  const {data, error, isLoading} = useSWR(uid ? [`/api/v0/uid/bites`, uid, token] : null, async([url, uid, token]) => {
    const client = newBitBitesClient(token);
    return await client.getAllBitesFromUser(uid)
  });

  const bites: Bite[] = data as Bite[];

  return <>
    <Bites
      actionable={true}
      bites={bites ?? []}
      loading={isLoading}
      error={error}
    />
    <AddBite onAddBite={() => mutate([`/api/v0/uid/bites`, uid, token])}/>
    </>;
}
