import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from "react-router-dom";

import {
    useQuery,
    useQueryClient,
    useMutation,
    QueryClient,
    QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

import './index.css';
import Candidates from "./Candidates/Candidates.jsx";
import App from "./App";

ReactDOM.render(
    <BrowserRouter>
        <Candidates/>
    </BrowserRouter>,
  document.getElementById('root')
);

