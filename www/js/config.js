const _ENV_API = "aHR0cHM6Ly9hcGktZGV2LmFrYXlhbWVkaWEuY29t"; 
const _ENV_IMG = "aHR0cHM6Ly9hcGkuYWtheWFtZWRpYS5jb20vY29udGVudC8="; 

const APP_CONFIG = {
    API_URL: atob(_ENV_API),
    IMG_URL: atob(_ENV_IMG)
};

Object.freeze(APP_CONFIG);