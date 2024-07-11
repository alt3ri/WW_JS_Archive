"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DungeonDetectFilter = void 0);
const CommonFilter_1 = require("./CommonFilter");
class DungeonDetectFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments),
      (this.$Lt = (e) => {
        return e.Conf.Secondary;
      });
  }
  OnInitFilterMap() {
    this.FilterMap.set(9, this.$Lt);
  }
}
exports.DungeonDetectFilter = DungeonDetectFilter;
//# sourceMappingURL=DungeonDetectFilter.js.map
