"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionEntityBatchRefresh =
    exports.unionToUnionEntityBatchRefresh =
    exports.UnionEntityBatchRefresh =
      void 0);
const random_batch_pool_refresh_js_1 = require("../fb-component/random-batch-pool-refresh.js"),
  random_batch_refresh_js_1 = require("../fb-component/random-batch-refresh.js"),
  sequence_batch_refresh_js_1 = require("../fb-component/sequence-batch-refresh.js");
var UnionEntityBatchRefresh;
function unionToUnionEntityBatchRefresh(e, r) {
  switch (UnionEntityBatchRefresh[e]) {
    case "NONE":
      return;
    case "RandomBatchPoolRefresh":
      return r(new random_batch_pool_refresh_js_1.RandomBatchPoolRefresh());
    case "RandomBatchRefresh":
      return r(new random_batch_refresh_js_1.RandomBatchRefresh());
    case "SequenceBatchRefresh":
      return r(new sequence_batch_refresh_js_1.SequenceBatchRefresh());
    default:
      return;
  }
}
function unionListToUnionEntityBatchRefresh(e, r, n) {
  switch (UnionEntityBatchRefresh[e]) {
    case "NONE":
      return;
    case "RandomBatchPoolRefresh":
      return r(n, new random_batch_pool_refresh_js_1.RandomBatchPoolRefresh());
    case "RandomBatchRefresh":
      return r(n, new random_batch_refresh_js_1.RandomBatchRefresh());
    case "SequenceBatchRefresh":
      return r(n, new sequence_batch_refresh_js_1.SequenceBatchRefresh());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.RandomBatchPoolRefresh = 1)] = "RandomBatchPoolRefresh"),
    (e[(e.RandomBatchRefresh = 2)] = "RandomBatchRefresh"),
    (e[(e.SequenceBatchRefresh = 3)] = "SequenceBatchRefresh");
})(
  (UnionEntityBatchRefresh =
    exports.UnionEntityBatchRefresh || (exports.UnionEntityBatchRefresh = {})),
),
  (exports.unionToUnionEntityBatchRefresh = unionToUnionEntityBatchRefresh),
  (exports.unionListToUnionEntityBatchRefresh =
    unionListToUnionEntityBatchRefresh);
//# sourceMappingURL=union-entity-batch-refresh.js.map
