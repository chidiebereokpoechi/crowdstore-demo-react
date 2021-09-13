import { of } from 'rxjs'
import { ajax, AjaxError, AjaxResponse } from 'rxjs/ajax'
import { catchError, map, tap } from 'rxjs/operators'
import { ApiResponse, HttpClientRequestConfig, HttpConfig } from './http-config'

function logRequest<RequestType>(
    requestConfig: HttpClientRequestConfig<RequestType>,
    response: AjaxResponse<any>
): void {
    if (process.env.NODE_ENV !== 'production') {
        const styles = `
            color: green;
            font-weight: bold;
            font-size: 14px;
            letter-spacing: 1px;
        `

        const { method, url: endpoint, request } = requestConfig

        console.info(`%c Made [${method}] API call to [${endpoint}]:`, styles, {
            request,
            response: response.response,
        })
    }
}

export class HttpRequestHandler {
    public static sendRequest<RequestType, ResponseType>(
        requestConfig: HttpClientRequestConfig<RequestType>
    ) {
        return ajax(HttpConfig.getConfig(requestConfig)).pipe(
            catchError((error) => {
                if (error instanceof AjaxError) {
                    return of(error.response)
                }
                console.error(error)
                throw error
            }),

            tap((response) => {
                logRequest(requestConfig, response)
            }),

            map((response: AjaxResponse<any>): ApiResponse<ResponseType> => {
                const responseContent: ApiResponse<ResponseType> =
                    response.response

                return {
                    errors: responseContent.errors,
                    ok: response.status === 200,
                    data: responseContent.data,
                    status: response.status,
                    message: responseContent.message,
                }
            })
        )
    }
}
