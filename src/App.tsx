import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import Home from './Views/Home';

const Routes = () => {
    let element = useRoutes([
        { path: '/', element: <Home /> },
    ]);

    return element;
};

function App() {
    return (
        <BrowserRouter children={<Routes />} />
    );
}


export default App;
