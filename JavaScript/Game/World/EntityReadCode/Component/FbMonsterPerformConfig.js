"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMonsterPerformConfig = void 0);
const UnionMonsterShowOnDeathConfigHelper_1 = require("./UnionMonsterShowOnDeathConfigHelper");
class FbMonsterPerformConfig {
  constructor(e) {
    (this.FbDataInternal = e), (this.g8h = !1), (this.f8h = void 0);
  }
  static Create(e) {
    if (e) return new FbMonsterPerformConfig(e);
  }
  get ShowOnDeath() {
    var e, t;
    return (
      !this.g8h &&
        ((this.g8h = !0),
        (e = this.FbDataInternal.showOnDeathType()),
        (t =
          UnionMonsterShowOnDeathConfigHelper_1.UnionMonsterShowOnDeathConfigHelper.GetUnionMonsterShowOnDeathConfigObject(
            e,
          ))) &&
        (this.f8h =
          UnionMonsterShowOnDeathConfigHelper_1.UnionMonsterShowOnDeathConfigHelper.ReadUnionMonsterShowOnDeathConfig(
            e,
            this.FbDataInternal.showOnDeath(t),
          )),
      this.f8h
    );
  }
}
exports.FbMonsterPerformConfig = FbMonsterPerformConfig;
//# sourceMappingURL=FbMonsterPerformConfig.js.map
