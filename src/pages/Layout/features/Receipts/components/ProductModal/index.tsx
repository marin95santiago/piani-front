import * as React from 'react';
import { Container, Button, Card, CardContent, CardHeader, Grid, Modal } from '@mui/material';
import DataTable, { columnSchema } from '../../../../../../components/DataTable';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';

type props = {
    open: boolean,
    handleModal: (id: string, show: boolean) => void
}

type state = {
    columns: Array<columnSchema>,
    rows: Array<any>
}

const initState:state = {
    columns: [{
        title: '',
        field: '',
        type: 'string'
    }],
    rows: []
}

const columns: Array<columnSchema> = [
    {
        title: 'Ingrediente',
        field: 'ingredient',
        type: 'string'
    },
    {
        title: 'Medida',
        field: 'unitMeasurement',
        type: 'string'
    },
    {
        title: 'Cantidad (Doble click para agregar cantidad)',
        field: 'quantity',
        align: true,
        editable: true,
        type: 'number'
    }
];
  
const rows = [
    {
        id: '1',
        ingredient: 'Queso parmesano',
        unitMeasurement: 'Miligramo',
        quantity: 0
    },
    {
        id: '2',
        ingredient: 'Harina',
        unitMeasurement: 'Miligramo',
        quantity: 0
    },
    {
        id: '3',
        ingredient: 'Aceite',
        unitMeasurement: 'Mililitro',
        quantity: 0
    },
    {
        id: '4',
        ingredient: 'Huevo',
        unitMeasurement: 'Unidad',
        quantity: 0
    },
    {
        id: '5',
        ingredient: 'Dulce de leche',
        unitMeasurement: 'Miligramo',
        quantity: 0
    },
    {
        id: '6',
        ingredient: 'Pastas de huevo',
        unitMeasurement: 'Miligramo',
        quantity: 0
    },
    {
        id: '7',
        ingredient: 'Aceite de coco',
        unitMeasurement: 'Mililitro',
        quantity: 0
    },
    {
        id: '8',
        ingredient: 'Huevo de codorniz',
        unitMeasurement: 'Unidad',
        quantity: 0
    },
    {
        id: '9',
        ingredient: 'Pan',
        unitMeasurement: 'Miligramo',
        quantity: 0
    },
    {
        id: '10',
        ingredient: 'Mantequilla de maní',
        unitMeasurement: 'Miligramo',
        quantity: 0
    },
    {
        id: '11',
        ingredient: 'Tapa de maizena',
        unitMeasurement: 'unidad',
        quantity: 0
    },
    {
        id: '12',
        ingredient: 'Tapa de empanada',
        unitMeasurement: 'Unidad',
        quantity: 0
    },
];

export default function ProductModal(props: props) {

    const [state, setState] = React.useState<state>(initState);

    React.useEffect(() => {
        setStateProperties();
    }, []);
  
    function setStateProperties() {
        setState({
            ...state,
            columns: columns,
            rows: rows.map(row => {
                return {
                    ...row,
                    check: false
                }
            }),
        });
    };

    function onChange(newRowsValue: any) {
        console.log('ejecuta el padre', newRowsValue)
        setState({
            ...state,
            rows: newRowsValue
        });
    };

    return (
        <div>
            <Modal
                open={props.open}
                onClose={() => props.handleModal('product', false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Container style={{ marginTop: '20px'}}>
                    <Card>
                        <CardHeader
                            title='Ingrediente'
                        />
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={12} item>
                                    <DataTable columns={columns} rows={state.rows} checks={true} setRowValue={onChange} />
                                </Grid>
                                <Grid xs={12} sm={12}
                                    item
                                    container
                                    direction='row'
                                    justifyContent='flex-end'
                                    alignItems='flex-start'
                                >
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        startIcon={<DataSaverOnIcon />}
                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            </Modal>
        </div>
    );
}
