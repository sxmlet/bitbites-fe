'use client';

import {ReactElement, useState} from 'react';
import {IconAlertCircle} from '@tabler/icons-react';
import {Alert, Container} from '@mantine/core';

export default function ErrorAlert({ message }: { message: string}): ReactElement {
  const [open, setOpen] = useState(true)
  if (!open) {
    return <></>
  }

  return <Container size='sm'>
    <Alert onClose={() => {setOpen(false)}} icon={<IconAlertCircle size="1rem" />} title="Could not load bites!" color="red" withCloseButton>
      {message}
    </Alert>
  </Container>
}
