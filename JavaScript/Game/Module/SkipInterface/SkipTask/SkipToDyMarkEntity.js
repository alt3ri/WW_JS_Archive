"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToDyMarkEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MapController_1 = require("../../Map/Controller/MapController"),
  MapDefine_1 = require("../../Map/MapDefine"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  SkipTask_1 = require("./SkipTask");
class SkipToDyMarkEntity extends SkipTask_1.SkipTask {
  OnRun(e, r) {
    var e = Number(e),
      r = Number(r),
      a = ModelManager_1.ModelManager.WorldMapModel.SearchMarkMapConfigId(e);
    ModelManager_1.ModelManager.CreatureModel.GetEntityData(r, a)?.Transform
      ?.Pos
      ? ((e = new MapDefine_1.DynamicMarkCreateInfo({
          TrackTarget: r,
          MarkConfigId: e,
          MarkType: 7,
          DestroyOnUnTrack: !0,
          MapAndDungeonInfo: { MapConfigId: a },
        })),
        (e = ModelManager_1.ModelManager.MapModel.CreateMapMark(e)),
        MapController_1.MapController.RequestTrackMapMark({
          MarkType: 7,
          MarkId: e,
          Track: !0,
          TrackMode: 0,
        }),
        (e = { MarkId: e, MarkType: 7 }),
        WorldMapController_1.WorldMapController.OpenView(2, !1, e))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SkipInterface",
          43,
          "实体或实体位置为空",
          ["entityId", r],
          ["mapId", a],
        ),
      this.Finish();
  }
}
exports.SkipToDyMarkEntity = SkipToDyMarkEntity;
//# sourceMappingURL=SkipToDyMarkEntity.js.map
