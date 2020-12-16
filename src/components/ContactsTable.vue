<template>
  <div v-if="contacts.length">
    <b-container fluid>
      <b-row>
        <b-col class="p-2 col-lg-7 col-sm-12">
          <h2>Contacts</h2>
          <b-table striped :items="contacts"></b-table>
        </b-col>
        <b-col class="p-2 col-lg-5 col-sm-12">
          <div v-if="attributes.length">
            <h2>Custom Attributes</h2>
            <b-table striped :items="attributes"></b-table>
          </div>
        </b-col>
      </b-row>
    </b-container>
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
