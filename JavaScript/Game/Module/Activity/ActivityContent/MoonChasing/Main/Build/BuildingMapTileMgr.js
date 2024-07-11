"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingMapTileMgr = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise"),
  ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem"),
  StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  COLUMNS_NUM = 8,
  ROW_NUM = 4,
  MAPTILE_NAME_TEMPLATE = "ChasingMoonMap_{0}_{1}";
class BuildingMapTileMgr {
  constructor() {
    this.aRn = new Map();
  }
  async hRn(r, e) {
    const s = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.Texture,
        (e) => {
          e && this.aRn.set(r, e), s.SetResult(void 0);
        },
        102,
      ),
      s.Promise
    );
  }
  CreateTilesPathList() {
    var s = [];
    for (let r = 1; r <= ROW_NUM; r++)
      for (let e = 1; e <= COLUMNS_NUM; e++) {
        var i = StringUtils_1.StringUtils.Format(
            MAPTILE_NAME_TEMPLATE,
            r.toString(),
            e.toString(),
          ),
          i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
        s.push(i);
      }
    return s;
  }
  async LoadMapTiles() {
    var s = [];
    for (let r = 1; r <= ROW_NUM; r++)
      for (let e = 1; e <= COLUMNS_NUM; e++) {
        var i = StringUtils_1.StringUtils.Format(
            MAPTILE_NAME_TEMPLATE,
            r.toString(),
            e.toString(),
          ),
          t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
        s.push(this.hRn(i, t));
      }
    await Promise.all(s);
  }
}
exports.BuildingMapTileMgr = BuildingMapTileMgr;
//# sourceMappingURL=BuildingMapTileMgr.js.map
