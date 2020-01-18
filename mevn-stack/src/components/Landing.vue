<template>

<div>

  <v-card class='mt-lg-12 mt-sm-6 mx-auto'
          max-width="500">

      <v-card-text
        v-for="(data, i) in timeline"
        :key="i"
        :color="data.color"
        small
      >
        <template v-slot:opposite>
          <span
            :class="`headline font-weight-bold ${data.color}--text`"
            v-text="data.year"
          ></span>
        </template>
        <div class="py-4">
          <h2 :class="`headline font-weight-light mb-4 ${data.color}--text`">{{ data.title }}</h2>
          <div>
            {{ data.text }}
          </div>
        </div>
      </v-card-text>
  </v-card>
  <v-col class="text-center" >
  <v-btn   color="primary" dark  x-large
           link to='/auth/login'>Zum Login</v-btn>
  </v-col>
</div>
</template>

<style>
  #app{
    background-image: url("https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80");
  }
  #timeline-container {
    margin: 2rem 1rem;
  }
  #timeline {
    padding: 1rem;
  }
</style>

<script>
export default {
    data: () => ({
        timeline: [
        {
            color: 'green',
            title: 'Erstelle ein Stapel',
            text: 'Erstelle jeweilge Stapel für deine unterschiedlichen Kurse.'
        },
        {
            color: 'blue',
            title: 'Erstelle Lernkarten',
            text: 'Befülle deine Stapel mit selbst geschriebenen Lernkarten. Beschrifte jeweils die Frageseite und die Antwortseite. '
        },
        {
            color: 'orange',
            title: 'Lerne jederzeit',
            text: 'Ob in der Bahn, im Bus oder in der Universität. Lerne überall und jederzeit ohne schwere und dicke Bücher mitzuschleppen.'
        },
          {
            color: 'cyan',
            title: 'Teile deine Stapel',
            text: 'Teile deine erstellten Stapel mit deinen Freunden um sie zum lernen zu motivieren.'
          }
      ],
    }),
}
</script>