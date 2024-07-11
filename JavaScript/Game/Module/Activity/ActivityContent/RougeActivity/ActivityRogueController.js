"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRogueController = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const RoguelikeController_1 = require("../../../Roguelike/RoguelikeController");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityRogueData_1 = require("./ActivityRogueData");
const ActivitySubViewRogue_1 = require("./ActivitySubViewRogue");
class ActivityRogueController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(e) {
    this.o2e(e.Id) === 2 &&
      ActivityRogueController.ActivityFunctionExecute(e.Id);
  }
  o2e(e) {
    e =
      ConfigManager_1.ConfigManager.ActivityRogueConfig?.GetActivityUniversalConfig(
        e,
      );
    if (e) return e.FunctionType;
  }
  OnGetActivityResource(e) {
    e =
      ConfigManager_1.ConfigManager.ActivityRogueConfig?.GetActivityUniversalConfig(
        e.Id,
      );
    return e ? e.ActivityResource : "UiItem_ActivityRouge";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewRogue_1.ActivitySubViewRogue();
  }
  OnCreateActivityData(e) {
    return (
      (ActivityRogueController.ActivityId = e.Ekn),
      new ActivityRogueData_1.ActivityRougeData()
    );
  }
  OnInit() {
    return (
      ActivityRogueController.r2e(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Activity", 38, "初始化肉鸽活动"),
      !0
    );
  }
  OnClear() {
    return ActivityRogueController.OpenViewFuncMap.clear(), !0;
  }
  static GetCurrentActivityData() {
    const e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      ActivityRogueController.ActivityId,
    );
    if (e) return e;
  }
  static RefreshActivityRedDot() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.ActivityId,
    );
  }
  static ActivityFunctionExecute(e) {
    const t =
      ConfigManager_1.ConfigManager.ActivityRogueConfig?.GetActivityUniversalConfig(
        e,
      );
    if (t) {
      let r;
      let i;
      const o = t.FunctionParams;
      switch (t.FunctionType) {
        case 0:
          break;
        case 1: {
          let e = void 0;
          o && o.length >= 1 && (e = Number(o[0])), this.n2e(e);
          break;
        }
        case 2:
          o.length < 1 || ((r = o[0]), (i = o.slice(1)), this.s2e(r, i));
      }
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Activity",
          38,
          "肉鸽活动功能触发",
          ["Type", t.FunctionType],
          ["Params", o],
        );
      e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
      e &&
        ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
          e,
          t.FunctionType,
        );
    }
  }
  static n2e(e) {
    UiManager_1.UiManager.OpenView("QuestView", e);
  }
  static s2e(e, t) {
    const r = ActivityRogueController.OpenViewFuncMap.get(e);
    r ? r(t) : UiManager_1.UiManager.OpenView(e, t);
  }
  static r2e() {
    this.OpenViewFuncMap.set("WorldMapView", this.a2e),
      this.OpenViewFuncMap.set("RoguelikeActivityView", this.h2e);
  }
}
((exports.ActivityRogueController = ActivityRogueController).ActivityId = 0),
  (ActivityRogueController.OpenViewFuncMap = new Map()),
  (ActivityRogueController.a2e = (e) => {
    let t = e ? Number(e[0]) : void 0;
    if (
      void 0 !== t &&
      !ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(t)
    )
      return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "FunctionDisable",
      );
    t = { MarkId: e ? Number(e[0]) : void 0, MarkType: 0, OpenAreaId: 0 };
    WorldMapController_1.WorldMapController.OpenView(2, !1, t);
  }),
  (ActivityRogueController.h2e = (e) => {
    RoguelikeController_1.RoguelikeController.OpenRoguelikeActivityView().then(
      void 0,
    );
  });
// # sourceMappingURL=ActivityRogueController.js.map
