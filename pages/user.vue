<template>
  <div class="page">
    <main class="user">
      <div class="hero">
        <div class="user-avatar">
          <img src="https://api.lorem.space/image/face?hash=8877" alt="Tailwind-CSS-Avatar-component">
        </div>
        <h1>Modifica Profilo</h1>
        <p>e salva il tuo programma in modo ordinato.</p>
      </div>
      <form @submit.prevent class="user-form">
        <div class="input-group">
          <div class="field">
            <input type="text" name="username" placeholder="Your name" value="Mateo">
          </div>
          <div class="field">
            <input type="tel" name="phone" placeholder="Phone number" value="347-426-32-96">
          </div>
          <div class="field">
            <input type="email" name="email" placeholder="Email" value="mateo@circolo.it">
          </div>
          <label class="form-control field">
            <span class="label-text">Io posso aprire il circolo</span>
            <input type="checkbox" class="toggle">
          </label>
        </div>
        <button type="submit" class="btn btn-primary btn-full">
          Update
        </button>
      </form>
      <p class="divider">
        oppure
      </p>
      <button class="btn btn-full" @click="$auth.logout()">Logout</button>
    </main>
    <footer class="page-footer">
      <button class="footer-toggle" type="button" />
    </footer>
  </div>
</template>
<script>
export default {
  name: 'UserPage'
}
</script>
