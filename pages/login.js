import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from 'next/link'

import { login } from "../redux/actions/auth";
import { clearMessage } from "../redux/actions/message";
import Layout from '../components/layout'

import style from '../styles/loginAndRegister.module.css';
import { setCookies } from 'cookies-next';

export async function getServerSideProps(ctx) {
  const { req, res } = ctx
  const response = await fetch("https://sikatboss-backend.herokuapp.com/customer/whoami", {     
    headers: {
      cookie: req.headers.cookie
    }
  });
  if(response.status != 401){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  else if(response.status == 401){
    return {
    props: { },
    };
  }  
}

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const router = useRouter()

  useEffect( () => {
    dispatch(clearMessage());
    return () => {
      dispatch(clearMessage());
    }
  }, [dispatch])

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(clearMessage());
    setLoading(true);
      dispatch(login(username, password))
        .then((token) => {
          setCookies('accessToken', token, {sameSite: "none", secure:true});
          router.push("/login");
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
  };
  
  return (
    <Layout>
      <div className="container">
          <div className={`row justify-content-center align-items-center ${style.container2}`}>
              <div className="col-12 col-md-6 col-sm-12">
                  <div className="card p-5">
                      <div className="card-body">
                          <h1 className="card-title text-center">Login</h1>
                          <form autoComplete="off" onSubmit={handleLogin}>
                              <div className="form-group pt-4 pb-3">
                                <label htmlFor="username" className="form-label">Email address</label>
                                <input
                                  id="username"
                                  type="text"
                                  className="form-control"
                                  name="username"
                                  value={username}
                                  onChange={onChangeUsername}
                                />
                              </div>
                              <div className="form-group pb-3">
                                  <label htmlFor="password" className="form-label">Password</label>
                                  <input
                                    id="password"
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                  />
                              </div>
                              {message && (
                                <div className="">
                                  <div className="alert alert-danger" role="alert">
                                    {message}
                                  </div>
                                </div>
                              )}
                              <div className="d-grid col-12 mx-auto">
                                <button className="btn btn-dark btn-lg btn-block" disabled={loading}>
                                  {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                  )}
                                  <span>Login</span>
                                </button>
                              </div>
                              
                              <p className="text-center mt-4">
                                Belum punya akun?
                                <Link href="/register"> 
                                  <button type="button" className="btn btn-link p-0" onClick={(e) => {dispatch(clearMessage())}}>
                                    Register
                                  </button> 
                                </Link>
                              </p>
                      
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </Layout>
  );
  
  
};
export default Login;