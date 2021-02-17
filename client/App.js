import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";

const App = () => {
    // React.useEffect(() => {
    //     const jssStyles = document.querySelector('#jss-server-side')
    //     if (jssStyles) {
    //         jssStyles.parentNode.removeChild(jssStyles)
    //     }
    // }, [])
    return (
        <BrowserRouter>
            <MainRouter/>
        </BrowserRouter>
    )
}

export default hot(module) (App);