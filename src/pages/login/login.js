import React, { Component, useState } from "react";
import { useHistory } from 'react-router-dom';
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
//import CheckButton from "react-validation/build/button";

//import AuthService from "../services/auth.service";
import api from '../services/api';
import {
    Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input
} from 'reactstrap';


import './stylelogin.css'

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        // this.setState({
        //   message: "",
        //   loading: true
        // });

        //this.form.validateAll();
        const data = { nome_usuario: username, senha_usuario: password };

        //debugger
        await api.post('/login', data).then(
            response => {

                if (response.status == 401) {

                    UserErrado()
                } else {
                    localStorage.setItem('app-token', response.data.token)
                    localStorage.setItem('app-user', response.data.user.nome_usuario)
                    history.push('/');
                }
            }

        ).catch((error) => {

            UserErrado()

        })


        function UserErrado() {

            setUsername('');
            setPassword('');
            alert('Usuario/Senha errada');


        }

        // resp => {
        //     const { re } = resp;
        //     alert(resp.data);
        //     if (re){
        //         localStorage.setItem('app-token', re)
        //     }
        // }




        // if (this.checkBtn.context._errors.length === 0) {
        //   //AuthService.login(this.state.username, this.state.password).then(
        //     () => {
        //       this.props.history.push("/profile");
        //       window.location.reload();
        //     },
        //     error => {
        //       const resMessage =
        //         (error.response &&
        //           error.response.data &&
        //           error.response.data.message) ||
        //         error.message ||
        //         error.toString();

        //       this.setState({
        //         loading: false,
        //         message: resMessage
        //       });
        //     }
        //   );
        // } else {
        //   this.setState({
        //     loading: false
        //   });
        // }
    }


    return (
        <Container className="content">
        <div className="login">
            <div className="card card-container" style={{'padding': '10px'}}>
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form
                    onSubmit={handleLogin}

                >
                    <div className="form-group">
                        <label htmlFor="username">Usuário</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        //validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        //validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit"
                            className="btn btn-primary btn-block"
                        //disabled={this.state.loading}
                        >

                            <span>Login</span>
                        </button>
                    </div>



                </Form>
            </div>
        </div>
        </Container>
    );
}
