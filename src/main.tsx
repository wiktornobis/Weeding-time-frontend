import React from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import App from "./App.tsx";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import ToggleColorMode from '@/ts/theme/ToggleColorMode.tsx';
import store from '@/redux/store.ts';
import { graphqlUri } from "@/ts/constants/variables.ts";

const client = new ApolloClient({
    uri: `${graphqlUri}`,
    cache: new InMemoryCache(),
});


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <ToggleColorMode>
                        <App />
                    </ToggleColorMode>
                </ApolloProvider>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>
);
