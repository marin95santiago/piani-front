import { Table } from '../../schemas/Table';

type Response = {
    statusCode: number,
    data: Table
}

export default {
    // importante agregar la trasabilidad de la mesa para posteriores reportes (importante usuario que garega cada producto)
    GetTable: (mockType: 'available' | 'taken' | 'NA') : Response => {
        let response;
        if (mockType === 'taken') {
            response = {
                id: 12,
                status: 'taken',
                waiter: 'Santiago',
                openTime: 1668227608,
                diners: 2,
                products: [
                    {
                        id: '1',
                        product: 'Flatwhite',
                        category: 'Cafetería',
                        quantity: 1,
                        price: 400,
                        total: 400,
                        waiter: 'Santiago'
                    },
                    {
                        id: '2',
                        product: 'Ristretto',
                        category: 'Cafetería',
                        quantity: 2,
                        price: 450,
                        total: 900
                    }
                ],
                iva: 250,
                totalAccount: 1300
            }
        } else {
            response = {
                id: 22,
                status: 'available',
                waiter: 'Sin asignar',
                openTime: null,
                diners: 0,
                products: [],
                iva: 0,
                totalAccount: 0
            }
        }
        return {
            statusCode: 200,
            data: response
        }
    }
}