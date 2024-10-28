import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import App from "./App.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import ToggleColorMode from '@/ts/theme/ToggleColorMode.tsx';
import store from '@/redux/store.ts';
import { checkAuthStatus } from "@/redux/reducers/auth/checkUserAuth-slice.ts";

const queryClient = new QueryClient({
    // defaultOptions: { queries: { staleTime: 1000  } },  // 1 sekunda cache api
});

store.dispatch(checkAuthStatus());

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
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
     </>
);
