import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RegisterForm from './components/RegisterForm';
import { Container, Divider } from '@mui/material';
import DataTable, { columnSchema } from '../../../../components/DataTable';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const columns: Array<columnSchema> = [
    {
        title: 'Receta',
        field: 'receipt',
        type: 'string'
    },
    {
        title: 'Tipo de receta',
        field: 'receiptType',
        type: 'string'
    },
    {
        title: 'Costo de producción aprox',
        field: 'productionCost',
        type: 'number',
        align: true
    },
    {
        title: 'Estado',
        field: 'state',
        type: 'string'
    }
];
  
const rows = [
    {
        receipt: 'Capuccino',
        receiptType: 'Cafetería',
        productionCost: '220',
        state: 'Activo'
    },
    {
        receipt: 'Lungo',
        receiptType: 'Cafetería',
        productionCost: '100',
        state: 'Activo'
    },
    {
        receipt: 'Macchiato',
        receiptType: 'Cafetería',
        productionCost: '110',
        state: 'Activo'
    },
];

export default function Receipts() {
    const [value, setValue] = React.useState(0);

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        setValue(newValue);
    };

    return (
        <Container fixed>
            <Typography
                variant='h4'
            >
                Recetas
            </Typography>
            <Divider sx={{mb: '2rem'}}/>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Listado" {...a11yProps(0)} />
                        <Tab label="Nuevo" {...a11yProps(1)} />
                        <Tab label="Reportes" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <DataTable rows={rows} columns={columns} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <RegisterForm />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Reportes
                </TabPanel>
            </Box>
        </Container>
    );
}
