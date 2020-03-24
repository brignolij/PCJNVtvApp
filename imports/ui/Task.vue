

<template>
  <div class="alert alert-primary">{{ this.task.text }}</div>
</template>

 

<script>
export default {
  props: ["task"],

  data() {
    return {};
  }
};
</script>

