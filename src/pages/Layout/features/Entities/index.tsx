import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container, Divider } from '@mui/material';
import DataTable, { columnSchema } from '../../../../components/DataTable';
import RegisterForm from './components/RegisterForm';

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
    title: 'Entidad',
    field: 'entity',
    type: 'string'
  },
  {
    title: 'Dirección',
    field: 'address',
    type: 'string'
  },
  {
    title: 'Encargado',
    field: 'manager',
    type: 'string'
  },
  {
    title: 'Teléfono',
    field: 'phone',
    type: 'string'
  },
  {
    title: 'Estado',
    field: 'state',
    type: 'string'
  }
];

const rows = [
  {
    entity: 'Piani Belgrano',
    address: '11 de septiembre de 12558 2626',
    manager: 'Verónica Bravo',
    phone: '654687894',
    state: 'Activo'
  },
  {
    entity: 'Piani Congreso',
    address: 'Av. Congreso 2626',
    manager: 'Maria Belalcazar',
    phone: '654687894',
    state: 'Activo'
  },
  {
    entity: 'Piani Cañitas',
    address: 'Calle Cañitas 1554',
    manager: 'Maximiliano Nuñez',
    phone: '654687894',
    state: 'Activo'
  }
];

export default function Entities() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container fixed>
      <Typography
        variant='h4'
      >
        Entidades
      </Typography>
      <Divider sx={{ mb: '2rem' }} />

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
