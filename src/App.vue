<template>
  <div id="app">
   <div class="jumbotron">
      <div id="iconRow">
        <img src="./assets/music.png"/>
        <img src="./assets/tree.png"/>
        <img src="./assets/wine.png"/>
        <img src="./assets/burger.png"/>
      </div>
      <h1>Places2B</h1>
      <h2>Making your day</h2>
    </div>
    <router-view></router-view>
    <footer>
        <div className="VertCenterTop"></div>
        <div>&copy; 2017 - Zbay Industries</div>
        <div className="VertCenterBottom"></div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  color:white;
  font-family: Lemon;
}

input, button{
  color:black;
}

.jumbotron{
  background-color:white;
  border: 20px double #D80032;
  border-radius: 10px;
  color: black;
  font-family: Lemon;
}

.jumbotron h1, h2{
  text-shadow: 3px 3px orange;
}

body{
  background:
  linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
  linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
  linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
  linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
  linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
  linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424);
  background-color: #131313;
  background-size: 20px 20px;
}

a {
  color: orange;
}

#iconRow img{
  height: 50px;
  min-width: 50px;
  max-width: 100px;
}

footer{
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      align-self:center;
      background-color:white;
      color:black;
      border: 20px double #D80032;
      border-radius: 10px;
      font-size:200%;
      padding:30px;
      text-shadow: 3px 3px orange;
      margin-top:40px;
}
.VertCenterTop{
  align-self: flex-start;
}
.VertCenterBottom{
  align-self: flex-end;
}
</style>
