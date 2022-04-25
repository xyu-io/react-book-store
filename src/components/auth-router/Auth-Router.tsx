import React, {Component, Requireable} from "react";
import { Route } from "react-router-dom";
import PropTypes from 'prop-types'
import Auth from "./auth";

class AuthRouter extends Component {
    static propTypes: { path: Requireable<string>; noCheck: Requireable<boolean> };
    constructor(props:any) {
        // @ts-ignore
        super();
        this.state = {

        };
    }
    render() {
        // @ts-ignore
        const {path,noCheck} = this.props
        return <Auth permissionPath={path} noCheck={noCheck}>
            <Route {...this.props}/>
        </Auth>;
    }
}

AuthRouter.propTypes={
    path:PropTypes.string,
    noCheck:PropTypes.bool,
}

export default AuthRouter;