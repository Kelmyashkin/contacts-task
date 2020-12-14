<template>
  <div class="table" v-if="contacts.length">
    <h2>Contacts</h2>
    <table>
      <tr>
        <th>Id</th>
        <th>Team Id</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Sticky Phone</th>
        <th>Created At</th>
        <th>Updated At</th>
      </tr>
      <tr v-for="c in contacts" :key="c.id">
        <td>{{ c.id }}</td>
        <td>{{ c.team_id }}</td>
        <td>{{ c.name }}</td>
        <td>{{ c.phone }}</td>
        <td>{{ c.email }}</td>
        <td>{{ c.sticky_phone_number_id }}</td>
        <td>{{ c.created_at }}</td>
        <td>{{ c.updated_at }}</td>
      </tr>
    </table>

    <hr />

    <div v-if="attributes.length">
      <h2>Custom Attributes</h2>
      <table>
        <tr>
          <th>Id</th>
          <th>Contact Id</th>
          <th>Key</th>
          <th>Value</th>
        </tr>
        <tr v-for="c in attributes" :key="c.id">
          <td>{{ c.id }}</td>
          <td>{{ c.contact_id }}</td>
          <td>{{ c.key }}</td>
          <td>{{ c.value }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Contact } from "@/interfaces/Contact";
import { ContactCustomAttributes } from "@/interfaces/ContactCustomAttributes";

@Component
export default class ContactsTable extends Vue {
  @Prop() readonly contacts!: Contact[];
  @Prop() readonly attributes!: ContactCustomAttributes[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
