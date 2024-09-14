"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  actorAnsMap = new Map();
class TsAnimNotifyStateHideMesh extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.ChildMeshName = ""),
      (this.HideChildren = !0),
      (this.HideChildrenActors = !0),
      (this.EndEffect = void 0),
      (this.Hide = !0);
  }
  K2_NotifyBegin(t, r, e) {
    var s = t.GetOwner();
    if (!s) return !1;
    let i = void 0;
    if (this.ChildMeshName) {
      var a = s.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
      for (let t = a.Num() - 1; 0 <= t; --t) {
        var o = a.Get(t);
        if (o.GetName() === this.ChildMeshName) {
          i = o;
          break;
        }
      }
    } else i = t;
    if (!i) return !1;
    let n = actorAnsMap.get(s);
    n || ((n = new Map()), actorAnsMap.set(s, n));
    var h = n.get(this);
    if (h)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Test",
            6,
            "TsAnimNotifyStateHideMesh Error.",
            ["Mesh", t?.GetName()],
            ["Anim", r?.GetName()],
          ),
        !1
      );
    if (
      (((h = [void 0, new Array()])[0] = i).SetVisibility(
        !this.Hide,
        this.HideChildren,
      ),
      this.HideChildrenActors)
    ) {
      if (this.ChildMeshName) {
        var f = i.AttachChildren;
        for (let t = f.Num() - 1; 0 <= t; --t) {
          var u = f.Get(t).GetOwner();
          u.bHidden || h[1].push(u);
        }
      } else {
        var t = (0, puerts_1.$ref)(void 0),
          c = (s.GetAllChildActors(t, !0), (0, puerts_1.$unref)(t));
        for (let t = c.Num() - 1; 0 <= t; --t) {
          var v = c.Get(t);
          v.bHidden || h[1].push(v);
        }
      }
      for (const p of h[1]) p.SetActorHiddenInGame(this.Hide);
    }
    return (
      n.set(this, h),
      s instanceof TsBaseCharacter_1.default &&
        s.CharacterActorComponent?.Entity?.GetComponent(
          163,
        )?.StartForceDisableAnimOptimization(2, !1),
      !0
    );
  }
  K2_NotifyEnd(t, r) {
    t = t.GetOwner();
    if (!t) return !1;
    var e = actorAnsMap.get(t);
    if (!e) return !1;
    var s = e.get(this);
    if (!s) return !1;
    if (
      (s[0].SetVisibility(this.Hide, this.HideChildren),
      this.HideChildrenActors)
    )
      for (const i of s[1]) i.SetActorHiddenInGame(!this.Hide);
    return (
      e.delete(this),
      0 === e.size && actorAnsMap.delete(t),
      this.EndEffect &&
        t
          .GetComponentByClass(UE.CharRenderingComponent_C.StaticClass())
          ?.AddMaterialControllerData(this.EndEffect),
      t instanceof TsBaseCharacter_1.default &&
        t.CharacterActorComponent?.Entity?.GetComponent(
          163,
        )?.CancelForceDisableAnimOptimization(2),
      !0
    );
  }
  GetNotifyName() {
    return "隐藏网格体";
  }
}
exports.default = TsAnimNotifyStateHideMesh;
//# sourceMappingURL=TsAnimNotifyStateHideMesh.js.map
