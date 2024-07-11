"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiTimeDilation_1 = require("../../Ui/Base/UiTimeDilation"),
  UiManager_1 = require("../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
  RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData"),
  CookDefine_1 = require("./CookDefine");
class CookController extends UiControllerBase_1.UiControllerBase {
  static get CookCoinId() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig("CookCost") ?? -1
    );
  }
  static OnClear() {
    return this.ClearCookDisplay(), !0;
  }
  static OnLeaveLevel() {
    return this.ClearCookDisplay(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ActiveRole,
      CookController.qqt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemUse,
        CookController.Gqt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        CookController.Nqt,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ActiveRole,
      CookController.qqt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemUse,
        CookController.Gqt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        CookController.Nqt,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(12235, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Cook", 50, "10264_服务端主动推送厨师数据"),
        ModelManager_1.ModelManager.CookModel.UpdateCookerInfo(e.vPs),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.UpdateCookerInfo,
        );
    }),
      Net_1.Net.Register(29821, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Cook", 50, "10265_服务端主动推送配方更新"),
          ModelManager_1.ModelManager.CookModel.UpdateCookingDataList(e.pPs),
          ModelManager_1.ModelManager.CookModel.UpdateMachiningDataList(
            e.MPs,
            !0,
          );
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(12235), Net_1.Net.UnRegister(29821);
  }
  static CheckCanShowExpItem() {
    return 0 !== ModelManager_1.ModelManager.CookModel.GetCookerInfo().AddExp;
  }
  static Oqt(e) {
    ModelManager_1.ModelManager.CookModel.CreateCookerInfo(e.vPs),
      ModelManager_1.ModelManager.CookModel.CreateCookingDataList(e.pPs),
      ModelManager_1.ModelManager.CookModel.UpdateCookingDataByServerConfig(
        e.SPs,
      ),
      ModelManager_1.ModelManager.CookModel.UpdateMachiningDataList(e.MPs, !1),
      ModelManager_1.ModelManager.CookModel.SaveLimitRefreshTime(e.EPs);
  }
  static async SendCookingDataRequestAsync() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Cook",
        50,
        "10260_客户端请求烹饪系统相关数据(异步刷新用)",
      );
    var e = new Protocol_1.Aki.Protocol.pZn(),
      e = await Net_1.Net.CallAsync(24863, e);
    return e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Cook",
            50,
            "10260_返回请求烹饪系统相关数据(异步刷新用)",
          ),
        CookController.Oqt(e),
        !0)
      : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.hvs,
          22625,
          void 0,
          !0,
          !1,
        ),
        UiManager_1.UiManager.IsViewShow("CookRootView") &&
          UiManager_1.UiManager.CloseView("CookRootView"),
        !1);
  }
  static SendCookFormulaRequest(t) {
    var e = new Protocol_1.Aki.Protocol.lZn();
    (e.fVn = t),
      Net_1.Net.Call(1155, Protocol_1.Aki.Protocol.lZn.create(e), (e) => {
        var o;
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Cook", 50, "10252_食物配方解锁请求返回"),
          e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
            ? (ModelManager_1.ModelManager.CookModel.UnlockCookMenuData(e.fVn),
              (o =
                ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(t)),
              (o = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
                o.Name,
              )),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "CookStudy",
                o,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.UpdateFormula,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.hvs,
                5961,
              );
      });
  }
  static SendCookFoodRequest(e, o, t) {
    var r = new Protocol_1.Aki.Protocol.uZn();
    (r.J4n = e),
      (r.O6n = o),
      (r.pVn = t),
      (r.vVn =
        ModelManager_1.ModelManager.CookModel.CurrentInteractCreatureDataLongId),
      Net_1.Net.Call(17750, Protocol_1.Aki.Protocol.uZn.create(r), (e) => {
        var o;
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Cook", 50, "10254_食物烹饪请求返回"),
          e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
            ? ((o = ModelManager_1.ModelManager.CookModel.GetCookingDataById(
                e.J4n,
              )) && (o.LastRoleId = e.O6n),
              (o = e.dPs),
              0 !== e.CPs.length && o.push(...e.CPs),
              ModelManager_1.ModelManager.CookModel.UpdateCookItemList(o),
              CookController.kqt(e),
              CookController.PlayCookSuccessDisplay(() => {
                ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
                  2001,
                  !0,
                );
              }),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.CookSuccess,
              ))
            : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.hvs,
                20327,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.CookFail,
              ));
      });
  }
  static kqt(e) {
    var o = ModelManager_1.ModelManager.CookModel,
      t = o.GetCookerInfo(),
      r = t.CookingLevel,
      n = o.GetCookerMaxLevel(),
      a = o.GetCookLevelByLevel(n),
      t = t.TotalProficiencys,
      a = a.Completeness,
      i = o.LastExp;
    let _ = void 0;
    i !== t &&
      (i < a || (r < n && t < a)) &&
      ((a = {
        FromProgress: i,
        ToProgress: t,
        MaxProgress: o.GetCookLevelByLevel(Math.min(n, r + 1)).Completeness,
      }),
      (_ = [a])),
      (o.LastExp = t);
    var l = [];
    for (const g of e.dPs) {
      var C = new RewardItemData_1.RewardItemData(g.f8n, g.MVn);
      l.push(C);
    }
    for (const M of e.CPs) {
      var s = new RewardItemData_1.RewardItemData(M.f8n, M.MVn);
      l.push(s);
    }
    ItemRewardController_1.ItemRewardController.SetItemList(l),
      ItemRewardController_1.ItemRewardController.SetProgressQueue(_);
  }
  static Fqt(e) {
    var o = new Array();
    for (const t of e) t.G6n && o.push(t);
    return o;
  }
  static SendFoodProcessRequest(e, o, t) {
    var r = new Protocol_1.Aki.Protocol.dZn();
    (r.J4n = e),
      (r.SVn = CookController.Fqt(o)),
      (r.pVn = t),
      Net_1.Net.Call(8196, Protocol_1.Aki.Protocol.dZn.create(r), (e) => {
        var o, t;
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Cook", 50, "10256_食物加工返回"),
          e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
            ? ((o = ModelManager_1.ModelManager.CookModel.GetMachiningDataById(
                e.J4n,
              )),
              (t = e._Ps),
              o &&
                ((o.IsUnLock = t), 0 !== e.fPs.length) &&
                (o.UnlockList = e.fPs),
              ModelManager_1.ModelManager.CookModel.UpdateCookItemList(e.gPs),
              t
                ? CookController.PlayCookSuccessDisplay(() => {
                    ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
                      2002,
                    );
                  })
                : CookController.PlayCookFailDisplay(() => {
                    ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
                      2005,
                      !1,
                    );
                  }),
              e._Ps
                ? EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.MachiningSuccess,
                  )
                : EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.MachiningStudyFail,
                  ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.hvs,
                3064,
              );
      });
  }
  static SendCertificateLevelRewardRequest() {
    var e = new Protocol_1.Aki.Protocol.CZn();
    Net_1.Net.Call(29520, Protocol_1.Aki.Protocol.CZn.create(e), (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Cook", 50, "10258_领取厨师等级奖励返回"),
        e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.UpgradeCookerLevel,
            )
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.hvs,
              3969,
            );
    });
  }
  static SendFixToolRequest(o, e) {
    var t = new Protocol_1.Aki.Protocol.aZn();
    (t.EVn = o),
      (t.P4n = e),
      Net_1.Net.Call(5979, Protocol_1.Aki.Protocol.aZn.create(t), (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Cook", 50, "10250_请求修复厨具返回"),
          e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Cook", 50, "请求修复厨具成功", ["修复Id", o]),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.FixSuccess,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.hvs,
                8873,
              );
      });
  }
  static SendInteractiveUpdateRequest(e) {
    var o = new Protocol_1.Aki.Protocol.SZn();
    (o.yVn = e),
      Net_1.Net.Call(27687, Protocol_1.Aki.Protocol.SZn.create(o), (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Cook", 50, "10262_交互跟新请求"),
          e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
            ? Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Cook", 50, "请求交互更新成功", ["交互Id", e.yVn])
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.hvs,
                12792,
              );
      });
  }
  static SetCurrentFixId(e) {
    ModelManager_1.ModelManager.CookModel.CurrentFixId = e;
  }
  static GetCurrentFixId() {
    return ModelManager_1.ModelManager.CookModel.CurrentFixId;
  }
  static SetCurrentEntityId(e) {
    ModelManager_1.ModelManager.CookModel.CurrentEntityId = e;
  }
  static GetCurrentEntityId() {
    return ModelManager_1.ModelManager.CookModel.CurrentEntityId;
  }
  static CheckCanCook(e) {
    return ModelManager_1.ModelManager.CookModel.CheckCanCook(e);
  }
  static CheckCanProcessed(e) {
    for (const t of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
      e,
    ).ConsumeItemsId) {
      var o = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        t.ItemId,
      );
      if (t.Count > o) return !1;
    }
    return !0;
  }
  static CheckCanAdd(e, o, t) {
    switch (t) {
      case 0:
        var r = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(o);
        if (r) return CookController.Vqt(e, r.ConsumeItems);
        break;
      case 1:
        r = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(o);
        if (r) return CookController.Vqt(e, r.ConsumeItemsId);
    }
    return !1;
  }
  static Vqt(e, o) {
    for (const r of o) {
      var t = e * r.Count;
      if (
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          r.ItemId,
        ) < t
      )
        return !1;
    }
    return !0;
  }
  static GetMaxCreateCount(e, o) {
    switch (o) {
      case 0:
        var t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(e);
        if (t) return CookController.Hqt(t.ConsumeItems);
        break;
      case 1:
        t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(e);
        if (t) return CookController.Hqt(t.ConsumeItemsId);
    }
    return 0;
  }
  static Hqt(e) {
    let o =
      CommonParamById_1.configCommonParamById.GetIntConfig("max_cooking_count");
    for (const n of e) {
      var t = n.Count,
        r = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          n.ItemId,
        );
      if (r < t) return 0;
      r = MathUtils_1.MathUtils.GetFloatPointFloor(r / t, 0);
      o = o < r ? o : r;
    }
    return o;
  }
  static CheckIsBuff(e, o) {
    return ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
      o,
    ).RoleList.includes(e);
  }
  static CheckIsBuffEx(e, o) {
    var t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(o);
    if (!t.RoleList.includes(e))
      for (const r of ModelManager_1.ModelManager.RoleModel.GetRoleIdList())
        if (t.RoleList.includes(r)) return !0;
    return !1;
  }
  static GetCookInfoText(e) {
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
  static CheckCanFix() {
    for (const o of ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
      CookController.GetCurrentFixId(),
    ).Items) {
      var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        o[0],
      );
      if (o[1] > e) return !1;
    }
    return !0;
  }
  static GetCookItemSelectedList(e) {
    let o =
      ModelManager_1.ModelManager.InventoryModel.GetCommonItemByShowType(26);
    const r = ModelManager_1.ModelManager.CookModel.GetMachiningDataById(e);
    return (o = o.filter((e, o, t) => !r.UnlockList.includes(e.GetConfigId())));
  }
  static CheckTmpListHasLock() {
    for (const o of ModelManager_1.ModelManager.CookModel.GetTmpMachiningItemList()) {
      if (!o.G6n) return !0;
      var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        o.f8n,
      );
      if (o.MVn > e) return !0;
    }
    return !1;
  }
  static CheckIsUnlock(e, o) {
    return ModelManager_1.ModelManager.CookModel.GetMachiningDataById(
      e,
    ).UnlockList.includes(o);
  }
  static CheckCanGetCookerLevel() {
    var e = ModelManager_1.ModelManager.CookModel.GetCookerInfo();
    if (
      e.CookingLevel !==
      ModelManager_1.ModelManager.CookModel.GetCookerMaxLevel()
    ) {
      var o = ModelManager_1.ModelManager.CookModel.GetSumExpByLevel(
        e.CookingLevel,
      );
      if (e.TotalProficiencys >= o) return !0;
    }
    return !1;
  }
  static async ShowFixCookView() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(107),
      o =
        ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
          "UnlockTitle",
        ),
      o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o),
      o =
        (e.SetTitle(o),
        ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
          CookController.GetCurrentFixId(),
        )),
      t = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(o.Description);
    let r = 0,
      n = "";
    for (const C of o.Items) {
      r = C[1];
      var a = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(C[0]);
      n = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(a.Name);
    }
    e.SetTextArgs(r.toString(), n, t);
    var o = CookController.CheckCanFix(),
      i = (e.InteractionMap.set(2, o), new Map());
    for (const s of ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
      CookController.GetCurrentFixId(),
    ).Items) {
      var _ = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        s[0],
      );
      i.set(s[0], _);
    }
    (e.ItemIdMap = i),
      e.FunctionMap.set(2, () => {
        CookController.SendFixToolRequest(
          CookController.GetCurrentFixId(),
          CookController.GetCurrentEntityId(),
        );
      });
    const l = new CustomPromise_1.CustomPromise();
    return (
      (e.FinishOpenFunction = (e) => {
        l.SetResult(e);
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      ),
      l.Promise
    );
  }
  static PlayCookSuccessDisplay(e) {
    this.ClearCookDisplay();
    var o,
      t = this.jqt();
    t
      ? ((o = UiManager_1.UiManager.GetViewByName("CookRootView")) &&
          UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
            ViewId: o.GetViewId(),
            TimeDilation: 1,
            DebugName: "CookRootView",
            Reason: "Cook",
          }),
        (this.IsPlayingSuccessDisplay = !0),
        (this.Wqt = e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnBeginPlayCookSuccessDisplay,
        ),
        t.AddTag(2014138653),
        (this.Kqt = TimerSystem_1.TimerSystem.Delay(() => {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPlayCookSuccessDisplayFinished,
          );
          var e = UiManager_1.UiManager.GetViewByName("CookRootView");
          e &&
            UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
              ViewId: e.GetViewId(),
              TimeDilation: e.Info.TimeDilation,
              DebugName: "CookRootView",
              Reason: "Cook",
            }),
            (this.IsPlayingSuccessDisplay = !1),
            this.Wqt && this.Wqt();
        }, CookDefine_1.COOK_SEQUENCE_TIME_LENGTH)))
      : e && e();
  }
  static SkipCookSuccessDisplay() {
    this.IsPlayingSuccessDisplay &&
      (this.Wqt && this.Wqt(), (this.Wqt = void 0));
  }
  static PlayCookFailDisplay(e) {
    this.ClearCookDisplay();
    var o,
      t = this.jqt();
    t &&
      ((o = UiManager_1.UiManager.GetViewByName("CookRootView")) &&
        UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
          ViewId: o.GetViewId(),
          TimeDilation: 1,
          DebugName: "CookRootView",
          Reason: "Cook",
        }),
      (this.IsPlayingFailDisplay = !0),
      (this.Qqt = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnBeginPlayCookFailDisplay,
      ),
      t.AddTag(-269686894),
      (this.Kqt = TimerSystem_1.TimerSystem.Delay(() => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPlayCookFailDisplayFinished,
        );
        var e = UiManager_1.UiManager.GetViewByName("CookRootView");
        e &&
          UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
            ViewId: e.GetViewId(),
            TimeDilation: e.Info.TimeDilation,
            DebugName: "CookRootView",
            Reason: "Cook",
          }),
          (this.IsPlayingFailDisplay = !1),
          this.Qqt && this.Qqt();
      }, CookDefine_1.COOK_SEQUENCE_TIME_LENGTH)));
  }
  static SkipCookFailDisplay() {
    this.IsPlayingFailDisplay && (this.Qqt && this.Qqt(), (this.Qqt = void 0));
  }
  static ClearCookDisplay() {
    var e = this.jqt();
    e && (e.RemoveTag(2014138653), e.RemoveTag(-269686894)),
      this.Kqt &&
        TimerSystem_1.TimerSystem.Has(this.Kqt) &&
        (TimerSystem_1.TimerSystem.Remove(this.Kqt), (this.Kqt = void 0)),
      (this.IsPlayingSuccessDisplay = !1),
      (this.IsPlayingFailDisplay = !1),
      (this.Wqt = void 0),
      (this.Qqt = void 0);
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
((exports.CookController = CookController).Kqt = void 0),
  (CookController.IsPlayingSuccessDisplay = !1),
  (CookController.IsPlayingFailDisplay = !1),
  (CookController.Wqt = void 0),
  (CookController.Qqt = void 0),
  (CookController.qqt = () => {
    ModelManager_1.ModelManager.CookModel.UpdateCookRoleItemDataList();
  }),
  (CookController.Gqt = (e, o) => {
    ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e).ShowTypes.includes(
      24,
    ) &&
      ((e =
        ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaByFormulaItemId(
          e,
        )),
      (e = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(e.Name)),
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "CookStudy",
        e,
      ),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFormula));
  }),
  (CookController.Nqt = () => {
    ModelManager_1.ModelManager.CookModel.CreateMachiningDataList();
  });
//# sourceMappingURL=CookController.js.map
