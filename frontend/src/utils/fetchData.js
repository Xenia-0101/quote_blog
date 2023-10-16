const DEFAULT_OPTIONS = {
    headers: {
        "Content-Type": "application/json",
    },
    mode: "cors"

}

export function fetchData(endpoint, callback, options) {
    const fetchOptions = {...DEFAULT_OPTIONS, ...options}
    console.log(fetchOptions)
    fetch(endpoint, fetchOptions)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => error)
}




