import * as React from 'react';
import {
    Grid,
    Typography,
    Divider,
    Paper,
    Box,
    Button
} from '@mui/material';
import DataTable, { columnSchema } from '../../../../../components/DataTable';
import AddBoxIcon from '@mui/icons-material/AddBox';

const columns: Array<columnSchema> = [
    {
        title: 'Producto',
        field: 'product',
        type: 'string'
    },
    {
        title: 'Rubro',
        field: 'category',
        type: 'string'
    },
    {
        title: 'Cantidad',
        field: 'quantity',
        type: 'number',
        align: true,
        editable: true
    }
];

type props = {
    data: Array<any> | never[],
    showAddProductButton: boolean,
    handleModal: () => void
}

type State = {
    editProductsOnTable: boolean,
    showAddProductButton: boolean,
}

const initState: State = {
    editProductsOnTable: false,
    showAddProductButton: true,
}

export default function ProductsOnTable(props: props) {
    const [ state, setState ] = React.useState<State>(initState);

    React.useEffect(() => {
        console.log('lo renderiza')
        console.log(props.showAddProductButton)
        setState({
            ...state,
            showAddProductButton: props.showAddProductButton
        });
    }, [props])

    function setEditMode() {
        setState({
            ...state,
            editProductsOnTable: !state.editProductsOnTable
        });
    }

    return (
        <Paper sx={{ padding: '20px' }} elevation={1}>
            <Grid container spacing={1}>
                <Grid item md={12}>
                    <Typography variant='h6'>Productos en la mesa</Typography>
                    <Divider />
                    <DataTable rows={props.data} columns={columns} />

                </Grid>
                <Grid
                    item
                    md={12}
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                >
                    <Button
                        variant='outlined'
                        color='primary'
                        startIcon={<AddBoxIcon />}
                        onClick={() => props.handleModal()}
                        disabled={!state.showAddProductButton}
                    >
                        Agregar Producto
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}
