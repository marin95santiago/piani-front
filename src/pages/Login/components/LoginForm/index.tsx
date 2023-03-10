import React, { useContext } from 'react'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'
import {
	Card,
	CardContent,
	CardHeader,
	Grid,
	TextField,
	Avatar,
	CardActions,
	Button
} from '@mui/material'
import UserService from '../../../../services/User/index'
import { Utils } from '../../../../utils/style'
import UserContext from "../../../../contexts/User/index"
import { UserContextType } from "../../../../schemas/User"
import { ServerError } from '../../../../schemas/Error/error.schema'

type State = {
	user: string,
	password: string
}

const initState: State = {
	user: '',
	password: ''
}

export default function LoginForm() {

	const [state, setState] = React.useState<State>(initState)

	const { setUserContext } = useContext(
		UserContext
	) as UserContextType

	function handleChange (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
		const { id, value } = event.target
		setState({
			...state,
			[id]: value
		})
	}

	async function onLogin() {
		try {
      const userService = new UserService()
			const user = await userService.login(state.user, state.password)
			if (user) {
				setUserContext(user)
			}	
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const serverError = error as AxiosError<ServerError>
        if (serverError && serverError.response) {
          return toast.error(serverError.response.data.message)
        }
			}
		}
		return redirect("/")
	}

	return (
		<div>
			<Card sx={{ bgcolor: Utils.palette.free.main, marginTop: 6, marginX: 6 }}>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: Utils.palette.free.dark }} aria-label="recipe">
							P
						</Avatar>
					}
					title="Inicio de sesión"
					subheader="version 1.0.0"
				/>
				<CardContent>
					<Grid container spacing={1}>
						<Grid xs={12} sm={12} item>
							<TextField
								id='user'
								label='Usuario'
								placeholder='Usuario'
								variant='outlined'
								value={state.user}
								onChange={(e) => handleChange(e)}
								fullWidth
								required
							/>
						</Grid>
						<Grid xs={12} sm={12} item>
							<TextField
								id='password'
								label='Contraseña'
								placeholder='Contraseña'
								variant='outlined'
								value={state.password}
								onChange={(e) => handleChange(e)}
                type='password'
								fullWidth
								required
							/>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions>
					<Button onClick={onLogin} size="small">Ingresar</Button>
					<Button size="small">Registrarse</Button>
				</CardActions>
			</Card>
		</div>
	)
}
