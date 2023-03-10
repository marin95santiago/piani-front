import React from 'react'
import { Box, Container, Divider, Grid, Typography, FormControlLabel, Switch, Avatar, TextField, IconButton, Paper, InputBase } from '@mui/material'
import { utils, gridHall, hall } from './utils';
import { Utils } from '../../../../utils/style';
import TableModal from './TableModal';
import SetTableModal from './SetTableModal';
import TakenTableCard from './TakenTableCard';
import UserContext from '../../../../contexts/User/index';
import { UserContextType } from '../../../../schemas/User';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Service from '../../../../services/Hall';
import { Table } from '../../../../schemas/Table';
import PaymentModal from './PaymentModal';

/*
const data = [
    {
        id: 1,
        active: false,
        waiter: "Disponible",
        openingTime: "00:00:00"
    },
    {
        id: 2,
        active: true,
        waiter: "Santiago Marín",
        openingTime: "15:22:14"
    },
    {
        id: 3,
        active: true,
        waiter: "Pedro Perez",
        openingTime: "13:15:54"
    },
    {
        id: 4,
        active: false,
        waiter: "Disponible",
        openingTime: "00:00:00"
    }
];
*/

export type state = {
    halls: Array<hall>,
    selectedHall: number,
    editMode: boolean,
    showTableModal: boolean,
    showProductModal: boolean,
    showSetTableModal: boolean,
    showPaymentModal: boolean,
    selectedGrid: gridHall,
    selectedTable: Table,
    permission?: {
        editMode?: boolean,
        viewHall?: boolean,
        addHall?: boolean,
        removeHall?: boolean
    },
    disableNextButton: boolean,
    disableBeforeButton: boolean,
    disableTrashButton: boolean
}

const initState: state = {
    editMode: false,
    halls: [
        {
            grids: utils.buildMatrix(144)
        }
    ],
    selectedHall: 0,
    showTableModal: false,
    showProductModal: false,
    showSetTableModal: false,
    showPaymentModal: false,
    selectedGrid: { id: 0, key: 0, taken: false, available: false, status: 'NA' },
    selectedTable: { id: null, status: '', waiter: '', openTime: null, diners: 0, products: [], iva: 0, totalAccount: 0 },
    disableNextButton: false,
    disableBeforeButton: true,
    disableTrashButton: false
}

