"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionEntityBatchHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbEntityListBatch_1 = require("./FbEntityListBatch");
class UnionEntityBatchHelper {
  static GetUnionEntityBatchObject(t) {
    if (t === fb_component_1.UnionEntityBatch.EntityListBatch)
      return new fb_component_1.EntityListBatch();
  }
  static ReadUnionEntityBatch(t, n) {
    return void 0 !== n && t === fb_component_1.UnionEntityBatch.EntityListBatch
      ? FbEntityListBatch_1.FbEntityListBatch.Create(n)
      : void 0;
  }
}
exports.UnionEntityBatchHelper = UnionEntityBatchHelper;
//# sourceMappingURL=UnionEntityBatchHelper.js.map
