'use client';

import AddBiteButton from '@/components/add-bite-button';
import AddBiteModal from '@/components/add-bite-modal';
import React, {useState} from 'react';

export default function AddBite({ onAddBite }: {onAddBite: Function}) {
  const [isOpen, setIsOpen] = useState(false);

  return <>
    <AddBiteButton onAddBite={() => setIsOpen(true)}/>
    <AddBiteModal onAddBite={onAddBite} open={isOpen} close={() => setIsOpen(false)}/>
  </>;
}
