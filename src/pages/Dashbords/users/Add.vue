<template>
  <v-form ref="form" v-model="valid" lazy-validation class="mt-5">
    <h4>Add New User</h4>
    <v-row>
      <v-col md="6" cols="12">
        <v-card class="pa-2">
          <v-text-field
            v-model="user.name"
            :error-messages="errors.name"
            height="40"
            label="User name"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.job"
            :error-messages="errors.job"
            label="Job Title"
            required
          ></v-text-field>
        </v-card>
      </v-col>
    </v-row>

    <v-btn
      color="primary"
      class="mr-4 mt-4"
      @click="save"
      :loading="loading"
      :disabled="loading"
      >Submit</v-btn
    >
  </v-form>

  <!-- </v-card> -->
</template>
<script>
export default {
  data: () => ({
    errors: [],
    valid: true,
    loading: false,

    user: {
      name: "",
      job: "",
    },
  }),

  computed: {},
  methods: {
    save() {
      this.$store
        .dispatch("user/Created", this.user)
        .then(() => {
          this.$swal.fire(
            "Sacessfuly Created User",
            "",
            "success"
          );
          this.loading = false;
          this.$router.push("/dashboard/user-list");
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
          console.log(err.response.data.errors);
          this.loading = false;
        });
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
