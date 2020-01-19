<template>
    <div class="about">
        <h1>This is an about page</h1>
        <p @click="$store.commit('add',1)">{{$store.state.count}}</p>
    </div>
</template>
<script>
export default {
    initData({ store }) {
        return store.dispatch("add");
    }
};
</script>
