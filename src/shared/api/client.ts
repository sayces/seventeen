import process from 'dotenv';

interface RequestOptions extends RequestInit {
  bodyData?: Record<string, any> | unknown;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    return localStorage.getItem("token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers = new Headers(options.headers);

    if (options.bodyData && !(options.bodyData instanceof FormData)) {
      headers.set("Content-Type", "application/json");
      options.body = JSON.stringify(options.bodyData);
    }

    const token = this.getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    options.headers = headers;

    try {
      const response = await fetch(url, options as RequestInit);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      if (response.status === 204) {
        return {} as T;
      }

      return (await response.json()) as T;
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      throw err;
    }
  }

  public get<T>(endpoint: string, options?: Omit<RequestOptions, "bodyData">) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  public post<T>(
    endpoint: string,
    bodyData?: RequestOptions["bodyData"],
    options?: Omit<RequestOptions, "bodyData">,
  ) {
    return this.request<T>(endpoint, { ...options, method: "POST", bodyData });
  }

  public put<T>(
    endpoint: string,
    bodyData?: RequestOptions["bodyData"],
    options?: Omit<RequestOptions, "bodyData">,
  ) {
    return this.request<T>(endpoint, { ...options, method: "PUT", bodyData });
  }

  public delete<T>(
    endpoint: string,
    options?: Omit<RequestOptions, "bodyData">,
  ) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

// base url env
export const api = new ApiClient(process.env.PUBLIC_API_URL || "")
