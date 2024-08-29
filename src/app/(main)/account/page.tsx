import React from 'react'
import Menu from '@/app/components/menu/menu'
import AccountCard from '@/app/components/card/AccountCard'

const AccountPage = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  
  return (
    <div className="flex">
    <Menu />
    <main className="flex-1 p-4 flex flex-col items-center mt-8"> 
        <AccountCard token={token || ''} />
      </main>
  </div>
  )
}

export default AccountPage