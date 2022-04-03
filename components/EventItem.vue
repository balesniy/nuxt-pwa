<template>
  <li class="event" :data-index="index">
    <time datetime="20:00">{{ formatInterval(event) }}</time>
    <div class="event-card">
      <h3 class="event-title">
        {{ event.title }}
      </h3>
      <p class="event-description">
        {{ event.description }}
      </p>
      <ul class="event-members">
        <li class="event-member">
          <img src="https://api.lorem.space/image/face?hash=11722" alt="member" class="event-avatar">
        </li>
        <li class="event-member">
          <img src="https://api.lorem.space/image/face?hash=10579" alt="member" class="event-avatar">
        </li>
        <li class="event-member">
          <img src="https://api.lorem.space/image/face?hash=20349" alt="member" class="event-avatar">
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
  mounted () {
    this.$el._observe = { init: false }
    this.observer.observe(this.$el)
  },
  methods: {
    formatInterval ({ start, end }) {
      return `${format(start, 'EEE d', { locale: it })} ${format(start, 'H:mm')} - ${format(end, 'H:mm')}`
    }
  }
}
</script>
