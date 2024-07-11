"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomFetterFilter = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonFilter_1 = require("./CommonFilter");
class PhantomFetterFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments),
      (this.GetPhantomItemIdList = (e) => {
        e =
          ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(
            e.Id,
          );
        return Array.from(e);
      });
  }
  OnInitFilterMap() {
    this.FilterMap.set(18, this.GetPhantomItemIdList),
      this.FilterMap.set(19, this.GetPhantomItemIdList),
      this.FilterMap.set(20, this.GetPhantomItemIdList),
      this.FilterMap.set(21, this.GetPhantomItemIdList);
  }
}
exports.PhantomFetterFilter = PhantomFetterFilter;
// # sourceMappingURL=PhantomFetterFilter.js.map
