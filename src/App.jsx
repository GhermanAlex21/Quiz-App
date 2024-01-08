import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddQuestion from "../components/question/AddQuestion"

const App = () => {
    return (
        <Router>
            <div>
                {/* Alte componente/rute */}
                <Routes>
  <Route path="/create-quiz" element={<AddQuestion />} />
</Routes>
            </div>
        </Router>
    );
};

export default App;