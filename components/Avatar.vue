<template>
  <div>
    <div class="user-avatar">
      <img v-if="src" :src="src" alt="Avatar">
      <div
        v-else
        class="avatar no-image"
      />
    </div>
    <label
      class="btn btn-full"
      for="single"
      :style="{ width: '10em', margin: '0 auto' }"
    >
      {{ uploading ? "Uploading..." : "Upload" }}
    </label>
    <input
      id="single"
      style="visibility: hidden; position: absolute"
      type="file"
      accept="image/*"
      capture="user"
      :disabled="uploading"
      @change="uploadAvatar"
    >
  </div>
</template>
<script>
export default {
  name: 'AvatarLoader',
  props: ['value'],
  data () {
    return {
      src: this.value,
      uploading: false
    }
  },
  watch: {
    value (val) {
      if (val) { this.downloadImage() }
    }
  },
  methods: {
    async downloadImage () {
      try {
        const { data, error } = await this.$supabase.storage
          .from('avatars')
          .download(this.value)
        if (error) { throw error }
        this.src = URL.createObjectURL(data)
      } catch (error) {
        console.error('Error downloading image: ', error.message)
      }
    },
    async uploadAvatar (evt) {
      const files = evt.target.files
      try {
        this.uploading = true
        if (!files?.length) {
          throw new Error('You must select an image to upload.')
        }

        const [file] = files
        const [, fileExt] = file.name.split('.')
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await this.$supabase.storage
          .from('avatars')
          .upload(filePath, file)

        if (uploadError) { throw uploadError }
        this.$emit('input', filePath)
        this.$emit('upload')
      } catch (error) {
        alert(error.message)
      } finally {
        this.uploading = false
      }
    }
  }
}
</script>
