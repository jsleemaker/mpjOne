import React, {Component} from 'react';
import './Menu.css';

/*global Kakao*/

class Menu extends Component {
    

      handleClick() {
        this._getLoginWindow();
      }
  // Render: componentWillMount() -> render() -> componentDidMount()

  // Update: componentWillReceiveProps() -> shouldCompomentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
  // 컴포넌트가 새로운 props받았을때 -> 이전 props와 신규 props 비교 후 업데이트 할지 결정 -> 
  componentWillMount(){
    // 사이클의 시작
    // api등 원천 데이터 획득 작업 등
    console.log('will mount');
    // this._getCode();
    
  }
  
  componentDidMount= ()=>{
    // 컴포넌트들이 다 자리 잡음
    // this._getMapView();
    console.log('did mount');
  }
  
  render(){
    // 컴포넌트가 리액트 세계에 존재
    console.log('did render');
  
    return (
      <div>
        <div id="menu">
            <img onClick={this.handleClick.bind(this)} id="custom-login-btn" src="//mud-kage.kakao.com/14/dn/btqbjxsO6vP/KPiGpdnsubSq3a0PHEGUK1/o.jpg" width="300"/>
        </div>
      </div>
    );
  }

  _getCode(){
    const headers = {
      'Authorization': 'KakaoAK 90c02250ba7baedbd7e0c3a29aa5d21c'
  };


  const url= 'https://kauth.kakao.com/oauth/token/oauth/authorize?client_id=90c02250ba7baedbd7e0c3a29aa5d21c&redirect_uri=http://localhost:3000/oauth&response_type=code';
  return fetch(url)
  .then(potato => console.log(potato))
  .catch(err=> console.log(err))
  }

  state = {
    // greeting : 'Hello',
    
  }



  _getLoginWindow(){
    // 사용할 앱의 JavaScript 키를 설정해 주세요.
    Kakao.init('90c02250ba7baedbd7e0c3a29aa5d21c');
    
    console.log('aaaaaaaaaaaa')
    // window.getElementById('custom-login-btn').on('click', ()=> {        
        // 로그인 창을 띄웁니다.
        Kakao.Auth.login({
        success: function(authObj) {
            alert(JSON.stringify(authObj));
        },
        fail: function(err) {
            alert(JSON.stringify(err));
        }
        });
    // });

}
  
  _renderPlaces = () =>{
   
    
    return ''
  }

}

export default Menu;
