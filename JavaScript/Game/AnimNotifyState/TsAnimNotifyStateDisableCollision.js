"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const disableComponentCounts = new Map();
class TsAnimNotifyStateDisableCollision extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.Id = 1), (this.DisableNames = void 0);
  }
  K2_NotifyBegin(e, o) {
    e = e.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    const t = e.CharacterActorComponent.Entity.Id;
    let r = disableComponentCounts.get(t);
    r || ((r = new Map()), disableComponentCounts.set(t, r));
    const a = e.K2_GetComponentsByClass(UE.PrimitiveComponent.StaticClass());
    const s = new Map();
    for (let e = a.Num() - 1; e >= 0; --e) {
      const n = a.Get(e);
      s.set(n.GetName(), n);
    }
    const i = this.DisableNames.Num();
    for (let e = 0; e < i; ++e) {
      const l = this.DisableNames.Get(e).toString();
      const C = r.get(l);
      C
        ? r.set(l, C + 1)
        : (s.get(l)?.SetCollisionEnabled(0),
          r.set(l, 1),
          Log_1.Log.CheckWarn() && Log_1.Log.Warn("Test", 6, "Found"));
    }
    return !0;
  }
  K2_NotifyEnd(e, o) {
    e = e.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    const t = e.CharacterActorComponent.Entity.Id;
    const r = disableComponentCounts.get(t);
    if (r) {
      const a = e.K2_GetComponentsByClass(UE.PrimitiveComponent.StaticClass());
      const s = new Map();
      for (let e = a.Num() - 1; e >= 0; --e) {
        const n = a.Get(e);
        s.set(n.GetName(), n);
      }
      const i = this.DisableNames.Num();
      for (let e = 0; e < i; ++e) {
        const l = this.DisableNames.Get(e).toString();
        const C = r.get(l);
        C
          ? C === 1
            ? (s.get(l)?.SetCollisionEnabled(3), r.delete(l))
            : r.set(l, C - 1)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              6,
              "Impossible Error! No oldValue",
              ["animation", o.GetName()],
              ["CollisionName", l],
            );
      }
      r.size === 0 && disableComponentCounts.delete(t);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          6,
          "Impossible Error! No componentCounts",
          ["animation", o.GetName()],
        );
    return !0;
  }
  GetNotifyName() {
    return "禁用组件碰撞";
  }
}
exports.default = TsAnimNotifyStateDisableCollision;
// # sourceMappingURL=TsAnimNotifyStateDisableCollision.js.map
