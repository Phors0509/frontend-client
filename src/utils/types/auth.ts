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
    email?: string;
    phone_number?: string;
    password: string;
}

export interface VerifyCodeData {
    email: string
    phone_number: string
    code: string;
}

export interface SignInData {
    email: string;
    phone_number: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    success: boolean;
}