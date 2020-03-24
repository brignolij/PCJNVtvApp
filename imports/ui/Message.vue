

<template>
  <div class="alert alert-primary">
    {{ this.message.from }} : {{ this.message.text }}
    <b>{{this.message.level}}</b>
  </div>
</template>

<script>
export default {
  props: ["message"],

  data() {
    return {};
  }
};
</script>

