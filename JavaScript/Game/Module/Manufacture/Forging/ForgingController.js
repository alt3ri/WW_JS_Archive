"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForgingController = void 0);
const AudioController_1 = require("../../../../Core/Audio/AudioController"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Net_1 = require("../../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
  RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData"),
  CommonManager_1 = require("../Common/CommonManager"),
  ForgingDefine_1 = require("./ForgingDefine"),
  ENTER_AUDIO_ID = "play_ui_fx_spl_gen_page_open",
  LEAVE_AUDIO_ID = "play_ui_fx_spl_gen_page_close",
  SUCCESS_AUDIO_ID = "play_ui_fx_spl_gen_robot_success_vo";
class ForgingController extends UiControllerBase_1.UiControllerBase {
  static get ForgingCostId() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig("ForgingCost") ?? -1
    );
  }
  static OnClear() {
    return this.ClearCurrentInteractionEntityDisplay(), !0;
  }
  static OnLeaveLevel() {
    return this.ClearCurrentInteractionEntityDisplay(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ActiveRole,
      ForgingController.QIi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SwitchViewType,
        ForgingController.XIi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        ForgingController.Nqt,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ActiveRole,
      ForgingController.QIi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SwitchViewType,
        ForgingController.XIi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        ForgingController.Nqt,
      );
  }
  static RegisterCurrentInteractionEntity() {
    this.YIi =
      ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
  }
  static ClearCurrentInteractionEntityDisplay() {
    this.YIi && (this.ClearForgingDisplay(), (this.YIi = void 0));
  }
  static tLi(e) {
    ModelManager_1.ModelManager.ForgingModel.UpdateForgingDataList(e.gUs),
      ModelManager_1.ModelManager.ForgingModel.UpdateForgingByServerConfig(
        e.gUs,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(17584, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Forging", 50, "10270_服务端主动推送锻造数据更新");
      var r = ModelManager_1.ModelManager.ForgingModel;
      let o = !1;
      for (const i of e.gUs) {
        var t = i.J4n,
          n = r.GetForgingDataById(t);
        !n ||
          n.IsUnlock ||
          ((n.IsNew = !0),
          ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.ForgingLevelKey,
            t,
          ),
          (o = !0));
      }
      o &&
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FormulaLearned",
        );
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17584);
  }
  static SendForgeInfoRequest() {
    var e;
    ForgingController.iLi
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Forging",
          50,
          "已经请求过10266_锻造系统相关数据，等待返回",
        )
      : ((ForgingController.iLi = !0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Forging", 50, "10266_客户端请求锻造系统相关数据"),
        (e = new Protocol_1.Aki.Protocol.Zis()),
        Net_1.Net.Call(26386, Protocol_1.Aki.Protocol.Zis.create(e), (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Forging", 50, "10266_返回请求锻造系统相关数据"),
            (ForgingController.iLi = !1),
            e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
              ? (ModelManager_1.ModelManager.ForgingModel.SaveLimitRefreshTime(
                  e.EPs,
                ),
                ForgingController.tLi(e),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.GetForgingData,
                ))
              : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.hvs,
                  23886,
                  void 0,
                  !0,
                  !1,
                ),
                UiManager_1.UiManager.IsViewShow("ForgingRootView") &&
                  UiManager_1.UiManager.CloseView("ForgingRootView"));
        }));
  }
  static async SendForgeInfoRequestAsync() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Forging",
        50,
        "10266_客户端请求锻造系统相关数据(异步刷新)",
      );
    var e = new Protocol_1.Aki.Protocol.Zis(),
      e = await Net_1.Net.CallAsync(26386, e);
    e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
      ? (ModelManager_1.ModelManager.ForgingModel.SaveLimitRefreshTime(e.EPs),
        ForgingController.tLi(e))
      : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.hvs,
          23886,
          void 0,
          !0,
          !1,
        ),
        UiManager_1.UiManager.IsViewShow("ForgingRootView") &&
          UiManager_1.UiManager.CloseView("ForgingRootView"));
  }
  static SendForgeItemRequest(e, r, o) {
    var t = new Protocol_1.Aki.Protocol.trs();
    (t.J4n = e),
      (t.O6n = r),
      (t.o9n = o),
      (t.vVn =
        ModelManager_1.ModelManager.ForgingModel.CurrentInteractCreatureDataLongId),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Forging", 50, "10268_请求锻造道具"),
      Net_1.Net.Call(25759, Protocol_1.Aki.Protocol.trs.create(t), (e) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Forging", 50, "10268_请求锻造道具返回"),
          e.hvs === Protocol_1.Aki.Protocol.O4n.NRs)
        ) {
          var r = ModelManager_1.ModelManager.ForgingModel.GetForgingDataById(
              e.J4n,
            ),
            r = (r && (r.LastRoleId = e.O6n), e.dPs);
          0 !== e.CPs.length && r.push(...e.CPs);
          const n = [];
          for (const i of r) {
            var o = i.f8n;
            for (let e = 0; e < (i.MVn ?? 1); e++) {
              var t = new RewardItemData_1.RewardItemData(o, 1);
              n.push(t);
            }
          }
          ForgingController.PlayForgingWorkingDisplay(() => {
            ForgingController.oLi(SUCCESS_AUDIO_ID),
              ForgingController.PlayForgingLoopDisplay(),
              ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
                2003,
                !0,
                n,
              );
          }) ||
            ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
              2003,
              !0,
              n,
            ),
            ModelManager_1.ModelManager.ForgingModel.UpdateForgingItemList(r),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ForgingSuccess,
            );
        } else
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForgingFail),
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.hvs,
              29173,
            );
      });
  }
  static SendForgeFormulaUnlockRequest(o) {
    var e = new Protocol_1.Aki.Protocol.ors();
    (e.J4n = o),
      Net_1.Net.Call(3572, Protocol_1.Aki.Protocol.ors.create(e), (e) => {
        var r;
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Forging", 50, "10271_请求解锁配方返回"),
          e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
            ? ((r =
                ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
                  o,
                )),
              (r = ConfigManager_1.ConfigManager.ForgingConfig.GetLocalText(
                r.Name,
              )),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "ComposeStudy",
                r,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateForgingFormula,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.hvs,
                23541,
              );
      });
  }
  static CheckIsBuff(e, r) {
    return ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
      r,
    ).RoleList.includes(e);
  }
  static CheckIsBuffEx(e, r) {
    var o = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(r);
    if (!o.RoleList.includes(e))
      for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleIdList())
        if (o.RoleList.includes(t)) return !0;
    return !1;
  }
  static GetMaxCreateCount(e) {
    e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e);
    return ForgingController.Hqt(
      e.ConsumeItems,
      CommonParamById_1.configCommonParamById.GetIntConfig("MaxForgingCount"),
    );
  }
  static Hqt(e, r) {
    let o = r;
    for (const i of e) {
      var t = i.Count,
        n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          i.ItemId,
        );
      if (n < t) return 0;
      n = MathUtils_1.MathUtils.GetFloatPointFloor(n / t, 0);
      o = o < n ? o : n;
    }
    return o;
  }
  static GetForgingInfoText(e) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    let r = "";
    for (const o of ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
      e.SkillId,
    ))
      0 !== o.LeftSkillEffect &&
        (r = StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.SkillDescribe),
          ...o.SkillDetailNum,
        ));
    return r;
  }
  static CheckCanForging(e) {
    return ModelManager_1.ModelManager.ForgingModel.CheckCanForging(e);
  }
  static CheckCanUnlock(e) {
    e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e);
    return (
      0 !==
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        e.FormulaItemId,
      )
    );
  }
  static CheckCanForgingOrCanUnlock(e) {
    return ModelManager_1.ModelManager.ForgingModel.GetForgingDataById(e)
      .IsUnlock
      ? ForgingController.CheckCanForging(e)
      : ForgingController.CheckCanUnlock(e);
  }
  static GetForgingText(e) {
    e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e);
    return ConfigManager_1.ConfigManager.ForgingConfig.GetLocalText(e.Name);
  }
  static GetForgingId(e) {
    return ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e)
      .ItemId;
  }
  static GetForgingMaterialList(e) {
    return ModelManager_1.ModelManager.ForgingModel.GetForgingMaterialList(e);
  }
  static GetHelpRoleItemDataList(e) {
    return ModelManager_1.ModelManager.ForgingModel.GetHelpRoleItemDataList(e);
  }
  static CheckShowRoleView() {
    return !0;
  }
  static GetCurrentRoleId() {
    return ModelManager_1.ModelManager.ForgingModel.CurrentForgingRoleId;
  }
  static SetCurrentRoleId(e) {
    ModelManager_1.ModelManager.ForgingModel.CurrentForgingRoleId = e;
  }
  static SendManufacture(e, r) {
    ForgingController.CheckCanForging(e)
      ? ForgingController.SendForgeItemRequest(
          e,
          ForgingController.GetCurrentRoleId(),
          r,
        )
      : ForgingController.PlayForgingFailDisplay(() => {
          ForgingController.PlayForgingLoopDisplay();
        });
  }
  static GetForgingRoleId(e) {
    return ModelManager_1.ModelManager.ForgingModel.GetForgingRoleId(e);
  }
  static GetForgingItemList() {
    return ModelManager_1.ModelManager.ForgingModel.GetForgingItemList();
  }
  static PlayForgingEnterDisplay(e) {
    this.ClearForgingDisplay();
    var r,
      o = this.jqt();
    o &&
      ((r = ModelManager_1.ModelManager.ComposeModel.ComposeEnterFlow),
      ForgingController.PlayForgingFlow(r),
      ForgingController.oLi(ENTER_AUDIO_ID),
      o.AddTag(-234527092),
      (this.tTi = e),
      (this.rLi = TimerSystem_1.TimerSystem.Delay(() => {
        this.tTi && this.tTi();
      }, ForgingDefine_1.FORGING_ENTER_SEQUENCE_TIME_LENGTH)));
  }
  static PlayForgingLoopDisplay() {
    this.ClearForgingDisplay();
    var e = this.jqt();
    e && e.AddTag(236686531);
  }
  static PlayForgingWorkingDisplay(e) {
    this.ClearForgingDisplay();
    var r = this.jqt();
    if (!r) return !1;
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnBeginPlayForgingWorkingDisplay,
    );
    return (
      r.AddTag(686058684),
      (this.oTi = e),
      (this.rLi = TimerSystem_1.TimerSystem.Delay(() => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPlayForgingWorkingDisplayFinished,
        ),
          this.oTi && this.oTi();
      }, ForgingDefine_1.FORGING_WORKING_SEQUENCE_TIME_LENGTH)),
      !0
    );
  }
  static PlayForgingFlow(e, r = 2) {
    e &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          8,
          "[PlayForgingFlow]播放D级剧情",
          ["FlowListName", e.FlowListName],
          ["StateId", e.StateId],
          ["FlowId", e.FlowId],
        ),
      (r = { ViewName: "ForgingRootView", Position: r, TextWidth: 700 }),
      ControllerHolder_1.ControllerHolder.FlowController.StartFlowForView(
        e.FlowListName,
        e.StateId,
        e.FlowId,
        r,
      ));
  }
  static oLi(e, r) {
    var o = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e);
    o &&
      (AudioController_1.AudioController.PostEventByUi(o.Path, r),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Forging", 8, "播放锻造台音频", ["audioId", e]);
  }
  static PlayLeaveForgingAudio() {
    this.oLi(LEAVE_AUDIO_ID);
  }
  static PlayForgingFailDisplay(e) {
    this.ClearForgingDisplay();
    var r,
      o = this.jqt();
    o &&
      ((r = ModelManager_1.ModelManager.ComposeModel.ComposeFailFlow),
      ForgingController.PlayForgingFlow(r),
      o.AddTag(-269686894),
      (this.rTi = e),
      (this.rLi = TimerSystem_1.TimerSystem.Delay(() => {
        this.rTi && this.rTi();
      }, ForgingDefine_1.FORGING_FAIL_SEQUENCE_TIME_LENGTH)));
  }
  static ClearForgingDisplay() {
    var e = this.jqt();
    e &&
      (e.RemoveTag(-269686894),
      e.RemoveTag(686058684),
      e.RemoveTag(236686531),
      e.RemoveTag(-234527092)),
      this.rLi &&
        TimerSystem_1.TimerSystem.Has(this.rLi) &&
        (TimerSystem_1.TimerSystem.Remove(this.rLi), (this.rLi = void 0));
  }
  static jqt() {
    var e =
      ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
    if (e) {
      e = EntitySystem_1.EntitySystem.Get(e);
      if (e) return e.GetComponent(180);
    }
  }
}
(exports.ForgingController = ForgingController),
  ((_a = ForgingController).rLi = void 0),
  (ForgingController.tTi = void 0),
  (ForgingController.oTi = void 0),
  (ForgingController.rTi = void 0),
  (ForgingController.YIi = 0),
  (ForgingController.Nqt = () => {
    ModelManager_1.ModelManager.ForgingModel.CreateForgingDataList(),
      _a.SendForgeInfoRequest();
  }),
  (ForgingController.XIi = (e) => {
    if (2 === CommonManager_1.CommonManager.GetCurrentSystem())
      switch (e) {
        case 0:
          ModelManager_1.ModelManager.ForgingModel.CurrentForgingViewType = 1;
          break;
        case 2:
          ModelManager_1.ModelManager.ForgingModel.CurrentForgingViewType = 2;
      }
  }),
  (ForgingController.QIi = () => {
    ModelManager_1.ModelManager.ForgingModel.UpdateHelpRoleItemDataList();
  }),
  (ForgingController.iLi = !1);
//# sourceMappingURL=ForgingController.js.map
