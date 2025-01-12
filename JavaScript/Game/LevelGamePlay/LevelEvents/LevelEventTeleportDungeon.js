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
  LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController"),
  ScrollingTipsController_1 = require("../../Module/ScrollingTips/ScrollingTipsController"),
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
        37,
        "[LevelEventTeleportDungeon]ExecuteInGm",
      ),
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
                          this.XRe(r));
                      this.TeleportDungeonRequest(e, r.LocationEntityId, o);
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
      t = this.XRe(e),
      t =
        ((ModelManager_1.ModelManager.InstanceDungeonEntranceModel.TransitionOption =
          t),
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
          o),
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(o)),
      t = t.InstType === Protocol_1.Aki.Protocol.XFs.Proto_BigWorldInstance;
    r.InstType,
      Protocol_1.Aki.Protocol.XFs.Proto_BigWorldInstance,
      t ? this.EDe() : this.YRe(e.IsRegroup, o, e.LocationEntityId);
  }
  YRe(e, o, r) {
    e
      ? (EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.EnterInstanceDungeon,
          this.EDe,
        ),
        EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
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
  async TeleportDungeonRequest(e, o = 0, r) {
    var t = Protocol_1.Aki.Protocol.fCs.create(),
      e =
        ((t.n5n = e),
        (t.s5n =
          ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList),
        (t.a5n = o),
        (t.h5n = r),
        await Net_1.Net.CallAsync(11750, t));
    return e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
      ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          15889,
        ),
        !1)
      : (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.EnterInstanceDungeon,
        ),
        !0);
  }
  XRe(e) {
    let o = void 0;
    var r = e.TransitionOption;
    switch (r?.Type) {
      case IAction_1.ETeleportTransitionType.CenterText:
        var t = r,
          n = Protocol_1.Aki.Protocol.QFs.create(),
          l =
            ((n.l5n = Protocol_1.Aki.Protocol.l5n.Proto_CenterText),
            Protocol_1.Aki.Protocol.d4s.create());
        (l._5n = t.CenterTextFlow.FlowListName),
          (l.u5n = t.CenterTextFlow.FlowId),
          (l.c5n = t.CenterTextFlow.StateId),
          (n.m5n = l),
          (o = n);
        break;
      case IAction_1.ETeleportTransitionType.PlayEffect:
        (t = r), (l = Protocol_1.Aki.Protocol.QFs.create());
        (l.l5n = Protocol_1.Aki.Protocol.l5n.Proto_PlayEffect),
          (l.d5n = t.EffectDaPath),
          (o = l);
        break;
      case IAction_1.ETeleportTransitionType.PlayMp4:
        (n = r), (t = Protocol_1.Aki.Protocol.QFs.create());
        (t.l5n = Protocol_1.Aki.Protocol.l5n.Proto_PlayMp4),
          (t.d5n = n.Mp4Path),
          (o = t),
          n.IsFadeInScreenAfterTeleport &&
            LevelLoadingController_1.LevelLoadingController.OpenLoading(
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
