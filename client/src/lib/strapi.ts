/**
 * Strapi API client for making requests to a Strapi CMS instance
 */
class StrapiClient {
  private baseUrl: string;
  private apiToken: string | null;

  constructor(baseUrl: string, apiToken: string | null = null) {
    this.baseUrl = baseUrl;
    this.apiToken = apiToken;
  }

  /**
   * Get the authorization headers for API requests
   */
  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiToken) {
      headers['Authorization'] = `Bearer ${this.apiToken}`;
    }

    return headers;
  }

  /**
   * Update the configuration for the client
   */
  updateConfig(baseUrl: string, apiToken: string | null) {
    this.baseUrl = baseUrl;
    this.apiToken = apiToken;
  }

  /**
   * Get a collection of items from Strapi
   */
  async getEntries(contentType: string, query: Record<string, any> = {}) {
    // Get configuration from localStorage if available
    this.loadConfigFromStorage();

    const queryString = Object.entries(query)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');

    const url = `${this.baseUrl}/api/${contentType}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${contentType}: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Get a single entry from Strapi
   */
  async getEntry(contentType: string, id: string | number, query: Record<string, any> = {}) {
    // Get configuration from localStorage if available
    this.loadConfigFromStorage();

    const queryString = Object.entries(query)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');

    const url = `${this.baseUrl}/api/${contentType}/${id}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${contentType} with ID ${id}: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Create a new entry in Strapi
   */
  async createEntry(contentType: string, data: any) {
    // Get configuration from localStorage if available
    this.loadConfigFromStorage();

    const url = `${this.baseUrl}/api/${contentType}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create ${contentType}: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Update an entry in Strapi
   */
  async updateEntry(contentType: string, id: string | number, data: any) {
    // Get configuration from localStorage if available
    this.loadConfigFromStorage();

    const url = `${this.baseUrl}/api/${contentType}/${id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ${contentType} with ID ${id}: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Delete an entry from Strapi
   */
  async deleteEntry(contentType: string, id: string | number) {
    // Get configuration from localStorage if available
    this.loadConfigFromStorage();

    const url = `${this.baseUrl}/api/${contentType}/${id}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ${contentType} with ID ${id}: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Upload a file to Strapi media library
   */
  async uploadFile(file: File, fileInfo?: { alternativeText?: string; caption?: string }) {
    // Get configuration from localStorage if available
    this.loadConfigFromStorage();

    const formData = new FormData();
    formData.append('files', file);

    if (fileInfo) {
      formData.append('fileInfo', JSON.stringify(fileInfo));
    }

    const url = `${this.baseUrl}/api/upload`;

    const headers: Record<string, string> = {};
    if (this.apiToken) {
      headers['Authorization'] = `Bearer ${this.apiToken}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Load configuration from localStorage if available
   */
  private loadConfigFromStorage() {
    try {
      const savedConfig = localStorage.getItem('strapiConfig');
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        this.baseUrl = config.strapiUrl;
        this.apiToken = config.apiToken;
      }
    } catch (error) {
      console.error('Failed to load Strapi config from localStorage:', error);
    }
  }
}

// Initialize a default client
const strapiClient = new StrapiClient(
  // Default values that will be overridden by localStorage if available
  'http://localhost:1337',
  null
);

export default strapiClient;