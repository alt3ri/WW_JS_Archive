"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTileItem = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../../Core/Utils/Math/Vector2D"),
  StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
  HD_TEXTURE_NAME = new UE.FName("HDTexture"),
  HD_SCALAR_NAME = new UE.FName("UseHDPicture");
class MapTileItem {
  constructor(e) {
    (this.Param = e),
      (this.IsStreaming = !0),
      (this.IsVisible = !1),
      (this.Y__ = void 0),
      (this.z__ = void 0),
      (this.X__ = void 0),
      (this.Y__ = e),
      (this.z__ = Vector_1.Vector.Create(
        e.AnchorOffset.X,
        e.AnchorOffset.Y,
        0,
      ));
    e = e.MapTile;
    this.X__ = Vector2D_1.Vector2D.Create(2 * e.GetWidth(), 2 * e.GetHeight());
  }
  OnLoad() {
    const t = this.Y__.AssetData;
    var e = this.Y__.LoadMapTileCallBack,
      i = this.Y__.MapType;
    const s = this.Y__.TileX,
      o = this.Y__.TileY,
      r = this.Y__.MapTile;
    var _ = this.Y__.FogDefaultColor;
    const h = this.Y__.MapId;
    t && !StringUtils_1.StringUtils.IsEmpty(t.MapTilePath)
      ? (ResourceSystem_1.ResourceSystem.LoadAsync(
          t.MapTilePath,
          UE.Texture,
          e,
          102,
        ),
        Info_1.Info.IsPcOrGamepadPlatform() &&
          !StringUtils_1.StringUtils.IsEmpty(t.HdMapTilePath) &&
          2 === i &&
          ResourceSystem_1.ResourceSystem.LoadAsync(
            t.HdMapTilePath,
            UE.Texture,
            (e) => {
              void 0 === e &&
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Map",
                  63,
                  "[地图系统]->loadHdCallback 高清切块贴图为空",
                  ["MapId", h],
                  ["TileX", s],
                  ["TileY", o],
                  ["assetData", t],
                ),
                r.SetCustomMaterialScalarParameter(HD_SCALAR_NAME, 1),
                r.SetCustomMaterialTextureParameter(HD_TEXTURE_NAME, e);
            },
            102,
          ))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Map",
            63,
            "[地图系统]->切块贴图为空",
            ["MapId", h],
            ["TileX", s],
            ["TileY", o],
          ),
        r.SetTexture(void 0),
        r.SetColor(_));
  }
  OnUnload() {
    var e = this.Y__.MapTile,
      t = this.Y__.FogDefaultColor;
    e.SetTexture(void 0), e.SetColor(t);
  }
  GetPreloadThreshold() {
    return this.X__;
  }
  GetUiPosition() {
    return this.z__;
  }
}
exports.MapTileItem = MapTileItem;
//# sourceMappingURL=MapTileItem.js.map
