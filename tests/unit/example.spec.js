import { expect } from "chai";
//import { shallowMount } from "@vue/test-utils";
//import HelloWorld from "@/components/HelloWorld.vue";
import detail from "@/views/Movie/detail.vue";

/* describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });
}); */
describe("test",()=>{
  it("shibai",()=>{
    const defaultdata = detail.data()
    console.log("单元测试mocha和chai版");
    expect(defaultdata.isLoading).to.equals(true)
  });
  expect()
})
