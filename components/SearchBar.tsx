'use client'
import { FC, ReactEventHandler, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SearchButton, SearchManufacturer } from './';


interface SearchBarProps {

}

const SearchBar: FC<SearchBarProps> = ({ setManufacturer, setModel }: any) => {

  const [searchModel, setSearchModel] = useState('')
  const [searchManufacturer, setSearchManufacturer] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchManufacturer === '' && searchModel === '') {
      return alert('Please fill in the search bar')
    }

    // updateSearchParams(searchModel.toLowerCase(), searchManufacturer.toLowerCase());
    setModel(searchModel);
    setManufacturer(searchManufacturer);
  }

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set('model', model);
    } else {
      searchParams.delete('model');
    }

    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer);
    } else {
      searchParams.delete('manufacturer');
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname)
  }


  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchManufacturer
          // manufacturer={searchManufacturer}
          // setManufacturer={setSearchManufacturer}
          selected={searchManufacturer}
          setSelected={setSearchManufacturer}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>

      <div className='searchbar__item'>
        <Image src='/model-icon.png' width={25} height={25} className='absolute w-[20px] h-[20px] ml-4' alt='car model' />
        <input type='text' value={searchModel} onChange={(e) => setSearchModel(e.target.value)} name='model' placeholder='Tiguan' className='searchbar__input' />
        <SearchButton
          otherClasses='sm:hidden'
        />
      </div>
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  )
}

export default SearchBar