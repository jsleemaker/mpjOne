import React, {Component} from 'react';
import Place from './Place';

/*global kakao*/
/*global map*/
let x = 37.580517;
let y = 126.887714;

// let markers = [];



class App extends Component {
  // Render: componentWillMount() -> render() -> componentDidMount()

  // Update: componentWillReceiveProps() -> shouldCompomentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
  // 컴포넌트가 새로운 props받았을때 -> 이전 props와 신규 props 비교 후 업데이트 할지 결정 -> 
  componentWillMount(){
    // 사이클의 시작
    // api등 원천 데이터 획득 작업 등
    console.log('will mount');

    

  }
  
  componentDidMount(){
    // 컴포넌트들이 다 자리 잡음
    console.log('did mount');
    this._getMapInfo();
    this._getMapView();

    
  }
  _getMapInfo = async()=>{
    const places = await this._callMapApi();
    this.setState({
      places
    })
    let positions =[];
    this.state.places.forEach((item,index)=>{
      // console.log(item);
      positions.push({
        title:item.place_name,
        latlng: new kakao.maps.LatLng(item.x, item.y)
      })
    })
    console.log(positions)
    this._makeMakers(positions);
    
     
    
  }

  
  _makeMakers(positions){
  //   console.log(positions);
  // var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
  // mapOption = { 
  //     center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
  //     level: 3 // 지도의 확대 레벨
  // };

  // var map = new kakao.maps.Map(mapContainer,mapOption); // 지도를 생성합니다
// // 마커를 표시할 위치와 title 객체 배열입니다 
//   var positions = [
//     {
//         title: '카카오', 
//         latlng: new kakao.maps.LatLng(37.5557996323443,126.970416345049)
//     },
//     {
//         title: '생태연못', 
//         latlng: new kakao.maps.LatLng(33.450936, 126.569477)
//     },
//     {
//         title: '텃밭', 
//         latlng: new kakao.maps.LatLng(33.450879, 126.569940)
//     },
//     {
//         title: '근린공원',
//         latlng: new kakao.maps.LatLng(33.451393, 126.570738)
//     }
//   ];
  console.log(positions)
    // 마커 이미지의 이미지 주소입니다
    const imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
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
    }  
  }
  _callMapApi= ()=>{
    const sort = 'distance';
    const headers = {
        'Authorization': 'KakaoAK 90c02250ba7baedbd7e0c3a29aa5d21c'
    };


    const url= 'https://dapi.kakao.com/v2/local/search/keyword.json?query=세차&x='+x+'&y='+y+'&sort='+sort;
    return fetch(url, {
      headers: headers
    })
    .then(potato => potato.json())
    .then(json =>json.documents)
    .catch(err=> console.log(err))
  }

  state = {
    greeting : 'Hello',
    // movies: []
    
  }
  _getMapView(){
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(x, y), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    kakao.maps.event.addListener(map, 'center_changed', function() {

      // 지도의  레벨을 얻어옵니다
      // var level = map.getLevel();
  
      // 지도의 중심좌표를 얻어옵니다 
      var latlng = map.getCenter(); 
  
      // var message = '<p>지도 레벨은 ' + level + ' 이고</p>';
      // message += '<p>중심 좌표는 위도 ' + latlng.getLat() + ', 경도 ' + latlng.getLng() + '입니다</p>';
  
      // console.log(message);
      x = latlng.getLat();
      y = latlng.getLng();
  
      // this._getMapInfo();
    });
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

    console.log('check')
    return places
  }

  render(){
    // 컴포넌트가 리액트 세계에 존재
    console.log('did render');
    const {places} = this.state;
    return (
      <div>
        <div id="map"></div>
        <div className={places ? "Place":"Place--loading"}>
          {places ? this._renderPlaces() : 'Loading'}
        </div>
      </div>
    );
  }






}

export default App;
