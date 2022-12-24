import React from 'react';
import Navbar from "./components/navbar/Navbar";
import ItemListContainer from './components/main/ItemListContainer';
import ItemDetailContainer from './components/main/ItemDetailContainer';
import ItemCategoryContainer from './components/main/ItemCategoryContainer';
import ItemSearchContainer from './components/main/ItemSearchContainer';
import Footer from './components/Footer/Footer';
import Carrito from './components/main/Carrito';
import Error404 from './components/main/Error404';
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";


const App = () => {
    return (
        < >
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<ItemListContainer />} /> 
                    <Route path="/cart" element={<Carrito />} />
                    <Route path="/item/:id" element={<ItemDetailContainer />} />
                    <Route path="/category/:categoria" element={<ItemCategoryContainer />} />
                    <Route path="/category/:categoria/:filterKeys" element={<ItemCategoryContainer />} />
                    <Route path="/search/:searchKeys" element={<ItemSearchContainer />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>    
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
