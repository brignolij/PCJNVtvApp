
<template>
  <div class="container">
    <header>
      <h1>ORPC JNV Message</h1>

      <form class="new-task form-group" @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-6">
            <input class="form-control" type="text" placeholder="Your Message" v-model="newMessage" />
          </div>
          <div class="col">
            <select class="custom-select custom-select-sm" v-model="selectedDepartment">
              <option selected>DB?</option>
              <option
                v-for="department in departments"
                v-bind:key="department.index"
                v-bind:department="department"
                v-bind:value="department.name"
              >{{department.name}}</option>
            </select>
          </div>
          <div class="col">
            <select class="custom-select custom-select-sm" v-model="messageLevel">
              <option value="0" selected>0</option>
              <option value="0" selected>1</option>
              <option value="0" selected>2</option>
              <option value="0" selected>3</option>
            </select>
          </div>
        </div>
      </form>
    </header>
    <div>
      <Message v-for="message in messages" v-bind:key="message.index" v-bind:message="message" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Task from "./Task.vue";
import Message from "./Message.vue";
import { Tasks } from "./../api/tasks.js";
import { Messages } from "./../api/messages.js";
import { Departments } from "./../api/departments";
export default {
  components: {
    Task,
    Message
  },

  data() {
    return {
      newMessage: "",
      selectedDepartment: "",
      messageLevel: 0
    };
  },

  methods: {
    handleSubmit(event) {
      Messages.insert({
        text: this.newMessage,
        from: this.selectedDepartment,
        level: this.messageLevel,
        createdAt: new Date() // current time
      });

      // Clear form

      this.newMessage = "";
    }
  },
  meteor: {
    tasks() {
      console.log(Tasks.find({}).fetch());
      return Tasks.find({}).fetch();
    },
    messages() {
      console.log(Messages.find({}).fetch());
      return Messages.find({}).fetch();
    },
    departments() {
      console.log(Departments.find({}).fetch());
      return Departments.find({}).fetch();
    }
  }
};
</script>

