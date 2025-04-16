"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressHelper = void 0);
const ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  LogReportController_1 = require("../../../../LogReport/LogReportController"),
  LogReportDefine_1 = require("../../../../LogReport/LogReportDefine");
class ActivityRegressHelper {
  static RefreshItemGrid(e, r, t, [i, o, a]) {
    var s = r.Id;
    switch (
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(s)
    ) {
      case 1:
        var g = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(s),
          g = {
            Data: r,
            ElementId: g.ElementId,
            Type: 2,
            ItemConfigId: s,
            BottomText: t.toString(),
            QualityId: g.QualityId,
            IsLockVisible: i,
            IsReceivableVisible: o,
            IsReceivedVisible: a,
            IsRedDotVisible: o,
          };
        e.Apply(g);
        break;
      case 3:
        g = {
          Data: r,
          Type: 3,
          ItemConfigId: s,
          BottomText: t.toString(),
          IsLockVisible: i,
          IsReceivableVisible: o,
          IsReceivedVisible: a,
          IsRedDotVisible: o,
        };
        e.Apply(g);
        break;
      default:
        g = {
          Data: r,
          Type: 4,
          ItemConfigId: s,
          BottomText: t.toString(),
          IsLockVisible: i,
          IsReceivableVisible: o,
          IsReceivedVisible: a,
          IsRedDotVisible: o,
        };
        e.Apply(g);
    }
  }
  static RefreshItemGridByData(e, r) {
    var t = r.ItemInfo,
      i = r.ItemCount,
      o = 0 === r.RewardState,
      a = 1 === r.RewardState,
      r = 2 === r.RewardState;
    ActivityRegressHelper.RefreshItemGrid(e, t, i, [o, a, r]);
  }
  static ReportRecallLog1023(e) {
    ActivityRegressHelper.aga("1023", e);
  }
  static ReportRecallLog1024(e, r = 0) {
    ActivityRegressHelper.aga("1024", e, r);
  }
  static aga(e, r, t = 0) {
    var i = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData,
      o = new LogReportDefine_1.ActivityRecallLogData();
    (o.event_id = e),
      (o.i_activity_id = i.Id),
      (o.i_activity_type = i.Type),
      (o.i_time_left = i.GetActivityOpenTimeLeft()),
      (o.i_type = r),
      (o.i_quest_id = t),
      (o.i_grade_id = ModelManager_1.ModelManager.ActivityRegressModel.Grade),
      LogReportController_1.LogReportController.LogReport(o);
  }
  static ReportRegressLog1060() {
    ActivityRegressHelper.sv1("1060");
  }
  static ReportRegressLog1061(e) {
    ActivityRegressHelper.sv1("1061", e);
  }
  static sv1(e, r = 0) {
    var t = new LogReportDefine_1.ActivityRegressLogData();
    (t.event_id = e),
      (t.i_activity_id =
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityId),
      (t.i_grade_id = ModelManager_1.ModelManager.ActivityRegressModel.Grade),
      (t.i_question_id = r),
      LogReportController_1.LogReportController.LogReport(t);
  }
  static GetMinExploreAreaInfo() {
    var e = ModelManager_1.ModelManager.MapModel.GetAllUnlockedAreas();
    if (!(void 0 === e || e.size <= 0)) {
      var r,
        t = [];
      for ([r] of e) {
        var i =
          ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(
            r,
          );
        void 0 !== i && t.push(i);
      }
      if (
        (t.sort((e, r) => e.GetProgress() - r.GetProgress()), !(t.length <= 0))
      ) {
        let e = void 0;
        for (const s of t) {
          var o = s.AreaId,
            o = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(o);
          if (void 0 !== o && 0 !== o.DeliveryMarkId) {
            var a = o.DeliveryMarkId,
              a = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(a);
            if (
              ModelManager_1.ModelManager.MapModel.CheckFogUnlocked(a.FogHide)
            ) {
              e = o;
              break;
            }
          }
        }
        return e;
      }
    }
  }
}
exports.ActivityRegressHelper = ActivityRegressHelper;
//# sourceMappingURL=ActivityRegressHelper.js.map
