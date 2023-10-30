<template>
  <div id="container">
    <div id="contacts">
      <div id="contacts--contact">
        <p>{{ name }}</p>
        <p>{{ mail }}</p>
        <p>{{ phone }}</p>
      </div>
      <div id="contacts--social">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div id="mentions">
      <p>{{ mention }}</p>
    </div>
   </div>  
</template>

<script>
export default {
    data(){
    return{
      name: 'HustleFiti LLC',
      mail : 'cs@hustlefiti.com',
      phone : '+2547 18463900',
      mention : '2023 | HustleFiti LLC'
    }

}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

#container{
  padding-top:20px;
  margin-top:0px;
  width:100vw;
  color:white;
  background-color: #045b4c;
  display:flex;
  flex-direction:column;
  align-items:center;
}
#contacts{
  display:flex;
  justify-content:space-around;
  align-items:center;
  width:100%;
}
#contacts--contact{
  text-align:left;
}
#contacts--social{
  width:20%;
  display : flex;
  justify-content : space-between;
}
#contacts--social div{
  height:30px;
  width:30px;
  background-color:white;
  border-radius:50%;
}
#mentions p {
  font-size:0.8em;
}
</style>