import * as React from 'react';
import {
    Modal,
    Container,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Typography,
    CardActions,
    IconButton,
    TextField
} from '@mui/material';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { gridHall } from '../utils';

type props = {
    open: boolean,
    grid: gridHall
    handleModal: (show: boolean, modalId: string) => void
    onSetTable: (grid: gridHall) => void
}

type state = {
    selectedGrid: gridHall
}

const initState : state = {
    selectedGrid: { id: 0, key: 0, taken: false, available: false, status: 'NA' }
}

export default function SetTableModal(props: props) {

    const [state, setState] = React.useState<state>(initState);

    function handleFormChange (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { id, value } = event.target;
        setState({
            ...state,
            selectedGrid: {
                ...props.grid,
                [id]: value
            }
        });
    }

    return (
        <div>
            <Modal
                open={props.open}
                onClose={() => props.handleModal(false, "showSetTableModal")}
            >
                <Container style={{ marginTop: '20px', width: 400 }}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://cdn1.infocasas.com.uy/repo/img/59e6b5b34767e_infocdn__cocinagourmet.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    ¿Quieres disponible este grandioso espacio?
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Para ayudarte a identificar mejor deberás usar un número identificador para esta mesa
                                </Typography>
                                <TextField
                                    sx={{marginTop: 5}}
                                    placeholder='Número de identidad'
                                    variant='standard'
                                    fullWidth
                                    required
                                    type="number"
                                    id="key"
                                    value={state.selectedGrid.key}
                                    onChange={(event) => handleFormChange(event)}
                                />
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <IconButton onClick={() => props.onSetTable(state.selectedGrid)} color="success" title="Abrir mesa">
                                <CheckBoxIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Container>
            </Modal>
        </div >
    )
}
