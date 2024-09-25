import AppBar from '@mui/material/AppBar';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import useServices from "../../components/hooks/useServices.js";
import useAuthentication from "../../components/hooks/useAuthentication.js";
import {doSignup} from "../../api/userAuthenticationAPI";
import './SignUp.css';

function SignUp() {

    let initialState = {
        firstName: {
            value: "",
            error: false,
            errorMessage: null,
        },
        lastName: {
            value: "",
            error: false,
            errorMessage: null,
        },
        email: {
            value: "",
            error: false,
            errorMessage: null,
        },
        password: {
            value: "",
            error: false,
            errorMessage: "Please enter valid password.",
        },
        confirmPassword: {
            value: "",
            error: false,
            errorMessage: null,
        },
        contactNumber: {
            value: "",
            error: false,
            errorMessage: null,
        },
    };

    const [formData, setFormData] = useState(initialState);
    const [ setBusy] = useState(false);
    const { ServicesCtx } = useServices();
    const { broadcastMessage } = useContext(ServicesCtx);
    const { AuthCtx } = useAuthentication();
    const { loggedInUser } = useContext(AuthCtx);

    let validateData = () => {
        setBusy(true);
        let data = {
            ...formData
        };
        let requestJson = {};
        let valid = true;
        for (let i in formData) {
            let json = getValidity(i, formData[i].value);
            data[i] = {
                value: data[i].value,
                error: !json.valid,
                errorMessage: json.message,
            };
            valid = valid && json.valid;
            if (json.valid) {
                requestJson[i] = data[i].value;
            }
        }
        setFormData(data);
        if (valid) {
            doSignup(requestJson).then(json => {
                broadcastMessage(json.message, "success");
                setBusy(false);
                setFormData(initialState);
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
                case "firstName": {
                    if (value.length > 255) {
                        valid = false;
                        message = "First name can be of length 255 characters";
                    } else {
                        valid = matchRegex(value, "^([A-Za-z]+)$");
                        message = "Please enter valid first name.";
                    }
                    break;
                }
                case "lastName": {
                    if (value.length > 255) {
                        valid = false;
                        message = "Last name can be of length 255 characters";
                    } else {
                        valid = matchRegex(value, "^([A-Za-z]+)$");
                        message = "Please enter valid last name.";
                    }
                    break;
                }
                case "email": {
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
                    } else {
                        valid = matchRegex(value, "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,40}$");
                        message = "Password must contain at least a symbol (!@#$%^&*), upper and lower case letters and a number.";
                    }
                    break;
                }
                case "confirmPassword": {
                    valid = (value.length > 0 && value === formData.password.value);
                    message = "Passwords do not match.";
                    break;
                }
                case "contactNumber": {
                    valid = matchRegex(value, "^([7-9]{1}[0-9]{9})$");
                    message = "Please enter valid contact number.";
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

    let validateAndSaveInMemory = (fieldName, value) => {
        let json = getValidity(fieldName, value);
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

    let saveOnChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: {
                ...formData[field],
                value
            }
        });
    };

    if (loggedInUser === null) {


        return (
            <form>

                <AppBar position="sticky">
                    <Toolbar>
                        <div className="App">
                            <header className="header">
                                <ShoppingCartIcon style={{ 'color': "white" }} /><br></br>

                                <Typography variant="h6" component="div" align="left" marginLeft="10px" sx={{ flexGrow: 1 }}>
                                    UpGrad-Eshop
                                </Typography>


                                <Button><a href=".\components\login\Login.js" className="link">Login </a>
                                </Button>

                                <Button><a href=".\components\SignUp.js\SignUp.js" className="link">sign Up </a>
                                </Button>

                            </header>
                        </div>

                    </Toolbar>
                </AppBar>


                <div className="App-SignUp" align="center">
                    <LockOutlinedIcon style={{ 'color': "white", backgroundColor: "red" }} />
                    <br></br>

                    <h4> <b>Sign Up</b></h4>
                    <br></br>

                    <div className="input">
                        <input type="text" class="input1" placeholder="First Name" name="First Name" required value={formData.firstName.value}
                            onChange={(event) => saveOnChange("firstName", event.target.value)}
                            onBlur={(event) => validateAndSaveInMemory("firstName", event.target.value)}
                            error={formData.firstName.error}
                            helperText={formData.firstName.error && formData.firstName.errorMessage}></input>
                        <br></br>
                        <br></br>

                        <input type="text" class="input2" placeholder="Last Name" name="Last Name" required value={formData.lastName.value}
                            onChange={(event) => saveOnChange("lastName", event.target.value)}
                            onBlur={(event) => validateAndSaveInMemory("lastName", event.target.value)}
                            error={formData.lastName.error}
                            helperText={formData.lastName.error && formData.lastName.errorMessage}></input>
                        <br></br>
                        <br></br>

                        <input type="email" class="input3" placeholder="Email Address" name="Email Address" required value={formData.email.value}
                            onChange={(event) => saveOnChange("email", event.target.value)}
                            onBlur={(event) => validateAndSaveInMemory("email", event.target.value)}
                            error={formData.email.error}
                            helperText={formData.email.error && formData.email.errorMessage}></input>
                        <br></br>
                        <br></br>

                        <input type="password" class="input4" placeholder="Password" name="Password" required value={formData.password.value}
                            onChange={(event) => saveOnChange("password", event.target.value)}
                            onBlur={(event) => validateAndSaveInMemory("password", event.target.value)}
                            error={formData.password.error}
                            helperText={formData.password.error && formData.password.errorMessage}></input>
                        <br></br>
                        <br></br>

                        <input type="password" class="input5" placeholder="Confirm Password" name="Confirm Password" required value={formData.confirmPassword.value}
                            onChange={(event) => saveOnChange("confirmPassword", event.target.value)}
                            onBlur={(event) => validateAndSaveInMemory("confirmPassword", event.target.value)}
                            error={formData.confirmPassword.error}
                            helperText={formData.confirmPassword.error && formData.confirmPassword.errorMessage}></input>
                        <br></br>
                        <br></br>

                        <input class="input6" placeholder="Contact Number" name="Contact Number" required value={formData.contactNumber.value}
                            onChange={(event) => saveOnChange("contactNumber", event.target.value)}
                            onBlur={(event) => validateAndSaveInMemory("contactNumber", event.target.value)}
                            error={formData.contactNumber.error}
                            helperText={formData.contactNumber.error && formData.contactNumber.errorMessage}></input>
                        <br></br>
                        <br></br>
                    </div>

                    <div class="clearfix">
                        <Button type="Button" class="Sign-Up" onClick={validateData}>SIGN UP</Button>
                    </div>
                    <br></br>

                    <Link to="/login">
                        <Typography variant="body1">
                            Already have an account? Sign in
                        </Typography>
                    </Link>
                    <br></br>
                    <br></br>

                    <div className="contents1">
                        <p>Copyright @ <a href="https://upgrad.com" class="link-color">UpGrad </a> 2021</p>
                    </div>

                </div>
            </form>



        );
    }
else {
    return (
        <Navigate to="/App"/>
    );
}
};

export default SignUp;