<template>
  <div class="page">
    <main class="signin">
      <div class="hero">
        <h1>Login</h1>
        <p>e salva il tuo programma in modo ordinato.</p>
      </div>
      <form class="login-form" @submit.prevent="userLogin">
        <div class="input-group">
          <div class="field">
            <input v-model="login.email" type="email" required name="email" placeholder="Email">
          </div>
          <div class="field">
            <input v-model="login.password" type="password" name="password" placeholder="Password">
            <button class="password-toggle" type="button" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-full">
          Login
        </button>
      </form>
      <p class="divider">
        oppure
      </p>
      <button type="button" class="btn btn-full btn-google" @click="signInWithGoogle">
        Accedi con google
      </button>
      <nuxt-link class="btn btn-full" to="/signup">
        Registrati
      </nuxt-link>
    </main>
    <footer class="page-footer">
      <button class="footer-toggle" type="button" />
    </footer>
  </div>
</template>
<script>
export default {
  name: 'SigninPage',
  auth: 'guest',
  data () {
    return {
      login: {
        email: '',
        password: '' // If you provide email without a password, the user will be sent a magic link.
      }
    }
  },
  methods: {
    async signInWithGoogle () {
      await this.$supabase.auth.signIn({
        provider: 'google'
      }) // this.$auth.options.redirect.callback
    },
    async userLogin () {
      try {
        const response = await this.$auth.loginWith('supabase', { data: this.login })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
