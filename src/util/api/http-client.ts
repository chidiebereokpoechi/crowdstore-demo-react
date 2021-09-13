import { HttpRequestHandler } from './http-request-handler'

export class HttpClient {
    public static get<ResponseType>(
        endpoint: string,
        query?: Record<string, string | number>
    ) {
        return HttpRequestHandler.sendRequest<never, ResponseType>({
            url: endpoint,
            method: 'GET',
            request: { query },
        })
    }

    public static post<RequestType, ResponseType>(
        endpoint: string,
        body?: RequestType,
        isFormData?: boolean
    ) {
        return HttpRequestHandler.sendRequest<RequestType, ResponseType>({
            url: endpoint,
            method: 'POST',
            request: { body },
            isFormData,
        })
    }

    public static patch<RequestType, ResponseType = RequestType>(
        endpoint: string,
        body?: RequestType,
        isFormData?: boolean
    ) {
        return HttpRequestHandler.sendRequest<RequestType, ResponseType>({
            url: endpoint,
            method: 'PATCH',
            request: { body },
            isFormData,
        })
    }

    public static delete<ResponseType = unknown>(endpoint: string) {
        return HttpRequestHandler.sendRequest<never, ResponseType>({
            url: endpoint,
            method: 'DELETE',
        })
    }
}
