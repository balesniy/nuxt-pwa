<template>
  <div class="page">
    <main class="user">
      <div class="hero">
        <Avatar v-model="avatar_url" @upload="updateProfile" />
        <h1>Modifica Profilo</h1>
        <p>e salva il tuo programma in modo ordinato.</p>
      </div>
      <form class="user-form" @submit.prevent="updateProfile">
        <div class="input-group">
          <div class="field">
            <input v-model="username" type="text" name="username" placeholder="Your name">
          </div>
          <div class="field">
            <input v-model="phone" type="tel" name="phone" placeholder="Phone number">
          </div>
          <div class="field">
            <input v-model="email" type="email" name="email" placeholder="Email">
          </div>
          <label class="form-control field">
            <span class="label-text">Io posso aprire il circolo</span>
            <input v-model="haveKey" type="checkbox" class="toggle">
          </label>
        </div>
        <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
          Update
        </button>
      </form>
      <p class="divider">
        oppure
      </p>
      <button class="btn btn-full" @click="$auth.logout()">
        Logout
      </button>
    </main>
    <footer class="page-footer">
      <button class="footer-toggle" type="button" />
    </footer>
  </div>
</template>
<script>
export default {
  name: 'UserPage',
  data () {
    return {
      username: this.$auth.user?.identities[0].identity_data.name || '',
      email: this.$auth.user?.identities[0].identity_data.email || '',
      phone: '',
      haveKey: false,
      avatar_url: this.$auth.user?.identities[0].identity_data.avatar_url || '',
      loading: false
    }
  },
  computed: {
    user () {
      return this.$auth.user?.identities[0].identity_data
    }
  },
  mounted () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      try {
        this.loading = true
        const user = this.$supabase.auth.user()

        const { data, error, status } = await this.$supabase
          .from('profiles')
          .select('username, email, haveKey, avatar_url')
          .eq('id', user.id)
          .single()

        if (error && status !== 406) { throw error }

        if (data) {
          this.username = data.username
          this.email = data.email
          this.avatar_url = data.avatar_url
          this.haveKey = data.haveKey
        }
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false
      }
    },
    async updateProfile () {
      try {
        this.loading = true
        const user = this.$supabase.auth.user()

        const updates = {
          id: user.id,
          username: this.username,
          email: this.email,
          avatar_url: this.avatar_url,
          haveKey: this.haveKey,
          updated_at: new Date()
        }

        const { error } = await this.$supabase.from('profiles').upsert(updates, {
          returning: 'minimal' // Don't return the value after inserting
        })

        if (error) { throw error }
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
