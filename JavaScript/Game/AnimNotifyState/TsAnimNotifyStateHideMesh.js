"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const actorAnsMap = new Map();
class TsAnimNotifyStateHideMesh extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.ChildMeshName = ""),
      (this.HideChildren = !0),
      (this.HideChildrenActors = !0),
      (this.EndEffect = void 0),
      (this.Hide = !0),
      (this.AnimDefaultTickOption = void 0);
  }
  K2_NotifyBegin(t, r, e) {
    const s = t.GetOwner();
    if (!s) return !1;
    let i = void 0;
    if (this.ChildMeshName) {
      const a = s.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
      for (let t = a.Num() - 1; t >= 0; --t) {
        const o = a.Get(t);
        if (o.GetName() === this.ChildMeshName) {
          i = o;
          break;
        }
      }
    } else i = t;
    if (!i) return !1;
    let h = actorAnsMap.get(s);
    h || ((h = new Map()), actorAnsMap.set(s, h));
    let n = h.get(this);
    if (n)
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
      (((n = [void 0, new Array()])[0] = i).SetVisibility(
        !this.Hide,
        this.HideChildren,
      ),
      this.HideChildrenActors)
    ) {
      if (this.ChildMeshName) {
        const f = i.AttachChildren;
        for (let t = f.Num() - 1; t >= 0; --t) {
          const u = f.Get(t).GetOwner();
          u.bHidden || n[1].push(u);
        }
      } else {
        var t = (0, puerts_1.$ref)(void 0);
        const c = (s.GetAllChildActors(t, !0), (0, puerts_1.$unref)(t));
        for (let t = c.Num() - 1; t >= 0; --t) {
          const v = c.Get(t);
          v.bHidden || n[1].push(v);
        }
      }
      for (const p of n[1]) p.SetActorHiddenInGame(this.Hide);
    }
    return (
      h.set(this, n),
      s instanceof TsBaseCharacter_1.default &&
        ((r = s.CharacterActorComponent?.Entity?.GetComponent(160)),
        (this.AnimDefaultTickOption = r?.GetAnimDefaultTickOption()),
        r?.ChangeAnimDefaultTickOption(1)),
      !0
    );
  }
  K2_NotifyEnd(t, r) {
    t = t.GetOwner();
    if (!t) return !1;
    const e = actorAnsMap.get(t);
    if (!e) return !1;
    let s = e.get(this);
    if (!s) return !1;
    if (
      (s[0].SetVisibility(this.Hide, this.HideChildren),
      this.HideChildrenActors)
    )
      for (const i of s[1]) i.SetActorHiddenInGame(!this.Hide);
    return (
      e.delete(this),
      e.size === 0 && actorAnsMap.delete(t),
      this.EndEffect &&
        t
          .GetComponentByClass(UE.CharRenderingComponent_C.StaticClass())
          ?.AddMaterialControllerData(this.EndEffect),
      t instanceof TsBaseCharacter_1.default &&
        ((s = t.CharacterActorComponent?.Entity?.GetComponent(160)),
        this.AnimDefaultTickOption) &&
        (s?.ChangeAnimDefaultTickOption(this.AnimDefaultTickOption),
        (this.AnimDefaultTickOption = void 0)),
      !0
    );
  }
  GetNotifyName() {
    return "隐藏网格体";
  }
}
exports.default = TsAnimNotifyStateHideMesh;
// # sourceMappingURL=TsAnimNotifyStateHideMesh.js.map
