'use client';

import styles from './bites-header.module.scss';
import {Header, Group, Container, Button} from '@mantine/core';
import BitBitesLogo from '@/components/bit-bites-logo';
import React, {useEffect, useState} from 'react';
import LoggedInMenu from '@/components/profile/logged-in-menu';
import {auth} from '@/libs/auth';
import Link from "next/link";


export default function BitesHeader() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, [loggedIn]);

  return <Header height={56} className={styles.header} mb={40}>
      <Container size='md'>
        <div className={styles.inner}>
          <Link href='/'><BitBitesLogo/></Link>
          {loggedIn ?
            <LoggedInMenu logout={() => auth.logout()}/>
            :
            <Group position="right">
              <Button onClick={() => auth.login()} style={{backgroundColor: '#228be6'}}>Log in</Button>
            </Group>
          }

        </div>
      </Container>
    </Header>
}