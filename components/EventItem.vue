<template>
  <li v-touch:touchhold="touchHoldHandler" class="event" :class="`event--${evStatus}`" :data-index="index">
    <time datetime="20:00">{{ formatInterval(event) }}</time>
    <div class="event-card">
      <h3 class="event-title">
        {{ event.title }}
      </h3>
      <p class="event-description">
        {{ event.description }}
      </p>
      <ul class="event-members">
        <li v-for="({src}, i) of members" :key="i" class="event-member">
          <img :src="src" alt="member" class="event-avatar">
        </li>
        <li v-if="hiddenMembers" class="event-member placeholder">
          <span>+{{ hiddenMembers }}</span>
        </li>
      </ul>
    </div>
  </li>
</template>
<script>
import { it } from 'date-fns/locale'
import { format } from 'date-fns'

export default {
  props: {
    event: Object,
    index: Number,
    observer: {
      type: IntersectionObserver,
      default: () => ({
        observe: () => {}
      })
    }
  },
  computed: {
    members () {
      return this.event.members.slice(0, 7)
    },
    hiddenMembers () {
      return this.event.members.length - this.members.length
    },
    isMyEvent () {
      return this.event.members.some(({ name }) => name === 'My name')
    },
    evStatus () {
      const isSomebodyHaveKey = this.event.members.some(({ haveKey }) => haveKey)
      return this.event.members.length
        ? (
            isSomebodyHaveKey
              ? (this.isMyEvent ? 'info' : '')
              : (this.isMyEvent ? 'alert' : 'warning')
          )
        : 'empty'
    }
  },
  mounted () {
    this.$el._observe = { init: false }
    this.observer.observe(this.$el)
  },
  methods: {
    touchHoldHandler () {
      this.$emit('click')
    },
    formatInterval ({ start, end }) {
      return `${format(start, 'EEE d', { locale: it })} ${format(start, 'H:mm')} - ${format(end, 'H:mm')}`
    }
  }
}
</script>
