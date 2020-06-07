import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { UserContextProvider } from './contexts/UserContext';
import { PageContextProvider } from './contexts/PageContext';
import { VersionContextProvider } from './contexts/VersionContext';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <VersionContextProvider>
            <PageContextProvider>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
            </PageContextProvider>
        </VersionContextProvider>
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

