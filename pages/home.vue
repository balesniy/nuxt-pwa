<template>
  <div class="page">
    <header class="page-header">
      <div class="page-header__today">
        <p>Oggi</p>
        <p class="today">
          {{ today }}
        </p>
      </div>
      <div class="page-header__menu">
        <input id="nav-menu1" v-model="sidebarVisible" type="checkbox">
        <label id="nav-icon1" for="nav-menu1">
          <svg>
            <line x1="20%" y1="50%" x2="80%" y2="50%" />
            <line x1="20%" y1="50%" x2="80%" y2="50%" />
            <line x1="20%" y1="50%" x2="80%" y2="50%" />
          </svg>
        </label>
      </div>
      <nuxt-link class="user-link" to="/user">
        <img src="~assets/img/user-icon.svg" alt="user">
      </nuxt-link>
    </header>
    <main>
      <div class="drawer">
        <input id="my-drawer" v-model="sidebarVisible" type="checkbox" class="drawer-toggle">
        <div class="drawer-content home">
          <DaysList ref="days" v-model="selectedDay" :days="days" />
          <EventsList
            v-model="selectedDay"
            :events-by-days="events"
            @visible="handleEventsScroll"
            @click="handleEventClick"
          />
        </div>
        <div class="drawer-side">
          <label for="my-drawer" class="drawer-overlay" />
          <ul class="menu">
            <!-- Sidebar content here -->
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>
        </div>
      </div>
    </main>
    <footer class="page-footer">
      <button class="footer-toggle" type="button" />
    </footer>
  </div>
</template>
<script>
import AddToHomeScreen from 'a2hs.js'
import { format, eachDayOfInterval, add, isSunday, isWeekend, setHours, setMinutes, closestIndexTo } from 'date-fns'
import { it } from 'date-fns/locale'

export default {
  name: 'HomePage',
  auth: false, // FIXME dev only
  data () {
    return {
      sidebarVisible: false,
      days: eachDayOfInterval({
        start: new Date(),
        end: add(new Date(), { months: 1 })
      }),
      selectedDay: 0,
      loaded: false,
      loadedEvents: [],
      error: null
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

        if (!isWeekend(day)) {
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
  async created () {
    // get events
    const {
      data: events,
      error
    } = await this.$supabase
      .from('events')
      .select('*, profiles (username)')
    this.loadedEvents = events
    this.error = error
    this.loaded = true
    // subscribe
    this.evSubscription = this.$supabase
      .from('events_users')
      .on('*', ({ new: { event_id: evId, user_id: userId } }) => {
        console.log('Change received!', { evId, userId })
      })
      .subscribe()
  },
  mounted () {
    AddToHomeScreen({
      brandName: 'Circolo',
      htmlContent: 'Installa l\'app Circolo sul tuo dispositivo iOS: tocca <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50"><path d="M30.3 13.7 25 8.4l-5.3 5.3-1.4-1.4L25 5.6l6.7 6.7z"/><path d="M24 7h2v21h-2z"/><path d="M35 40H15c-1.7 0-3-1.3-3-3V19c0-1.7 1.3-3 3-3h7v2h-7c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V19c0-.6-.4-1-1-1h-7v-2h7c1.7 0 3 1.3 3 3v18c0 1.7-1.3 3-3 3z"/></svg> e <strong>Aggiungi alla schermata principale</strong>  ↓'
    })
  },
  beforeDestroy () {
    this.$supabase.removeSubscription(this.evSubscription)
  },
  methods: {
    handleEventsScroll (ev) {
      const index = closestIndexTo(ev.start, this.days)
      this.$refs.days.scrollToIndex(index)
    },
    handleEventClick (ev) {
      this.addUserToEvent(ev)
    },
    async addUserToEvent (ev) {
      const user = this.$supabase.auth.user()
      const { data: { id }, error: evError } = await this.$supabase
        .from('events')
        .insert([ev])
        .single()
      console.log({ evError })

      const { error: userError } = await this.$supabase
        .from('events_users')
        .insert([
          { event_id: id, user_id: user.id }
        ])
        .single()
      console.log({ userError })
    }
  }
}
</script>
