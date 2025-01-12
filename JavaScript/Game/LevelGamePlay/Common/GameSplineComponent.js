"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSplineComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  AiPatrolController_1 = require("../../AI/Controller/AiPatrolController"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SAMPLE_ANGLE_LIMIT = 15,
  SAMPLE_STEP_DIST = 50;
class GameSplineComponent {
  constructor(t) {
    (this.SplineId = 0),
      (this.SplineEntityData = void 0),
      (this.SplineComponentData = void 0),
      (this.PathPoint = Array()),
      (this.IsInitSubPoint = !1),
      (this.MainPointIndexArray = void 0),
      (this.Hye = void 0),
      (this.jye = Vector_1.Vector.Create()),
      (this.Wye = Vector_1.Vector.Create()),
      (this.Kye = Rotator_1.Rotator.Create()),
      (this.Qye = Vector_1.Vector.Create()),
      (this.Xye = Vector_1.Vector.Create()),
      (this.$ye = Vector_1.Vector.Create()),
      (this.Yye = new Map()),
      (this.SplineId = t);
  }
  Initialize() {
    if (
      ((this.SplineEntityData =
        ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
          this.SplineId,
        )),
      !this.SplineEntityData)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            43,
            "[GameSplineComponent.Initialize] 无法找到SplineEntityData",
            ["SplineEntityId", this.SplineId],
          ),
        !1
      );
    var t = this.SplineEntityData.Transform.Pos,
      t =
        (this.Wye.Set(t.X ?? 0, t.Y ?? 0, t.Z ?? 0),
        this.SplineEntityData.Transform.Rot);
    if (
      (this.Kye.Set(t?.Y ?? 0, t?.Z ?? 0, t?.X ?? 0),
      this.Kye.Quaternion().RotateVector(
        Vector_1.Vector.ForwardVectorProxy,
        this.Qye,
      ),
      this.Qye.Normalize(),
      Vector_1.Vector.UpVectorProxy.CrossProduct(this.Qye, this.$ye),
      this.$ye.Normalize(),
      this.Qye.CrossProduct(this.$ye, this.Xye),
      this.Xye.Normalize(),
      (this.SplineComponentData = (0, IComponent_1.getComponent)(
        this.SplineEntityData.ComponentsData,
        "SplineComponent",
      )),
      !this.SplineComponentData)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            43,
            "[GameSplineComponent.Initialize] 无法找到样条组件配置",
            ["SplineEntityId", this.SplineId],
          ),
        !1
      );
    if (
      ((this.Hye = this.SplineComponentData.Option),
      this.Option.Type === IComponent_1.ESplineType.Patrol ||
        this.Option.Type === IComponent_1.ESplineType.LevelAI)
    )
      for (let t = 0; t < this.Option.Points.length; t++) {
        var i = new AiPatrolController_1.PatrolPoint(),
          e =
            ((i.IsMain = !0),
            (i.Point = Vector_1.Vector.Create(
              this.GetWorldLocationAtSplinePoint(t),
            )),
            this.Option.Points[t]),
          s =
            ((i.MoveState = e.MoveState),
            (i.MoveSpeed = e.MoveSpeed),
            (i.CharPositionState = e.CharPositionState),
            e),
          s =
            (s &&
              ((i.IsIgnorePoint = s.IgnorePoint ?? !1),
              (i.StayTime = s.StayTime ?? 0),
              (i.IsHide = s.IsHide ?? !1)),
            e.Actions);
        s && (i.Actions = s), this.PathPoint.push(i);
      }
    return !0;
  }
  InitializeByEntityData(t) {
    this.SplineEntityData = t;
    (t = this.SplineEntityData.Transform.Pos),
      this.Wye.Set(t.X ?? 0, t.Y ?? 0, t.Z ?? 0),
      (t = this.SplineEntityData.Transform.Rot);
    if (
      (this.Kye.Set(t?.Y ?? 0, t?.Z ?? 0, t?.X ?? 0),
      this.Kye.Quaternion().RotateVector(
        Vector_1.Vector.ForwardVectorProxy,
        this.Qye,
      ),
      this.Qye.Normalize(),
      Vector_1.Vector.UpVectorProxy.CrossProduct(this.Qye, this.$ye),
      this.$ye.Normalize(),
      this.Qye.CrossProduct(this.$ye, this.Xye),
      this.Xye.Normalize(),
      (this.SplineComponentData = (0, IComponent_1.getComponent)(
        this.SplineEntityData.ComponentsData,
        "SplineComponent",
      )),
      !this.SplineComponentData)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            43,
            "[GameSplineComponent.Initialize] 无法找到样条组件配置",
            ["SplineEntityId", this.SplineId],
          ),
        !1
      );
    if (
      ((this.Hye = this.SplineComponentData.Option),
      this.Option.Type === IComponent_1.ESplineType.Patrol ||
        this.Option.Type === IComponent_1.ESplineType.LevelAI)
    )
      for (let t = 0; t < this.Option.Points.length; t++) {
        var i = new AiPatrolController_1.PatrolPoint(),
          e =
            ((i.IsMain = !0),
            (i.Point = Vector_1.Vector.Create(
              this.GetWorldLocationAtSplinePoint(t),
            )),
            this.Option.Points[t]),
          s =
            ((i.MoveState = e.MoveState),
            (i.MoveSpeed = e.MoveSpeed),
            (i.CharPositionState = e.CharPositionState),
            e),
          s =
            (s &&
              ((i.IsIgnorePoint = s.IgnorePoint ?? !1),
              (i.StayTime = s.StayTime ?? 0),
              (i.IsHide = s.IsHide ?? !1)),
            e.Actions);
        s && (i.Actions = s), this.PathPoint.push(i);
      }
    return !0;
  }
  get Option() {
    return this.Hye;
  }
  GetNumberOfSplinePoints() {
    return this.Hye?.Points.length ?? 0;
  }
  GetWorldLocationAtSplinePoint(t) {
    var i, e;
    return this.Yye.has(t)
      ? this.Yye.get(t)
      : ((i = Vector_1.Vector.Create()),
        this.Hye && 0 < this.Hye.Points.length && t < this.Hye.Points.length
          ? ((e = this.Hye.Points[t].Position),
            i.AdditionEqual(this.Wye),
            this.jye.DeepCopy(this.Qye),
            this.jye.MultiplyEqual(e.X ?? 0),
            i.AdditionEqual(this.jye),
            this.jye.DeepCopy(this.$ye),
            this.jye.MultiplyEqual(e.Y ?? 0),
            i.AdditionEqual(this.jye),
            this.jye.DeepCopy(this.Xye),
            this.jye.MultiplyEqual(e.Z ?? 0),
            i.AdditionEqual(this.jye),
            this.Yye.set(t, i))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              43,
              "[GameSplineComponent.GetWorldLocationAtSplinePoint] Index越界",
              ["Points.length", this.Hye.Points.length],
              ["index", t],
            ),
        i);
  }
  InitializeWithSubPoints(t) {
    if (
      ((this.SplineEntityData =
        ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
          this.SplineId,
        )),
      !this.SplineEntityData)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            43,
            "[GameSplineComponent.Initialize] 无法找到SplineEntityData",
            ["SplineEntityId", this.SplineId],
          ),
        !1
      );
    if (
      ((this.SplineComponentData = (0, IComponent_1.getComponent)(
        this.SplineEntityData.ComponentsData,
        "SplineComponent",
      )),
      !this.SplineComponentData)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            43,
            "[GameSplineComponent.Initialize] 无法找到样条组件配置",
            ["SplineEntityId", this.SplineId],
          ),
        !1
      );
    this.Hye = this.SplineComponentData.Option;
    var s =
        ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
          this.SplineId,
          t,
        ),
      i = ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
        this.SplineId,
      );
    if (
      !ObjectUtils_1.ObjectUtils.IsValid(s) ||
      !ObjectUtils_1.ObjectUtils.IsValid(i)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            32,
            "[NpcPasserbyComponent] Spline获取失败",
            ["SplineEntityId", this.SplineId],
          ),
        !1
      );
    var o = i,
      i = s.GetNumberOfSplinePoints(),
      n = this.PathPoint;
    (n.length = 0),
      n.splice(0, n.length),
      (this.MainPointIndexArray = new Array());
    for (let t = 0, e = i; t < e; t++) {
      var r = s.GetWorldLocationAtSplinePoint(t),
        h = new AiPatrolController_1.PatrolPoint(),
        r =
          ((h.IsMain = !0),
          (h.Point = Vector_1.Vector.Create(r)),
          o.SplineData),
        r =
          ((h.MoveState = r.Points[t].MoveState),
          (h.MoveSpeed = r.Points[t].MoveSpeed),
          (h.IsIgnorePoint = r.Points[t].IgnorePoint ?? !1),
          (h.StayTime = r.Points[t].StayTime ?? 0),
          (h.IsHide = r.Points[t].IsHide ?? !1),
          r.Points[t].Actions);
      r && (h.Actions = r), this.MainPointIndexArray.push(n.length), n.push(h);
      let i = s.GetDirectionAtSplinePoint(t, 1);
      if (t < e - 1) {
        var r = s.GetDistanceAlongSplineAtSplinePoint(t),
          l = s.GetDistanceAlongSplineAtSplinePoint(t + 1);
        for (let t = r + SAMPLE_STEP_DIST; t < l; t += SAMPLE_STEP_DIST) {
          var a,
            _ = s.GetDirectionAtDistanceAlongSpline(t, 1);
          MathUtils_1.MathUtils.GetAngleByVectorDot(i, _) <
            SAMPLE_ANGLE_LIMIT ||
            ((i = _),
            (_ = s.GetWorldLocationAtDistanceAlongSpline(t)),
            ((a = new AiPatrolController_1.PatrolPoint()).IsMain = !1),
            (a.Point = Vector_1.Vector.Create(_)),
            n.push(a));
        }
      }
    }
    return (
      (this.IsInitSubPoint = !0),
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
        this.SplineId,
        t,
      ),
      !0
    );
  }
  GetLastMainPointIndex(t) {
    if (!this.IsInitSubPoint) return t;
    if (!this.PathPoint?.length || !this.MainPointIndexArray?.length) return -1;
    if (t < 0 || t >= this.PathPoint.length) return -1;
    let [i, e] = [0, this.MainPointIndexArray.length - 1];
    for (; i <= e; ) {
      var s = Math.floor(0.5 * (i + e));
      this.MainPointIndexArray[s] <= t && (i = s + 1),
        this.MainPointIndexArray[s] > t && (e = s - 1);
    }
    return i - 1;
  }
  Clear() {
    this.Yye.clear();
  }
}
exports.GameSplineComponent = GameSplineComponent;
//# sourceMappingURL=GameSplineComponent.js.map
