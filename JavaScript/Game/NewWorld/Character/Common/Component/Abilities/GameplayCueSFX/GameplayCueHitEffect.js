"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueHitEffect = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueHitEffect extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments), (this.hJ = 0), (this.Qgl = !1);
  }
  OnCreate() {
    this.CueConfig.Path &&
      (this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(
        this.CueConfig.Path,
        UE.BP_ReplaceHitEffect_C,
        (e) => {
          (this.hJ = 0), this.Uoa(e) && (this.Qgl = !0);
        },
      ));
  }
  OnDestroy() {
    0 !== this.hJ &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ), (this.hJ = 0)),
      this.Qgl && ((this.Qgl = !1), this.Kgl());
  }
  Uoa(e) {
    var t;
    return (
      !!e &&
      !!this.EntityHandle.Valid &&
      !!(t = this.EntityHandle.Entity.GetComponent(60)) &&
      t.ReplaceHitEffect(e)
    );
  }
  Kgl() {
    var e;
    this.EntityHandle.Valid &&
      (e = this.EntityHandle.Entity.GetComponent(60)) &&
      e.RemoveHitEffectReplaced();
  }
}
exports.GameplayCueHitEffect = GameplayCueHitEffect;
//# sourceMappingURL=GameplayCueHitEffect.js.map
