"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventMoveWithSpline = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGameplayActionsDefine_1 = require("../LevelGameplayActionsDefine"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  CharacterSplineMoveTask_1 = require("../SplineMoveTask/CharacterSplineMoveTask"),
  SplineMoveTaskUtils_1 = require("../SplineMoveTask/SplineMoveTaskUtils");
class LevelEventMoveWithSpline extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.sDe = void 0),
      (this.E0 = 0),
      (this.gLe = void 0),
      (this.YLe = !1),
      (this.wDe = 0),
      (this.UCl = (e) => {
        this.IsAsync || this.FinishExecute(!0);
      }),
      (this.DCl = (e) => {
        this.IsAsync || this.FinishExecute(e);
      }),
      (this.cwl = (e) => {
        this.IsAsync || this.FinishExecute(e);
      }),
      (this.zpe = (e, t) => {
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "LevelEvent",
            42,
            "[LevelEventMoveWithSpline]检测到移动实体被销毁，直接设置节点执行成功",
          ),
          this.FinishExecute(!0);
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
    var e, t, i, o, n;
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
        ? ((e = this.sDe.Entity.GetComponent(46)),
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
                    t.Option.Type !== IComponent_1.ESplineType.Patrol &&
                    t.Option.Type !==
                      IComponent_1.ESplineType.ContinuesVariableSpeedMovement
                      ? (Log_1.Log.CheckError() &&
                          Log_1.Log.Error(
                            "Level",
                            31,
                            "[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] SplineComponent配置类型不是patrol或ContinuesVariableSpeedMovement",
                            ["SplineEntityId", e],
                          ),
                        this.FinishExecute(!1))
                      : ((this.wDe =
                          this.sDe.Entity.GetComponent(0).GetPbDataId()),
                        (o =
                          ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
                            e,
                            this.wDe,
                          )),
                        (n =
                          ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
                            e,
                          ))?.IsValid()
                          ? (n.D_K2_SetActorLocation(
                              i.ToUeVector(),
                              !1,
                              void 0,
                              !1,
                            ),
                            this.NDe(o, t.Option))
                          : (Log_1.Log.CheckError() &&
                              Log_1.Log.Error(
                                "Level",
                                31,
                                "[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] 获取的spline actor非法",
                                ["SplineEntityId", e],
                              ),
                            this.FinishExecute(!1))))
                  : (Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "Level",
                        31,
                        "[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] 无法找到SplineComponent配置",
                        ["SplineEntityId", e],
                      ),
                    this.FinishExecute(!1))
                : (Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "Level",
                      31,
                      "[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] 无法找到Spline Entity",
                      ["SplineEntityId", e],
                    ),
                  this.FinishExecute(!1))))
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("LevelEvent", 7, "[MoveWithSpline]实体无效", [
              "PbDataId",
              this.E0,
            ]),
          this.FinishExecute(!0));
  }
  NDe(t, e) {
    var i = t.GetNumberOfSplinePoints(),
      o = this.gLe.StartPointIndex
        ? MathUtils_1.MathUtils.Clamp(this.gLe.StartPointIndex, 0, i - 1)
        : 0,
      n = this.gLe.EndPointIndex
        ? MathUtils_1.MathUtils.Clamp(this.gLe.EndPointIndex, 0, i - 1)
        : i - 1,
      s = [];
    for (let e = o; e <= n; ++e)
      s.push(Vector_1.Vector.Create(t.D_GetLocationAtSplinePoint(e, 1)));
    this.gLe.IsForceToFirstPoint &&
      ((i = s[0]),
      (o = t.GetRotationAtSplinePoint(o, 1)),
      (i = {
        TelePortConfig: {
          TargetPos: { X: i.X, Y: i.Y, Z: i.Z, A: o.Yaw },
          Type: IAction_1.ETeleportType.FixedPos,
        },
      }),
      ((o = new LevelGameplayActionsDefine_1.CommonActionInfo()).Name =
        "SetPlayerPos"),
      (o.Params = i),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Level",
        31,
        "[LevelEventMoveWithSpline.SetMoveAction] SetPlayerPos已为服务端行为，无法执行",
        ["ActionInfo", o],
      ),
      this.YLe &&
        (this.sDe.Entity.GetComponent(3).ClearInput(),
        (i = this.sDe.Entity.GetComponent(61)).ClearMoveVectorCache(),
        i.SetActive(!1),
        (o = this.sDe.Entity.GetComponent(39))) &&
        o.EndOwnerAndFollowSkills(),
      this.ODe(t, e);
  }
  ODe(e, t) {
    switch (this.sDe.Entity.GetComponent(0)?.GetEntityType()) {
      case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
        this.SceneItemMoveAlongPath(e, t);
        break;
      case Protocol_1.Aki.Protocol.kks.HI_:
        this.VehicleMoveAlongPath(e, t);
        break;
      default:
        this.CharacterMoveAlongPath(e, t);
    }
  }
  SceneItemMoveAlongPath(e, t) {
    var i = this.sDe?.Entity?.GetComponent(126);
    if (i)
      switch (t?.Type) {
        case IComponent_1.ESplineType.Patrol:
        case IComponent_1.ESplineType.ContinuesVariableSpeedMovement:
          var o =
            SplineMoveTaskUtils_1.SplineMoveTaskUtils.CreateDefaultSceneItemSplineMoveConfig();
          SplineMoveTaskUtils_1.SplineMoveTaskUtils.ParseSplineDataToSceneItemSplineMoveConfig(
            t,
            o,
          ),
            (o.IsLookDir = this.gLe?.IsLookDir ?? !1),
            (o.SplineMoveRange = {
              Type: 0,
              StartIndex: this.gLe?.StartPointIndex ?? -1,
              EndIndex: this.gLe?.EndPointIndex ?? -1,
            }),
            i.StartSplineMoveTask({
              SplineId: this.gLe.SplineEntityId,
              SplineMoveConfig: o,
              Callback: this.IsAsync ? void 0 : this.DCl,
              Context: this.BaseContext,
              EnableSplineMoveSync: !1,
              EnableMovementSync: !this.IsAsync,
              SplineMoveRuntimeData: {},
              NeedMoveToStartPoint: t.Type === IComponent_1.ESplineType.Patrol,
            }),
            this.IsAsync && this.FinishExecute(!0);
          break;
        default:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              39,
              "[LevelEventMoveWithSpline.SceneItemMoveAlongPath] 场景物件样条移动暂不支持该样条类型",
            ),
            this.FinishExecute(!1);
      }
    else this.FinishExecute(!1);
  }
  CharacterMoveAlongPath(e, t) {
    this.sDe?.Valid
      ? t?.Type !== IComponent_1.ESplineType.Patrol
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              39,
              "[LevelEventMoveWithSpline.CharacterMoveAlongPath] 角色样条移动暂不支持该样条类型",
            ),
          this.FinishExecute(!1))
        : (ControllerHolder_1.ControllerHolder.SplineMoveTaskController.GetEntityCurSplineMoveTask(
            this.sDe.Id,
          ) &&
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Level",
                39,
                "CharacterMoveComponent 样条移动任务未结束时开始新任务，清理旧任务",
                ["EntityId", this.sDe.Id],
              ),
            ControllerHolder_1.ControllerHolder.SplineMoveTaskController.EndEntityTasks(
              this.sDe.Id,
            )),
          CharacterSplineMoveTask_1.CharacterSplineMoveTask.Create(this.sDe, {
            Spline: e,
            SplineData: t,
            EventParam: this.gLe,
            NoSyncPoint: this.IsAsync,
            Callback: this.IsAsync ? void 0 : this.UCl,
          }).StartTask(),
          this.IsAsync && this.FinishExecute(!0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            39,
            "[LevelEventMoveWithSpline.CharacterMoveAlongPath] EntityHandle非Valid",
          ),
        this.FinishExecute(!1));
  }
  VehicleMoveAlongPath(e, t) {
    var i = this.gLe?.SplineEntityId,
      o = this.sDe?.Entity;
    i && (o = o && o.GetComponent(233))
      ? (o.MoveAlongPath({
          SplineId: i,
          ForceToFirstPoint: !!this.gLe?.IsForceToFirstPoint,
          StartFromNearest: !0,
          OnMoveEndHandle: this.IsAsync ? void 0 : this.cwl,
        }),
        this.IsAsync && this.FinishExecute(!0))
      : this.FinishExecute(!1);
  }
  OnReset() {
    this.gLe && (this.gLe = void 0);
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
      Net_1.Net.Call(19833, e, (e) => {
        e &&
          e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.BEs,
            24708,
          );
      }));
  }
}
exports.LevelEventMoveWithSpline = LevelEventMoveWithSpline;
//# sourceMappingURL=LevelEventMoveWithSpline.js.map
