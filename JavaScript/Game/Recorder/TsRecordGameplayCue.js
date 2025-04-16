"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../GlobalData"),
  tmpVector = Vector_1.Vector.Create(),
  tmpVector2 = Vector_1.Vector.Create();
class TsRecordGameplayCue extends UE.KuroRecordEffect {
  constructor() {
    super(...arguments),
      (this.Path = ""),
      (this.Position0 = new UE.Vector()),
      (this.BeamData = void 0),
      (this.CurrentTime = 0),
      (this.CurrentIndex = 0),
      (this.SplineComponent = void 0);
  }
  Constructor() {
    (this.CurrentTime = 0),
      (this.CurrentIndex = 0),
      (this.SplineComponent = void 0);
  }
  ReceiveBeginPlay() {
    this.SetActorTickEnabled(!1);
  }
  ReceiveEndPlay(t) {
    this.OnStop();
  }
  OnPlay() {
    this.SpawnHookActorRecord();
  }
  OnStop() {
    var e = this.K2_GetComponentsByClass(UE.NiagaraComponent.StaticClass());
    for (let t = e.Num() - 1; 0 <= t; --t) this.K2_DestroyComponent(e.Get(t));
    this.SetActorTickEnabled(!1);
  }
  ReceiveTick(t) {
    if (((this.CurrentTime += t), this.BeamData)) {
      var e = this.BeamData.TimeLine.Num();
      if (!(e < 1)) {
        for (
          ;
          this.CurrentIndex < e &&
          this.BeamData.TimeLine.Get(this.CurrentIndex) < this.CurrentTime;

        )
          ++this.CurrentIndex;
        var i,
          s,
          r,
          t = this.BeamData.PointPositions.Get(this.CurrentIndex);
        this.BeamData.TimeLine.Get(this.CurrentIndex) < this.CurrentTime
          ? this.SetSpline(1, t, t)
          : 1 < this.CurrentIndex &&
            ((i = this.BeamData.PointPositions.Get(this.CurrentIndex - 1)),
            (s = this.BeamData.TimeLine.Get(this.CurrentIndex - 1)),
            (r = this.BeamData.TimeLine.Get(this.CurrentIndex)),
            this.SetSpline((this.CurrentTime - s) / (r - s), i, t));
      }
    }
  }
  SpawnHookActorRecord() {
    var t,
      e = ResourceSystem_1.ResourceSystem.Load(this.Path, UE.NiagaraSystem);
    e?.IsValid() &&
      this.IsValid() &&
      ((t = this.AddComponentByClass(
        UE.NiagaraComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      )).SetAsset(e),
      this.BeamData
        ? (this.SetActorTickEnabled(!0),
          (this.SplineComponent = this.AddComponentByClass(
            UE.SplineComponent.StaticClass(),
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
          )),
          this.SplineComponent.ClearSplinePoints(),
          UE.KuroRenderingRuntimeBPPluginBPLibrary.SetNiagaraSplineComponent(
            t,
            "NewSpline",
            this.SplineComponent,
          ))
        : (this.SetActorTickEnabled(!1),
          (e = UE.KismetMathLibrary.WD_WorldToLocal(
            GlobalData_1.GlobalData.World,
            new UE.VectorDouble(this.Position0),
          )),
          t.SetNiagaraVariableVec3("End", e)));
  }
  SetSpline(e, i, s) {
    if (this.SplineComponent) {
      var r = this.SplineComponent.GetNumberOfSplinePoints(),
        h = i.Vectors.Num(),
        o = s.Vectors.Num();
      if (0 !== h && 0 !== o) {
        var a = Math.max(h, o);
        if (r < a)
          for (let t = r; t < a; ++t) {
            var c = t,
              c = new UE.SplinePoint(
                c,
                Vector_1.Vector.ZeroVector,
                Vector_1.Vector.ZeroVector,
                Vector_1.Vector.ZeroVector,
                Rotator_1.Rotator.ZeroRotator,
                Vector_1.Vector.OneVector,
                0,
              );
            this.SplineComponent.AddPoint(c);
          }
        else if (a < r)
          for (let t = r - 1; t >= a; --t)
            this.SplineComponent.RemoveSplinePoint(t);
        for (let t = 0; t < a; ++t)
          tmpVector.FromUeVector(i.Vectors.Get(Math.min(t, h - 1))),
            tmpVector2.FromUeVector(s.Vectors.Get(Math.min(t, o - 1))),
            Vector_1.Vector.Lerp(tmpVector, tmpVector2, e, tmpVector),
            this.SplineComponent.D_SetLocationAtSplinePoint(
              t,
              tmpVector.ToUeVector(),
              1,
            );
      }
    }
  }
}
exports.default = TsRecordGameplayCue;
//# sourceMappingURL=TsRecordGameplayCue.js.map
