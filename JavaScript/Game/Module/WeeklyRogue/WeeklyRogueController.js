"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueController = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  AsyncTask_1 = require("../../World/Task/AsyncTask"),
  TaskSystem_1 = require("../../World/Task/TaskSystem"),
  ActivityControllerBase_1 = require("../Activity/ActivityControllerBase"),
  ActivityManager_1 = require("../Activity/ActivityManager"),
  ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController"),
  ItemHintController_1 = require("../ItemHint/ItemHintController"),
  LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController"),
  RoguelikeDefine_1 = require("../Roguelike/Define/RoguelikeDefine"),
  WeatherController_1 = require("../Weather/WeatherController"),
  WeatherModel_1 = require("../Weather/WeatherModel"),
  WeeklyRogueSubView_1 = require("./View/WeeklyRogueSubView");
class WeeklyRogueController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.uV_ = (e) => {
        (ModelManager_1.ModelManager.WeeklyRogueModel.CurrentLayer = e.iqs),
          (ModelManager_1.ModelManager.WeeklyRogueModel.MaxLayer = e.rqs);
        var o =
            ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRoomPoolConfig(
              e.CL_,
            ),
          r =
            ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyRoomType(
              e.vqs,
            );
        (ModelManager_1.ModelManager.WeeklyRogueModel.CurrentRoomTypeId =
          r.RoomType),
          (ModelManager_1.ModelManager.WeeklyRogueModel.CurrentRoomId = e.CL_),
          StringUtils_1.StringUtils.IsEmpty(o?.RoomsMusicState)
            ? (ModelManager_1.ModelManager.WeeklyRogueModel.CurrentRoomMusicState =
                r.RoomsMusicState)
            : (ModelManager_1.ModelManager.WeeklyRogueModel.CurrentRoomMusicState =
                o.RoomsMusicState),
          0 !== e.pqs
            ? WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(
                e.pqs,
                0,
              )
            : WeatherController_1.WeatherController.StopWeather();
      }),
      (this.gH_ = (e) => {
        for (const r of Object.keys(e.V2s)) {
          var o = e.V2s[r];
          ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeCurrency(
            Number(r),
            o,
          ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnPlayerCurrencyChange,
              Number(r),
            );
        }
      }),
      (this.vSc = (e) => {
        for (const t of Object.keys(e.V2s)) {
          var o =
              ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(
                RoguelikeDefine_1.INSIDE_CURRENCY_ID,
              ),
            r = e.V2s[t],
            o = o + r;
          0 < r &&
            ItemHintController_1.ItemHintController.AddRoguelikeItemList(
              RoguelikeDefine_1.INSIDE_CURRENCY_ID,
              r,
            ),
            ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeCurrency(
              Number(t),
              o,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnPlayerCurrencyChange,
              Number(t),
            );
        }
      }),
      (this.dV_ = (e) => {
        UiManager_1.UiManager.OpenView("WeeklyRogueSettleView", e);
      }),
      (this.mV_ = (a) => {
        var e = new AsyncTask_1.AsyncTask(
          "WeeklyRoguelikeSubLevelChangeTask",
          async () => {
            ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = 1;
            const [o, r] = this.UWa(a);
            if (0 === o.length && 0 === r.length)
              await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
                15,
                3,
              );
            else {
              var e = Vector_1.Vector.Create(a.iPs, a.rPs, a.gqs),
                t = new UE.Rotator(0, a.fqs, 0);
              await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
                15,
                3,
              );
              const n = new CustomPromise_1.CustomPromise();
              ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(
                o,
                r,
                0,
                e,
                t,
                (e) => {
                  e
                    ? n.SetResult(!0)
                    : Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "WeeklyRogue",
                        34,
                        "周常肉鸽子关卡加载失败",
                        ["unloads", o],
                        ["newLoads", r],
                      );
                },
              ),
                await n.Promise;
            }
            return (
              await this.GotoNextRoomRequest(),
              await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
                15,
                1,
              ),
              !0
            );
          },
        );
        TaskSystem_1.TaskSystem.AddTask(e), TaskSystem_1.TaskSystem.Run();
      }),
      (this.j7_ = (o) => {
        var e =
          ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleBlackFlowerCost();
        let r = !1;
        e = {
          SinglePowerCost: e,
          RewardCallBack: (e) => {
            (r = !0), this.BlackFlowerRewardRequest(o.A5n, !0, 2 === e);
          },
          CloseCallBack: () => {
            r || this.BlackFlowerRewardRequest(o.A5n, !1, !1);
          },
        };
        UiManager_1.UiManager.OpenView("PowerMagnificationRewardPopView", e);
      }),
      (this.fV_ = (e) => {
        ModelManager_1.ModelManager.WeeklyRogueModel.UpdateInstInfo(e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.WeeklyRogueInstDataUpdate,
          );
      });
  }
  static get Instance() {
    var e = ActivityManager_1.ActivityManager.GetActivityController(
      Protocol_1.Aki.Protocol.uks.Proto_RogueWeekly,
    );
    if (e) return e;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "WeeklyRogue",
        34,
        "OpenSystemWeeklyRogueToken controller is null",
      );
  }
  OnOpenView(e) {
    throw new Error("Method not implemented.");
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityRogue21";
  }
  OnCreateSubPageComponent(e) {
    return new WeeklyRogueSubView_1.WeeklyRogueSubView();
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData;
  }
  OnGetIsOpeningActivityRelativeView() {
    throw new Error("Method not implemented.");
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(26728, this.uV_),
      Net_1.Net.Register(19555, this.dV_),
      Net_1.Net.Register(29486, this.mV_),
      Net_1.Net.Register(19689, this.fV_),
      Net_1.Net.Register(21740, this.j7_),
      Net_1.Net.Register(25192, this.gH_),
      Net_1.Net.Register(16060, this.vSc);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26728),
      Net_1.Net.UnRegister(19555),
      Net_1.Net.UnRegister(29486),
      Net_1.Net.UnRegister(19689),
      Net_1.Net.UnRegister(21740),
      Net_1.Net.UnRegister(25192);
  }
  UWa(o) {
    return [
      o.fL_.filter((e) => !o.mL_.includes(e)),
      o.mL_.filter((e) => !o.fL_.includes(e)),
    ];
  }
  SelectOptionRequest(o) {
    var e = new Protocol_1.Aki.Protocol.yN_();
    (e.RHn = ModelManager_1.ModelManager.WeeklyRogueModel.CurrentBindId),
      (e.c5n = ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry.c5n),
      Net_1.Net.Call(22890, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                22890,
                e.lvs,
              ),
              o?.())
            : (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "WeeklyRogue",
                  34,
                  "选择选项成功",
                  [
                    "选项索引:",
                    ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry
                      .c5n,
                  ],
                  [
                    "当前BindId:",
                    ModelManager_1.ModelManager.WeeklyRogueModel.CurrentBindId,
                  ],
                ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WeeklyRogueSelectOption,
              )));
      });
  }
  InstanceSettleRequest() {
    var e = new Protocol_1.Aki.Protocol.CN_();
    Net_1.Net.Call(28438, e, (e) => {
      e &&
        (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              28438,
            )
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("WeeklyRogue", 34, "打开结算界面"));
    });
  }
  async GotoNextRoomRequest() {
    var e = new Protocol_1.Aki.Protocol.dN_(),
      e = await Net_1.Net.CallAsync(20696, e);
    e &&
      (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            20696,
          )
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("WeeklyRogue", 34, "进入下一层成功"),
          ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue() &&
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
              15,
            )));
  }
  BlackFlowerRewardRequest(e, o, r) {
    var t = new Protocol_1.Aki.Protocol.U7_();
    (t.A5n = e),
      (t.k7_ = r),
      (t.lUl = o),
      Net_1.Net.Call(17633, t, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              17633,
            )
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("WeeklyRogue", 34, "黑花奖励领取成功");
      });
  }
  RogueWeeklyStartRequest(e) {
    var o = new Protocol_1.Aki.Protocol.MN_();
    (o.bN_ = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.CycleId),
      (o.fUs = e),
      Net_1.Net.Call(26198, o, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              26198,
            )
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("WeeklyRogue", 34, "进入周常成功"),
            ModelManager_1.ModelManager.EditBattleTeamModel?.SetInstanceDungeonId(
              void 0,
            ));
      });
  }
  RogueWeeklyScoreRewardRequest(o) {
    var e = new Protocol_1.Aki.Protocol._N_();
    (e.w6n = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.Id),
      (e.v9n = o),
      Net_1.Net.Call(23839, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              23839,
            )
          : (ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.SetScoreRewardState(
              o,
              Protocol_1.Aki.Protocol.zps.ovs,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
              ModelManager_1.ModelManager.WeeklyRogueModel.GetScoreRewardData(),
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRedDot,
              ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.Id,
            ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("WeeklyRogue", 34, "周常积分奖励领取成功"));
      });
  }
  async RogueWeeklyLastInfoRequest() {
    var e = new Protocol_1.Aki.Protocol.Btc(),
      e =
        ((e.w6n = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.Id),
        await Net_1.Net.CallAsync(22597, e));
    e &&
      (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            22597,
          )
        : (ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.LastInstInfo =
            e.LN_));
  }
  async OpenTokenSelectViewById(e) {
    ModelManager_1.ModelManager.WeeklyRogueModel.CurrentBindId = e;
    var o,
      r = ModelManager_1.ModelManager.WeeklyRogueModel.GetOptionByBindId(e);
    return r
      ? (o = this.GetViewNameByType(r.h5n))
        ? void 0 !== (await UiManager_1.UiManager.OpenViewAsync(o, r))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("WeeklyRogue", 34, "获取视图名失败", [
              "boardId",
              e,
            ]),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("WeeklyRogue", 34, "获取选项数据失败", [
            "boardId",
            e,
          ]),
        !1);
  }
  GetViewNameByType(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.HN_.Proto_Goods:
        return "WeeklyRogueShop";
      case Protocol_1.Aki.Protocol.HN_.Proto_CommonBuff:
        return "WeeklyRogueSelectToken";
      case Protocol_1.Aki.Protocol.HN_.Proto_Unknow:
        return;
      default:
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("WeeklyRogue", 34, "未知选项类型", ["optionType", e])
        );
    }
  }
}
exports.WeeklyRogueController = WeeklyRogueController;
//# sourceMappingURL=WeeklyRogueController.js.map
