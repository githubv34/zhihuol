<template>
    <div id="app">
        <!-- 根路径 -->
        <router-link to="/"></router-link>
        <keep-alive include="Home">
        <router-view ></router-view>
        </keep-alive>
    </div>
</template>

<style lang="scss"></style>
