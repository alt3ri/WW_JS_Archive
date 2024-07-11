"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingPopularityUpData = void 0);
const StringUtils_1 = require("../../../../../../../../Core/Utils/StringUtils");
class MoonChasingPopularityUpData {
  constructor(t, s, i, o, r) {
    (this.Title = r),
      (this.RoleId = 0),
      (this.LastPopularity = 0),
      (this.CurrentPopularity = 0),
      (this.DialogName = StringUtils_1.EMPTY_STRING),
      (this.RoleId = t),
      (this.LastPopularity = s),
      (this.CurrentPopularity = i),
      (this.DialogName = o);
  }
}
exports.MoonChasingPopularityUpData = MoonChasingPopularityUpData;
//# sourceMappingURL=MoonChasingPopularityUpData.js.map
