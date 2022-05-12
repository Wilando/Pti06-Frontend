import { useSelector } from 'react-redux'
import Link from 'next/link'
import { whoami } from '../redux/actions/auth'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Layout from '../components/layout'

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

const afterRegister = ({data}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(whoami(data));
  }, [dispatch])
  return (

    <>
    <style jsx>{`
      .thankyou-page ._header {
          background: #C4C4C4;
          padding: 100px 30px;
          text-align: center;
      }
      .thankyou-page ._header .logo {
          max-width: 200px;
          margin: 0 auto 50px;
      }
      .thankyou-page ._header .logo img {
          width: 100%;
      }
      .thankyou-page ._header h1 {
          font-size: 65px;
          font-weight: 800;
          color: black;
          margin: 0;
      }
      .thankyou-page ._body {
          margin: -70px 0 30px;
      }
      .thankyou-page ._body ._box {
          margin: auto;
          max-width: 80%;
          padding: 50px;
          background: white;
          border-radius: 3px;
          box-shadow: 0 0 35px rgba(10, 10, 10,0.12);
          -moz-box-shadow: 0 0 35px rgba(10, 10, 10,0.12);
          -webkit-box-shadow: 0 0 35px rgba(10, 10, 10,0.12);
      }
      .thankyou-page ._body ._box h2 {
          font-size: 32px;
          font-weight: 600;
          color: black;
      }
      .thankyou-page ._footer {
          text-align: center;
          padding: 50px 30px;
      }

      .thankyou-page ._footer .btn {
          background: black;
          color: white;
          border: 0;
          font-size: 14px;
          font-weight: 600;
          border-radius: 0;
          letter-spacing: 0.8px;
          padding: 20px 33px;
          text-transform: uppercase;
      }
    `}</style>
      <Layout>
        <div className="thankyou-page">
            <div className="_header">
                <div className="logo">
                    <img src="/images/sikatbossIcon.jpg" alt=""/>
                </div>
                <h1>Terima Kasih Telah Mendaftar!</h1>
            </div>
            <div className="_body">
                <div className="_box">
                    <h2>
                        <strong>Tolong cek Email Anda</strong> untuk dapat mengaktifkan akun silahkan cek email anda untuk melakukan verifikasi.
                    </h2>
                    <p>
                        Dengan memiliki akun anda dapat menggunakan layanan dari kami berupa pemesanan dan pembayaran secara Online.
                    </p>
                </div>
            </div>
            <div className="_footer">
                <p>Sudah melakukan verifikasi?</p>
                <Link href="/login">
                  <a className="btn">Login</a>
                </Link>
            </div>
        </div>
      </Layout>
    </>
  )
}

export default afterRegister