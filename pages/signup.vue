<template>
  <div class="page">
    <main class="signup">
      <div class="hero">
        <h1>Registrati</h1>
        <p>e salva il tuo programma in modo ordinato.</p>
      </div>
      <form class="register-form" @submit.prevent="signUp">
        <div class="input-group">
          <div class="field">
            <input v-model="login.username" type="text" name="username" placeholder="Username">
          </div>
          <div class="field">
            <input v-model="login.email" type="email" name="email" placeholder="Email">
          </div>
          <div class="field">
            <input v-model="login.password" type="password" name="password" placeholder="Password">
            <button class="password-toggle" type="button" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-full">
          Registrati
        </button>
      </form>
      <p class="divider">
        oppure
      </p>
      <nuxt-link class="btn btn-full" to="/signin">
        Login
      </nuxt-link>
    </main>
    <footer class="page-footer">
      <button class="footer-toggle" type="button" />
    </footer>
  </div>
</template>
<script>
export default {
  name: 'SignupPage',
  auth: 'guest',
  data () {
    return {
      login: {
        username: '',
        email: '',
        password: '',
        error: null
      }
    }
  },
  methods: {
    async signUp () {
      // If "Email Confirmations" is turned on, a user is returned but session will be null
      // When the user confirms their email address, they will be redirected to localhost:3000 by default.
      // To change this, you can go to Authentication -> Settings
      const { user, session, error } = await this.$supabase.auth.signUp({
        email: this.login.email,
        password: this.login.password
      },
      {
        data: {
          username: this.login.username
        }
      })
      // To check if a user already exists, refer to getUser() ??
      console.log({ user, session, error })
      // we are listening to the onAuthStateChange listener in order to update the user value according to the received event
      // this.$auth.setUser(user)
    }
  }
}
</script>
