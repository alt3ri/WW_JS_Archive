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
  CharacterController_1 = require("../../../NewWorld/Character/CharacterController"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  TimeOfDayController_1 = require("../../TimeOfDay/TimeOfDayController"),
  GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine"),
  GeneralLogicTreeUtil_1 = require("../GeneralLogicTreeUtil"),
  ControllerAssistantBase_1 = require("./ControllerAssistantBase");
class RequestToServerAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.FGn = new Map()),
      (this.VGn = new Map()),
      (this.iut = !1),
      (this.zpe = (e, o) => {
        var r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          t = (this.HGn(r, o.PbDataId), this.GetEntityPos(o, !0));
        this.jGn(r, o.PbDataId, t);
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
    this.FGn.clear(), this.VGn.clear();
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
            ((t = Protocol_1.Aki.Protocol.iKn.create()).T5n = i ?? 0),
            (t.L5n = MathUtils_1.MathUtils.BigIntToLong(e.TreeIncId)),
            (t.Jkn = e.NodeId),
            Net_1.Net.Call(21993, t, (e) => {
              var o;
              e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
                e.uvs !==
                  Protocol_1.Aki.Protocol.lkn.Proto_ErrTreeNodeNotActive &&
                ((o =
                  ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
                    e.uvs,
                  )),
                Log_1.Log.CheckInfo()) &&
                Log_1.Log.Info("GeneralLogicTree", 19, o),
                r(e.uvs === Protocol_1.Aki.Protocol.lkn.Sys);
            }))
          : ((i =
              ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
                Protocol_1.Aki.Protocol.lkn.Proto_ErrPreCondition,
              )),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("GeneralLogicTree", 19, i),
            r(!1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GeneralLogicTree",
            19,
            "提交节点失败,找不到节点配置",
            ["TreeType", GeneralLogicTreeDefine_1.btTypeLogString[e.BtType]],
            ["TreeId", e.TreeConfigId],
            ["NodeId", e.NodeId],
          ),
        r(!1));
  }
  RequestSetTimerInfo(o, e, r, t, i) {
    var n =
        ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
          o,
        ),
      n = Protocol_1.Aki.Protocol.sKn.create({
        T5n: n,
        L5n: MathUtils_1.MathUtils.BigIntToLong(o),
        Jkn: e,
        y5n: r,
        A5n: t,
        akn: i,
      });
    Net_1.Net.Call(14526, n, (e) => {
      e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.uvs,
          21520,
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
  RequestGiveUp(e, o) {
    var r,
      t = ModelManager_1.ModelManager.GeneralLogicTreeModel,
      i = t.GetBehaviorTree(e);
    i && (r = i.GetProcessingFailedNode()) && i.CheckCanGiveUp()
      ? ((i = t.GetBehaviorTreeOwnerId(e)),
        (t = Protocol_1.Aki.Protocol.gKn.create({
          T5n: i,
          L5n: MathUtils_1.MathUtils.BigIntToLong(e),
          Jkn: r.NodeId,
        })),
        Net_1.Net.Call(15815, t, (e) => {
          e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.uvs,
              10737,
            ),
            o(!0);
        }))
      : o(!1);
  }
  RequestRollback(o, e) {
    var r =
      ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
    r
      ? r.GetProcessingFailedNode()?.NeedSecondaryConfirm
        ? e === Protocol_1.Aki.Protocol.gvs.Proto_Transfer
          ? this.QXt(o, !1)
          : ((r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(77)).FunctionMap.set(
              1,
              () => {
                this.QXt(o, !1);
              },
            ),
            r.FunctionMap.set(2, () => {
              this.QXt(o, !0);
            }),
            (r.FinishOpenFunction = (e) => {
              e || this.QXt(o, !1);
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              r,
            ))
        : this.QXt(o, !0)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("GeneralLogicTree", 19, "请求回退失败，行为树不存在", [
          "treeId",
          o,
        ]);
  }
  QXt(e, o) {
    var r =
      ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
    r
      ? (r.SetRollbackWaiting(!1),
        (r =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
            e,
          )),
        (r = Protocol_1.Aki.Protocol.pKn.create({
          T5n: r,
          L5n: MathUtils_1.MathUtils.BigIntToLong(e),
          U5n: o ? 1 : 2,
        })),
        Net_1.Net.Call(17313, r, (e) => {
          e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.uvs,
              8081,
              void 0,
              !1,
            );
        }))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("GeneralLogicTree", 19, "请求回退失败，行为树不存在", [
          "treeId",
          e,
        ]);
  }
  RequestTimerEnd(e, o) {
    var r =
        ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
          e,
        ),
      r = Protocol_1.Aki.Protocol.AKn.create({
        T5n: r,
        L5n: MathUtils_1.MathUtils.BigIntToLong(e),
        y5n: o,
      });
    Net_1.Net.Call(20600, r, (e) => {
      e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
        ((e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
          e.uvs,
        )),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("GeneralLogicTree", 19, e);
    });
  }
  RequestFinishUiGameplay(e, o) {
    var r = Protocol_1.Aki.Protocol.UKn.create();
    (r.ykn = o),
      (r.Ikn = e),
      Net_1.Net.Call(19172, r, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Quest",
            19,
            "GeneralLogicTree:RequestFinishUiGameplay",
            ["gameplayId", o],
          );
      });
  }
  RequestForcedOccupation(o, r) {
    var e = Protocol_1.Aki.Protocol.mKn.create({
      L5n: MathUtils_1.MathUtils.BigIntToLong(o),
    });
    Net_1.Net.Call(29440, e, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Quest",
          19,
          "GeneralLogicTree:RequestForcedOccupation",
          ["treeId", o],
        ),
        r();
    });
  }
  RequestEntityPosition(o, r, e) {
    var e = e ?? Vector_1.Vector.Create(),
      t = this.WGn(o, r);
    return (
      t
        ? e.Set(t.X, t.Y, t.Z)
        : ((t = this.KGn(o, r)) && e.Set(t.X, t.Y, t.Z),
          this.iut ||
            ((t = Protocol_1.Aki.Protocol.Sms.create({ R5n: r, x5n: o })),
            (this.iut = !0),
            Net_1.Net.Call(29784, t, (e) => {
              e?.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
                ((e = Vector_1.Vector.Create(e.M3n)), this.QGn(o, r, e)),
                (this.iut = !1);
            }))),
      e
    );
  }
  GetEntityPos(e, o, r) {
    var r = r ?? Vector_1.Vector.Create(),
      t = CharacterController_1.CharacterController.GetActorComponent(e);
    if (t && ObjectUtils_1.ObjectUtils.IsValid(t.Owner)) {
      if (t.SkeletalMesh) {
        r.FromUeVector(t.SkeletalMesh.K2_GetComponentLocation());
        const i = e.Entity.GetComponent(0),
          n = i?.GetPbModelConfig();
        n && r.Set(r.X, r.Y, r.Z + n.HalfHeight);
      } else r.FromUeVector(t.Owner.K2_GetActorLocation());
      const i = e.Entity.GetComponent(0);
      if (i && o) {
        const n = i.GetPbModelConfig();
        n &&
          (n.TrackHeight
            ? r.Set(r.X, r.Y, r.Z + n.TrackHeight)
            : (0, RegisterComponent_1.isComponentInstance)(t, 3) &&
              r.Set(r.X, r.Y, r.Z + t.ScaledHalfHeight));
      }
    }
    return r;
  }
  WGn(e, o) {
    e = this.FGn.get(e);
    if (e) return e.get(o);
  }
  HGn(e, o) {
    e = this.FGn.get(e);
    e && e.delete(o);
  }
  QGn(e, o, r) {
    let t = this.FGn.get(e);
    t || ((t = new Map()), this.FGn.set(e, t)), t.set(o, r);
  }
  KGn(e, o) {
    e = this.VGn.get(e);
    if (e) return e.get(o);
  }
  jGn(e, o, r) {
    let t = this.VGn.get(e);
    t || ((t = new Map()), this.VGn.set(e, t)), t.set(o, r);
  }
}
exports.RequestToServerAssistant = RequestToServerAssistant;
//# sourceMappingURL=RequestToServerAssistant.js.map
