<template>
  <div class="page">
    <main class="signin">
      <div class="hero">
        <h1>Login</h1>
        <p>and save your schedule neatly.</p>
      </div>
      <form @submit.prevent class="login-form">
        <div class="input-group">
          <div class="field">
            <input type="text" name="username" placeholder="Username">
          </div>
          <div class="field">
            <input type="password" name="password" placeholder="Password">
            <button class="password-toggle" type="button" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-full">
          Login
        </button>
      </form>
      <p class="divider">
        or
      </p>
      <button type="button" class="btn btn-full btn-google">
        Sign in with google
      </button>
      <nuxt-link class="btn btn-full" to="/signup">Register</nuxt-link>
    </main>
    <footer class="page-footer">
      <button class="footer-toggle" type="button" />
    </footer>
  </div>
</template>
<script>
export default {
  name: 'SigninPage'
}
</script>
