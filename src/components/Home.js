// import { useContext, useEffect, useState } from "react";
// import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
// import Apis, { endpoints } from "../configs/Apis";
// import { useSearchParams } from "react-router-dom";
// import cookie from 'react-cookies'
// import { MyCartContext } from "../configs/Contexts";
// import MySpinner from "./layout/MySpinner";

// const Home = () => {
   
//     const [loading, setLoading] = useState(true);
//     const [q, setQ] = useState();
//     const [page, setPage] = useState(1);
//     const [params] = useSearchParams();
   

    

//     useEffect(() => {
//         setLoading(true);
//         let timer = setTimeout(() => {
//             if (page > 0)
//                 loadProducts();
//         }, 500);
        
//         return () => clearTimeout(timer);
//     }, [page, q, params]);

//     useEffect(() => {
//         setPage(1);
//     }, [q, params]);

    

//     return (
//         <>
          
//         </>
//     );
// }

// export default Home;

import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { MyUserContext } from "../configs/Contexts";
import { useNavigate } from "react-router-dom";
import Apis, { authApis, endpoints } from "../configs/Apis";
import MySpinner from "./layout/MySpinner";

const Home = () => {
    const [user, dispatch] = useContext(MyUserContext);
    const [user2, setUser2] = useState({});
    const [msg, setMsg] = useState();
    const [loading, setLoading] = useState(false);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const avatar = useRef();
    const nav = useNavigate();

    const fields = [
        { title: "Họ và tên lót", field: "fullName", type: "text" },
        { title: "Số điện thoại", field: "phone", type: "tel" },
        { title: "Email", field: "email", type: "email" },
        { title: "Tên đăng nhập", field: "username", type: "text" },
    ];

    useEffect(() => {
        if (user) {
            setUser2({
                fullName: user.fullName,
                phone: user.phone,
                email: user.email,
                username: user.username,
                avatarUrl: user.avatarUrl,
            });
            setPreviewAvatar(user.avatarUrl);
        }
    }, [user]);

    const updateProfile = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            let formData = new FormData();

            for (let key in user2) {
                formData.append(key, user2[key]);
            }

            if (avatar.current.files.length > 0) {
                formData.append("avatar", avatar.current.files[0]);
            }

            let res = await authApis().post(endpoints['updateProfile'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 201) {
                nav("/profile");
            }
        } catch (ex) {
            console.error(ex);
            setMsg("Cập nhật thất bại!");
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file)
            setPreviewAvatar(URL.createObjectURL(file));
    };

    if (!user) {
        return (
            <Container className="mt-5">
                <Alert variant="warning" className="text-center fs-5">
                    ❗ Vui lòng <strong>đăng nhập</strong> để sử dụng hệ thống!
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h1 className="text-center text-primary">Thông tin cá nhân</h1>
            {msg && <Alert variant="danger">{msg}</Alert>}

            <Form onSubmit={updateProfile}>
                {fields.map(f => (
                    <Form.Group className="mb-3" key={f.field} controlId={f.field}>
                        <Form.Label>{f.title}</Form.Label>
                        <Form.Control
                            type={f.type}
                            value={user2[f.field] || ""}
                            onChange={e => setUser2({ ...user2, [f.field]: e.target.value })}
                            required
                        />
                    </Form.Group>
                ))}

                <Form.Group className="mb-3">
                    <Form.Label>Ảnh đại diện</Form.Label>
                    <div className="mb-2">
                        <Image src={previewAvatar || "https://via.placeholder.com/150"} width={150} rounded />
                    </div>
                    <Form.Control type="file" ref={avatar} onChange={handleAvatarChange} />
                </Form.Group>

                {loading ? <MySpinner /> : (
                    <Button type="submit" variant="primary">Cập nhật</Button>
                )}
            </Form>
        </Container>
    );
};

export default Home;
