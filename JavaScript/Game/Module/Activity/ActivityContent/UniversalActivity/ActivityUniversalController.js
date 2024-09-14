"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityUniversalController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  RoguelikeController_1 = require("../../../Roguelike/RoguelikeController"),
  WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivitySubViewUniversal_1 = require("./ActivitySubViewUniversal"),
  ActivityUniversalData_1 = require("./ActivityUniversalData");
class ActivityUniversalController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(e) {
    2 === this.vFe(e.Id) &&
      ActivityUniversalController.ActivityFunctionExecute(e.Id);
  }
  vFe(e) {
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
      ActivityUniversalController.UniversalActivityIdSet.add(e.s5n),
      new ActivityUniversalData_1.ActivityUniversalData()
    );
  }
  OnInit() {
    return (
      ActivityUniversalController.MFe(),
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
    e =
      ConfigManager_1.ConfigManager.ActivityUniversalConfig?.GetActivityUniversalConfig(
        e,
      );
    if (e) {
      var r,
        i,
        t = e.FunctionParams;
      switch (e.FunctionType) {
        case 0:
          break;
        case 1: {
          let e = void 0;
          t && 1 <= t.length && (e = Number(t[0])), this.EFe(e);
          break;
        }
        case 2:
          t.length < 1 || ((r = t[0]), (i = t.slice(1)), this.SFe(r, i));
      }
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Activity",
          38,
          "通用活动功能触发",
          ["Type", e.FunctionType],
          ["Params", t],
        );
    }
  }
  static EFe(e) {
    UiManager_1.UiManager.OpenView("QuestView", e);
  }
  static SFe(e, r) {
    var i = ActivityUniversalController.OpenViewFuncMap.get(e);
    i ? i(r) : UiManager_1.UiManager.OpenView(e, r);
  }
  static MFe() {
    this.OpenViewFuncMap.set("WorldMapView", this.yFe),
      this.OpenViewFuncMap.set("RoguelikeActivityView", this.IFe);
  }
}
((exports.ActivityUniversalController =
  ActivityUniversalController).UniversalActivityIdSet = new Set()),
  (ActivityUniversalController.OpenViewFuncMap = new Map()),
  (ActivityUniversalController.yFe = (e) => {
    var r = e ? Number(e[0]) : void 0;
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
  (ActivityUniversalController.IFe = (e) => {
    RoguelikeController_1.RoguelikeController.OpenRoguelikeActivityView().then(
      void 0,
    );
  });
//# sourceMappingURL=ActivityUniversalController.js.map
