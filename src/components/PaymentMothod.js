
import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MyInvoiceContext } from '../configs/Contexts';

const PaymentMethodPage = () => {
  const navigate = useNavigate();
  const [invoice,dispatch] = useContext(MyInvoiceContext);

  if (!invoice) {
    return <p>Không có thông tin hóa đơn.</p>;
  }

  const handleManual = () => {
    navigate('/uyNhiem');
  };

  const handleOnline = () => {
    alert('Chuyển hướng đến thanh toán trực tuyến...');
    // navigate('/online-payment', { state: { invoice } }); // nếu có sau này
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Chọn phương thức thanh toán</Card.Title>
          <p><strong>Tên hóa đơn:</strong> {invoice.name}</p>
          <p><strong>Số tiền:</strong> {invoice.total.toLocaleString()} VND</p>

          <div className="d-grid gap-2 mt-4">
            <Button variant="outline-primary" onClick={handleManual}>
              Chuyển khoản & Upload ủy nhiệm chi
            </Button>
            <Button variant="outline-success" onClick={handleOnline}>
              Thanh toán trực tuyến (Momo / VNPAY)
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentMethodPage;
