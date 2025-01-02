import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/app/store";
import { PersistGate } from 'redux-persist/integration/react';

import Navbar from './shared/components/NavBar';
import Footer from "./shared/components/Footer";
import { LanguageSelector } from "./shared/components/LanguageSelector";


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div style={{ margin: 0, padding: 0 }}>
          <Navbar />
          <Outlet />


          <Footer />

        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
