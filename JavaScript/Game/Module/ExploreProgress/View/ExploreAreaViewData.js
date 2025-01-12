"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreAreaViewData = void 0);
class ExploreAreaViewData {
  constructor() {
    (this.CountryId = 0),
      (this.AreaId = 0),
      (this.NameId = ""),
      (this.IsCountry = !1),
      (this.IsLock = !0),
      (this.Progress = 0);
  }
  RefreshCountry(s, t, i) {
    (this.CountryId = s),
      (this.AreaId = 0),
      (this.NameId = t),
      (this.IsLock = i),
      (this.Progress = 0),
      (this.IsCountry = !0);
  }
  RefreshArea(s, t, i) {
    (this.CountryId = 0),
      (this.AreaId = s),
      (this.NameId = t),
      (this.IsLock = !1),
      (this.Progress = i),
      (this.IsCountry = !1);
  }
}
exports.ExploreAreaViewData = ExploreAreaViewData;
//# sourceMappingURL=ExploreAreaViewData.js.map
