import { useContext, useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import Apis, { authApis, endpoints } from "../configs/Apis";
import { useNavigate } from "react-router-dom";
import MySpinner from "./layout/MySpinner";
import { MyUserContext } from "../configs/Contexts";

const ChangePassword = () => {
    const info = [
        {

        "title": "Mật khẩu",
        "field": "password",
        "type": "password"
    }, {
        "title": "Xác nhận mật khẩu",
        "field": "confirm",
        "type": "password"
    }];

    const avatar = useRef();
    const [user2, setUser2] = useState({});
    const [msg, setMsg] = useState();
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const [user,dispatch] = useContext(MyUserContext);

    const validate = () => {
        if (user2.confirm === null || user2.password === null || user2.confirm !== user2.password)
            setMsg("Mật khẩu KHÔNG khớp!");

        return true;
    }

    const register = async (event) => {
        event.preventDefault();

        if (validate()) {
           try {
            setLoading(true);
                const params = new URLSearchParams();
                params.append("password", user2.password);
                params.append("userId", user.userId);
                console.info(params);
                 
                let res = await authApis().post(endpoints['change-password'], params, {
                    headers: {
                       'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                if (res.status === 201)
                    nav("/login");
           } catch (ex) {
                console.error(ex);
           } finally {
            setLoading(false);
           }
        }

        
    }

    return (
        <>
            <h1 className="text-center text-success mt-2">ĐĂNG KÝ</h1>

            {msg && <Alert variant="danger">{msg}</Alert>}

            <Form onSubmit={register}>
                {info.map(i => <Form.Group key={i.field} className="mb-3" controlId={i.field}>
                    <Form.Label>{i.title}</Form.Label>
                    <Form.Control required value={user2[i.field]} onChange={e => setUser2({...user2, [i.field]: e.target.value})} type={i.type} placeholder={i.title} />
                </Form.Group>)}

                
                {loading ? <MySpinner />:<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Button type="submit" variant="success">Đăng ký</Button>
                </Form.Group>}
            </Form>
        </>
    );
}

export default ChangePassword;