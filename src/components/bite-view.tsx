'use client';

import {createStyles, Card, Image, Text, Group, Flex, ActionIcon} from '@mantine/core';
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {useState, useTransition} from "react";
import {Bite} from "@/libs/api/bites";
import {useToken, useUid} from "@/libs/auth";
import {useSWRConfig} from "swr";
import {deleteBite, editBite} from "@/app/_actions";
import BiteActionModal from "@/components/bite-action-modal";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    marginBottom: '1rem',
    width: '100%',
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
  action: {
    position: 'absolute',
    right: '0px',
    top: '0px',
  }
}));

interface BitesProps {
  bid?: string;
  url?: string;
  category?: string;
  title?: string;
  content?: string;
  date?: string;
  author?: {
    name?: string;
    avatar?: string;
  };
  acionable: boolean,
}

export default function BiteView(props: BitesProps) {
  const { classes } = useStyles();
  const token = useToken();
  const uid = useUid();
  const {mutate} = useSWRConfig();
  const [openEdit, setOpenEdit] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onDelete(id: string) {
    console.log(id);
    startTransition(() => {
      deleteBite(id, token, uid).then((b) => {
        mutate([`/api/v0/uid/bites`, uid, token])
      });
    });
  }

  function modifyBite(biteData: any) {
    startTransition(() => {
      const bite: Bite = {
        id: biteData.bid,
        title: biteData.title,
        content: biteData.content,
      }
      editBite(bite, token, uid).then((b) => {
        mutate([`/api/v0/uid/bites`, uid, token])
      });
    })
  }

  return <div style={{position: 'relative'}}>
    <BiteActionModal
      isPending={isPending}
      isOpen={openEdit}
      close={() => setOpenEdit(false)}
      action={modifyBite}
      bite={{bid: props.bid, title: props.title, content: props.content}}
    />
    <Card id={props.bid?.toString()} withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        {props.url && <Image alt={props.title} src={props.url} height={140} width={140} />}
        <div className={classes.body}>
          <Text transform="uppercase" color="dimmed" weight={700} size="xs">
            {props.category}
          </Text>
          <Text className={classes.title} mt="xs" mb="md">
            {props.title}
          </Text>
          <Text mt="xs" mb="md">
            {props.content}
          </Text>

          <Group noWrap spacing="xs">
            {/*<Group spacing="xs" noWrap>*/}
            {/*  <Avatar size={20} src={author.avatar} />*/}
            {/*  <Text size="xs">{author.name}</Text>*/}
            {/*</Group>*/}
            <Text size="xs" color="dimmed">
              {props.date}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
    {props.acionable ?
      <div className={classes.action}>
        <Flex justify={'end'}>
          <ActionIcon onClick={() => setOpenEdit(true)} bg={'blue'}><IconEdit size='1rem'/></ActionIcon>
          <ActionIcon onClick={() => onDelete(props.bid ?? '')} color='red'><IconTrash size='1rem'/></ActionIcon>
        </Flex>
      </div> : <></>}
  </div>
}