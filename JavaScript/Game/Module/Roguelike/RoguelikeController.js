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
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  AsyncTask_1 = require("../../World/Task/AsyncTask"),
  TaskSystem_1 = require("../../World/Task/TaskSystem"),
  ActivityRogueController_1 = require("../Activity/ActivityContent/RougeActivity/ActivityRogueController"),
  BlackScreenController_1 = require("../BlackScreen/BlackScreenController"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonEntranceController_1 = require("../InstanceDungeon/InstanceDungeonEntranceController"),
  ItemHintController_1 = require("../ItemHint/ItemHintController"),
  ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../ItemReward/ItemRewardDefine"),
  LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController"),
  RoleController_1 = require("../RoleUi/RoleController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent"),
  UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
  WeatherModel_1 = require("../Weather/WeatherModel"),
  EventResult_1 = require("./Define/EventResult"),
  RogueGainEntry_1 = require("./Define/RogueGainEntry"),
  RoguelikeInfo_1 = require("./Define/RoguelikeInfo"),
  WeatherController_1 = require("../Weather/WeatherController");
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
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        RoguelikeController.OnPlotEnd,
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
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        RoguelikeController.OnPlotEnd,
      );
  }
  static StartFlowForView(e, o, r, l, t) {
    return (
      (this.RandomEventIndex = e),
      (this.CurrentFlowListName = o),
      (this.CurrentFlowId = r),
      (this.CurrentStateId = l),
      ControllerHolder_1.ControllerHolder.FlowController.StartFlowForView(
        o,
        r,
        l,
        t,
      )
    );
  }
  static async OpenRoguelikeActivityView() {
    var e =
      ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData();
    if (!e) return !1;
    if (2 === e.GetRogueActivityState())
      return (
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "Rogue_Function_Not_Open_Tip",
        ),
        !1
      );
    e = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData;
    if (!e) return !1;
    await Promise.all([
      this.RoguelikeTalentInfoRequest(e.MHn),
      this.RoguelikeSeasonDataRequest(),
    ]);
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
      (((o = new Protocol_1.Aki.Protocol.i_s()).r5n =
        ModelManager_1.ModelManager.RoguelikeModel.CurIndex),
      (o.vHn = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
      r.RoguelikeGainDataType === Protocol_1.Aki.Protocol.e8s.Proto_Shop &&
        (o.r5n = Protocol_1.Aki.Protocol.Z6s.Proto_ShopBindId),
      (r = await Net_1.Net.CallAsync(19524, o)),
      ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData([
        r.F2s,
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
      case Protocol_1.Aki.Protocol.e8s.txs:
        return ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(
          ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry
            .ConfigId,
        )
          ? "RoguePhantomReplaceView"
          : "RoguePhantomSelectView";
      case Protocol_1.Aki.Protocol.e8s.MUs:
        return "RoleReplaceView";
      case Protocol_1.Aki.Protocol.e8s.Proto_CommonBuff:
        return "CommonSelectView";
      case Protocol_1.Aki.Protocol.e8s.Proto_RoleBuff:
        return "RoleBuffSelectView";
      case Protocol_1.Aki.Protocol.e8s.Proto_Shop:
        return "RogueShopView";
      case Protocol_1.Aki.Protocol.e8s.Proto_Event:
        return "RoguelikeRandomEventView";
      case Protocol_1.Aki.Protocol.e8s.Proto_Miraclecreation:
        return "RoguelikeSelectSpecialView";
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Roguelike", 9, "当前增益类型没有对应的界面数据", [
        "type",
        Protocol_1.Aki.Protocol.e8s[e],
      ]);
  }
  static RoguelikeRefreshGainRequest(e) {
    var o = new Protocol_1.Aki.Protocol.e_s();
    (o.SHn = e),
      (o.vHn = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
      Net_1.Net.Call(25471, o, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              25471,
              e.ivs,
            )
          : (ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData([
              e.F2s,
            ]),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RoguelikeRefreshGain,
              e.F2s.r5n,
            ));
      });
  }
  static async RoguelikeLastInfoRequestAsync() {
    var e = new Protocol_1.Aki.Protocol.h_s(),
      e = await Net_1.Net.CallAsync(29498, e);
    e?.J2s && this.RoguelikeResultRequest(e.z2s[0].X5n);
  }
  static EnterCurrentRogueEntrance() {
    this.RoguelikeSeasonDataRequest()
      .then((e) => {
        e =
          ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
            e.MHn,
          );
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterEntrance(
          e.InstanceDungeonEntrance,
        ).finally(void 0);
      })
      .finally(void 0);
  }
  static OpenRoguelikeInstanceView() {
    var e = new Protocol_1.Aki.Protocol.h_s();
    Net_1.Net.Call(29498, e, (o) => {
      if (o?.J2s) {
        const r = o.z2s[0];
        o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(135);
        (o.IsEscViewTriggerCallBack = !1),
          o.SetTextArgs(r.X2s.toString(), r.Y2s.toString());
        let e = !1;
        o.SetCloseFunction(() => {
          UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") &&
            !e &&
            UiManager_1.UiManager.CloseView("InstanceDungeonEntranceView");
        }),
          o.FunctionMap.set(1, () => {
            (e = !0),
              this.RoguelikeResultRequest(r.X5n),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
          }),
          o.FunctionMap.set(2, () => {
            ControllerHolder_1.ControllerHolder.RoleController.IsInRoleTrial()
              ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "TrialRoleDungeonsLimit",
                )
              : this.RoguelikeStartRequest(!0, r.X5n, []);
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
    var o = Protocol_1.Aki.Protocol.S_s.create(),
      r = ((o.MHn = e), await Net_1.Net.CallAsync(22563, o));
    if (r.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        r.O4n,
        27039,
      );
    else {
      for (const l of Object.keys(r.dqs))
        ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(
          Number(l),
          r.dqs[l],
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
    var r = new Protocol_1.Aki.Protocol.L_s(),
      e = ((r.MHn = e ?? 0), await Net_1.Net.CallAsync(29032, r));
    if (o || e.O4n === Protocol_1.Aki.Protocol.O4n.NRs)
      return (
        (ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData = e.fqs),
        (ModelManager_1.ModelManager.RoguelikeModel.TempCountdown = e.fqs?.sps),
        e.fqs
      );
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
      e.O4n,
      20620,
    );
  }
  static async RoguelikeRoleRoomSelectRequest(e) {
    var o = new Protocol_1.Aki.Protocol.tia(),
      e = ((o.ata = e), await Net_1.Net.CallAsync(14893, o));
    return (
      e.O4n === Protocol_1.Aki.Protocol.O4n.NRs ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.O4n,
        2005,
      ),
      !1)
    );
  }
  static async RoguelikeSeasonRewardReceiveRequest(e, o) {
    var r = new Protocol_1.Aki.Protocol.P_s(),
      o = ((r.MHn = o ?? 0), (r.r5n = e), await Net_1.Net.CallAsync(22060, r));
    return (
      o.O4n === Protocol_1.Aki.Protocol.O4n.NRs ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        o.O4n,
        11246,
      ),
      !1)
    );
  }
  static async RoguelikeTalentLevelUpRequest(e) {
    var o = Protocol_1.Aki.Protocol.y_s.create(),
      o = ((o.X4n = e), await Net_1.Net.CallAsync(17308, o));
    o.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
      ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          o.O4n,
          11602,
        )
      : (ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(
          e,
          o.P6n,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RoguelikeTalentLevelUp,
          e,
        ));
  }
  static async RoguelikeStartRequest(e, o, r) {
    var l = Protocol_1.Aki.Protocol.__s.create(),
      e =
        ((l.EHn = e),
        (l.X5n = o),
        (l.s5n = r),
        (l.MHn = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.MHn),
        (ModelManager_1.ModelManager.RoguelikeModel.CurDungeonId = o),
        BlackScreenController_1.BlackScreenController.AddBlackScreen(
          "None",
          "LeaveScene",
        ),
        await Net_1.Net.CallAsync(26127, l));
    return (
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
        "None",
        "LeaveScene",
      ),
      e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            10817,
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
      var e = Protocol_1.Aki.Protocol.c_s.create();
      Net_1.Net.Call(15115, e, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            23758,
          ),
          (this.Sao = !o),
          ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceDungeonInfo();
      });
    }
  }
  static RoguelikeResultRequest(e) {
    var o;
    this.Sao ||
      (((o = Protocol_1.Aki.Protocol.C_s.create()).X5n = e),
      Net_1.Net.Call(7004, o, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              8479,
            )
          : ((this.Sao =
              ModelManager_1.ModelManager.RoguelikeModel?.CheckInRoguelike()),
            UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.sqs));
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
    const a = new Protocol_1.Aki.Protocol.n_s();
    (a.r5n = t?.Index ?? 0),
      (a.SHn = t?.BindId ?? 0),
      (a.vHn = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
      7 === l && (a.SHn = Protocol_1.Aki.Protocol.Z6s.Proto_EventBindId),
      Net_1.Net.Call(16972, a, (o) => {
        if (o.O4n === Protocol_1.Aki.Protocol.O4n.Proto_RogueGainIsSelect)
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            o.O4n,
            16972,
            o.ivs,
            !1,
          );
        else if (o.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            o.O4n,
            16972,
            o.ivs,
          );
        else {
          var r =
            ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
              a.SHn,
            );
          r.IsSelect = o?.w2s;
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
                  ? o.o_s.K2s.length <= 0
                    ? (r.RogueGainEntryList = [])
                    : o.o_s.K2s.forEach((e) => {
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
              a.SHn,
              o,
            );
        }
      });
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(22444, RoguelikeController.yao),
      Net_1.Net.Register(9634, RoguelikeController.Iao),
      Net_1.Net.Register(3821, RoguelikeController.RoguelikeChooseDataNotify),
      Net_1.Net.Register(27401, RoguelikeController.Tao),
      Net_1.Net.Register(12051, RoguelikeController.Lao),
      Net_1.Net.Register(
        14850,
        RoguelikeController.RoguelikeTalentUnlockNotify,
      ),
      Net_1.Net.Register(23118, RoguelikeController.RoguelikeCurrencyNotify),
      Net_1.Net.Register(
        11706,
        RoguelikeController.RoguelikeCurrencyUpdateNotify,
      ),
      Net_1.Net.Register(22591, RoguelikeController.kfa),
      Net_1.Net.Register(
        16271,
        RoguelikeController.RoguelikeGainDataUpdateNotify,
      ),
      Net_1.Net.Register(11019, RoguelikeController.hta);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22444),
      Net_1.Net.UnRegister(9634),
      Net_1.Net.UnRegister(3821),
      Net_1.Net.UnRegister(27401),
      Net_1.Net.UnRegister(12051),
      Net_1.Net.UnRegister(14850),
      Net_1.Net.UnRegister(23118),
      Net_1.Net.UnRegister(11706),
      Net_1.Net.UnRegister(22591),
      Net_1.Net.UnRegister(11019);
  }
  static async Dao() {
    var e = Protocol_1.Aki.Protocol.v_s.create(),
      e = await Net_1.Net.CallAsync(15107, e);
    e && e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
      ? ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() &&
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
          15,
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Roguelike", 9, "肉鸽副本进入下个房间失败");
  }
  static async RoguelikeGiveUpGainRequest(e) {
    var o = Protocol_1.Aki.Protocol.w_s.create(),
      e =
        ((o.SHn = e),
        (o.vHn = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
        await Net_1.Net.CallAsync(20234, o));
    e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
      ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          20234,
        )
      : EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RoguelikeCloseGainSelectView,
        );
  }
  static async RoguelikeTokenReceiveRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.D_s.create(),
      e = ((r.MHn = e), (r.J4n = o), await Net_1.Net.CallAsync(5821, r));
    return (
      e.O4n === Protocol_1.Aki.Protocol.O4n.NRs ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.O4n,
        5821,
      ),
      !1)
    );
  }
  static async RoguelikePopularEntriesInfoRequest(e) {
    var o = Protocol_1.Aki.Protocol.Ugs.create(),
      e =
        ((o.X5n = e),
        (o.MHn = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.MHn),
        await Net_1.Net.CallAsync(7642, o));
    return (
      e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          7642,
        ),
      e
    );
  }
  static async RoguelikeTrialRoleInfoRequest(e) {
    var o = new Protocol_1.Aki.Protocol.Mfs(),
      e =
        ((o.MHn =
          ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.MHn),
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)),
      e =
        ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
          e.FightFormationId,
        ),
      e = ((o.yHn = e.TrialRole), await Net_1.Net.CallAsync(23850, o));
    return (
      e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          23850,
        ),
      await RoleController_1.RoleController.RobotRolePropRequest(e.Mqs),
      e
    );
  }
  static async RoguelikePopularEntriesChangeRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.xgs.create(),
      e =
        ((r.X5n = e),
        (r.IHn = o),
        (r.MHn = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.MHn),
        await Net_1.Net.CallAsync(15840, r));
    e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.O4n,
        15840,
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
  (RoguelikeController.OnPlotEnd = (e) => {
    var o, r, l;
    e.FlowListName === _a.CurrentFlowListName &&
      e.FlowId === _a.CurrentFlowId &&
      e.StateId === _a.CurrentStateId &&
      ((e =
        ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(
          _a.RandomEventIndex,
        ))
        ? 0 < e.RogueGainEntryList.length
          ? ((o =
              ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueEventConfigById(
                e.EventId,
              )) &&
              o.IsCopyCamera &&
              ((o = ModelManager_1.ModelManager.CameraModel).SaveSeqCamera(),
              (o = o.GetSavedSeqCameraThings()) ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Camera",
                    8,
                    "读取Sequence相机信息时，信息不存在",
                  )),
              (r = UiCameraManager_1.UiCameraManager.Get()).SetWorldLocation(
                o.CameraLocation,
              ),
              r.SetWorldRotation(o.CameraRotation),
              (l = r.GetUiCameraComponent(
                UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
              )).SetCameraAperture(o.CurrentAperture),
              l.SetCameraFocalDistance(o.FocusSettings.ManualFocusDistance),
              l.SetCameraFieldOfView(o.FieldOfView),
              CameraController_1.CameraController.ExitCameraMode(1),
              r.Enter()),
            UiManager_1.UiManager.OpenView("RoguelikeRandomEventView", e))
          : ((_a.CurrentFlowId = 0),
            (_a.CurrentFlowListName = ""),
            (_a.CurrentStateId = 0),
            UiManager_1.UiManager.IsViewOpen("RoguelikeRandomEventView") &&
              UiManager_1.UiManager.CloseView(
                "RoguelikeRandomEventView",
                (e) => {
                  e && UiCameraManager_1.UiCameraManager.Get().Exit();
                },
              ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Roguelike", 35, "没有肉鸽随机事件界面数据!", [
            "Index:",
            _a.RandomEventIndex,
          ]));
  }),
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
      ModelManager_1.ModelManager.RoguelikeModel.TempCountdown = e?.sps;
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
    for (const o of Object.keys(e.B2s))
      ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeCurrency(
        Number(o),
        e.B2s[o],
      );
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RoguelikeCurrencyUpdate,
    ),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PayShopGoodsBuy);
  }),
  (RoguelikeController.RoguelikeCurrencyUpdateNotify = (e) => {
    var o =
      ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId();
    for (const t of Object.keys(e.q2s)) {
      var r = Number(t),
        l = e.q2s[t];
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
  (RoguelikeController.kfa = (e) => {
    _a.RoguelikeEventGainNotify(e);
  }),
  (RoguelikeController.RoguelikeEventGainNotify = (e, o) => {
    var r = new Array();
    if (0 < e.j2s.length) {
      for (const l of e.j2s) r.push(new RogueGainEntry_1.RogueGainEntry(l));
      UiManager_1.UiManager.OpenView(
        "RogueEventResultViewOneByOne",
        new EventResult_1.EventResult(r, o),
      );
    } else if (0 < e.dra.length) {
      for (const t of e.dra) r.push(new RogueGainEntry_1.RogueGainEntry(t));
      UiManager_1.UiManager.OpenView(
        "RogueEventResultViewAll",
        new EventResult_1.EventResult(r, o),
      );
    } else o?.();
  }),
  (RoguelikeController.RoguelikeGainDataUpdateNotify = (e) => {
    e.pqs?.Z4n === Protocol_1.Aki.Protocol.e8s.Proto_Miraclecreation &&
      (e.vqs === Protocol_1.Aki.Protocol.vqs.Proto_GainDataUpdate
        ? (ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.SpecialEntryList[
            e.r5n
          ] = new RogueGainEntry_1.RogueGainEntry(e.pqs))
        : e.vqs === Protocol_1.Aki.Protocol.vqs.Proto_GainDataDelete &&
          ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.SpecialEntryList.splice(
            e.r5n,
            1,
          ));
  }),
  (RoguelikeController.RoguelikeChooseDataNotify = (e) => {
    ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData(e.K2s),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoguelikeChooseDataNotify,
      );
  }),
  (RoguelikeController.RoguelikeTalentUnlockNotify = (e) => {
    ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(e.X4n, 0);
  }),
  (RoguelikeController.hta = (e) => {
    UiManager_1.UiManager.OpenView("RogueCharacterRoomSelectView", e.nia);
  }),
  (RoguelikeController.Lao = (e) => {
    (_a.Sao =
      !ModelManager_1.ModelManager.RoguelikeModel?.CheckIsGuideDungeon()),
      e.sqs.rqs
        ? TimerSystem_1.TimerSystem.Delay(() => {
            UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.sqs);
          }, 2e3)
        : UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.sqs);
  }),
  (RoguelikeController.Tao = (e) => {
    (ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount = e.X2s),
      (ModelManager_1.ModelManager.RoguelikeModel.TotalRoomCount = e.Y2s);
    var o =
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikeRoomTypeConfigById(
        e.uqs,
      );
    (ModelManager_1.ModelManager.RoguelikeModel.CurRoomType = o?.RoomTipsType),
      (ModelManager_1.ModelManager.RoguelikeModel.CurRoomMusicState =
        o?.RoomsMusicState),
      0 !== e.cqs
        ? WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(
            e.cqs,
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
          n.hqs === n.aqs)
        )
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
            16,
            3,
          );
        else {
          const r = new Array(),
            l = new Array();
          l.push(n.aqs), r.push(n.hqs);
          var e = Vector_1.Vector.Create(n.XAs, n.YAs, n.lqs),
            o = new UE.Rotator(0, n._qs, 0);
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
    var e = t.lra?._ra;
    if (!(void 0 === e || e.length <= 0)) {
      const a = new Array();
      for (const o of e)
        if ((o.ura && a.push(o.ura), o.cra.length <= 0))
          for (const r of o.cra) a.push(r);
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
            switch (o.S5n) {
              case "a_s":
                RoguelikeController.RoguelikeEventGainNotify(o.a_s, l);
                break;
              case "yns":
                ItemRewardController_1.ItemRewardController.OnItemObtainNotify(
                  o.yns,
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
