"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.mapComponentRegisterInfo = exports.MAP_VERSION = void 0);
const WorldMapInteractComponent_1 = require("../../WorldMap/ViewComponent/WorldMapInteractComponent"),
  WorldMapMoveComponent_1 = require("../../WorldMap/ViewComponent/WorldMapMoveComponent"),
  WorldMapMultiFloorComponent_1 = require("../../WorldMap/ViewComponent/WorldMapMultiFloorComponent"),
  WorldMapPlayerComponent_1 = require("../../WorldMap/ViewComponent/WorldMapPlayerComponent"),
  WorldMapQuickNavigateComponent_1 = require("../../WorldMap/ViewComponent/WorldMapQuickNavigateComponent"),
  WorldMapScaleComponent_1 = require("../../WorldMap/ViewComponent/WorldMapScaleComponent"),
  WorldMapSecondaryUiComponent_1 = require("../../WorldMap/ViewComponent/WorldMapSecondaryUiComponent"),
  MapLoggerComponent_1 = require("./MapLoggerComponent");
(exports.MAP_VERSION = "1"),
  (exports.mapComponentRegisterInfo = new Map([
    [0, MapLoggerComponent_1.MapLoggerComponent],
    [1, WorldMapSecondaryUiComponent_1.WorldMapSecondaryUiComponent],
    [2, WorldMapInteractComponent_1.WorldMapInteractComponent],
    [3, WorldMapMoveComponent_1.WorldMapMoveComponent],
    [4, WorldMapScaleComponent_1.WorldMapScaleComponent],
    [5, WorldMapPlayerComponent_1.WorldMapPlayerComponent],
    [6, WorldMapMultiFloorComponent_1.WorldMapMultiFloorComponent],
    [7, WorldMapQuickNavigateComponent_1.WorldMapQuickNavigateComponent],
  ]));
//# sourceMappingURL=MapBaseDefine.js.map
