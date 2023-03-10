type Response = {
    statusCode: number,
    data: Array<any>
}

export default {
    GetProducts: (filters?: string) => {

        let response;

        let data = [
            {
                id: '1',
                serial: 'S-001',
                description: 'Flatwhite',
                categoryC: {
                    id: '1',
                    description: 'Cafetería'
                },
                category: 'Cafetería',
                brand: 'Piani',
                consumptionCode: null,
                tags: ['deProduccion'],
                price: 400,
                cost: 200
            },
            {
                id: '2',
                serial: 'S-002',
                description: 'Ristretto',
                categoryC: {
                    id: '1',
                    description: 'Cafetería'
                },
                category: 'Cafetería',
                brand: 'Piani',
                consumptionCode: null,
                tags: ['deProduccion'],
                price: 400,
                cost: 200
            },
            {
                id: '3',
                serial: 'S-003',
                description: 'Queso parmesano',
                categoryC: {
                    id: '4',
                    description: 'Pizzería'
                },
                category: 'Cafetería',
                brand: 'La paulina',
                consumptionCode: {
                    id: '2',
                    description: 'Queso parmesano'
                },
                tags: ['deProveedor'],
                price: 400,
                cost: 200
            },
            {
                id: '4',
                serial: 'S-004',
                description: 'Leche entera',
                categoryC: {
                    id: '1',
                    description: 'Cafetería'
                },
                category: 'Cafetería',
                brand: 'La serenisima',
                consumptionCode: {
                    id: '1',
                    description: 'Leche'
                },
                tags: ['deProveedor'],
                price: 400,
                cost: 200
            }
        ];

        if (filters === 'deProveedor') {
            response = data.filter(element => {
                let isProvider = element.tags.some(e => e === 'deProveedor');
                if (isProvider) return element;
            });
        }

        if (filters === 'deProduccion') {
            response = data.filter(element => {
                let isProvider = element.tags.some(e => e === 'deProduccion');
                if (isProvider) return element;
            });
            console.log('respuesta', response)
        }

        return {
            statusCode: 200,
            data: response
        }
    },

    GetCategories: () => {
        return {
            statusCode: 200,
            data: [
                {
                    id: '1',
                    description: 'Cafetería'
                },
                {
                    id: '2',
                    description: 'Pizzería'
                },
                {
                    id: '3',
                    description: 'Bebidas'
                },
                {
                    id: '4',
                    description: 'Pastelería'
                },
            ]
        }
    },

    GetBrands: () : Response => {
        return {
            statusCode: 200,
            data: [
                {
                    id: '1',
                    description: 'La serenisima',
                    tags: ['lacteos']
                },
                {
                    id: '2',
                    description: 'La paulina',
                    tags: ['lacteos']
                },
                {
                    id: '3',
                    description: 'Puerto blest',
                    tags: ['cafe']
                },
                {
                    id: '4',
                    description: 'Molino',
                    tags: ['harina']
                }
            ]
        }
    },

    GetConsumptionsCodes: () : Response => {
        return {
            statusCode: 200,
            data: [
                {
                    id: '1',
                    description: 'Leche'
                },
                {
                    id: '2',
                    description: 'Queso parmesano'
                },
                {
                    id: '3',
                    description: 'Queso mozzarela'
                },
                {
                    id: '4',
                    description: 'Harina 0000'
                }
            ]
        }
    },

    GetConsumptionsUnits: () : Response => {
        return {
            statusCode: 200,
            data: [
                {
                    id: '1',
                    description: 'Litro'
                },
                {
                    id: '2',
                    description: 'Mililitro'
                },
                {
                    id: '3',
                    description: 'Gramo'
                },
                {
                    id: '4',
                    description: 'Miligramo'
                }
            ]
        }
    }
}