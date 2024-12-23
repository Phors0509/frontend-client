import { Jobs } from '@/utils/types/form-type';

export const validateNumericField = (
    name: string,
    value: string,
    formData?: Jobs
): string | null => {
    if (value === "") {
        return "This field is required";
    }

    if (isNaN(Number(value))) {
        return "This field must be a number";
    }

    if (Number(value) < 0) {
        return "This field cannot be a negative number";
    }

    if (name === "max_salary" && formData && formData.min_salary !== undefined && Number(value) <= formData.min_salary) {
        return "Max salary must be larger than Min salary";
    }

    return null;
};

export const validateField = (name: string, value: string): string | null => {
    if (name === "deadline") {
        const currentDate = new Date();
        const inputDate = new Date(value);

        if (!value.trim()) {
            return "Deadline is required";
        }

        if (isNaN(inputDate.getTime())) {
            return "Invalid date format";
        }

        if (inputDate < currentDate) {
            return "Deadline cannot be in the past";
        }
    } else {
        if (!value.trim()) {
            return "This field is required";
        }
    }

    return null;
};