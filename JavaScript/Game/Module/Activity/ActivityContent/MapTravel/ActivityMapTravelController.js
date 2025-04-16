"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMapTravelController = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityMapTravelData_1 = require("./ActivityMapTravelData"),
  ActivitySubViewMapTravel_1 = require("./View/ActivitySubViewMapTravel"),
  FLY_STRENGTH_MAX_ATTRIBUTE_INDEX = 138;
class ActivityMapTravelController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.DSe = (e, t) => {
        var r = ActivityMapTravelController.GetMapTravelData();
        r &&
          r.PhantomQuestIds.has(e) &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            r.Id,
          );
      }),
      (this.uFl = (e) => {
        var t = ActivityMapTravelController.GetMapTravelData();
        t &&
          (e.T$s && t.RefreshTravelTaskData(e.T$s),
          e.EE_ &&
            (t.RefreshSoarChallengePlayData(e.EE_),
            (ModelManager_1.ModelManager.GeneralLogicTreeModel.HistorySoarScore =
              e.EE_.vE_)),
          e.ME_ && t.UnlockAreaData(e.ME_),
          e.SE_ && t.UnlockPhantom(e.SE_),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            t.Id,
          ));
      });
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(15501, this.uFl);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15501);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DSe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        ActivityMapTravelController.qdi,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DSe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        ActivityMapTravelController.qdi,
      );
  }
  OnGetActivityResource(e) {
    return "UiItem_TravelMapSubView";
  }
  OnOpenView(e) {}
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewMapTravel_1.ActivitySubViewMapTravel();
  }
  OnCreateActivityData(e) {
    return new ActivityMapTravelData_1.ActivityMapTravelData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  static GetMapTravelData() {
    var e =
      ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(
        Protocol_1.Aki.Protocol.uks.Proto_MapTravelActivity,
      );
    let t = void 0;
    return (t = e ? e[0] : t);
  }
  static RequestMapTravelLevelUp(t) {
    var e = Protocol_1.Aki.Protocol.Bp_.create();
    Net_1.Net.Call(29062, e, (e) => {
      e
        ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              16230,
            ),
            t?.(!1))
          : (e = ActivityMapTravelController.GetMapTravelData())
            ? (e.TravelLevel++,
              t?.(!0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRedDot,
                e.Id,
              ),
              ActivityMapTravelController.eVl(e))
            : t?.(!1)
        : t?.(!1);
    });
  }
  static RequestTakeTravelTaskReward(t) {
    var e = Protocol_1.Aki.Protocol.x0_.create();
    (e.gps = t),
      Net_1.Net.Call(16176, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                22373,
              )
            : (e = ActivityMapTravelController.GetMapTravelData()) &&
              (e.SetTravelTaskDataDone(t),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRedDot,
                e.Id,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.MapTravelTaskRefresh,
              )));
      });
  }
  static RequestTakeTaskFinalReward() {
    var e = Protocol_1.Aki.Protocol.Up_.create();
    Net_1.Net.Call(18278, e, (e) => {
      e &&
        (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              21755,
            )
          : (e = ActivityMapTravelController.GetMapTravelData()) &&
            ((e.TaskFinalRewardData.IsReceived = !0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRedDot,
              e.Id,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.MapTravelTaskRefresh,
            )));
    });
  }
  static RequestTakeSoarChallengeReward(t) {
    var e = Protocol_1.Aki.Protocol.D0_.create();
    (e.gps = t),
      Net_1.Net.Call(23827, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                24310,
              )
            : (e = ActivityMapTravelController.GetMapTravelData()) &&
              (e.SetSoarChallengeRewardDone(t),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRedDot,
                e.Id,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.MapTravelSoarRefresh,
              )));
      });
  }
  static eVl(e) {
    UiManager_1.UiManager.IsViewOpen("TravelLevelTipsView") ||
      UiManager_1.UiManager.OpenView("TravelLevelTipsView", e);
  }
  OnActivityFirstUnlock(e) {
    UiManager_1.UiManager.OpenView("ActivityUnlockTipMapTravelView");
  }
  static OpenSoarStrengthView(e) {
    var t =
        ControllerHolder_1.ControllerHolder.FormationAttributeController.GetBaseMax(
          10,
        ),
      r =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          FLY_STRENGTH_MAX_ATTRIBUTE_INDEX,
        ),
      r = {
        Name: r.Name,
        IconPath: r.Icon,
        ShowArrow: !0,
        PreText: Math.floor((t - e) / 100).toString(),
        CurText: Math.floor(t / 100).toString(),
      },
      e = {
        Title: "Flying_EnergyUp",
        StrengthUpgradeData: {
          AttributeId: 10,
          SingleStrengthValue:
            CommonParamById_1.configCommonParamById.GetIntConfig(
              "FlySingleStrengthValue",
            ),
          MaxSingleStrengthItemCount:
            CommonParamById_1.configCommonParamById.GetIntConfig(
              "FlyMaxSingleStrengthItemCount",
            ),
          MaxStrength: t,
        },
        AttributeInfo: [r],
      };
    RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
      e,
    );
  }
}
(exports.ActivityMapTravelController = ActivityMapTravelController).qdi = (
  e,
  t,
) => {
  var r = ActivityMapTravelController.GetMapTravelData();
  r &&
    r.GetActivityConfig().ExpItemId === e &&
    (r.CanTravelLevelUp() &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        r.Id,
      ),
    ActivityMapTravelController.eVl(r));
};
//# sourceMappingURL=ActivityMapTravelController.js.map
