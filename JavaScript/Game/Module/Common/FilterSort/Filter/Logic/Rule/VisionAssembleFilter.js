"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionAssembleFilter = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CommonFilter_1 = require("./CommonFilter");
class VisionAssembleFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments),
      (this.Jh_ = (e) => {
        var r = new Array();
        for (const s of ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionAssembleViewAttrData(
          e,
          !1,
          0,
        )) {
          var o = 10 * s.AttrId + (s.IfPercentage ? 2 : 1);
          r.includes(o) || r.push(o);
        }
        return r;
      });
  }
  OnInitFilterMap() {
    this.FilterMap.set(29, this.Jh_);
  }
}
exports.VisionAssembleFilter = VisionAssembleFilter;
//# sourceMappingURL=VisionAssembleFilter.js.map
