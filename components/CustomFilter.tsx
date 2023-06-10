'use client'

import { FC, useState, Fragment } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Listbox, Transition } from '@headlessui/react';
import { updateSearchParams } from '@/utils';

interface OptionProps {
  title: string;
  value: string;
}

interface CustomFilterProps {
  title: string;
  options: OptionProps[]
}

const CustomFilter: FC<CustomFilterProps> = ({ title, options, setFilter }) => {
  const [selected, setSelected] = useState<OptionProps>(options[0]);
  const router = useRouter();


  const handleUpdateParams = (e: { title: string, value: string }) => {
    const newPathname = updateSearchParams(e.title, e.value.toLowerCase());
    router.push(newPathname);
  }

  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          // handleUpdateParams(e);
          setFilter(e.value);
        }
        }
      >
        <div className='relative w-fit z-10'>
          <Listbox.Button className='custom-filter__btn'>
            <span className='block truncate'>{selected.title}</span>
            <Image src="/chevron-up-down.svg" alt="chevron up down" width={20} height={20} className='ml-4 object-contain' />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='ease-in transition duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='custom-filter__options'>
              {options.map((option) => (
                <Listbox.Option key={option.title} value={option} className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}>
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div >
  )
}

export default CustomFilter