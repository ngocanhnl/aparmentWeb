import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { MyCartContext, MyInvoiceContext, MyUserContext } from "./configs/Contexts";
import { useReducer } from "react";
import MyCartReducer from "./reducers/MyCartReducer";
import Cart from "./components/Cart";
import Register from "./components/Register";
import Login from "./components/Login";
import MyUserReducer from "./reducers/MyUserReducer";
import InvoiceReducer from "./reducers/MyInvoiceReducer";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import InvoicePage from "./components/Invoice";
import PaymentMethodPage from "./components/PaymentMothod";
import UploadTransferPage from "./components/UyNhiem";

const App = () => {
  let [cartCounter, cartDispatch] = useReducer(MyCartReducer, 0);
  let [user, dispatch] = useReducer(MyUserReducer, null);
  let [invoice, dispatchInvoice] = useReducer(InvoiceReducer, null);

  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <MyCartContext.Provider value={[cartCounter, cartDispatch]}>
        <MyInvoiceContext.Provider value={[invoice, dispatchInvoice]}>
          <BrowserRouter>
            <Header />

            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/invoices" element={<InvoicePage />} />
                <Route path="/paymentMethod" element={<PaymentMethodPage />} />
                <Route path="/uyNhiem" element={<UploadTransferPage />} />
              </Routes>
            </Container>

            <Footer />
          </BrowserRouter>
        </MyInvoiceContext.Provider>
      </MyCartContext.Provider>
    </MyUserContext.Provider>
  );
}

export default App;