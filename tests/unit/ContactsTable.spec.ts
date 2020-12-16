import { createLocalVue, mount } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";

import ContactsTable from "@/components/ContactsTable.vue";
import { Contact } from "@/interfaces/Contact";
import { ContactCustomAttributes } from "@/interfaces/ContactCustomAttributes";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe("ContactsTable.vue", () => {
  it("don't render root when no contacts and attributes present", () => {
    const wrapper = mount(ContactsTable, {
      localVue,
      propsData: {},
    });

    expect(wrapper.find("#tables-root").exists()).toBeFalsy();
  });

  it("renders contacts table with one contact", () => {
    const contacts: Contact[] = [
      {
        id: 1,
        team_id: 1,
        name: "John",
        phone: "111-222-333",
        email: "test@test.com",
      },
    ];

    const wrapper = mount(ContactsTable, {
      localVue,
      propsData: { contacts },
    });

    expect(wrapper.find("#contacts-table").exists()).toBeTruthy();
    expect(wrapper.findAll("#contacts-table tbody tr").length).toBe(1);
  });

  it("renders attributes table with one attribute", () => {
    const contacts: Contact[] = [
      {
        id: 1,
        team_id: 1,
        name: "John",
        phone: "111-222-333",
        email: "test@test.com",
      },
    ];
    const attributes: ContactCustomAttributes[] = [
      {
        id: 1,
        contact_id: 1,
        key: "key",
        value: "value",
      },
    ];

    const wrapper = mount(ContactsTable, {
      localVue,
      propsData: { contacts, attributes },
    });

    expect(wrapper.find("#attributes-table").exists()).toBeTruthy();
    expect(wrapper.findAll("#attributes-table tbody tr").length).toBe(1);
  });

  it("don't renders attributes table without contacts", () => {
    const attributes: ContactCustomAttributes[] = [
      {
        id: 1,
        contact_id: 1,
        key: "key",
        value: "value",
      },
    ];

    const wrapper = mount(ContactsTable, {
      localVue,
      propsData: { attributes },
    });

    expect(wrapper.find("#attributes-table").exists()).toBeFalsy();
  });
});