export default function Hall() {

    const [state, setState] = React.useState<state>(initState);
    const { userContext } = React.useContext(
        UserContext
    ) as UserContextType;

    React.useEffect(() => {
        loadData();
    }, []);

    function loadData() {
        setState({
            ...state,
            permission: {
                ...state.permission,
                editMode: userContext.permissions.some(element => element === 'hall_edit'),
                viewHall: userContext.permissions.some(element => element === 'hall_view'),
                addHall: userContext.permissions.some(element => element === 'hall_add'),
                removeHall: userContext.permissions.some(element => element === 'hall_remove')
            },
            disableNextButton: !(state.halls.length > 1)
        })
    }

    function handleGrid(selectedGrid: gridHall) {
        if ((selectedGrid.available || selectedGrid.taken) && !state.editMode) {
            const table = Service.GetTable(selectedGrid.status);
            setState({
                ...state,
                showTableModal: !state.showTableModal,
                selectedGrid: selectedGrid,
                selectedTable: table.data
            });
        } else if (state.editMode) {
            setState({
                ...state,
                showSetTableModal: !state.showSetTableModal,
                selectedGrid: selectedGrid
            });
        }
    }

    function onTakeTable(selectedGrid: gridHall) {
        const newHalls = [
            ...state.halls,
        ];

        newHalls[state.selectedHall].grids.forEach(grid => {
            if (grid.id === selectedGrid?.id) {
                grid.available = false;
                grid.taken = true;
                grid.status = 'taken';
            }
        });

        setState({
            ...state,
            halls: newHalls,
            showTableModal: !state.showTableModal
        });
    }

    function onSetTable(selectedGrid: gridHall) {
        const newHalls = [
            ...state.halls,
        ];

        newHalls[state.selectedHall].grids.forEach(grid => {
            if (grid.id === selectedGrid?.id) {
                grid.key = selectedGrid.key;
                grid.available = true;
                grid.status = 'available';
            }
        });

        setState({
            ...state,
            halls: newHalls,
            showSetTableModal: !state.showSetTableModal
        });
    }

    function onDefinitionArea(event: React.MouseEvent<HTMLDivElement, MouseEvent>, selectedGrid: gridHall) {
        if (event.buttons > 0 && (event.ctrlKey || event.shiftKey)) {
            console.log(event.shiftKey);
            const newHalls = [
                ...state.halls,
            ];
    
            newHalls[state.selectedHall].grids.forEach(grid => {
                if (grid.id === selectedGrid?.id) {
                    grid.area = !event.shiftKey;
                }
            });
    
            setState({
                ...state,
                halls: newHalls,
            });
        }
    }

    function onPayTable() {
        console.log('va a activar el modal')
        handleTableModal(true, 'showPaymentModal');
        //handleTableModal(false, 'showTableModal');
    }

    function handleTableModal(show: boolean, modalId: string) {
        setState({
            ...state,
            [modalId]: show
        });
    }

    function setEditMode() {
        setState({
            ...state,
            editMode: !state.editMode
        });
    }

    function generateTableCard(grid: gridHall) {
        if ((grid.taken || grid.available) && !state.editMode) {
            return <TakenTableCard grid={grid} />
        } else {
            return (
                <Box>
                    {
                        grid.available ?
                            (
                                <Avatar sx={{ bgcolor: Utils.palette.available.dark }}>
                                    {grid.key}
                                </Avatar>
                            )
                            :
                            ''
                    }

                </Box>
            );
        }
    }

    function onAddHall() {
        setState({
            ...state,
            halls: [
                ...state.halls,
                {
                    grids: utils.buildMatrix(36)
                }
            ],
            disableNextButton: false,
            disableBeforeButton: (state.selectedHall === 0)
        })
    }

    function onNavigateHall(direction: "next" | "before") {
        switch (direction) {
            case "next":
                setState({
                    ...state,
                    selectedHall: state.selectedHall + 1,
                    disableNextButton: (state.halls.length === state.selectedHall + 2),
                    disableBeforeButton: false
                });
                break;
            case "before":
                setState({
                    ...state,
                    selectedHall: state.selectedHall - 1,
                    disableNextButton: false,
                    disableBeforeButton: (state.selectedHall === 1)
                });
                break;
            default:
                break;
        }
    }

    if (!state.permission?.viewHall) {
        return (
            <Typography variant="h1">Parece que no tienes permiso para ingresar acá</Typography>
        )
    }

    return (
        <Box sx={{ background: '#F8F9F9', width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, overflow: 'auto' }}>
        <Container>
            {
                /*
            <Typography
                variant='h4'
            >
                Salón
            </Typography>
            */
            }
            <Divider sx={{ mb: '2vh' }} />
            <Box sx={{ mb: '2vh', display: 'flex', justifyContent: 'end' }}>

                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '37vh' }}
                >
                    <IconButton onClick={() => onNavigateHall("before")} sx={{ p: '10px' }} aria-label="menu" disabled={state.disableBeforeButton}>
                        <NavigateBeforeIcon color="primary" />
                    </IconButton>

                    <InputBase
                        sx={{ ml: 1, flex: 1, textAlign: 'center' }}
                        placeholder={`Salón ${state.selectedHall + 1} de ${state.halls.length}`}
                        disabled
                    />

                    <IconButton onClick={() => onNavigateHall("next")} sx={{ p: '10px' }} aria-label="menu" disabled={state.disableNextButton}>
                        <NavigateNextIcon color="primary" />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    {
                        state.permission?.addHall ?
                            (
                                <IconButton onClick={() => onAddHall()} type="button" sx={{ p: '10px' }} aria-label="search">
                                    <AddCircleIcon color="success" />
                                </IconButton>
                            ) : ''
                    }

                    {
                        state.permission?.removeHall ?
                            (
                                <IconButton sx={{ p: '10px' }} aria-label="menu">
                                    <DeleteIcon color="error" />
                                </IconButton>
                            ) : ''
                    }

                    {
                        state.permission?.editMode ?
                            (
                                <IconButton onClick={() => setEditMode()} color="primary" sx={{ p: '10px' }} aria-label="Editar">
                                    {
                                        state.editMode ?
                                            (
                                                <LockOpenIcon />
                                            ) :
                                            (
                                                <LockIcon />
                                            )
                                    }
                                </IconButton>
                            ) : ''
                    }

                </Paper>
            </Box>
            <Box sx={{ bgcolor: Utils.palette.hall.main }}>
                <Grid container spacing={1}>
                    {
                        state.halls[state.selectedHall].grids.map(grid => (
                            <Grid
                                id={grid.id.toString()}
                                item
                                key={grid.id}
                                xs={1}
                                sm={1}
                                md={1}
                                sx={utils.styleToGrid(grid, state.editMode)}
                                onClick={() => handleGrid(grid)}
                                onMouseOver={(e) => onDefinitionArea(e, grid)}
                            >
                                {
                                    generateTableCard(grid)
                                }
                            </Grid>
                        ))

                    }
                </Grid>
            </Box>
            <SetTableModal open={state.showSetTableModal} handleModal={handleTableModal} onSetTable={onSetTable} grid={state.selectedGrid} />
            <TableModal
                open={state.showTableModal}
                openProductModal={state.showProductModal}
                handleModal={handleTableModal}
                onTakeTable={onTakeTable}
                grid={state.selectedGrid}
                table={state.selectedTable}
                onPayTable={onPayTable}
            />
            <PaymentModal open={state.showPaymentModal} handleModal={handleTableModal} products={state.selectedTable.products} />
        </Container>
        </Box>
    )
}
