import * as React from 'react';
import { Container } from '@mui/system';
import { Box, Card, CardContent, CardHeader, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Modal, Select, TextField } from '@mui/material';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Service from '../../../../../../services/Product';
import DataTable, { columnSchema } from '../../../../../../components/DataTable';

type props = {
    open: boolean,
    handleModal: (id: string) => void
}

type State = {
    showPaymentAccountForm: boolean,
    anchorEl: null | HTMLElement,
    consumptionCodes: Array<any>,
    brands: Array<any>,
    consumptionUnits: Array<any>
}

const initState: State = {
    showPaymentAccountForm: true,
    anchorEl: null,
    consumptionCodes: [],
    brands: [],
    consumptionUnits: []
}

const columns: Array<columnSchema> = [
    {
        title: 'Consecutivo',
        field: 'serial',
        type: 'string'
    },
    {
        title: 'Descripción',
        field: 'description',
        type: 'string'
    },
    {
        title: 'Marca',
        field: 'brand',
        type: 'string'
    },
    {
        title: 'Producto',
        field: 'product',
        type: 'string'
    },
    {
        title: 'Unidad',
        field: 'unitMeasurement',
        type: 'string',
        align: true
    }
];

const rows = [
    {
        serial: 'SR-001',
        description: 'Leche entera',
        brand: 'La serenisima',
        product: 'Leche',
        unitMeasurement: 'litro'
    },
    {
        serial: 'SR-002',
        description: 'Leche deslactosada',
        brand: 'La serenisima',
        product: 'Leche',
        unitMeasurement: 'litro'
    },
    {
        serial: 'SR-003',
        description: 'Crema de leche',
        brand: 'La serenisima',
        product: 'Crema de leche',
        unitMeasurement: 'litro'
    }
];

export default function ProductModal(props: props) {

    const [ state, setState ] = React.useState<State>(initState);

    React.useEffect(() => {
        loadData();  
    }, [])
    
    function loadData() {
        try {
            const consumptionCodes = Service.GetConsumptionsCodes();
            const consumptionUnits = Service.GetConsumptionsUnits();
            const brands = Service.GetBrands();

            setState({
                ...state,
                consumptionCodes: consumptionCodes.data,
                consumptionUnits: consumptionUnits.data,
                brands: brands.data
            });

        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setState({
            ...state,
            anchorEl: event.currentTarget
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            anchorEl: null
        });
    };

    const handleForm = () => {
        setState({
            ...state,
            anchorEl: null,
            showPaymentAccountForm: !state.showPaymentAccountForm
        });
    }

    return (
        <div>
            <Modal
                open={props.open}
                onClose={() => props.handleModal('product')}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container style={{ marginTop: '20px' }}>
                    <Card>
                        <CardHeader
                            title="Productos"
                            subheader="Agregue los productos que el proveedor (NOMBRE PROVEEDOR) tiene en su catálogo de venta"
                            action={
                                <React.Fragment>
                                    <IconButton aria-label="settings" onClick={(e) => handleClick(e)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={state.anchorEl}
                                        open={Boolean(state.anchorEl)}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleForm}>{state.showPaymentAccountForm ? "Ocultar formulario" : "Agregar"}</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            }
                        />
                        <CardContent>
                            <Box sx={state.showPaymentAccountForm ? {} : { display: 'none' }}>
                                <Grid container spacing={1}>
                                    <Grid xs={12} sm={6} item>
                                        <TextField
                                            label='Consecutivo'
                                            placeholder='Código interno'
                                            variant='outlined'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={6} item>
                                        <TextField
                                            label='Descripción del producto'
                                            placeholder='Descripción'
                                            variant='outlined'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={6} item>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor='brand'>Marca</InputLabel>
                                            <Select
                                                id='brand'
                                                variant='outlined'
                                            >
                                                {
                                                    state.brands.map(brand => (
                                                        <MenuItem key={brand.id} value={brand.id}>{brand.description}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} sm={6} item>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor='consumptionCode'>Código de consumo</InputLabel>
                                            <Select
                                                id='consumptionCode'
                                                variant='outlined'
                                            >
                                                {
                                                    state.consumptionCodes.map(consumptionCode => (
                                                        <MenuItem key={consumptionCode.id} value={consumptionCode.id}>{consumptionCode.description}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} sm={6} item>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor='unitMeasurement'>Unidad de consumo</InputLabel>
                                            <Select
                                                id='unitMeasurement'
                                                variant='outlined'
                                            >
                                                {
                                                    state.consumptionUnits.map(consumptionUnit=> (
                                                        <MenuItem key={consumptionUnit.id} value={consumptionUnit.id}>{consumptionUnit.description}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} sm={12}
                                        item
                                        container
                                        direction="row"
                                        justifyContent="flex-end"
                                        alignItems="flex-start"
                                    >
                                        <IconButton color='primary' sx={{marginLeft: '4px'}} title="Guardar">
                                            <DataSaverOnIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Grid xs={12} sm={12} item>
                                <DataTable rows={rows} columns={columns} />
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            </Modal>
        </div>
    );
}
