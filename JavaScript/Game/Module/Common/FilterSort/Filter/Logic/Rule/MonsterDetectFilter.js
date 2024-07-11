"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterDetectFilter = void 0);
const CommonFilter_1 = require("./CommonFilter");
class MonsterDetectFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments),
      (this.eDt = (t) => {
        return t.Conf.DangerType;
      }),
      (this.tDt = (t) => {
        return t.Conf.TypeDescription2;
      });
  }
  OnInitFilterMap() {
    this.FilterMap.set(7, this.eDt), this.FilterMap.set(17, this.tDt);
  }
}
exports.MonsterDetectFilter = MonsterDetectFilter;
//# sourceMappingURL=MonsterDetectFilter.js.map
