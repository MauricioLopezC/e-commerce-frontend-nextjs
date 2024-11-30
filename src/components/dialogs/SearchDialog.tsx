"use client"
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'

interface SearchProps {
  isOpen: boolean,
  setIsOpen: Function
}

function SearchDialog({ isOpen, setIsOpen }: SearchProps) {
  const [searchWord, setSearchWord] = useState('')
  const router = useRouter()
  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-1/3 space-y-4 border bg-white p-6 rounded-md">
            <DialogTitle className="font-bold text-center">Buscar Productos</DialogTitle>
            <form>
              <div className='relative'>
                <MagnifyingGlassIcon className='h-6 w-6 absolute top-0 bottom-0 my-auto text-gray-400 left-3' />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-black"
                  onChange={(e) => {
                    e.preventDefault()
                    console.log(e.target.value)
                    //updateSearchWord(e.target.value)
                    setSearchWord(e.target.value)
                  }}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => {
                    setIsOpen(false)
                    router.push(`/search?productName=${searchWord}`)
                  }}>
                  Buscar
                </Button>
                <Button
                  variant='outline'
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default SearchDialog
