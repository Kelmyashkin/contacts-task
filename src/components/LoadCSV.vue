<template>
  <div>
    <h1>Load a CSV file</h1>
    <b-form-file
      id="csvFile"
      class="w-50 my-3"
      v-model="csvFile"
      :state="Boolean(csvFile)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      accept=".csv"
    ></b-form-file>

    <b-container id="mappingPanel" class="my-3">
      <b-row>
        <b-col class="cols-2">
          <b-list-group v-if="columns.length">
            <b-list-group-item
              v-for="field in mapFields"
              :key="field.key"
              class="d-flex align-items-baseline"
            >
              <span class="mr-4">{{ field.key }}</span>
              <b-form-select
                v-model="field.mapPlace"
                :options="columnsOptions"
              ></b-form-select>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>

    <b-button
      id="loadButton"
      :disabled="!allColumnsMapped"
      @click="loadContacts"
      variant="outline-success"
      v-if="columns.length"
      >Load</b-button
    >
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

  get columnsOptions() {
    return this.columns.map((c, index) => ({ text: c, value: index }));
  }

  get allColumnsMapped() {
    return this.mapFields.every((f) => f.mapPlace !== undefined);
  }

  csvFile = null;

  @Watch("csvFile")
  onChange(value: any, oldValue: any) {
    if (value) {
      this.loadfile(value);
    }
  }

  loadfile(file: any) {
    const mimeType = file.type === "" ? mimeTypes.lookup(file.name) : file.type;

    if (file) {
      const isValidFileMimeType = [
        "text/csv",
        "text/x-csv",
        "application/vnd.ms-excel",
        "text/plain",
      ].includes(mimeType);

      if (!isValidFileMimeType) {
        alert("Incorrect file, please load CSV file");
        Vue.nextTick(this.clearFileChoose);
        return;
      }

      this.readFile(file, (output: any) => {
        const result = Papa.parse(output, { skipEmptyLines: true });
        this.columns = result.data[0] as string[];
        this.rows = result.data.slice(1) as string[][];

        // matching
        this.mapFields.forEach((f) => {
          const matchedColumn = this.columns.find((c) => c.includes(f.key));
          if (matchedColumn) {
            f.mapPlace = this.columns.indexOf(matchedColumn);
          }
        });
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
    this.csvFile = null;
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
