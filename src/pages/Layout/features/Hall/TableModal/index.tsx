import * as React from 'react';
import { 
    Modal,
    Container,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Grid,
    Avatar,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import { gridHall } from '../utils';
import ProductsOnTable from '../ProductsOnTable';
import ProductModal from './ProductModal';
import { Table } from '../../../../../schemas/Table';
import GroupsIcon from '@mui/icons-material/Groups';
import AddCardIcon from '@mui/icons-material/AddCard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

type props = {
    open: boolean,
    openProductModal: boolean,
    grid: gridHall,
    table: Table,
    handleModal: (show: boolean, modalId: string) => void
    onTakeTable: (grid: gridHall) => void
    onPayTable: () => void
}

type State = {
    products: Array<any> | never[],
    showProductModal: boolean,
    showAddProductButton: boolean
}

const initState:State = {
    products: [],
    showProductModal: false,
    showAddProductButton: true
}

export default function TableModal(props: props) {
    const [ state, setState ] = React.useState<State>(initState);

    function handleModal() {
        setState({
            ...state,
            showProductModal: !state.showProductModal
        });
    }

    function onAddProducts(products:Array<any>) {
        setState({
            ...state,
            products: products,
            showProductModal: !state.showProductModal
        });
    }

    function onCollectTable() {
        setState({
            ...state,
            showAddProductButton: false
        });
    }

    return (
        <div>
            <Modal
                open={props.open}
                onClose={() => props.handleModal(false, "showTableModal")}
            >
                <Container style={{ marginTop: '20px'}}>
                    <Card>
                        <CardHeader
                        sx={{backgroundColor: '#F2F2F2'}}
                            title={`Mesa ${props.table.id}`}
                            subheader={props.table.waiter}
                            avatar={
                                <Avatar sx={{ bgcolor: 'black' }} aria-label="recipe"> 
                                  P
                                </Avatar>
                            }
                        />
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item md={4}>
                                    <Box>
                                        <List>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <PersonOutlineIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={props.table.waiter} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <AccessTimeIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="00:00:00" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <GroupsIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={`${props.table.diners} personas`} />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Grid>
                                
                                <Grid item md={8}>
                                    <ProductsOnTable data={props.table.products} showAddProductButton={state.showAddProductButton} handleModal={handleModal} />
                                </Grid>
                                
                                <Grid
                                    item
                                    md={12}
                                    container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="flex-start"
                                >
                                    <IconButton
                                        sx={{marginRight: '2px'}}
                                        onClick={() => props.handleModal(false, 'showTableModal')}
                                        color="error"
                                        title="Cancelar"
                                    >
                                        <DisabledByDefaultRoundedIcon />
                                    </IconButton>
                                    {
                                        props.table.status === 'taken' ?
                                        (
                                            <React.Fragment>
                                                <IconButton sx={{marginRight: '2px'}} onClick={onCollectTable} color="primary" title="Cuenta">
                                                    <ReceiptLongIcon />
                                                </IconButton>

                                                <IconButton sx={{marginRight: '2px'}} onClick={props.onPayTable} color="primary" title="Cobrar">
                                                    <AddCardIcon />
                                                </IconButton>
                                            </React.Fragment>
                                        ) : ''
                                    }
                                    <IconButton onClick={() => props.onTakeTable(props.grid)} color="success" title="Guardar">
                                        <CheckBoxIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <ProductModal open={state.showProductModal} handleModal={handleModal} onAddProducts={onAddProducts} />
                </Container>
            </Modal>
        </div >
    )
}
