"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityTurntableController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RewardItemData_1 = require("../../../ItemReward/RewardData/RewardItemData");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivitySubViewTurntable_1 = require("./ActivitySubViewTurntable");
const ActivitySubViewTurntableLock_1 = require("./ActivitySubViewTurntableLock");
const ActivityTurntableData_1 = require("./ActivityTurntableData");
const ActivityTurntableDefine_1 = require("./ActivityTurntableDefine");
class ActivityTurntableController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.DEe = (t, r) => {
        ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(
          Protocol_1.Aki.Protocol.gBs.Proto_TurnTableActivity,
        ).forEach((e) => {
          e.OnQuestStateChange(t, r);
        });
      }),
      (this.qmi = (t, r) => {
        ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(
          Protocol_1.Aki.Protocol.gBs.Proto_TurnTableActivity,
        ).forEach((e) => {
          e.OnCommonItemCountAnyChange(t, r);
        });
      });
  }
  OnRegisterNetEvent() {}
  OnUnRegisterNetEvent() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DEe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qmi,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DEe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qmi,
      );
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return e.GetPreGuideQuestFinishState()
      ? "UiItem_ActivityTurntable"
      : "UiItem_ActivityTurntableLock";
  }
  OnCreateSubPageComponent(e) {
    return new (
      e.GetPreGuideQuestFinishState()
        ? ActivitySubViewTurntable_1.ActivitySubViewTurntable
        : ActivitySubViewTurntableLock_1.ActivitySubViewTurntableLock
    )();
  }
  OnCreateActivityData(e) {
    return new ActivityTurntableData_1.ActivityTurntableData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  static RequestTurntableRun(a) {
    const e = new Protocol_1.Aki.Protocol.Kds();
    (e.YFn = a),
      Net_1.Net.Call(17105, e, (e) => {
        if (e) {
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              13280,
            );
          const t =
            ModelManager_1.ModelManager.ActivityModel.GetActivityById(a);
          if (t) {
            const r = [];
            for (const i of Object.keys(e.Vms)) {
              const n = [{ IncId: 0, ItemId: Number.parseInt(i) }, e.Vms[i]];
              r.push(n);
            }
            t.SetRunResult(e.t3n, r),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.TurntableStartRun,
                e.t3n,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRedDot,
                a,
              );
          }
        }
      });
  }
  static ShowTurntableItemObtain(e, t) {
    if (e.length !== 0) {
      const r = [];
      for (const i of e) {
        const n = new RewardItemData_1.RewardItemData(
          i[0].ItemId,
          i[1],
          i[0].IncId,
        );
        r.push(n);
      }
      e =
        ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(
          ActivityTurntableDefine_1.TURNTABLE_RESULT_DISPLAY_ID,
        )?.RewardViewId;
      e &&
        ControllerHolder_1.ControllerHolder.ItemRewardController.OpenCommonRewardView(
          e,
          r,
          t,
        );
    }
  }
}
exports.ActivityTurntableController = ActivityTurntableController;
// # sourceMappingURL=ActivityTurntableController.js.map
