"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueHideBone = void 0);
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueHideBone extends GameplayCueBase_1.GameplayCueBase {
  OnCreate() {
    this.Q$o(!0);
  }
  OnDestroy() {
    this.Q$o(!1);
  }
  Q$o(e) {
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Parameters[0]);
    let s = "1" === (this.CueConfig.Parameters[1] ?? "1");
    e || (s = !s),
      this.ActorInternal.Mesh.IsBoneHiddenByName(t) !== s &&
        (s
          ? this.ActorInternal.Mesh.HideBoneByName(
              t,
              Number(this.CueConfig.Parameters[1]) ?? 0,
            )
          : this.ActorInternal.Mesh.UnHideBoneByName(t));
  }
}
exports.GameplayCueHideBone = GameplayCueHideBone;
//# sourceMappingURL=GameplayCueHideBone.js.map
