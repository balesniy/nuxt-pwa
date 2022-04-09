<template>
  <section class="days">
    <div class="calendar">
      <calendar v-bind="calendarParams" />
    </div>
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
import Calendar from 'v-calendar/lib/components/calendar.umd'

export default {
  components: {
    Calendar
  },
  props: {
    days: Array,
    value: Number
  },
  computed: {
    formattedDays () {
      return this.days.map(date => format(date, 'EEEEE d', { locale: it }).split(/\s/))
    },
    calendarParams () {
      return {
        locale: 'it',
        titlePosition: 'right',
        minDate: new Date(),
        maxDate: this.days.at(-1),
        // Attributes are supplied as an array
        attributes: [
          {
            key: 'today',
            highlight: {
              color: 'blue',
              fillMode: 'outline'
            },
            dates: new Date()
          },
          {
            dot: true,
            dates: this.days.filter(() => Math.random() < 0.3)
          },
          {
            dot: 'red',
            dates: this.days.filter(() => Math.random() < 0.2)
          }
        ]
      }
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
