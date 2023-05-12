'use client';

import BiteView from '@/components/bite-views/bite-view';
import ErrorAlert from '@/components/alert/error';
import React, {ReactElement} from 'react';
import {Container, Loader} from '@mantine/core';
import {Bite} from "@/libs/api/models/Bite";

interface BitesInput {
  bites: Bite[],
  loading: boolean,
  error?: string,
  actionable: boolean,
}

export default function Bites(props : BitesInput) {
  const container = (element: ReactElement): ReactElement => {
    return <Container size='xs'>
      {element}
    </Container>;
  }

  if (props.loading) {
    return container(<Loader styles={{margin: 'auto'}}/>);
  }

  if (props.error) {
    return container(<ErrorAlert message={props.error}/>);
  }

  const data = props.bites.map((p: Bite) => {
    return <BiteView
      acionable={props.actionable}
      key={p.id}
      title={p.title}
      content={p.content}
      url={p.url}
      bid={p.id?.toString()}
    />;
  });

  return container(<div>{data}</div>);
}
