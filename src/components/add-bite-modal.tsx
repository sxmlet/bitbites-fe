'use client';

import style from './add-bite-modal.module.scss';
import {Modal, Button, Flex, TextInput, FileInput, rem, LoadingOverlay} from '@mantine/core';
import { Textarea } from '@mantine/core';
import {useState, useTransition} from 'react';
import {IconUpload} from '@tabler/icons-react';
import newBitBitesClient, {Bite} from '@/libs/bites';
import {addBite} from "@/app/_actions";
import {useToken} from "@/libs/auth";
import useSWR, {useSWRConfig} from "swr";

export default function AddBiteModal(props: any) {
  const [value, setValue] = useState('');
  const [titleVal, setTitleVal] = useState('');
  const [isPending, startTransition] = useTransition();
  const accessToken = useToken();

  function createBite(biteData: Bite) {
    startTransition(() => {
      addBite(biteData, accessToken).then((b) => {
        if (props.onAddBite) {
          props.onAddBite(b);
        }
      });

      props.close();
      setValue('');
      setTitleVal('');
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

      <FileInput placeholder="Add a thumbnail" icon={<IconUpload size={rem(14)} />} />

      <Flex justify='end'>
        <Button onClick={() => createBite({title: titleVal, content: value})} className={style.submit} compact>Post</Button>
      </Flex>
    </Modal>
  );
}
