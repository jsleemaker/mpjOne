import React, {Component} from 'react';
import Place from './Place';
import './App.css';

/*global kakao*/
let x = 36.332223;
let y = 127.433706;

let markers = [];
let customOverlaies = [];



class App extends Component {
  // Render: componentWillMount() -> render() -> componentDidMount()

  // Update: componentWillReceiveProps() -> shouldCompomentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
  // 컴포넌트가 새로운 props받았을때 -> 이전 props와 신규 props 비교 후 업데이트 할지 결정 -> 
  componentWillMount(){
    // 사이클의 시작
    // api등 원천 데이터 획득 작업 등
    console.log('will mount');
    this._getCode();
    
  }
  
  componentDidMount= ()=>{
    // 컴포넌트들이 다 자리 잡음
    this._getLocation();
    // this._getMapView();
    console.log('did mount');
  }
  
  render(){
    // 컴포넌트가 리액트 세계에 존재
    console.log('did render');
    const {places} = this.state;
  
    return (
      <div>
        <div id="map"></div>
        <div>
          <a id="kakao-login-btn"></a>
          <a href="http://developers.kakao.com/logout"></a>
        </div>
        <div className={places ? "Place":"Place--loading"}>
          {places ? this._renderPlaces() : 'Loading'}
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


  _getMapView(){
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(x, y), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    
    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    kakao.maps.event.addListener(map, 'dragend', ()=>{
      
      // 지도의  레벨을 얻어옵니다
      const level = map.getLevel();
      
      // 지도의 중심좌표를 얻어옵니다 
      const latlng = map.getCenter(); 
      
      let message = '<p>지도 레벨은 ' + level + ' 이고</p>';
      message += '<p>중심 좌표는 위도 ' + latlng.getLat() + ', 경도 ' + latlng.getLng() + '입니다</p>';
      
      console.log(message);
      x = latlng.getLat();
      y = latlng.getLng();
      this._getMapInfo(map);
    });
    
    
    this._getMapInfo(map);
  }
  
  _getLocation = ()=> {
      if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.getCurrentPosition( (position)=> {
          console.log("GPS")
          x= position.coords.latitude;
          y= position.coords.longitude;
          
          console.log(position.coords.latitude + ' ' + position.coords.longitude);
          this._getMapView();
        },(error)=> {
          alert('접속기기의 GPS를 켜주세요!');
          console.error(error);
          this._getMapView();

        }, {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity
        });
      } else {
        alert('GPS를 지원하지 않습니다');
        this._getMapView();
      }


  }

  _getMapInfo = async(map)=>{
    const places = await this._callMapApi();
    this.setState({
      places
    })
    let positions =[];
    this.state.places.forEach((item)=>{
      positions.push({
        title:item.place_name,
        url:item.place_url,
        latlng: new kakao.maps.LatLng(item.y, item.x)
      })
    })
    this._makeMakers(map, positions);
  }

  _callMapApi= ()=>{
    const headers = {
        'Authorization': 'KakaoAK 90c02250ba7baedbd7e0c3a29aa5d21c'
    };


    const url= 'https://dapi.kakao.com/v2/local/search/keyword.json?query=세차&x='+y+'&y='+x+'&sort=distance&radius=20000';
    return fetch(url, {
      headers: headers
    })
    .then(potato => potato.json())
    .then(json =>json.documents)
    .catch(err=> console.log(err))
  }

  _makeMakers(map, positions){
    // 마커 이미지의 이미지 주소입니다
    const imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
    this._hideMarkers();
    for (var i = 0; i < positions.length; i ++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35); 
      
      // 마커 이미지를 생성합니다    
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
      
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
      });
      marker.setMap(map);
      markers.push(marker);
      
      // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      var content = '<div class="customoverlay">' +
    '  <a href="'+positions[i].url+'" target="_blank">' +
    '    <span class="title">'+positions[i].title+'</span>' +
    '  </a>' +
    '</div>';
    
      // 커스텀 오버레이를 생성합니다
      var customOverlay = new kakao.maps.CustomOverlay({
          map: map,
          position: positions[i].latlng,
          content: content,
          yAnchor: 3 
      });
      customOverlay.setMap(map);
      customOverlaies.push(customOverlay);
    }  
  }


  state = {
    // greeting : 'Hello',
    
  }

  // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
  _setMarkers(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }  
    for (var i = 0; i < customOverlaies.length; i++) {
      customOverlaies[i].setMap(map);
    }          
  }


  // "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
  _hideMarkers() {
    this._setMarkers(null);    
  }
  
  _renderPlaces = () =>{
    const places = this.state.places.map((place)=>{
      return <Place
      place_name={place.place_name}
      key={place.id}
      phone={place.phone}
      road_address={place.road_address_name}
      address={place.address_name}
      x={place.x}
      y={place.y}
      place_url={place.place_url} />
    })
    
    return places
  }

}

export default App;
