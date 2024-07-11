"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeFilter = void 0);
const CommonFilter_1 = require("./CommonFilter");
class ComposeFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments),
      (this.GetComposeMenuList = (e) => {
        return e.MainType === 1 || e.MainType === 2 ? e.SubType : 0;
      });
  }
  OnInitFilterMap() {
    this.FilterMap.set(12, this.GetComposeMenuList);
  }
}
exports.ComposeFilter = ComposeFilter;
// # sourceMappingURL=ComposeFilter.js.map
