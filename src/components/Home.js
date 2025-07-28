import { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import { useSearchParams } from "react-router-dom";
import cookie from 'react-cookies'
import { MyCartContext } from "../configs/Contexts";
import MySpinner from "./layout/MySpinner";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState();
    const [page, setPage] = useState(1);
    const [params] = useSearchParams();
    const [, cartDispatch] = useContext(MyCartContext);

    const loadProducts = async () => {
        let url = `${endpoints['products']}?page=${page}`;

        if (q)
            url  = `${url}&kw=${q}`;

        let cateId = params.get("cateId");
        if (cateId)
            url  = `${url}&categoryId=${cateId}`;

        console.info(url);

        try {
            

            // let res = await Apis.get(url);

            // if (res.data.length == 0 && page > 1)
            //     page = 0;
            // else {
            //     if (page <= 1)
            //         setProducts(res.data);
            //     else
            //         setProducts([...products, ...res.data]);
            // }
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        let timer = setTimeout(() => {
            if (page > 0)
                loadProducts();
        }, 500);
        
        return () => clearTimeout(timer);
    }, [page, q, params]);

    useEffect(() => {
        setPage(1);
    }, [q, params]);

    const loadMore = () => {
        setPage(page + 1);
    }

    const order = (product) => {
        let cart = cookie.load('cart') || null;
        if (cart === null)
            cart = {};

        if (product.id in cart) {
            cart[product.id]["quantity"]++;
        } else {
            cart[product.id] = {
                "id": product.id,
                "name": product.name,
                "price": product.price,
                "quantity": 1
            }
        }

        cookie.save("cart", cart);

        console.info(cart);

        cartDispatch({
            "type": "update"
        })
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3 mt-2">
                    <Form.Control value={q} onChange={e => setQ(e.target.value)} type="text" placeholder="Tìm kiếm sản phẩm..." />
                </Form.Group>
            </Form>

            {(!products || products.length === 0) && <Alert variant="info" className="mt-2">Không có sản phẩm nào!</Alert>}

            <Row>
                {products.map(p => <Col key={p.id} md={3} xs={6} className="p-1">
                    <Card>
                        <Card.Img variant="top" src={p.image} />
                        <Card.Body>
                            <Card.Title>{p.name}</Card.Title>
                            <Card.Text>{p.price} VNĐ</Card.Text>
                            <Button variant="primary me-1">Xem chi tiết</Button>
                            <Button variant="danger" onClick={() => order(p)}>Đặt hàng</Button>
                        </Card.Body>
                    </Card>
                </Col>)}
            </Row>

            {loading && <MySpinner />}

            {page > 0 && <div className="mt-2 mb-2 text-center">
                <Button variant="primary" onClick={loadMore}>Xem thêm...</Button>
            </div>}
        </>
    );
}

export default Home;