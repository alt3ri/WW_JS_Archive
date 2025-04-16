"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelMultiEffectSpec = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment"),
  EffectModelHelper_1 = require("../Render/Effect/Data/EffectModelHelper"),
  MultiEffectBuffBall_1 = require("../Render/Effect/Data/MultiEffect/MultiEffectBuffBall"),
  CustomMap_1 = require("../World/Define/CustomMap"),
  EffectSpec_1 = require("./EffectSpec/EffectSpec"),
  EffectSystem_1 = require("./EffectSystem");
class EffectModelMultiEffectSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.EffectSpecMap = new CustomMap_1.CustomMap()),
      (this.GroupComponent = void 0),
      (this.MultiEffect = void 0);
  }
  OnInit() {
    var t = this.Handle.GetSureEffectActor(),
      e = this.Handle.Parent,
      e = e ? e.GetEffectSpec()?.GetSceneComponent() : void 0,
      t = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
        t,
        UE.SceneComponent.StaticClass(),
        e,
        void 0,
        !1,
        this.EffectModel,
      );
    return (this.SceneComponent = t), (this.GroupComponent = t), !0;
  }
  OnStart() {
    var t = new Map();
    return (
      0 === this.EffectModel.Type &&
        (t.set("BaseNum", this.EffectModel.BaseNum),
        t.set("SpinSpeed", this.EffectModel.SpinSpeed),
        t.set("Radius", this.EffectModel.Radius),
        (this.MultiEffect = new MultiEffectBuffBall_1.MultiEffectBuffBall()),
        this.MultiEffect.Init(t)),
      !0
    );
  }
  OnTick(t) {
    var e = this.EffectSpecMap.GetItems(),
      f = this.MultiEffect.GetDesiredNum(this.LifeTime.PassTime),
      i =
        (this.AdjustNumber(f),
        this.MultiEffect.Update(t, this.LifeTime.PassTime, e),
        this.Handle.GetSureEffectActor()?.bHidden ?? !1);
    for (const c of e) {
      var s = EffectSystem_1.EffectSystem.GetSureEffectActor(c);
      s?.IsValid() &&
        s.bHidden !== i &&
        EffectSystem_1.EffectSystem.SetEffectHidden(
          c,
          i,
          "EffectModelMultiEffectSpec.Tick",
        );
    }
  }
  OnEnd() {
    return (
      this.GroupComponent.GetOwner().K2_DestroyComponent(this.GroupComponent),
      !0
    );
  }
  OnStop(t) {
    var e = new Array();
    for (const f of this.EffectSpecMap.GetItems())
      EffectSystem_1.EffectSystem.IsValid(f) && e.push(f);
    for (const i of e) EffectSystem_1.EffectSystem.StopEffectById(i, t, !0);
    this.EffectSpecMap.Clear();
  }
  OnClear() {
    for (const t of this.EffectSpecMap.GetItems())
      EffectSystem_1.EffectSystem.IsValid(t) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          t,
          "[EffectModelMultiEffectSpec.OnClear]",
          !0,
        );
    return this.EffectSpecMap.Clear(), !0;
  }
  AdjustNumber(t) {
    var e = this.EffectSpecMap.Size();
    if (e < t) {
      var f = this.Handle.GetSureEffectActor(),
        i = UE.KismetSystemLibrary.GetPathName(
          this.GetEffectModel().EffectData,
        );
      const s = EffectSystem_1.EffectSystem.SpawnEffect(
        f.GetOuter(),
        f.D_GetTransform(),
        i,
        "[EffectModelMultiEffectSpec.EffectModelGroupSpec]",
        this.Handle.GetContext(),
      );
      EffectSystem_1.EffectSystem.IsValid(s) &&
        (this.EffectSpecMap.Set(s, s),
        EffectSystem_1.EffectSystem.AddFinishCallback(s, (t) => {
          this.EffectSpecMap.Remove(t),
            EffectEnvironment_1.EffectEnvironment.OpenTickOptimize &&
              this.Handle &&
              cpp_1.FKuroEffectSystemInterface.RemoveMultiEffect(
                this.Handle.Id,
                s,
              );
        }),
        EffectSystem_1.EffectSystem.GetEffectActor(s).K2_AttachToActor(
          this.Handle.GetSureEffectActor(),
          void 0,
          1,
          1,
          1,
          !1,
        ),
        EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) &&
        this.Handle &&
        cpp_1.FKuroEffectSystemInterface.AddMultiEffect(this.Handle.Id, s);
    } else
      t < e &&
        (i = this.EffectSpecMap.GetByIndex((f = e - 1))) &&
        (this.EffectSpecMap.RemoveByIndex(f),
        EffectSystem_1.EffectSystem.StopEffectById(
          i,
          "[EffectModelMultiEffectSpec.AdjustNumber]",
          !0,
        ),
        EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) &&
        this.Handle &&
        cpp_1.FKuroEffectSystemInterface.RemoveMultiEffect(this.Handle.Id, i);
  }
  IsOverrideTick() {
    return !0;
  }
}
exports.EffectModelMultiEffectSpec = EffectModelMultiEffectSpec;
//# sourceMappingURL=EffectModelMultiEffectSpec.js.map
