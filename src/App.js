import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';

import { MyInvoiceContext, MyUserContext } from "./configs/Contexts";
import { useReducer } from "react";


import Login from "./components/Login";
import MyUserReducer from "./reducers/MyUserReducer";
import InvoiceReducer from "./reducers/MyInvoiceReducer";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import InvoicePage from "./components/Invoice";
import PaymentMethodPage from "./components/PaymentMothod";
import UploadTransferPage from "./components/UyNhiem";
import ComplaintForm from "./components/ComplaintForm";
import MyLocker from "./components/myLocker";

import VNPayReturnPage from './components/VnpayReturn';
import CardList from './components/CardList';
import VehicleCard from './components/VehicleCard';
import SurveyDetail from './components/SurveyDetail';
import SurveyList from './components/SurveyList';


const App = () => {
  let [user, dispatch] = useReducer(MyUserReducer, null);
  let [invoice, dispatchInvoice] = useReducer(InvoiceReducer, null);

  const handleLogout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <MyInvoiceContext.Provider value={[invoice, dispatchInvoice]}>
        <BrowserRouter>
          <div className="d-flex">
            <Header onLogout={handleLogout} />

            {/* Main content area */}
            <div className="flex-grow-1 p-3">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/invoices" element={<InvoicePage />} />
                <Route path="/paymentMethod" element={<PaymentMethodPage />} />
                <Route path="/uyNhiem" element={<UploadTransferPage />} />
                <Route path="/complaints" element={<ComplaintForm />} />
                <Route path="/myLocker" element={<MyLocker />} />
                <Route path="/payment-result" element={<VNPayReturnPage />} />
                <Route path="/vehicle-card" element={<CardList />} />
                <Route path="/vehicle-card-add" element={<VehicleCard />} />
                <Route path="/survey-detail/:id" element={<SurveyDetail />} />
                <Route path="/survey-list" element={<SurveyList />} />
              </Routes>

              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </MyInvoiceContext.Provider>
    </MyUserContext.Provider>
  );
};
export default App;
