"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventTeleportDungeon = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine"),
  EditBattleTeamController_1 = require("../../Module/EditBattleTeam/EditBattleTeamController"),
  ScrollingTipsController_1 = require("../../Module/ScrollingTips/ScrollingTipsController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTeleportDungeon extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.SDe = () => {
        this.FinishExecute(!0);
      });
  }
  ExecuteInGm(e, o, r) {
    this.FinishExecute(!0);
  }
  ExecuteNew(e, o) {
    if (ModelManager_1.ModelManager.SundryModel?.IsBlockTpDungeon())
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
        "TeleportDungeon被GM屏蔽，跳过执行",
      ),
        this.FinishExecute(!0);
    else {
      const r = e;
      r
        ? r.DungeonId
          ? ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()
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
                      var e = r.DungeonId,
                        o =
                          ((ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
                            e),
                          this.XRe(r.TransitionOption));
                      this.TeleportDungeonRequest(e, r.LocationEntityId, o);
                    }),
                    e.FunctionMap.set(1, () => {
                      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
                        this.SDe();
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
      t = this.XRe(e.TransitionOption),
      t =
        ((ModelManager_1.ModelManager.InstanceDungeonEntranceModel.TransitionOption =
          t),
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
          o),
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(o)),
      t = t.InstType === Protocol_1.Aki.Protocol.sOs.Proto_BigWorldInstance;
    r.InstType,
      Protocol_1.Aki.Protocol.sOs.Proto_BigWorldInstance,
      t ? this.SDe() : this.YRe(e.IsRegroup, o, e.LocationEntityId);
  }
  YRe(e, o, r) {
    e
      ? (EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.EnterInstanceDungeon,
          this.SDe,
        ),
        EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
          o,
          !1,
          !1,
        ))
      : this.SDe();
  }
  OnReset() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.EnterInstanceDungeon,
      this.SDe,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EnterInstanceDungeon,
        this.SDe,
      );
  }
  async TeleportDungeonRequest(e, o = 0, r) {
    var t = Protocol_1.Aki.Protocol.Eus.create(),
      e =
        ((t.Rkn = e),
        (t.xkn =
          ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList),
        (t.Pkn = o),
        (t.Bkn = r),
        await Net_1.Net.CallAsync(23883, t));
    return e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
      ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.lkn,
          9513,
        ),
        !1)
      : (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.EnterInstanceDungeon,
        ),
        !0);
  }
  XRe(e) {
    let o = void 0;
    switch (e?.Type) {
      case IAction_1.ETeleportTransitionType.CenterText:
        var r = e,
          t = Protocol_1.Aki.Protocol.nOs.create(),
          n =
            ((t.wkn = Protocol_1.Aki.Protocol.wkn.Proto_CenterText),
            Protocol_1.Aki.Protocol.IOs.create());
        (n.bkn = r.CenterTextFlow.FlowListName),
          (n.qkn = r.CenterTextFlow.FlowId),
          (n.Gkn = r.CenterTextFlow.StateId),
          (t.Okn = n),
          (o = t);
        break;
      case IAction_1.ETeleportTransitionType.PlayEffect:
        (r = e), (n = Protocol_1.Aki.Protocol.nOs.create());
        (n.wkn = Protocol_1.Aki.Protocol.wkn.Proto_PlayEffect),
          (n.Nkn = r.EffectDaPath),
          (o = n);
        break;
      case IAction_1.ETeleportTransitionType.PlayMp4:
        (t = e), (r = Protocol_1.Aki.Protocol.nOs.create());
        (r.wkn = Protocol_1.Aki.Protocol.wkn.Proto_PlayMp4),
          (r.Nkn = t.Mp4Path),
          (o = r);
    }
    return o;
  }
}
exports.LevelEventTeleportDungeon = LevelEventTeleportDungeon;
//# sourceMappingURL=LevelEventTeleportDungeon.js.map
