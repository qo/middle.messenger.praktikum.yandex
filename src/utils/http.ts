enum METHODS {
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE"
}

// unknown может спровоцировать ошибку
function queryStringify(data: Record<string, unknown>) {
	const entries = Object.entries(data).map(
		([key, val]) => (`${key}=${val}`)
	);
	return `?${entries.join("&")}`;
}

export default class HTTP {

	private _baseURL: string;

	constructor(baseURL: string) {
		this._baseURL = baseURL;
	}

	private _getFullUrl = (endpoint: string) => this._baseURL + endpoint;

	async get<T>(
		endpoint: string,
		options?: {
			data: any,
			timeout?: number
		}): Promise<T> {
			const queryUrl = options && options.data ? `${endpoint}${queryStringify(options.data)}` : endpoint;
			return this.request(
				queryUrl,
				{...options, method: METHODS.GET}
			);
	};

	async put<T>(
		endpoint: string,
		options?: {
			data: any,
			timeout?: number
		}): Promise<T> {
			return this.request(
				endpoint,
				{...options, method: METHODS.PUT}
			);
	}

	async post<T>(
		endpoint: string,
		options?: {
			data: any,
			timeout?: number
		}): Promise<T> {
			return this.request(
				endpoint,
				{...options, method: METHODS.POST}
			);
	}

	async delete<T>(
		endpoint: string,
		options?: {
			data: any,
			timeout?: number
		}): Promise<T> {
			return this.request(
				endpoint,
				{...options, method: METHODS.DELETE}
			);
	}

	async request<T>(
		endpoint: string,
		options: {
			method: METHODS,
			data?: any,
			headers?: Record<string, string>,
			timeout?: number
		}): Promise<T> {

		return new Promise((resolve, reject) => {

			const url = this._getFullUrl(endpoint);

			const xhr = new XMLHttpRequest();

			xhr.open(options.method, url);

			if (options.headers)
				Object.entries(options.headers).forEach(
					([key, val]) => xhr.setRequestHeader(key, val)
				);

			// Прикрепляем куки для всех запросов
			// (мне лень делать флаг типа "attachCookies"
			// для этой функции)
			xhr.withCredentials = true;

			xhr.onload = () => {
				let res;
				if (xhr.getResponseHeader('Content-Type') === 'application/json')
					res = JSON.parse(xhr.response)
				else
					res = xhr.response;
				if (xhr.status === 200)
					resolve(res);
				else
					reject(res);
			};
			xhr.onabort = () => reject("Aborted");
			xhr.onerror = () => reject("Error occured");
			xhr.timeout = options.timeout || 5000;
			xhr.ontimeout = () => reject("Timeout occured");

			if (options.method === METHODS.GET || !options.data) {
				xhr.send();
			}
			else {
				if (options.data instanceof FormData)
					xhr.send(options.data);
				else {
					xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					xhr.send(JSON.stringify(options.data));
				}
			}
		});
	};
}