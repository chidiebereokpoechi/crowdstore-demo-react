import { AjaxRequest } from 'rxjs/ajax'

export interface ApiRequest<T> {
    body?: T
    query?: Record<string, string | number>
    model?: T
}

export interface ApiResponse<T> {
    ok: boolean
    status: number
    message: string
    data?: T
    errors?: Record<string, string[]>
}

export type HttpMethod = 'POST' | 'GET' | 'PATCH' | 'DELETE'

export interface HttpClientRequestConfig<RequestType> {
    url: string
    method: HttpMethod
    isFormData?: boolean
    request?: ApiRequest<RequestType>
}

export class HttpConfig {
    public static getURL(url: string): string {
        const base = process.env.REACT_APP_ROOT
        return base + '/' + url
    }

    public static getConfig<RequestType>({
        url,
        method,
        isFormData,
        request,
    }: HttpClientRequestConfig<RequestType>): Pick<
        AjaxRequest,
        'crossDomain' | 'url' | 'method' | 'headers' | 'body'
    > {
        const headers: Record<string, string> = {}

        if (!isFormData) {
            headers.Accept = 'application/json'
            headers['Content-Type'] = 'application/json'
        }

        if (request?.query) {
            url = Object.entries(request.query).reduce(
                (query, [key, value]) => query + key + '=' + value + '&',
                `${url}?`
            )
        }

        return {
            url: HttpConfig.getURL(url),
            method,
            headers,
            body: request?.body,
            crossDomain: true,
        }
    }
}
