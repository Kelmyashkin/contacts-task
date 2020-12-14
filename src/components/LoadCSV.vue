<template>
  <div>
    <h1>Load a CSV file</h1>
    <input ref="csv" type="file" name="csv" @change.prevent="loadfile" />

    <ul v-if="columns.length">
      <li v-for="field in mapFields" :key="field.key">
        {{ field.key }}
        <select v-model="field.mapPlace">
          <option value=""></option>
          <option
            v-for="(column, index) in columns"
            :key="index"
            :value="index"
            >{{ column }}</option
          >
        </select>
      </li>
    </ul>

    <button :disabled="!allColumnsMapped" @click="loadContacts">Load</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import flatten from "lodash/flatten";

import Papa from "papaparse";
import mimeTypes from "mime-types";
import { Contact } from "@/interfaces/Contact";
import { ContactCustomAttributes } from "@/interfaces/ContactCustomAttributes";
import { generateId } from "@/utils/commonUtils";

interface FileMapping {
  key: string;
  label: string;
  mapPlace?: number;
}

@Component
export default class LoadCSV extends Vue {
  mapFields: FileMapping[] = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
  ];
  columns: string[] = [];
  rows: string[][] = [];

  $refs!: {
    csv: any;
  };

  get allColumnsMapped() {
    return this.mapFields.every((f) => f.mapPlace !== undefined);
  }

  loadfile() {
    console.log("loadfile");
    const file = this.$refs.csv?.files[0];
    const mimeType = file.type === "" ? mimeTypes.lookup(file.name) : file.type;

    if (file) {
      const isValidFileMimeType = [
        "text/csv",
        "text/x-csv",
        "application/vnd.ms-excel",
        "text/plain",
      ].includes(mimeType);

      if (!isValidFileMimeType) {
        alert("Incorrect file, pleace load csv file");
        return;
      }

      this.readFile(file, (output: any) => {
        const result = Papa.parse(output, { skipEmptyLines: true });
        this.columns = result.data[0] as string[];
        this.rows = result.data.slice(1) as string[][];

        console.log(result);
        // _this.sample = get(
        //   Papa.parse(output, { preview: 2, skipEmptyLines: true }),
        //   "data"
        // );
        // _this.csv = get(Papa.parse(output, { skipEmptyLines: true }), "data");
      });
    }
  }

  readFile(file: File, callback: Function) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function(evt) {
      callback(evt?.target?.result);
    };
  }

  loadContacts() {
    const namePlace =
      this.mapFields.find((m) => m.key === "name")?.mapPlace || 0;
    const phonePlace =
      this.mapFields.find((m) => m.key === "phone")?.mapPlace || 0;
    const emailPlace =
      this.mapFields.find((m) => m.key === "email")?.mapPlace || 0;
    const mappedIndexes = [namePlace, phonePlace, emailPlace];
    const contacts = this.rows.map((r, index) => ({
      id: generateId("contact"),
      name: r[namePlace],
      phone: r[phonePlace],
      email: r[emailPlace],
    }));

    const customAttributes = flatten(
      this.rows.map((r, index) =>
        r
          .map((field, fIndex) =>
            mappedIndexes.includes(fIndex)
              ? null
              : ({
                  id: generateId("custom_attribute"),
                  ["contact_id"]: contacts[index].id,
                  key: this.columns[fIndex],
                  value: field,
                } as ContactCustomAttributes)
          )
          .filter((f) => f)
      )
    );
    console.log("contacts", contacts);
    console.log("customAttributes", customAttributes);
    this.$emit("on-mapped-data", contacts, customAttributes);

    this.clearFileChoose();
  }

  clearFileChoose() {
    if (this.$refs.csv) this.$refs.csv.value = "";
    this.rows = [];
    this.columns = [];
    this.mapFields.forEach((mf) => (mf.mapPlace = undefined));
  }
}
</script>

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
