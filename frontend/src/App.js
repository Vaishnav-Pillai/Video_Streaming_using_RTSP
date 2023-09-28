import React, { useEffect, useState } from 'react';
import './App.css';
import RtspPlayer from './RtspPlayer';

function App() {

    const rtspUrl = 'rtsp://localhost:8554/';
    const uploadUrl = "http://127.0.0.1:5000/overlays/65158590a2cf87f7151961e4";

    let [title,setTitle] = useState('');
    let [currenttitle,setCurrenttitle] = useState('');

    // const retrieveUrl = `http://127.0.0.1:5000/overlays/${title}`;

    useEffect(() => {
      fetch('http://127.0.0.1:5000/overlays')
          .then((res) => res.json())
          .then((data) => {
              setCurrenttitle(data[0].title);
          });
    })

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(title);

      fetch(uploadUrl,{
        method: "PUT",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          title
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "User Updated");
          window.location.reload(true);
        });
    }

    return (
      <div>
        <nav className="navbar" style={{backgroundColor: '#000000', padding: '1rem 1rem', borderBottom:'2px ridge wheat'}}>
          <div className="container-fluid">
            <h3 className="navbar-brand" style={{color: 'wheat', fontSize:'3rem', letterSpacing: '1px', wordSpacing: '2px', fontFamily:'fantasy'}}>
              <img src='./camerapic.jpg' alt="Logo" width="95" height="55" className="d-inline-block align-text-top mx-2"/>
              {currenttitle}
            </h3>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" style={{marginRight:'1rem'}}>
              <i className="bi bi-gear-wide-connected" style={{fontSize: '4rem', color:'wheat'}}></i>
            </button>


            <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel" style={{fontFamily:'cursive', fontStyle:'italic', fontSize:'1.5rem', textDecoration:'underline', color: 'wheat'}}>Customize Text ?</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body" style={{marginLeft: '1rem'}}>
                <form>
                  <div style={{fontFamily: 'cursive', fontSize:'1.5rem'}}>New Text :</div>
                  <p></p>
                  <input type='text' style={{fontSize: '1rem', fontFamily:'fantasy', width: '20rem', padding: '0.5rem 1rem', border: '5px ridge wheat', borderRadius: '15px'}}  onChange={(e)=>{setTitle(e.target.value)}} required />
                  <p></p><br></br>
                  <button className='btn btn-outline-light' style={{fontSize: '20px', fontFamily: 'cursive', letterSpacing:'1px'}} onClick={handleSubmit}>CUSTOMIZE</button>
                </form>
              </div>
            </div>
          </div>
        </nav>

        <RtspPlayer rtspUrl={rtspUrl} />
      </div>
    );
  }

export default App;
