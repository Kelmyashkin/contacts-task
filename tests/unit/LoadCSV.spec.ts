import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";

import LoadCSV from "@/components/LoadCSV.vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe("LoadCSV.vue", () => {
  it("renders header and input file", () => {
    const wrapper = mount(LoadCSV, {
      localVue,
    });

    expect(wrapper.find("h1").exists()).toBeTruthy();
    expect(wrapper.find("h1").text()).toEqual("Load a CSV file");

    expect(wrapper.find("input[type='file']").exists()).toBeTruthy();
  });
});
