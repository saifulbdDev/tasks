<template>
  <v-card class="mx-auto" max-width="600" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
             {{ user.first_name }} {{ user.last_name }}
       
        </v-list-item-title>
        <v-list-item-subtitle>
               {{ user.email }}
         </v-list-item-subtitle
        >
      </v-list-item-content>

      <v-list-item-avatar tile size="80">
        <img :src="user.avatar" :alt="user.first_name" />
       </v-list-item-avatar
      >
    </v-list-item>

    <v-card-actions>
      <v-btn outlined rounded color="priamry"  :to="'/dashboard/user-update/' + user.id"> Upadte User </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("user", ["user"]),
  },
  created() {
    this.singleUser();
  },

  methods: {
    singleUser() {
      this.$store.dispatch("user/Show", this.$route.params.id);
    },
  },
};
</script>
