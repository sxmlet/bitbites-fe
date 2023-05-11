'use client';

import style from './add-bite-modal.module.scss';
import {Modal, Button, Flex, TextInput, FileInput, rem, LoadingOverlay} from '@mantine/core';
import { Textarea } from '@mantine/core';
import {useState, useTransition} from 'react';
import {IconUpload} from '@tabler/icons-react';
import newBitBitesClient, {Bite, PostBite} from '@/libs/api/bites';
import {addBite} from "@/app/_actions";
import {useToken} from "@/libs/auth";
import useSWR, {useSWRConfig} from "swr";

export default function AddBiteModal(props: any) {
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState('');
  const [titleVal, setTitleVal] = useState('');
  const [isPending, startTransition] = useTransition();
  const accessToken = useToken();

  function createBite(bite: Bite) {
    startTransition(() => {
      const postBite: PostBite = {
        title: bite.title,
        content: bite.content,
      };
      const promises = [];
      if (bite.file) {
        const client = newBitBitesClient(accessToken);
        promises.push(client.uploadFile(bite.file));
        postBite.filename = bite.file.name;
      }
      promises.push(addBite(postBite, accessToken));

      Promise.all(promises).then(() => {
        if (props.onAddBite) {
          props.onAddBite();
        }
      });

      props.close();
      setValue('');
      setTitleVal('');
      setFile(null);
    })
  }

  return (
    <Modal opened={props.open} onClose={props.close} title="Share">
      <LoadingOverlay visible={isPending}/>
      <TextInput
        value={titleVal}
        onChange={(event) => setTitleVal(event.currentTarget.value)}
        placeholder="Title"
        withAsterisk
      />

      <Textarea
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="A tasty bite"
        withAsterisk
      />

      <FileInput value={file} onChange={setFile} placeholder="Add a thumbnail" icon={<IconUpload size={rem(14)} />} />

      <Flex justify='end'>
        <Button onClick={() => createBite({title: titleVal, content: value, file})} className={style.submit} compact>Post</Button>
      </Flex>
    </Modal>
  );
}
