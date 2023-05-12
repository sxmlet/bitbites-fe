import {IconKeyframes} from '@tabler/icons-react';
import {createStyles, Group, Text, rem} from '@mantine/core';
import React from 'react';

export default function BitBitesLogo() {
  const useStyles = createStyles(theme => ({
    bitesLogo: {
      fontWeight: 500,
      fontSize: rem(20)
    },
  }));
  const {classes} = useStyles();
    return <Group>
      <IconKeyframes size={25} color='blue'/>
      <Text className={classes.bitesLogo}>bitBites</Text>
    </Group>
}