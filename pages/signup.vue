<template>
  <div class="page">
    <main class="signup">
      <div class="hero">
        <h1>Register</h1>
        <p>and save your schedule neatly.</p>
      </div>
      <form @submit.prevent class="register-form">
        <div class="input-group">
          <div class="field">
            <input type="text" name="username" placeholder="Username">
          </div>
          <div class="field">
            <input type="password" name="password" placeholder="Password">
            <button class="password-toggle" type="button" />
          </div>
          <div class="field">
            <input type="password" name="confirm-password" placeholder="Confirm password">
            <button class="password-toggle" type="button" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-full">
          Register
        </button>
      </form>
      <p class="divider">
        or
      </p>
      <nuxt-link class="btn btn-full" to="/signin">Login</nuxt-link>
    </main>
    <footer class="page-footer">
      <button class="footer-toggle" type="button" />
    </footer>
  </div>
</template>
<script>
export default {
  name: 'SignupPage'
}
</script>
