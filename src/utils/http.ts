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

	get = (endpoint: string, options?: { data: Record<string, unknown>, timeout?: number }) => {
		const queryUrl = options && options.data ? `${endpoint}${queryStringify(options.data)}` : endpoint;
		console.log(queryUrl);
		return this.request(
			queryUrl,
			{...options, method: METHODS.GET}
		);
	};

	put = (endpoint: string, options?: { data: Record<string, unknown>, timeout?: number }) =>
		this.request(
			endpoint,
			{...options, method: METHODS.PUT}
		);

	post = (endpoint: string, options?: { data: Record<string, unknown>, timeout?: number }) =>
		this.request(
			endpoint,
			{...options, method: METHODS.POST}
		);

	delete = (endpoint: string, options?: { data: Record<string, unknown>, timeout?: number }) =>
		this.request(
			endpoint,
			{...options, method: METHODS.DELETE}
		);

	// options:
	// headers — obj
	// data — obj
	request = (endpoint: string, options: { method: METHODS, data?: Record<string, unknown>, headers?: Record<string, string>, timeout?: number } ) => {
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

			xhr.onload = () => resolve(xhr);
			xhr.onabort = () => reject("Aborted");
			xhr.onerror = () => reject("Error occured");
			xhr.timeout = options.timeout || 5000;
			xhr.ontimeout = () => reject("Timeout occured");

			if (options.method === METHODS.GET || !options.data) {
				xhr.send();
			}
			else {
				xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				xhr.send(JSON.stringify(options.data));
			}
		});
	};
}