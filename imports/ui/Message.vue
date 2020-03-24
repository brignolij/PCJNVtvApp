

<template>
  <div class="alert" v-bind:class="getLevelClass()">
    {{ this.message.createdAt | moment("H:mm") }} {{ this.message.from }} : {{ this.message.text }}
    <b>{{this.message.level}}</b>
  </div>
</template>

<script>
export default {
  props: ["message"],

  data() {
    return {};
  },
  methods: {
    getLevelClass() {
      var result = [];
      var levelNumber = parseInt(this.message.level);

      switch (levelNumber) {
        case 0:
          result.push("alert-secondary");
          break;
        case 1:
          result.push("alert-primary");
          break;
        case 2:
          result.push("alert-warning");
          break;
        case 3:
          result.push("alert-danger");
          break;
      }

      return result;
    }
  }
};
</script>

