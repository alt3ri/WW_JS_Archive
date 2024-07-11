"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueBeamCommonItem = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../../../../Core/Actor/ActorSystem"),
  ResourceSystem_1 = require("../../../../../../../../Core/Resource/ResourceSystem"),
  Rotator_1 = require("../../../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../../../../../GlobalData");
class GameplayCueBeamCommonItem {
  constructor(t, e) {
    (this.OQt = t),
      (this.n8 = e),
      (this.a$o = void 0),
      (this.h$o = 0),
      (this.dce = !1);
  }
  static Spawn(t, e) {
    t = new this(t, e);
    return (t.dce = !0), (t.a$o = t.l$o()), t;
  }
  Tick(e, t) {
    this.a$o
      .GetOwner()
      .K2_SetActorLocation(this.OQt.K2_GetActorLocation(), !1, void 0, !0);
    var r = e.length;
    r !== this.h$o && this._$o(r);
    for (let t = 0; t < r; t++) this.a$o.SetWorldLocationAtSplinePoint(t, e[t]);
  }
  Destroy() {
    (this.dce = !1),
      this.a$o.GetOwner() && ActorSystem_1.ActorSystem.Put(this.a$o.GetOwner());
  }
  GetOwner() {
    return this.a$o.GetOwner();
  }
  l$o() {
    const r = ActorSystem_1.ActorSystem.Get(
        UE.Actor.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      ),
      s =
        (GlobalData_1.GlobalData.IsPlayInEditor &&
          r.SetActorLabel(
            this.OQt.GetActorLabel() + ":" + GameplayCueBeamCommonItem.name,
          ),
        r.AddComponentByClass(
          UE.SplineComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        ));
    return (
      s.ClearSplinePoints(),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.n8,
        UE.NiagaraSystem,
        (t) => {
          var e;
          this.dce &&
            t?.IsValid() &&
            r?.IsValid() &&
            ((e = r.AddComponentByClass(
              UE.NiagaraComponent.StaticClass(),
              !1,
              MathUtils_1.MathUtils.DefaultTransform,
              !1,
            )).SetAsset(t),
            UE.KuroRenderingRuntimeBPPluginBPLibrary.SetNiagaraSplineComponent(
              e,
              "NewSpline",
              s,
            ));
        },
      ),
      s
    );
  }
  _$o(e) {
    if (e > this.h$o)
      for (let t = 0; t < e - this.h$o; t++) {
        var r = this.h$o + t,
          r = new UE.SplinePoint(
            r,
            Vector_1.Vector.ZeroVector,
            Vector_1.Vector.ZeroVector,
            Vector_1.Vector.ZeroVector,
            Rotator_1.Rotator.ZeroRotator,
            Vector_1.Vector.OneVector,
            0,
          );
        this.a$o.AddPoint(r);
      }
    else for (let t = this.h$o - 1; t >= e; t--) this.a$o.RemoveSplinePoint(t);
    this.h$o = e;
  }
}
exports.GameplayCueBeamCommonItem = GameplayCueBeamCommonItem;
//# sourceMappingURL=GameplayCueBeamCommonItem.js.map
