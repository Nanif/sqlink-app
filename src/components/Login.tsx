import React, {useState} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import * as AuthService from "../services/auth.service";
import {RouteComponentProps} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setPersonalDetailsData} from "../features/user/userSlice";
import IPersonalDetails from "../../types/personal-details.type";
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import './Login.css'

interface RouterProps {
    history: string;
}

type Props = RouteComponentProps<RouterProps>;

const Login: React.FC<Props> = ({history}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [showHidePassword, changeShowHidePassword] = useState(false);

    const dispatch = useDispatch()


    const initialValues: {
        email: string;
        password: string;
    } = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email is not valid").required("Email is Required")
            // eslint-disable-next-line
            .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Must by English letters only'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Short pwd - must by at least 8 characters')
            .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/, 'Password must contain at least 1 number, 1 lower case and 1 upper case letter')
            .matches(/^[A-Za-z0-9]+$/, "Password must contain latin letters and digits only"),
    });

    const handleLogin = (formValue: { email: string; password: string }) => {
        const {email, password} = formValue;

        setMessage("");
        setLoading(true);

        AuthService.login(email, password).then(
            (data) => {
                setLoading(false);
                const personalDetails: IPersonalDetails = {
                    id: data.personalDetails.id,
                    avatar: data.personalDetails.avatar,
                    joinedAt: data.personalDetails.joinedAt,
                    Team: data.personalDetails.Team,
                    name: data.personalDetails.name
                }
                dispatch(setPersonalDetailsData(personalDetails))
                if (data.token) {
                    localStorage.setItem("token", JSON.stringify(data.token));
                }
                history.push("/info");
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="info-img"
                    className="info-img-card"
                />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    {({dirty, isValid}) => (

                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="email" className="form-control"/>
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <span className="hide-show-btn"
                                      onClick={() => changeShowHidePassword(!showHidePassword)}>
                                  {showHidePassword ? (<FaEye></FaEye>) : (<FaEyeSlash></FaEyeSlash>)}
                                </span>
                                <Field name="password" type={showHidePassword ? "text" : "password"}
                                       className="form-control"/>
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block submit"
                                        style={{cursor: dirty && !isValid ? 'not-allowed' : 'pointer'}}
                                        disabled={dirty && !isValid}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Login</span>
                                </button>
                            </div>

                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
