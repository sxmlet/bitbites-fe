'use client';

import Bites from "@/components/bite-views/bites";
import useSWR, {useSWRConfig} from "swr";
import newBitBitesClient from "@/libs/api/bites";
import {useToken, useUid} from "@/libs/auth/hooks";
import AddBite from "@/components/add-bite/add-bite";
import React from "react";
import {Bite} from "@/libs/api/models/Bite";

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
      error={error?.info}
    />
    <AddBite onAddBite={() => mutate([`/api/v0/uid/bites`, uid, token])}/>
    </>;
}
