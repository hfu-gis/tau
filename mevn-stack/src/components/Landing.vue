<template>
<div>
    <v-timeline>
    <v-timeline-item
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
    </v-timeline-item>
  </v-timeline>
</div>
</template>

<script>
export default {
    data: () => ({
        timeline: [
        {
            color: 'green',
            title: 'Erstelle ein Stapel',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
        },
        {
            color: 'blue',
            title: 'Erstelle Lernkarten',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
        },
        {
            color: 'orange',
            title: 'Lerne jederzeit',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
        },
        {
            color: 'cyan',
            title: 'Teile deine Stapel',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
        }
      ],
    }),
}
</script>