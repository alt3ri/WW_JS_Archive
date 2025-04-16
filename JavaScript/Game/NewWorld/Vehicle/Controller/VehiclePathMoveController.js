"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehiclePathMoveController =
    exports.MoveStateInfo =
    exports.PathCurveInfo =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  SplineCurve_1 = require("../../../../Core/Utils/Curve/SplineCurve"),
  Quat_1 = require("../../../../Core/Utils/Math/Quat"),
  Transform_1 = require("../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GravityUtils_1 = require("../../../Utils/GravityUtils"),
  TEMPRORY_SPLINE_CURVE_ID = -1,
  BINARY_SEARCH_DEPTH = 40,
  MOVE_TO_TASK_POSITION_ADJUSTED_TIME = 2e3,
  MOVE_TO_TASK_POSITION_ADJUSTED_DIST = 150;
class PathCurveInfo {
  constructor() {
    (this.SplineId = 0),
      (this.SplineConfig = void 0),
      (this.SplineCurve = void 0),
      (this.TimeControlCurve = void 0),
      (this.TotalTime = 0),
      (this.TotalLength = 0),
      (this.IsLoop = !1),
      (this.IsCircle = !1),
      (this.BiTangentNormal = Vector_1.Vector.Create());
  }
  IsValid() {
    return void 0 !== this.SplineCurve && 0 < this.TotalTime;
  }
  GetPathRatioByTimeRatio(t) {
    var e = MathUtils_1.MathUtils.Clamp(t, 0, 1);
    return this.TimeControlCurve?.IsValid()
      ? this.TimeControlCurve.GetFloatValue(e)
      : t;
  }
  GetTimeRatioByPathRatio(t) {
    var e = MathUtils_1.MathUtils.Clamp(t, 0, 1);
    if (0 === t || 1 === t) return t;
    if (!this.TimeControlCurve?.IsValid()) return t;
    let [i, s, h] = [0, 0, 1];
    for (
      ;
      i < BINARY_SEARCH_DEPTH && h - s > MathUtils_1.MathUtils.SmallNumber;

    ) {
      var o = 0.5 * (s + h);
      this.TimeControlCurve.GetFloatValue(o) < e ? (s = o) : (h = o), i++;
    }
    return s;
  }
  InitFromSplineId(t) {
    var e,
      i = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    return i
      ? (e = (0, IComponent_1.getComponent)(
          i.ComponentsData,
          "SplineComponent",
        )) && e.Option.Points?.length
        ? e.Option.Type !==
          IComponent_1.ESplineType.ContinuesVariableSpeedMovement
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                50,
                "[PathCurveInfo.InitFromSplineId] 用于初始化载具移动任务的样条不是变速样条",
                ["SplineId", t],
                ["Type", e.Option.Type],
              ),
            !1)
          : ((this.SplineConfig = e.Option),
            this.SplineConfig.EntireTimePathConfig?.TimePathCurve &&
            "" !== this.SplineConfig.EntireTimePathConfig.TimePathCurve
              ? ((this.TimeControlCurve = ResourceSystem_1.ResourceSystem.Load(
                  this.SplineConfig.EntireTimePathConfig.TimePathCurve,
                  UE.CurveFloat,
                )),
                this.TimeControlCurve?.IsValid()
                  ? ((this.SplineId = t),
                    (this.TotalTime =
                      this.SplineConfig.EntireTimePathConfig.TotalTime),
                    (this.SplineCurve = new SplineCurve_1.SplineCurve()),
                    this.SplineCurve.InitPoints(this.SplineConfig.Points),
                    i.Transform &&
                      this.SplineCurve.SetSplineTransform(i.Transform, !1),
                    (this.TotalLength = this.SplineCurve.GetSplineLength()),
                    !0)
                  : (Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "SceneItem",
                        50,
                        "[PathCurveInfo.InitFromSplineId] 时间路径曲线加载失败",
                        ["SplineId", t],
                        ["Type", e.Option.Type],
                      ),
                    !1))
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "SceneItem",
                    50,
                    "[PathCurveInfo.InitFromSplineId] 变速样条未配置时间路径曲线",
                    ["SplineId", t],
                    ["Type", e.Option.Type],
                  ),
                !1))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              50,
              "[PathCurveInfo.InitFromSplineId] 样条没有启用组件或配置移动点",
              ["SplineId", t],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            50,
            "[PathCurveInfo.InitFromSplineId] 获取不到样条实体数据",
            ["SplineEntityId", t],
          ),
        !1);
  }
}
exports.PathCurveInfo = PathCurveInfo;
class MoveStateInfo {
  constructor() {
    (this.TimeRatio = 0),
      (this.PathRatio = 0),
      (this.PathDeltaSign = 1),
      (this.IsFinish = !1);
  }
  DeepCopy() {
    var t = new MoveStateInfo();
    return (
      (t.TimeRatio = this.TimeRatio),
      (t.PathRatio = this.PathRatio),
      (t.PathDeltaSign = this.PathDeltaSign),
      (t.IsFinish = this.IsFinish),
      t
    );
  }
}
exports.MoveStateInfo = MoveStateInfo;
class VehiclePathMoveTask {
  constructor(t, e, i) {
    (this.VehicleEntity = void 0),
      (this.ActorComp = void 0),
      (this.PerformComp = void 0),
      (this.AnimComp = void 0),
      (this.AudioComp = void 0),
      (this.CurveInfo = void 0),
      (this.StateInfo = void 0),
      (this.SimulateRotation = !0),
      (this.NeedSync = !0),
      (this.DynamicGravity = !1),
      (this.OnMoveEndHandle = void 0),
      (this.MoveOffset = Vector_1.Vector.Create()),
      (this.VehicleEntity = t),
      (this.CurveInfo = e),
      (this.StateInfo = i),
      (this.ActorComp = this.VehicleEntity.GetComponent(231)),
      (this.PerformComp = this.VehicleEntity.GetComponent(234)),
      (this.AnimComp = this.VehicleEntity.GetComponent(232)),
      (this.AudioComp = this.VehicleEntity.GetComponent(239));
  }
  IsValid() {
    return !!this.CurveInfo?.IsValid() && !!this.VehicleEntity?.Valid;
  }
  Update(t) {
    return !(
      !this.CurveInfo ||
      !this.StateInfo ||
      !this.VehicleEntity?.Valid ||
      (this.UpdateRatio(t),
      this.UpdateGravity(t),
      this.UpdateTransform(t),
      this.AudioComp?.UpdateVehicleMoveSound(
        this.ActorComp.SimulatedVelocity.Size(),
        this.ActorComp.Owner,
      ),
      0)
    );
  }
  UpdateRatio(t) {
    this.StateInfo &&
      this.CurveInfo?.IsValid() &&
      ((t = this.StateInfo.TimeRatio + t / this.CurveInfo.TotalTime),
      (this.StateInfo.TimeRatio = t),
      (this.StateInfo.PathRatio = this.CurveInfo.GetPathRatioByTimeRatio(
        MathUtils_1.MathUtils.Clamp(t, 0, 1),
      )),
      (this.StateInfo.IsFinish = 1 <= t));
  }
  GetUpdateTransform(t) {
    this.CurveInfo &&
      this.StateInfo &&
      (this.CurveInfo.SplineCurve.GetTransformAtRateAlongSpline(
        this.StateInfo.PathRatio,
        1,
        t,
      ),
      this.StateInfo.PathDeltaSign < 0) &&
      (t.GetRotation().Inverse(VehiclePathMoveTask.TmpQuat),
      t.SetRotation(VehiclePathMoveTask.TmpQuat));
  }
  UpdateTransform(t) {
    if (this.StateInfo && this.CurveInfo) {
      VehiclePathMoveTask.TmpVector.DeepCopy(
        this.ActorComp.ActorGravityDirectProxy,
      ),
        VehiclePathMoveTask.TmpVector.MultiplyEqual(-1),
        this.CurveInfo.SplineCurve?.SetReferenceUp(
          VehiclePathMoveTask.TmpVector,
        ),
        this.GetUpdateTransform(VehiclePathMoveTask.TmpTrans),
        this.AdjustMoveOffsetForGravity(VehiclePathMoveTask.TmpVector);
      var e = VehiclePathMoveTask.TmpTrans.GetLocation()
        .AdditionEqual(VehiclePathMoveTask.TmpVector)
        .ToUeVector();
      let t = VehiclePathMoveTask.TmpTrans.GetRotation()
        .Rotator()
        .ToUeRotator();
      this.SimulateRotation ||
        this.DynamicGravity ||
        (t = this.ActorComp.ActorQuatProxy.Rotator().ToUeRotator());
      var i = `VehiclePathMoveController.Update(SplineId:${this.CurveInfo.SplineId})`;
      this.AnimComp.SetLocationAndRotatorWithKeepingModelBuffer(e, t, 0, i);
    }
  }
  UpdateGravity(t) {
    var e;
    this.CurveInfo &&
      this.StateInfo &&
      this.DynamicGravity &&
      !this.CurveInfo.BiTangentNormal.Equals(Vector_1.Vector.ZeroVectorProxy) &&
      (this.GetUpdateTransform(VehiclePathMoveTask.TmpTrans),
      (e = MathUtils_1.MathUtils.CommonTempVector),
      VehiclePathMoveTask.TmpTrans.GetRotation().GetForwardVector(e),
      Vector_1.Vector.CrossProduct(
        e,
        this.CurveInfo.BiTangentNormal,
        VehiclePathMoveTask.TmpVector,
      ),
      VehiclePathMoveTask.TmpVector.Normalize()) &&
      this.PerformComp?.SetGravityDirectForVehicleWithoutRotate(
        VehiclePathMoveTask.TmpVector,
      );
  }
  JumpToPoint(t) {
    this.CurveInfo &&
      this.StateInfo &&
      (t > this.CurveInfo.SplineConfig.Points.length ||
        ((t =
          this.CurveInfo.SplineCurve.GetSplineLengthAtPoint(t) /
          this.CurveInfo.TotalLength),
        this.JumpToTargetPathRatio(t)));
  }
  JumpToTargetPathRatio(t) {
    this.CurveInfo &&
      this.StateInfo &&
      (t < 0 || 1 < t
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Vehicle",
            50,
            "不合法的目标路径进度",
            ["EntityId", this.VehicleEntity?.Id],
            ["SplineId", this.CurveInfo.SplineId],
            ["TargetPathRatio", t],
          )
        : ((this.StateInfo.TimeRatio =
            this.CurveInfo.GetTimeRatioByPathRatio(t)),
          (this.StateInfo.PathRatio = this.CurveInfo.GetPathRatioByTimeRatio(
            this.StateInfo.TimeRatio,
          )),
          (this.StateInfo.IsFinish = 1 <= this.StateInfo.TimeRatio)));
  }
  CalcOffsetBeforeMove() {
    var t = this.VehicleEntity?.GetComponent(230);
    if (t)
      switch (t.VehicleType) {
        case "Gongduola":
        case "AutoMoveGongduola":
          this.VehicleEntity.GetComponent(
            242,
          )?.GetNormalizedBuoyancyBalanceOffset(this.MoveOffset),
            (this.MoveOffset.X = 0),
            (this.MoveOffset.Y = 0);
      }
  }
  AdjustMoveOffsetForGravity(t) {
    var e = this.VehicleEntity?.GetComponent(230);
    if (e)
      switch (e.VehicleType) {
        case "Gongduola":
        case "AutoMoveGongduola":
          this.VehicleEntity.GetComponent(
            231,
          )?.ActorGravityDirectProxy.Multiply(-this.MoveOffset.Z, t);
      }
  }
  EnableDynamicGravity(t) {
    var e, i, s, h;
    !this.CurveInfo?.SplineCurve ||
      (s = this.CurveInfo.SplineCurve.GetSplinePointsNum()) < 3 ||
      (this.DynamicGravity !== t &&
        (this.DynamicGravity = t) &&
        ((t = Vector_1.Vector.Create()),
        (e = Vector_1.Vector.Create()),
        (i = Vector_1.Vector.Create()),
        this.CurveInfo.SplineCurve.GetWorldLocationAtSplinePoint(0, t),
        this.CurveInfo.SplineCurve.GetWorldLocationAtSplinePoint(s / 2, e),
        this.CurveInfo.SplineCurve.GetWorldLocationAtSplinePoint(s - 1, i),
        (s = Vector_1.Vector.Create()),
        (h = Vector_1.Vector.Create()),
        e.Subtraction(t, s),
        i.Subtraction(t, h),
        Vector_1.Vector.CrossProduct(s, h, this.CurveInfo.BiTangentNormal),
        this.CurveInfo.BiTangentNormal.Normalize()));
  }
}
(VehiclePathMoveTask.TmpTrans = Transform_1.Transform.Create()),
  (VehiclePathMoveTask.TmpQuat = Quat_1.Quat.Create()),
  (VehiclePathMoveTask.TmpVector = Vector_1.Vector.Create());
