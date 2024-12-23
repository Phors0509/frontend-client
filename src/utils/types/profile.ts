export interface Location {
    address?: string;
    city?: string;
    country?: string;
}

export interface Contact {
    website?: string;
}

export interface SocialLinks {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
}

export interface ProfileData {
    location?: Location;
    contact?: Contact;
    social_links?: SocialLinks;
    _id?: string;
    sub?: string;
    name?: string;
    email?: string;
    role?: string;
    profile?: string;
    description?: string;
    employee_count?: number;
    job_openings_count?: number;
    job_closings_count?: number;
    completed?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Location {

    address?: string;

    city?: string;

    country?: string;

    coordinates?: string;

}
