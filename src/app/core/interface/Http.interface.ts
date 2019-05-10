export interface ResponseInterface<T> {
    code: number;
    msg: string;
    data?: T;
}
