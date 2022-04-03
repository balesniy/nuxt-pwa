<template>
  <section class="days">
    <ul class="days-list">
      <li
        v-for="([day, date], i) of formattedDays"
        :key="i"
        :ref="`day-${i}`"
        class="days-item"
        :class="{
          'active-day': i === value,
          'with-event': Math.random() < 0.5
        }"
        @click="$emit('input', i)"
      >
        <span class="day">{{ day }}</span>
        <span class="date">{{ date }}</span>
      </li>
    </ul>
  </section>
</template>
<script>
import { it } from 'date-fns/locale'
import { format, isSameDay } from 'date-fns'

export default {
  props: {
    days: Array,
    value: Number
  },
  computed: {
    formattedDays () {
      return this.days.map(date => format(date, 'EEE d', { locale: it }).split(/\s/))
    }
  },
  methods: {
    isEqual: isSameDay,
    scrollToIndex (i) {
      const [el] = this.$refs[`day-${i}`]
      el.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
}
</script>
