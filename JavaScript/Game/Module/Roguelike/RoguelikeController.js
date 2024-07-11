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
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
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
  UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent"),
  UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
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
        RoguelikeController.Tso,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        RoguelikeController.gKe,
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
        RoguelikeController.Tso,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        RoguelikeController.gKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        RoguelikeController.OnPlotEnd,
      );
  }
  static StartFlowForView(e, o, r, n, l) {
    return (
      (this.RandomEventIndex = e),
      (this.CurrentFlowListName = o),
      (this.CurrentFlowId = r),
      (this.CurrentStateId = n),
      ControllerHolder_1.ControllerHolder.FlowController.StartFlowForView(
        o,
        r,
        n,
        l,
      )
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
      (((o = new Protocol_1.Aki.Protocol.sas()).Akn =
        ModelManager_1.ModelManager.RoguelikeModel.CurIndex),
      (o.k8n = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
      r.RoguelikeGainDataType === Protocol_1.Aki.Protocol.u3s.Proto_Shop &&
        (o.Akn = Protocol_1.Aki.Protocol._3s.Proto_ShopBindId),
      (r = await Net_1.Net.CallAsync(7763, o)),
      ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData([
        r.Ews,
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
      case Protocol_1.Aki.Protocol.u3s.qDs:
        return ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(
          ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry
            .ConfigId,
        )
          ? "RoguePhantomReplaceView"
          : "RoguePhantomSelectView";
      case Protocol_1.Aki.Protocol.u3s.tRs:
        return "RoleReplaceView";
      case Protocol_1.Aki.Protocol.u3s.Proto_CommonBuff:
        return "CommonSelectView";
      case Protocol_1.Aki.Protocol.u3s.Proto_RoleBuff:
        return "RoleBuffSelectView";
      case Protocol_1.Aki.Protocol.u3s.Proto_Shop:
        return "RogueShopView";
      case Protocol_1.Aki.Protocol.u3s.Proto_Event:
        return "RoguelikeRandomEventView";
      case Protocol_1.Aki.Protocol.u3s.Proto_Miraclecreation:
        return "RoguelikeSelectSpecialView";
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Roguelike", 9, "当前增益类型没有对应的界面数据", [
        "type",
        Protocol_1.Aki.Protocol.u3s[e],
      ]);
  }
  static RoguelikeRefreshGainRequest(e) {
    var o = new Protocol_1.Aki.Protocol.oas();
    (o.V8n = e),
      (o.k8n = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
      Net_1.Net.Call(26724, o, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              26724,
              e.Fms,
            )
          : (ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData([
              e.Ews,
            ]),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RoguelikeRefreshGain,
              e.Ews.Akn,
            ));
      });
  }
  static async RoguelikeLastInfoRequestAsync() {
    var e = new Protocol_1.Aki.Protocol.das(),
      e = await Net_1.Net.CallAsync(27957, e);
    e?.wws && this.RoguelikeResultRequest(e.xws[0].vFn);
  }
  static EnterCurrentRogueEntrance() {
    this.RoguelikeSeasonDataRequest()
      .then((e) => {
        e =
          ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
            e.F8n,
          );
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterEntrance(
          e.InstanceDungeonEntrance,
        ).finally(void 0);
      })
      .finally(void 0);
  }
  static OpenRoguelikeInstanceView() {
    var e = new Protocol_1.Aki.Protocol.das();
    Net_1.Net.Call(27957, e, (o) => {
      if (o?.wws) {
        const r = o.xws[0];
        o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(135);
        (o.IsEscViewTriggerCallBack = !1),
          o.SetTextArgs(r.Pws.toString(), r.Uws.toString());
        let e = !1;
        o.SetCloseFunction(() => {
          UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") &&
            !e &&
            UiManager_1.UiManager.CloseView("InstanceDungeonEntranceView");
        }),
          o.FunctionMap.set(1, () => {
            (e = !0),
              this.RoguelikeResultRequest(r.vFn),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
          }),
          o.FunctionMap.set(2, () => {
            this.RoguelikeStartRequest(!0, r.vFn, []);
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
    var o = Protocol_1.Aki.Protocol.Las.create(),
      r = ((o.F8n = e), await Net_1.Net.CallAsync(17206, o));
    if (r.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        r.lkn,
        3217,
      );
    else {
      for (const n of Object.keys(r.Qws))
        ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(
          Number(n),
          r.Qws[n],
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
    var r = new Protocol_1.Aki.Protocol.Uas(),
      e = ((r.F8n = e ?? 0), await Net_1.Net.CallAsync(1111, r));
    if (o || e.lkn === Protocol_1.Aki.Protocol.lkn.Sys)
      return (
        (ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData = e.zws),
        (ModelManager_1.ModelManager.RoguelikeModel.TempCountdown = e.zws?.jCs),
        e.zws
      );
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
      e.lkn,
      6565,
    );
  }
  static async RoguelikeSeasonRewardReceiveRequest(e, o) {
    var r = new Protocol_1.Aki.Protocol.Bas(),
      o = ((r.F8n = o ?? 0), (r.Akn = e), await Net_1.Net.CallAsync(25690, r));
    return (
      o.lkn === Protocol_1.Aki.Protocol.lkn.Sys ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        o.lkn,
        23846,
      ),
      !1)
    );
  }
  static async RoguelikeTalentLevelUpRequest(e) {
    var o = Protocol_1.Aki.Protocol.Das.create(),
      o = ((o.vkn = e), await Net_1.Net.CallAsync(10843, o));
    o.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
      ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          o.lkn,
          4821,
        )
      : (ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(
          e,
          o.r3n,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RoguelikeTalentLevelUp,
          e,
        ));
  }
  static async RoguelikeStartRequest(e, o, r) {
    var n = Protocol_1.Aki.Protocol.Cas.create(),
      e =
        ((n.H8n = e),
        (n.vFn = o),
        (n.xkn = r),
        (n.F8n = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.F8n),
        (ModelManager_1.ModelManager.RoguelikeModel.CurDungeonId = o),
        BlackScreenController_1.BlackScreenController.AddBlackScreen(
          "None",
          "LeaveScene",
        ),
        await Net_1.Net.CallAsync(6681, n));
    return (
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
        "None",
        "LeaveScene",
      ),
      e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            12622,
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
    if (!this.Lso) {
      const o =
        ModelManager_1.ModelManager.RoguelikeModel?.CheckIsGuideDungeon();
      var e = Protocol_1.Aki.Protocol.fas.create();
      Net_1.Net.Call(8716, e, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            8804,
          ),
          (this.Lso = !o),
          ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceDungeonInfo();
      });
    }
  }
  static RoguelikeResultRequest(e) {
    var o;
    this.Lso ||
      (((o = Protocol_1.Aki.Protocol.Mas.create()).vFn = e),
      Net_1.Net.Call(20384, o, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              7871,
            )
          : ((this.Lso =
              ModelManager_1.ModelManager.RoguelikeModel?.CheckInRoguelike()),
            UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.Fws));
      }));
  }
  static RogueChooseDataResultRequest(n) {
    const l = ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry;
    let t = void 0;
    if (1 === n)
      t = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry;
    else if (3 === n)
      t = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.RoleEntry;
    else if (6 === n) {
      t = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry;
      var e = l.ShopItemCoinId;
      if (
        ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(e) <
        (0 === l.CurrentPrice ? l.OriginalPrice : l.CurrentPrice)
      )
        return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "RoguelikeShopNotEnoughCurrency",
        );
    }
    const a = new Protocol_1.Aki.Protocol._as();
    (a.Akn = l?.Index ?? 0),
      (a.V8n = l?.BindId ?? 0),
      (a.k8n = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
      7 === n && (a.V8n = Protocol_1.Aki.Protocol._3s.Proto_EventBindId),
      Net_1.Net.Call(1543, a, (o) => {
        if (o.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            o.lkn,
            1543,
            o.Fms,
          );
        else {
          var r =
            ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
              a.V8n,
            );
          r.IsSelect = o?.dws;
          let e = void 0;
          1 === n
            ? (e =
                ModelManager_1.ModelManager.RoguelikeModel.RogueInfo
                  .PhantomEntry)
            : 3 === n
              ? (e =
                  ModelManager_1.ModelManager.RoguelikeModel.RogueInfo
                    .RoleEntry)
              : 6 === n
                ? ((l.IsSell = !0), (e = l))
                : 7 === n
                  ? o.las.Dws.length <= 0
                    ? (r.RogueGainEntryList = [])
                    : o.las.Dws.forEach((e) => {
                        ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData(
                          [e],
                        );
                      })
                  : 8 === n && (e = l),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RoguelikeChooseDataResult,
              e,
              t,
              !0,
              a.V8n,
              o,
            );
        }
      });
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19537, RoguelikeController.Dso),
      Net_1.Net.Register(6539, RoguelikeController.Rso),
      Net_1.Net.Register(8998, RoguelikeController.RoguelikeChooseDataNotify),
      Net_1.Net.Register(16227, RoguelikeController.Uso),
      Net_1.Net.Register(28895, RoguelikeController.Aso),
      Net_1.Net.Register(2778, RoguelikeController.RoguelikeTalentUnlockNotify),
      Net_1.Net.Register(11430, RoguelikeController.RoguelikeCurrencyNotify),
      Net_1.Net.Register(
        11857,
        RoguelikeController.RoguelikeCurrencyUpdateNotify,
      ),
      Net_1.Net.Register(28299, RoguelikeController.RoguelikeEventGainNotify),
      Net_1.Net.Register(
        12898,
        RoguelikeController.RoguelikeGainDataUpdateNotify,
      );
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19537),
      Net_1.Net.UnRegister(6539),
      Net_1.Net.UnRegister(8998),
      Net_1.Net.UnRegister(16227),
      Net_1.Net.UnRegister(28895),
      Net_1.Net.UnRegister(2778),
      Net_1.Net.UnRegister(11430),
      Net_1.Net.UnRegister(11857),
      Net_1.Net.UnRegister(28299);
  }
  static async Pso() {
    var e = Protocol_1.Aki.Protocol.yas.create(),
      e = await Net_1.Net.CallAsync(12488, e);
    e && e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
      ? ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() &&
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
          15,
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Roguelike", 9, "肉鸽副本进入下个房间失败");
  }
  static async RoguelikeGiveUpGainRequest(e) {
    var o = Protocol_1.Aki.Protocol.Gas.create(),
      e =
        ((o.V8n = e),
        (o.k8n = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
        await Net_1.Net.CallAsync(12802, o));
    e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
      ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.lkn,
          12802,
        )
      : EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RoguelikeCloseGainSelectView,
        );
  }
  static async RoguelikeTokenReceiveRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.xas.create(),
      e = ((r.F8n = e), (r.Ekn = o), await Net_1.Net.CallAsync(1845, r));
    return (
      e.lkn === Protocol_1.Aki.Protocol.lkn.Sys ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.lkn,
        1845,
      ),
      !1)
    );
  }
  static async RoguelikePopularEntriesInfoRequest(e) {
    var o = Protocol_1.Aki.Protocol.Gds.create(),
      e =
        ((o.vFn = e),
        (o.F8n = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.F8n),
        await Net_1.Net.CallAsync(19107, o));
    return (
      e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.lkn,
          19107,
        ),
      e
    );
  }
  static async RoguelikeTrialRoleInfoRequest(e) {
    var o = new Protocol_1.Aki.Protocol.lms(),
      e =
        ((o.F8n =
          ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.F8n),
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)),
      e =
        ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
          e.FightFormationId,
        ),
      e = ((o.j8n = e.TrialRole), await Net_1.Net.CallAsync(27185, o));
    return e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
      ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.lkn,
          27185,
        ),
        [])
      : (await RoleController_1.RoleController.RobotRolePropRequest(e.txs),
        e.txs);
  }
  static async RoguelikePopularEntriesChangeRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.kds.create(),
      e =
        ((r.vFn = e),
        (r.W8n = o),
        (r.F8n = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.F8n),
        await Net_1.Net.CallAsync(24992, r));
    e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.lkn,
        24992,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoguelikePopularEntriesChange,
        o,
      );
  }
}
(exports.RoguelikeController = RoguelikeController),
  ((_a = RoguelikeController).Lso = !1),
  (RoguelikeController.CurrentFlowListName = ""),
  (RoguelikeController.CurrentFlowId = 0),
  (RoguelikeController.CurrentStateId = 0),
  (RoguelikeController.RandomEventIndex = 0),
  (RoguelikeController.OnPlotEnd = (e) => {
    var o, r, n;
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
              (n = r.GetUiCameraComponent(
                UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
              )).SetCameraAperture(o.CurrentAperture),
              n.SetCameraFocalDistance(o.FocusSettings.ManualFocusDistance),
              n.SetCameraFieldOfView(o.FieldOfView),
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
      ? ((_a.Lso = !1),
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
        LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.RoguelikeShopRecord,
          !1,
        ))
      : _a.Lso && ((_a.Lso = !1), _a.OpenRoguelikeActivityView()),
      (_a.CurrentFlowId = 0),
      (_a.CurrentFlowListName = ""),
      (_a.CurrentStateId = 0);
  }),
  (RoguelikeController.gKe = (e, o) => {
    (110056 !== e && !o) || _a.Tso();
  }),
  (RoguelikeController.Tso = () => {
    _a.RoguelikeSeasonDataRequest(void 0, !0).then((e) => {
      ModelManager_1.ModelManager.RoguelikeModel.TempCountdown = e?.jCs;
    });
  }),
  (RoguelikeController.CheckCanOpen = () => {
    return ModelManager_1.ModelManager.RoguelikeModel?.CheckRogueIsOpen()
      ? ModelManager_1.ModelManager.GameModeModel?.IsMulti
        ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "Rogue_Multi_Tip",
          ),
          !1)
        : !_a.Lso ||
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
    !_a.Lso ||
    (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
      "Rogue_Function_Instance_End_Tip",
    ),
    !1)),
  (RoguelikeController.RoguelikeCurrencyNotify = (e) => {
    ModelManager_1.ModelManager.RoguelikeModel.RoguelikeCurrencyDictMap.clear();
    for (const o of Object.keys(e.gws))
      ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeCurrency(
        Number(o),
        e.gws[o],
      );
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RoguelikeCurrencyUpdate,
    ),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PayShopGoodsBuy);
  }),
  (RoguelikeController.RoguelikeCurrencyUpdateNotify = (e) => {
    var o =
      ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId();
    for (const l of Object.keys(e.fws)) {
      var r = Number(l),
        n = e.fws[l];
      ModelManager_1.ModelManager.RoguelikeModel.UpdateRoguelikeCurrency(r, n),
        r !== o.InsideCurrency ||
          n <= 0 ||
          ItemHintController_1.ItemHintController.AddRoguelikeItemList(
            o.InsideCurrency,
            n,
          );
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RoguelikeCurrencyUpdate,
    );
  }),
  (RoguelikeController.RoguelikeEventGainNotify = (e) => {
    var o = new Array();
    for (const r of e.Lws) o.push(new RogueGainEntry_1.RogueGainEntry(r));
    UiManager_1.UiManager.OpenView(
      "RogueEventResultView",
      new EventResult_1.EventResult(o),
    );
  }),
  (RoguelikeController.RoguelikeGainDataUpdateNotify = (e) => {
    e.exs?.Ikn === Protocol_1.Aki.Protocol.u3s.Proto_Miraclecreation &&
      (e.Zws === Protocol_1.Aki.Protocol.Zws.Proto_GainDataUpdate
        ? (ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.SpecialEntryList[
            e.Akn
          ] = new RogueGainEntry_1.RogueGainEntry(e.exs))
        : e.Zws === Protocol_1.Aki.Protocol.Zws.Proto_GainDataDelete &&
          ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.SpecialEntryList.splice(
            e.Akn,
            1,
          ));
  }),
  (RoguelikeController.RoguelikeChooseDataNotify = (e) => {
    ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData(e.Dws),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoguelikeChooseDataNotify,
      );
  }),
  (RoguelikeController.RoguelikeTalentUnlockNotify = (e) => {
    ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(e.vkn, 0);
  }),
  (RoguelikeController.Aso = (e) => {
    (_a.Lso =
      !ModelManager_1.ModelManager.RoguelikeModel?.CheckIsGuideDungeon()),
      e.Fws.Ows
        ? TimerSystem_1.TimerSystem.Delay(() => {
            UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.Fws);
          }, 2e3)
        : UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.Fws);
  }),
  (RoguelikeController.Uso = (e) => {
    (ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount = e.Pws),
      (ModelManager_1.ModelManager.RoguelikeModel.TotalRoomCount = e.Uws);
    var o =
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikeRoomTypeConfigById(
        e.Wws,
      );
    (ModelManager_1.ModelManager.RoguelikeModel.CurRoomType = o?.RoomTipsType),
      (ModelManager_1.ModelManager.RoguelikeModel.CurRoomMusicState =
        o?.RoomsMusicState),
      0 !== e.Kws &&
        WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(
          e.Kws,
          1,
        );
  }),
  (RoguelikeController.Rso = (e) => {
    ModelManager_1.ModelManager.RoguelikeModel.RogueInfo =
      new RoguelikeInfo_1.RoguelikeInfo(e);
  }),
  (RoguelikeController.Dso = (t) => {
    var e = new AsyncTask_1.AsyncTask(
      "RoguelikeSubLevelChangeTask",
      async () => {
        if (
          ((ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = 1),
          t.$ws === t.Vws)
        )
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
            16,
            3,
          );
        else {
          const r = new Array(),
            n = new Array();
          n.push(t.Vws), r.push(t.$ws);
          var e = Vector_1.Vector.Create(t.PTs, t.UTs, t.Hws),
            o = new UE.Rotator(0, t.jws, 0);
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
            16,
            3,
          );
          const l = new CustomPromise_1.CustomPromise();
          ControllerHolder_1.ControllerHolder.GameModeController.ChangeSubLevel(
            r,
            n,
            0,
            e,
            o,
            (e) => {
              e
                ? l.SetResult(!0)
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Roguelike",
                    9,
                    "肉鸽副本子关卡加载失败",
                    ["unloads", r],
                    ["newLoads", n],
                  );
            },
          ),
            await l.Promise;
        }
        return (
          await RoguelikeController.Pso(),
          await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
            16,
            1,
          ),
          !0
        );
      },
    );
    TaskSystem_1.TaskSystem.AddTask(e), TaskSystem_1.TaskSystem.Run();
  });
//# sourceMappingURL=RoguelikeController.js.map
