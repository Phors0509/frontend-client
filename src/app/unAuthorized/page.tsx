"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const UnauthorizedPage: React.FC = () => {
    const history = useRouter();

    const handleGoBack = () => {
        history.push('/signin');
    };

    return (
        <div className='text-center'>
        <div className='flex items-center justify-center'>
            <Image src="https://i.imgur.com/zJDvGru.png" alt="Unauthorized" width={500} height={500} />
        </div>
            <button onClick={handleGoBack}>Go to Home</button>
        </div>
    );
};

export default UnauthorizedPage;