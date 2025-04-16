"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueBeamCommonItem = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../../../../Core/Actor/ActorSystem"),
  ResourceSystem_1 = require("../../../../../../../../Core/Resource/ResourceSystem"),
  Rotator_1 = require("../../../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../../../../../GlobalData"),
  RecorderBlueprintFunctionLibrary_1 = require("../../../../../../../Recorder/RecorderBlueprintFunctionLibrary");
class GameplayCueBeamCommonItem {
  constructor(t, e) {
    (this.OQt = t),
      (this.Path = e),
      (this.a$o = void 0),
      (this.h$o = 0),
      (this.dce = !1),
      (this.CurrentPoints = void 0);
  }
  static Spawn(t, e) {
    t = new this(t, e);
    return (t.dce = !0), (t.a$o = t.l$o()), t;
  }
  Tick(e, t) {
    (this.CurrentPoints = e),
      this.a$o
        .GetOwner()
        .D_K2_SetActorLocation(
          this.OQt.D_K2_GetActorLocation(),
          !1,
          void 0,
          !0,
        );
    var r = e.length;
    r !== this.h$o && this._$o(r);
    for (let t = 0; t < r; t++) this.a$o.D_SetLocationAtSplinePoint(t, e[t], 1);
  }
  Destroy() {
    RecorderBlueprintFunctionLibrary_1.default.Recording &&
      RecorderBlueprintFunctionLibrary_1.default.StopRecordGameplayCueHook(
        this,
      ),
      (this.dce = !1),
      this.a$o.GetOwner() &&
        ActorSystem_1.ActorSystem.Put(
          "GameplayCueBeamCommonItem.Destroy",
          this.a$o.GetOwner(),
        );
  }
  GetOwner() {
    return this.a$o.GetOwner();
  }
  l$o() {
    const r = ActorSystem_1.ActorSystem.Get(
        UE.Actor.StaticClass(),
        this.OQt.D_GetTransform(),
      ),
      i =
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
      i.ClearSplinePoints(),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.Path,
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
              i,
            ),
            RecorderBlueprintFunctionLibrary_1.default.Recording) &&
            RecorderBlueprintFunctionLibrary_1.default.StartRecordGameplayCueHook(
              r,
              this,
            );
        },
      ),
      i
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
