import { Routes, Route } from "react-router-dom";
import App from "./App";
import Layout from './pages/Geometry';
import Form from './pages/form';

export default function Router() {

    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/layout" element={<Layout />} />
            <Route path="/form" element={<Form />} />
        </Routes>
    );
}