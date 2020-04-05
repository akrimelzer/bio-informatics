export const useApi = () => {
  //const basePath = config.apiUri;

  const getHeaders = () => {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  };

  const getApiData = async (path) => {
    return fetch(path, {
      method: 'GET',
      headers: getHeaders(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${path}.`);
        }
        return response.json();
      })
      .catch((e) => e);
  };

  const getMatrixes = async () => {
    const path = '/matrix/';
    return getApiData(path);
  };

  const getResults = async (path) => {
    return getApiData(path);
  };

  return {
    getMatrixes,
    getResults,
  };
};
