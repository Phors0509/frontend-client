export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: UserData | null;
    error: string | null;
}

export interface UserData {
    id?: string;
    sur_name: string;
    last_name: string;
    email: string;
}

export interface SignUpData {
    sur_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    contact: {
        phone_number: string;
    };
    employee_count: string;
}

export interface VerifyCodeData {
    email: string
    phone_number: string
    code: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    success: boolean;
}