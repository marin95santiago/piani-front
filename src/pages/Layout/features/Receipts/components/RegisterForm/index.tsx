import React, { useState } from 'react'
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import KitchenIcon from '@mui/icons-material/Kitchen';
import DataTable, { columnSchema } from '../../../../../../components/DataTable'
import ProductModal from '../ProductModal'

type state = {
    modal: {
        product: boolean,
        payment: boolean
    }
}

const initState: state = {
    modal: {
        product: false,
        payment: false
    }
}

const columns: Array<columnSchema> = [
    {
        title: 'Ingrediente',
        field: 'ingredient',
        type: 'string'
    },
    {
        title: 'Cantidad (en mililitro, gramo o unidad)',
        field: 'quantity',
        type: 'string',
        align: true
    }
];
  
  const rows = [
    {
        ingredient: "Queso parmesano",
        quantity: 20
    },
    {
        ingredient: "Harina",
        quantity: 500
    },
    {
        ingredient: "Aceite",
        quantity: 15
    },
    {
        ingredient: "Huevo",
        quantity: 2
    },
];

export default function RegisterForm() {
    const [ state, setState ] = useState<state>(initState);

    function handleModal (id: string, show: boolean) {
        setState({
            ...state,
            modal: {
                ...state.modal,
                [id]: show
            }
        });
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid xs={12} sm={6} item>
                            <TextField 
                                label='Nombre de la receta'
                                placeholder='Nombre'
                                variant='outlined'
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <FormControl fullWidth>
                            <InputLabel htmlFor='formaPago'>Rubro</InputLabel>
                            <Select
                                id='formaPago'
                                variant='outlined'
                            >
                                <MenuItem value={1}>Cafetería</MenuItem>
                                <MenuItem value={2}>Ensalada</MenuItem>
                                <MenuItem value={3}>Pizzería</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <FormControl fullWidth>
                            <InputLabel htmlFor='formaPago'>Depósito</InputLabel>
                            <Select
                                id='formaPago'
                                variant='outlined'
                            >
                                <MenuItem value={1}>Stock materai prima</MenuItem>
                                <MenuItem value={2}>Stock producto terminado</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={3} item>
                            <TextField 
                                label='Porciones'
                                placeholder='Nombre'
                                variant='outlined'
                                fullWidth
                                required
                                type="number"
                            />
                        </Grid>
                        <Grid xs={12} sm={3} item>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor='unit'>Unidad</InputLabel>
                                            <Select
                                                id='unit'
                                                variant='outlined'
                                            >
                                                <MenuItem value={1}>Litro</MenuItem>
                                                <MenuItem value={2}>Mililitro</MenuItem>
                                                <MenuItem value={3}>Kilogramo</MenuItem>
                                                <MenuItem value={4}>Gramo</MenuItem>
                                                <MenuItem value={5}>Unidad</MenuItem>
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
                            <Button 
                                variant='outlined'
                                color='secondary'
                                onClick={() => handleModal('product', true)}
                                startIcon={<KitchenIcon />}
                            >
                                Agregar ingrediente
                            </Button>
                        </Grid>
                        <Grid xs={12} sm={12}>
                            <DataTable rows={rows} columns={columns} />
                        </Grid>
                        <Grid xs={12} sm={12}
                            item
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-start"
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
            <ProductModal open={state.modal.product} handleModal={handleModal}/>
        </div>
    )
}
