"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForgingController = void 0);
const AudioController_1 = require("../../../../Core/Audio/AudioController");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
const CommonManager_1 = require("../Common/CommonManager");
const ForgingDefine_1 = require("./ForgingDefine");
const ENTER_AUDIO_ID = "play_ui_fx_spl_gen_page_open";
const LEAVE_AUDIO_ID = "play_ui_fx_spl_gen_page_close";
const SUCCESS_AUDIO_ID = "play_ui_fx_spl_gen_robot_success_vo";
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
      ForgingController.Qyi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SwitchViewType,
        ForgingController.Xyi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        ForgingController.bbt,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ActiveRole,
      ForgingController.Qyi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SwitchViewType,
        ForgingController.Xyi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        ForgingController.bbt,
      );
  }
  static RegisterCurrentInteractionEntity() {
    this.Yyi =
      ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
  }
  static ClearCurrentInteractionEntityDisplay() {
    this.Yyi && (this.ClearForgingDisplay(), (this.Yyi = void 0));
  }
  static tTi(e) {
    ModelManager_1.ModelManager.ForgingModel.UpdateForgingDataList(e.JLs),
      ModelManager_1.ModelManager.ForgingModel.UpdateForgingByServerConfig(
        e.JLs,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(14670, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Forging", 50, "10270_服务端主动推送锻造数据更新");
      const r = ModelManager_1.ModelManager.ForgingModel;
      let o = !1;
      for (const i of e.JLs) {
        const t = i.Ekn;
        const n = r.GetForgingDataById(t);
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
    Net_1.Net.UnRegister(14670);
  }
  static SendForgeInfoRequest() {
    let e;
    ForgingController.iTi
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Forging",
          50,
          "已经请求过10266_锻造系统相关数据，等待返回",
        )
      : ((ForgingController.iTi = !0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Forging", 50, "10266_客户端请求锻造系统相关数据"),
        (e = new Protocol_1.Aki.Protocol.nZn()),
        Net_1.Net.Call(1698, Protocol_1.Aki.Protocol.nZn.create(e), (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Forging", 50, "10266_返回请求锻造系统相关数据"),
            (ForgingController.iTi = !1),
            e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
              ? (ModelManager_1.ModelManager.ForgingModel.SaveLimitRefreshTime(
                  e.rLs,
                ),
                ForgingController.tTi(e),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.GetForgingData,
                ))
              : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Kms,
                  19727,
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
    var e = new Protocol_1.Aki.Protocol.nZn();
    var e = await Net_1.Net.CallAsync(1698, e);
    e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
      ? (ModelManager_1.ModelManager.ForgingModel.SaveLimitRefreshTime(e.rLs),
        ForgingController.tTi(e))
      : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Kms,
          19727,
          void 0,
          !0,
          !1,
        ),
        UiManager_1.UiManager.IsViewShow("ForgingRootView") &&
          UiManager_1.UiManager.CloseView("ForgingRootView"));
  }
  static SendForgeItemRequest(e, r, o) {
    const t = new Protocol_1.Aki.Protocol.aZn();
    (t.Ekn = e),
      (t.l3n = r),
      (t.I5n = o),
      (t.N4n =
        ModelManager_1.ModelManager.ForgingModel.CurrentInteractCreatureDataLongId),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Forging", 50, "10268_请求锻造道具"),
      Net_1.Net.Call(1959, Protocol_1.Aki.Protocol.aZn.create(t), (e) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Forging", 50, "10268_请求锻造道具返回"),
          e.Kms === Protocol_1.Aki.Protocol.lkn.Sys)
        ) {
          var r = ModelManager_1.ModelManager.ForgingModel.GetForgingDataById(
            e.Ekn,
          );
          var r = (r && (r.LastRoleId = e.l3n), e.QTs);
          e.YTs.length !== 0 && r.push(...e.YTs);
          const n = [];
          for (const i of r) {
            const o = i.G3n;
            for (let e = 0; e < (i.k4n ?? 1); e++) {
              const t = new RewardItemData_1.RewardItemData(o, 1);
              n.push(t);
            }
          }
          ForgingController.PlayForgingWorkingDisplay(() => {
            ForgingController.oTi(SUCCESS_AUDIO_ID),
              ForgingController.PlayForgingLoopDisplay(),
              ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
                2003,
                !0,
                n,
              );
          }),
            ModelManager_1.ModelManager.ForgingModel.UpdateForgingItemList(r),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ForgingSuccess,
            );
        } else
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForgingFail),
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Kms,
              20092,
            );
      });
  }
  static SendForgeFormulaUnlockRequest(o) {
    const e = new Protocol_1.Aki.Protocol._Zn();
    (e.Ekn = o),
      Net_1.Net.Call(14873, Protocol_1.Aki.Protocol._Zn.create(e), (e) => {
        let r;
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Forging", 50, "10271_请求解锁配方返回"),
          e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
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
                e.Kms,
                16551,
              );
      });
  }
  static CheckIsBuff(e, r) {
    return ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
      r,
    ).RoleList.includes(e);
  }
  static CheckIsBuffEx(e, r) {
    const o =
      ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(r);
    if (!o.RoleList.includes(e))
      for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleIdList())
        if (o.RoleList.includes(t)) return !0;
    return !1;
  }
  static GetMaxCreateCount(e) {
    e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e);
    return ForgingController.kbt(
      e.ConsumeItems,
      CommonParamById_1.configCommonParamById.GetIntConfig("MaxForgingCount"),
    );
  }
  static kbt(e, r) {
    let o = r;
    for (const i of e) {
      const t = i.Count;
      let n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
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
      o.LeftSkillEffect !== 0 &&
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
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        e.FormulaItemId,
      ) !== 0
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
    let r;
    const o = this.Fbt();
    o &&
      ((r = ModelManager_1.ModelManager.ComposeModel.ComposeEnterFlow),
      ForgingController.PlayForgingFlow(r),
      ForgingController.oTi(ENTER_AUDIO_ID),
      o.AddTag(-234527092),
      (this.tIi = e),
      (this.rTi = TimerSystem_1.TimerSystem.Delay(() => {
        this.tIi && this.tIi();
      }, ForgingDefine_1.FORGING_ENTER_SEQUENCE_TIME_LENGTH)));
  }
  static PlayForgingLoopDisplay() {
    this.ClearForgingDisplay();
    const e = this.Fbt();
    e && e.AddTag(236686531);
  }
  static PlayForgingWorkingDisplay(e) {
    this.ClearForgingDisplay();
    const r = this.Fbt();
    r &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnBeginPlayForgingWorkingDisplay,
      ),
      r.AddTag(686058684),
      (this.oIi = e),
      (this.rTi = TimerSystem_1.TimerSystem.Delay(() => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPlayForgingWorkingDisplayFinished,
        ),
          this.oIi && this.oIi();
      }, ForgingDefine_1.FORGING_WORKING_SEQUENCE_TIME_LENGTH)));
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
  static oTi(e, r) {
    const o = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e);
    o &&
      (AudioController_1.AudioController.PostEventByUi(o.Path, r),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Forging", 8, "播放锻造台音频", ["audioId", e]);
  }
  static PlayLeaveForgingAudio() {
    this.oTi(LEAVE_AUDIO_ID);
  }
  static PlayForgingFailDisplay(e) {
    this.ClearForgingDisplay();
    let r;
    const o = this.Fbt();
    o &&
      ((r = ModelManager_1.ModelManager.ComposeModel.ComposeFailFlow),
      ForgingController.PlayForgingFlow(r),
      o.AddTag(-269686894),
      (this.rIi = e),
      (this.rTi = TimerSystem_1.TimerSystem.Delay(() => {
        this.rIi && this.rIi();
      }, ForgingDefine_1.FORGING_FAIL_SEQUENCE_TIME_LENGTH)));
  }
  static ClearForgingDisplay() {
    const e = this.Fbt();
    e &&
      (e.RemoveTag(-269686894),
      e.RemoveTag(686058684),
      e.RemoveTag(236686531),
      e.RemoveTag(-234527092)),
      this.rTi &&
        TimerSystem_1.TimerSystem.Has(this.rTi) &&
        (TimerSystem_1.TimerSystem.Remove(this.rTi), (this.rTi = void 0));
  }
  static Fbt() {
    let e =
      ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
    if (e) {
      e = EntitySystem_1.EntitySystem.Get(e);
      if (e) return e.GetComponent(177);
    }
  }
}
(exports.ForgingController = ForgingController),
  ((_a = ForgingController).rTi = void 0),
  (ForgingController.tIi = void 0),
  (ForgingController.oIi = void 0),
  (ForgingController.rIi = void 0),
  (ForgingController.Yyi = 0),
  (ForgingController.bbt = () => {
    ModelManager_1.ModelManager.ForgingModel.CreateForgingDataList(),
      _a.SendForgeInfoRequest();
  }),
  (ForgingController.Xyi = (e) => {
    if (CommonManager_1.CommonManager.GetCurrentSystem() === 2)
      switch (e) {
        case 0:
          ModelManager_1.ModelManager.ForgingModel.CurrentForgingViewType = 1;
          break;
        case 2:
          ModelManager_1.ModelManager.ForgingModel.CurrentForgingViewType = 2;
      }
  }),
  (ForgingController.Qyi = () => {
    ModelManager_1.ModelManager.ForgingModel.UpdateHelpRoleItemDataList();
  }),
  (ForgingController.iTi = !1);
// # sourceMappingURL=ForgingController.js.map
