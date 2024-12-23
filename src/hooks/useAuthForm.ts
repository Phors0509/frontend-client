import { useState } from 'react';

export function useAuthForm<T>(initialState: T) {
    const [formData, setFormData] = useState<T>(initialState);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof T]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (data: T & Record<string, any>): boolean => {
        const newErrors: Partial<Record<keyof T, string>> = {};
        let isValid = true;

        // Basic validation rules
        Object.entries(data).forEach(([key, value]) => {
            if (!value) {
                newErrors[key as keyof T] = 'This field is required';
                isValid = false;
            } else if (key === 'email' && !/\S+@\S+\.\S+/.test(value as string)) {
                newErrors[key as keyof T] = 'Invalid email address';
                isValid = false;
            } else if (key === 'password' && (value as string).length < 6) {
                newErrors[key as keyof T] = 'Password must be at least 6 characters';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    return {
        formData,
        errors,
        isSubmitting,
        setIsSubmitting,
        handleChange,
        validateForm,
        setErrors,
    };
}