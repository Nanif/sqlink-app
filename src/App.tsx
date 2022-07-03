import React from "react";
import {useEffect} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import * as UserService from "./services/user.service";
import * as AuthService from "./services/auth.service";
import Login from "./components/Login";
import Home from "./components/Home";
import Info from "./components/Info";
import {useDispatch, useSelector} from "react-redux"
import {loggedIn, setPersonalDetailsData} from "./features/user/userSlice";
import {RootState} from "./store";


const App: React.FC = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)

    useEffect(() => {
        initUser()
    }, []);// eslint-disable-line react-hooks/exhaustive-deps


    const initUser = () => {
        //First take the token from localstorage then save login status and personalDetails in redux for using them in all the components
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(loggedIn(true));
            dispatch(setPersonalDetailsData(UserService.getPersonalDetailsByToken(token)))
        } else
            dispatch(loggedIn(false));
    }


    const logOut = () => {
        AuthService.logout();
        dispatch(loggedIn(false));
    };

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>

                </div>

                {isLoggedIn ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/info"} className="nav-link">
                                info
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>
                    </div>
                )}
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/home"]} component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/info" component={Info}/>
                </Switch>
            </div>
        </div>
    );
};

export default App;
