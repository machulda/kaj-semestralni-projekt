export const FetchStatus = {
    LOADING: 0,
    SUCCESS: 1,
    FAILURE: 2
};

export const handleErrors = response => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const fetchFromApi = (endpoint, ...rest) => {
    return fetch(`/api/v1/${endpoint}`, ...rest);
}