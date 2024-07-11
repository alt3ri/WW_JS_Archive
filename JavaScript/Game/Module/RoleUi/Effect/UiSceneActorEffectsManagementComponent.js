"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiSceneActorEffectsManagementComponent = void 0);
const UE = require("ue"),
  EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines"),
  EffectUtil_1 = require("../../../Utils/EffectUtil");
class UiSceneActorEffectsManagementComponent {
  constructor() {
    (this.u1o = new Array()),
      (this.c1o = new UE.Transform(
        new UE.Rotator(0, 0, 0),
        new UE.Vector(0, 0, 0),
        new UE.Vector(1, 1, 1),
      )),
      (this.m1o = CharacterNameDefines_1.CharacterNameDefines.ROOT);
  }
  PlayEffect(e, t, f, c, a) {
    e = EffectUtil_1.EffectUtil.GetEffectPath(e);
    return this.PlayEffectByPath(e, t, f, c, a);
  }
  PlayEffectByPath(e, t, f, c, a) {
    f = EffectSystem_1.EffectSystem.SpawnEffect(
      GlobalData_1.GlobalData.World,
      f ?? this.c1o,
      e,
      "[RoleAnimStateEffectManager.PlayEffect]",
      new EffectContext_1.EffectContext(void 0, t),
      1,
      void 0,
      a,
    );
    EffectSystem_1.EffectSystem.IsValid(f) && this.u1o.push(f);
    let r = c;
    return (
      (r = r || this.m1o),
      EffectSystem_1.EffectSystem.IsValid(f) &&
        EffectSystem_1.EffectSystem.GetEffectActor(f)?.K2_AttachToComponent(
          t,
          r,
          0,
          0,
          0,
          !1,
        ),
      f
    );
  }
  PlayEffectList(t, f, c, a) {
    if (t)
      for (let e = 0; e < t.Num(); e++) {
        var r = t.Get(e);
        this.PlayEffectByPath(r.ToAssetPathName(), f, c, a);
      }
  }
  AttachEffect(e) {
    this.u1o.push(e);
  }
  DestroyEffect() {
    this.u1o &&
      0 !== this.u1o.length &&
      (this.u1o.forEach((e) => {
        EffectSystem_1.EffectSystem.StopEffectById(
          e,
          "[RoleAnimStateEffectManager.RecycleEffect]",
          !0,
        );
      }),
      (this.u1o.length = 0));
  }
  StopEffect(e) {
    EffectSystem_1.EffectSystem.StopEffectById(
      e,
      "[RoleAnimStateEffectManager.StopEffect]",
      !0,
    );
  }
}
exports.UiSceneActorEffectsManagementComponent =
  UiSceneActorEffectsManagementComponent;
//# sourceMappingURL=UiSceneActorEffectsManagementComponent.js.map
