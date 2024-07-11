"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelTrailSpec = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
  EffectMaterialParameter_1 = require("../../Render/Effect/Data/Parameters/EffectMaterialParameter"),
  EffectSpec_1 = require("./EffectSpec");
class EffectModelTrailSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.ParentActor = void 0),
      (this.AttachCount = 0),
      (this.SkeletalMeshComp = void 0),
      (this.WorldToParentActor = void 0),
      (this.UseBones = !1),
      (this.AttachBoneNames = void 0),
      (this.AttachLocations = void 0),
      (this.UnitLength = 0),
      (this.LocationsCurve = void 0),
      (this.DissipateNum = 0),
      (this.IsDead = !1),
      (this.LastSubdivision = 0),
      (this.DissipateLeft = 0),
      (this.LocationsFromCurve = void 0),
      (this.DyMaterial = void 0),
      (this.MaterialParameters = void 0),
      (this.BezierMeshComp = void 0),
      (this.t0e = !1),
      (this.MaxSubdivision = 12),
      (this.MaxMeshLength = 100),
      (this.MaxLayerNum = 600),
      (this.cz = void 0);
  }
  OnCanStop() {
    return !0;
  }
  OnInit() {
    return (this.ParentActor = this.Handle.GetSureEffectActor()), !0;
  }
  Setup(t) {
    if (((this.SkeletalMeshComp = t), this.SkeletalMeshComp)) {
      if (this.EffectModel.AttachToBones) {
        if (
          ((this.UseBones = !0),
          (this.AttachCount = this.EffectModel.AttachBoneNames.Num()),
          this.AttachCount < 2)
        )
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("RenderEffect", 26, "拖尾特效绑定点数量不足", [
              "DA文件",
              this.EffectModel.GetName(),
            ])
          );
        (this.AttachBoneNames = new Array()),
          (this.AttachLocations = new Array());
        for (let i = 0; i < this.AttachCount; i++) {
          var s = this.EffectModel.AttachBoneNames.Get(i);
          let t = Vector_1.Vector.Create(0, 0, 0);
          if (
            (this.EffectModel.RelativeLocations.Num() > i &&
              (t = Vector_1.Vector.Create(
                this.EffectModel.RelativeLocations.Get(i),
              )),
            !this.SkeletalMeshComp.DoesSocketExist(s))
          )
            return void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderEffect",
                26,
                "拖尾特效找不到插槽",
                ["DA文件", this.EffectModel.GetName()],
                ["网格体", this.SkeletalMeshComp.GetName()],
                ["插槽名", s],
              )
            );
          this.AttachBoneNames.push(s), this.AttachLocations.push(t);
        }
      } else {
        if (
          ((this.UseBones = !1),
          (this.AttachCount = this.EffectModel.RelativeLocations.Num()),
          this.AttachCount < 2)
        )
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("RenderEffect", 26, "拖尾特效绑定点数量不足", [
              "DA文件",
              this.EffectModel.GetName(),
            ])
          );
        this.AttachLocations = new Array();
        for (let t = 0; t < this.AttachCount; t++) {
          var i = Vector_1.Vector.Create(
            this.EffectModel.RelativeLocations.Get(t),
          );
          this.AttachLocations.push(i);
        }
      }
      (this.BezierMeshComp =
        EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
          this.ParentActor,
          UE.KuroBezierMeshComponent.StaticClass(),
          void 0,
          void 0,
          !1,
          this.EffectModel,
        )),
        (this.SceneComponent = this.BezierMeshComp),
        (this.t0e = this.BezierMeshComp.IsComponentTickEnabled()),
        this.BezierMeshComp.SetComponentTickEnabled(!1),
        (this.DyMaterial =
          UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
            this.BezierMeshComp,
            this.EffectModel.Material,
          )),
        this.BezierMeshComp.SetMaterial(0, this.DyMaterial),
        (this.MaterialParameters = new EffectMaterialParameter_1.default(
          this.EffectModel.FloatParameters,
          this.EffectModel.ColorParameters,
        )),
        this.MaterialParameters.Apply(this.DyMaterial, 0, !0),
        this.BezierMeshComp.Setup(
          this.AttachCount,
          this.EffectModel.UnitLength,
        ),
        (this.WorldToParentActor = this.ParentActor.GetTransform().Inverse()),
        (this.LocationsCurve = this.EffectModel.LocationsCurve),
        (this.LocationsFromCurve = new Array());
      for (let t = 0; t < this.AttachCount; t++) {
        var h = Vector_1.Vector.Create(0, 0, 0);
        this.LocationsFromCurve.push(h);
      }
      (this.cz = Vector_1.Vector.Create(0, 0, 0)),
        (this.DissipateNum = 0),
        (this.IsDead = !1),
        (this.DissipateLeft = 0);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderEffect",
          26,
          "拖尾特效错误：没有寻找到骨骼模型",
          ["DA文件", this.EffectModel.GetName()],
        );
  }
  OnTick() {
    if (this.BezierMeshComp) {
      this.IsDead ||
        this.SkeletalMeshComp?.IsValid() ||
        this.Stop("[EffectModelTrailSpec.OnTick]", !1);
      var s = this.LocationsCurve.Num();
      for (let t = 0; t < s; t++) {
        var h = this.LocationsCurve.GetKey(t),
          e = this.LocationsCurve.Get(h),
          e = UE.KuroCurveLibrary.GetValue_Vector(
            e,
            this.LifeTime.TotalPassTime,
          );
        this.LocationsFromCurve[h].FromUeVector(e);
      }
      if (
        (this.BezierMeshComp.GetLayerNum() > this.MaxLayerNum &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("RenderEffect", 26, "拖尾特效太长", [
              "特效名",
              this.EffectModel.GetName(),
            ]),
          this.SetDead()),
        !this.IsDead)
      ) {
        for (let t = 0; t < this.AttachCount; t++) {
          var r = this.GetAttachLocation(t);
          this.BezierMeshComp.SetKeyPoint(t, r.X, r.Y, r.Z);
        }
        var o = UE.KuroCurveLibrary.GetValue_Float(
          this.EffectModel.Alpha,
          this.LifeTime.TotalPassTime,
        );
        this.BezierMeshComp.AddLayer(o);
      }
      let t = 0,
        i =
          ((t = this.IsDead
            ? this.EffectModel.DissipateSpeedAfterDead
            : UE.KuroCurveLibrary.GetValue_Float(
                this.EffectModel.DissipateSpeed,
                this.LifeTime.TotalPassTime,
              )),
          this.Handle.GetIgnoreTimeScale() ||
            (t = t * this.GetTimeScale() * this.GetGlobalTimeScale()),
          (t += this.DissipateLeft),
          Math.floor(t));
      this.DissipateLeft = t - i;
      o = this.BezierMeshComp.GetMeshHeight() - this.MaxMeshLength;
      o > i && ((i = o), (this.DissipateLeft = 0)),
        this.BezierMeshComp.Dissipate(i),
        this.BezierMeshComp.UpdateMesh(0),
        this.MaterialParameters.Apply(
          this.DyMaterial,
          this.LifeTime.PassTime,
          !1,
        );
    }
  }
  OnEnd() {
    return (
      this.BezierMeshComp?.GetOwner() &&
        this.BezierMeshComp.GetOwner().K2_DestroyComponent(this.BezierMeshComp),
      !0
    );
  }
  SetDead() {
    this.IsDead = !0;
  }
  ShouldDestroy() {
    return (
      !this.BezierMeshComp ||
      !(
        !this.IsDead ||
        (!this.EffectModel.DestroyAtOnce &&
          0 !== this.BezierMeshComp.GetMeshHeight())
      )
    );
  }
  GetAttachLocation(t) {
    let i = void 0,
      s = void 0;
    return (
      this.AttachLocations[t].Addition(this.LocationsFromCurve[t], this.cz),
      (s =
        ((i = this.UseBones
          ? this.SkeletalMeshComp.GetSocketTransform(this.AttachBoneNames[t], 0)
          : this.SkeletalMeshComp.K2_GetComponentToWorld()),
        this.WorldToParentActor.TransformPosition(
          i.TransformPosition(this.cz.ToUeVector(!0)),
        ))),
      Vector_1.Vector.Create(s)
    );
  }
  OnStop(t, i) {
    this.BezierMeshComp?.SetComponentTickEnabled(!1), this.SetDead();
  }
  OnPlay(t) {
    this.BezierMeshComp?.SetComponentTickEnabled(this.t0e);
  }
}
exports.EffectModelTrailSpec = EffectModelTrailSpec;
//# sourceMappingURL=EffectModelTrailSpec.js.map
