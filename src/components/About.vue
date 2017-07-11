<template>
    <div>
        <h1>About Places2B</h1>
            <p>Places2B is a fun little app that recommends places for you to go. Are you a tourist in a strange area, a couple in need of date ideas,
            or anybody just looking for stuff to do? Places2B has your back.</p>
            <p>This site uses the Yelp API to find business and parks near you. We decide, with some input from you and from the luck of the draw, where you 
            might enjoy going.</p>
            <p>
                <router-link to="/">Give it a try!</router-link>
            </p>
    </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
    }
  }
}
</script>
