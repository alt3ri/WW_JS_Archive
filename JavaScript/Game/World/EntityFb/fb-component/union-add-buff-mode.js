"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionAddBuffMode =
    exports.unionToUnionAddBuffMode =
    exports.UnionAddBuffMode =
      void 0);
const adsorb_add_buff_js_1 = require("../fb-component/adsorb-add-buff.js"),
  fire_bullet_add_buff_js_1 = require("../fb-component/fire-bullet-add-buff.js"),
  immediate_add_buff_js_1 = require("../fb-component/immediate-add-buff.js");
var UnionAddBuffMode;
function unionToUnionAddBuffMode(d, e) {
  switch (UnionAddBuffMode[d]) {
    case "NONE":
      return;
    case "AdsorbAddBuff":
      return e(new adsorb_add_buff_js_1.AdsorbAddBuff());
    case "FireBulletAddBuff":
      return e(new fire_bullet_add_buff_js_1.FireBulletAddBuff());
    case "ImmediateAddBuff":
      return e(new immediate_add_buff_js_1.ImmediateAddBuff());
    default:
      return;
  }
}
function unionListToUnionAddBuffMode(d, e, f) {
  switch (UnionAddBuffMode[d]) {
    case "NONE":
      return;
    case "AdsorbAddBuff":
      return e(f, new adsorb_add_buff_js_1.AdsorbAddBuff());
    case "FireBulletAddBuff":
      return e(f, new fire_bullet_add_buff_js_1.FireBulletAddBuff());
    case "ImmediateAddBuff":
      return e(f, new immediate_add_buff_js_1.ImmediateAddBuff());
    default:
      return;
  }
}
!(function (d) {
  (d[(d.NONE = 0)] = "NONE"),
    (d[(d.AdsorbAddBuff = 1)] = "AdsorbAddBuff"),
    (d[(d.FireBulletAddBuff = 2)] = "FireBulletAddBuff"),
    (d[(d.ImmediateAddBuff = 3)] = "ImmediateAddBuff");
})(
  (UnionAddBuffMode =
    exports.UnionAddBuffMode || (exports.UnionAddBuffMode = {})),
),
  (exports.unionToUnionAddBuffMode = unionToUnionAddBuffMode),
  (exports.unionListToUnionAddBuffMode = unionListToUnionAddBuffMode);
//# sourceMappingURL=union-add-buff-mode.js.map
