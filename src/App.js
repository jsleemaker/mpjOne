import React, {Component} from 'react';

/*global kakao*/
/*global map*/



class App extends Component {
  // Render: componentWillMount() -> render() -> componentDidMount()

  // Update: componentWillReceiveProps() -> shouldCompomentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
  // 컴포넌트가 새로운 props받았을때 -> 이전 props와 신규 props 비교 후 업데이트 할지 결정 -> 
  componentWillMount(){
    // 사이클의 시작
    // api등 원천 데이터 획득 작업 등
    console.log('will mount');

    
    this._getMapInfo();
  }
  
  componentDidMount(){
    // 컴포넌트들이 다 자리 잡음
    console.log('did mount');
    this._getMapView();

  }

  _getMapInfo(){
    const request = require('request');
    const headers = {
        'Authorization': 'KakaoAK 90c02250ba7baedbd7e0c3a29aa5d21c'
    };

    const options = {
        url: 'https://dapi.kakao.com/v2/local/search/keyword.json?query=세차',
        headers: headers
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
}

request(options, callback);

  }
   _getMovies = async() =>{
    const movies = await this._callApi();
    this.setState({
      movies
    })
  }

  _callApi = ()=>{
    return fetch('https://yts.lt/api/v2/list_movies.json?sort_by=download_count')
    .then(tomato => tomato.json())
    .then(json => json.data.movies)
    .catch(err=> console.log(err))
  }

  state = {
    greeting : 'Hello',
    // movies: []
    
  }
  _getMapView(){
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  }
  render(){
    // 컴포넌트가 리액트 세계에 존재
    console.log('did render');
    
    return (
      <div id="map"></div>
    )
  }
}

export default App;
