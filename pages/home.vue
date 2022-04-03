<template>
  <div class="page">
    <header class="page-header">
      <div>
        <p>Today</p>
        <p class="today">
          {{ today }}
        </p>
      </div>
      <nuxt-link class="user-link" to="/user">
        <img src="~assets/img/user-icon.svg" alt="user">
      </nuxt-link>
      <!-- <input type="checkbox" id="nav-menu1">
      <label id="nav-icon1" for="nav-menu1">
        <svg>
          <line x1="20%" y1="50%" x2="80%" y2="50%"/>
           <line x1="20%" y1="50%" x2="80%" y2="50%"/>
           <line x1="20%" y1="50%" x2="80%" y2="50%"/>
        </svg>
      </label> -->
    </header>
    <main class="home">
      <DaysList ref="days" v-model="selectedDay" :days="days" />
      <EventsList v-model="selectedDay" :events-by-days="events" @visible="handleEventsScroll" />
    </main>
    <footer class="page-footer">
      <button class="footer-toggle" type="button" />
    </footer>
  </div>
</template>
<script>
import { format, eachDayOfInterval, add, isSunday, isWeekend, setHours, setMinutes, closestIndexTo } from 'date-fns'
import { it } from 'date-fns/locale'

export default {
  name: 'HomePage',
  data () {
    return {
      days: eachDayOfInterval({
        start: new Date(),
        end: add(new Date(), { months: 1 })
      }),
      selectedDay: 0
    }
  },
  computed: {
    today () {
      return format(new Date(), 'EEEE, d MMMM', { locale: it })
    },
    events () {
      return this.days.map((day) => {
        const slots = []
        if (isSunday(day)) {
          slots.push({
            title: 'Colazione italiano',
            description: 'Caffe, pasta, schiacciata.',
            start: setHours(day, 9),
            end: setHours(day, 12)
          })
        }

        if (!isWeekend) {
          slots.push({
            title: 'Aperto come al solito',
            description: 'Bevande e cocktail nazionali e importati.',
            start: setHours(day, 15),
            end: setHours(day, 20)
          })
        } else {
          slots.push({
            title: 'Apericena',
            description: 'Apriremo se c`è chi è interessato.',
            start: setHours(day, 17),
            end: setHours(day, 20)
          })
        }

        slots.push({
          title: 'Serata in compagnia',
          description: 'Bevande forti dopo cena.',
          start: setMinutes(setHours(day, 21), 30),
          end: setHours(day, 24)
        })

        return {
          events: slots,
          date: day
        }
      })
    }
  },
  methods: {
    handleEventsScroll (ev) {
      const index = closestIndexTo(ev.start, this.days)
      this.$refs.days.scrollToIndex(index)
    }
  }
}
</script>
