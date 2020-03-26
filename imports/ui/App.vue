
<template>
  <div>
    <div class="main container">
      <header>
        <div class="row">
          <div class="col-8">
            <h1>PC région Nord - Notifications</h1>
          </div>
          <div class="col">
            <button class="btn btn-primary" v-on:click="showNewMessage = !showNewMessage">Gérer</button>
            <button
              class="btn btn-danger"
              @click="deleteAllMessages()"
              v-if="showNewMessage"
            >Tout Supprimer</button>
          </div>
        </div>

        <div class="row" v-if="showNewMessage">
          <form class="form-group col" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-6">
                <label>Notification</label>
                <input
                  required
                  class="form-control"
                  type="text"
                  placeholder="Your Notification"
                  v-model="newMessage"
                />
              </div>
              <div class="col">
                <label>Departement</label>
                <select
                  required
                  class="custom-select custom-select-sm"
                  v-model="selectedDepartment"
                >
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
                  <option value="0" selected>information</option>
                  <option value="1" selected>important</option>
                  <option value="2" selected>très important</option>
                </select>
              </div>
              <div class="col">
                <br />
                <button class="btn btn-primary" type="submit">Envoyer</button>
              </div>
            </div>
          </form>
        </div>
      </header>
      <div class="row">
        <div class="col-10">
          <Message v-for="message in messages" v-bind:key="message.index" v-bind:message="message"></Message>
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
    <div class="container legend">
      <div class="row">
        <div class="col"></div>
        <div class="col alert alert-primary">information</div>
        <div class="col alert alert-warning">important</div>
        <div class="col alert alert-danger">très important</div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import Message from "./Message.vue";
import Department from "./Department.vue";

import { Messages } from "./../api/messages.js";
import { Departments } from "./../api/departments";
export default {
  components: {
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
    },
    deleteAllMessages() {
      this.messages.forEach(message => {
        Messages.remove(message._id);
      });
    }
  },
  meteor: {
    messages() {
      return Messages.find({}, { sort: { createdAt: -1 } }).fetch();
    },
    departments() {
      return Departments.find({}, { sort: { name: 1 } }).fetch();
    }
  }
};
</script>

