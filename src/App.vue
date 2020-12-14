<template>
  <div id="app">
    <LoadCSV @on-mapped-data="setContacts" />
    <ContactsTable
      :contacts="contacts"
      :attributes="customAttributes"
    ></ContactsTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoadCSV from "./components/LoadCSV.vue";
import ContactsTable from "./components/ContactsTable.vue";

import { Contact } from "./interfaces/Contact";
import { ContactCustomAttributes } from "./interfaces/ContactCustomAttributes";

@Component({
  components: {
    LoadCSV,
    ContactsTable,
  },
})
export default class App extends Vue {
  contacts: Contact[] = [];
  customAttributes: ContactCustomAttributes[] = [];

  setContacts(contacts: Contact[], attributes: ContactCustomAttributes[]) {
    console.log("App", contacts, attributes);

    contacts.forEach((c) => this.contacts.push(c));
    attributes.forEach((c) => this.customAttributes.push(c));
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
