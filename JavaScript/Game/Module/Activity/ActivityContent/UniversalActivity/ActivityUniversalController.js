"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityUniversalController = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const RoguelikeController_1 = require("../../../Roguelike/RoguelikeController");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivitySubViewUniversal_1 = require("./ActivitySubViewUniversal");
const ActivityUniversalData_1 = require("./ActivityUniversalData");
class ActivityUniversalController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(e) {
    this.o2e(e.Id) === 2 &&
      ActivityUniversalController.ActivityFunctionExecute(e.Id);
  }
  o2e(e) {
    e =
      ConfigManager_1.ConfigManager.ActivityUniversalConfig?.GetActivityUniversalConfig(
        e,
      );
    if (e) return e.FunctionType;
  }
  OnGetActivityResource(e) {
    e =
      ConfigManager_1.ConfigManager.ActivityUniversalConfig?.GetActivityUniversalConfig(
        e.Id,
      );
    return e ? e.UiResource : "";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewUniversal_1.ActivitySubViewUniversal();
  }
  OnCreateActivityData(e) {
    return (
      ActivityUniversalController.UniversalActivityIdSet.add(e.Ekn),
      new ActivityUniversalData_1.ActivityUniversalData()
    );
  }
  OnInit() {
    return (
      ActivityUniversalController.r2e(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Activity", 38, "初始化通用活动"),
      !0
    );
  }
  OnClear() {
    return (
      ActivityUniversalController.UniversalActivityIdSet.clear(),
      ActivityUniversalController.OpenViewFuncMap.clear(),
      !0
    );
  }
  static ActivityFunctionExecute(e) {
    const r =
      ConfigManager_1.ConfigManager.ActivityUniversalConfig?.GetActivityUniversalConfig(
        e,
      );
    if (r) {
      let i;
      let t;
      const n = r.FunctionParams;
      switch (r.FunctionType) {
        case 0:
          break;
        case 1: {
          let e = void 0;
          n && n.length >= 1 && (e = Number(n[0])), this.n2e(e);
          break;
        }
        case 2:
          n.length < 1 || ((i = n[0]), (t = n.slice(1)), this.s2e(i, t));
      }
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Activity",
          38,
          "通用活动功能触发",
          ["Type", r.FunctionType],
          ["Params", n],
        );
      e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
      e &&
        ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
          e,
          r.FunctionType,
        );
    }
  }
  static n2e(e) {
    UiManager_1.UiManager.OpenView("QuestView", e);
  }
  static s2e(e, r) {
    const i = ActivityUniversalController.OpenViewFuncMap.get(e);
    i ? i(r) : UiManager_1.UiManager.OpenView(e, r);
  }
  static r2e() {
    this.OpenViewFuncMap.set("WorldMapView", this.a2e),
      this.OpenViewFuncMap.set("RoguelikeActivityView", this.h2e);
  }
}
((exports.ActivityUniversalController =
  ActivityUniversalController).UniversalActivityIdSet = new Set()),
  (ActivityUniversalController.OpenViewFuncMap = new Map()),
  (ActivityUniversalController.a2e = (e) => {
    let r = e ? Number(e[0]) : void 0;
    if (
      void 0 !== r &&
      !ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(r)
    )
      return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "FunctionDisable",
      );
    r = { MarkId: e ? Number(e[0]) : void 0, MarkType: 0, OpenAreaId: 0 };
    WorldMapController_1.WorldMapController.OpenView(2, !1, r);
  }),
  (ActivityUniversalController.h2e = (e) => {
    RoguelikeController_1.RoguelikeController.OpenRoguelikeActivityView().then(
      void 0,
    );
  });
// # sourceMappingURL=ActivityUniversalController.js.map
