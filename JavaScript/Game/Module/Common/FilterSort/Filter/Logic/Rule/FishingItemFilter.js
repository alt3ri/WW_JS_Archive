"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingItemFilter = void 0);
const CommonFilter_1 = require("./CommonFilter");
class FishingItemFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments),
      (this.GetFishingItemTech = (t) => {
        return t.Tech;
      }),
      (this.GetFishingItemTime = (t) => {
        return t.Time;
      }),
      (this.GetFishingItemArea = (t) => {
        return t.Area;
      }),
      (this.GetFishingItemType = (t) => {
        return t.Type;
      });
  }
  OnInitFilterMap() {
    this.FilterMap.set(31, this.GetFishingItemTech),
      this.FilterMap.set(32, this.GetFishingItemTime),
      this.FilterMap.set(33, this.GetFishingItemArea),
      this.FilterMap.set(34, this.GetFishingItemType);
  }
}
exports.FishingItemFilter = FishingItemFilter;
//# sourceMappingURL=FishingItemFilter.js.map
