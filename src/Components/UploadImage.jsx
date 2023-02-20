import React from 'react'
import styled from 'styled-components'

export default function UploadImage({onChange, src}) {
  return (
    <Div>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img for="photo-upload" src={src} />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
  </Div>
  )
}

const Div = styled.div`
input[type="file"] {
    display: none;
  }
  
  .custom-file-upload {
    border-radius: 50%;
    display: inline-block;
    position: relative;
    padding: 6px;
    cursor: pointer;
    background: #615dfa;
    margin-bottom: 25px;
  }
  
  .img-wrap{
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 50%;
  }
  .img-upload:before{
    content: "\f093";
    font-size: 90px;
    position: absolute;
    padding-top: 80px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #615dfa;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    opacity: 0;
    transition: .5s ease;
    background-color: #fff;
  }
  .img-upload:hover:before{
   opacity: 1;
  }
  img {
    width: auto;
    height: 100%;
  }
  
  label{
    text-transform: uppercase;
    font-weight: 700;
    color: #676767;
  }
  
  input{
    border-radius: 15px;
    border: 1px solid #b7b7b7;
    padding: 5px 5px 5px 10px;
    font-size: 18px;
    transition: 0.2s;
  }
  input:focus{
    outline: none;
    border: 1px solid #64d488;
  }

  @media screen and (max-width: 48rem) {
    .img-wrap{
        width: 150px;
        height: 150px;
    }
  }
`;
