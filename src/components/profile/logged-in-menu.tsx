'use client';

import {Avatar, createStyles, Group, Menu, rem, Text, UnstyledButton} from '@mantine/core';
import {IconChevronDown, IconHeart, IconLogout, IconTrash} from '@tabler/icons-react';
import React, {useState} from 'react';
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));

const user = {
  name: 'test',
  image: 'image'
};

export default function LoggedInMenu({ logout }: any) {
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return <Menu
    width={260}
    position="bottom-end"
    transitionProps={{ transition: 'pop-top-right' }}
    onClose={() => setUserMenuOpened(false)}
    onOpen={() => setUserMenuOpened(true)}
    withinPortal
  >
    <Menu.Target>
      <UnstyledButton
        className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
      >
        <Group spacing={7}>
          <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
          <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
            {user.name}
          </Text>
          <IconChevronDown size={rem(12)} stroke={1.5} />
        </Group>
      </UnstyledButton>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Item icon={ <IconHeart size="0.9rem" color={theme.colors.red[6]} stroke={1.5}/> }>
        <Link href='/my-bites'>My bites</Link>
      </Menu.Item>
      <Menu.Item onClick={ logout} icon={<IconLogout size="0.9rem" stroke={1.5} /> }>
        Logout
      </Menu.Item>

      <Menu.Divider />

      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item color="red" icon={<IconTrash size="0.9rem" stroke={1.5} />}>
        Delete account
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
}