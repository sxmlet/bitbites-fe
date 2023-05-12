'use server';

import newBitBitesClient from "@/libs/api/bites";
import {revalidateTag} from "next/cache";
import {PostBite} from "@/libs/api/models/PostBite";
import {Bite} from "@/libs/api/models/Bite";

export async function addBite(bite: PostBite, token: string) {
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
