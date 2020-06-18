export function config () {
        const config = {
            headers: {
            'Content-type': 'application/json'
            }
        };
    
        if (localStorage.getItem('token')) {
            config.headers['x-auth-token'] = localStorage.getItem('token');
        }

        return config;
}