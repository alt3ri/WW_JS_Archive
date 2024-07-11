"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelMultiEffectSpec = void 0);
const UE = require("ue");
const EffectModelHelper_1 = require("../Render/Effect/Data/EffectModelHelper");
const MultiEffectBuffBall_1 = require("../Render/Effect/Data/MultiEffect/MultiEffectBuffBall");
const CustomMap_1 = require("../World/Define/CustomMap");
const EffectSpec_1 = require("./EffectSpec/EffectSpec");
const EffectSystem_1 = require("./EffectSystem");
class EffectModelMultiEffectSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.EffectSpecMap = new CustomMap_1.CustomMap()),
      (this.GroupComponent = void 0),
      (this.MultiEffect = void 0);
  }
  OnInit() {
    var t = this.Handle.GetSureEffectActor();
    var e = this.Handle.Parent;
    var e = e ? e.GetEffectSpec()?.GetSceneComponent() : void 0;
    var t = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
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
    const t = new Map();
    return (
      this.EffectModel.Type === 0 &&
        (t.set("BaseNum", this.EffectModel.BaseNum),
        t.set("SpinSpeed", this.EffectModel.SpinSpeed),
        t.set("Radius", this.EffectModel.Radius),
        (this.MultiEffect = new MultiEffectBuffBall_1.MultiEffectBuffBall()),
        this.MultiEffect.Init(t)),
      !0
    );
  }
  OnTick(t) {
    const e = this.EffectSpecMap.GetItems();
    const f = this.MultiEffect.GetDesiredNum(this.LifeTime.PassTime);
    const s =
      (this.AdjustNumber(f),
      this.MultiEffect.Update(t, this.LifeTime.PassTime, e),
      this.Handle.GetSureEffectActor()?.bHidden ?? !1);
    for (const c of e) {
      const i = EffectSystem_1.EffectSystem.GetSureEffectActor(c);
      i?.IsValid() && i.bHidden !== s && i.SetActorHiddenInGame(s);
    }
  }
  OnEnd() {
    return (
      this.GroupComponent.GetOwner().K2_DestroyComponent(this.GroupComponent),
      !0
    );
  }
  OnStop(t) {
    const e = new Array();
    for (const f of this.EffectSpecMap.GetItems())
      EffectSystem_1.EffectSystem.IsValid(f) && e.push(f);
    for (const s of e) EffectSystem_1.EffectSystem.StopEffectById(s, t, !0);
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
    let e;
    let f;
    const s = this.EffectSpecMap.Size();
    s < t
      ? ((f = this.Handle.GetSureEffectActor()),
        (e = UE.KismetSystemLibrary.GetPathName(
          this.GetEffectModel().EffectData,
        )),
        (f = EffectSystem_1.EffectSystem.SpawnEffect(
          f.GetOuter(),
          f.GetTransform(),
          e,
          "[EffectModelMultiEffectSpec.EffectModelGroupSpec]",
          this.Handle.GetContext(),
        )),
        EffectSystem_1.EffectSystem.IsValid(f) &&
          (this.EffectSpecMap.Set(f, f),
          EffectSystem_1.EffectSystem.AddFinishCallback(f, (t) => {
            this.EffectSpecMap.Remove(t);
          }),
          EffectSystem_1.EffectSystem.GetEffectActor(f).K2_AttachToActor(
            this.Handle.GetSureEffectActor(),
            void 0,
            1,
            1,
            1,
            !1,
          )))
      : t < s &&
        (f = this.EffectSpecMap.GetByIndex((e = s - 1))) &&
        (this.EffectSpecMap.RemoveByIndex(e),
        EffectSystem_1.EffectSystem.StopEffectById(
          f,
          "[EffectModelMultiEffectSpec.AdjustNumber]",
          !0,
        ));
  }
}
exports.EffectModelMultiEffectSpec = EffectModelMultiEffectSpec;
// # sourceMappingURL=EffectModelMultiEffectSpec.js.map
