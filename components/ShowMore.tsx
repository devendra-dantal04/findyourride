'use client'
import { FC } from 'react'
import { useRouter } from 'next/navigation';
import CustomButton from './CustomButton';
import { updateSearchParams } from '@/utils';


interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
    setLimit: any
}

const ShowMore: FC<ShowMoreProps> = ({ pageNumber, isNext, setLimit }) => {
    // const router = useRouter();

    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 10;
        // console.log(pageNumber)
        // const newPathname = updateSearchParams("limit", `${newLimit}`);
        // console.log(newPathname)

        setLimit(newLimit)

        // router.push(newPathname);
    }


    return (
        <div className='w-full flex-center gap-5 mt-10'>
            {!isNext && (
                <CustomButton
                    title='Show More'
                    btnType='button'
                    containerStyles='bg-primary-blue rounded-full text-white'
                    handleClick={handleNavigation}
                />
            )}
        </div>
    )
}

export default ShowMore