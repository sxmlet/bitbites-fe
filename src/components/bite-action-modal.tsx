'use client';

import style from './add-bite-modal.module.scss';
import {Modal, Button, Flex, TextInput, FileInput, rem, LoadingOverlay} from '@mantine/core';
import { Textarea } from '@mantine/core';
import {useState} from 'react';
import {IconUpload} from '@tabler/icons-react';

interface ActionBiteModalProps {
  action: Function;
  isOpen: boolean;
  close: Function;
  bite?: {
    bid: string,
    title: string,
    content: string,
  }
  isPending: boolean,
}


export default function BiteActionModal(props: ActionBiteModalProps) {
  const [value, setValue] = useState('');
  const [titleVal, setTitleVal] = useState('');

  function onSubmit() {
    props.action({
      bid: props.bite ? props.bite.bid : '',
      title: titleVal,
      content: value,
    });
    props.close();
  }

  return (
    <Modal opened={props.isOpen} onClose={props.close} title="Share">
      <LoadingOverlay visible={props.isPending}/>
      <TextInput
        defaultValue={props.bite ? props.bite.title : titleVal}
        onChange={(event) => setTitleVal(event.currentTarget.value)}
        placeholder="Title"
        withAsterisk
      />

      <Textarea
        defaultValue={props.bite ? props.bite.content : value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="A tasty bite"
        withAsterisk
      />

      <FileInput placeholder="Add a thumbnail" icon={<IconUpload size={rem(14)} />} />

      <Flex justify='end'>
        <Button onClick={() => onSubmit()} className={style.submit} compact>Submit</Button>
      </Flex>
    </Modal>
  );
}
