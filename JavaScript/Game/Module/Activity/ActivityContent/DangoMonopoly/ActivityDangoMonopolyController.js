"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityDangoMonopolyController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityManager_1 = require("../../ActivityManager"),
  ActivityDangoMonopolyData_1 = require("./ActivityDangoMonopolyData"),
  ActivitySubViewDangoMonopoly_1 = require("./ActivitySubViewDangoMonopoly");
class ActivityDangoMonopolyController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.Jn_ = () => {
        this.Data?.DelayUpdateCameraMove(),
          this.Data?.IsInTheDungeon() && this.Data.RecordKismetSetting();
      }),
      (this.tI1 = (o) => {
        o === this.Data?.DiceItemId &&
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RedDotUpdateDangoMonopolyNum,
          ),
          this.RefreshActivityRedDot());
      });
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(o) {}
  OnGetActivityResource(o) {
    return "UiItem_ActivityMonopoly";
  }
  OnCreateSubPageComponent(o) {
    return new ActivitySubViewDangoMonopoly_1.ActivitySubViewDangoMonopoly();
  }
  OnCreateActivityData(o) {
    return (
      (this.Data = new ActivityDangoMonopolyData_1.ActivityDangoMonopolyData()),
      this.Data
    );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(20732, (o) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("DangoMonopoly", 69, "YDc", ["", o]),
        this.Data?.ProtoTaskUpdateNotify(o.CJ_);
    }),
      Net_1.Net.Register(21746, (o) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("DangoMonopoly", 69, "AUc", ["", o]),
          this.Data?.ProtoSceneGridInfoNotify(o);
      }),
      Net_1.Net.Register(20188, (o) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("DangoMonopoly", 69, "Os1", ["", o]),
          this.Data?.ProtoTaskAddNotify(o.CJ_);
      }),
      Net_1.Net.Register(29115, (o) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("DangoMonopoly", 69, "qs1", ["", o]),
          this.Data?.ProtoTaskRemoveNotify(o.B6n);
      }),
      Net_1.Net.Register(25327, (o) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("DangoMonopoly", 69, "Of1", ["", o]),
          this.Data?.ProtoRewardNotify(o);
      });
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20732),
      Net_1.Net.UnRegister(21746),
      Net_1.Net.UnRegister(20188),
      Net_1.Net.UnRegister(29115),
      Net_1.Net.UnRegister(25327);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.Jn_),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.tI1,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      this.Jn_,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.tI1,
      );
  }
  static UU_() {
    return ActivityManager_1.ActivityManager.GetActivityController(
      Protocol_1.Aki.Protocol.uks.Proto_DangoMonopoly,
    );
  }
  static GetData() {
    return this.UU_()?.Data;
  }
  RefreshActivityRedDot() {
    var o = this.Data?.Id;
    o &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        o,
      );
  }
  async RequestReceiveTaskReward(o) {
    var e = this.Data,
      t = Protocol_1.Aki.Protocol.TAc.create(),
      e =
        ((t.w6n = e?.Id ?? 0),
        (t.B6n = o),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("DangoMonopoly", 69, "TAc", ["", t]),
        await Net_1.Net.CallAsync(27418, t));
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("DangoMonopoly", 69, "bAc", ["", e]),
      ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(
        e,
        28529,
      );
  }
  async RequestReceiveBoardReward(o) {
    var e = this.Data,
      t = Protocol_1.Aki.Protocol.EAc.create(),
      t =
        ((t.w6n = e?.Id ?? 0),
        (t.AAc = o),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("DangoMonopoly", 69, "EAc", ["", t]),
        await Net_1.Net.CallAsync(25112, t));
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("DangoMonopoly", 69, "IAc", ["", t]),
      ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(
        t,
        18366,
      ) ||
        (e?.ProtoReceiveBoardRewardResponse(o), this.RefreshActivityRedDot());
  }
  async RequestReceiveGridReward() {
    var o = this.Data,
      e = Protocol_1.Aki.Protocol.SAc.create(),
      e =
        ((e.w6n = o?.Id ?? 0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("DangoMonopoly", 69, "SAc", ["", e]),
        await Net_1.Net.CallAsync(25226, e));
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("DangoMonopoly", 69, "MAc", ["", e]),
      ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(
        e,
        27626,
      ) || o?.ProtoReceiveGridRewardResponse();
  }
  async RequestDice() {
    var o = this.Data,
      e = Protocol_1.Aki.Protocol.vAc.create(),
      e =
        ((e.w6n = o?.Id ?? 0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("DangoMonopoly", 69, "vAc", ["", e]),
        await Net_1.Net.CallAsync(24382, e));
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("DangoMonopoly", 69, "yAc", ["", e]),
      ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(
        e,
        27036,
      )
        ? o?.SetIsDangoMoveProcess(!1)
        : (o?.ProtoDiceResponse(e), this.RefreshActivityRedDot());
  }
  async RequestEnterNextBoard() {
    var o = this.Data,
      e = Protocol_1.Aki.Protocol.PUc.create(),
      e =
        ((e.w6n = o?.Id ?? 0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("DangoMonopoly", 69, "PUc", ["", e]),
        await Net_1.Net.CallAsync(21764, e));
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("DangoMonopoly", 69, "xUc", ["", e]),
      ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(
        e,
        20014,
      ) || (o?.ProtoEnterNextBoardResponse(e), this.RefreshActivityRedDot());
  }
}
exports.ActivityDangoMonopolyController = ActivityDangoMonopolyController;
//# sourceMappingURL=ActivityDangoMonopolyController.js.map
