import fetch from "cross-fetch";

const defaultHeaders = {
  cache: "no-cache",
  credentials: "same-origin",
  method: "GET",
  mode: "cors",
  redirect: "follow",
  referrer: "no-referrer",
  headers: {
    "Content-Type": "application/json",
  },
};

export const getData = (url, headers = {}) => fetch(url, {
  ...defaultHeaders,
  headers: {
    ...defaultHeaders.headers,
    ...headers,
  },
});

export const fetchJson = async (url, headers = {}) => {
  const response = await fetch(url, {
    ...defaultHeaders,
    headers: {
      ...defaultHeaders.headers,
      ...headers,
    },
    method: "GET",
  });

  return response.json();
};

export const postJson = async (url, data, headers = {}) => {
  const response = await fetch(url, {
    ...defaultHeaders,
    headers: {
      ...defaultHeaders.headers,
      ...headers,
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  return response.json();
};

export const putJson = async (url, data, headers = {}) => {
  const response = await fetch(url, {
    ...defaultHeaders,
    headers: {
      ...defaultHeaders.headers,
      ...headers,
    },
    method: "PUT",
    body: JSON.stringify(data),
  });

  return response.json();
};

export const deleteJson = (url, headers = {}) => new Promise((resolve) => {
  fetch(url, {
    ...defaultHeaders,
    headers: {
      ...defaultHeaders.headers,
      ...headers,
    },
    method: "DELETE",
  })
    .then((r) => r.text())
    .then(resolve);
});
