<template>
  <main class="splash loading" />
</template>
<script>
export default {
  name: 'IndexPage',
  auth: 'guest',
  async mounted () {
    const session = await this.$supabase.auth.getSessionFromUrl({ storeSession: true })
    if (session.data) {
      this.$auth.setUser(session.data.user)
      this.$auth.redirect('home', true)
    } else {
      this.$auth.redirect('login', true)
    }
  }
}
</script>
