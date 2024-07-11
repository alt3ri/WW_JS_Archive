"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingController = void 0);
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  BuildingLevelUpViewModel_1 = require("./Build/LevelUp/BuildingLevelUpViewModel"),
  BuildingTipsInfoViewModel_1 = require("./Build/Tips/BuildingTipsInfoViewModel"),
  DelegationResultData_1 = require("./Business/Model/DelegationResultData"),
  MoonChasingBusinessViewModel_1 = require("./Business/Model/MoonChasingBusinessViewModel"),
  MoonChasingTaskViewData_1 = require("./Task/MoonChasingTaskViewData");
class MoonChasingController extends UiControllerBase_1.UiControllerBase {
  static async OpenMainView(e) {
    return (
      void 0 !==
      (await UiManager_1.UiManager.OpenViewAsync("MoonChasingMainView", e))
    );
  }
  static OpenBusinessMainView() {
    var e;
    UiManager_1.UiManager.IsViewOpen("BusinessMainView") ||
      (void 0 !== UiManager_1.UiManager.GetViewByName("BusinessMainView")
        ? UiManager_1.UiManager.NormalResetToView("BusinessMainView")
        : ((e =
            new MoonChasingBusinessViewModel_1.MoonChasingBusinessViewModel()),
          UiManager_1.UiManager.OpenView("BusinessMainView", e)));
  }
  static OpenRewardView(e = !0) {
    UiManager_1.UiManager.OpenView("RewardMainView", e);
  }
  static OpenTaskView(e = 1, o = 0) {
    e = new MoonChasingTaskViewData_1.MoonChasingTaskViewData(e, o);
    UiManager_1.UiManager.OpenView("MoonChasingTaskView", e);
  }
  static OpenTipsTravelView(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenTipsTravelView),
      UiManager_1.UiManager.OpenView("BusinessTipsTravelView", e);
  }
  static OpenTipsShopView(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenTipsShopView),
      UiManager_1.UiManager.OpenView("BusinessTipsShopView", e);
  }
  static TipsTravelSkipToNextStep() {
    ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData()
      .IsTriggerEvent
      ? (UiManager_1.UiManager.CloseView("BusinessTipsTravelView"),
        UiManager_1.UiManager.OpenView("BusinessTipsBurstView"))
      : (UiManager_1.UiManager.CloseView("BusinessTipsTravelView"),
        UiManager_1.UiManager.OpenView("BusinessTipsFinishView"));
  }
  static OpenResultView() {
    UiManager_1.UiManager.CloseView("BusinessTipsBurstView"),
      UiManager_1.UiManager.OpenView("BusinessTipsResultView");
  }
  static OpenTipsFinishView() {
    UiManager_1.UiManager.CloseView("BusinessTipsResultView"),
      UiManager_1.UiManager.OpenView("BusinessTipsFinishView");
  }
  static OpenTipsPopularityUpView(e) {
    UiManager_1.UiManager.CloseView("BusinessTipsFinishView"),
      UiManager_1.UiManager.OpenView("BusinessTipsPopularityUpView", e);
  }
  static OpenHelperView() {
    UiManager_1.UiManager.OpenView("BusinessHelperView");
  }
  static OpenHandbookView() {
    UiManager_1.UiManager.OpenView("MoonChasingHandbookView");
  }
  static OpenMemoryEntranceView() {
    UiManager_1.UiManager.OpenView("MoonChasingMemoryView");
  }
  static OpenBuildingTipsInfoView(e) {
    var o = new BuildingTipsInfoViewModel_1.BuildingTipsInfoViewModel();
    (o.BuildingId = e),
      UiManager_1.UiManager.OpenView("BuildingTipsInfoView", o);
  }
  static OpenBuildingLevelUpView(e, o) {
    var n = new BuildingLevelUpViewModel_1.BuildingLevelUpViewModel();
    (n.IsLevelUp = e),
      (n.BuildingId = o),
      UiManager_1.UiManager.OpenView("BuildingLevelUpView", n);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ConditionUnlockRole,
      MoonChasingController.fRn,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnQuestStateChange,
        MoonChasingController.DSe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        MoonChasingController.qdi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        MoonChasingController.UCa,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ConditionUnlockRole,
      MoonChasingController.fRn,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnQuestStateChange,
        MoonChasingController.DSe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        MoonChasingController.qdi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        MoonChasingController.UCa,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(10860, MoonChasingController.pRn),
      Net_1.Net.Register(29372, MoonChasingController.ZGn),
      Net_1.Net.Register(7792, MoonChasingController.Z9s),
      Net_1.Net.Register(14208, MoonChasingController.w0a),
      Net_1.Net.Register(24012, MoonChasingController.MIa);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(10860),
      Net_1.Net.UnRegister(29372),
      Net_1.Net.UnRegister(7792),
      Net_1.Net.UnRegister(14208),
      Net_1.Net.UnRegister(24012);
  }
  static async TrackMoonAllDataRequest() {
    await Promise.all([
      MoonChasingController.h2e(),
      MoonChasingController.l2e(),
      MoonChasingController._2e(),
    ]);
  }
  static async l2e() {
    var e = Protocol_1.Aki.Protocol.Xgs.create(),
      e = await Net_1.Net.CallAsync(3423, e);
    e &&
      ModelManager_1.ModelManager.MoonChasingBusinessModel.SetAllDelegationData(
        e.WGs,
      );
  }
  static async h2e() {
    var e = Protocol_1.Aki.Protocol.tfs.create(),
      e = await Net_1.Net.CallAsync(21400, e);
    e &&
      ModelManager_1.ModelManager.MoonChasingBuildingModel.SetAllBuildingData(
        e.QGs,
      );
  }
  static async _2e() {
    var e = Protocol_1.Aki.Protocol.Jgs.create(),
      e = await Net_1.Net.CallAsync(6829, e);
    e &&
      ModelManager_1.ModelManager.MoonChasingBusinessModel.SetAllEditTeamData(
        e.KGs,
      );
  }
  static BuildingLevelUpRequest(o) {
    var e = Protocol_1.Aki.Protocol.Fgs.create();
    e.q6n = o;
    const n = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
    Net_1.Net.Call(12198, e, (e) => {
      e &&
        (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              17351,
            )
          : (ModelManager_1.ModelManager.MoonChasingBuildingModel.LevelUpBuildingData(
              e.GGs,
              n,
              e.g0a,
            ),
            MoonChasingController.OpenBuildingLevelUpView(!0, o)));
    });
  }
  static BuildingUnLockRequest(o) {
    var e = Protocol_1.Aki.Protocol.rfs.create();
    e.q6n = o;
    const n = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
    Net_1.Net.Call(2135, e, (e) => {
      e &&
        (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              2100,
            )
          : (ModelManager_1.ModelManager.MoonChasingBuildingModel.UnlockBuildingData(
              o,
              n,
              e.g0a,
            ),
            MoonChasingController.OpenBuildingLevelUpView(!1, o)));
    });
  }
  static BuildingBuildFlowRequest(e, n) {
    var o = Protocol_1.Aki.Protocol.hLa.create();
    (o.q6n = e),
      Net_1.Net.Call(11715, o, (o) => {
        if (o) {
          let e = !0;
          o.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
            (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              o.O4n,
              2100,
            ),
            (e = !1)),
            n(e);
        }
      });
  }
  static AcceptDelegateRequest(a, i) {
    ModelManager_1.ModelManager.MoonChasingBusinessModel.SetIsInDelegate(!0);
    var e = Protocol_1.Aki.Protocol.jgs.create();
    (e.N6n = a), (e.s5n = i);
    const t = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue(),
      r = [];
    for (const n of i) {
      var o =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(
          n,
        );
      r.push(o.Level);
    }
    Net_1.Net.Call(2108, e, (e) => {
      var o, n;
      e
        ? e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              27969,
            ),
            ModelManager_1.ModelManager.MoonChasingBusinessModel.SetIsInDelegate(
              !1,
            ))
          : ((n = (o =
              ModelManager_1.ModelManager.MoonChasingBusinessModel.GetDelegationData(
                a,
              )).BestEvaluateLevel),
            o.SetBestEvaluateLevel(e.kGs),
            ((o = new DelegationResultData_1.DelegationResultData(
              a,
            )).IsTriggerEvent = e.OGs),
            (o.TriggerEventRoleId = e.jGs),
            (o.BaseGold = e.VGs),
            (o.BaseWish = e.$Gs),
            (o.Gold = e.VGs),
            (o.Wish = e.$Gs),
            (o.LastPopularity = t),
            (o.IsBest = n < e.kGs),
            o.SetEvaluationLevel(e.kGs),
            o.SetRoleResultData(e.FGs, e.NGs),
            o.SetRoleIdList(i),
            ModelManager_1.ModelManager.MoonChasingBusinessModel.SetResultData(
              o,
            ),
            (n = { RoleList: i, LastLevelList: r }),
            MoonChasingController.OpenTipsTravelView(n),
            ModelManager_1.ModelManager.MoonChasingBusinessModel.ReplaceDelegationData(
              a,
              e.qoa,
            ))
        : ModelManager_1.ModelManager.MoonChasingBusinessModel.SetIsInDelegate(
            !1,
          );
    });
  }
  static InvestRequest(a, i, t, r) {
    var e = Protocol_1.Aki.Protocol.Kgs.create();
    (e.N6n = a),
      (e.k6n = i),
      Net_1.Net.Call(29535, e, (e) => {
        if (e)
          if (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              26982,
            );
          else if (0 === i) {
            const n =
              ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
            (n.Ratio = t), void MoonChasingController.OpenTipsFinishView();
          } else {
            var o =
              ModelManager_1.ModelManager.MoonChasingBusinessModel.GetDelegationData(
                a,
              );
            o && o.SetBestEvaluateLevel(e.kGs);
            const n =
              ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
            (n.BaseGold = e.cRa),
              (n.Gold = e.VGs),
              (n.Ratio = e.NRs ? t : r),
              (n.IsInvestSuccess = e.NRs),
              (n.IsBest = n.EvaluationLevel < e.kGs),
              n.SetEvaluationLevel(e.kGs),
              n.SaveInvestProperData(e.NGs),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.BusinessInvestResult,
              );
          }
      });
  }
  static RoleTrainRequest(o, n) {
    var e = Protocol_1.Aki.Protocol.$gs.create(),
      a =
        ((e.O6n = o),
        (e.F6n = n),
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(
          o,
        ));
    const i =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.DeepCopyEditTeamData(
        a,
      );
    Net_1.Net.Call(1568, e, (e) => {
      e &&
        (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              17856,
            )
          : ((e = {
              RoleId: o,
              IsMoreSuccessful: e.jla,
              TrainType: n,
              LastData: i,
            }),
            MoonChasingController.OpenTipsShopView(e)));
    });
  }
  static RequestAllAvailableHandbookReward() {
    var e =
        ModelManager_1.ModelManager.MoonChasingModel.GetHandbookUnlockCount(),
      o = [];
    for (const n of ModelManager_1.ModelManager.MoonChasingModel
      .HandbookRewardIdList)
      1 ===
        ModelManager_1.ModelManager.MoonChasingModel.GetHandbookRewardDataById(
          n,
        )?.GetState(e) && o.push(n);
    o.length <= 0 || MoonChasingController.TrackMoonHandbookRewardRequest(o);
  }
  static TrackMoonHandbookRewardRequest(e) {
    var o = Protocol_1.Aki.Protocol.i7s.create();
    (o.IVn = e),
      Net_1.Net.Call(19081, o, (e) => {
        if (e) {
          for (const n of e.IVn) {
            var o =
              ModelManager_1.ModelManager.MoonChasingModel.GetHandbookRewardDataById(
                n,
              );
            o && (o.Achieved = !0);
          }
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.TrackMoonHandbookUpdate,
          );
        }
      });
  }
  static async TrackMoonMemoryInfoRequest() {
    var e = Protocol_1.Aki.Protocol.e7s.create(),
      e = await Net_1.Net.CallAsync(27890, e);
    return e
      ? e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            29232,
          ),
          [])
        : ModelManager_1.ModelManager.MoonChasingModel.GetMemoryInfo(e)
      : [];
  }
}
((exports.MoonChasingController = MoonChasingController).fRn = () => {
  ModelManager_1.ModelManager.MoonChasingBusinessModel.IsInDelegate ||
    ModelManager_1.ModelManager.MoonChasingBusinessModel.IsUnlockRoleIdEmpty() ||
    UiManager_1.UiManager.OpenView("MoonChasingUnlockRoleView");
}),
  (MoonChasingController.DSe = (e, o) => {
    let n = !1;
    (n =
      !(n =
        ModelManager_1.ModelManager.MoonChasingModel.MainQuestIdList.includes(e)
          ? !0
          : n) &&
      ModelManager_1.ModelManager.MoonChasingModel.BranchQuestIdList.includes(e)
        ? !0
        : n) &&
      0 !== ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MoonChasingRefreshQuestRedDot,
      );
  }),
  (MoonChasingController.UCa = (e) => {
    ModelManager_1.ModelManager.MoonChasingBuildingModel.CheckPlotInfoValid(
      e,
    ) &&
      void 0 !==
        (e =
          ModelManager_1.ModelManager.MoonChasingBuildingModel.GetPopularityUpData()) &&
      (UiManager_1.UiManager.OpenView("BusinessTipsPopularityUpView", e),
      ModelManager_1.ModelManager.MoonChasingBuildingModel.SetPopularityUpData(
        void 0,
      ));
  }),
  (MoonChasingController.qdi = (e, o) => {
    e === ConfigManager_1.ConfigManager.BusinessConfig.GetWishItemId()
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.MoonChasingRefreshRoleRedDot,
        )
      : e === ConfigManager_1.ConfigManager.BusinessConfig.GetTokenItemId()
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MoonChasingRefreshRewardRedDot,
          )
        : e === ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId() &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MoonChasingRefreshBuildingRedDot,
          );
  }),
  (MoonChasingController.pRn = (e) => {
    e.XGs === Protocol_1.Aki.Protocol.XGs.Proto_TrackMoonEntrust
      ? ModelManager_1.ModelManager.MoonChasingBusinessModel.ConditionUnlockDelegationData(
          e.YGs.BGs,
        )
      : e.XGs === Protocol_1.Aki.Protocol.XGs.Proto_TrackMoonRole
        ? ModelManager_1.ModelManager.MoonChasingBusinessModel.ConditionUnlockEditTeamData(
            e.YGs.qGs,
          )
        : e.XGs === Protocol_1.Aki.Protocol.XGs.Proto_TrackMoonBuild &&
          ModelManager_1.ModelManager.MoonChasingBuildingModel.ConditionUnlockBuildingData(
            e.YGs.GGs,
          );
  }),
  (MoonChasingController.ZGn = (e) => {
    ModelManager_1.ModelManager.MoonChasingRewardModel.SetAllRewardTargetData(
      e.JGs,
    );
  }),
  (MoonChasingController.Z9s = (e) => {
    for (const n of e.IVn) {
      var o =
        ModelManager_1.ModelManager.MoonChasingModel.GetHandbookRewardDataById(
          n,
        );
      o && (o.Achieved = !0);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.TrackMoonHandbookUpdate,
    );
  }),
  (MoonChasingController.w0a = (e) => {
    for (const o of e.Kws)
      ModelManager_1.ModelManager.MoonChasingBusinessModel.SetEditTeamData(o);
  }),
  (MoonChasingController.MIa = (e) => {
    ModelManager_1.ModelManager.MoonChasingRewardModel.TargetGetCount = e.dRa;
  }),
  (MoonChasingController.TrackMoonTargetRewardRequest = (o) => {
    var e = Protocol_1.Aki.Protocol.kfs.create();
    (e.J4n = o),
      Net_1.Net.Call(9414, e, (e) => {
        e &&
          (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                17856,
              )
            : ModelManager_1.ModelManager.MoonChasingRewardModel.TakenRewardTargetData(
                o,
              ));
      });
  });
//# sourceMappingURL=MoonChasingController.js.map
