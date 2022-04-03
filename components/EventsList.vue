<template>
  <section class="events">
    <ul ref="events-list" class="events-list">
      <event-item
        v-for="(event, i) of events"
        :key="i"
        :ref="`event-${i}`"
        :event="event"
        :index="i"
        :observer="observer"
      />
      <li class="event event--alert">
        <time datetime="20:00">7AM - 8PM</time>
        <div class="event-card">
          <h3 class="event-title">
            Go to office
          </h3>
          <p class="event-description">
            meeting with client
          </p>
          <ul class="event-members">
            <li class="event-member">
              <img src="https://api.lorem.space/image/face?hash=11722" alt="member" class="event-avatar">
            </li>
            <li class="event-member">
              <img src="https://api.lorem.space/image/face?hash=75704" alt="member" class="event-avatar">
            </li>
            <li class="event-member">
              <img src="https://api.lorem.space/image/face?hash=32456" alt="member" class="event-avatar">
            </li>
          </ul>
        </div>
      </li>
      <li class="event event--info">
        <time datetime="20:00">7AM - 8PM</time>
        <div class="event-card">
          <h3 class="event-title">
            Go to office
          </h3>
          <p class="event-description">
            meeting with client
          </p>
          <ul class="event-members">
            <li class="event-member">
              <img src="https://api.lorem.space/image/face?hash=12867" alt="member" class="event-avatar">
            </li>
            <li class="event-member">
              <img src="https://api.lorem.space/image/face?hash=12546" alt="member" class="event-avatar">
            </li>
            <li class="event-member">
              <img src="https://api.lorem.space/image/face?hash=23197" alt="member" class="event-avatar">
            </li>
          </ul>
        </div>
      </li>
      <li class="event event--warning">
        <time datetime="20:00">7AM - 8PM</time>
        <div class="event-card">
          <h3 class="event-title">
            Go to office
          </h3>
          <p class="event-description">
            meeting with client
          </p>
          <ul class="event-members">
            <li class="event-member">
              <img src="https://api.lorem.space/image/face?hash=10678" alt="member" class="event-avatar">
            </li>
            <li class="event-member">
              <img src="https://api.lorem.space/image/face?hash=11722" alt="member" class="event-avatar">
            </li>
            <li class="event-member">
              <img src="https://api.lorem.space/image/face?hash=11555" alt="member" class="event-avatar">
            </li>
            <li class="event-member placeholder">
              <span>+14</span>
            </li>
          </ul>
        </div>
      </li>
      <li class="event event--skeleton">
        <time datetime="20:00">7AM - 8PM</time>
        <div class="event-card loading">
          <h3 class="event-title" />
          <p class="event-description" />
          <ul class="event-members">
            <li class="event-member" />
            <li class="event-member" />
          </ul>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
import { isEqual } from 'date-fns'
import debounce from 'lodash.debounce'

export default {
  props: {
    eventsByDays: Array,
    value: Number
  },
  computed: {
    events () {
      return this.eventsByDays.flatMap(({ events }) => events)
    }
  },
  watch: {
    async value (day) {
      const [firstEvent] = this.eventsByDays[day]?.events
      const i = this.events.findIndex(({ start }) => isEqual(start, firstEvent.start))
      const [firstEl] = this.$refs[`event-${i}`]
      await this.$nextTick()
      firstEl.$el.scrollIntoView({
        behavior: 'smooth'
      })
    }
  },
  created () {
    this.debouncedHandler = debounce(entries => this.onElementObserved(entries), 500)
    this.observer = new IntersectionObserver(
      this.debouncedHandler,
      {
        root: this.$refs['events-list'],
        rootMargin: '0px 0px -300px',
        threshold: 1.0
      }
    )
  },
  beforeDestroy () {
    this.debouncedHandler.cancel()
    this.observer.disconnect()
  },
  methods: {
    onElementObserved (entries) {
      entries.forEach(({ target, isIntersecting }) => {
        if (!target._observe.init) {
          target._observe.init = true
          return
        }
        if (!isIntersecting) {
          return
        }
        this.$emit('visible', this.events[target.dataset.index])
        // this.observer.unobserve(target)
      })
    }
  }

}
</script>
