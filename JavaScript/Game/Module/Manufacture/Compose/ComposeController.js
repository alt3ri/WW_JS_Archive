"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeController = void 0);
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
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
  RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData"),
  CommonManager_1 = require("../Common/CommonManager"),
  ComposeDefine_1 = require("./ComposeDefine"),
  ENTER_AUDIO_ID = "play_ui_fx_spl_gen_page_open",
  LEAVE_AUDIO_ID = "play_ui_fx_spl_gen_page_close",
  SUCCESS_AUDIO_ID = "play_ui_fx_spl_gen_robot_success_vo";
class ComposeController extends UiControllerBase_1.UiControllerBase {
  static get ComposeCoinId() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig("ComposeCost") ?? -1
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
      ComposeController.QIi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SwitchViewType,
        ComposeController.XIi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        ComposeController.Nqt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemUse,
        ComposeController.$Ii,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ActiveRole,
      ComposeController.QIi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SwitchViewType,
        ComposeController.XIi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        ComposeController.Nqt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemUse,
        ComposeController.$Ii,
      );
  }
  static RegisterCurrentInteractionEntity() {
    this.YIi =
      ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
  }
  static ClearCurrentInteractionEntityDisplay() {
    this.YIi && (this.ClearCompositeDisplay(), (this.YIi = void 0));
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(23577, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Compose", 50, "10277_服务端主动推送合成数据更新"),
        ModelManager_1.ModelManager.ComposeModel.UpdateComposeDataList(e.zqs),
        ModelManager_1.ModelManager.ComposeModel.HideComposeDataList(e.rGs);
    }),
      Net_1.Net.Register(29508, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Compose",
            50,
            "10280_服务端主动推送合成等级数据更新",
          ),
          ModelManager_1.ModelManager.ComposeModel.UpdateComposeInfo(e.eGs),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UpdateComposeInfo,
          );
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23577), Net_1.Net.UnRegister(29508);
  }
  static JIi(e) {
    ModelManager_1.ModelManager.ComposeModel.CreateComposeDataList(e.zqs),
      ModelManager_1.ModelManager.ComposeModel.UpdateComposeByServerConfig(
        e.Zqs,
      ),
      ModelManager_1.ModelManager.ComposeModel.CreateComposeLevelInfo(e.eGs),
      ModelManager_1.ModelManager.ComposeModel.SaveLimitRefreshTime(e.EPs);
  }
  static async SendSynthesisInfoRequestAsync() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Compose",
        50,
        "10273_客户端请求合成系统相关数据(异步刷新)",
      );
    var e = new Protocol_1.Aki.Protocol.Qms(),
      e = await Net_1.Net.CallAsync(17176, e);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Compose",
        50,
        "10273_返回请求合成系统相关数据(异步刷新)",
      ),
      e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
        ? ComposeController.JIi(e)
        : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.hvs,
            12316,
            void 0,
            !0,
            !1,
          ),
          UiManager_1.UiManager.IsViewShow("ComposeRootView") &&
            UiManager_1.UiManager.CloseView("ComposeRootView"));
  }
  static SendSynthesisItemRequest(e, o, t) {
    var r = new Protocol_1.Aki.Protocol.Yms();
    (r.J4n = e),
      (r.O6n = o),
      (r.o9n = t),
      (r.vVn =
        ModelManager_1.ModelManager.ComposeModel.CurrentInteractCreatureDataLongId),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Compose", 50, "10275_请求合成道具"),
      Net_1.Net.Call(7600, Protocol_1.Aki.Protocol.Yms.create(r), (t) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Compose", 50, "10275_请求合成道具返回"),
          t.hvs === Protocol_1.Aki.Protocol.O4n.NRs)
        ) {
          let e = void 0;
          (e =
            (e =
              (e =
                e ||
                ModelManager_1.ModelManager.ComposeModel.GetStructureDataById(
                  t.J4n,
                )) ||
              ModelManager_1.ModelManager.ComposeModel.GetReagentProductionDataById(
                t.J4n,
              )) ||
            ModelManager_1.ModelManager.ComposeModel.GetPurificationDataById(
              t.J4n,
            )) && (e.LastRoleId = t.O6n);
          var r = t.dPs,
            a =
              (0 !== t.CPs.length && r.push(...t.CPs),
              ModelManager_1.ModelManager.ComposeModel),
            n = a.GetComposeInfo(),
            s = n.ComposeLevel,
            i = a.GetComposeMaxLevel(),
            l = a.GetComposeLevelByLevel(i),
            n = n.TotalProficiency,
            l = l.Completeness;
          let o = void 0;
          1 === a.CurrentComposeListType &&
            (a.LastExp < l || (s < i && n < l)) &&
            ((l = a.GetComposeLevelByLevel(Math.min(i, s + 1))),
            (i = {
              FromProgress: a.LastExp,
              ToProgress: n,
              MaxProgress: l.Completeness,
            }),
            (o = [i])),
            (a.LastExp = n);
          const m = [];
          for (const g of r) {
            var _ = g.f8n,
              C = g.MVn,
              _ = new RewardItemData_1.RewardItemData(_, C);
            m.push(_);
          }
          ComposeController.PlayCompositeWorkingDisplay(() => {
            ComposeController.ZIi(SUCCESS_AUDIO_ID),
              ComposeController.PlayCompositeLoopDisplay(),
              ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
                2004,
                !0,
                m,
                o,
              );
          }) ||
            ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
              2004,
              !0,
              m,
              o,
            ),
            ModelManager_1.ModelManager.ComposeModel.UpdateComposeItemList(r),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ComposeSuccess,
            );
        } else
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            t.hvs,
            15657,
          ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ComposeFail,
            );
      });
  }
  static SendSynthesisLevelRewardRequest() {
    var e;
    ComposeController.eTi
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Compose",
          50,
          "已经请求过10278_领取制药等级奖励，等待返回",
        )
      : ((e = new Protocol_1.Aki.Protocol.Zms()),
        (ComposeController.eTi = !0),
        Net_1.Net.Call(19550, Protocol_1.Aki.Protocol.Zms.create(e), (e) => {
          (ComposeController.eTi = !1),
            e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
              ? (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Compose", 50, "10278_领取制药等级奖励返回"),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.UpgradeComposeLevel,
                ))
              : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.hvs,
                  11388,
                );
        }));
  }
  static SendSynthesisFormulaUnlockRequest(t) {
    var e = new Protocol_1.Aki.Protocol.iCs();
    (e.J4n = t),
      Net_1.Net.Call(15739, Protocol_1.Aki.Protocol.iCs.create(e), (e) => {
        var o;
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Compose", 50, "10281_制药配方解锁请求返回"),
          e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
            ? (ModelManager_1.ModelManager.ComposeModel.UnlockReagentProductionData(
                e.J4n,
              ),
              ModelManager_1.ModelManager.ComposeModel.UnlockStructureData(
                e.J4n,
              ),
              (o =
                ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
                  t,
                )),
              (o = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
                o.Name,
              )),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "ComposeStudy",
                o,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateComposeFormula,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.hvs,
                26203,
              );
      });
  }
  static CheckIsBuff(e, o) {
    return ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
      o,
    ).RoleList.includes(e);
  }
  static GetComposeInfoText(e) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    let o = "";
    for (const t of ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
      e.SkillId,
    ))
      0 !== t.LeftSkillEffect &&
        (o = StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.SkillDescribe),
          ...t.SkillDetailNum,
        ));
    return o;
  }
  static GetComposeItemList() {
    return ModelManager_1.ModelManager.ComposeModel.GetComposeItemList();
  }
  static SetSelectedComposeLevel(e) {
    ModelManager_1.ModelManager.ComposeModel.SelectedComposeLevel = e;
  }
  static GetSelectedComposeLevel() {
    return ModelManager_1.ModelManager.ComposeModel.SelectedComposeLevel;
  }
  static GetRewardLevelInfo() {
    return ModelManager_1.ModelManager.ComposeModel.GetComposeInfo();
  }
  static GetComposeLevelByLevel(e) {
    return ModelManager_1.ModelManager.ComposeModel.GetComposeLevelByLevel(e);
  }
  static GetSumExpByLevel(e) {
    return ModelManager_1.ModelManager.ComposeModel.GetSumExpByLevel(e);
  }
  static GetDropIdByLevel(e) {
    return ModelManager_1.ModelManager.ComposeModel.GetDropIdByLevel(e);
  }
  static GetComposeMaxLevel() {
    return ModelManager_1.ModelManager.ComposeModel.GetComposeMaxLevel();
  }
  static CheckCanReagentProduction(e) {
    return ModelManager_1.ModelManager.ComposeModel.CheckCanReagentProduction(
      e,
    );
  }
  static CheckCanPurification(e) {
    return ModelManager_1.ModelManager.ComposeModel.CheckCanPurification(e);
  }
  static CheckCanStructure(e) {
    return ModelManager_1.ModelManager.ComposeModel.CheckCanStructure(e);
  }
  static CheckIsBuffEx(e, o) {
    var t =
      ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(o);
    if (!t.RoleList.includes(e))
      for (const r of ModelManager_1.ModelManager.RoleModel.GetRoleIdList())
        if (t.RoleList.includes(r)) return !0;
    return !1;
  }
  static GetComposeText(e) {
    return ModelManager_1.ModelManager.ComposeModel.GetComposeText(e);
  }
  static GetComposeId(e) {
    return ModelManager_1.ModelManager.ComposeModel.GetComposeId(e);
  }
  static CheckShowRoleView() {
    return !0;
  }
  static GetMaxCreateCount(e) {
    e = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e);
    return ComposeController.Hqt(e.ConsumeItems, e.LimitCount);
  }
  static Hqt(e, o) {
    let t = 0;
    t =
      0 !== o
        ? o
        : CommonParamById_1.configCommonParamById.GetIntConfig(
            "max_cooking_count",
          );
    for (const n of e) {
      var r = n.Count,
        a = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          n.ItemId,
        );
      if (a < r) return 0;
      a = MathUtils_1.MathUtils.GetFloatPointFloor(a / r, 0);
      t = t < a ? t : a;
    }
    return t;
  }
  static SendManufacture(e, o) {
    ModelManager_1.ModelManager.ComposeModel.CheckComposeMaterialEnough(e)
      ? (1 ===
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType &&
          ModelManager_1.ModelManager.ComposeModel.CleanAddExp(),
        ComposeController.SendSynthesisItemRequest(
          e,
          ComposeController.GetCurrentRoleId(),
          o,
        ))
      : ComposeController.PlayCompositeFailDisplay(() => {
          ComposeController.PlayCompositeLoopDisplay();
        });
  }
  static GetCurrentRoleId() {
    return ModelManager_1.ModelManager.ComposeModel.CurrentComposeRoleId;
  }
  static SetCurrentRoleId(e) {
    ModelManager_1.ModelManager.ComposeModel.CurrentComposeRoleId = e;
  }
  static GetManufactureMaterialList(e) {
    return ModelManager_1.ModelManager.ComposeModel.GetComposeMaterialList(e);
  }
  static GetHelpRoleItemDataList(e) {
    return ModelManager_1.ModelManager.ComposeModel.GetHelpRoleItemDataList(e);
  }
  static GetComposeRoleId(e) {
    switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
      case 1:
        return ModelManager_1.ModelManager.ComposeModel.GetReagentProductionRoleId(
          e,
        );
      case 2:
        return ModelManager_1.ModelManager.ComposeModel.GetStructureRoleId(e);
      case 3:
        return ModelManager_1.ModelManager.ComposeModel.GetPurificationRoleId(
          e,
        );
      default:
        return 0;
    }
  }
  static CheckCanShowExpItem() {
    return (
      1 === ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType
    );
  }
  static CheckCanGetComposeLevel() {
    var e = ModelManager_1.ModelManager.ComposeModel.GetComposeInfo();
    if (
      e.ComposeLevel !==
      ModelManager_1.ModelManager.ComposeModel.GetComposeMaxLevel()
    ) {
      var o = ModelManager_1.ModelManager.ComposeModel.GetSumExpByLevel(
        e.ComposeLevel,
      );
      if (e.TotalProficiency >= o) return !0;
    }
    return !1;
  }
  static PlayCompositeEnterDisplay(e) {
    this.ClearCompositeDisplay();
    var o,
      t = this.jqt();
    t &&
      ((o = ModelManager_1.ModelManager.ComposeModel.ComposeEnterFlow),
      ComposeController.PlayCompositeFlow(o),
      ComposeController.ZIi(ENTER_AUDIO_ID),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Test", 8, "[CompositeDisplay]播放进入合成表现"),
      t.AddTag(-234527092),
      (this.tTi = e),
      (this.iTi = TimerSystem_1.TimerSystem.Delay(() => {
        this.tTi && this.tTi();
      }, ComposeDefine_1.COMPOSITE_ENTER_SEQUENCE_TIME_LENGTH)));
  }
  static PlayCompositeLoopDisplay() {
    this.ClearCompositeDisplay();
    var e = this.jqt();
    e &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Test", 8, "[CompositeDisplay]播放合成循环表现"),
      e.AddTag(236686531));
  }
  static PlayCompositeWorkingDisplay(e) {
    this.ClearCompositeDisplay();
    var o = this.jqt();
    if (!o) return !1;
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnBeginPlayCompositeWorkingDisplay,
    ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Test", 8, "[CompositeDisplay]播放合成工作中表现");
    return (
      o.AddTag(686058684),
      (this.oTi = e),
      (this.iTi = TimerSystem_1.TimerSystem.Delay(() => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPlayCompositeWorkingDisplayFinished,
        ),
          this.oTi && this.oTi();
      }, ComposeDefine_1.COMPOSITE_WORKING_SEQUENCE_TIME_LENGTH)),
      !0
    );
  }
  static PlayCompositeFlow(e) {
    var o;
    e &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          8,
          "[PlayCompositeFlow]播放D级剧情",
          ["FlowListName", e.FlowListName],
          ["StateId", e.StateId],
          ["FlowId", e.FlowId],
        ),
      (o = { ViewName: "ComposeRootView", Position: 2, TextWidth: 700 }),
      ControllerHolder_1.ControllerHolder.FlowController.StartFlowForView(
        e.FlowListName,
        e.StateId,
        e.FlowId,
        o,
      ));
  }
  static ZIi(e, o) {
    var t = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e);
    t &&
      (AudioController_1.AudioController.PostEventByUi(t.Path, o),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Compose", 8, "播放合成台音频", ["audioId", e]);
  }
  static PlayLeaveCompositeAudio() {
    this.ZIi(LEAVE_AUDIO_ID);
  }
  static PlayCompositeFailDisplay(e) {
    this.ClearCompositeDisplay();
    var o,
      t = this.jqt();
    t &&
      ((o = ModelManager_1.ModelManager.ComposeModel.ComposeFailFlow),
      ComposeController.PlayCompositeFlow(o),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Test", 8, "[CompositeDisplay]播放合成失败表现"),
      t.AddTag(-269686894),
      (this.rTi = e),
      (this.iTi = TimerSystem_1.TimerSystem.Delay(() => {
        this.rTi && this.rTi();
      }, ComposeDefine_1.COMPOSITE_FAIL_SEQUENCE_TIME_LENGTH)));
  }
  static ClearCompositeDisplay() {
    var e = this.jqt();
    e &&
      (e.RemoveTag(-269686894),
      e.RemoveTag(686058684),
      e.RemoveTag(236686531),
      e.RemoveTag(-234527092),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("Test", 8, "[CompositeDisplay]清理所有GameplayTag"),
      (this.tTi = void 0),
      (this.oTi = void 0),
      (this.rTi = void 0),
      this.iTi &&
        TimerSystem_1.TimerSystem.Has(this.iTi) &&
        (TimerSystem_1.TimerSystem.Remove(this.iTi), (this.iTi = void 0));
  }
  static jqt() {
    if (this.YIi) {
      var e = EntitySystem_1.EntitySystem.Get(this.YIi);
      if (e) return e.GetComponent(180);
    }
  }
}
((exports.ComposeController = ComposeController).iTi = void 0),
  (ComposeController.tTi = void 0),
  (ComposeController.oTi = void 0),
  (ComposeController.rTi = void 0),
  (ComposeController.YIi = void 0),
  (ComposeController.Nqt = () => {
    ModelManager_1.ModelManager.ComposeModel.CreatePurificationDataList();
  }),
  (ComposeController.XIi = (e) => {
    if (1 === CommonManager_1.CommonManager.GetCurrentSystem())
      switch (e) {
        case 0:
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 1;
          break;
        case 1:
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 2;
          break;
        case 2:
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 3;
      }
  }),
  (ComposeController.$Ii = (e, o) => {
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
    (t.ShowTypes.includes(35) || t.ShowTypes.includes(37)) &&
      ((t =
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(
          e,
        )),
      (e = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.Name)),
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "ComposeStudy",
        e,
      ),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFormula));
  }),
  (ComposeController.QIi = () => {
    ModelManager_1.ModelManager.ComposeModel.UpdateHelpRoleItemDataList();
  }),
  (ComposeController.eTi = !1);
//# sourceMappingURL=ComposeController.js.map
