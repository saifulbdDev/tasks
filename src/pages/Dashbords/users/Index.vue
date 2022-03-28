<template>
  <v-container fluid>
    <div class="tables-basic">
      <v-card class="mb-1 mt-3">
        <v-data-table :headers="headers" :items="users" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>User List</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer>
                <v-col md="6" class="mx-auto" v-if="message == 'Deleted successfully'">
                  <v-alert type="success">{{message}}</v-alert>
                </v-col>
              </v-spacer>
              <v-btn color="primary" dark class="mb-2" to="/dashboard/user-create">Create User</v-btn>
            </v-toolbar>
          </template>
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.id">
              

                <td>
                  <img
                    class="mr-2"
                    width="60"
                    :src="item.avatar"
                    :alt="item.first_name" 
                 
                  />
                </td>
                   <td>{{ item.first_name  }}  {{ item.last_name  }} </td>
                <td>{{ item.email }}</td>
               

                <td>
                  <v-btn
                    color="primary"
                    small
                    class="mr-2"
                    link
                    :to="'/dashboard/user-update/' + item.id"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    color="primary"
                    small
                    class="mr-2"
                    link
                    :to="'/dashboard/user-details/' + item.id"
                  >
                    <v-icon small>mdi-eye</v-icon>
                  </v-btn>
                  <v-btn color="error" small class="mr-2" @click="removeUser(item.id)">
                    <v-icon small>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="Data">Reset</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Tables",
  data() {
    return {
      message: {},
      headers: [
        {
          text: "Avatar",
          align: "start",
          sortable: false,
          value: "avatar",
        },
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Email", value: "email" },
      

        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState("user", ["users"]),
  },

  created() {
    this.Data();
  },

  methods: {
    ...mapActions("user", ["Data"]),

    removeUser(id) {
      if (confirm("Are you sure?")) {
        this.$store
          .dispatch("user/Delete", id)
          .then(() => {
            this.$swal.fire(
            "Sacessfuly Delete User",
            "",
            "success"
          );
            this.Data();
          })
          .catch(() => {});
      }
    },
  },
};
</script>
