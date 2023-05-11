'use server';

import newBitBitesClient, {Bite} from "@/libs/bites";
import {revalidateTag} from "next/cache";

export async function addBite(bite: Bite, token: string) {
  const client = newBitBitesClient(token);
  await client.createNewBites(bite);
  revalidateTag('bites');
}

export async function deleteBite(id: string, token: string, uid: string) {
  const client = newBitBitesClient(token);
  await client.deleteBite(id);
  revalidateTag('bites-' + uid);
}

export async function editBite(bite: Bite, token: string, uid: string) {
  const client = newBitBitesClient(token);
  await client.editBite(bite);
  revalidateTag('bites-' + uid);
}