class VehiclePathMoveController extends ControllerBase_1.ControllerBase {
  static TickPriority1(t) {
    var e = t * MathUtils_1.MathUtils.MillisecondToSecond;
    for (const s of this.PendingEndTaskSet) {
      var i = !!s.StateInfo?.IsFinish;
      this.SplineMoveTaskMap.delete(s.VehicleEntity),
        i && s.CurveInfo?.IsLoop
          ? this.AddLoopTask(s)
          : (this.PostRemoveMoveTask(s),
            s.OnMoveEndHandle && s.OnMoveEndHandle(i));
    }
    this.PendingEndTaskSet.clear();
    for (const h of this.SplineMoveTaskMap.values())
      this.PreUpdateTask(e, h),
        (h.Update(e) && !h.StateInfo?.IsFinish) ||
          this.PendingEndTaskSet.add(h),
        this.PostUpdateTask(e, h);
  }
  static AddSplineMoveTask(t) {
    var e;
    t.VehicleEntity?.Valid &&
      t.CurveInfo &&
      t.StateInfo &&
      (((e = this.SplineMoveTaskMap.get(t.VehicleEntity)) &&
        !e.StateInfo?.IsFinish) ||
        (this.PreAddMoveTask(t),
        this.SplineMoveTaskMap.set(t.VehicleEntity, t)));
  }
  static RemoveSplineMoveTask(t) {
    var e;
    t.GetComponent(231) &&
      (e = this.SplineMoveTaskMap.get(t)) &&
      (this.SplineMoveTaskMap.delete(t),
      this.PendingEndTaskSet.delete(e),
      this.PostRemoveMoveTask(e),
      e.OnMoveEndHandle) &&
      e.OnMoveEndHandle(e.StateInfo.IsFinish);
  }
  static PreAddMoveTask(t) {
    var e,
      t = t.VehicleEntity;
    t &&
      !this.VehicleMoveDisableHandleMap.has(t) &&
      ((e = t
        .GetComponent(241)
        .Disable("VehiclePathMoveController.PreAddMoveTask")),
      this.VehicleMoveDisableHandleMap.set(t, e),
      (e = t.GetComponent(233))) &&
      (e.IsMovePath = !0);
  }
  static PostRemoveMoveTask(t) {
    var e = t.VehicleEntity;
    e &&
      (t.ActorComp.SimulatedVelocity.Reset(),
      (t = this.VehicleMoveDisableHandleMap.get(e)),
      e
        .GetComponent(241)
        .Enable(t, "VehiclePathMoveController.PostRemoveMoveTask"),
      this.VehicleMoveDisableHandleMap.delete(e),
      (t = e.GetComponent(233))) &&
      (t.IsMovePath = !1);
  }
  static PreUpdateTask(t, e) {
    e.ActorComp?.LastActorLocation.DeepCopy(e.ActorComp.ActorLocationProxy),
      e.ActorComp?.LastActorRotation.DeepCopy(e.ActorComp.ActorRotationProxy);
  }
  static PostUpdateTask(t, e) {
    e.ActorComp &&
      (e.ActorComp.ActorLocationProxy.Subtraction(
        e.ActorComp.LastActorLocation,
        e.ActorComp.SimulatedVelocity,
      ),
      e.ActorComp.SimulatedVelocity.MultiplyEqual(1 / t));
  }
  static GetEntitySplineMoveInfo(t) {
    t = this.SplineMoveTaskMap.get(t);
    if (t?.NeedSync)
      return { SplineId: t.CurveInfo.SplineId, State: t.StateInfo.DeepCopy() };
  }
  static SyncEntityPathRatio(t, e, i) {
    var s = this.SplineMoveTaskMap.get(t);
    if (s) {
      if (s.CurveInfo.SplineId !== e)
        return 0 < s.CurveInfo.SplineId
          ? void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Vehicle",
                50,
                "处于非前置样条时收到其他样条的进度",
                ["PbDataId", s.ActorComp.CreatureData.GetPbDataId()],
                ["CreatureId", s.ActorComp.CreatureData.GetCreatureDataId()],
                ["CurSplineId", s.CurveInfo.SplineId],
                ["CurPathRatio", s.StateInfo.PathRatio],
                ["OtherSplineId", e],
                ["OtherPathRatio", i],
              )
            )
          : (this.RemoveSplineMoveTask(s.VehicleEntity),
            void this.SyncEntityPathRatio(t, e, i));
      var e = s.StateInfo.PathRatio,
        h =
          (s.JumpToTargetPathRatio(i),
          s.GetUpdateTransform(this.TmpTrans),
          MathUtils_1.MathUtils.CommonTempVector.DeepCopy(
            this.TmpTrans.GetLocation(),
          ),
          MathUtils_1.MathUtils.CommonTempVector.SubtractionEqual(
            s.ActorComp.ActorLocationProxy,
          ),
          MathUtils_1.MathUtils.CommonTempVector.Size() /
            s.ActorComp.SimulatedVelocity.Size());
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Vehicle",
          50,
          "同步服务器样条进度",
          ["PbDataId", s.ActorComp.CreatureData.GetPbDataId()],
          ["CreatureId", s.ActorComp.CreatureData.GetCreatureDataId()],
          ["SplineId", s.CurveInfo.SplineId],
          ["CurPathRatio", e],
          ["OtherPathRatio", i],
          ["ModelBufferTime", h],
        ),
        s.AnimComp.SetLocationAndRotatorWithKeepingModelBuffer(
          this.TmpTrans.GetLocation().ToUeVector(),
          this.TmpTrans.GetRotation().Rotator().ToUeRotator(),
          h * MathUtils_1.MathUtils.SecondToMillisecond,
          "SyncEntityPathRatio",
        );
    } else
      (e = t.GetComponent(231)),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Vehicle",
            50,
            "样条移动同步失败,当前Entity无样条移动任务",
            ["PbDataId", e?.CreatureData.GetPbDataId()],
            ["CreatureId", e?.CreatureData.GetCreatureDataId()],
          );
  }
  static AddLoopTask(t) {
    var e = t.VehicleEntity?.GetComponent(233);
    t.CurveInfo?.IsCircle &&
      e?.MoveAlongPath({ SplineId: t.CurveInfo.SplineId });
  }
  static CreateMoveTaskFromSplineId(t, e) {
    var i = new PathCurveInfo();
    if (i.InitFromSplineId(e))
      return (
        (e = new VehiclePathMoveTask(
          t,
          i,
          new MoveStateInfo(),
        )).CalcOffsetBeforeMove(),
        e
      );
  }
  static MoveToTaskPositionAdjusted(t, e, i) {
    var s = t.GetComponent(1),
      t = t.GetComponent(232);
    s &&
      t &&
      (i.Subtraction(e, this.TmpVector1),
      (i = GravityUtils_1.GravityUtils.GetZnInGravityForActor(
        s,
        this.TmpVector1,
      )),
      Math.abs(i) < MOVE_TO_TASK_POSITION_ADJUSTED_DIST &&
        GravityUtils_1.GravityUtils.AddZnInGravityForActor(s, e, i),
      t.SetLocationAndRotatorWithKeepingModelBuffer(
        s.ActorLocation,
        s.ActorRotation,
        MOVE_TO_TASK_POSITION_ADJUSTED_TIME,
        "CreateMoveToTask",
      ));
  }
  static CreateMoveToTask(t, e, i) {
    var s = t.GetComponent(231);
    if (s && i) {
      var h,
        o = Vector_1.Vector.Create(),
        a = (o.DeepCopy(s.ActorForwardProxy), Vector_1.Vector.Create()),
        s = (a.DeepCopy(s.ActorLocationProxy), Vector_1.Vector.Create()),
        r = (e.GetRotation().GetForwardVector(s), Vector_1.Vector.Create());
      if (
        (r.DeepCopy(e.GetLocation()),
        this.MoveToTaskPositionAdjusted(t, a, r),
        !a.Equals(r))
      )
        return (
          (e = Vector_1.Vector.Dist(a, r)),
          (h = Vector_1.Vector.Create()),
          o.Multiply(e, h),
          (o = Vector_1.Vector.Create()),
          s.Multiply(e, o),
          (s = {
            Position: a,
            ArriveTangent: h,
            LeaveTangent: h,
            LineType: IComponent_1.ESplineLine.CurveCustomTangent,
            Rotation: void 0,
          }),
          (a = {
            Position: r,
            ArriveTangent: o,
            LeaveTangent: o,
            LineType: IComponent_1.ESplineLine.CurveCustomTangent,
            Rotation: void 0,
          }),
          (h = new SplineCurve_1.SplineCurve()).InitPoints([s, a]),
          ((r = new PathCurveInfo()).SplineCurve = h),
          (r.SplineId = TEMPRORY_SPLINE_CURVE_ID),
          (r.TotalTime = e / i),
          (r.TotalLength = h.GetSplineLength()),
          (o = new MoveStateInfo()),
          (s = new VehiclePathMoveTask(t, r, o)).CalcOffsetBeforeMove(),
          s
        );
    }
  }
  static GetMovingSplineId(t) {
    t = this.SplineMoveTaskMap.get(t);
    return t ? Math.abs(t.CurveInfo.SplineId) : 0;
  }
}
((exports.VehiclePathMoveController =
  VehiclePathMoveController).SplineMoveTaskMap = new Map()),
  (VehiclePathMoveController.PendingEndTaskSet = new Set()),
  (VehiclePathMoveController.VehicleMoveDisableHandleMap = new Map()),
  (VehiclePathMoveController.TmpVector1 = Vector_1.Vector.Create()),
  (VehiclePathMoveController.TmpVector2 = Vector_1.Vector.Create()),
  (VehiclePathMoveController.TmpTrans = Transform_1.Transform.Create());
//# sourceMappingURL=VehiclePathMoveController.js.map
