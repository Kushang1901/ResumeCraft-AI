import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/preview";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SelectTemplate from "./pages/t1";






function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/builder" element={<ResumeBuilder />} />
                <Route path="/t1" element={<SelectTemplate />} />

                <Route path="/preview" element={<Preview />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                


            </Routes>

        </BrowserRouter>
    );
}

export default App;
