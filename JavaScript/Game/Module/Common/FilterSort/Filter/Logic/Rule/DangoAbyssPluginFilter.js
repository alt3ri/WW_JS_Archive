"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssPluginFilter = void 0);
const CommonFilter_1 = require("./CommonFilter");
class DangoAbyssPluginFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments),
      (this.GetDangoAbyssPluginQuality = (t) => {
        return t.GetQuality();
      }),
      (this.GetDangoAbyssPluginProp = (t) => {
        var s = [];
        for (const r of t.GetProp()) s.push(r.Id);
        return s;
      }),
      (this.GetDangoAbyssPluginTag = (t) => {
        var s = [];
        for (const r of t.GetConfig().AddTag.keys()) s.push(r);
        return s;
      }),
      (this.GetDangoAbyssPluginEquipState = (t) => {
        return 0 < t.GetRoleId() ? 1 : -1;
      }),
      (this.GetDangoAbyssPluginLockState = (t) => {
        return t.GetIsLock() ? 1 : -1;
      }),
      (this.GetDangoAbyssPluginDeprecateState = (t) => {
        return t.GetIsDeprecated() ? 1 : -1;
      });
  }
  OnInitFilterMap() {
    this.FilterMap.set(35, this.GetDangoAbyssPluginQuality),
      this.FilterMap.set(36, this.GetDangoAbyssPluginProp),
      this.FilterMap.set(37, this.GetDangoAbyssPluginTag),
      this.FilterMap.set(38, this.GetDangoAbyssPluginEquipState),
      this.FilterMap.set(39, this.GetDangoAbyssPluginLockState),
      this.FilterMap.set(40, this.GetDangoAbyssPluginDeprecateState);
  }
}
exports.DangoAbyssPluginFilter = DangoAbyssPluginFilter;
//# sourceMappingURL=DangoAbyssPluginFilter.js.map
