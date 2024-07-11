"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelGhostSpec = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
  EffectSpec_1 = require("./EffectSpec");
class GhostElement {
  constructor(e, t) {
    (this.Name = void 0),
      (this.PoseComponent = void 0),
      (this.Name = e),
      (this.PoseComponent = t);
  }
}
class EffectModelGhostSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.n0e = []),
      (this.s0e = new Map()),
      (this.a0e = new Map()),
      (this.h0e = void 0),
      (this.l0e = 0),
      (this._0e = 0),
      (this.u0e = void 0);
  }
  OnInit() {
    return (this._0e = 1), (this.u0e = this.EffectModel.MaterialRef), !0;
  }
  OnPlay() {
    (this.l0e = -999),
      (this.h0e = this.Handle.GetContext()),
      this.h0e
        ? this.h0e.SkeletalMeshComp
          ? (this.h0e.UseSpawnRate
              ? (this._0e = 1 / Math.max(this.h0e.SpawnRate, 1e-6))
              : (this._0e = this.h0e.SpawnInterval),
            this.CollectSkeletalMesh(this.h0e.SkeletalMeshComp))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "RenderEffect",
              26,
              "残影EffectContext缺少SkeletalMesh组件",
            )
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("RenderEffect", 26, "残影EffectContext类型错误");
  }
  static GetComponentName(e) {
    switch (e) {
      case 0:
        return EffectModelGhostSpec.BodyName;
      case 1:
        return EffectModelGhostSpec.WeaponCase0Name;
      case 2:
        return EffectModelGhostSpec.WeaponCase1Name;
      case 3:
        return EffectModelGhostSpec.WeaponCase2Name;
      case 4:
        return EffectModelGhostSpec.WeaponCase3Name;
      case 5:
        return EffectModelGhostSpec.WeaponCase4Name;
      case 6:
        return EffectModelGhostSpec.HuluCaseName;
      case 7:
        return EffectModelGhostSpec.OtherCase0Name;
      case 8:
        return EffectModelGhostSpec.OtherCase1Name;
      case 9:
        return EffectModelGhostSpec.OtherCase2Name;
      case 10:
        return EffectModelGhostSpec.OtherCase3Name;
      case 11:
        return EffectModelGhostSpec.OtherCase4Name;
      case 12:
        return;
    }
  }
  CollectSkeletalMesh(t) {
    var e = t.GetOwner();
    if (e) {
      var s = e.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass()),
        o = s.Num(),
        c = new Map();
      for (let e = 0; e < o; e++) {
        var f = s.Get(e);
        f && f !== t && c.set(f.GetName(), f);
      }
      var h = this.EffectModel.MeshComponentsToUse.Num();
      for (let e = 0; e < h; ++e) {
        var r,
          i = this.EffectModel.MeshComponentsToUse.Get(e);
        0 === i
          ? this.a0e.set(t, EffectModelGhostSpec.GetComponentName(i))
          : ((i = EffectModelGhostSpec.GetComponentName(i)),
            (r = c.get(i))
              ? this.a0e.set(r, i)
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("RenderEffect", 26, "残影获取Skeletal失败", [
                  "name",
                  i,
                ]));
      }
      var a = this.EffectModel.CustomComponentNames.Num();
      for (let e = 0; e < a; ++e) {
        var n = this.EffectModel.CustomComponentNames.Get(e).toString(),
          l = c.get(n);
        l
          ? this.a0e.set(l, n)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("RenderEffect", 26, "残影获取Skeletal失败", [
              "name",
              n,
            ]);
      }
      for (const p of this.a0e.values()) this.s0e.set(p, []);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderEffect", 26, "残影获取Actor失败");
  }
  OnTick(e) {
    var t;
    this.c0e(),
      !this.Handle.IsPlaying() ||
        this.Handle.IsStopping() ||
        (t = this._0e) < 0 ||
        (this.LifeTime.TotalPassTime - this.l0e >= t && this.m0e());
  }
  OnCanStop() {
    return !this.n0e || 0 === this.n0e.length;
  }
  XAr() {
    for (const e of this.n0e)
      for (const t of e[0])
        t.PoseComponent.K2_DestroyComponent(t.PoseComponent);
    this.n0e.length = 0;
    for (const s of this.s0e.values())
      for (const o of s) o.K2_DestroyComponent(o);
    this.s0e.clear(), this.a0e.clear(), (this.h0e = void 0);
  }
  OnStop(e, t) {
    t && this.XAr();
  }
  m0e() {
    var e = [];
    for (const h of this.a0e.keys())
      if (h && h.IsVisible() && !h.bHiddenInGame) {
        var s = this.a0e.get(h);
        let t = void 0;
        var o = this.s0e.get(s);
        if (o.length)
          (t = o.pop()).SetComponentTickEnabled(!1),
            t.SetVisibility(!0),
            t.Activate(!0);
        else {
          (t = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
            this.Handle.GetSureEffectActor(),
            UE.PoseableMeshComponent.StaticClass(),
            void 0,
            void 0,
            !1,
            this.EffectModel,
          )).SetSkeletalMesh(h.SkeletalMesh, !1),
            t.SetLODBias(3);
          var c = this.u0e;
          for (let e = 0; e < t.GetNumMaterials(); e++) t.SetMaterial(e, c);
        }
        o = h.K2_GetComponentToWorld();
        t.K2_SetWorldTransform(o, !1, void 0, !0),
          t.CopyPoseFromSkeletalComponent(h),
          t.SetCustomPrimitiveDataFloat(0, 1),
          e.push(new GhostElement(s, t));
      }
    var t = this.h0e.GhostLifeTime,
      f = this.LifeTime.TotalPassTime;
    this.n0e.push([e, f + t]), (this.l0e = f);
  }
  c0e() {
    let e = 0;
    for (const o of this.n0e) {
      var t = o[1];
      if (t >= this.LifeTime.TotalPassTime) {
        var t = (t - this.LifeTime.TotalPassTime) / this.h0e.GhostLifeTime,
          s = UE.KuroCurveLibrary.GetValue_Float(
            this.EffectModel.AlphaCurve,
            t,
          );
        for (const c of o[0]) c.PoseComponent.SetCustomPrimitiveDataFloat(0, s);
      } else {
        for (const f of o[0])
          f.PoseComponent.Deactivate(),
            f.PoseComponent.SetVisibility(!1),
            f.PoseComponent.SetComponentTickEnabled(!1),
            this.s0e.get(f.Name).push(f.PoseComponent);
        e++;
      }
    }
    0 < e && this.n0e.splice(0, e);
  }
}
((exports.EffectModelGhostSpec = EffectModelGhostSpec).BodyName = "Body"),
  (EffectModelGhostSpec.WeaponCase0Name = "WeaponCase0"),
  (EffectModelGhostSpec.WeaponCase1Name = "WeaponCase1"),
  (EffectModelGhostSpec.WeaponCase2Name = "WeaponCase2"),
  (EffectModelGhostSpec.WeaponCase3Name = "WeaponCase3"),
  (EffectModelGhostSpec.WeaponCase4Name = "WeaponCase4"),
  (EffectModelGhostSpec.HuluCaseName = "HuluCase"),
  (EffectModelGhostSpec.OtherCase0Name = "OtherCase0"),
  (EffectModelGhostSpec.OtherCase1Name = "OtherCase1"),
  (EffectModelGhostSpec.OtherCase2Name = "OtherCase2"),
  (EffectModelGhostSpec.OtherCase3Name = "OtherCase3"),
  (EffectModelGhostSpec.OtherCase4Name = "OtherCase4");
//# sourceMappingURL=EffectModelGhostSpec.js.map
