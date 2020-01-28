<template>
  <div class="container">
    <h2 class="title is-size-3 has-text-centered">Welcome to your dashboard</h2>
    <div class="columns" v-if="message">
      <div class="column is-one-quarter is-offset-8">
        <div class="notification is-success">
          {{ message }}
        </div>
      </div>
    </div>
    <div class="columns is-multiline has-text-centered">
      <div
        v-for="user in users"
        :user="user"
        :key="user.id"
        class="column is-one-quarter"
      >
        <img
          :src="user.picture"
          :alt="user.name"
          style="width:200px;margin-left:auto;margin-right:auto;"
        />
        <h3 class="is-size-6">Name: {{ user.name }}</h3>
        <h3 class="is-size-6">Email: {{ user.email }}</h3>
        <h3 class="is-size-6">Last login: {{ user.last_login }}</h3>
        <h3 class="is-size-6">Login count: {{ user.logins_count }}</h3>
        <button
          @click="deleteUser(user.user_id)"
          class="button is-medium is-danger"
        >
          Delete me 😵
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import UserService from "@/services/UserService.js";
export default {
  name: "Dashboard",
  data() {
    return {
      users: [],
      message: ""
    };
  },
  created() {
    this.getUserData(); // call getEventData() when the instance is created
  },
  methods: {
    async getUserData() {
      // Get the access token from the auth wrapper
      const accessToken = await this.$auth.getTokenSilently();
      // Pass the access token to the getUsers service
      UserService.getUsers(accessToken).then(
        (users => {
          this.$set(this, "users", users);
        }).bind(this)
      );
    },
    async deleteUser(deleteId) {
      // Get the access token from the auth wrapper
      const accessToken = await this.$auth.getTokenSilently();
      // Pass the access token to the getUsers service
      UserService.deleteUser(accessToken, deleteId).then(response => {
        this.message = response;
        this.getUserData(); // get refreshed users
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.notification {
  position: fixed;
  top: 800px;
  right: 40px;
}
.button {
  margin-top: 15px;
}
</style>
