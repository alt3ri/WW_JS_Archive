"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPasserbyNpcSource =
    exports.unionToUnionPasserbyNpcSource =
    exports.UnionPasserbyNpcSource =
      void 0);
const passerby_npc_template_source_js_1 = require("../fb-component/passerby-npc-template-source.js");
var UnionPasserbyNpcSource;
function unionToUnionPasserbyNpcSource(e, s) {
  switch (UnionPasserbyNpcSource[e]) {
    case "NONE":
      return;
    case "PasserbyNpcTemplateSource":
      return s(
        new passerby_npc_template_source_js_1.PasserbyNpcTemplateSource(),
      );
    default:
      return;
  }
}
function unionListToUnionPasserbyNpcSource(e, s, r) {
  switch (UnionPasserbyNpcSource[e]) {
    case "NONE":
      return;
    case "PasserbyNpcTemplateSource":
      return s(
        r,
        new passerby_npc_template_source_js_1.PasserbyNpcTemplateSource(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.PasserbyNpcTemplateSource = 1)] = "PasserbyNpcTemplateSource");
})(
  (UnionPasserbyNpcSource =
    exports.UnionPasserbyNpcSource || (exports.UnionPasserbyNpcSource = {})),
),
  (exports.unionToUnionPasserbyNpcSource = unionToUnionPasserbyNpcSource),
  (exports.unionListToUnionPasserbyNpcSource =
    unionListToUnionPasserbyNpcSource);
//# sourceMappingURL=union-passerby-npc-source.js.map
