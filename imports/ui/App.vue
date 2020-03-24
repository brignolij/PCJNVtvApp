
<template>
  <div class="container">
    <header>
      <h1>ORPC JNV Message</h1>

      <form class="new-task form-group" @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-6">
            <input
              required
              class="form-control"
              type="text"
              placeholder="Your Message"
              v-model="newMessage"
            />
          </div>
          <div class="col">
            <select required class="custom-select custom-select-sm" v-model="selectedDepartment">
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
              <option value="1" selected>1</option>
              <option value="2" selected>2</option>
              <option value="3" selected>3</option>
            </select>
          </div>
        </div>
      </form>
    </header>
    <div class="row">
      <div class="col-10">
        <Message v-for="message in messages" v-bind:key="message.index" v-bind:message="message" />
      </div>
      <div class="col-2">
        <Department
          v-for="department in departments"
          v-bind:key="department.index"
          v-bind:department="department"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Task from "./Task.vue";
import Message from "./Message.vue";
import Department from "./Department.vue";
import { Tasks } from "./../api/tasks.js";
import { Messages } from "./../api/messages.js";
import { Departments } from "./../api/departments";
export default {
  components: {
    Task,
    Message,
    Department
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
      this.messageLevel = 0;
      this.newMessage = "";
    }
  },
  meteor: {
    tasks() {
      return Tasks.find({}).fetch();
    },
    messages() {
      return Messages.find({}, { sort: { createdAt: -1 } }).fetch();
    },
    departments() {
      return Departments.find({}).fetch();
    }
  }
};
</script>

