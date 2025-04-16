"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RequestToServerAssistant = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../Core/Net/Net"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GravityUtils_1 = require("../../../Utils/GravityUtils"),
  TaskSystem_1 = require("../../../World/Task/TaskSystem"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  TimeOfDayController_1 = require("../../TimeOfDay/TimeOfDayController"),
  QuestFailedBehaviorNode_1 = require("../BehaviorNode/QuestFailedBehaviorNode"),
  GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine"),
  GeneralLogicTreeUtil_1 = require("../GeneralLogicTreeUtil"),
  ControllerAssistantBase_1 = require("./ControllerAssistantBase");
class RequestToServerAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.ikn = new Map()),
      (this.rkn = new Map()),
      (this.pct = !1),
      (this.zpe = (e, o) => {
        var r, t;
        o.ConfigType === Protocol_1.Aki.Protocol.rLs.F6n &&
          ((r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
          this.okn(r, o.PbDataId),
          (t = this.GetEntityPos(o, !0)),
          this.nkn(r, o.PbDataId, t));
      });
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RemoveEntity,
      this.zpe,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RemoveEntity,
      this.zpe,
    );
  }
  OnDestroy() {
    this.ikn.clear(), this.rkn.clear();
  }
  RequestSubmitNode(e, r, o = 0) {
    var t,
      i = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetNodeConfig(
        e.BtType,
        e.TreeConfigId,
        e.NodeId,
      );
    i
      ? "ChildQuest" !== i.Type
        ? r(!1)
        : ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
              i.Condition.PreConditions,
              void 0,
            )
          ? (TimeOfDayController_1.TimeOfDayController.SyncServerGameTime(
              ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second,
            ),
            (i =
              ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
                e.TreeIncId,
              )),
            ((t = Protocol_1.Aki.Protocol.rJn.create()).d9n = i ?? 0),
            (t.C9n = MathUtils_1.MathUtils.BigIntToLong(e.TreeIncId)),
            (t.b5n = e.NodeId),
            Net_1.Net.Call(19003, t, (e) => {
              var o;
              e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
                e.BEs !==
                  Protocol_1.Aki.Protocol.Q4n.Proto_ErrTreeNodeNotActive &&
                ((o =
                  ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
                    e.BEs,
                  )),
                Log_1.Log.CheckInfo()) &&
                Log_1.Log.Info("GeneralLogicTree", 18, o),
                r(e.BEs === Protocol_1.Aki.Protocol.Q4n.KRs);
            }))
          : ((i =
              ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
                Protocol_1.Aki.Protocol.Q4n.Proto_ErrPreCondition,
              )),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("GeneralLogicTree", 18, i),
            r(!1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GeneralLogicTree",
            18,
            "提交节点失败,找不到节点配置",
            ["TreeType", GeneralLogicTreeDefine_1.btTypeLogString[e.BtType]],
            ["TreeId", e.TreeConfigId],
            ["NodeId", e.NodeId],
          ),
        r(!1));
  }
  RequestSubmitAwakeAndLoadEntityNode(e, r) {
    var o =
        ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
          e.TreeIncId,
        ),
      t = Protocol_1.Aki.Protocol.Rf_.create();
    (t.d9n = o ?? 0),
      (t.C9n = MathUtils_1.MathUtils.BigIntToLong(e.TreeIncId)),
      (t.b5n = e.NodeId),
      Net_1.Net.Call(26660, t, (e) => {
        var o;
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ((o = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
            e.Q4n,
          )),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("GeneralLogicTree", 18, o),
          r(e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs);
      });
  }
  RequestSetTimerInfo(o, e, r, t, i) {
    var _ =
        ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
          o,
        ),
      _ = Protocol_1.Aki.Protocol.aJn.create({
        d9n: _,
        C9n: MathUtils_1.MathUtils.BigIntToLong(o),
        b5n: e,
        c9n: r,
        f9n: t,
        W4n: i,
      });
    Net_1.Net.Call(25348, _, (e) => {
      e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.BEs,
          19990,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged,
          o,
          r,
          t,
          i,
        );
    });
  }
  RequestGiveUp(o, r) {
    var e,
      t = ModelManager_1.ModelManager.GeneralLogicTreeModel,
      i = t.GetBehaviorTree(o);
    i && (e = i.GetProcessingCanGiveupFailedNode()) && i.CheckCanGiveUp()
      ? ((i = t.GetBehaviorTreeOwnerId(o)),
        (t = Protocol_1.Aki.Protocol.fJn.create({
          d9n: i,
          C9n: MathUtils_1.MathUtils.BigIntToLong(o),
          b5n: e.NodeId,
        })),
        Net_1.Net.Call(21002, t, (e) => {
          e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? (e.BEs === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTreeNotFailedNode
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "GeneralLogicTree",
                    18,
                    "GeneralLogicTree:请求放弃失败,不是失败节点",
                    ["TreeIncId", o],
                  )
                : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.BEs,
                    15275,
                  ),
              r(!1))
            : r(!0);
        }))
      : r(!1);
  }
  async RequestRollback(o, r) {
    var t =
      ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
    if (t) {
      let e = void 0;
      0 !== t.FailNodeId &&
        t.GetNode(t.FailNodeId) instanceof
          QuestFailedBehaviorNode_1.QuestFailedBehaviorNode &&
        (e = t.GetNode(t.FailNodeId)),
        t.ClearFailNodeId(),
        e ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "GeneralLogicTree",
              45,
              "服务器下发的失败回退节点并没在之前被保存，已走保底检测第一个失败节点，确认是否有问题",
              ["treeId", o],
            ),
          (e = t.GetProcessingCanGiveupFailedNode())),
        e?.NeedSecondaryConfirm
          ? r === Protocol_1.Aki.Protocol.NEs.Proto_TransferFail
            ? this.Q$t(o, !1)
            : (await TaskSystem_1.TaskSystem.Run(),
              await ModelManager_1.ModelManager.SubLevelLoadingModel
                .LoadSubLevelPromise?.Promise,
              (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                77,
              )).FunctionMap.set(1, () => {
                this.Q$t(o, !1);
              }),
              t.FunctionMap.set(2, () => {
                this.Q$t(o, !0);
              }),
              (t.FinishOpenFunction = (e) => {
                e || this.Q$t(o, !1);
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                t,
              ))
          : e?.IsFadeInScreen()
            ? ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
                2,
                3,
                () => {
                  this.Q$t(o, !0);
                },
                1,
              )
            : this.Q$t(o, !0);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("GeneralLogicTree", 18, "请求回退失败，行为树不存在", [
          "treeId",
          o,
        ]);
  }
  Q$t(e, o) {
    var r =
      ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
    r
      ? (r.SetRollbackWaiting(!1),
        (r =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
            e,
          )),
        (r = Protocol_1.Aki.Protocol.MJn.create({
          d9n: r,
          C9n: MathUtils_1.MathUtils.BigIntToLong(e),
          p9n: o ? 1 : 2,
        })),
        Net_1.Net.Call(29245, r, (e) => {
          e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            (ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
              2,
            ),
            e.BEs !==
              Protocol_1.Aki.Protocol.Q4n.Proto_ErrSaveNewNotRollback) &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.BEs,
              16437,
              void 0,
              !1,
            );
        }))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GeneralLogicTree",
            18,
            "请求回退失败，行为树不存在, 并离开黑幕",
            ["treeId", e],
          ),
        ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
          2,
        ));
  }
  RequestTimerEnd(e, o) {
    var r =
        ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
          e,
        ),
      r = Protocol_1.Aki.Protocol.PJn.create({
        d9n: r,
        C9n: MathUtils_1.MathUtils.BigIntToLong(e),
        c9n: o,
      });
    Net_1.Net.Call(24316, r, (e) => {
      e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ((e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
          e.BEs,
        )),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("GeneralLogicTree", 18, e);
    });
  }
  RequestFinishUiGameplay(e, o) {
    var r = Protocol_1.Aki.Protocol.wJn.create();
    (r.a5n = o),
      (r.h5n = e),
      Net_1.Net.Call(28624, r, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Quest",
            18,
            "GeneralLogicTree:RequestFinishUiGameplay",
            ["gameplayId", o],
          );
      });
  }
  RequestForcedOccupation(o, r) {
    var e = Protocol_1.Aki.Protocol.CJn.create({
      C9n: MathUtils_1.MathUtils.BigIntToLong(o),
    });
    Net_1.Net.Call(26774, e, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Quest",
          18,
          "GeneralLogicTree:RequestForcedOccupation",
          ["treeId", o],
        ),
        r();
    });
  }
  RequestEntityPosition(r, t, i) {
    var e = i ?? Vector_1.Vector.Create(),
      o = this.skn(r, t);
    return (
      o
        ? e.Set(o.X, o.Y, o.Z)
        : ((o = this.akn(r, t)) && e.Set(o.X, o.Y, o.Z),
          this.pct ||
            ((o = Protocol_1.Aki.Protocol.Nfs.create({ v9n: t, M9n: r })),
            (this.pct = !0),
            Net_1.Net.Call(16856, o, (e) => {
              var o;
              e?.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
                ? ((o = Vector_1.Vector.Create(e.l8n)), this.hkn(r, t, o))
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Map",
                    63,
                    "请求实体位置失败",
                    ["errorCode:", e?.Q4n],
                    ["dungeonId", r],
                    ["pbDataId", t],
                    ["receiveVectorX", i?.X],
                    ["receiveVectorY", i?.Y],
                    ["receiveVectorZ", i?.Z],
                  ),
                (this.pct = !1);
            }))),
      e
    );
  }
  GetEntityPos(e, o, r) {
    var r = r ?? Vector_1.Vector.Create(),
      t =
        ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(
          e,
        ),
      e = e.Entity.GetComponent(0);
    if (e)
      if (t && ObjectUtils_1.ObjectUtils.IsValid(t.Owner)) {
        var i = Vector_1.Vector.Create(0, 0, 0);
        if (t.SkeletalMesh) {
          r.FromUeVector(t.SkeletalMesh.D_K2_GetComponentLocation());
          const _ = e?.GetPbModelConfig();
          _ &&
            (r.Set(r.X, r.Y, r.Z),
            i.Set(0, 0, _.HalfHeight),
            GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(t, i),
            r.AdditionEqual(i));
        } else r.FromUeVector(t.Owner.D_K2_GetActorLocation());
        if (o) {
          const _ = e.GetPbModelConfig();
          _ &&
            (_.TrackHeight
              ? (i.Set(0, 0, _.TrackHeight),
                GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(
                  t,
                  i,
                ),
                r.AdditionEqual(i))
              : (0, RegisterComponent_1.isComponentInstance)(t, 3) &&
                (i.Set(0, 0, t.ScaledHalfHeight),
                GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(
                  t,
                  i,
                ),
                r.AdditionEqual(i)));
        }
      } else (o = e.GetLocation()), r.Set(o.X, o.Y, o.Z);
    return r;
  }
  skn(e, o) {
    e = this.ikn.get(e);
    if (e) return e.get(o);
  }
  okn(e, o) {
    e = this.ikn.get(e);
    e && e.delete(o);
  }
  hkn(e, o, r) {
    let t = this.ikn.get(e);
    t || ((t = new Map()), this.ikn.set(e, t)), t.set(o, r);
  }
  akn(e, o) {
    e = this.rkn.get(e);
    if (e) return e.get(o);
  }
  nkn(e, o, r) {
    let t = this.rkn.get(e);
    t || ((t = new Map()), this.rkn.set(e, t)), t.set(o, r);
  }
}
exports.RequestToServerAssistant = RequestToServerAssistant;
//# sourceMappingURL=RequestToServerAssistant.js.map
