import React from 'react'
import Menu from '@/app/components/menu/menu';
import Card1Card from '@/app/components/card/Card1Card';
import Card1List from '@/app/components/card/Card1List';

const page = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8"> 
        <Card1Card/>
        <Card1List/>
      </main>
    </div>
  );
}

export default page