'use client'

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils'
import Image from 'next/image';
import { useEffect, useState } from 'react';


export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  //manufacturer state
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  //filter state
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(2022);

  //pagination state
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    try {
      setLoading(true);

      const result = await fetchCars({
        manufaturer: manufacturer || '',
        model: model || '',
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10
      });

      setCars(result);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getCars();
  }, [fuel, year, manufacturer, model, limit])


  const isDataEmpty = !Array.isArray(cars) || cars.length < 1 || !cars;

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

          <div className='home__filter-container'>
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {cars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {cars.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {
              loading && (
                <div className='mt-16 w-full flex-center'>
                  <Image src="./loader.svg"
                    alt="loader"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              )
            }
            <ShowMore
              pageNumber={(limit || 10) / 10}
              isNext={(limit || 10) > cars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Opps, no results</h2>
            {/* <p>{cars}</p> */}
          </div>
        )}

      </div>
    </main>
  )
}
