
import NextTicker from "./NextTicker.js";
import { h } from "../../lib/i-mini-vue.esm.js";
export default {
  name: "App",
  setup() {},

  render() {
    return h("div", { tId: 1 }, [h("p", {}, "主页"), h(NextTicker)]);
  },
};
