"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelTrailSpec = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
  EffectMaterialParameter_1 = require("../../Render/Effect/Data/Parameters/EffectMaterialParameter"),
  SkeletalMeshEffectContext_1 = require("../EffectContext/SkeletalMeshEffectContext"),
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
            Log_1.Log.Error("RenderEffect", 25, "拖尾特效绑定点数量不足", [
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
                25,
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
            Log_1.Log.Error("RenderEffect", 25, "拖尾特效绑定点数量不足", [
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
      this.BezierMeshComp ||
        ((this.BezierMeshComp =
          EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
            this.ParentActor,
            UE.KuroBezierMeshComponent.StaticClass(),
            void 0,
            void 0,
            !1,
            this.EffectModel,
          )),
        (this.SceneComponent = this.BezierMeshComp)),
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
        (this.WorldToParentActor = this.ParentActor.D_GetTransform().Inverse()),
        (this.LocationsCurve = this.EffectModel.LocationsCurve),
        (this.LocationsFromCurve = new Array());
      for (let t = 0; t < this.AttachCount; t++) {
        var e = Vector_1.Vector.Create(0, 0, 0);
        this.LocationsFromCurve.push(e);
      }
      (this.cz = Vector_1.Vector.Create(0, 0, 0)),
        (this.DissipateNum = 0),
        (this.IsDead = !1),
        (this.DissipateLeft = 0);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderEffect",
          25,
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
        var e = this.LocationsCurve.GetKey(t),
          h = this.LocationsCurve.Get(e),
          h = UE.KuroCurveLibrary.GetValue_Vector(
            h,
            this.LifeTime.TotalPassTime,
          );
        this.LocationsFromCurve[e].FromUeVector(h);
      }
      if (
        (this.BezierMeshComp.GetLayerNum() > this.MaxLayerNum &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("RenderEffect", 25, "拖尾特效太长", [
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
        this.BezierMeshComp.SetVisibility(!0),
        this.MaterialParameters.Tick(this.DyMaterial, this.LifeTime.PassTime);
    }
  }
  OnEnd() {
    return (
      this.BezierMeshComp?.GetOwner() &&
        (this.BezierMeshComp.GetOwner().K2_DestroyComponent(
          this.BezierMeshComp,
        ),
        (this.BezierMeshComp = void 0),
        (this.DyMaterial = void 0)),
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
          ? this.SkeletalMeshComp.D_GetSocketTransform(
              this.AttachBoneNames[t],
              0,
            )
          : this.SkeletalMeshComp.D_K2_GetComponentToWorld()),
        this.WorldToParentActor.TransformPosition(
          i.TransformPosition(this.cz.ToUeVector(!0)),
        ))),
      Vector_1.Vector.Create(s)
    );
  }
  OnStop(t, i) {
    this.BezierMeshComp?.ClearData(),
      this.BezierMeshComp?.SetVisibility(!1),
      this.BezierMeshComp?.SetComponentTickEnabled(!1),
      this.SetDead();
  }
  OnPlay(t) {
    var i = this.Handle?.GetContext();
    i &&
      i instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext &&
      i.SkeletalMeshComp &&
      (this.Setup(i.SkeletalMeshComp),
      this.BezierMeshComp?.SetComponentTickEnabled(!0));
  }
  HasMaterialParameters() {
    return !0;
  }
  GetMaterialParameters() {
    return this.MaterialParameters;
  }
  IsOverrideTick() {
    return !0;
  }
  RegisterToKuroEffectSystem() {
    var t, i;
    this.Handle &&
      this.BezierMeshComp &&
      this.EffectModel &&
      this.DyMaterial &&
      (t = this.Handle?.GetContext()) &&
      t instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext &&
      t.SkeletalMeshComp &&
      (i = this.Handle.GetSureEffectActor()) &&
      ((this.HasInitTickOptimize = !0),
      cpp_1.FKuroEffectSystemInterface.RegisterEffectTrailHandle(
        this.Handle.Id,
        this.Handle.Parent?.Id ?? 0,
        this.EffectModel,
        i,
        this.BezierMeshComp,
        t.SkeletalMeshComp,
        this.DyMaterial,
      ));
  }
}
exports.EffectModelTrailSpec = EffectModelTrailSpec;
//# sourceMappingURL=EffectModelTrailSpec.js.map
