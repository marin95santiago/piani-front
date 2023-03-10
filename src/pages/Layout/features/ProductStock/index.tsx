import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import DataTable, { columnSchema } from '../../../../components/DataTable'

export default function ProductStock() {

    const columns: Array<columnSchema> = [
        {
            title: 'Ingrediente',
            field: 'ingredient',
            type: 'string'
        },
        {
            title: 'Cantidad (en mililitro, gramo o unidad)',
            field: 'quantity',
            type: 'number',
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

    return (
        <div>
            <Card>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid xs={12} sm={6} item>
                            <FormControl fullWidth>
                            <InputLabel htmlFor='formaPago'>Entidad</InputLabel>
                            <Select
                                id='formaPago'
                                variant='outlined'
                            >
                                <MenuItem value={1}>Entidad 1</MenuItem>
                                <MenuItem value={2}>Entidad 2</MenuItem>
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
                            <Button variant='contained' color='primary' style={{marginLeft: '4px'}}>Buscar</Button>
                        </Grid>
                        <Grid xs={12} sm={12}>
                            <DataTable rows={rows} columns={columns} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}
