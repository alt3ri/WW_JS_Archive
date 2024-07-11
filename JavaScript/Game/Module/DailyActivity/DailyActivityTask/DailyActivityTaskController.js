"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyActiveTaskController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController");
class DailyActiveTaskController extends UiControllerBase_1.UiControllerBase {
  static TrackTaskByType(e, a) {
    switch (e) {
      case 1:
        break;
      case 2:
        DailyActiveTaskController.kOt();
        break;
      case 3:
        var r = [];
        for (const o of a) r.push(Number(o));
        DailyActiveTaskController.dOe(r);
        break;
      case 4: {
        let e = "DailyActivityTabView",
          r = void 0;
        a && 1 <= a.length && ((e = a[0]), 2 <= a.length) && (r = a.slice(1)),
          DailyActiveTaskController.FOt(e, r);
        break;
      }
      case 5: {
        let e = "DailyActivityTabView";
        a && 1 <= a.length && (e = a[0]), DailyActiveTaskController.COe(e);
        break;
      }
      case 6: {
        let e = 0;
        a && 1 <= a.length && (e = Number(a[0])),
          DailyActiveTaskController.VOt(e);
        break;
      }
      case 7: {
        let e = -1;
        a && 1 <= a.length && (e = Number(a[0])),
          DailyActiveTaskController.HOt(e);
        break;
      }
    }
  }
  static kOt() {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10023005)) {
      let o = new Map();
      ModelManager_1.ModelManager.DailyTaskModel.GetAllDailyQuest().forEach(
        (e) => {
          var r = e.TreeId,
            a = e.GetCurrentActiveChildQuestNode();
          a && ((e = e.GetTrackDistance(a.NodeId)), o.set(e, r));
        },
      );
      var [r] = (o = new Map(
          [...o.entries()].sort((e, r) => e[0] - r[0]),
        )).values(),
        a = ModelManager_1.ModelManager.MapModel.GetAllDynamicMarks().get(12);
      if (a) {
        let e = void 0;
        for (const l of a.values())
          if (l.TreeId === r) {
            e = l;
            break;
          }
        e &&
          ((a = { MarkId: e.MarkId, MarkType: 12, OpenAreaId: 0 }),
          WorldMapController_1.WorldMapController.OpenView(2, !1, a));
      }
    } else
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "FunctionDisable",
      );
  }
  static dOe(e) {
    let r = void 0;
    var a = ModelManager_1.ModelManager.AreaModel.GetAreaCountryId() ?? 1;
    if (
      (0 === e.length
        ? (r = void 0)
        : 1 === e.length
          ? (r = e[0])
          : e.length < a
            ? ((r = e[0]),
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "AdventureGuide",
                  38,
                  "[活跃度系统] 地图跳转Id错误,MarkId数量未对应国家Id",
                  ["当前国家Id", a],
                  ["MarkId数量", e.length],
                ))
            : (r = e[a - 1]),
      void 0 !== r) &&
      !ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(r)
    )
      return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "FunctionDisable",
      );
    e = { MarkId: r, MarkType: 0, OpenAreaId: 0 };
    WorldMapController_1.WorldMapController.OpenView(2, !1, e);
  }
  static FOt(e = "DailyActivityTabView", r) {
    ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView(
      e,
      r,
    );
  }
  static COe(e) {
    RoleController_1.RoleController.OpenRoleMainView(0, 0, [], e);
  }
  static HOt(e) {
    void 0 === e || e < 0
      ? UiManager_1.UiManager.OpenView("QuestView")
      : ((e =
          ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(e)),
        UiManager_1.UiManager.OpenView("QuestView", e?.Id ?? void 0));
  }
  static VOt(e) {
    e &&
      (e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e)) &&
      ((e = {
        MarkId: e.DeliveryMarkId,
        MarkType: 0,
        StartScale: ModelManager_1.ModelManager.WorldMapModel.MapScaleMin,
        OpenAreaId: 0,
      }),
      WorldMapController_1.WorldMapController.OpenView(2, !1, e));
  }
}
exports.DailyActiveTaskController = DailyActiveTaskController;
//# sourceMappingURL=DailyActivityTaskController.js.map
