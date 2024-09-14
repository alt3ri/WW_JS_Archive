"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToDyMarkEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MapController_1 = require("../../Map/Controller/MapController"),
  MapDefine_1 = require("../../Map/MapDefine"),
  MapUtil_1 = require("../../Map/MapUtil"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  SkipTask_1 = require("./SkipTask");
class SkipToDyMarkEntity extends SkipTask_1.SkipTask {
  OnRun(e, r) {
    var e = Number(e),
      r = Number(r),
      o = MapUtil_1.MapUtil.GetConfigMarkBelongMapId(e, 7),
      a = ModelManager_1.ModelManager.CreatureModel.GetEntityData(r, o)
        ?.Transform?.Pos;
    a
      ? ((a = new MapDefine_1.DynamicMarkCreateInfo(
          Vector_1.Vector.Create(a.X ?? 0, a.Y ?? 0, a.Z ?? 0),
          e,
          7,
          void 0,
          void 0,
          !0,
        )),
        (e = ModelManager_1.ModelManager.MapModel.CreateMapMark(a)),
        MapController_1.MapController.RequestTrackMapMark(7, e, !0),
        (a = { MarkId: e, MarkType: 7 }),
        WorldMapController_1.WorldMapController.OpenView(2, !1, a))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SkipInterface",
          44,
          "实体或实体位置为空",
          ["entityId", r],
          ["mapId", o],
        ),
      this.Finish();
  }
}
exports.SkipToDyMarkEntity = SkipToDyMarkEntity;
//# sourceMappingURL=SkipToDyMarkEntity.js.map
