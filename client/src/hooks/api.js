import config from "../config";

export const useApi = () => {
  const basePath = config.apiUri;

  const getHeaders = () => {
    return {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  };

  const getApiData = async path => {
    return fetch(path, {
      method: "GET",
      headers: getHeaders()
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${path}.`);
        }
        return response.json();
      })
      .catch(e => e);
  };

  const getMatrixes = async () => {
    const path = basePath + "/matrix/";
    return getApiData(path);
  };

  const getFilteredMatrixes = async text => {
    console.log("Searching for", text);
    const matrixes = await getMatrixes();
    if (text === "") {
      return matrixes.results;
    } else {
      const result = matrixes.results.filter(element =>
        element.name.toLowerCase().startsWith(text.toLowerCase())
      );
      console.log("result", result);
      return result.slice(0, 50);
    }
  };

  return {
    getMatrixes,
    getFilteredMatrixes
  };
};
