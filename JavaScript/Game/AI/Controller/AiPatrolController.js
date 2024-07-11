"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PatrolPoint = exports.AiPatrolController = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  Net_1 = require("../../../Core/Net/Net"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  BlackboardController_1 = require("../../World/Controller/BlackboardController"),
  AiPatrolConfig_1 = require("./AiPatrolConfig"),
  PATROL_ANGLE_LIMIT = 15,
  TRACE_DISTANCE = 500,
  PROFILE_KEY = "AiPatrolController_GenerateNavigationPoint",
  INDEX_KEY = "PatrolIndex",
  TIMES_KEY = "PatrolTimes",
  END_KEY = "PatrolEnd";
class AiPatrolController {
  constructor() {
    (this.Hte = void 0),
      (this.Xie = new Array()),
      (this.$ie = void 0),
      (this.Yie = void 0),
      (this.Jie = void 0),
      (this.zie = void 0),
      (this.Zie = !1),
      (this.eoe = void 0),
      (this.E0 = 0),
      (this.toe = 0),
      (this.ioe = 0),
      (this.ooe = !1),
      (this.StartWithInversePath = void 0),
      (this.roe = void 0);
  }
  Init(t) {
    (this.Hte = t),
      Info_1.Info.IsBuildDevelopmentOrDebug ||
        (AiPatrolController.OpenNpcPatrolDebugMode = !1);
  }
  get IsInitialized() {
    return this.Zie;
  }
  HasPatrolConfig() {
    return !!this.$ie && !!this.Zie && 0 !== this.Xie.length;
  }
  ResetPatrol(t) {
    var i = this.Hte.Entity.GetComponent(38),
      i = ConfigManager_1.ConfigManager.AiConfig.LoadAiPatrolConfig(
        i.AiController.AiBase,
        t,
      );
    this.ResetConfig(i);
  }
  ResetPatrolById(t) {
    t = ConfigManager_1.ConfigManager.AiConfig.LoadAiPatrolConfigById(t);
    this.ResetConfig(t);
  }
  ResetConfig(t) {
    var i;
    t &&
      t !== this.$ie &&
      ((this.$ie = t),
      this.Yie || (this.Yie = new AiPatrolConfig_1.AiPatrolConfig()),
      this.Yie.Init(t),
      (this.Zie = !1),
      (t = this.Hte.CreatureData?.GetPbEntityInitData())) &&
      ((t = (0, IComponent_1.getComponent)(t.ComponentsData, "AiComponent")) &&
        (void 0 !== t.Patrol
          ? (t.Patrol.SplineEntityId &&
              (this.Yie.SplineEntityId = t.Patrol.SplineEntityId),
            t.Patrol.SplineEntityId || (this.Yie.Id = 0),
            t.Patrol.IsCircle
              ? ((this.Yie.Loop = !0), (this.Yie.CirclePatrol = !0))
              : (this.Yie.CirclePatrol = !1),
            ((t = Protocol_1.Aki.Protocol.QYn.create()).rkn =
              MathUtils_1.MathUtils.NumberToLong(
                this.Hte.CreatureData.GetCreatureDataId(),
              )),
            Net_1.Net.Call(21134, t, () => {}))
          : (this.Yie.Id = 0)),
      0 !== this.Yie.Id) &&
      (t = this.Hte.Entity.GetComponent(185)) &&
      !t.HasTag((i = 2003306528)) &&
      t.AddTag(i);
  }
  GetConfig() {
    return this.Yie;
  }
  GeneratePatrol(t) {
    this.Yie
      ? this.Zie ||
        (this.Yie.SplineEntityId &&
          ((this.Zie = !0),
          this.HC(t),
          void 0 !==
            (t =
              this.Hte.CreatureData.ComponentDataMap.get("Cps")?.Cps?.okn)) &&
          (this.StartWithInversePath = !t))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "AI",
          43,
          "[AiPatrolController] NewPatrolConfig没有正确初始化",
          ["EntityId", this.E0],
        );
  }
  HC(t) {
    var i,
      e,
      r = this.Yie.SplineEntityId,
      o = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(r);
    o
      ? (i = (0, IComponent_1.getComponent)(
          o.ComponentsData,
          "SplineComponent",
        ))
        ? ((o = Vector_1.Vector.Create(
            o.Transform?.Pos.X ?? 0,
            o.Transform?.Pos.Y ?? 0,
            o.Transform?.Pos.Z ?? 0,
          )),
          i.Option.Type !== IComponent_1.ESplineType.Patrol
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Level",
                32,
                "[AiPatrolController.InitSplineNew] SplineComponent配置类型不是Patrol",
                ["SplineEntityId", r],
              )
            : ((i =
                ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
                  r,
                  this.Hte.CreatureData.GetPbDataId(),
                )),
              (e =
                ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
                  r,
                )),
              ObjectUtils_1.ObjectUtils.IsValid(e)
                ? (e.K2_SetActorLocation(o.ToUeVector(), !1, void 0, !1),
                  (this.zie = i),
                  (this.Jie = e),
                  this.noe("新样条实体" + r, t),
                  this.soe())
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Level",
                    32,
                    "[AiPatrolController.InitSplineNew] Spline获取失败",
                    ["SplineEntityId", r],
                  )))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Level",
            32,
            "[AiPatrolController.InitSplineNew] 无法找到SplineComponent配置",
            ["SplineEntityId", r],
          )
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Level",
          32,
          "[AiPatrolController.InitSplineNew] 无法找到Spline Entity",
          ["SplineEntityId", r],
        );
  }
  noe(t, r) {
    if (this.Yie && this.zie) {
      var o = this.Hte.CreatureData?.GetPbEntityInitData();
      let i = void 0;
      o &&
        ((o = (0, IComponent_1.getComponent)(o.ComponentsData, "AiComponent")),
        (i = o?.Patrol));
      var s = this.zie,
        h = this.Jie,
        a = this.Yie.IsNavigation,
        n = this.Yie.Sampling,
        o = s.GetNumberOfSplinePoints(),
        l = GlobalData_1.GlobalData.World,
        _ = this.Xie;
      (_.length = 0), _.splice(0, _.length);
      for (let t = 0, e = o; t < e; t++) {
        var C = s.GetWorldLocationAtSplinePoint(t),
          d = (a && l && this.aoe(C, l), new PatrolPoint());
        if (
          ((d.IsMain = !0),
          (d.Point = Vector_1.Vector.Create(C)),
          this.hoe(h),
          this.loe(t, d, h),
          _.push(d),
          i && !i.Disabled && this._oe(t, d, h),
          r)
        ) {
          let i = s.GetDirectionAtSplinePoint(t, 1);
          if (0 < n && t < e - 1) {
            var C = s.GetDistanceAlongSplineAtSplinePoint(t),
              E = s.GetDistanceAlongSplineAtSplinePoint(t + 1);
            for (let t = C + n; t < E; t += n) {
              var c,
                P = s.GetDirectionAtDistanceAlongSpline(t, 1);
              MathUtils_1.MathUtils.GetAngleByVectorDot(i, P) <
                PATROL_ANGLE_LIMIT ||
                ((i = P),
                (P = s.GetWorldLocationAtDistanceAlongSpline(t)),
                a && l && this.aoe(P, l),
                ((c = new PatrolPoint()).IsMain = !1),
                (c.Point = Vector_1.Vector.Create(P)),
                _.push(c));
            }
          }
        }
      }
      0 === _.length &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Level", 30, "Spline初始化移动点为空", ["Path", t]);
    }
  }
  aoe(t, i) {
    if (!AiPatrolController.uoe) {
      const e = UE.NewObject(UE.TraceLineElement.StaticClass());
      (e.bIsSingle = !0),
        (e.bIgnoreSelf = !0),
        e.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
        (AiPatrolController.uoe = e);
    }
    const e = AiPatrolController.uoe;
    (e.WorldContextObject = i),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, t),
      e.SetEndLocation(t.X, t.Y, t.Z - TRACE_DISTANCE);
    var i = TraceElementCommon_1.TraceElementCommon.LineTrace(e, PROFILE_KEY),
      r = e.HitResult;
    (i ||
      (e.SetEndLocation(t.X, t.Y, t.Z + TRACE_DISTANCE),
      TraceElementCommon_1.TraceElementCommon.LineTrace(e, PROFILE_KEY))) &&
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(r, 0, t);
  }
  hoe(t) {
    t.SplineData.Type === IComponent_1.ESplineType.Patrol &&
      ((t = t.SplineData).CycleOption &&
        (t.CycleOption.Type === IComponent_1.EPatrolCycleMode.Loop
          ? ((this.Yie.Loop = !0),
            (this.Yie.CirclePatrol = t.CycleOption.IsCircle))
          : (this.Yie.Loop = !1)),
      t.IsFloating && (this.Yie.ContainZ = t.IsFloating),
      t.IsNavigation && (this.Yie.IsNavigation = t.IsNavigation),
      t.TurnSpeed) &&
      (this.Yie.TurnSpeed = t.TurnSpeed);
  }
  loe(t, i, e) {
    e = e.SplineData;
    (i.MoveState = e.Points[t].MoveState),
      (i.MoveSpeed = e.Points[t].MoveSpeed),
      (i.IsIgnorePoint = e.Points[t].IgnorePoint ?? !1),
      (i.StayTime = e.Points[t].StayTime ?? 0),
      (i.IsHide = e.Points[t].IsHide ?? !1);
  }
  _oe(t, i, e) {
    e = e.SplineData.Points[t].Actions;
    e && (i.Actions = e);
  }
  GetNearestPatrolPointIndex(e) {
    let r = 0,
      o = Number.MAX_VALUE;
    for (let t = 0, i = this.Xie.length; t < i; t++) {
      var s = this.Xie[t];
      s.IsMain &&
        (s = Vector_1.Vector.DistSquared(e, s.Point)) < o &&
        ((o = s), (r = t));
    }
    return r;
  }
  ResetBaseInfoByMainPoint(e, r, o) {
    var s = this.ioe;
    if (!(0 === this.Xie.length || this.Xie.length <= s)) {
      let i = this.Xie[s];
      if (!i?.IsMain)
        for (let t = s; -1 < t; t--) {
          var h = this.Xie[t];
          if (h?.IsMain) {
            i = h;
            break;
          }
        }
      let t = o;
      i?.IsMain && 0 < i.MoveState && (t = i.MoveState),
        this.ChangeMoveState(r, t),
        i?.IsMain &&
          (this.ChangeMoveSpeed(e, r, i.MoveSpeed),
          (s = this.Hte).SkeletalMesh?.SetVisibility(!i.IsHide),
          (o = s.Entity.GetComponent(185))) &&
          ((e = -841499802),
          i.IsHide
            ? o.HasTag(e) || o.AddTag(e)
            : o.HasTag(e) && o.RemoveTag(e));
    }
  }
  ChangeMoveSpeed(t, i, e) {
    t &&
      (0 < e ? t.SetMaxSpeed(e) : i && ((e = i.MoveState), t.ResetMaxSpeed(e)));
  }
  CheckMoveStateChanged(t, i) {
    let e = CharacterUnifiedStateTypes_1.ECharMoveState.Stand;
    switch (i) {
      case 1:
        e = CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
        break;
      case 2:
        e = CharacterUnifiedStateTypes_1.ECharMoveState.Run;
    }
    return (
      t &&
        (i = t.MoveState) !== e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          30,
          "巡逻过程中MoveState发生改变",
          ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
          ["CorrectState", e],
          ["NowState", i],
        ),
      !1
    );
  }
  ChangeMoveState(t, i) {
    let e = CharacterUnifiedStateTypes_1.ECharMoveState.Stand;
    switch (i) {
      case 1:
        e = CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
        break;
      case 2:
        e = CharacterUnifiedStateTypes_1.ECharMoveState.Run;
    }
    t && t.MoveState !== e && t.SetMoveState(e);
  }
  AddPerformanceTags(e) {
    this.eoe || (this.eoe = new Array());
    for (let t = 0, i = e.length; t < i; t++) this.eoe.push(e[t]);
    var t,
      i = this.Hte.Entity.GetComponent(185);
    i && !i.HasTag((t = -1645015979)) && i.AddTag(t);
  }
  GetNextPerformanceTag() {
    if (this.eoe && 0 !== this.eoe.length) return this.eoe.shift();
  }
  soe() {
    this.Yie?.SplineEntityId &&
      this.Jie?.IsValid() &&
      ((this.Jie = void 0),
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
        this.Yie.SplineEntityId,
        this.Hte.CreatureData.GetPbDataId(),
      )),
      (this.zie = void 0);
  }
  StartPatrol(t, i) {
    var e = this.Hte,
      i =
        ((this.E0 = e.Entity.Id),
        (this.roe = i),
        BlackboardController_1.BlackboardController.SetIntValueByEntity(
          this.E0,
          END_KEY,
          0,
        ),
        BlackboardController_1.BlackboardController.GetIntValueByEntity(
          this.E0,
          TIMES_KEY,
        ));
    i
      ? ((this.toe = i), this.toe % 2 != 0 && (this.ooe = !0))
      : ((this.toe = 0), (this.ooe = !!this.StartWithInversePath)),
      t
        ? void 0 !==
            (i =
              BlackboardController_1.BlackboardController.GetIntValueByEntity(
                this.E0,
                INDEX_KEY,
              )) && i < this.Xie.length
          ? this.coe(i)
          : ((t = this.GetNearestPatrolPointIndex(e.ActorLocationProxy)),
            this.coe(t))
        : ((i = this.GetNearestPatrolPointIndex(e.ActorLocationProxy)),
          this.coe(i)),
      BlackboardController_1.BlackboardController.SetIntValueByEntity(
        this.E0,
        INDEX_KEY,
        this.ioe,
      );
  }
  coe(t) {
    (this.ioe = t), this.roe && this.roe();
  }
  CheckPatrolEnd() {
    return this.$ie.CirclePatrol ? this.moe() : this.doe();
  }
  SetPatrolIndex(t) {
    this.ioe !== t &&
      ((this.ioe = t),
      this.Yie.CirclePatrol
        ? (this.ioe + 1) % this.Xie.length === this.Yie.StartIndex &&
          (++this.toe,
          BlackboardController_1.BlackboardController.SetIntValueByEntity(
            this.E0,
            TIMES_KEY,
            this.toe,
          ),
          this.Yie.Loop ||
            BlackboardController_1.BlackboardController.SetIntValueByEntity(
              this.E0,
              END_KEY,
              1,
            ))
        : this.ooe
          ? 0 === this.ioe &&
            ((this.ooe = !1),
            ++this.toe,
            BlackboardController_1.BlackboardController.SetIntValueByEntity(
              this.E0,
              TIMES_KEY,
              this.toe,
            ))
          : this.ioe === this.Xie.length - 1 &&
            (++this.toe,
            BlackboardController_1.BlackboardController.SetIntValueByEntity(
              this.E0,
              TIMES_KEY,
              this.toe,
            ),
            this.Yie.Loop
              ? (this.ooe = !0)
              : BlackboardController_1.BlackboardController.SetIntValueByEntity(
                  this.E0,
                  END_KEY,
                  1,
                )),
      this.roe) &&
      this.roe();
  }
  moe() {
    if (
      (this.coe((this.ioe + 1) % this.Xie.length),
      this.ioe === this.$ie.StartIndex)
    ) {
      if (!this.$ie.Loop)
        return (
          BlackboardController_1.BlackboardController.SetIntValueByEntity(
            this.E0,
            END_KEY,
            1,
          ),
          !0
        );
      ++this.toe,
        BlackboardController_1.BlackboardController.SetIntValueByEntity(
          this.E0,
          TIMES_KEY,
          this.toe,
        );
    }
    return !1;
  }
  doe() {
    if (this.ooe)
      0 === this.ioe
        ? ((this.ooe = !1),
          this.coe(0),
          ++this.toe,
          BlackboardController_1.BlackboardController.SetIntValueByEntity(
            this.E0,
            TIMES_KEY,
            this.toe,
          ))
        : this.coe(this.ioe - 1);
    else if (this.ioe === this.Xie.length - 1) {
      if (
        (++this.toe,
        BlackboardController_1.BlackboardController.SetIntValueByEntity(
          this.E0,
          TIMES_KEY,
          this.toe,
        ),
        !this.$ie.Loop)
      )
        return (
          BlackboardController_1.BlackboardController.SetIntValueByEntity(
            this.E0,
            END_KEY,
            1,
          ),
          !0
        );
      (this.ooe = !0), this.coe(this.Xie.length - 2);
    } else this.coe(this.ioe + 1);
    return !1;
  }
  PatrolFinish() {
    BlackboardController_1.BlackboardController.GetIntValueByEntity(
      this.E0,
      INDEX_KEY,
    ) !== this.ioe &&
      BlackboardController_1.BlackboardController.SetIntValueByEntity(
        this.E0,
        INDEX_KEY,
        this.ioe,
      ),
      (this.roe = void 0);
  }
  GetPatrolPoint(t) {
    if (this.Xie && 0 !== this.Xie.length && !(this.Xie.length <= t))
      return this.Xie[t];
  }
  get PatrolIndex() {
    return this.ioe;
  }
  get PatrolPoint() {
    return this.GetPatrolPoint(this.ioe);
  }
  get AllPatrolPoints() {
    return this.Xie;
  }
  GetLastPatrolPoint() {
    var t = BlackboardController_1.BlackboardController.GetIntValueByEntity(
      this.E0,
      INDEX_KEY,
    );
    if (t) {
      t = this.GetPatrolPoint(t);
      if (t) return t.Point;
    }
  }
  Clear() {
    (this.Xie.length = 0),
      (this.$ie = void 0),
      (this.Yie = void 0),
      (this.roe = void 0),
      this.soe();
  }
}
(exports.AiPatrolController = AiPatrolController).OpenNpcPatrolDebugMode = !0;
class PatrolPoint {
  constructor() {
    (this.IsMain = !1),
      (this.Point = void 0),
      (this.MoveState = 0),
      (this.MoveSpeed = 0),
      (this.IsIgnorePoint = !1),
      (this.StayTime = 0),
      (this.IsHide = !1),
      (this.Actions = void 0);
  }
}
exports.PatrolPoint = PatrolPoint;
//# sourceMappingURL=AiPatrolController.js.map
