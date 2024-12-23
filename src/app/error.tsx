"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
interface ErrorPageProps {
    error: any;
    reset: any;
}

const ErrorPage: React.FC<ErrorPageProps> = ({error ,reset}) => {
    const router = useRouter();

    useEffect(() => {
        return () => {
            console.log(error)
            reset();
        }
    }, [error, reset]);

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="text-center">
            <h1>Oops! Something went wrong.</h1>
            <p>{"We can't find the page you're looking for"}.</p>
            <button onClick={handleGoBack}>Go Back</button>
        </div>
    );
};

export default ErrorPage;