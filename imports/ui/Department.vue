

<template>
  <a href="#" v-on:click="toggle()">
    <div
      class="alert"
      v-bind:class="{'alert-success': this.department.status , 'alert-danger':!this.department.status}"
    >{{ this.department.name }}</div>
  </a>
</template>

 

<script>
import { Departments } from "./../api/departments";
export default {
  props: ["department"],

  data() {
    return {};
  },
  methods: {
    toggle() {
      Departments.update(this.department._id, {
        $set: { status: !this.department.status }
      });
    }
  }
};
</script>

