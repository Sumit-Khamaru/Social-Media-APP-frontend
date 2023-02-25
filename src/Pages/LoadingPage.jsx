import React from 'react'
import styled from 'styled-components'

export default function LoadingPage() {
    return (
        <Div>
            <main>
                <section class="loaderWrapper">
                    <div class="loader"><span></span><span></span><span></span></div>
                </section>
            </main>
        </Div>
    )
}


const Div = styled.div`
main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background: #121212;
    color: #cacaca;
}

main. loaderWrapper  {
    position: fixed;
    background-image: -webkit-gradient(linear, left top, right top, color-stop(0, #151515), to(#000));
    background-image: linear-gradient(90deg, #151515 0, #000);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}

main .loaderWrapper .loader {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    perspective: 800px;
}

.main .loaderWrapper .loader span {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
main .loaderWrapper .loader span:nth-child(1) {
    border-bottom: 6px double #00FFFF;
    transform: rotateX(35deg) rotateY(-45deg);
    animation: rotateOne 0.8s linear infinite;
}
  main .loaderWrapper .loader span:nth-child(2) {
    border-right: 6px double #89CFF0;
    transform: rotateX(50deg) rotateY(10deg);
    animation: rotateTwo 0.8s linear infinite;
}
  main .loaderWrapper .loader span:nth-child(3) {
    border-top: 6px double #088F8F;
    transform: rotateX(35deg) rotateY(55deg);
    animation: rotateThree 0.8s linear infinite;
}

@keyframes rotateOne {
    to {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
}
  @-webkit-keyframes rotateOne {
    to {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
}
  @keyframes rotateTwo {
    to {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
}
  @-webkit-keyframes rotateTwo {
    to {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
}
  @keyframes rotateThree {
    to {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
}
  @-webkit-keyframes rotateThree {
    to {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
}
`;