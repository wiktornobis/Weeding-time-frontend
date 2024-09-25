import React from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import App from "./App.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import ToggleColorMode from '@/ts/theme/ToggleColorMode.tsx';
import store from '@/redux/store.ts';

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },  // 5 minutes cache api
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ToggleColorMode>
                        <App />
                    </ToggleColorMode>
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>
);
