export interface PaginatorInterface {
    currentPage: number;
    pageSize: number;
    pageSizeOption: number[];
    totalRow: number;
}

export interface PaginatorApiInterface {
    offset: number;
    limit: number;
}
