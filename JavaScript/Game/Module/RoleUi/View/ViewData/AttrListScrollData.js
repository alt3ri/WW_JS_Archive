"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttrListScrollData = void 0);
const ScrollViewDataBase_1 = require("../../../Util/ScrollView/ScrollViewDataBase");
class AttrListScrollData extends ScrollViewDataBase_1.ScrollViewDataBase {
  constructor(t, s, e, i, r, l) {
    super(),
      (this.IsRatio = !1),
      (this.IsUnknown = !1),
      (this.CombineNum = 0),
      (this.Id = t),
      (this.BaseValue = s),
      (this.AddValue = e),
      (this.Priority = i),
      (this.IsRatio = r),
      (this.AttributeType = l);
  }
}
exports.AttrListScrollData = AttrListScrollData;
// # sourceMappingURL=AttrListScrollData.js.map
