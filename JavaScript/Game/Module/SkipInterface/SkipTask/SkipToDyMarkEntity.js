"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToDyMarkEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MapController_1 = require("../../Map/Controller/MapController");
const MapDefine_1 = require("../../Map/MapDefine");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const SkipTask_1 = require("./SkipTask");
class SkipToDyMarkEntity extends SkipTask_1.SkipTask {
  OnRun(e, r) {
    var e = Number(e);
    var r = Number(r);
    var r =
      ModelManager_1.ModelManager.CreatureModel.GetEntityData(r)?.Transform
        ?.Pos;
    r
      ? ((r = new MapDefine_1.DynamicMarkCreateInfo(
          Vector_1.Vector.Create(r.X ?? 0, r.Y ?? 0, r.Z ?? 0),
          e,
          7,
          void 0,
          void 0,
          !0,
        )),
        (e = ModelManager_1.ModelManager.MapModel.CreateMapMark(r)),
        MapController_1.MapController.RequestTrackMapMark(7, e, !0),
        (r = { MarkId: e, MarkType: 7 }),
        WorldMapController_1.WorldMapController.OpenView(2, !1, r))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("SkipInterface", 44, "实体或实体位置为空"),
      this.Finish();
  }
}
exports.SkipToDyMarkEntity = SkipToDyMarkEntity;
// # sourceMappingURL=SkipToDyMarkEntity.js.map
