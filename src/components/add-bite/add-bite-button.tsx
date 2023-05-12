'use client';

import styles from '@/components/add-bite/add-bite.module.scss';
import {ActionIcon, Flex} from "@mantine/core";
import {IconFeather} from "@tabler/icons-react";

export default function AddBiteButton({ onAddBite } : any) {

  return (
    <Flex className={styles.stickyRightBottom} align='center' justify='end'>
      <ActionIcon onClick={onAddBite} size={35} className={styles.bgBlue} color="blue" radius="xl" variant="filled">
        <IconFeather size="1.3rem"/>
      </ActionIcon>
    </Flex>
  )
}
