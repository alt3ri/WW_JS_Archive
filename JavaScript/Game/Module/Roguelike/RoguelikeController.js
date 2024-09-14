"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeController = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  AsyncTask_1 = require("../../World/Task/AsyncTask"),
  TaskSystem_1 = require("../../World/Task/TaskSystem"),
  BlackScreenController_1 = require("../BlackScreen/BlackScreenController"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonEntranceController_1 = require("../InstanceDungeon/InstanceDungeonEntranceController"),
  ItemHintController_1 = require("../ItemHint/ItemHintController"),
  ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../ItemReward/ItemRewardDefine"),
  LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController"),
  RoleController_1 = require("../RoleUi/RoleController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  WeatherController_1 = require("../Weather/WeatherController"),
  WeatherModel_1 = require("../Weather/WeatherModel"),
  EventResult_1 = require("./Define/EventResult"),
  RogueGainEntry_1 = require("./Define/RogueGainEntry"),
  RoguelikeInfo_1 = require("./Define/RoguelikeInfo");
class RoguelikeController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCloseLoadingView,
      RoguelikeController.OnCloseLoading,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        RoguelikeController.Eao,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        RoguelikeController.RQe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCloseLoadingView,
      RoguelikeController.OnCloseLoading,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        RoguelikeController.Eao,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        RoguelikeController.RQe,
      );
  }
  static async OpenRoguelikeActivityView() {
    const o = new CustomPromise_1.CustomPromise();
    return (
      UiManager_1.UiManager.OpenView("RoguelikeActivityView", void 0, (e) => {
        o.SetResult(e);
      }),
      o.Promise
    );
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "RoguelikeActivityView",
      RoguelikeController.CheckCanOpen,
      "RoguelikeController.CheckCanOpen",
    ),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "RoguelikeInstanceView",
        RoguelikeController.CheckCanOpen,
        "RoguelikeController.CheckCanOpen",
      ),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "RoguelikeMemoryPlaceView",
        RoguelikeController.CheckCanOpen,
        "RoguelikeController.CheckCanOpen",
      ),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "RoguelikeSelectRoleView",
        RoguelikeController.CheckCanOpen,
        "RoguelikeController.CheckCanOpen",
      ),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "RoguelikeTokenOverView",
        RoguelikeController.CheckCanOpen,
        "RoguelikeController.CheckCanOpen",
      ),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "RogueInfoView",
        RoguelikeController.CheckCanOpen,
        "RoguelikeController.CheckCanOpen",
      ),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "RoguelikeSkillView",
        RoguelikeController.CheckCanOpen,
        "RoguelikeController.CheckCanOpen",
      ),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "RoguelikeExitTips",
        RoguelikeController.CheckCanOpenExitTips,
        "RoguelikeController.CheckCanOpenExitTips",
      );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "RoguelikeActivityView",
      RoguelikeController.CheckCanOpen,
    ),
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(
        "RoguelikeInstanceView",
        RoguelikeController.CheckCanOpen,
      ),
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(
        "RoguelikeMemoryPlaceView",
        RoguelikeController.CheckCanOpen,
      ),
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(
        "RoguelikeSelectRoleView",
        RoguelikeController.CheckCanOpen,
      ),
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(
        "RoguelikeTokenOverView",
        RoguelikeController.CheckCanOpen,
      ),
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(
        "RogueInfoView",
        RoguelikeController.CheckCanOpen,
      ),
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(
        "RoguelikeSkillView",
        RoguelikeController.CheckCanOpen,
      );
  }
  static async OpenBuffSelectViewByIdAsync(e) {
    var o,
      r =
        ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
          e,
        );
    r ||
      (((o = new Protocol_1.Aki.Protocol.l_s()).c5n =
        ModelManager_1.ModelManager.RoguelikeModel.CurIndex),
      (o.AHn = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
      r.RoguelikeGainDataType === Protocol_1.Aki.Protocol.a8s.Proto_Shop &&
        (o.c5n = Protocol_1.Aki.Protocol.s8s.Proto_ShopBindId),
      (r = await Net_1.Net.CallAsync(18853, o)),
      ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData([
        r.Q2s,
      ])),
      await RoguelikeController.OpenBuffSelectViewById(e);
  }
  static async OpenBuffSelectViewById(e) {
    var o,
      r =
        ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
          e,
        );
    return r
      ? ((o = RoguelikeController.GetViewNameByGainType(
          r.RoguelikeGainDataType,
        )),
        !!UiManager_1.UiManager.IsViewOpen(o) ||
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Roguelike",
              35,
              "肉鸽选择界面数据:",
              ["BindId:", e],
              ["Data:", r],
            ),
          void 0 !== (await UiManager_1.UiManager.OpenViewAsync(o, r))))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Roguelike", 9, "没有肉鸽界面数据!"),
        !1);
  }
  static GetViewNameByGainType(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.a8s.hxs:
        return ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(
          ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry
            .ConfigId,
        )
          ? "RoguePhantomReplaceView"
          : "RoguePhantomSelectView";
      case Protocol_1.Aki.Protocol.a8s.RUs:
        return "RoleReplaceView";
      case Protocol_1.Aki.Protocol.a8s.Proto_CommonBuff:
        return "CommonSelectView";
      case Protocol_1.Aki.Protocol.a8s.Proto_RoleBuff:
        return "RoleBuffSelectView";
      case Protocol_1.Aki.Protocol.a8s.Proto_Shop:
        return "RogueShopView";
      case Protocol_1.Aki.Protocol.a8s.Proto_Event:
        return "RoguelikeRandomEventView";
      case Protocol_1.Aki.Protocol.a8s.Proto_Miraclecreation:
        return "RoguelikeSelectSpecialView";
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Roguelike", 9, "当前增益类型没有对应的界面数据", [
        "type",
        Protocol_1.Aki.Protocol.a8s[e],
      ]);
  }
  static RoguelikeRefreshGainRequest(e) {
    var o = new Protocol_1.Aki.Protocol.a_s();
    (o.RHn = e),
      (o.AHn = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
      Net_1.Net.Call(23040, o, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              23040,
              e.lvs,
            )
          : (ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData([
              e.Q2s,
            ]),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RoguelikeRefreshGain,
              e.Q2s.c5n,
            ));
      });
  }
  static async RoguelikeLastInfoRequestAsync() {
    var e = new Protocol_1.Aki.Protocol.C_s(),
      e = await Net_1.Net.CallAsync(17883, e);
    e?.oqs && this.RoguelikeResultRequest(e.nqs[0].r6n);
  }
  static EnterCurrentRogueEntrance() {
    this.RoguelikeSeasonDataRequest()
      .then((e) => {
        e =
          ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
            e.UHn,
          );
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterEntrance(
          e.InstanceDungeonEntrance,
        ).finally(void 0);
      })
      .finally(void 0);
  }
  static OpenRoguelikeInstanceView() {
    var e = new Protocol_1.Aki.Protocol.C_s();
    Net_1.Net.Call(17883, e, (o) => {
      if (o?.oqs) {
        const r = o.nqs[0];
        o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(135);
        (o.IsEscViewTriggerCallBack = !1),
          o.SetTextArgs(r.iqs.toString(), r.rqs.toString());
        let e = !1;
        o.SetCloseFunction(() => {
          UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") &&
            !e &&
            UiManager_1.UiManager.CloseView("InstanceDungeonEntranceView");
        }),
          o.FunctionMap.set(1, () => {
            (e = !0),
              this.RoguelikeResultRequest(r.r6n),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
          }),
          o.FunctionMap.set(2, () => {
            ControllerHolder_1.ControllerHolder.RoleController.IsInRoleTrial()
              ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "TrialRoleDungeonsLimit",
                )
              : this.RoguelikeStartRequest(!0, r.r6n, []);
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            o,
          );
      }
    }),
      UiManager_1.UiManager.OpenView("InstanceDungeonEntranceView");
  }
  static OpenRogueInfoView() {
    UiManager_1.UiManager.OpenView("RogueInfoView");
  }
  static OpenRoguelikeSelectRoleView(e) {
    UiManager_1.UiManager.OpenView("RoguelikeSelectRoleView", e);
  }
  static OpenRoguelikeSkillView(e) {
    this.RoguelikeTalentInfoRequest(e).then(() => {
      UiManager_1.UiManager.OpenView("RoguelikeSkillView", e);
    });
  }
  static async RoguelikeTalentInfoRequest(e) {
    var o = Protocol_1.Aki.Protocol.D_s.create(),
      r = ((o.UHn = e), await Net_1.Net.CallAsync(17533, o));
    if (r.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        r.Q4n,
        24694,
      );
    else {
      for (const l of Object.keys(r.Mqs))
        ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(
          Number(l),
          r.Mqs[l],
        );
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoguelikeDataUpdate,
      );
    }
  }
  static OpenMemoryPlaceView() {
    this.RoguelikeSeasonDataRequest().then((e) => {
      UiManager_1.UiManager.OpenView("RoguelikeMemoryPlaceView", e);
    });
  }
  static async RoguelikeSeasonDataRequest(e, o = !1) {
    var r = new Protocol_1.Aki.Protocol.x_s(),
      e = ((r.UHn = e ?? 0), await Net_1.Net.CallAsync(16390, r));
    if (o || e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs)
      return (
        (ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData = e.Iqs),
        (ModelManager_1.ModelManager.RoguelikeModel.TempCountdown = e.Iqs?.dps),
        e.Iqs
      );
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
      e.Q4n,
      17989,
    );
  }
  static async RoguelikeRoleRoomSelectRequest(e) {
    var o = new Protocol_1.Aki.Protocol.Ara(),
      e = ((o.Mra = e), await Net_1.Net.CallAsync(20445, o));
    return (
      e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Q4n,
        18663,
      ),
      !1)
    );
  }
  static async RoguelikeSeasonRewardReceiveRequest(e, o) {
    var r = new Protocol_1.Aki.Protocol.G_s(),
      o = ((r.UHn = o ?? 0), (r.c5n = e), await Net_1.Net.CallAsync(17010, r));
    return (
      o.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        o.Q4n,
        21722,
      ),
      !1)
    );
  }
  static async RoguelikeTalentLevelUpRequest(e) {
    var o = Protocol_1.Aki.Protocol.P_s.create(),
      o = ((o.r5n = e), await Net_1.Net.CallAsync(26427, o));
    o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          o.Q4n,
          15422,
        )
      : (ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(
          e,
          o.F6n,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RoguelikeTalentLevelUp,
          e,
        ));
  }
  static async RoguelikeStartRequest(e, o, r) {
    var l = Protocol_1.Aki.Protocol.f_s.create(),
      e =
        ((l.xHn = e),
        (l.r6n = o),
        (l.C5n = r),
        (l.UHn = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.UHn),
        (ModelManager_1.ModelManager.RoguelikeModel.CurDungeonId = o),
        BlackScreenController_1.BlackScreenController.AddBlackScreen(
          "None",
          "LeaveScene",
        ),
        await Net_1.Net.CallAsync(25485, l));
    return (
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
        "None",
        "LeaveScene",
      ),
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            28390,
          ),
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RevertEntranceFlowStep(),
          !1)
        : ((ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList =
            r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.EnterInstanceDungeon,
          ),
          !0)
    );
  }
  static RoguelikeQuitRequest() {
    if (!this.Sao) {
      const o =
        ModelManager_1.ModelManager.RoguelikeModel?.CheckIsGuideDungeon();
      var e = Protocol_1.Aki.Protocol.p_s.create();
      Net_1.Net.Call(26914, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            26102,
          ),
          (this.Sao = !o),
          ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceDungeonInfo();
      });
    }
  }
  static RoguelikeResultRequest(e) {
    var o;
    this.Sao ||
      (((o = Protocol_1.Aki.Protocol.E_s.create()).r6n = e),
      Net_1.Net.Call(21930, o, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              29652,
            )
          : ((this.Sao =
              ModelManager_1.ModelManager.RoguelikeModel?.CheckInRoguelike()),
            UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.dqs));
      }));
  }
  static RogueChooseDataResultRequest(l) {
    const t = ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry;
    let n = void 0;
    if (1 === l)
      n = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry;
    else if (3 === l)
      n = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.RoleEntry;
    else if (6 === l) {
      n = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry;
      var e = t.ShopItemCoinId;
      if (
        ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(e) <
        (0 === t.CurrentPrice ? t.OriginalPrice : t.CurrentPrice)
      )
        return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "RoguelikeShopNotEnoughCurrency",
        );
    } else
      n = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry;
    const a = new Protocol_1.Aki.Protocol.c_s();
    (a.c5n = t?.Index ?? 0),
      (a.RHn = t?.BindId ?? 0),
      (a.AHn = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
      7 === l && (a.RHn = Protocol_1.Aki.Protocol.s8s.Proto_EventBindId),
      Net_1.Net.Call(16693, a, (o) => {
        if (o.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_RogueGainIsSelect)
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            o.Q4n,
            16693,
            o.lvs,
            !1,
          );
        else if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            o.Q4n,
            16693,
            o.lvs,
          );
        else {
          var r =
            ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
              a.RHn,
            );
          r.IsSelect = o?.k2s;
          let e = void 0;
          1 === l
            ? (e =
                ModelManager_1.ModelManager.RoguelikeModel.RogueInfo
                  .PhantomEntry)
            : 3 === l
              ? (e =
                  ModelManager_1.ModelManager.RoguelikeModel.RogueInfo
                    .RoleEntry)
              : 6 === l
                ? ((t.IsSell = !0), (e = t))
                : 7 === l
                  ? o.u_s.eqs.length <= 0
                    ? (r.RogueGainEntryList = [])
                    : o.u_s.eqs.forEach((e) => {
                        ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData(
                          [e],
                        );
                      })
                  : 8 === l && (e = t),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RoguelikeChooseDataResult,
              e,
              n,
              !0,
              a.RHn,
              o,
            );
        }
      });
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(25218, RoguelikeController.yao),
      Net_1.Net.Register(19374, RoguelikeController.Iao),
      Net_1.Net.Register(25793, RoguelikeController.RoguelikeChooseDataNotify),
      Net_1.Net.Register(22698, RoguelikeController.Tao),
      Net_1.Net.Register(29302, RoguelikeController.Lao),
      Net_1.Net.Register(
        18549,
        RoguelikeController.RoguelikeTalentUnlockNotify,
      ),
      Net_1.Net.Register(29314, RoguelikeController.RoguelikeCurrencyNotify),
      Net_1.Net.Register(
        25186,
        RoguelikeController.RoguelikeCurrencyUpdateNotify,
      ),
      Net_1.Net.Register(19348, RoguelikeController.nSa),
      Net_1.Net.Register(
        23086,
        RoguelikeController.RoguelikeGainDataUpdateNotify,
      ),
      Net_1.Net.Register(27518, RoguelikeController.Sra);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25218),
      Net_1.Net.UnRegister(19374),
      Net_1.Net.UnRegister(25793),
      Net_1.Net.UnRegister(22698),
      Net_1.Net.UnRegister(29302),
      Net_1.Net.UnRegister(18549),
      Net_1.Net.UnRegister(29314),
      Net_1.Net.UnRegister(25186),
      Net_1.Net.UnRegister(19348),
      Net_1.Net.UnRegister(27518);
  }
  static async Dao() {
    var e = Protocol_1.Aki.Protocol.T_s.create(),
      e = await Net_1.Net.CallAsync(29758, e);
    e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
      ? ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() &&
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
          15,
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Roguelike", 9, "肉鸽副本进入下个房间失败");
  }
  static async RoguelikeGiveUpGainRequest(e) {
    var o = Protocol_1.Aki.Protocol.k_s.create(),
      e =
        ((o.RHn = e),
        (o.AHn = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
        await Net_1.Net.CallAsync(15751, o));
    e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          15751,
        )
      : EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RoguelikeCloseGainSelectView,
        );
  }
  static async RoguelikeTokenReceiveRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.B_s.create(),
      e = ((r.UHn = e), (r.s5n = o), await Net_1.Net.CallAsync(18055, r));
    return (
      e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Q4n,
        18055,
      ),
      !1)
    );
  }
  static async RoguelikePopularEntriesInfoRequest(e) {
    var o = Protocol_1.Aki.Protocol.Ogs.create(),
      e =
        ((o.r6n = e),
        (o.UHn = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.UHn),
        await Net_1.Net.CallAsync(26279, o));
    return (
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          26279,
        ),
      e
    );
  }
  static async RoguelikeTrialRoleInfoRequest(e) {
    var o = new Protocol_1.Aki.Protocol.Rfs(),
      e =
        ((o.UHn =
          ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.UHn),
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)),
      e =
        ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
          e.FightFormationId,
        ),
      e = ((o.PHn = e.TrialRole), await Net_1.Net.CallAsync(24608, o));
    return (
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          24608,
        ),
      await RoleController_1.RoleController.RobotRolePropRequest(e.Rqs),
      e
    );
  }
  static async RoguelikePopularEntriesChangeRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.Ngs.create(),
      e =
        ((r.r6n = e),
        (r.BHn = o),
        (r.UHn = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.UHn),
        await Net_1.Net.CallAsync(27791, r));
    e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Q4n,
        27791,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoguelikePopularEntriesChange,
        o,
      );
  }
}
(exports.RoguelikeController = RoguelikeController),
  ((_a = RoguelikeController).Sao = !1),
  (RoguelikeController.CurrentFlowListName = ""),
  (RoguelikeController.CurrentFlowId = 0),
  (RoguelikeController.CurrentStateId = 0),
  (RoguelikeController.RandomEventIndex = 0),
  (RoguelikeController.OnCloseLoading = () => {
    var e, o;
    ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList &&
    0 < ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList.length
      ? ((_a.Sao = !1),
        (e = ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList),
        (ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList = void 0),
        (o = []).push({
          ButtonTextId: "ConfirmBox_45_ButtonText_1",
          DescriptionTextId: void 0,
          DescriptionArgs: void 0,
          IsTimeDownCloseView: !1,
          IsClickedCloseView: !1,
          OnClickedCallback: (e) => {
            UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
              UiManager_1.UiManager.CloseView("ExploreRewardView", (e) => {
                e &&
                  _a.OpenRoguelikeActivityView().finally(() => {
                    var e,
                      o,
                      r =
                        ModelManager_1.ModelManager.RoguelikeModel?.GetParamConfigBySeasonId();
                    void 0 !== r &&
                      void 0 !== r.DungeonList &&
                      void 0 !== ModelManager_1.ModelManager.RoguelikeModel &&
                      void 0 !==
                        ModelManager_1.ModelManager.RoguelikeModel
                          .CurDungeonId &&
                      ((e =
                        (o = r.DungeonList.indexOf(
                          ModelManager_1.ModelManager.RoguelikeModel
                            .CurDungeonId,
                        )) + 1),
                      -1 !== o &&
                        e < r.DungeonList.length &&
                        (o =
                          ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(
                            r.DungeonList[e],
                          )) &&
                        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
                          o.Id,
                        ) &&
                        ((r =
                          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                            o.MapName,
                          )),
                        UiManager_1.UiManager.OpenView(
                          "RoguelikeUnlockTips",
                          r,
                        )),
                      (ModelManager_1.ModelManager.RoguelikeModel.CurDungeonId =
                        void 0));
                  });
              });
          },
        }),
        ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
          ItemRewardDefine_1.ROGUE_INST_FIRST_REWARD_CONFIG,
          !0,
          e,
          void 0,
          void 0,
          o,
        ),
        ModelManager_1.ModelManager.RoguelikeModel?.RecordRoguelikeShopRedDot(
          !1,
        ))
      : _a.Sao && ((_a.Sao = !1), _a.OpenRoguelikeActivityView()),
      (_a.CurrentFlowId = 0),
      (_a.CurrentFlowListName = ""),
      (_a.CurrentStateId = 0);
  }),
  (RoguelikeController.RQe = (e, o) => {
    (110056 !== e && !o) || _a.Eao();
  }),
  (RoguelikeController.Eao = () => {
    _a.RoguelikeSeasonDataRequest(void 0, !0).then((e) => {
      ModelManager_1.ModelManager.RoguelikeModel.TempCountdown = e?.dps;
    });
  }),
  (RoguelikeController.CheckCanOpen = () => {
    return ModelManager_1.ModelManager.RoguelikeModel?.CheckRogueIsOpen()
      ? ModelManager_1.ModelManager.GameModeModel?.IsMulti
        ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "Rogue_Multi_Tip",
          ),
          !1)
        : !_a.Sao ||
          (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "Rogue_Function_Instance_End_Tip",
          ),
          !1)
      : (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "Rogue_Function_Not_Open_Tip",
        ),
        !1);
  }),
  (RoguelikeController.CheckCanOpenExitTips = () =>
    !_a.Sao ||
    (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
      "Rogue_Function_Instance_End_Tip",
    ),
    !1)),
  (RoguelikeController.RoguelikeCurrencyNotify = (e) => {
    ModelManager_1.ModelManager.RoguelikeModel.RoguelikeCurrencyDictMap.clear();
    for (const o of Object.keys(e.V2s))
      ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeCurrency(
        Number(o),
        e.V2s[o],
      );
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RoguelikeCurrencyUpdate,
    ),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PayShopGoodsBuy);
  }),
  (RoguelikeController.RoguelikeCurrencyUpdateNotify = (e) => {
    var o =
      ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId();
    for (const t of Object.keys(e.$2s)) {
      var r = Number(t),
        l = e.$2s[t];
      ModelManager_1.ModelManager.RoguelikeModel.UpdateRoguelikeCurrency(r, l),
        r !== o.InsideCurrency ||
          l <= 0 ||
          ItemHintController_1.ItemHintController.AddRoguelikeItemList(
            o.InsideCurrency,
            l,
          );
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RoguelikeCurrencyUpdate,
    );
  }),
  (RoguelikeController.nSa = (e) => {
    _a.RoguelikeEventGainNotify(e);
  }),
  (RoguelikeController.RoguelikeEventGainNotify = (e, o) => {
    var r = new Array();
    if (0 < e.z2s.length) {
      for (const l of e.z2s) r.push(new RogueGainEntry_1.RogueGainEntry(l));
      UiManager_1.UiManager.OpenView(
        "RogueEventResultViewOneByOne",
        new EventResult_1.EventResult(r, o),
      );
    } else if (0 < e.Xna.length) {
      for (const t of e.Xna) r.push(new RogueGainEntry_1.RogueGainEntry(t));
      UiManager_1.UiManager.OpenView(
        "RogueEventResultViewAll",
        new EventResult_1.EventResult(r, o),
      );
    } else o?.();
  }),
  (RoguelikeController.RoguelikeGainDataUpdateNotify = (e) => {
    e.Lqs?.h5n === Protocol_1.Aki.Protocol.a8s.Proto_Miraclecreation &&
      (e.Tqs === Protocol_1.Aki.Protocol.Tqs.Proto_GainDataUpdate
        ? (ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.SpecialEntryList[
            e.c5n
          ] = new RogueGainEntry_1.RogueGainEntry(e.Lqs))
        : e.Tqs === Protocol_1.Aki.Protocol.Tqs.Proto_GainDataDelete &&
          ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.SpecialEntryList.splice(
            e.c5n,
            1,
          ));
  }),
  (RoguelikeController.RoguelikeChooseDataNotify = (e) => {
    ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData(e.eqs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoguelikeChooseDataNotify,
      );
  }),
  (RoguelikeController.RoguelikeTalentUnlockNotify = (e) => {
    ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(e.r5n, 0);
  }),
  (RoguelikeController.Sra = (e) => {
    UiManager_1.UiManager.OpenView("RogueCharacterRoomSelectView", e.Pra);
  }),
  (RoguelikeController.Lao = (e) => {
    (_a.Sao =
      !ModelManager_1.ModelManager.RoguelikeModel?.CheckIsGuideDungeon()),
      e.dqs._qs
        ? TimerSystem_1.TimerSystem.Delay(() => {
            UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.dqs);
          }, 2e3)
        : UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.dqs);
  }),
  (RoguelikeController.Tao = (e) => {
    (ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount = e.iqs),
      (ModelManager_1.ModelManager.RoguelikeModel.TotalRoomCount = e.rqs);
    var o =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikeRoomPoolConfig(
          e.Qrh,
        ),
      r =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikeRoomTypeConfigById(
          e.vqs,
        );
    (ModelManager_1.ModelManager.RoguelikeModel.CurRoomType = r?.RoomTipsType),
      StringUtils_1.StringUtils.IsEmpty(o?.RoomsMusicState)
        ? (ModelManager_1.ModelManager.RoguelikeModel.CurRoomMusicState =
            r?.RoomsMusicState)
        : (ModelManager_1.ModelManager.RoguelikeModel.CurRoomMusicState =
            o?.RoomsMusicState),
      0 !== e.pqs
        ? WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(
            e.pqs,
            0,
          )
        : WeatherController_1.WeatherController.StopWeather();
  }),
  (RoguelikeController.Iao = (e) => {
    ModelManager_1.ModelManager.RoguelikeModel.RogueInfo =
      new RoguelikeInfo_1.RoguelikeInfo(e);
  }),
  (RoguelikeController.yao = (n) => {
    var e = new AsyncTask_1.AsyncTask(
      "RoguelikeSubLevelChangeTask",
      async () => {
        if (
          ((ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = 1),
          n.Cqs === n.mqs)
        )
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
            16,
            3,
          );
        else {
          const r = new Array(),
            l = new Array();
          l.push(n.mqs), r.push(n.Cqs);
          var e = Vector_1.Vector.Create(n.iPs, n.rPs, n.gqs),
            o = new UE.Rotator(0, n.fqs, 0);
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
            16,
            3,
          );
          const t = new CustomPromise_1.CustomPromise();
          ControllerHolder_1.ControllerHolder.GameModeController.ChangeSubLevel(
            r,
            l,
            0,
            e,
            o,
            (e) => {
              e
                ? t.SetResult(!0)
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Roguelike",
                    9,
                    "肉鸽副本子关卡加载失败",
                    ["unloads", r],
                    ["newLoads", l],
                  );
            },
          ),
            await t.Promise;
        }
        return (
          await RoguelikeController.Dao(),
          await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
            16,
            1,
          ),
          !0
        );
      },
    );
    TaskSystem_1.TaskSystem.AddTask(e), TaskSystem_1.TaskSystem.Run();
  }),
  (RoguelikeController.CreateCloseViewCallBack = (t, n) => {
    var e = t.$na?.Wna;
    if (!(void 0 === e || e.length <= 0)) {
      const a = new Array();
      for (const o of e)
        if ((o.Qna && a.push(o.Qna), o.Kna.length <= 0))
          for (const r of o.Kna) a.push(r);
      if (!(a.length <= 0)) {
        let r = 0,
          l;
        return (l = (e) => {
          if (
            (!1 === e &&
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Roguelike",
                9,
                "CreateCloseViewCallBack err",
                ["index", r],
                ["notify", t],
              ),
            r >= a.length)
          )
            n?.();
          else {
            var o = a[r++];
            switch (o.R5n) {
              case "m_s":
                RoguelikeController.RoguelikeEventGainNotify(o.m_s, l);
                break;
              case "Pns":
                ItemRewardController_1.ItemRewardController.OnItemObtainNotify(
                  o.Pns,
                  l,
                );
            }
          }
        });
      }
    }
    n?.();
  });
//# sourceMappingURL=RoguelikeController.js.map
