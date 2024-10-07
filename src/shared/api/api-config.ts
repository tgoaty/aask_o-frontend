const BASE_URL: string = 'http://localhost:8000/api';

interface EndpointsInterface {
    [key: string]: string;
}

export const endpoints: EndpointsInterface = {
    getCurrentGeneral: `${BASE_URL}/current-general`,
    getFutureGeneral: `${BASE_URL}/future-general`,
    getFullTable: `${BASE_URL}/get-table`
}