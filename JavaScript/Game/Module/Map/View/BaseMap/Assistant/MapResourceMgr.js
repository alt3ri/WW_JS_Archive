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
    (this.AUi = new Array()),
      (this.PUi = 2),
      (this.xUi = void 0),
      (this.wUi = new Map());
  }
  GetPreloadMapTile() {
    return this.wUi;
  }
  async BUi(s) {
    const i = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        s,
        UE.Texture,
        (t) => {
          t && this.wUi.set(s, t), i.SetResult(void 0);
        },
        102,
      ),
      i.Promise
    );
  }
  async PreloadMapAssets(t) {
    var e,
      r,
      o,
      t = ConfigManager_1.ConfigManager.MapConfig.GetAllTileConfigByMapId(t);
    if (void 0 !== t) {
      this.AUi.splice(0, this.AUi.length);
      for (const l of t)
        StringUtils_1.StringUtils.IsEmpty(l.MapTilePath) ||
          ((e = (e = l.MapTilePath.split("/"))[e.length - 1]),
          (r = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
            l.MapTilePath,
          )),
          (o = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
            l.FogTilePath,
          )),
          this.AUi.push({ MapTilePath: r, FogTilePath: o, MapTileName: e }));
      let s = 0,
        i = 0;
      if (
        ((this.xUi = { MaxX: -1, MinX: 1, MaxY: -1, MinY: 1 }), 1 === this.PUi)
      )
        s = 4;
      else {
        for (const c of this.AUi) {
          var a = this.bUi(c.MapTileName),
            h = a.X,
            a = a.Y;
          (this.xUi.MaxX = Math.max(h, this.xUi.MaxX)),
            (this.xUi.MinX = Math.min(h, this.xUi.MinX)),
            (this.xUi.MaxY = Math.max(a, this.xUi.MaxY)),
            (this.xUi.MinY = Math.min(a, this.xUi.MinY));
        }
        i = this.xUi.MaxX - this.xUi.MinX + 1 + 2 * FAKE_TILE_COUNT;
        t = this.xUi.MaxY - this.xUi.MinY + 1 + 2 * FAKE_TILE_COUNT;
        s = i * t;
      }
      var n = new Map();
      for (const C of this.AUi) {
        var _ = this.bUi(C.MapTileName);
        n.set(_.X + "_" + _.Y, C);
      }
      var M = [];
      for (let t = 0; t < s; t++) {
        var u = Math.ceil((t + 1) / i),
          g = t - (u - 1) * i + this.xUi.MinX - FAKE_TILE_COUNT,
          u = -(u - 1) + this.xUi.MaxY + FAKE_TILE_COUNT,
          g = n.get(g + "_" + u);
        g &&
          (StringUtils_1.StringUtils.IsEmpty(g.MapTilePath) ||
            M.push(this.BUi(g.MapTilePath)),
          StringUtils_1.StringUtils.IsEmpty(g.FogTilePath) ||
            M.push(this.BUi(g.FogTilePath)),
          StringUtils_1.StringUtils.IsEmpty(g.HdMapTilePath) ||
            M.push(this.BUi(g.HdMapTilePath)));
      }
      await Promise.all(M);
    }
  }
  Destroy() {
    this.wUi.clear();
  }
  bUi(t) {
    t = t.split("_");
    return {
      X: UE.KismetStringLibrary.Conv_StringToInt(t[2]),
      Y: UE.KismetStringLibrary.Conv_StringToInt(t[3]),
    };
  }
}
exports.MapResourceMgr = MapResourceMgr;
//# sourceMappingURL=MapResourceMgr.js.map
