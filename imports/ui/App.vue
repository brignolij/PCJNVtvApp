
<template>
  <div class="container">
    <header>
      <div class="row">
        <div class="col-8">
          <h1>ORPC JNV Message</h1>
        </div>
        <div class="col">
          <button
            class="btn btn-light"
            v-on:click="showNewMessage = !showNewMessage"
          >Nouveau Message</button>
        </div>
      </div>

      <div class="row" v-if="showNewMessage">
        <form class="form-group col" @submit.prevent="handleSubmit">
          <div class="row">
            <div class="col-6">
              <label>Message</label>
              <input
                required
                class="form-control"
                type="text"
                placeholder="Your Message"
                v-model="newMessage"
              />
            </div>
            <div class="col">
              <label>Departement</label>
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
              <label>Gravité</label>
              <select class="custom-select custom-select-sm" v-model="messageLevel">
                <option value="0" selected>peu important</option>
                <option value="1" selected>information</option>
                <option value="2" selected>peu important</option>
                <option value="3" selected>très important</option>
              </select>
            </div>
          </div>
        </form>
      </div>
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
      messageLevel: 0,
      showNewMessage: false
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

