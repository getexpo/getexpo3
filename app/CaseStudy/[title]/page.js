'use client'
import React from 'react'
import Navbar from '@/components/Navbar'

import { useRouter, useParams } from 'next/navigation'
import Case1 from './components/Case1';
import Case2 from './components/Case2';
import Case3 from './components/Case3';
import Case4 from './components/Case4';
import Case5 from './components/Case5';


const Page = () => {
    const params = useParams();
    const title = params.title
    if (title == 'case1') {
        return (
            <>
                <Navbar action='https://calendly.com/rohittangri/looking-to-scale-clone' />
                <Case1 />
            </>
        )
    } else if (title == 'case2') {
        return (
            <>
                <Navbar action='https://calendly.com/rohittangri/looking-to-scale-clone' />
                <Case2 />
            </>
        )
    } else if (title == 'case3') {
        return (
            <>
                <Navbar action='https://calendly.com/rohittangri/looking-to-scale-clone' />
                <Case3 />
            </>
        )
    } else if (title == 'case4') {
        return (
            <>
                <Navbar action='https://calendly.com/rohittangri/looking-to-scale-clone' />
                <Case4 />
            </>
        )
    } else if (title == 'case5') {
        return (
            <>
                <Navbar action='https://calendly.com/rohittangri/looking-to-scale-clone' />
                <Case5 />
            </>
        )
    }

    else {

        return (
            <div className='font-poppins text-3xl text-white flex items-center justify-center w-full min-h-screen bg-black'>
                <Navbar action='https://calendly.com/rohittangri/looking-to-scale-clone' />
                Not Found
            </div>
        )
    }
}

export default Page
