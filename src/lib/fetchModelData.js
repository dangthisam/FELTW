export const fetchModel = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch model data");
  }

  return response.json();
};
