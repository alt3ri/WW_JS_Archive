"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTileMgr = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  ConfigCommon_1 = require("../../../../../../Core/Config/ConfigCommon"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../../../Core/Utils/DataTableUtil"),
  Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../../GlobalData"),
  LevelConditionRegistry_1 = require("../../../../../LevelGamePlay/LevelConditions/LevelConditionRegistry"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  MapDefine_1 = require("../../../MapDefine"),
  MapUtil_1 = require("../../../MapUtil"),
  FAKE_TILE_COUNT = 2,
  MAP_TILE_COMMON = "T_CommonDefault_UI",
  MAX_COLOR = 255,
  FOG_TEXTURE_NAME = new UE.FName("FogTexture"),
  HD_TEXTURE_NAME = new UE.FName("HDTexture"),
  HD_SCALAR_NAME = new UE.FName("UseHDPicture"),
  DTPATH_AREA_ID_TO_MASK_CODE =
    "/Game/Aki/Data/PathLine/FogLine/DT_AreaToMaskCode.DT_AreaToMaskCode",
  DTPATH_FOG_AREA_ID =
    "/Game/Aki/Data/PathLine/FogLine/DT_FogToArea.DT_FogToArea";
class FogOpenParams {
  constructor() {
    (this.ExtraHdMapTileIndex = -1),
      (this.MapTileIndex = -1),
      (this.Channel = 0);
  }
}
class MapTileMgr {
  constructor(i, t, e, s, a, h, _, o, r, n) {
    (this.qUi = void 0),
      (this.GUi = void 0),
      (this.vKs = void 0),
      (this.NUi = void 0),
      (this.OUi = void 0),
      (this.wUi = new Map()),
      (this.AUi = void 0),
      (this.OpenArea = void 0),
      (this.xUi = void 0),
      (this.kUi = void 0),
      (this.FUi = void 0),
      (this.VUi = void 0),
      (this.HUi = void 0),
      (this.jUi = void 0),
      (this.tzs = void 0),
      (this.MKs = void 0),
      (this.SKs = 0),
      (this.PUi = 2),
      (this._Ui = 0),
      (this.WUi = new UE.Color(0, 0, 0, MAX_COLOR)),
      (this.nZa = new UE.Color(0, 0, 0, 0)),
      (this.lPn = new Map()),
      (this.DPn = new Map()),
      (this.RPn = -1),
      (this.MapOffset = void 0),
      (this.FakeOffset = 0),
      (this.KUi = Number.MAX_SAFE_INTEGER),
      (this.QUi = Number.MAX_SAFE_INTEGER),
      (this.XUi = Number.MAX_SAFE_INTEGER),
      (this.$Ui = Number.MAX_SAFE_INTEGER),
      (this.JUi = void 0),
      (this.zUi = void 0),
      (this.ZUi = void 0),
      (this.eAi = !1),
      (this.L7s = void 0),
      (this.D7s = void 0),
      (this.EKs = void 0),
      (this.Ata = 1),
      (this.yua = void 0),
      (this.Iua = void 0),
      (this.tAi = () => {
        this.NUi &&
          (this.NUi.GetOwner()?.K2_DestroyActor(), (this.NUi = void 0)),
          this.iAi();
      }),
      (this.oAi = (i) => {
        this.OpenArea && (this.OpenArea.add(i), this.rAi());
      }),
      (this.sWs = (i) => {
        if (this.OpenArea) {
          this.OpenArea.clear();
          for (const t of i.keys()) this.OpenArea.add(t);
          this.rAi();
        }
      }),
      (this.nAi = (i) => {
        if (this.zUi && 0 !== this.zUi.length && this.qUi)
          for (const e of this.zUi) {
            var t = e.MapTileIndex;
            0 <= t &&
              t < this.qUi.length &&
              ((t = this.qUi[t]), this.sAi(t, e.Channel, i));
          }
      }),
      (this.Ata = o),
      2 === this.Ata &&
        ((this.yua = ResourceSystem_1.ResourceSystem.Load(
          DTPATH_AREA_ID_TO_MASK_CODE,
          UE.DataTable,
        )),
        (this.Iua = ResourceSystem_1.ResourceSystem.Load(
          DTPATH_FOG_AREA_ID,
          UE.DataTable,
        ))),
      (this.kUi = i),
      (this.L7s = UE.NewArray(UE.UIItem)),
      this.L7s.Add(i),
      (this.D7s = (0, puerts_1.$ref)(this.L7s)),
      (this.FUi = t),
      (this.VUi = e),
      (this.HUi = s),
      (this.jUi = a),
      (this.MKs = s
        ?.GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      (this.SKs = s
        ?.GetOwner()
        .GetComponentByClass(UE.UISprite.StaticClass())
        ?.GetAlpha()),
      (this.tzs = n),
      this.tzs?.SetWidth(MapDefine_1.DETAIL_TILE_REALSIZE),
      this.tzs?.SetHeight(MapDefine_1.DETAIL_TILE_REALSIZE),
      this.VUi.SetColor(this.WUi),
      (this.PUi = h),
      (this._Ui = _),
      r && (this.wUi = r);
  }
  aAi() {
    (this.qUi = []),
      (this.GUi = []),
      (this.vKs = []),
      (this.AUi = []),
      (this.MapOffset = new UE.Vector4(0, 0, 0, 0)),
      (this.FakeOffset = 0);
  }
  Initialize() {
    this.aAi(), this.dde();
  }
  Dispose() {
    this.Cde(),
      this.AUi && (this.AUi.splice(0, this.AUi.length), (this.AUi = void 0)),
      this.qUi.forEach((i) => {
        i.SetTexture(void 0),
          i.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, void 0),
          i.SetCustomMaterialTextureParameter(HD_TEXTURE_NAME, void 0),
          this.VUi !== i && i.GetOwner()?.K2_DestroyActor();
      }),
      this.GUi.forEach((i) => {
        i.SetTexture(void 0), this.jUi !== i && i.GetOwner()?.K2_DestroyActor();
      }),
      this.yKs(),
      this.HUi?.SetAlpha(this.SKs),
      this.HUi?.SetUIActive(!1),
      this.NUi?.GetOwner()?.K2_DestroyActor(),
      (this.qUi = void 0),
      (this.GUi = void 0),
      (this.vKs = void 0),
      this.lPn.clear(),
      this.DPn.clear();
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MapOpenAreaChange,
      this.oAi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MapOpenAreaFullUpdate,
        this.sWs,
      ),
      (this.OUi = new LevelConditionRegistry_1.ConditionPassCallback(this.tAi));
    for (const t of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
      var i = t.ConditionId;
      0 < i &&
        LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(
          i,
          this.OUi,
        );
    }
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MapOpenAreaChange,
      this.oAi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MapOpenAreaFullUpdate,
        this.sWs,
      );
    for (const t of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
      var i = t.ConditionId;
      0 < i &&
        LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(
          i,
          this.OUi,
        );
    }
  }
  GetMapTiles() {
    return this.qUi;
  }
  OnMapSetUp() {
    1 !== this.PUi || MapUtil_1.MapUtil.IsInBigWorld(this._Ui)
      ? ((this.eAi = !0),
        this.hAi(),
        this.lAi(),
        ConfigManager_1.ConfigManager.MapConfig?.GetMultiMapAreaConfigList()?.forEach(
          (i) => {
            this.lPn.set(i.Block, i);
          },
        ),
        ConfigManager_1.ConfigManager.MapConfig?.GetAllSubMapConfig()?.forEach(
          (t) => {
            t.MapId === this._Ui &&
              t.Area.forEach((i) => {
                this.DPn.set(i, t.Id);
              });
          },
        ),
        (this.KUi = Number.MAX_SAFE_INTEGER),
        (this.QUi = Number.MAX_SAFE_INTEGER))
      : (this.eAi = !1);
  }
  _Ai(i, t) {
    return 1 === this.PUi ? t : i;
  }
  hAi() {
    this.OpenArea = new Set();
    for (var [i] of ModelManager_1.ModelManager.MapModel.GetAllUnlockedAreas())
      this.OpenArea.add(i);
  }
  lAi() {
    var i = ConfigManager_1.ConfigManager.MapConfig.GetAllTileConfigByMapId(
      this._Ui,
    );
    this.AUi.splice(0, this.AUi.length);
    for (const D of i)
      if (!StringUtils_1.StringUtils.IsEmpty(D.MapTilePath)) {
        var e = ModelManager_1.ModelManager.MapModel.CheckUnlockMapBlockIds(
            D.Block,
          ),
          s = D.MapTilePath.split("/"),
          s = s[s.length - 1];
        let i = "",
          t = "";
        t =
          0 !== e
            ? ((e =
                ConfigManager_1.ConfigManager.MapConfig.GetUnlockMapTileConfigById(
                  e,
                )),
              (i =
                ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
                  e.MapTilePath,
                )),
              ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
                e.MiniMapTilePath,
              ))
            : ((i =
                ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
                  D.MapTilePath,
                )),
              ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
                D.MiniMapTilePath,
              ));
        var e = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
            D.HdMapTilePath,
          ),
          a = this._Ai(i, t),
          h = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
            D.FogTilePath,
          ),
          _ = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
            D.MiniFogTilePath,
          ),
          h = this._Ai(h, _);
        this.AUi.push({
          MapTilePath: a,
          HdMapTilePath: e,
          FogTilePath: h,
          MapTileName: s,
        });
      }
    let t = 0,
      o = 0;
    if (1 === this.PUi) {
      (t = 4), (this.GUi.length = 0), this.GUi.push(this.jUi);
      for (let i = 1; i < t; ++i) {
        var r = LguiUtil_1.LguiUtil.CopyItem(this.jUi, this.HUi);
        this.GUi.push(r);
      }
    } else {
      this.xUi = { MaxX: -1, MinX: 1, MaxY: -1, MinY: 1 };
      for (const A of this.AUi) {
        var n = this.bUi(A.MapTileName),
          M = n.X,
          n = n.Y;
        (this.xUi.MaxX = Math.max(M, this.xUi.MaxX)),
          (this.xUi.MinX = Math.min(M, this.xUi.MinX)),
          (this.xUi.MaxY = Math.max(n, this.xUi.MaxY)),
          (this.xUi.MinY = Math.min(n, this.xUi.MinY));
      }
      o = this.xUi.MaxX - this.xUi.MinX + 1 + 2 * FAKE_TILE_COUNT;
      i = this.xUi.MaxY - this.xUi.MinY + 1 + 2 * FAKE_TILE_COUNT;
      t = o * i;
    }
    (this.qUi.length = 0), this.qUi.push(this.VUi);
    for (let i = 1; i < t; ++i) {
      var l = LguiUtil_1.LguiUtil.CopyItem(this.VUi, this.FUi);
      this.qUi.push(l);
    }
    var g = new Map();
    for (const O of this.AUi) {
      var v = this.bUi(O.MapTileName);
      2 === this.Ata &&
        (1 === this.PUi
          ? (O.FogTilePath = `/Game/Aki/UI/UIResources/UIWorldMap/Image/FogTilesV2Mini/T_FogTiles_${v.X}_${v.Y}_UI.T_FogTiles_${v.X}_${v.Y}_UI`)
          : (O.FogTilePath = `/Game/Aki/UI/UIResources/UIWorldMap/Image/FogTilesV2/T_FogTiles_${v.X}_${v.Y}_UI.T_FogTiles_${v.X}_${v.Y}_UI`)),
        g.set(v.X + "_" + v.Y, O);
    }
    var f,
      p,
      U,
      T,
      C,
      E,
      d,
      u = Vector2D_1.Vector2D.Create();
    for (let i = 0; i < this.qUi.length; i++) {
      const m = this.qUi[i];
      if (
        (m.SetWidth(MapDefine_1.DETAIL_TILE_SPACE),
        m.SetHeight(MapDefine_1.DETAIL_TILE_SPACE),
        1 === this.PUi)
      )
        this.uAi(m);
      else {
        let t = Math.ceil((i + 1) / o),
          e = i - (t - 1) * o;
        (e = e + this.xUi.MinX - FAKE_TILE_COUNT),
          (t = -(t - 1) + this.xUi.MaxY + FAKE_TILE_COUNT),
          (u.X = (e - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
          (u.Y = (t - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
          m.SetAnchorOffset(u.ToUeVector2D());
        const L = g.get(e + "_" + t);
        L &&
          ((f = (i) => {
            m.SetTexture(i),
              StringUtils_1.StringUtils.IsEmpty(L.FogTilePath)
                ? m.SetColor(this.WUi)
                : (void 0 === i &&
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Map",
                      64,
                      "[地图系统]->loadCallback 切块贴图为空",
                      ["MapId", this._Ui],
                      ["TileX", e],
                      ["TileY", t],
                      ["assetData", L],
                    ),
                  this.cAi(m, L.FogTilePath));
          }),
          m.SetCustomMaterialScalarParameter(HD_SCALAR_NAME, 0),
          GlobalData_1.GlobalData.IsPlayInEditor &&
            m.GetOwner()?.SetActorLabel(L.MapTileName),
          L && !StringUtils_1.StringUtils.IsEmpty(L.MapTilePath)
            ? ((p = this.wUi.get(L.MapTilePath))
                ? f(p)
                : ResourceSystem_1.ResourceSystem.LoadAsync(
                    L.MapTilePath,
                    UE.Texture,
                    f,
                    102,
                  ),
              Info_1.Info.IsPcOrGamepadPlatform() &&
                !StringUtils_1.StringUtils.IsEmpty(L.HdMapTilePath) &&
                2 === this.PUi &&
                ((p = (i) => {
                  void 0 === i &&
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Map",
                      64,
                      "[地图系统]->loadHdCallback 高清切块贴图为空",
                      ["MapId", this._Ui],
                      ["TileX", e],
                      ["TileY", t],
                      ["assetData", L],
                    ),
                    m.SetCustomMaterialScalarParameter(HD_SCALAR_NAME, 1),
                    m.SetCustomMaterialTextureParameter(HD_TEXTURE_NAME, i);
                }),
                this.wUi.has(L.HdMapTilePath)
                  ? p(this.wUi.get(L.HdMapTilePath))
                  : ResourceSystem_1.ResourceSystem.LoadAsync(
                      L.HdMapTilePath,
                      UE.Texture,
                      p,
                      102,
                    )))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Map",
                  64,
                  "[地图系统]->切块贴图为空",
                  ["MapId", this._Ui],
                  ["TileX", e],
                  ["TileY", t],
                ),
              m.SetTexture(void 0),
              m.SetColor(this.WUi)));
      }
    }
    this.iAi(),
      1 !== this.PUi &&
        ((i = this.xUi.MaxX),
        (U = 1 - this.xUi.MinX),
        (T = Math.max(i, U)),
        (C = this.xUi.MaxY),
        (E = 1 - this.xUi.MinY),
        (d = Math.max(C, E)),
        this.kUi.SetWidth(2 * T * MapDefine_1.DETAIL_TILE_REALSIZE),
        this.kUi.SetHeight(2 * d * MapDefine_1.DETAIL_TILE_REALSIZE),
        this.MapOffset.Set(
          Math.max(0, i - U) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
          Math.max(0, U - i) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
          Math.max(0, E - C) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
          Math.max(0, C - E) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
        ),
        (this.FakeOffset = MapDefine_1.DETAIL_TILE_REALSIZE * FAKE_TILE_COUNT));
  }
  bUi(i) {
    i = i.split("_");
    return {
      X: UE.KismetStringLibrary.Conv_StringToInt(i[2]),
      Y: UE.KismetStringLibrary.Conv_StringToInt(i[3]),
    };
  }
  cAi(i, t, e) {
    const s = i;
    this.sZa(t, (i) => {
      i ? this.uAi(s, i) : s.SetColor(this.WUi), e && e();
    });
  }
  aZa(i, t, e) {
    const s = i;
    this.sZa(t, (i) => {
      i ? this.hZa(s, i) : s.SetColor(this.nZa), e && e();
    });
  }
  sZa(i, t) {
    var e = this.wUi.get(i);
    e ? t(e) : ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.Texture, t, 102);
  }
  async iAi() {
    this.NUi && (this.NUi.GetOwner()?.K2_DestroyActor(), (this.NUi = void 0));
    var i = ModelManager_1.ModelManager.MapModel.GetCurMapBorderId(this._Ui),
      i = ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfig(
        i,
        this._Ui,
      ).PrefabPath,
      i = await LguiUtil_1.LguiUtil.LoadPrefabByAsync(i, this.kUi);
    (this.NUi = i.GetComponentByClass(UE.UIItem.StaticClass())),
      this.NUi.SetAnchorOffset(new UE.Vector2D(0, 0));
  }
  UpdateMinimapTiles(i) {
    if (1 === this.PUi && this.eAi) {
      var t = MapUtil_1.MapUtil.GetTilePosition(i, 0.5),
        e = t.X,
        t = t.Y,
        s = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(),
        a = this.DPn.has(s) ? this.DPn.get(s) : 0,
        h = this.RPn !== a;
      if (
        !(
          Math.abs(this.XUi - i.X) <
            MapDefine_1.MINI_MAP_UPDATE_GAP * MapDefine_1.UNIT &&
          Math.abs(this.$Ui - i.Y) <
            MapDefine_1.MINI_MAP_UPDATE_GAP * MapDefine_1.UNIT &&
          this.KUi === e &&
          this.QUi === t
        ) ||
        h
      ) {
        var _ = [e, t, e - 1, t, e, t - 1, e - 1, t - 1],
          o = this.izs(i, e, t),
          r = (this.rzs(this.qUi, _, o), 0 !== a && void 0 !== this.HUi);
        if (r) {
          this.rzs(this.GUi, _, o);
          for (let i = 0; i < this.GUi.length; i++) {
            var n = _[2 * i],
              M = _[2 * i + 1];
            if (0 < o[i].R) {
              (n =
                (n - 0.5 - 0.5 + o[i].B + o[i].R / 2) *
                MapDefine_1.DETAIL_TILE_SPACE),
                (M =
                  (M - 0.5 + 0.5 - o[i].A - o[i].G / 2) *
                  MapDefine_1.DETAIL_TILE_SPACE);
              this.tzs?.SetAnchorOffset(new UE.Vector2D(n, M));
              break;
            }
          }
        }
        if ((this.HUi?.SetUIActive(r), this.KUi !== e || this.QUi !== t || h)) {
          (this.KUi = e), (this.QUi = t);
          for (let i = 0; i < this.qUi.length; i++) {
            var l = _[2 * i],
              g = _[2 * i + 1];
            r && this.ozs(this.GUi[i], l, g, a, s), this.nzs(this.qUi[i], l, g);
          }
          r
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WorldMapSubMapChanged,
                a,
              )
            : EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WorldMapSubMapChanged,
                0,
              ),
            (this.RPn = a ?? 0);
        }
      }
    }
  }
  ozs(t, e, s, i, a) {
    var h = ConfigManager_1.ConfigManager.MapConfig.GetTileConfig(
      e.toString() + "_" + s.toString(),
      this._Ui,
    );
    if (!h || StringUtils_1.StringUtils.IsEmpty(h.MapTilePath))
      t.SetColor(this.nZa);
    else {
      var _ = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(i);
      if (_) {
        _ = _.MiniMapTilePath.find((i) => i.includes(e + "_" + s));
        if (_) {
          _ = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(_);
          if (StringUtils_1.StringUtils.IsEmpty(_))
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Map",
                35,
                "UpdateMinimapTiles 多层地图小地图获取地图块资源为空",
                ["x", e],
                ["y", s],
                ["MultiMapId", i],
                ["AreaId", a],
              ),
              t.SetColor(this.nZa);
          else {
            (i = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
              h.MiniFogTilePath,
            )),
              (a =
                ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
                  h.FogTilePath,
                ));
            const o = this._Ai(a, i);
            ResourceSystem_1.ResourceSystem.LoadAsync(_, UE.Texture, (i) => {
              i &&
                (t.SetTexture(i),
                StringUtils_1.StringUtils.IsEmpty(o)
                  ? t.SetColor(this.WUi)
                  : this.aZa(t, o));
            });
          }
        } else t.SetColor(this.nZa);
      } else t.SetColor(this.nZa);
    }
  }
  nzs(e, i, s) {
    var a = ConfigManager_1.ConfigManager.MapConfig.GetTileConfig(
      i.toString() + "_" + s.toString(),
      this._Ui,
    );
    if (a && !StringUtils_1.StringUtils.IsEmpty(a.MapTilePath)) {
      var h = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
          a.MapTilePath,
        ),
        _ = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
          a.MiniMapTilePath,
        ),
        o = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
          a.FogTilePath,
        ),
        a = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
          a.MiniFogTilePath,
        ),
        h = this._Ai(h, _);
      let t = this._Ai(o, a);
      2 === this.Ata &&
        (t =
          1 === this.PUi
            ? `/Game/Aki/UI/UIResources/UIWorldMap/Image/FogTilesV2Mini/T_FogTiles_${i}_${s}_UI.T_FogTiles_${i}_${s}_UI`
            : `/Game/Aki/UI/UIResources/UIWorldMap/Image/FogTilesV2/T_FogTiles_${i}_${s}_UI.T_FogTiles_${i}_${s}_UI`),
        ResourceSystem_1.ResourceSystem.LoadAsync(h, UE.Texture, (i) => {
          i?.IsValid() &&
            (e.SetTexture(i),
            StringUtils_1.StringUtils.IsEmpty(t)
              ? e.SetColor(this.WUi)
              : this.cAi(e, t));
        });
    }
  }
  izs(i, t, e) {
    var s = Vector2D_1.Vector2D.Create(i),
      t =
        (s.DivisionEqual(MapDefine_1.DETAIL_TILE_REALSIZE * MapDefine_1.UNIT),
        s.X - t + 1),
      s = s.Y + e,
      e =
        ((this.XUi = i.X),
        (this.$Ui = i.Y),
        MapDefine_1.MINI_MAP_RADIUS / MapDefine_1.DETAIL_TILE_REALSIZE),
      i = Math.min(t + e, 1),
      a = Math.max(t - e, 0),
      h = Math.min(s + e, 1),
      _ = Math.max(s - e, 0),
      i = new UE.LinearColor(i - a, h - _, a, _),
      h = new UE.LinearColor(2 * e - i.R, i.G, Math.min(1 - e + t, 1), _),
      t = new UE.LinearColor(i.R, 2 * e - i.G, a, Math.max(s - e - 1, 0));
    return [i, h, t, new UE.LinearColor(h.R, t.G, h.B, t.A)];
  }
  rzs(t, e, s) {
    var a = Vector2D_1.Vector2D.Create();
    for (let i = 0; i < t.length; i++) {
      var h = t[i],
        _ =
          (h.SetWidth(Math.max(s[i].R * MapDefine_1.DETAIL_TILE_REALSIZE, 0)),
          h.SetHeight(Math.max(s[i].G * MapDefine_1.DETAIL_TILE_REALSIZE, 0)),
          e[2 * i]),
        o = e[2 * i + 1];
      (a.X =
        (_ - 0.5 - 0.5 + s[i].B + s[i].R / 2) * MapDefine_1.DETAIL_TILE_SPACE),
        (a.Y =
          (o - 0.5 + 0.5 - s[i].A - s[i].G / 2) *
          MapDefine_1.DETAIL_TILE_SPACE),
        h.SetAnchorOffset(a.ToUeVector2D()),
        h.SetCustomMaterialVectorParameter(new UE.FName("UVCorrect"), s[i]);
    }
  }
  ShowSubMapByPosition(i, t, e = !1) {
    var s;
    1 === this.PUi ||
      0 === i ||
      ((s = this.HUi?.IsUIActiveInHierarchy()),
      this.CreateSubMapTile(i, -t, s),
      this.HUi?.SetUIActive(!0),
      s) ||
      this.IKs(!1, void 0, e);
  }
  HideSubMap() {
    this.HUi?.IsUIActiveInHierarchy()
      ? (this.vKs.forEach((i) => {
          this.TKs(i, !1);
        }),
        this.IKs(!0, () => {
          this.HUi?.SetUIActive(!1);
        }))
      : this.HUi?.SetUIActive(!1);
  }
  IKs(i = !1, t, e = !1) {
    var s = this.MKs?.GetPlayTween();
    s &&
      (this.yKs(),
      this.MKs.Stop(),
      (s.from = i ? this.SKs : 0),
      (s.to = i ? 0 : this.SKs),
      (s.duration = e ? 0 : 0.2),
      t &&
        ((i = (0, puerts_1.toManualReleaseDelegate)(t)),
        (this.EKs = s.RegisterOnComplete(i))),
      this.MKs.Play());
  }
  yKs() {
    void 0 !== this.EKs &&
      (this.MKs?.GetPlayTween().UnregisterOnComplete(this.EKs),
      (this.EKs = void 0));
  }
  TKs(i, t = !0) {
    var e,
      s,
      a = this.MKs?.GetPlayTween();
    a &&
      ((s = (e = i
        .GetOwner()
        .GetComponentByClass(
          UE.LGUIPlayTweenComponent.StaticClass(),
        ))?.GetPlayTween()),
      e.Stop(),
      (s.duration = a.duration - 0.25 * a.duration),
      (s.from = t ? 0 : i.GetAlpha()),
      (s.to = t ? i.GetAlpha() : 0),
      e.Play());
  }
  LKs(i, t = !0) {
    var i = i
        .GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      e = i?.GetPlayTween();
    i.Stop();
    (e.duration = t ? 0.3 : 0.15), i.Play();
  }
  GetSubMapFloorCountByGroupId(i) {
    return 0 === i
      ? 0
      : ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigByGroupId(i)
          .length;
  }
  GetSubMapGroupByRootItemPosition() {
    var i = UE.LGUIBPLibrary.SimulationLineTraceOnCenterScreen(
      GlobalData_1.GlobalData.World,
      this.D7s,
    );
    if (i && i.enterComponent) {
      var t = this.kUi.GetWidth(),
        e = this.kUi.GetHeight(),
        i = i.GetLocalPointInPlane(),
        s = MapUtil_1.MapUtil.GetTilePositionByUiPosition(i),
        a = s.X,
        s = s.Y,
        h = (i.X + t / 2) % MapDefine_1.DETAIL_TILE_SPACE,
        _ = (i.Y + e / 2) % MapDefine_1.DETAIL_TILE_SPACE,
        o = this.lPn.get(a + "_" + s);
      if (o)
        for (let t = 0; t < o?.MultiMapRangeList.length; t++) {
          var r = o?.MultiMapRangeList[t];
          for (let i = 0; i < r.ArrayInt.length; i += 4) {
            var n = r.ArrayInt[i],
              M = r.ArrayInt[i + 1],
              l = r.ArrayInt[i + 2],
              g = r.ArrayInt[i + 3];
            if (n <= h && h <= l && M <= _ && _ <= g) return o.MultiMapList[t];
          }
        }
    }
    return 0;
  }
  CreateSubMapTile(i, e, s = !1) {
    this.vKs = [];
    i = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigByGroupId(i),
    );
    if (i) {
      let t = 0;
      i.sort((i, t) =>
        i.Floor === e && t.Floor !== e
          ? 1
          : i.Floor !== e && t.Floor === e
            ? -1
            : i.Floor - t.Floor,
      );
      for (const o of i)
        for (const r of o.MapTilePath) {
          this.GUi &&
            !this.GUi[t] &&
            ((a = LguiUtil_1.LguiUtil.CopyItem(this.jUi, this.HUi)),
            this.GUi.push(a)),
            t++;
          var a = r.split("_"),
            h = Number(a[2]),
            _ = Number(a[3]);
          const n = this.GUi[t - 1];
          n.SetAnchorOffsetX((h - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
            n.SetAnchorOffsetY((_ - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
            n.SetHierarchyIndex(t),
            n.SetWidth(MapDefine_1.DETAIL_TILE_SPACE),
            n.SetHeight(MapDefine_1.DETAIL_TILE_SPACE);
          h = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(r);
          const M = e === o.Floor ? 255 : 20 + 20 * t;
          ResourceSystem_1.ResourceSystem.LoadAsync(h, UE.Texture, (i) => {
            n.SetUIActive(!0),
              i
                ? (n.SetColor(new UE.Color(M, M, M, 255)), n.SetTexture(i))
                : n.SetColor(this.WUi),
              s ? this.LKs(n, e === o.Floor) : this.TKs(n, !0),
              this.vKs.push(n);
          });
        }
      for (let i = t; i < this.GUi.length; i++) this.GUi[i].SetUIActive(!1);
    }
  }
  ConvertUiPositionToMapTilePosition(i) {
    return Vector2D_1.Vector2D.Create();
  }
  rAi() {
    for (const i of this.qUi) this.uAi(i);
    for (const t of this.GUi) this.hZa(t, void 0);
  }
  HandleAreaOpen(t) {
    if (
      ((this.zUi = []),
      this.JUi || (this.JUi = (0, puerts_1.toManualReleaseDelegate)(this.nAi)),
      2 === this.Ata)
    ) {
      var e = new UE.Color(0, 0, 0, 0),
        i = DataTableUtil_1.DataTableUtil.GetDataTableRow(
          this.yua,
          t.toString(),
        );
      if (void 0 === i)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Map", 48, "fog data not found", ["AreaID", t]);
      else {
        var s = new UE.LinearColor(0, (1 << i.Mask) / 255, 0, 0).ToFColor(!1);
        for (let i = 0; i < this.qUi.length; i++) {
          var a,
            h = this.qUi[i];
          h &&
            h.texture &&
            (!(a = h.texture.GetName()).startsWith("T_Common") &&
            ((a = (a = this.bUi(a)).X + "_" + a.Y),
            (a = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, a))) &&
            a.AreaIDs.Contains(t)
              ? (((a = new FogOpenParams()).MapTileIndex = i),
                (a.Channel = 2),
                this.zUi.push(a),
                h.SetColor(s))
              : h.SetColor(e));
        }
      }
    } else {
      for (let i = 0; i < this.qUi.length; i++) {
        var _,
          o = this.qUi[i],
          o = this.mAi(o, t);
        void 0 !== o &&
          (((_ = new FogOpenParams()).MapTileIndex = i),
          (_.Channel = o),
          this.zUi.push(_));
      }
      this.nAi(0);
    }
  }
  mAi(i, t) {
    if (i && i.texture) {
      i = i.texture.GetName();
      if (i !== MAP_TILE_COMMON) {
        (i = this.bUi(i)),
          (i = i.X + "_" + i.Y),
          (i = ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(
            i,
            this._Ui,
          ));
        if (i)
          return t === i.R
            ? 0
            : t === i.G
              ? 1
              : t === i.B
                ? 2
                : t === i.Alpha
                  ? 3
                  : void 0;
      }
    }
  }
  sAi(i, t, e) {
    var s = i.GetColor().ReinterpretAsLinear();
    switch (t) {
      case 0:
        s.R = e;
        break;
      case 1:
        s.G = e;
        break;
      case 2:
        s.B = e;
        break;
      case 3:
        s.A = e;
    }
    i.SetColor(s.ToFColor(!1));
  }
  HandleDelegate() {
    var i;
    this.JUi &&
      ((i = ConfigManager_1.ConfigManager.MapConfig.GetMapDissolveTime()),
      this.ZUi && this.ZUi.Kill(),
      (this.ZUi = UE.LTweenBPLibrary.FloatTo(
        GlobalData_1.GlobalData.World,
        this.JUi,
        0,
        1,
        i,
      )));
  }
  UnBindDelegate() {
    this.JUi &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.nAi),
      (this.JUi = void 0)),
      this.ZUi && (this.ZUi.Kill(), (this.ZUi = void 0));
  }
  uAi(i, t) {
    var e, s;
    i &&
      i.texture &&
      ((e = i.texture.GetName()) !== MAP_TILE_COMMON &&
      ((e = (e = this.bUi(e)).X + "_" + e.Y),
      (s = ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(
        e,
        this._Ui,
      )))
        ? (t?.IsValid() &&
            i.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, t),
          2 === this.Ata ? this.lZa(i, e) : ((t = this._Za(s)), i.SetColor(t)))
        : i.SetColor(this.WUi));
  }
  hZa(i, t) {
    var e, s;
    i &&
      i.texture &&
      ((e = i.texture.GetName()) !== MAP_TILE_COMMON &&
      (([e, s] = this.uZa(e)), e)
        ? (t?.IsValid() &&
            i.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, t),
          2 === this.Ata ? this.lZa(i, s) : ((t = this.cZa(e)), i.SetColor(t)))
        : i.SetColor(this.nZa));
  }
  uZa(i) {
    (i = this.bUi(i)), (i = i.X + "_" + i.Y);
    return [
      ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(i, this._Ui),
      i,
    ];
  }
  lZa(i, t) {
    const e = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, t);
    t = i.GetColor().ReinterpretAsLinear();
    let s = 255 * t.R;
    void 0 !== e &&
      void 0 !== this.OpenArea &&
      this.OpenArea?.forEach((i) => {
        e.AreaIDs.Contains(i) &&
          ((i = DataTableUtil_1.DataTableUtil.GetDataTableRow(
            this.yua,
            i.toString(),
          )),
          (s |= 1 << i.Mask));
      });
    t = new UE.LinearColor(s / 255, t.G, 0, 0).ToFColor(!1);
    i.SetColor(t);
  }
  _Za(i) {
    var t = this.OpenArea.has(i.R) ? MAX_COLOR : 0,
      e = this.OpenArea.has(i.G) ? MAX_COLOR : 0,
      s = this.OpenArea.has(i.B) ? MAX_COLOR : 0,
      i = this.OpenArea.has(i.Alpha) ? MAX_COLOR : 0;
    return new UE.Color(t, e, s, i);
  }
  cZa(i) {
    var t = this.OpenArea.has(i.R) ? MAX_COLOR : 0,
      e = this.OpenArea.has(i.G) ? MAX_COLOR : 0,
      s = this.OpenArea.has(i.B) ? MAX_COLOR : 0,
      i = this.OpenArea.has(i.Alpha) ? MAX_COLOR : 0;
    return t === MAX_COLOR ||
      e === MAX_COLOR ||
      s === MAX_COLOR ||
      i === MAX_COLOR
      ? new UE.Color(MAX_COLOR, MAX_COLOR, MAX_COLOR, MAX_COLOR)
      : new UE.Color(t, e, s, i);
  }
  InValidTile(i) {
    i = MapUtil_1.MapUtil.GetTilePosition(i);
    return (
      i.X >= this.xUi.MinX &&
      i.X <= this.xUi.MaxX &&
      i.Y >= this.xUi.MinY &&
      i.Y <= this.xUi.MaxY
    );
  }
}
exports.MapTileMgr = MapTileMgr;
//# sourceMappingURL=MapTileMgr.js.map
