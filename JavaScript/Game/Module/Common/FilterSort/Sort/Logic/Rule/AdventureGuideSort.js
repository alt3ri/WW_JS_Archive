"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdventureGuideSort = void 0);
const CommonSort_1 = require("./CommonSort");
class AdventureGuideSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.NLt = (t, e, o) => {
        return t !== e
          ? (t.Conf.DangerType - e.Conf.DangerType) * (o ? 1 : -1)
          : 0;
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.NLt);
  }
}
exports.AdventureGuideSort = AdventureGuideSort;
// # sourceMappingURL=AdventureGuideSort.js.map
