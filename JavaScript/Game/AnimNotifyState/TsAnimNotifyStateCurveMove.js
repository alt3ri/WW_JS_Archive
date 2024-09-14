"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  SplineCurve_1 = require("../../Core/Utils/Curve/SplineCurve"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  Quat_1 = require("../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  Global_1 = require("../Global"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  SkillBehaviorCondition_1 = require("../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorCondition"),
  SkillBehaviorMisc_1 = require("../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorMisc"),
  ColorUtils_1 = require("../Utils/ColorUtils"),
  BlackboardController_1 = require("../World/Controller/BlackboardController"),
  WorldGlobal_1 = require("../World/WorldGlobal"),
  queryExtent = new UE.Vector(1, 1, 500),
  angles = [0, 270, 90, 180],
  MIN_MOVE_DISTANCE = 50,
  MIN_MOVE_DISTANCE_SQUARED = MIN_MOVE_DISTANCE * MIN_MOVE_DISTANCE,
  MIN_UPDATE_SPLINE_LENGTH = 100,
  MIN_UPDATE_SPLINE_LENGTH_SQUARED =
    MIN_UPDATE_SPLINE_LENGTH * MIN_UPDATE_SPLINE_LENGTH,
  MAX_MOVE_DISTANCE = 3e3,
  INVALID_LAST_LOCATION_THRESHOLD_SQUARED = 1e6,
  DEBUG_RADIUS = 30,
  DEBUG_DURATION = 5,
  DEBUG_SEGMENTS = 10;
class PositionBranchTargetParams {
  constructor() {
    (this.CharActorComp = void 0),
      (this.CharUnifiedComp = void 0),
      (this.CharSkillComp = void 0),
      (this.TargetActorComp = void 0),
      (this.TargetCharActorComp = void 0),
      (this.NowTime = -0),
      (this.TotalTime = -0),
      (this.SocketName = ""),
      (this.LastLocation = Vector_1.Vector.Create()),
      (this.InitLocation = Vector_1.Vector.Create()),
      (this.TargetOffset = Vector_1.Vector.Create()),
      (this.TargetPos = Vector_1.Vector.Create()),
      (this.LastTargetPos = Vector_1.Vector.Create()),
      (this.TargetVec = Vector_1.Vector.Create()),
      (this.AlongStraightLine = !1),
      (this.AllowMovement = !1),
      (this.CanSetActorTargetPos = !1),
      (this.FlyingMove = !1);
  }
  RefreshTarget(i, s, e) {
    switch (
      (this.TargetActorComp?.Entity?.Valid ||
        ((this.TargetActorComp = void 0), (this.TargetCharActorComp = void 0)),
      this.LastLocation.DeepCopy(this.CharActorComp.LastActorLocation),
      e)
    ) {
      case 0:
        (this.TargetActorComp = this.CharActorComp),
          (this.TargetCharActorComp = this.CharActorComp),
          (this.SocketName = s);
        break;
      case 1:
        var o = this.CharSkillComp?.SkillTarget;
        if (!o) return !1;
        if (
          this.TargetActorComp?.Entity?.Valid &&
          o.Id === this.TargetActorComp.Entity.Id
        )
          return !0;
        (this.TargetActorComp = o.Entity.GetComponent(1)),
          (this.TargetCharActorComp = o.Entity.GetComponent(3)),
          (this.SocketName = this.CharSkillComp.SkillTargetSocket);
        break;
      case 2:
        let t = BlackboardController_1.BlackboardController.GetIntValueByEntity(
          this.CharActorComp.Entity.Id,
          i,
        );
        if (
          !t &&
          !(t = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
            this.CharActorComp.Entity.Id,
            i,
          ))
        )
          return !1;
        o = EntitySystem_1.EntitySystem.Get(t);
        if (!o?.Valid) return !1;
        if (
          this.TargetActorComp?.Entity?.Valid &&
          this.TargetActorComp.Entity.Id === o.Id
        )
          return !0;
        (this.TargetActorComp = o.GetComponent(1)),
          (this.TargetCharActorComp = void 0),
          (this.SocketName = s);
    }
    return !0;
  }
  Clear() {
    (this.CharActorComp = void 0),
      (this.CharUnifiedComp = void 0),
      (this.CharSkillComp = void 0),
      (this.TargetActorComp = void 0),
      (this.TargetCharActorComp = void 0),
      (this.SocketName = "");
  }
}
class TsAnimNotifyStateCurveMove extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.DebugMode = !1),
      (this.技能条件 = void 0),
      (this.技能条件公式 = void 0),
      (this.无视障碍阻挡 = !1),
      (this.运动轨迹曲线 = void 0),
      (this.持续更新目标位置 = !1),
      (this.位置基准目标 = 0),
      (this.基于目标骨骼位置 = void 0),
      (this.目标参数 = void 0),
      (this.偏移方向基准 = 0),
      (this.目标位置偏移 = void 0),
      (this.位置修正 = !1),
      (this.位置修正配置 = void 0),
      (this.运动位置曲线 = void 0),
      (this.运动过程朝向 = 0),
      (this.自动更新运动轨迹曲线关键点 = !1),
      (this.运动轨迹曲线关键点 = void 0),
      (this.运动轨迹曲线插值ReparamTable = void 0),
      (this.SkillBehaviorCondition = void 0),
      (this.SkillBehaviorConditionFormula = ""),
      (this.IgnoreObstacle = !1),
      (this.SplineCurves = void 0),
      (this.ContinuallyUpdateTargetPosition = !1),
      (this.PositionDatumTarget = 0),
      (this.TargetSocketPosition = "None"),
      (this.TargetParam = "None"),
      (this.OffsetDirectionDatum = 0),
      (this.TargetPositionOffset = void 0),
      (this.MakePositionCorrection = !1),
      (this.PositionCorrectionConfig = void 0),
      (this.MovementPositionCurve = void 0),
      (this.MovementProcessDirection = 0),
      (this.TmpVector = void 0),
      (this.TmpVector2 = void 0),
      (this.TmpVector3 = void 0),
      (this.TmpVector4 = void 0),
      (this.TmpRotator = void 0),
      (this.TmpQuat = void 0),
      (this.TmpQuat2 = void 0),
      (this.TmpTransform = void 0),
      (this.InitCacheVar = !1),
      (this.ParamPool = void 0),
      (this.ParamMap = void 0);
  }
  EditorUpdateSplineCurve() {
    var t;
    this.自动更新运动轨迹曲线关键点 &&
      this.运动轨迹曲线 &&
      ((t = this.运动轨迹曲线.AssetPathName.toString() + "_C"),
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, (t) => {
        var i = UE.EditorOperations.GetDefaultObject(t).SplinePointsMap;
        0 < (this.运动轨迹曲线关键点?.Num() ?? 0) &&
          this.运动轨迹曲线关键点?.Empty();
        for (let t = 0; t < i.Num(); t++) this.运动轨迹曲线关键点.Add(i.Get(t));
        0 < (this.运动轨迹曲线插值ReparamTable?.Num() ?? 0) &&
          this.运动轨迹曲线插值ReparamTable?.Empty(),
          this.SplineCurves ||
            (this.SplineCurves = new SplineCurve_1.SplineCurve()),
          this.SplineCurves.Init(this.运动轨迹曲线关键点);
        for (const e of this.SplineCurves.ReparamTable) {
          var s = new UE.InterpCurvePointFloat(
            e.InVal,
            e.OutVal,
            e.ArriveTangent,
            e.LeaveTangent,
            0,
          );
          this.运动轨迹曲线插值ReparamTable.Add(s);
        }
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Movement",
            43,
            "运动轨迹曲线关键点,曲线插值ReparamTable更新成功",
          );
      }));
  }
  Initialize() {
    (this.SkillBehaviorCondition = this.技能条件),
      (this.SkillBehaviorConditionFormula =
        this.技能条件公式?.toString() ?? ""),
      (this.IgnoreObstacle = this.无视障碍阻挡),
      (this.ContinuallyUpdateTargetPosition = this.持续更新目标位置),
      (this.PositionDatumTarget = this.位置基准目标),
      (this.TargetSocketPosition = this.基于目标骨骼位置?.toString() ?? "None"),
      (this.TargetParam = this.目标参数?.toString() ?? "None"),
      (this.OffsetDirectionDatum = this.偏移方向基准),
      (this.MakePositionCorrection = this.位置修正),
      (this.PositionCorrectionConfig = this.位置修正配置),
      (this.MovementPositionCurve = this.运动位置曲线),
      (this.MovementProcessDirection = this.运动过程朝向),
      this.运动轨迹曲线关键点 &&
        !this.SplineCurves &&
        (this.SplineCurves = new SplineCurve_1.SplineCurve()),
      this.目标位置偏移 &&
        (this.TargetPositionOffset
          ? this.TargetPositionOffset.DeepCopy(this.目标位置偏移)
          : (this.TargetPositionOffset = this.目标位置偏移
              ? Vector_1.Vector.Create(this.目标位置偏移)
              : void 0));
  }
  InitCacheVariable() {
    this.InitCacheVar ||
      ((this.InitCacheVar = !0),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TmpVector3 = Vector_1.Vector.Create()),
      (this.TmpVector4 = Vector_1.Vector.Create()),
      (this.TmpRotator = Rotator_1.Rotator.Create()),
      (this.TmpQuat = Quat_1.Quat.Create()),
      (this.TmpQuat2 = Quat_1.Quat.Create()),
      (this.TmpTransform = Transform_1.Transform.Create()),
      (this.ParamMap = new Map()),
      (this.ParamPool = []));
  }
  InitCharacterParam(i, s) {
    var e = i.Entity.GetComponent(34);
    if (e) {
      let t = this.ParamMap.get(i.Entity.Id);
      return (
        (t =
          t ||
          (this.ParamPool.length
            ? this.ParamPool.pop()
            : new PositionBranchTargetParams())).InitLocation.DeepCopy(
          i.ActorLocationProxy,
        ),
        (t.CharActorComp = i),
        (t.CharUnifiedComp = i.Entity.GetComponent(161)),
        (t.CharSkillComp = e),
        t.RefreshTarget(
          this.TargetParam,
          this.TargetSocketPosition,
          this.PositionDatumTarget,
        ),
        (t.NowTime = 0),
        (t.TotalTime = s),
        (t.FlyingMove =
          1 !== t.CharActorComp.MoveComp.CharacterMovement?.MovementMode &&
          2 !== t.CharActorComp.MoveComp.CharacterMovement?.MovementMode),
        this.ParamMap.set(i.Entity.Id, t),
        t.TargetActorComp ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Movement",
              43,
              "TsAnimNotifyStateCurveMove.InitCharacterParam没有目标",
            )),
        t
      );
    }
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "Test",
        43,
        "TsAnimNotifyStateCurveMove.InitCharacterParam没有技能组件",
        ["Actor", i.Actor.GetName()],
      );
  }
  CheckUseCondition(t) {
    var i, s;
    return (
      0 === (this.SkillBehaviorCondition?.Num() ?? 0) ||
      ((i = (t = t.CharacterActorComponent.Entity).GetComponent(34)),
      (s = t.GetComponent(34)?.CurrentSkill),
      i && s
        ? ((t = { Entity: t, SkillComponent: i, Skill: s }),
          !!SkillBehaviorCondition_1.SkillBehaviorCondition.SatisfyGroup(
            this.SkillBehaviorCondition,
            this.SkillBehaviorConditionFormula,
            t,
          ) ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Movement",
                43,
                "TsAnimNotifyStateCurveMove.CheckUseCondition不满足使用条件",
              ),
            !1))
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Movement",
              43,
              "TsAnimNotifyStateCurveMove.CheckUseCondition没有技能组件",
            ),
          !1))
    );
  }
  K2_NotifyBegin(t, i, s) {
    if (!GlobalData_1.GlobalData.GameInstance)
      return this.EditorUpdateSplineCurve(), !1;
    this.InitCacheVariable();
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var e = t.CharacterActorComponent;
    if (!e) return !1;
    s = this.InitCharacterParam(e, s);
    if (!s)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Movement",
            43,
            "TsAnimNotifyStateCurveMove初始化角色参数失败",
          ),
        !1
      );
    if (s.AllowMovement)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Movement",
            43,
            "TsAnimNotifyStateCurveMove正在移动中",
          ),
        !1
      );
    if (
      (this.Initialize(),
      this.SplineCurves?.Init(
        this.运动轨迹曲线关键点,
        this.运动轨迹曲线插值ReparamTable,
      ),
      this.SkillBehaviorCondition && !this.CheckUseCondition(t))
    )
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Movement",
            43,
            "TsAnimNotifyStateCurveMove不满足技能使用条件",
          ),
        !1
      );
    s.TargetOffset.DeepCopy(this.目标位置偏移),
      this.GetTargetPos(s, s.TargetPos),
      s.LastTargetPos.DeepCopy(s.TargetPos);
    var t = this.GetTowardVector(s, s.TargetVec);
    return t < MIN_MOVE_DISTANCE ||
      s.TargetVec.SizeSquared2D() < MIN_MOVE_DISTANCE_SQUARED
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Movement",
            43,
            "TsAnimNotifyStateCurveMove距离异常，不移动",
            ["CurrentLocation", s.CharActorComp.ActorLocationProxy],
            ["TargetPos", s.TargetPos],
            ["dist", t],
            ["distSquared2D", s.TargetVec.SizeSquared2D()],
          ),
        !1)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Movement",
            43,
            "TsAnimNotifyStateCurveMove移动",
            ["CurrentLocation", s.CharActorComp.ActorLocationProxy],
            ["TargetPos", s.TargetPos],
            ["dist", t],
            ["distSquared2D", s.TargetVec.SizeSquared2D()],
          ),
        this.IgnoreObstacle &&
          (t = e.Entity.GetComponent(164)) &&
          t.SetStepHeight(s.CharActorComp.HalfHeight),
        this.运动轨迹曲线关键点 &&
        this.SplineCurves &&
        this.InitSplineTransform(s)
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Movement",
                43,
                "TsAnimNotifyStateCurveMove.曲线移动",
              ),
            (s.AlongStraightLine = !1))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Movement",
                43,
                "TsAnimNotifyStateCurveMove.直线移动",
              ),
            (s.AlongStraightLine = !0)),
        (s.AllowMovement = !0));
  }
  K2_NotifyTick(t, i, s) {
    if (s < MathUtils_1.MathUtils.KindaSmallNumber) return !1;
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    (t = t.CharacterActorComponent), (t = this.ParamMap.get(t.Entity.Id));
    if (!t || !t.AllowMovement) return !1;
    if (
      ((t.CanSetActorTargetPos = !1), !this.SplineCurves || t.AlongStraightLine)
    )
      return (
        !!t.AlongStraightLine &&
        (t.RefreshTarget(
          this.TargetParam,
          this.TargetSocketPosition,
          this.PositionDatumTarget,
        ),
        t.TargetActorComp
          ? (this.MoveToTarget(s, t),
            t.LastLocation.DeepCopy(t.CharActorComp.ActorLocationProxy))
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Movement",
              43,
              "TsAnimNotifyStateCurveMove.直线移动无目标",
            ),
        (t.NowTime += s),
        !0)
      );
    if (
      (t.RefreshTarget(
        this.TargetParam,
        this.TargetSocketPosition,
        this.PositionDatumTarget,
      ),
      t.TargetActorComp
        ? (this.MoveToTargetAlongSpline(s, t),
          t.LastLocation.DeepCopy(t.CharActorComp.ActorLocationProxy))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Movement",
            43,
            "TsAnimNotifyStateCurveMove.沿样条移动无目标",
          ),
      (t.NowTime += s),
      this.DebugMode)
    ) {
      var e = this.SplineCurves.GetSplinePointsNum();
      for (let t = 0; t < e; t++)
        this.SplineCurves.GetWorldLocationAtSplinePoint(t, this.TmpVector),
          this.DebugDraw(
            this.TmpVector.ToUeVector(),
            ColorUtils_1.ColorUtils.LinearYellow,
          );
    }
    return !0;
  }
  K2_NotifyEnd(t, i) {
    var s,
      e,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((t = t.CharacterActorComponent),
      !!(s = this.ParamMap.get(t.Entity.Id))) &&
      (this.IgnoreObstacle &&
        (e = t.Entity.GetComponent(164)) &&
        e.ResetStepHeight(),
      (s.AllowMovement = !1),
      this.IgnoreObstacle &&
        (s.CanSetActorTargetPos &&
          Vector_1.Vector.Dist(
            s.TargetPos,
            s.CharActorComp.ActorLocationProxy,
          ) > MIN_MOVE_DISTANCE &&
          (s.CharActorComp.SetActorLocation(
            s.TargetPos.ToUeVector(),
            "TsAnimNotifyStateCurveMove.技能曲线移动穿越障碍物结束",
            !1,
          ),
          Log_1.Log.CheckWarn()) &&
          Log_1.Log.Warn(
            "Movement",
            43,
            "技能曲线移动穿越障碍物结束SetActorLocation到终点",
          ),
        (s.CanSetActorTargetPos = !1)),
      this.ParamMap.delete(t.Entity.Id),
      s.Clear(),
      this.ParamPool.push(s),
      !0)
    );
  }
  InitSplineTransform(t) {
    var i = this.SplineCurves?.GetSplineLength();
    if (!i) return !1;
    var s = t.TargetVec.Size(),
      e = this.SplineCurves.GetSplinePointsNum(),
      e =
        (this.SplineCurves.GetWorldLocationAtSplinePoint(0, this.TmpVector3),
        this.SplineCurves.GetWorldLocationAtSplinePoint(e - 1, this.TmpVector2),
        this.TmpVector3.SubtractionEqual(this.TmpVector2),
        this.TmpVector3.Size());
    if (i < MIN_UPDATE_SPLINE_LENGTH || s < MIN_UPDATE_SPLINE_LENGTH || e < 1)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Movement",
            43,
            "TsAnimNotifyStateCurveMove.样条总长度太短",
            ["splineLen", i],
            ["distance", s],
            ["splineLineLength", e],
          ),
        !1
      );
    this.TmpVector.DeepCopy(Vector_1.Vector.ForwardVectorProxy),
      MathUtils_1.MathUtils.LookRotationForwardFirst(
        t.TargetVec,
        Vector_1.Vector.UpVectorProxy,
        this.TmpQuat,
      ),
      MathUtils_1.MathUtils.LookRotationForwardFirst(
        this.TmpVector3,
        Vector_1.Vector.UpVectorProxy,
        this.TmpQuat2,
      ),
      this.TmpQuat2.Inverse(this.TmpQuat2),
      this.TmpQuat.RotateVector(this.TmpVector, this.TmpVector),
      this.TmpQuat2.RotateVector(this.TmpVector, this.TmpVector),
      this.TmpVector.UnaryNegation(this.TmpVector),
      (this.TmpVector.Z = -this.TmpVector.Z),
      this.TmpVector.ToOrientationQuat(this.TmpQuat2);
    var o = s / e,
      o =
        (this.TmpVector2.DeepCopy(
          this.SplineCurves.SplineTransform.GetScale3D(),
        ),
        o > MathUtils_1.MathUtils.KindaSmallNumber &&
          this.TmpVector2.MultiplyEqual(o),
        this.DebugMode &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Movement",
              43,
              "InitSplineTransform",
              ["InitLocation", t.InitLocation],
              ["this.TmpQuat2", this.TmpQuat2],
              ["this.TmpVector", this.TmpVector],
              ["scale", o],
            ),
          this.DebugDraw(
            t.TargetPos.ToUeVector(),
            ColorUtils_1.ColorUtils.LinearBlack,
            40,
          )),
        this.TmpTransform.Set(t.InitLocation, this.TmpQuat2, this.TmpVector2),
        this.SplineCurves.SetSplineTransform(this.TmpTransform, !1),
        this.SplineCurves.GetWorldLocationAtSplinePoint(0, this.TmpVector),
        Vector_1.Vector.DistSquared(this.TmpVector, t.InitLocation)),
      h = Vector_1.Vector.DistSquared(
        this.TmpVector,
        t.CharActorComp.ActorLocationProxy,
      );
    return o > MIN_UPDATE_SPLINE_LENGTH_SQUARED ||
      h > MIN_UPDATE_SPLINE_LENGTH_SQUARED
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Movement",
            43,
            "初始点位置和样条第一个点位置距离太远了。",
            ["样条点和初始点距离Squared", o],
            ["样条点和当前坐标距离Squared", h],
            ["startLocation", this.TmpVector],
            ["ActorLocation", t.CharActorComp?.ActorLocationProxy],
          ),
        !1)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Movement",
            43,
            "样条移动",
            ["Location", t.CharActorComp.ActorLocationProxy],
            ["TargetPos", t.TargetPos],
            ["splineLen", i],
            ["distance", s],
            ["splineLineLength", e],
          ),
        !0);
  }
  GetTargetPos(t, i) {
    if (
      t.RefreshTarget(
        this.TargetParam,
        this.TargetSocketPosition,
        this.PositionDatumTarget,
      )
    ) {
      if (
        (t.SocketName && t.TargetCharActorComp?.Actor
          ? i.FromUeVector(
              t.TargetCharActorComp.Actor.Mesh.GetSocketLocation(
                FNameUtil_1.FNameUtil.GetDynamicFName(t.SocketName),
              ),
            )
          : i.DeepCopy(t.TargetActorComp.ActorLocationProxy),
        this.TargetPositionOffset)
      ) {
        switch (
          (this.DebugMode &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Movement", 43, "目标位置偏移前目标点坐标 ", [
                "TargetPos",
                i,
              ]),
            this.DebugDraw(i.ToUeVector(), new UE.LinearColor(1, 0.5, 0, 0))),
          t.TargetOffset.DeepCopy(this.TargetPositionOffset),
          this.TmpVector.Reset(),
          this.OffsetDirectionDatum)
        ) {
          case 0:
            t.CharActorComp &&
              (t.CharActorComp.ActorForwardProxy.Rotation(this.TmpRotator),
              this.TmpRotator.Quaternion(this.TmpQuat),
              this.TmpQuat.RotateVector(t.TargetOffset, t.TargetOffset));
            break;
          case 2:
            t.TargetActorComp &&
              t.CharActorComp &&
              (this.TmpVector.DeepCopy(t.TargetActorComp.ActorLocationProxy),
              this.TmpVector.SubtractionEqual(
                t.CharActorComp.ActorLocationProxy,
              ),
              this.TmpVector.Rotation(this.TmpRotator),
              this.TmpRotator.Quaternion(this.TmpQuat),
              this.TmpQuat.RotateVector(t.TargetOffset, t.TargetOffset));
            break;
          case 1:
            t.TargetActorComp &&
              (t.TargetActorComp.ActorForwardProxy.Rotation(this.TmpRotator),
              this.TmpRotator.Quaternion(this.TmpQuat),
              this.TmpQuat.RotateVector(t.TargetOffset, t.TargetOffset));
        }
        t.TargetActorComp &&
          t.TargetActorComp.ActorQuatProxy.RotateVector(
            t.TargetOffset,
            this.TmpVector,
          ),
          i.AdditionEqual(this.TmpVector);
      }
    } else i.DeepCopy(t.CharActorComp.ActorLocationProxy);
  }
  PositionCorrection(e, o, h) {
    if (
      this.MakePositionCorrection &&
      this.PositionCorrectionConfig &&
      0 === this.PositionCorrectionConfig.ActionType
    ) {
      var r = e.CharActorComp;
      let i = o.ToUeVector(),
        t = r.ActorForward;
      var a,
        _ = this.TmpVector2;
      if (
        (_.DeepCopy(i),
        this.PositionCorrectionConfig.LocationOffset &&
          !this.PositionCorrectionConfig.LocationOffset.IsNearlyZero(
            MathUtils_1.MathUtils.KindaSmallNumber,
          ))
      ) {
        switch (this.PositionCorrectionConfig.LocationType) {
          case 0:
            break;
          case 1:
            e.CharSkillComp &&
              e.CharSkillComp.SkillTarget &&
              (([i, t] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
                e.CharSkillComp.SkillTarget.Entity.GetComponent(1).Owner,
              )),
              (i = e.CharSkillComp.GetTargetTransform().GetLocation()));
            break;
          case 2:
            var n =
              ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
                29,
              ).GetCurrentTarget();
            n &&
              ([i, t] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
                n.Entity.GetComponent(1).Owner,
              ));
            break;
          case 3:
            [i, t] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
              Global_1.Global.BaseCharacter,
            );
            break;
          case 4:
            e.CharActorComp &&
              ((n = ModelManager_1.ModelManager.CreatureModel.GetEntity(
                e.CharActorComp.Entity.GetComponent(0).GetSummonerId(),
              )?.Entity?.GetComponent(1)),
              ([i, t] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
                n.Owner,
              )));
            break;
          case 5:
            [i, t] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
              ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(
                4,
              ).CameraActor,
            );
            break;
          case 6:
            e.CharActorComp &&
              ((n =
                BlackboardController_1.BlackboardController.GetVectorValueByEntity(
                  e.CharActorComp.Entity.Id,
                  this.TargetParam,
                )),
              (i = WorldGlobal_1.WorldGlobal.ToUeVector(n)));
            break;
          case 7:
            e.CharActorComp &&
              ((n =
                BlackboardController_1.BlackboardController.GetIntValueByEntity(
                  e.CharActorComp.Entity.Id,
                  this.TargetParam,
                )),
              (n = EntitySystem_1.EntitySystem.Get(n))?.Valid) &&
              ([i, t] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
                n.GetComponent(155).Owner,
              ));
        }
        switch (this.PositionCorrectionConfig.LocationForwardType) {
          case 0:
            break;
          case 1:
            t = r.Actor.GetActorForwardVector();
            break;
          case 2:
            (t = r.ActorLocation.op_Subtraction(i)).Set(t.X, t.Y, 0);
            break;
          case 3:
            (t = i.op_Subtraction(
              Global_1.Global.CharacterCameraManager.GetCameraLocation(),
            )).Set(t.X, t.Y, 0);
        }
        _.DeepCopy(i);
        var l = new UE.Transform(t.Rotation(), i, Vector_1.Vector.OneVector);
        (i = l.TransformPositionNoScale(
          this.PositionCorrectionConfig.LocationOffset,
        )),
          this.DebugMode &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Movement",
              43,
              "位置基准偏移",
              ["startLocation", _],
              ["targetLocation", i],
              ["direction", t],
              ["LocationOffset", this.PositionCorrectionConfig.LocationOffset],
            );
      }
      if (this.PositionCorrectionConfig.Restrict) {
        let t = r.ActorLocation;
        switch (this.PositionCorrectionConfig.RestrictType) {
          case 0:
            t = Global_1.Global.BaseCharacter.K2_GetActorLocation();
            break;
          case 1:
            break;
          case 2:
            r.Entity.GetComponent(0).IsMonster() &&
              ((a = r.GetInitLocation()), t.Set(a.X, a.Y, a.Z));
        }
        var v,
          l = i.op_Subtraction(t).Size();
        l > this.PositionCorrectionConfig.RestrictDistance &&
          ((v = this.PositionCorrectionConfig.RestrictDistance / l),
          MathUtils_1.MathUtils.LerpVector(t, i, v, i),
          this.DebugMode) &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Movement",
            43,
            "限制距离",
            ["center", t],
            ["distance", l],
            ["targetLocation", i],
            ["rate", v],
          );
      }
      let s = this.TmpVector3;
      if ((s.DeepCopy(i), this.PositionCorrectionConfig.BestSpot)) {
        switch (this.PositionCorrectionConfig.Strategy) {
          case 0:
            var c = (0, SkillBehaviorMisc_1.traceWall)(
              r,
              _,
              s,
              this.PositionCorrectionConfig.DebugTrace,
            );
            if (!c) return;
            s = c[1];
            break;
          case 1: {
            let t = !1;
            this.TmpVector4.Reset();
            var M = this.TmpVector,
              L = this.TmpVector4;
            s.Subtraction(_, M);
            for (const u of angles) {
              M.RotateAngleAxis(u, Vector_1.Vector.UpVectorProxy, L),
                _.Addition(L, s);
              var T = (0, SkillBehaviorMisc_1.traceWall)(
                r,
                _,
                s,
                this.PositionCorrectionConfig.DebugTrace,
              );
              if (!T) return;
              if (!T[0]) {
                (t = !0), (s = T[1]);
                break;
              }
            }
            if (t) break;
            return;
          }
        }
        l = (0, SkillBehaviorMisc_1.traceGround)(
          r,
          s,
          this.PositionCorrectionConfig.DebugTrace,
        );
        if (!l[0]) return;
        (s = l[1]),
          (e.CanSetActorTargetPos = !0),
          this.DebugMode &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Movement", 43, "最佳落脚点", [
              "targetLocation",
              i,
            ]);
      }
      (i = s.ToUeVector()),
        0 < this.PositionCorrectionConfig.Navigation &&
        !UE.NavigationSystemV1.K2_ProjectPointToNavigation(
          GlobalData_1.GlobalData.World,
          i,
          void 0,
          void 0,
          void 0,
          queryExtent,
        )
          ? ((v = (0, puerts_1.$ref)(void 0)),
            UE.NavigationSystemV1.K2_GetRandomLocationInNavigableRadius(
              GlobalData_1.GlobalData.World,
              i,
              v,
              this.PositionCorrectionConfig.Navigation,
            ) && h.DeepCopy((0, puerts_1.$unref)(v)),
            (e.CanSetActorTargetPos = !0))
          : (this.TmpVector.DeepCopy(i),
            this.TmpVector.SubtractionEqual(_),
            o.Addition(this.TmpVector, h),
            this.DebugMode &&
              Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Movement",
                43,
                "加偏移量到最终坐标上",
                ["targetLocation", i],
                ["startLocationVec2", _],
                ["this.TmpVector", this.TmpVector],
                ["targetPos", o],
                ["outPos", h],
              ));
    }
  }
  GetTowardVector(t, i) {
    if (
      (this.MakePositionCorrection &&
        this.PositionCorrectionConfig &&
        (this.DebugMode &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Movement",
              43,
              "修正前目标点坐标 ",
              ["TargetPos", t.TargetPos],
              [
                "CurrentDistance",
                Vector_1.Vector.Dist(
                  t.CharActorComp.ActorLocationProxy,
                  t.TargetPos,
                ),
              ],
            ),
          this.DebugDraw(
            t.TargetPos.ToUeVector(),
            new UE.LinearColor(1, 0.5, 1, 0),
            35,
          )),
        this.PositionCorrection(t, t.LastTargetPos, t.TargetPos)),
      t.CharUnifiedComp?.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
        Vector_1.Vector.DistSquared2D(
          t.TargetPos,
          t.CharActorComp.ActorLocationProxy,
        ) < 1)
    )
      return -1;
    this.DebugMode &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Movement",
          43,
          "位置修正后目标点坐标",
          ["TargetPos", t.TargetPos],
          [
            "CurrentDistance",
            Vector_1.Vector.Dist(
              t.CharActorComp.ActorLocationProxy,
              t.TargetPos,
            ),
          ],
        ),
      this.DebugDraw(
        t.TargetPos.ToUeVector(),
        ColorUtils_1.ColorUtils.LinearRed,
        40,
      )),
      t.TargetPos.Subtraction(
        t.CharActorComp.ActorLocationProxy,
        this.TmpVector,
      ),
      t.TargetPos.Subtraction(t.LastLocation, this.TmpVector2);
    var s = this.TmpVector.DotProduct(this.TmpVector2),
      e = this.TmpVector.Size();
    return e > MAX_MOVE_DISTANCE
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Movement",
            43,
            "目标点距离太远了，不动",
            ["dist", e],
            ["current", t.CharActorComp.ActorLocationProxy],
            ["TargetPos", t.TargetPos],
          ),
        -1)
      : (i.DeepCopy(this.TmpVector),
        s < 0
          ? (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Movement", 43, "和上一次移动相比在后退"),
            -1)
          : e);
  }
  GetRate(t, i) {
    let s = 1;
    t = i.NowTime + t;
    return 1 <
      (s =
        i.TotalTime <= t
          ? 1
          : this.MovementPositionCurve
            ? this.MovementPositionCurve.GetFloatValue(i.NowTime / i.TotalTime)
            : MathUtils_1.MathUtils.GetCubicValue(i.NowTime / i.TotalTime))
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Movement",
            43,
            "rate > 1",
            ["params.NowTime", i.NowTime],
            ["params.TotalTime", i.TotalTime],
          ),
        1)
      : s;
  }
  MoveToTarget(t, i) {
    i.TargetPos.DeepCopy(i.LastTargetPos),
      this.ContinuallyUpdateTargetPosition &&
        (i.LastTargetPos.DeepCopy(i.TargetPos),
        this.GetTargetPos(i, i.TargetPos));
    var s = this.GetTowardVector(i, i.TargetVec),
      e = this.GetRate(t, i);
    if (
      !(
        e <= 0 ||
        s < 0 ||
        (Vector_1.Vector.Lerp(i.InitLocation, i.TargetPos, e, this.TmpVector3),
        this.TmpVector3.SubtractionEqual(i.CharActorComp.ActorLocationProxy),
        i.CharUnifiedComp?.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
          this.TmpVector3.SizeSquared2D() < 1) ||
        (i.LastLocation.Subtraction(
          i.CharActorComp.ActorLocationProxy,
          this.TmpVector,
        ),
        this.TmpVector.SizeSquared() >
          INVALID_LAST_LOCATION_THRESHOLD_SQUARED &&
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Movement",
              43,
              "LastLocation太远，很危险，无视掉",
              ["Actor", i.CharActorComp?.Actor.GetName()],
              ["Last", i.LastLocation],
              ["ActorLast", i.CharActorComp?.LastActorLocation],
              ["Now", i.CharActorComp?.ActorLocationProxy],
              ["this.TargetVec", i.TargetVec],
              ["this.TmpVector", this.TmpVector],
              ["this.TmpVector3", this.TmpVector3],
            ),
          this.TmpVector3.Reset()),
        this.DebugMode &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Movement",
              43,
              "MoveToTarget",
              ["rate", e],
              ["MoveVec", this.TmpVector3],
              ["ActorLocation", i.CharActorComp.ActorLocationProxy],
              ["LastTargetPos", i.LastTargetPos],
              ["TargetVec", i.TargetVec],
            ),
          this.TmpVector2.DeepCopy(i.CharActorComp.ActorLocationProxy),
          this.TmpVector2.AdditionEqual(this.TmpVector3),
          this.DebugDraw(
            this.TmpVector2.ToUeVector(),
            ColorUtils_1.ColorUtils.LinearWhite,
          )),
        this.TmpVector.DeepCopy(this.TmpVector3),
        i.FlyingMove
          ? (i.CharActorComp.AddActorWorldOffset(
              this.TmpVector.ToUeVector(),
              "TsAnimNotifyStateCurveMove直线移动.AddActorWorldOffset",
              !0,
            ),
            i.CharActorComp.ResetAllCachedTime())
          : i.CharActorComp.MoveComp.MoveCharacter(
              this.TmpVector,
              t,
              "TsAnimNotifyStateCurveMove直线移动",
            ),
        1 === e)
      )
    )
      switch (this.MovementProcessDirection) {
        case 2:
          i.TargetPos.Subtraction(
            i.CharActorComp.ActorLocationProxy,
            this.TmpVector,
          ),
            MathUtils_1.MathUtils.LookRotationUpFirst(
              this.TmpVector,
              Vector_1.Vector.UpVectorProxy,
              this.TmpQuat,
            ),
            this.TmpQuat.Rotator(this.TmpRotator),
            i.CharActorComp.SetActorRotation(
              this.TmpRotator.ToUeRotator(),
              "TsAnimNotifyStateCurveMove.TowardsTarget",
              !1,
            );
          break;
        case 1:
          i.TargetPos.Subtraction(i.InitLocation, this.TmpVector),
            MathUtils_1.MathUtils.LookRotationUpFirst(
              this.TmpVector,
              Vector_1.Vector.UpVectorProxy,
              this.TmpQuat,
            ),
            this.TmpQuat.Rotator(this.TmpRotator),
            i.CharActorComp.SetActorRotation(
              this.TmpRotator.ToUeRotator(),
              "TsAnimNotifyStateCurveMove.AlongTrack",
              !1,
            );
      }
  }
  MoveToTargetAlongSpline(t, i) {
    i.TargetPos.DeepCopy(i.LastTargetPos),
      this.ContinuallyUpdateTargetPosition &&
        (i.LastTargetPos.DeepCopy(i.TargetPos),
        this.GetTargetPos(i, i.TargetPos));
    var s = this.GetTowardVector(i, i.TargetVec),
      e = this.GetRate(t, i);
    if (!(e <= 0 || s < 0)) {
      this.ContinuallyUpdateTargetPosition &&
        (Math.abs(e - 1) > MathUtils_1.MathUtils.KindaSmallNumber || 0 < e) &&
        ((o = this.SplineCurves.GetSplinePointsNum()),
        this.SplineCurves.GetWorldLocationAtSplinePoint(o - 1, this.TmpVector),
        100 < (h = Vector_1.Vector.DistSquared(this.TmpVector, i.TargetPos))) &&
        h < INVALID_LAST_LOCATION_THRESHOLD_SQUARED &&
        (this.SplineCurves.SetLocationAtSplinePoint(o - 1, i.TargetPos, 1, !0),
        this.DebugMode) &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Movement",
          43,
          "SetLocationAtSplinePoint ",
          ["changeDist", h],
          ["TargetPos", i.TargetPos],
          ["SplinePoint", this.TmpVector],
        );
      var o = this.SplineCurves.GetSplineLength(),
        h =
          (this.SplineCurves.GetTransformAtDistanceAlongSpline(
            o * e,
            1,
            this.TmpTransform,
          ),
          this.TmpTransform.GetLocation());
      if (
        (this.TmpVector.DeepCopy(h),
        this.TmpVector.SubtractionEqual(i.CharActorComp.ActorLocationProxy),
        !(
          i.CharUnifiedComp?.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
          this.TmpVector.SizeSquared2D() < 1
        ) &&
          (this.DebugMode &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Movement",
                43,
                "MoveToTargetAlongSpline",
                ["MoveVec", this.TmpVector],
                ["MoveVecSize", this.TmpVector?.Size()],
                ["dist", s],
                ["rate", e],
                ["SplineLength", o],
                ["this.TargetVec", i.TargetVec],
                ["this.TargetPos", i.TargetPos],
              ),
            this.DebugDraw(
              h.ToUeVector(),
              ColorUtils_1.ColorUtils.LinearWhite,
            )),
          i.LastLocation.Subtraction(
            i.CharActorComp.ActorLocationProxy,
            this.TmpVector2,
          ),
          this.TmpVector2.SizeSquared() >
            INVALID_LAST_LOCATION_THRESHOLD_SQUARED &&
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Movement",
                43,
                "LastLocation太远，很危险，无视掉",
                ["Actor", i.CharActorComp?.Actor.GetName()],
                ["Last", i.LastLocation],
                ["ActorLast", i.CharActorComp?.LastActorLocation],
                ["Now", i.CharActorComp?.ActorLocationProxy],
                ["this.TargetVec", i.TargetVec],
                ["this.TmpVector", this.TmpVector],
              ),
            this.TmpVector.Reset()),
          i.FlyingMove
            ? (i.CharActorComp.AddActorWorldOffset(
                this.TmpVector.ToUeVector(),
                "TsAnimNotifyStateCurveMove沿样条移动.AddActorWorldOffset",
                !0,
              ),
              i.CharActorComp.ResetAllCachedTime())
            : i.CharActorComp.MoveComp.MoveCharacter(
                this.TmpVector,
                t,
                "TsAnimNotifyStateCurveMove沿样条移动",
              ),
          1 !== e))
      )
        switch (this.MovementProcessDirection) {
          case 2:
            i.TargetPos.Subtraction(
              i.CharActorComp.ActorLocationProxy,
              this.TmpVector,
            ),
              MathUtils_1.MathUtils.LookRotationUpFirst(
                this.TmpVector,
                i.CharActorComp.ActorUpProxy,
                this.TmpQuat,
              ),
              this.TmpQuat.Rotator(this.TmpRotator),
              i.CharActorComp.SetActorRotation(
                this.TmpRotator.ToUeRotator(),
                "TsAnimNotifyStateCurveMove.TowardsTarget",
                !1,
              );
            break;
          case 1:
            this.TmpQuat.FromUeQuat(this.TmpTransform.GetRotation()),
              this.TmpRotator.DeepCopy(this.TmpQuat.Rotator()),
              i.CharActorComp.SetActorRotation(
                this.TmpRotator.ToUeRotator(),
                "TsAnimNotifyStateCurveMove.AlongTrack",
                !1,
              );
        }
    }
  }
  DebugDraw(t, i, s = DEBUG_RADIUS, e = DEBUG_DURATION) {
    UE.KismetSystemLibrary.DrawDebugSphere(
      GlobalData_1.GlobalData.World,
      t,
      s,
      DEBUG_SEGMENTS,
      i,
      e,
    );
  }
  GetNotifyName() {
    return "曲线定点位移";
  }
}
exports.default = TsAnimNotifyStateCurveMove;
//# sourceMappingURL=TsAnimNotifyStateCurveMove.js.map
