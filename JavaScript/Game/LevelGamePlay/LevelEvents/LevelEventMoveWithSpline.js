"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventMoveWithSpline = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  Net_1 = require("../../../Core/Net/Net"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  SceneItemMoveComponent_1 = require("../../NewWorld/SceneItem/Common/Component/SceneItemMoveComponent"),
  LevelGameplayActionsDefine_1 = require("../LevelGameplayActionsDefine"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class LevelEventMoveWithSpline extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.Jie = void 0),
      (this.sDe = void 0),
      (this.E0 = 0),
      (this.gLe = void 0),
      (this.YLe = !1),
      (this.xDe = void 0),
      (this.wDe = 0),
      (this.xsa = (e, t) => {
        t !== CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
          (t = this.sDe.Entity.GetComponent(38)).IsMovingToLocation() &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("AI", 43, "MoveWithSpline打断墙上移动"),
          t.MoveToLocationEnd(2));
      }),
      (this.BDe = () => {
        var e = this.sDe.Entity.GetComponent(116);
        e?.Valid &&
          this.xDe &&
          (e.RemoveStopMoveCallback(this.BDe),
          e.StartPatrol(
            this.xDe.Spline,
            this.xDe.Speeds,
            this.xDe.WaitTime,
            !1,
            !1,
            this.gLe?.IsLookDir ?? !1,
            this.bDe,
          ),
          e.AddStopMoveCallback(this.qDe));
      }),
      (this.qDe = () => {
        var e = this.sDe.Entity.GetComponent(116);
        e.RemoveStopMoveCallback(this.qDe), e.StopPatrol();
      }),
      (this.zpe = (e, t) => {
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "LevelEvent",
            43,
            "[LevelEventMoveWithSpline]检测到移动实体被销毁，直接设置节点执行成功",
            ["PbDataId", this.wDe],
          ),
          this.FinishExecute(!0);
      }),
      (this.GDe = (e) => {
        var t, i, s;
        this.sDe?.Valid &&
          (this.gLe?.CheckClimb &&
            EventSystem_1.EventSystem.HasWithTarget(
              this.sDe.Entity,
              EventDefine_1.EEventName.CharOnPositionStateChanged,
              this.xsa,
            ) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              this.sDe.Entity,
              EventDefine_1.EEventName.CharOnPositionStateChanged,
              this.xsa,
            ),
          (i =
            this.sDe.Entity.GetComponent(
              3,
            ))?.Actor.CapsuleComponent.SetCollisionResponseToChannel(
            QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
            2,
          ),
          this.IsAsync ||
            (GlobalData_1.GlobalData.IsPlayInEditor &&
              ObjectUtils_1.ObjectUtils.IsValid(this.Jie) &&
              ActorSystem_1.ActorSystem.Put(this.Jie),
            i?.ClearInput(),
            this.YLe &&
              ((i = this.sDe.Entity.GetComponent(38)),
              (t = this.sDe.Entity.GetComponent(92)),
              i && (i.StopMove(!1), (s = t?.MoveState), i.ResetMaxSpeed(s)),
              this.gLe?.CheckClimb &&
                (i = this.sDe.Entity.GetComponent(31)) &&
                t &&
                t.PositionState ===
                  CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
                i.KickWallExit(),
              (s = this.sDe.Entity.GetComponent(54))?.ClearMoveVectorCache(),
              s?.SetActive(!0)),
            (this.sDe.Entity.GetComponent(38).IsSpecialMove = !1),
            this.FinishExecute(!0)));
      }),
      (this.bDe = () => {
        this.IsAsync ||
          (GlobalData_1.GlobalData.IsPlayInEditor &&
            ObjectUtils_1.ObjectUtils.IsValid(this.Jie) &&
            ActorSystem_1.ActorSystem.Put(this.Jie),
          this.sDe?.Valid &&
            (this.sDe.Entity.GetComponent(116).RemoveStopMoveCallback(this.bDe),
            this.FinishExecute(!0)));
      });
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(!0);
  }
  ExecuteNew(e, t) {
    if (e) {
      switch (((this.gLe = e), this.gLe.MoveTarget.Type)) {
        case "Entity":
          (this.YLe = !1), (this.E0 = this.gLe.MoveTarget.EntityId);
          break;
        case "Player":
          return (this.YLe = !0), void this.ExecuteWhenEntitiesReady();
      }
      this.E0
        ? this.CreateWaitEntityTask(this.E0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelEvent",
              7,
              "[MoveWithSpline]配置的目标Id无效",
              ["PbDataId", this.E0],
            ),
          this.FinishExecute(!1));
    } else this.FinishExecute(!1);
  }
  ExecuteWhenEntitiesReady() {
    var e, t, i, s, o;
    this.YLe
      ? (this.sDe = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
      : (this.sDe =
          ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            this.E0,
          )),
      this.sDe &&
        !EventSystem_1.EventSystem.HasWithTarget(
          this.sDe,
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ) &&
        EventSystem_1.EventSystem.AddWithTarget(
          this.sDe,
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ),
      this.sDe?.IsInit
        ? ((e = this.sDe.Entity.GetComponent(40)),
          (i = this.sDe.Entity.GetComponent(1)),
          e?.IsAiDriver
            ? (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "LevelEvent",
                  7,
                  "当前实体正在由行为树AI驱动，请检查需求设计是否合理（沿着样条移动）",
                  ["PbDataId", this.E0],
                  ["Name", i.Owner.GetName()],
                ),
              this.FinishExecute(!1))
            : ((e = this.gLe.SplineEntityId),
              (i =
                ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
                  e,
                ))
                ? (t = (0, IComponent_1.getComponent)(
                    i.ComponentsData,
                    "SplineComponent",
                  ))
                  ? ((i = Vector_1.Vector.Create(
                      i.Transform?.Pos.X ?? 0,
                      i.Transform?.Pos.Y ?? 0,
                      i.Transform?.Pos.Z ?? 0,
                    )),
                    t.Option.Type !== IComponent_1.ESplineType.Patrol
                      ? (Log_1.Log.CheckError() &&
                          Log_1.Log.Error(
                            "Level",
                            32,
                            "[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] SplineComponent配置类型不是patrol",
                            ["SplineEntityId", e],
                          ),
                        this.FinishExecute(!1))
                      : ((this.wDe =
                          this.sDe.Entity.GetComponent(0).GetPbDataId()),
                        (s =
                          ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
                            e,
                            this.wDe,
                          )),
                        (o =
                          ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
                            e,
                          ))?.IsValid()
                          ? (o.K2_SetActorLocation(
                              i.ToUeVector(),
                              !1,
                              void 0,
                              !1,
                            ),
                            this.NDe(s, t.Option))
                          : (Log_1.Log.CheckError() &&
                              Log_1.Log.Error(
                                "Level",
                                32,
                                "[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] 获取的spline actor非法",
                                ["SplineEntityId", e],
                              ),
                            this.FinishExecute(!1))))
                  : (Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "Level",
                        32,
                        "[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] 无法找到SplineComponent配置",
                        ["SplineEntityId", e],
                      ),
                    this.FinishExecute(!1))
                : (Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "Level",
                      32,
                      "[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] 无法找到Spline Entity",
                      ["SplineEntityId", e],
                    ),
                  this.FinishExecute(!1))))
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("LevelEvent", 7, "[MoveWithSpline]实体无效", [
              "PbDataId",
              this.E0,
            ]),
          this.FinishExecute(!1));
  }
  NDe(t, e) {
    var i = new Array(),
      s = t.GetNumberOfSplinePoints(),
      o = LevelGeneralContextDefine_1.EntityContext.Create(this.sDe.Id);
    const n = this.gLe.StartPointIndex
        ? MathUtils_1.MathUtils.Clamp(this.gLe.StartPointIndex, 0, s - 1)
        : 0,
      h = this.gLe.EndPointIndex
        ? MathUtils_1.MathUtils.Clamp(this.gLe.EndPointIndex, 0, s - 1)
        : s - 1;
    var r,
      a = [];
    for (let e = n; e <= h; ++e)
      a.push(Vector_1.Vector.Create(t.GetWorldLocationAtSplinePoint(e)));
    this.gLe.IsForceToFirstPoint &&
      ((s = a[0]),
      (r = t.GetRotationAtSplinePoint(n, 1)),
      (s = {
        TelePortConfig: {
          TargetPos: { X: s.X, Y: s.Y, Z: s.Z, A: r.Yaw },
          Type: IAction_1.ETeleportType.FixedPos,
        },
      }),
      ((r = new LevelGameplayActionsDefine_1.CommonActionInfo()).Name =
        "SetPlayerPos"),
      (r.Params = s),
      i.push(r)),
      this.YLe &&
        (this.sDe.Entity.GetComponent(3).ClearInput(),
        (s = this.sDe.Entity.GetComponent(54)).ClearMoveVectorCache(),
        s.SetActive(!1),
        (r = this.sDe.Entity.GetComponent(34))) &&
        r.EndOwnerAndFollowSkills(),
      0 < i.length
        ? ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
            i,
            o,
            () => {
              this.ODe(t, e, n, h);
            },
          )
        : this.ODe(t, e, n, h),
      !GlobalData_1.GlobalData.IsPlayInEditor &&
        ObjectUtils_1.ObjectUtils.IsValid(this.Jie) &&
        ActorSystem_1.ActorSystem.Put(this.Jie),
      this.IsAsync && this.FinishExecute(!0);
  }
  ODe(e, t, i, s) {
    this.sDe.Entity.GetComponent(0).GetEntityType() ===
    Protocol_1.Aki.Protocol.kks.Proto_SceneItem
      ? this.kDe(e, t)
      : this.FDe(e, t, i, s);
  }
  FDe(t, i, s, o) {
    if (
      this.gLe?.CheckClimb &&
      this.sDe.Entity.GetComponent(92)?.PositionState !==
        CharacterUnifiedStateTypes_1.ECharPositionState.Climb
    ) {
      var e = this.sDe.Entity.GetComponent(31);
      if (e) {
        var n = this.gLe.CheckClimb.Direction,
          n = Rotator_1.Rotator.Create(n.Y ?? 0, n.Z ?? 0, n.X ?? 0),
          h = Vector_1.Vector.Create(),
          n = (n.Vector(h), e.DetectClimbWithDirect(!1, h.ToUeVector()));
        if (!n)
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("AI", 43, "MoveWithSpline上墙失败"),
            void this.GDe(2)
          );
      }
    }
    var r = i && i?.Points.length,
      a = [];
    for (let e = s; e <= o; ++e)
      a.push(Vector_1.Vector.Create(t.GetWorldLocationAtSplinePoint(e)));
    var l = [];
    for (let e = s; e <= o; ++e) {
      var _,
        v = e - s,
        v = { Index: v, Position: a[v] };
      r &&
        ((_ = i.Points[e])?.MoveSpeed && (v.MoveSpeed = _.MoveSpeed),
        _?.MoveState) &&
        (v.MoveState = _.MoveState),
        l.push(v);
    }
    (e = {
      Points: l,
      Navigation: i?.IsNavigation ?? !1,
      IsFly: this.gLe.IsFollowStrictly ?? i?.IsFloating ?? !1,
      DebugMode: !0,
      Loop: !1,
      UseNearestPoint: !0,
      Callback: this.GDe,
      ReturnFalseWhenNavigationFailed: !1,
    }),
      i?.CycleOption &&
        i.CycleOption.Type === IComponent_1.EPatrolCycleMode.Loop &&
        ((e.Loop = !0), (e.CircleMove = i.CycleOption.IsCircle)),
      i?.TurnSpeed && (e.TurnSpeed = i.TurnSpeed),
      (h = this.sDe.Entity.GetComponent(38));
    h.IsMovingToLocation() && h.MoveToLocationEnd(1),
      this.sDe.Entity.GetComponent(
        3,
      )?.Actor.CapsuleComponent.SetCollisionResponseToChannel(
        QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
        0,
      ),
      h.MoveAlongPath(e),
      this.gLe?.CheckClimb &&
        !EventSystem_1.EventSystem.HasWithTarget(
          this.sDe.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.xsa,
        ) &&
        EventSystem_1.EventSystem.AddWithTarget(
          this.sDe.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.xsa,
        );
  }
  kDe(e, t) {
    var i = this.sDe.Entity.GetComponent(116);
    if (i?.Valid) {
      var s = UE.NewArray(UE.BuiltinFloat),
        o = UE.NewArray(UE.BuiltinFloat);
      for (const h of t.Points) s.Add(h.MoveSpeed), o.Add(h.StayTime ?? -1);
      this.xDe = { Spline: e, Speeds: s, WaitTime: o };
      var e = Vector_1.Vector.Create(e.GetWorldLocationAtSplinePoint(0)),
        n = Vector_1.Vector.Create(
          this.sDe.Entity.GetComponent(1).ActorLocationProxy,
        ),
        n = Vector_1.Vector.Dist(e, n);
      i.AddMoveTarget(
        new SceneItemMoveComponent_1.MoveTarget(e, n / t.Points[0].MoveSpeed),
      ),
        i.AddStopMoveCallback(this.BDe);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          32,
          "SceneItem没有SceneItemMoveComponent",
          ["PbDataId", this.wDe],
        ),
        this.FinishExecute(!1);
  }
  OnReset() {
    this.gLe &&
      (ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
        this.gLe.SplineEntityId,
        this.wDe,
      ),
      (this.gLe = void 0));
  }
  OnFinish() {
    this.sDe &&
      EventSystem_1.EventSystem.HasWithTarget(
        this.sDe,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.sDe,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
    var e,
      t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataIdByPbDataId(
        this.E0,
      );
    !this.YLe &&
      t &&
      (((e = Protocol_1.Aki.Protocol.f1s.create()).F4n =
        MathUtils_1.MathUtils.NumberToLong(t)),
      Net_1.Net.Call(15934, e, (e) => {
        e &&
          e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.BEs,
            26913,
          );
      }));
  }
}
exports.LevelEventMoveWithSpline = LevelEventMoveWithSpline;
//# sourceMappingURL=LevelEventMoveWithSpline.js.map
