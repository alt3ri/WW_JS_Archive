"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventTeleportDungeon = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTeleportDungeon extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.EDe = () => {
        this.FinishExecute(!0);
      });
  }
  ExecuteInGm(e, o, r) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "InstanceDungeon",
        36,
        "[LevelEventTeleportDungeon]ExecuteInGm",
      ),
      this.FinishExecute(!0);
  }
  ExecuteNew(e, o) {
    if (ModelManager_1.ModelManager.SundryModel?.IsBlockTpDungeon())
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText(
        "TeleportDungeon被GM屏蔽，跳过执行",
      ),
        this.FinishExecute(!0);
    else if (ModelManager_1.ModelManager.LoadingModel?.IsLoading)
      this.FinishExecute(!1);
    else {
      const r = e;
      r
        ? (e = r.DungeonId)
          ? ControllerHolder_1.ControllerHolder.InstanceDungeonController.IsForbidDungeon(
              e,
            )
            ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById(
                "PhantomFormationEnterInstanceTip",
              ),
              this.FinishExecute(!1))
            : ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()
              ? this.FinishExecute(!0)
              : ((e =
                  ModelManager_1.ModelManager.InstanceDungeonEntranceModel
                    .InstanceId),
                (e =
                  ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
                    e,
                  )) && e.InstType
                  ? r.IsNeedSecondaryConfirmation
                    ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                        164,
                      )).FunctionMap.set(2, () => {
                        var e = r.DungeonId;
                        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
                          e;
                      }),
                      e.FunctionMap.set(1, () => {
                        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
                          this.EDe();
                      }),
                      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                        e,
                      ))
                    : this.$Re(r)
                  : this.FinishExecute(!1))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "InstanceDungeon",
                5,
                "跳转副本行为错误，副本Id配置错误",
              ),
            this.FinishExecute(!1))
        : this.FinishExecute(!1);
    }
  }
  $Re(e) {
    var o = e.DungeonId,
      r = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
      r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(r),
      n = this.XRe(e),
      n =
        ((ModelManager_1.ModelManager.InstanceDungeonEntranceModel.TransitionOption =
          n),
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
          o),
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(o)),
      n = n.InstType === Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance;
    r.InstType,
      Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance,
      n ? this.EDe() : this.YRe(e.IsRegroup, o, e.LocationEntityId);
  }
  YRe(e, o, r) {
    e
      ? (EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.EnterInstanceDungeon,
          this.EDe,
        ),
        ControllerHolder_1.ControllerHolder.EditBattleTeamController.PlayerOpenEditBattleTeamView(
          o,
          !1,
          !1,
        ))
      : this.EDe();
  }
  OnReset() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.EnterInstanceDungeon,
      this.EDe,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EnterInstanceDungeon,
        this.EDe,
      );
  }
  XRe(e) {
    let o = void 0;
    var r = e.TransitionOption;
    switch (r?.Type) {
      case IAction_1.ETeleportTransitionType.CenterText:
        var n = r,
          t = Protocol_1.Aki.Protocol.t4s.create(),
          l =
            ((t.p5n = Protocol_1.Aki.Protocol.p5n.Proto_CenterText),
            Protocol_1.Aki.Protocol.M4s.create());
        (l.v5n = n.CenterTextFlow.FlowListName),
          (l.M5n = n.CenterTextFlow.FlowId),
          (l.S5n = n.CenterTextFlow.StateId),
          (t.E5n = l),
          (o = t);
        break;
      case IAction_1.ETeleportTransitionType.PlayEffect:
        (n = r), (l = Protocol_1.Aki.Protocol.t4s.create());
        (l.p5n = Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect),
          (l.q$_.y5n = n.EffectDaPath),
          (o = l);
        break;
      case IAction_1.ETeleportTransitionType.PlayMp4:
        (t = r), (n = Protocol_1.Aki.Protocol.t4s.create());
        (n.p5n = Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4),
          (n.q$_.y5n = t.Mp4Path),
          (o = n),
          t.IsFadeInScreenAfterTeleport &&
            ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
              0,
              3,
              void 0,
              1,
            );
    }
    return o;
  }
}
exports.LevelEventTeleportDungeon = LevelEventTeleportDungeon;
//# sourceMappingURL=LevelEventTeleportDungeon.js.map
