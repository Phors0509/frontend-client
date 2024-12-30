export const ROUTES = {
    ROOT: '/',
    SIGNIN: '/signin',
    DASHBOARD: {
        ROOT: '/dashboard',
        CHART: '/dashboard/chart',
    }
} as const;

// Ensure trailing slashes for all routes
export const withTrailingSlash = (path: string) =>
    path.endsWith('/') ? path : `${path}/`;