"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionEntityBatch =
    exports.unionToUnionEntityBatch =
    exports.UnionEntityBatch =
      void 0);
const entity_list_batch_js_1 = require("../fb-component/entity-list-batch.js");
var UnionEntityBatch;
function unionToUnionEntityBatch(t, n) {
  switch (UnionEntityBatch[t]) {
    case "NONE":
      return;
    case "EntityListBatch":
      return n(new entity_list_batch_js_1.EntityListBatch());
    default:
      return;
  }
}
function unionListToUnionEntityBatch(t, n, i) {
  switch (UnionEntityBatch[t]) {
    case "NONE":
      return;
    case "EntityListBatch":
      return n(i, new entity_list_batch_js_1.EntityListBatch());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"), (t[(t.EntityListBatch = 1)] = "EntityListBatch");
})(
  (UnionEntityBatch =
    exports.UnionEntityBatch || (exports.UnionEntityBatch = {})),
),
  (exports.unionToUnionEntityBatch = unionToUnionEntityBatch),
  (exports.unionListToUnionEntityBatch = unionListToUnionEntityBatch);
//# sourceMappingURL=union-entity-batch.js.map
