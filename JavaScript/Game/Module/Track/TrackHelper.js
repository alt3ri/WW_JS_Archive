"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrackHelper = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  MapController_1 = require("../Map/Controller/MapController"),
  TaskMarkItem_1 = require("../Map/Marks/MarkItem/TaskMarkItem"),
  QuestController_1 = require("../QuestNew/Controller/QuestController");
class TrackHelper {
  static SetMarkItemTrack(r) {
    if (r instanceof TaskMarkItem_1.TaskMarkItem)
      if (0 !== r.NodeId) {
        var a = r.TreeConfigId;
        ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(a) ||
          QuestController_1.QuestNewController.RequestTrackQuest(
            r.TreeConfigId,
            !0,
            1,
            0,
          );
      } else {
        a = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
        let e = !1;
        (e = !!a && a.MarkId === r.MarkId) ||
          MapController_1.MapController.RequestTrackMapMark({
            MarkType: 12,
            MarkId: r.MarkId,
            Track: !0,
          });
      }
    else
      r.IsTracked ||
        MapController_1.MapController.RequestTrackMapMark({
          MarkType: r.MarkType,
          MarkId: r.MarkId,
          Track: !0,
        });
  }
}
exports.TrackHelper = TrackHelper;
//# sourceMappingURL=TrackHelper.js.map
