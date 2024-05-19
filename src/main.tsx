import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import App from './App.tsx';
import './index.css';
import './i18n';
const client = new QueryClient();
const supabase = createClient(
    'https://hzttvkidfhslsnptrbgu.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dHR2a2lkZmhzbHNucHRyYmd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5MzgzOTksImV4cCI6MjAzMTUxNDM5OX0.IBWUrZjlpoEPQwL9f0hOzDumWo8uZcsUWTh67sNYUo4',
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={client}>
        <SessionContextProvider supabaseClient={supabase}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </SessionContextProvider>
    </QueryClientProvider>,
);
