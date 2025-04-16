"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssActivityController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  DangoAbyssRootView_1 = require("../../../Dango/DangoAbyss/View/DangoAbyssRootView"),
  DangoAbyssSubView_1 = require("../../../Dango/DangoAbyss/View/DangoAbyssSubView"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  DangoAbyssActivityData_1 = require("./DangoAbyssActivityData");
class DangoAbyssActivityController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.Io_ = (e) => {
        var t = this.euc();
        t
          ? (t.OnRoleInfoUpdate(e),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnAbyssRoleInfoUpdate,
            ))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }),
      (this.tuc = (e) => {
        var t = this.euc();
        if (t) {
          t.OnAddRoleInfo(e),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnAbyssAddRole,
            );
          const o = new Map();
          e.Y7n.forEach((e) => {
            o.set(e.s5n, e.F6n);
          }),
            ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenGetDangoView(
              o,
            );
        } else
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }),
      (this.iuc = (e) => {
        var t = this.euc();
        t
          ? (t.OnPluginInfoUpdate(e),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnAbyssPluginInfoUpdate,
            ))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }),
      (this.ruc = (e) => {
        var t = this.euc();
        t
          ? (t.OnPluginRemove(e),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnAbyssPluginInfoUpdate,
            ))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }),
      (this.QFc = (e) => {
        var t = this.euc();
        if (t) {
          t.OnPluginAdd(e);
          const o = new Map();
          e.Wnc.forEach((e) => {
            o.set(e.L8n, e.m9n);
          }),
            ControllerHolder_1.ControllerHolder.ItemHintController.AddAbyssItemList(
              o,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnAbyssPluginInfoUpdate,
            );
        } else
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }),
      (this.ouc = (e) => {
        var t = this.euc();
        t
          ? (t.OnUpdateRewardIdList(e),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnAbyssRewardStateUpdate,
            ),
            (e = t.Id),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshAbyssRewardRedDot,
              e,
            ))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      });
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiView_CelebrationGuideMain";
  }
  OnCreateSubPageComponent(e) {
    return new DangoAbyssSubView_1.DangoAbyssSubView();
  }
  OnCreateActivityData(e) {
    return new DangoAbyssActivityData_1.DangoAbyssActivityData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(23399, this.Io_),
      Net_1.Net.Register(17989, this.tuc),
      Net_1.Net.Register(29067, this.iuc),
      Net_1.Net.Register(16171, this.ruc),
      Net_1.Net.Register(19208, this.ouc),
      Net_1.Net.Register(22130, this.QFc);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23399),
      Net_1.Net.UnRegister(17989),
      Net_1.Net.UnRegister(29067),
      Net_1.Net.UnRegister(16171),
      Net_1.Net.UnRegister(19208),
      Net_1.Net.UnRegister(22130);
  }
  euc() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap())
      if (e[1].Type === Protocol_1.Aki.Protocol.uks.Proto_Abyss) return e[1];
  }
  OpenCurrentRoleUpView() {
    var e,
      t = this.euc();
    t
      ? (((e = new DangoAbyssRootView_1.DangoRootViewData()).ActivityId = t.Id),
        UiManager_1.UiManager.OpenView("DangoAbyssRootView", e))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
  }
  static RequestGetAbyssRewardList(e) {
    var t = new Protocol_1.Aki.Protocol.Voc();
    (t.BVn = e),
      Net_1.Net.Call(29706, t, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            27783,
          );
      });
  }
  static RequestAbyssDangoLevelUp(t, o) {
    var e = new Protocol_1.Aki.Protocol.Hoc();
    (e.s5n = t),
      (e.F6n = o),
      Net_1.Net.Call(24851, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              16772,
            )
          : EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnAbyssDangoLevelUp,
              t,
              o,
            );
      });
  }
  static RequestPutPluginOnDango(e, t, o) {
    var r = new Protocol_1.Aki.Protocol.Woc();
    (r.Znc = e),
      (r.Xnc = t),
      Net_1.Net.Call(23190, r, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              28426,
            )
          : this.ShowEquipTipsByState(o);
      });
  }
  static RequestPluginRecovery(e) {
    var t = new Protocol_1.Aki.Protocol.Koc();
    (t.hAc = e),
      Net_1.Net.Call(25739, t, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              26152,
            )
          : (e = e.lAc).length <= 0
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Calabash",
                75,
                "Proto_AbyssPluginSynthesisResponse.Proto_OutputItems为空",
              )
            : EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnAbyssPluginRecovery,
                e,
              );
      });
  }
  static GetAbyssChallengeByActivityId(e) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    return e ? e.GetAbyssChallengeDataList() : [];
  }
  static GetAbyssChallengeRankListByActivityId(e) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    return e ? e.GetAbyssChallengeRankList() : [];
  }
  static ShowEquipTipsByState(e) {
    switch (e) {
      case 2:
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Text_DangoEquipSuccessSwitch_Text",
        );
        break;
      case 3:
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Text_DangoEquipSuccessTakeOff_Text",
        );
        break;
      case 4:
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Text_DangoEquipSuccessSwitch_Text",
        );
        break;
      case 5:
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Text_DangoEquipSuccessPutOn_Text",
        );
        break;
      case 6:
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Text_DangoEquipSuccessSwitch_Text",
        );
        break;
      case 7:
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Text_DangoEquipSuccessPutOn_Text",
        );
    }
  }
}
exports.DangoAbyssActivityController = DangoAbyssActivityController;
//# sourceMappingURL=DangoAbyssActivityController.js.map
