import AppBar from '@mui/material/AppBar';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React from 'react';
import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../hooks/useAuthentication";
////import useAuthentication from "../../components/hooks/useAuthentication.js";
import useServices from "../../components/hooks/useServices.js";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import './Login.css';

const Login = () => {

	let initialState = {
		username: {
			value: "",
			error: false,
			errorMessage: null,
		},
		password: {
			value: "",
			error: false,
			errorMessage: "Please enter valid password.",
		},
	};

	const [formData, setFormData] = useState(initialState);
	const [busy, setBusy] = useState(false);
	////const { AuthContext } = useAuthentication();
	const { login, loggedInUser } = useContext(AuthContext);
	const history = useNavigate();
	const location = useLocation();
	const { from } = (location && location.state) || { from: { pathname: "/home" } };
	const { ServicesCtx } = useServices();
	const { broadcastMessage } = useContext(ServicesCtx);

	useEffect(() => {
		loggedInUser && history(from, { replace: true });
	}, [loggedInUser, from, history]);


	let validateAndLoginData = () => {
		setBusy(true);
		let data = {
			...formData
		};
		let requestJson = {};
		let validDetails = true;
		for (let k in formData) {
			let json = getValidity(k, formData[k].value);
			data[k] = {
				value: data[k].value,
				error: !json.valid,
				errorMessage: json.message,
			};
			validDetails = validDetails && json.valid;
			if (json.valid) {
				requestJson[k] = data[k].value;
			}
		}
		setFormData(data);
		if (validDetails) {
			login(requestJson.username, requestJson.password).then(() => {
				// do nothing
				broadcastMessage("Login successful", "success");
				setBusy(false);
			}).catch(json => {
				broadcastMessage(json.reason, "error");
				setBusy(false);
			});
		} else {
			setBusy(false);
		}
	};

	let matchRegex = (value, re) => {
		let regex = new RegExp(re);
		return regex.test(value);
	}

	let getValidity = (field, value) => {
		let valid = true;
		let message = null;
		if (value == null || value.length === 0) {
			valid = false;
			message = "This field is required.";
		} else {
			switch (field) {
				case "username": {
					if (value.length > 255) {
						valid = false;
						message = "Email can be of length 255 characters";
					} else {
						valid = matchRegex(value, "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
						message = "Please enter valid email.";
					}
					break;
				}
				case "password": {
					if (value.length < 6 || 40 < value.length) {
						valid = false;
						message = "Password's length must be between 6 and 40."
					}
					break;
				}
				default: {
					return;
				}
			}
		}
		return {
			valid,
			message
		};
	};

	let validateAndSaveLoginData = (fieldName, fieldValue) => {
		let json = getValidity(fieldName, fieldValue);
		let data = {
			...formData
		};
		data[fieldName] = {
			value: data[fieldName].value,
			error: !json.valid,
			errorMessage: json.message,
		}
		setFormData(data);
	};

	let saveOnFieldChange = (field, value) => {
		setFormData({
			...formData,
			[field]: {
				...formData[field],
				value
			}
		});
	};

	//if (loggedInUser === null) {
		return (
			<form>

				<AppBar position="sticky">
					<Toolbar>
						<div className="App">
							<header className="App-header">
								<ShoppingCartIcon style={{ 'color': "white" }} /><br></br>
								<Typography variant="h6" component="div" align="left" marginLeft="10px" sx={{ flexGrow: 1 }}>
									UpGrad-Eshop
								</Typography>


								<Button><a href=".\components\login\Login.js" className="App-link">Login </a>
								</Button>

								<Button><a href=".\components\SignUp.js\SignUp.js" className="App-link">sign Up </a>
								</Button>

							</header>
						</div>

					</Toolbar>
				</AppBar>
				<div className="App-signin" align="center">
					<br></br>
					<LockOutlinedIcon style={{ 'color': "white", backgroundColor: "red" }} />
					<br></br>

					<h4> <b>Sign In</b></h4>
					<br></br>

					<label for="email" class="label1" >Email Address</label>
					<input type="email" class="input1" placeholder="Enter Email" name="email" required variant="outlined"
						value={formData.username.value}
						onChange={(event) => saveOnFieldChange("username", event.target.value)}
						onBlur={(event) => validateAndSaveLoginData("username", event.target.value)}
						error={formData.username.error}
						helperText={formData.username.error && formData.username.errorMessage}></input>
					<br></br>
					<br></br>

					<label for="psw" class="label2">Password</label>
					<input type="password" class="input2" placeholder="Enter Password" name="psw" required variant="outlined"
						value={formData.password.value}
						onChange={(event) => saveOnFieldChange("password", event.target.value)}
						onBlur={(event) => validateAndSaveLoginData("password", event.target.value)}
						error={formData.password.error}
						helperText={formData.password.error && formData.password.errorMessage}></input>
					<br></br>
					<br></br>


					<div class="clearfix">
						<button type="button" class="Sign-In" onClick={validateAndLoginData}>SIGN IN</button>
					</div>
					<br></br>
					<br></br>

					<a className="link-C" href=".\components\SignUp\SignUp.js">Don't have an account? Sign Up</a>
					<br></br>
					<br></br>

					<div className="contents">
						<p>Copyright @ <a href="https://upgrad.com" class="link-color">UpGrad </a> 2021</p>
					</div>
				</div>

				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={busy}
				>
					<CircularProgress color="inherit" />
				</Backdrop>

			</form>
		);
	}


export default Login;