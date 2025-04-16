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
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        ComposeController.$Ge,
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
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        ComposeController.$Ge,
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
    Net_1.Net.Register(28628, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Compose", 49, "10277_服务端主动推送合成数据更新"),
        ModelManager_1.ModelManager.ComposeModel.UpdateComposeDataList(e.nGs),
        ModelManager_1.ModelManager.ComposeModel.HideComposeDataList(e._Gs);
    }),
      Net_1.Net.Register(18100, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Compose",
            49,
            "10280_服务端主动推送合成等级数据更新",
          ),
          ModelManager_1.ModelManager.ComposeModel.UpdateComposeInfo(e.aGs),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UpdateComposeInfo,
          );
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28628), Net_1.Net.UnRegister(18100);
  }
  static JIi(e) {
    ModelManager_1.ModelManager.ComposeModel.CreateComposeDataList(e.nGs),
      ModelManager_1.ModelManager.ComposeModel.UpdateComposeByServerConfig(
        e.sGs,
      ),
      ModelManager_1.ModelManager.ComposeModel.CreateComposeLevelInfo(e.aGs),
      ModelManager_1.ModelManager.ComposeModel.SaveLimitRefreshTime(e.APs);
  }
  static async SendSynthesisInfoRequestAsync() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Compose",
        49,
        "10273_客户端请求合成系统相关数据(异步刷新)",
      );
    var e = new Protocol_1.Aki.Protocol.tCs(),
      e = await Net_1.Net.CallAsync(17408, e);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Compose",
        49,
        "10273_返回请求合成系统相关数据(异步刷新)",
      ),
      e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
        ? ComposeController.JIi(e)
        : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Cvs,
            23562,
            void 0,
            !0,
            !1,
          ),
          UiManager_1.UiManager.IsViewShow("ComposeCarryOnView") &&
            UiManager_1.UiManager.CloseView("ComposeCarryOnView"));
  }
  static async SendSynthesisItemRequest(t, r, n) {
    var a = new Protocol_1.Aki.Protocol.rCs(),
      t =
        ((a.s5n = t),
        (a.Q6n = r),
        (a.m9n = n),
        (a.AVn =
          ModelManager_1.ModelManager.ComposeModel.CurrentInteractCreatureDataLongId),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Compose", 49, "10275_请求合成道具"),
        await Net_1.Net.CallAsync(
          20380,
          Protocol_1.Aki.Protocol.rCs.create(a),
        ));
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Compose", 49, "10275_请求合成道具返回"),
      t.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs)
    ) {
      let e = void 0;
      (e =
        (e =
          (e =
            e ||
            ModelManager_1.ModelManager.ComposeModel.GetStructureDataById(
              t.s5n,
            )) ||
          ModelManager_1.ModelManager.ComposeModel.GetReagentProductionDataById(
            t.s5n,
          )) ||
        ModelManager_1.ModelManager.ComposeModel.GetPurificationDataById(
          t.s5n,
        )) && (e.LastRoleId = t.Q6n);
      var r = t.MPs,
        n =
          (0 !== t.EPs.length && r.push(...t.EPs),
          ModelManager_1.ModelManager.ComposeModel),
        a = n.GetComposeInfo(),
        s = a.ComposeLevel,
        i = n.GetComposeMaxLevel(),
        l = n.GetComposeLevelByLevel(i),
        a = a.TotalProficiency,
        l = l.Completeness;
      let o = void 0;
      1 === n.CurrentComposeListType &&
        (n.LastExp < l || (s < i && a < l)) &&
        ((l = n.GetComposeLevelByLevel(Math.min(i, s + 1))),
        (i = {
          FromProgress: n.LastExp,
          ToProgress: a,
          MaxProgress: l.Completeness,
        }),
        (o = [i])),
        (n.LastExp = a);
      const m = [];
      for (const g of r) {
        var _ = g.L8n,
          C = g.UVn,
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
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComposeSuccess);
    } else
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        t.Cvs,
        26487,
      ),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComposeFail);
  }
  static async SendExchangeItemRequest(e, o, t) {
    var r,
      n,
      a = new Protocol_1.Aki.Protocol.Np_(),
      o =
        ((a.Mjl = e),
        (a.Ejl = o),
        (a.Ijl = t),
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Compose", 5, "请求置换"),
        await Net_1.Net.CallAsync(
          21293,
          Protocol_1.Aki.Protocol.Np_.create(a),
        ));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Compose", 5, "请求置换返回"),
      o.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
        ? ((a = []),
          (r = e),
          (n = t / ComposeDefine_1.EXCHANGE_COUNT),
          (r = new RewardItemData_1.RewardItemData(r, n)),
          a.push(r),
          ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
            2004,
            !0,
            a,
            void 0,
          ),
          (n = { L8n: e, UVn: t / ComposeDefine_1.EXCHANGE_COUNT }),
          ModelManager_1.ModelManager.ComposeModel.UpdateComposeItemList([n]),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ComposeSuccess,
          ))
        : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            o.Cvs,
            26487,
          ),
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComposeFail));
  }
  static SendSynthesisLevelRewardRequest() {
    var e;
    ComposeController.eTi
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Compose",
          49,
          "已经请求过10278_领取制药等级奖励，等待返回",
        )
      : ((e = new Protocol_1.Aki.Protocol.sCs()),
        (ComposeController.eTi = !0),
        Net_1.Net.Call(21481, Protocol_1.Aki.Protocol.sCs.create(e), (e) => {
          (ComposeController.eTi = !1),
            e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
              ? (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Compose", 49, "10278_领取制药等级奖励返回"),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.UpgradeComposeLevel,
                ))
              : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Cvs,
                  26185,
                );
        }));
  }
  static SendSynthesisFormulaUnlockRequest(t) {
    var e = new Protocol_1.Aki.Protocol.lCs();
    (e.s5n = t),
      Net_1.Net.Call(15618, Protocol_1.Aki.Protocol.lCs.create(e), (e) => {
        var o;
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Compose", 49, "10281_制药配方解锁请求返回"),
          e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ModelManager_1.ModelManager.ComposeModel.UnlockReagentProductionData(
                e.s5n,
              ),
              ModelManager_1.ModelManager.ComposeModel.UnlockStructureData(
                e.s5n,
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
                e.Cvs,
                20099,
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
  static CheckCanExchange(e) {
    return ModelManager_1.ModelManager.ComposeModel.CheckCanExchange(e);
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
  static GetMaxCreateCount(e, o) {
    (e =
      ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e)),
      (e = ComposeController.Hqt(e.ConsumeItems, e.LimitCount));
    return !o || o.TotalMakeCountInLimitTime <= 0
      ? e
      : ((o = o.TotalMakeCountInLimitTime - o.MadeCountInLimitTime),
        Math.min(e, o));
  }
  static Hqt(e, o) {
    let t = 0;
    t =
      0 !== o
        ? o
        : CommonParamById_1.configCommonParamById.GetIntConfig(
            "max_cooking_count",
          );
    for (const a of e) {
      var r = a.Count,
        n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          a.ItemId,
        );
      if (n < r) return 0;
      n = MathUtils_1.MathUtils.GetFloatPointFloor(n / r, 0);
      t = t < n ? t : n;
    }
    return t;
  }
  static async SendManufacture(e, o) {
    ModelManager_1.ModelManager.ComposeModel.CheckComposeMaterialEnough(e)
      ? (1 ===
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType &&
          ModelManager_1.ModelManager.ComposeModel.CleanAddExp(),
        await ComposeController.SendSynthesisItemRequest(
          e,
          ComposeController.GetCurrentRoleId(),
          o,
        ))
      : ComposeController.PlayCompositeFailDisplay(() => {
          ComposeController.PlayCompositeLoopDisplay();
        });
  }
  static async SendExchangeRequest(e, o, t) {
    ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o) < t
      ? ComposeController.PlayCompositeFailDisplay(() => {
          ComposeController.PlayCompositeLoopDisplay();
        })
      : await this.SendExchangeItemRequest(e, o, t);
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
        Log_1.Log.Info("Test", 64, "[CompositeDisplay]播放进入合成表现"),
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
        Log_1.Log.Info("Test", 64, "[CompositeDisplay]播放合成循环表现"),
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
        Log_1.Log.Info("Test", 64, "[CompositeDisplay]播放合成工作中表现");
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
          64,
          "[PlayCompositeFlow]播放D级剧情",
          ["FlowListName", e.FlowListName],
          ["StateId", e.StateId],
          ["FlowId", e.FlowId],
        ),
      (o = { ViewName: "ComposeCarryOnView", Position: 2, TextWidth: 700 }),
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
      Log_1.Log.Debug("Compose", 64, "播放合成台音频", ["audioId", e]);
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
        Log_1.Log.Info("Test", 64, "[CompositeDisplay]播放合成失败表现"),
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
      Log_1.Log.Info("Test", 64, "[CompositeDisplay]清理所有GameplayTag"),
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
      if (e) return e.GetComponent(194);
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
  (ComposeController.$Ge = (e) => {
    "ItemTipsView" === e &&
      (ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem = void 0);
  }),
  (ComposeController.QIi = () => {
    ModelManager_1.ModelManager.ComposeModel.UpdateHelpRoleItemDataList();
  }),
  (ComposeController.eTi = !1);
//# sourceMappingURL=ComposeController.js.map
