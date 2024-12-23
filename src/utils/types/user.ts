export interface User {
    _id?: string;
    sub?: string;
    name?: string;
    email?: string;
    role?: string;
    profile?: string;
    location?: {
        address?: string;
        city?: string;
        country?: string;
    };
    contact?: {
        phone_number?: string;
        website?: string;
    };
    social_links?: {
        linkedin?: string;
        twitter?: string;
        facebook?: string;
    };
    description?: string;
    employee_count?: number;
    job_openings_count?: number;
    job_closings_count?: number;
    completed?: number;
    createdAt?: Date;
    updatedAt?: Date;
}