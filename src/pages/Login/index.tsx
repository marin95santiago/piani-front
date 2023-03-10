import React from 'react';
import { Card, CardMedia, CardContent, CssBaseline, Grid } from '@mui/material';
import { Utils } from '../../utils/style';
import LoginForm from './components/LoginForm';
import UserContext from '../../contexts/User';
import { UserContextType } from '../../schemas/User';
import { Navigate } from 'react-router-dom';

export default function Login() {

	const { userContext } = React.useContext(
		UserContext
	) as UserContextType;

	if (userContext?.id) {
		return <Navigate to="/" replace />
	} else {
		console.log(userContext)
		return (
			<React.Fragment>
				<CssBaseline />
				<Grid container>
					<Grid item sm={6} md={6}>
						<Card sx={{ bgcolor: Utils.palette.hall.main, width: '100%', height: '100vh' }}>
							<CardMedia
								component="img"
								height="300"
								image="white-piani.png"
								alt="food"
								sx={{ objectFit: "contain" }}
							/>
							<CardContent>
								<LoginForm />
							</CardContent>
						</Card>
					</Grid>
					<Grid item sm={6} md={6}>
						<img src="https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_960_720.jpg" style={{ width: "100%", height: "100vh", objectFit: "cover" }} />
					</Grid>
				</Grid>
			</React.Fragment>
		)
	}
}
