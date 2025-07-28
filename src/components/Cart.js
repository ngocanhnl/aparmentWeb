import { use, useContext, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import cookie from 'react-cookies'
import { MyUserContext } from "../configs/Contexts";
import { Link } from "react-router-dom";
import { authApis, endpoints } from "../configs/Apis";
import MySpinner from "./layout/MySpinner";

const Cart = () => {
    const [cart, setCart] = useState(cookie.load('cart') || null);
    const [user, ] = useContext(MyUserContext);
    const [loading, setLoading] = useState(false);

    const pay = async () => {
        
        try {
            setLoading(true);
            
            let res = await authApis().post(endpoints['pay'], Object.values(cart));
            if (res.status === 200) {
                cookie.remove('cart');
                setCart(null);
            }
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1 className="text-center text-success mt-2">GIỎ HÀNG</h1>

            {cart === null ? <Alert variant="warning">KHÔNG có sản phẩm trong giỏ!</Alert>:<>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(cart).map(c => <tr>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.price}</td>
                            <td>{c.quantity}</td>
                            <td>
                                <Button variant="danger">&times;</Button>
                            </td>
                        </tr>)}
                        
                    </tbody>
                </Table>
            
                {user === null?<Alert>Vui lòng <Link to="/login?next=/cart">đăng nhập</Link> để thanh toán!</Alert>:<div className="mt-1 mb-1">
                    {loading?<MySpinner />: <Button variant="success" onClick={pay}>Thanh toán</Button>}
                </div>}
                
                
            </>}
            
        </>
    );
}

export default Cart;