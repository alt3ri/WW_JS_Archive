"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionRenderSpecifiedRangeConfig =
    exports.unionToUnionRenderSpecifiedRangeConfig =
    exports.UnionRenderSpecifiedRangeConfig =
      void 0);
const render_book_page_js_1 = require("../fb-component/render-book-page.js"),
  render_flower_bridge_js_1 = require("../fb-component/render-flower-bridge.js"),
  render_fog_barrier_js_1 = require("../fb-component/render-fog-barrier.js");
var UnionRenderSpecifiedRangeConfig;
function unionToUnionRenderSpecifiedRangeConfig(e, r) {
  switch (UnionRenderSpecifiedRangeConfig[e]) {
    case "NONE":
      return;
    case "RenderBookPage":
      return r(new render_book_page_js_1.RenderBookPage());
    case "RenderFlowerBridge":
      return r(new render_flower_bridge_js_1.RenderFlowerBridge());
    case "RenderFogBarrier":
      return r(new render_fog_barrier_js_1.RenderFogBarrier());
    default:
      return;
  }
}
function unionListToUnionRenderSpecifiedRangeConfig(e, r, n) {
  switch (UnionRenderSpecifiedRangeConfig[e]) {
    case "NONE":
      return;
    case "RenderBookPage":
      return r(n, new render_book_page_js_1.RenderBookPage());
    case "RenderFlowerBridge":
      return r(n, new render_flower_bridge_js_1.RenderFlowerBridge());
    case "RenderFogBarrier":
      return r(n, new render_fog_barrier_js_1.RenderFogBarrier());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.RenderBookPage = 1)] = "RenderBookPage"),
    (e[(e.RenderFlowerBridge = 2)] = "RenderFlowerBridge"),
    (e[(e.RenderFogBarrier = 3)] = "RenderFogBarrier");
})(
  (UnionRenderSpecifiedRangeConfig =
    exports.UnionRenderSpecifiedRangeConfig ||
    (exports.UnionRenderSpecifiedRangeConfig = {})),
),
  (exports.unionToUnionRenderSpecifiedRangeConfig =
    unionToUnionRenderSpecifiedRangeConfig),
  (exports.unionListToUnionRenderSpecifiedRangeConfig =
    unionListToUnionRenderSpecifiedRangeConfig);
//# sourceMappingURL=union-render-specified-range-config.js.map
