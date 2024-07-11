"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapResourceMgr = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  FAKE_TILE_COUNT = 2;
class MapResourceMgr {
  constructor() {
    (this.ARi = new Array()),
      (this.PRi = 2),
      (this.xRi = void 0),
      (this.wRi = new Map());
  }
  GetPreloadMapTile() {
    return this.wRi;
  }
  async BRi(s) {
    const i = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        s,
        UE.Texture,
        (t) => {
          t && this.wRi.set(s, t), i.SetResult(void 0);
        },
        102,
      ),
      i.Promise
    );
  }
  async PreloadMapAssets() {
    var t,
      s,
      i,
      e = ConfigManager_1.ConfigManager.MapConfig.GetAllTileConfig();
    this.ARi.splice(0, this.ARi.length);
    for (const l of e)
      StringUtils_1.StringUtils.IsEmpty(l.MapTilePath) ||
        ((t = (t = l.MapTilePath.split("/"))[t.length - 1]),
        (s = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
          l.MapTilePath,
        )),
        (i = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
          l.FogTilePath,
        )),
        this.ARi.push({ MapTilePath: s, FogTilePath: i, MapTileName: t }));
    let r = 0,
      o = 0;
    if (((this.xRi = { MaxX: -1, MinX: 1, MaxY: -1, MinY: 1 }), 1 === this.PRi))
      r = 4;
    else {
      for (const c of this.ARi) {
        var a = this.bRi(c.MapTileName),
          h = a.X,
          a = a.Y;
        (this.xRi.MaxX = Math.max(h, this.xRi.MaxX)),
          (this.xRi.MinX = Math.min(h, this.xRi.MinX)),
          (this.xRi.MaxY = Math.max(a, this.xRi.MaxY)),
          (this.xRi.MinY = Math.min(a, this.xRi.MinY));
      }
      o = this.xRi.MaxX - this.xRi.MinX + 1 + 2 * FAKE_TILE_COUNT;
      e = this.xRi.MaxY - this.xRi.MinY + 1 + 2 * FAKE_TILE_COUNT;
      r = o * e;
    }
    var n = new Map();
    for (const C of this.ARi) {
      var _ = this.bRi(C.MapTileName);
      n.set(_.X + "_" + _.Y, C);
    }
    var M = [];
    for (let t = 0; t < r; t++) {
      var u = Math.ceil((t + 1) / o),
        g = t - (u - 1) * o + this.xRi.MinX - FAKE_TILE_COUNT,
        u = -(u - 1) + this.xRi.MaxY + FAKE_TILE_COUNT,
        g = n.get(g + "_" + u);
      g &&
        (StringUtils_1.StringUtils.IsEmpty(g.MapTilePath) ||
          M.push(this.BRi(g.MapTilePath)),
        StringUtils_1.StringUtils.IsEmpty(g.FogTilePath) ||
          M.push(this.BRi(g.FogTilePath)),
        StringUtils_1.StringUtils.IsEmpty(g.HdMapTilePath) ||
          M.push(this.BRi(g.HdMapTilePath)));
    }
    await Promise.all(M);
  }
  Destroy() {
    this.wRi.clear();
  }
  bRi(t) {
    t = t.split("_");
    return {
      X: UE.KismetStringLibrary.Conv_StringToInt(t[2]),
      Y: UE.KismetStringLibrary.Conv_StringToInt(t[3]),
    };
  }
}
exports.MapResourceMgr = MapResourceMgr;
//# sourceMappingURL=MapResourceMgr.js.map
