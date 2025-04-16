"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueSkinDamage = void 0);
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueSkinDamage extends GameplayCueBase_1.GameplayCueBase {
  OnCreate() {
    var e = this.EntityHandle.Entity?.GetComponent(208);
    e &&
      ((e.CuePath = this.GetPath()),
      e.ApplySkinDamage(e.CuePath, !1, "GameplayCueSkinDamage生成"));
  }
  OnDestroy() {
    var e = this.EntityHandle.Entity?.GetComponent(208);
    e &&
      ((e.CuePath = ""),
      e.ApplySkinDamageByType(
        e.SkinDamageType,
        !1,
        "GameplayCueSkinDamage销毁",
      ));
  }
}
exports.GameplayCueSkinDamage = GameplayCueSkinDamage;
//# sourceMappingURL=GameplayCueSkinDamage.js.map
