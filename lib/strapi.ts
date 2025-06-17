// lib/strapi.ts
// Centralized utility for Strapi API calls

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

/**
 * Fetches data from the Strapi API.
 * @param path The API endpoint path (e.g., '/articles', '/guides').
 * @param urlParamsObject Optional URL parameters (e.g., { 'filters[slug][$eq]': 'my-article' }).
 * @param options Optional fetch options.
 * @returns The JSON response from the Strapi API.
 */
export async function fetchStrapiData(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    // Construct URL with query parameters
    const queryString = new URLSearchParams(urlParamsObject).toString();
    const requestUrl = `${STRAPI_API_URL}${path}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(requestUrl, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
    throw new Error(`Failed to fetch data from ${path}`);
  }
}

// You can add more specific functions here, e.g.,
// export async function getArticles() {
//   return fetchStrapiData('/articles');
// }

// export async function getArticleBySlug(slug: string) {
//   return fetchStrapiData('/articles', { 'filters[slug][$eq]': slug });
// }