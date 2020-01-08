<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <h1 @click="$store.commit('increase')">{{$store.state.count}}</h1>
        <h1 @click="$store.dispatch('increase')">{{$store.state.count}}</h1>
        <h1>{{$store.getters.double}}</h1>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "home",
    components: {
        HelloWorld
    },
    created() {
        console.log("created" + this.$store.getters.double);
    }
};
</script>
