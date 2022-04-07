<template>
  <ul>
    <li>
      <NuxtLink to="/splash-screen">splash</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/signin">signin</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/signup">signup</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/user">user</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/home">home</NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'IndexPage',
  auth: false,
  async mounted () {
    const session = await this.$supabase.auth.getSessionFromUrl({ storeSession: true })
    if (session.data) {
      this.$auth.setUser(session.data.user)
      this.$auth.redirect('home', true)
    }
  }
}
</script>
