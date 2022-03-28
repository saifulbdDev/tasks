<template>
  <v-app class="pa-6">
    <Header />
    <Sidebar />
    <v-main class="content">
      <router-view />
       <Loader v-if="loader"/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Loader from "./PageLoader.vue";
import Header from "../Header/Header.vue";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import "./Layout.scss";
import { mapState } from "vuex";
export default {
  name: "Layout",
  components: { Footer, Header, Sidebar, Loader },
  computed:{
    ...mapState("user", ["loader"]),
 
  },
 
};
</script>

<style src="./Layout.scss" lang="scss" scoped />
