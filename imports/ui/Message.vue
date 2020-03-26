

<template>
  <div class="alert" v-bind:class="getLevelClass()">
    {{ this.message.createdAt | moment("H:mm") }} {{ this.message.from }} : {{ this.message.text }}
    <a
      href="#"
      @click="deleteMessage()"
    >
      <b-icon-x class="float-right"></b-icon-x>
    </a>
  </div>
</template>

<script>
import { Messages } from "./../api/messages.js";
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
          result.push("alert-primary");
          break;
        case 1:
          result.push("alert-warning");
          break;
        case 2:
          result.push("alert-danger");
          break;
      }

      return result;
    },
    deleteMessage() {
      Messages.remove(this.message._id);
    }
  }
};
</script>

