export type Table = {
    id: number | null,
    status: string,
    waiter: string,
    openTime: number | null,
    diners: number,
    products: Array<any> | never[],
    iva: number,
    totalAccount: number
}