/* eslint-disable @next/next/no-img-element */
import React, { useState, MouseEvent } from "react";
import { NextPage } from "next";
import { AccessTokenProps } from "../types/AccessTokenProps";
import { executeRequest } from "../services/apiServices";
import { Modal } from "react-bootstrap";
import user from "../pages/api/user";

export const Login: NextPage<AccessTokenProps> = ({ setAccessToken }) => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //modal
  const [showModal, setShowModal] = useState(false);

  const doLogin = async (evento?: MouseEvent) => {
    if (evento) {
        evento.preventDefault();
    }
        
    try {
      setError("");
      if (!login || !password) {
        return setError("Favor Informar usuário e senha");
      }

      const body = { login, password };
      const result = await executeRequest("login", "POST", body);

      console.log("BATEU LOGIN");

      if (!result && !result.data) {
        return setError("Ocorreu um ao processar login.");
      }

      const { name, email, token } = result.data;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userName", name);
      localStorage.setItem("userMail", email);
      setAccessToken(token);
    } catch (e: any) {
      if (e?.response?.data?.error) {
        return setError(e?.response?.data?.error);
      } else {
        return setError("Ocorreu um ao processar login.");
      }
    }
  };

  const closeModal = async () => {
    setError("");
    setShowModal(false);
  };

  const doRegister = async (evento: MouseEvent) => {
    evento.preventDefault();

    try {
      // email validation goes here
      if (
        !name ||
        !name.trim() ||
        !login ||
        !login.trim() ||
        !password ||
        !password.trim()
      ) {
        setError("Verifique se todos os campos foram preenchidos");
        return;
      }

      const body = {
        name,
        email: login,
        password,
      };

      await executeRequest("user", "POST", body);

      alert("Usuário " + name + " cadastrado com sucesso! Aguarde enquanto efetuamos o seu primeiro login :)");
      doLogin(evento);


      closeModal();
    } catch (e: any) {
      console.log(e);
      if (e?.response?.data?.error) {
        setError(e?.response?.data?.error);
      } else {
        setError(
          "Ocorreu erro ao tentar realizar o cadastro, tente novamente."
        );
      }
    }
  };

  return (
    <>
      <div className="container-login">
        <img src="/icons/logo.svg" alt="Logo Fiap" className="logo" />
        <form>
          <p className="error">{error}</p>
          <div className="input">
            <img src="/icons/mail.svg" alt="Informe seu login" />
            <input
              type="text"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              placeholder="Login"
            />
          </div>
          <div className="input">
            <img src="/icons/lock.svg" alt="Informe sua senha" />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="forget-password">Esqueci a senha</div>
          <button onClick={doLogin}>Login</button>
          <button
            type="button"
            className="register-button"
            onClick={(e) => setShowModal(true)}
          >
            Registre-se
          </button>
        </form>
      </div>

      <Modal show={showModal} onHide={closeModal} className="container-modal">
        <Modal.Body>
          <p>Adicionar Tarefa</p>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="button col-12">
            <button onClick={doRegister}>Cadastrar</button>
            <span onClick={closeModal}>Cancelar</span>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
