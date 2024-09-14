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
  static OpenTaskView(e = 1, o = 0, n = !1) {
    e = new MoonChasingTaskViewData_1.MoonChasingTaskViewData(e, o, n);
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
        MoonChasingController.Ifa,
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
        MoonChasingController.Ifa,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(22999, MoonChasingController.pRn),
      Net_1.Net.Register(25762, MoonChasingController.hOn),
      Net_1.Net.Register(16218, MoonChasingController.T7s),
      Net_1.Net.Register(15167, MoonChasingController.iMa),
      Net_1.Net.Register(17373, MoonChasingController.aRa);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22999),
      Net_1.Net.UnRegister(25762),
      Net_1.Net.UnRegister(16218),
      Net_1.Net.UnRegister(15167),
      Net_1.Net.UnRegister(17373);
  }
  static async TrackMoonAllDataRequest() {
    await Promise.all([
      MoonChasingController.h2e(),
      MoonChasingController.l2e(),
      MoonChasingController._2e(),
    ]);
  }
  static async l2e() {
    var e = Protocol_1.Aki.Protocol.ifs.create(),
      e = await Net_1.Net.CallAsync(28121, e);
    e &&
      ModelManager_1.ModelManager.MoonChasingBusinessModel.SetAllDelegationData(
        e.ZGs,
      );
  }
  static async h2e() {
    var e = Protocol_1.Aki.Protocol.hfs.create(),
      e = await Net_1.Net.CallAsync(18617, e);
    e &&
      ModelManager_1.ModelManager.MoonChasingBuildingModel.SetAllBuildingData(
        e.tOs,
      );
  }
  static async _2e() {
    var e = Protocol_1.Aki.Protocol.ofs.create(),
      e = await Net_1.Net.CallAsync(23674, e);
    e &&
      ModelManager_1.ModelManager.MoonChasingBusinessModel.SetAllEditTeamData(
        e.eOs,
      );
  }
  static BuildingLevelUpRequest(o) {
    var e = Protocol_1.Aki.Protocol.Qgs.create();
    e.W6n = o;
    const n = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
    Net_1.Net.Call(25997, e, (e) => {
      e &&
        (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              28871,
            )
          : (ModelManager_1.ModelManager.MoonChasingBuildingModel.LevelUpBuildingData(
              e.HGs,
              n,
              e.$va,
            ),
            MoonChasingController.OpenBuildingLevelUpView(!0, o)));
    });
  }
  static BuildingUnLockRequest(o) {
    var e = Protocol_1.Aki.Protocol._fs.create();
    e.W6n = o;
    const n = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
    Net_1.Net.Call(20043, e, (e) => {
      e &&
        (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              19440,
            )
          : (ModelManager_1.ModelManager.MoonChasingBuildingModel.UnlockBuildingData(
              o,
              n,
              e.$va,
            ),
            MoonChasingController.OpenBuildingLevelUpView(!1, o)));
    });
  }
  static BuildingBuildFlowRequest(e, n) {
    var o = Protocol_1.Aki.Protocol.ceh.create();
    (o.W6n = e),
      Net_1.Net.Call(25983, o, (o) => {
        if (o) {
          let e = !0;
          o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              o.Q4n,
              19440,
            ),
            (e = !1)),
            n(e);
        }
      });
  }
  static AcceptDelegateRequest(a, i) {
    ModelManager_1.ModelManager.MoonChasingBusinessModel.SetIsInDelegate(!0);
    var e = Protocol_1.Aki.Protocol.zgs.create();
    (e.X6n = a), (e.C5n = i);
    const r = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue(),
      t = [];
    for (const n of i) {
      var o =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(
          n,
        );
      t.push(o.Level);
    }
    Net_1.Net.Call(24117, e, (e) => {
      var o, n;
      e
        ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              19139,
            ),
            ModelManager_1.ModelManager.MoonChasingBusinessModel.SetIsInDelegate(
              !1,
            ))
          : ((n = (o =
              ModelManager_1.ModelManager.MoonChasingBusinessModel.GetDelegationData(
                a,
              )).BestEvaluateLevel),
            o.SetBestEvaluateLevel(e.WGs),
            ((o = new DelegationResultData_1.DelegationResultData(
              a,
            )).IsTriggerEvent = e.jGs),
            (o.TriggerEventRoleId = e.zGs),
            (o.BaseGold = e.XGs),
            (o.BaseWish = e.YGs),
            (o.Gold = e.XGs),
            (o.Wish = e.YGs),
            (o.LastPopularity = r),
            (o.IsBest = n < e.WGs),
            o.SetEvaluationLevel(e.WGs),
            o.SetRoleResultData(e.QGs, e.KGs),
            o.SetRoleIdList(i),
            ModelManager_1.ModelManager.MoonChasingBusinessModel.SetResultData(
              o,
            ),
            (n = { RoleList: i, LastLevelList: t, DelegateId: a }),
            MoonChasingController.OpenTipsTravelView(n),
            ModelManager_1.ModelManager.MoonChasingBusinessModel.ReplaceDelegationData(
              a,
              e.rla,
            ))
        : ModelManager_1.ModelManager.MoonChasingBusinessModel.SetIsInDelegate(
            !1,
          );
    });
  }
  static InvestRequest(a, i, r, t) {
    var e = Protocol_1.Aki.Protocol.efs.create(),
      o =
        ((e.X6n = a),
        (e.$6n = i),
        ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId());
    const s =
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o);
    Net_1.Net.Call(17124, e, (e) => {
      if (e)
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTrackMoonTrigger)
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            19337,
          ),
            ModelManager_1.ModelManager.MoonChasingBusinessModel.SetIsInDelegate(
              !1,
            ),
            UiManager_1.UiManager.CloseView("BusinessTipsResultView"),
            UiManager_1.UiManager.NormalResetToView("MoonChasingMainView");
        else if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            19337,
          );
        else if (0 === i) {
          const n =
            ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
          (n.Ratio = r), void MoonChasingController.OpenTipsFinishView();
        } else {
          var o =
            ModelManager_1.ModelManager.MoonChasingBusinessModel.GetDelegationData(
              a,
            );
          o && o.SetBestEvaluateLevel(e.WGs);
          const n =
            ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
          (n.BaseGold = e.Grh),
            (n.Gold = e.XGs),
            (n.OriginGold = s),
            (n.CostGold = i),
            (n.Ratio = e.KRs ? r : t),
            (n.IsInvestSuccess = e.KRs),
            (n.IsBest = n.EvaluationLevel < e.WGs),
            n.SetEvaluationLevel(e.WGs),
            n.SaveInvestProperData(e.KGs),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.BusinessInvestResult,
            );
        }
    });
  }
  static RoleTrainRequest(o, n) {
    var e = Protocol_1.Aki.Protocol.Ygs.create(),
      a =
        ((e.Q6n = o),
        (e.Y6n = n),
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(
          o,
        ));
    const i =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.DeepCopyEditTeamData(
        a,
      );
    Net_1.Net.Call(16160, e, (e) => {
      e &&
        (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              16279,
            )
          : ((e = {
              RoleId: o,
              IsMoreSuccessful: e.Wua,
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
    var o = Protocol_1.Aki.Protocol.q7s.create();
    (o.BVn = e),
      Net_1.Net.Call(16961, o, (e) => {
        if (e) {
          for (const n of e.BVn) {
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
    var e = Protocol_1.Aki.Protocol.b7s.create(),
      e = await Net_1.Net.CallAsync(16366, e);
    return e
      ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            26476,
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
  (MoonChasingController.Ifa = (e) => {
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
    e.iOs === Protocol_1.Aki.Protocol.iOs.Proto_TrackMoonEntrust
      ? ModelManager_1.ModelManager.MoonChasingBusinessModel.ConditionUnlockDelegationData(
          e.rOs.VGs,
        )
      : e.iOs === Protocol_1.Aki.Protocol.iOs.Proto_TrackMoonRole
        ? ModelManager_1.ModelManager.MoonChasingBusinessModel.ConditionUnlockEditTeamData(
            e.rOs.$Gs,
          )
        : e.iOs === Protocol_1.Aki.Protocol.iOs.Proto_TrackMoonBuild &&
          ModelManager_1.ModelManager.MoonChasingBuildingModel.ConditionUnlockBuildingData(
            e.rOs.HGs,
          );
  }),
  (MoonChasingController.hOn = (e) => {
    ModelManager_1.ModelManager.MoonChasingRewardModel.SetAllRewardTargetData(
      e.oOs,
    );
  }),
  (MoonChasingController.T7s = (e) => {
    for (const n of e.BVn) {
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
  (MoonChasingController.iMa = (e) => {
    for (const o of e.exs)
      ModelManager_1.ModelManager.MoonChasingBusinessModel.SetEditTeamData(o);
  }),
  (MoonChasingController.aRa = (e) => {
    ModelManager_1.ModelManager.MoonChasingRewardModel.TargetGetCount = e.Nrh;
  }),
  (MoonChasingController.TrackMoonTargetRewardRequest = (o) => {
    var e = Protocol_1.Aki.Protocol.Wfs.create();
    (e.s5n = o),
      Net_1.Net.Call(21539, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                16279,
              )
            : ModelManager_1.ModelManager.MoonChasingRewardModel.TakenRewardTargetData(
                o,
              ));
      });
  });
//# sourceMappingURL=MoonChasingController.js.map
