"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTileMgr = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
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
  Info_1 = require("../../../../../../Core/Common/Info"),
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
  constructor(i, t, e, s, a, h, _, r, o) {
    (this.qUi = void 0),
      (this.GUi = void 0),
      (this.TWs = void 0),
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
      (this.nYs = void 0),
      (this.LWs = void 0),
      (this.DWs = 0),
      (this.PUi = 2),
      (this.WUi = new UE.Color(0, 0, 0, MAX_COLOR)),
      (this.lPn = new Map()),
      (this.IPn = new Map()),
      (this.TPn = -1),
      (this.MapOffset = void 0),
      (this.FakeOffset = 0),
      (this.KUi = Number.MAX_SAFE_INTEGER),
      (this.QUi = Number.MAX_SAFE_INTEGER),
      (this.XUi = Number.MAX_SAFE_INTEGER),
      (this.$Ui = Number.MAX_SAFE_INTEGER),
      (this.YUi = 0),
      (this.JUi = void 0),
      (this.zUi = void 0),
      (this.ZUi = void 0),
      (this.eAi = !1),
      (this.p7s = void 0),
      (this.v7s = void 0),
      (this.AWs = void 0),
      (this.gZs = 1),
      (this.Ela = void 0),
      (this.yla = void 0),
      (this.tAi = () => {
        this.NUi &&
          (this.NUi.GetOwner()?.K2_DestroyActor(), (this.NUi = void 0)),
          this.iAi();
      }),
      (this.oAi = (i) => {
        this.OpenArea && (this.OpenArea.add(i), this.rAi());
      }),
      (this.Ojs = (i) => {
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
      (this.gZs = _),
      2 === this.gZs &&
        ((this.Ela = ResourceSystem_1.ResourceSystem.Load(
          DTPATH_AREA_ID_TO_MASK_CODE,
          UE.DataTable,
        )),
        (this.yla = ResourceSystem_1.ResourceSystem.Load(
          DTPATH_FOG_AREA_ID,
          UE.DataTable,
        ))),
      (this.kUi = i),
      (this.p7s = UE.NewArray(UE.UIItem)),
      this.p7s.Add(i),
      (this.v7s = (0, puerts_1.$ref)(this.p7s)),
      (this.FUi = t),
      (this.VUi = e),
      (this.HUi = s),
      (this.jUi = a),
      (this.LWs = s
        ?.GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      (this.DWs = s
        ?.GetOwner()
        .GetComponentByClass(UE.UISprite.StaticClass())
        ?.GetAlpha()),
      (this.nYs = o),
      this.nYs?.SetWidth(MapDefine_1.DETAIL_TILE_REALSIZE),
      this.nYs?.SetHeight(MapDefine_1.DETAIL_TILE_REALSIZE),
      this.VUi.SetColor(this.WUi),
      (this.PUi = h),
      (this.YUi =
        ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId),
      r && (this.wUi = r);
  }
  aAi() {
    (this.qUi = []),
      (this.GUi = []),
      (this.TWs = []),
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
      this.UWs(),
      this.HUi?.SetAlpha(this.DWs),
      this.HUi?.SetUIActive(!1),
      this.NUi?.GetOwner()?.K2_DestroyActor(),
      (this.qUi = void 0),
      (this.GUi = void 0),
      (this.TWs = void 0),
      this.lPn.clear(),
      this.IPn.clear();
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MapOpenAreaChange,
      this.oAi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MapOpenAreaFullUpdate,
        this.Ojs,
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
        this.Ojs,
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
    1 === this.PUi && this.YUi !== MapDefine_1.BIG_WORLD_MAP_ID
      ? (this.eAi = !1)
      : ((this.eAi = !0),
        this.hAi(),
        this.lAi(),
        ConfigManager_1.ConfigManager.MapConfig?.GetMultiMapAreaConfigList()?.forEach(
          (i) => {
            this.lPn.set(i.Block, i);
          },
        ),
        ConfigManager_1.ConfigManager.MapConfig?.GetAllSubMapConfig()?.forEach(
          (t) => {
            t.Area.forEach((i) => {
              this.IPn.set(i, t.Id);
            });
          },
        ),
        (this.KUi = Number.MAX_SAFE_INTEGER),
        (this.QUi = Number.MAX_SAFE_INTEGER));
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
    var i = ConfigManager_1.ConfigManager.MapConfig.GetAllTileConfig();
    this.AUi.splice(0, this.AUi.length);
    for (const u of i)
      if (!StringUtils_1.StringUtils.IsEmpty(u.MapTilePath)) {
        var e = ModelManager_1.ModelManager.MapModel.CheckUnlockMapBlockIds(
            u.Block,
          ),
          s = u.MapTilePath.split("/"),
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
                  u.MapTilePath,
                )),
              ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
                u.MiniMapTilePath,
              ));
        var e = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
            u.HdMapTilePath,
          ),
          a = this._Ai(i, t),
          h = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
            u.FogTilePath,
          ),
          _ = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
            u.MiniFogTilePath,
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
      r = 0;
    if (1 === this.PUi) {
      (t = 4), (this.GUi.length = 0), this.GUi.push(this.jUi);
      for (let i = 1; i < t; ++i) {
        var o = LguiUtil_1.LguiUtil.CopyItem(this.jUi, this.HUi);
        this.GUi.push(o);
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
      r = this.xUi.MaxX - this.xUi.MinX + 1 + 2 * FAKE_TILE_COUNT;
      i = this.xUi.MaxY - this.xUi.MinY + 1 + 2 * FAKE_TILE_COUNT;
      t = r * i;
    }
    (this.qUi.length = 0), this.qUi.push(this.VUi);
    for (let i = 1; i < t; ++i) {
      var f = LguiUtil_1.LguiUtil.CopyItem(this.VUi, this.FUi);
      this.qUi.push(f);
    }
    var l = new Map();
    for (const m of this.AUi) {
      var v = this.bUi(m.MapTileName);
      2 === this.gZs &&
        (1 === this.PUi
          ? (m.FogTilePath = `/Game/Aki/UI/UIResources/UIWorldMap/Image/FogTilesV2Mini/T_FogTiles_${v.X}_${v.Y}_UI.T_FogTiles_${v.X}_${v.Y}_UI`)
          : (m.FogTilePath = `/Game/Aki/UI/UIResources/UIWorldMap/Image/FogTilesV2/T_FogTiles_${v.X}_${v.Y}_UI.T_FogTiles_${v.X}_${v.Y}_UI`)),
        l.set(v.X + "_" + v.Y, m);
    }
    var g,
      p,
      U,
      T,
      C,
      E = Vector2D_1.Vector2D.Create();
    for (let i = 0; i < this.qUi.length; i++) {
      const c = this.qUi[i];
      if (
        (c.SetWidth(MapDefine_1.DETAIL_TILE_SPACE),
        c.SetHeight(MapDefine_1.DETAIL_TILE_SPACE),
        1 === this.PUi)
      )
        this.uAi(c);
      else {
        var d = Math.ceil((i + 1) / r),
          D = i - (d - 1) * r + this.xUi.MinX - FAKE_TILE_COUNT,
          d = -(d - 1) + this.xUi.MaxY + FAKE_TILE_COUNT;
        (E.X = (D - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
          (E.Y = (d - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
          c.SetAnchorOffset(E.ToUeVector2D());
        const O = l.get(D + "_" + d);
        O &&
          ((D = (i) => {
            c.SetTexture(i),
              StringUtils_1.StringUtils.IsEmpty(O.FogTilePath)
                ? c.SetColor(this.WUi)
                : this.cAi(c, O.FogTilePath);
          }),
          c.SetCustomMaterialScalarParameter(HD_SCALAR_NAME, 0),
          GlobalData_1.GlobalData.IsPlayInEditor &&
            c.GetOwner()?.SetActorLabel(O.MapTileName),
          O && !StringUtils_1.StringUtils.IsEmpty(O.MapTilePath)
            ? ((d = this.wUi.get(O.MapTilePath))
                ? D(d)
                : ResourceSystem_1.ResourceSystem.LoadAsync(
                    O.MapTilePath,
                    UE.Texture,
                    D,
                    102,
                  ),
              Info_1.Info.IsPcOrGamepadPlatform() &&
                !StringUtils_1.StringUtils.IsEmpty(O.HdMapTilePath) &&
                2 === this.PUi &&
                ((d = (i) => {
                  c.SetCustomMaterialScalarParameter(HD_SCALAR_NAME, 1),
                    c.SetCustomMaterialTextureParameter(HD_TEXTURE_NAME, i);
                }),
                this.wUi.has(O.HdMapTilePath)
                  ? d(this.wUi.get(O.HdMapTilePath))
                  : ResourceSystem_1.ResourceSystem.LoadAsync(
                      O.HdMapTilePath,
                      UE.Texture,
                      d,
                      102,
                    )))
            : (c.SetTexture(void 0), c.SetColor(this.WUi)));
      }
    }
    this.iAi(),
      1 !== this.PUi &&
        ((i = this.xUi.MaxX),
        (g = 1 - this.xUi.MinX),
        (p = Math.max(i, g)),
        (U = this.xUi.MaxY),
        (T = 1 - this.xUi.MinY),
        (C = Math.max(U, T)),
        this.kUi.SetWidth(2 * p * MapDefine_1.DETAIL_TILE_REALSIZE),
        this.kUi.SetHeight(2 * C * MapDefine_1.DETAIL_TILE_REALSIZE),
        this.MapOffset.Set(
          Math.max(0, i - g) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
          Math.max(0, g - i) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
          Math.max(0, T - U) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
          Math.max(0, U - T) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
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
  cAi(i, t, e = !1, s) {
    const a = i;
    var i = (i) => {
        i ? this.uAi(a, i, e) : a.SetColor(this.WUi), s && s();
      },
      h = this.wUi.get(t);
    h ? i(h) : ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, i, 102);
  }
  async iAi() {
    this.NUi && (this.NUi.GetOwner()?.K2_DestroyActor(), (this.NUi = void 0));
    var i = ModelManager_1.ModelManager.MapModel.GetCurMapBorderId(),
      i =
        ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfig(
          i,
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
        a = this.IPn.has(s) ? this.IPn.get(s) : 0,
        h = this.TPn !== a;
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
          r = this.sYs(i, e, t),
          o = (this.aYs(this.qUi, _, r), 0 !== a && void 0 !== this.HUi);
        if (o) {
          this.aYs(this.GUi, _, r);
          for (let i = 0; i < this.GUi.length; i++) {
            var n = _[2 * i],
              M = _[2 * i + 1];
            if (0 < r[i].R) {
              (n =
                (n - 0.5 - 0.5 + r[i].B + r[i].R / 2) *
                MapDefine_1.DETAIL_TILE_SPACE),
                (M =
                  (M - 0.5 + 0.5 - r[i].A - r[i].G / 2) *
                  MapDefine_1.DETAIL_TILE_SPACE);
              this.nYs?.SetAnchorOffset(new UE.Vector2D(n, M));
              break;
            }
          }
        }
        if ((this.HUi?.SetUIActive(o), this.KUi !== e || this.QUi !== t || h)) {
          (this.KUi = e), (this.QUi = t);
          for (let i = 0; i < this.qUi.length; i++) {
            var f = _[2 * i],
              l = _[2 * i + 1];
            o && this.hYs(this.GUi[i], f, l, a, s), this.lYs(this.qUi[i], f, l);
          }
          o
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WorldMapSubMapChanged,
                a,
              )
            : EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WorldMapSubMapChanged,
                0,
              ),
            (this.TPn = a ?? 0);
        }
      }
    }
  }
  hYs(t, e, s, i, a) {
    var h = ConfigManager_1.ConfigManager.MapConfig.GetTileConfig(
      e.toString() + "_" + s.toString(),
      !0,
    );
    if (h && !StringUtils_1.StringUtils.IsEmpty(h.MapTilePath)) {
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
              );
          else {
            (i = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
              h.MiniFogTilePath,
            )),
              (a =
                ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
                  h.FogTilePath,
                ));
            const r = this._Ai(a, i);
            ResourceSystem_1.ResourceSystem.LoadAsync(_, UE.Texture, (i) => {
              i &&
                (t.SetTexture(i),
                StringUtils_1.StringUtils.IsEmpty(r)
                  ? t.SetColor(this.WUi)
                  : this.cAi(t, r, !0));
            });
          }
        }
      }
    }
  }
  lYs(e, i, s) {
    var a = ConfigManager_1.ConfigManager.MapConfig.GetTileConfig(
      i.toString() + "_" + s.toString(),
      !0,
    );
    if (a && !StringUtils_1.StringUtils.IsEmpty(a.MapTilePath)) {
      var h = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
          a.MapTilePath,
        ),
        _ = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
          a.MiniMapTilePath,
        ),
        r = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
          a.FogTilePath,
        ),
        a = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
          a.MiniFogTilePath,
        ),
        h = this._Ai(h, _);
      let t = this._Ai(r, a);
      2 === this.gZs &&
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
  sYs(i, t, e) {
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
  aYs(t, e, s) {
    var a = Vector2D_1.Vector2D.Create();
    for (let i = 0; i < t.length; i++) {
      var h = t[i],
        _ =
          (h.SetWidth(Math.max(s[i].R * MapDefine_1.DETAIL_TILE_REALSIZE, 0)),
          h.SetHeight(Math.max(s[i].G * MapDefine_1.DETAIL_TILE_REALSIZE, 0)),
          e[2 * i]),
        r = e[2 * i + 1];
      (a.X =
        (_ - 0.5 - 0.5 + s[i].B + s[i].R / 2) * MapDefine_1.DETAIL_TILE_SPACE),
        (a.Y =
          (r - 0.5 + 0.5 - s[i].A - s[i].G / 2) *
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
      this.RWs(!1, void 0, e);
  }
  HideSubMap() {
    this.HUi?.IsUIActiveInHierarchy()
      ? (this.TWs.forEach((i) => {
          this.xWs(i, !1);
        }),
        this.RWs(!0, () => {
          this.HUi?.SetUIActive(!1);
        }))
      : this.HUi?.SetUIActive(!1);
  }
  RWs(i = !1, t, e = !1) {
    var s = this.LWs?.GetPlayTween();
    s &&
      (this.UWs(),
      this.LWs.Stop(),
      (s.from = i ? this.DWs : 0),
      (s.to = i ? 0 : this.DWs),
      (s.duration = e ? 0 : 0.2),
      t &&
        ((i = (0, puerts_1.toManualReleaseDelegate)(t)),
        (this.AWs = s.RegisterOnComplete(i))),
      this.LWs.Play());
  }
  UWs() {
    void 0 !== this.AWs &&
      (this.LWs?.GetPlayTween().UnregisterOnComplete(this.AWs),
      (this.AWs = void 0));
  }
  xWs(i, t = !0) {
    var e,
      s,
      a = this.LWs?.GetPlayTween();
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
  PWs(i, t = !0) {
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
      this.v7s,
    );
    if (i && i.enterComponent) {
      var t = this.kUi.GetWidth(),
        e = this.kUi.GetHeight(),
        i = i.GetLocalPointInPlane(),
        s =
          0 <= i.X
            ? Math.ceil(i.X / MapDefine_1.DETAIL_TILE_SPACE)
            : Math.floor(i.X / MapDefine_1.DETAIL_TILE_SPACE),
        a =
          0 <= i.Y
            ? Math.floor(i.Y / MapDefine_1.DETAIL_TILE_SPACE)
            : Math.ceil(i.Y / MapDefine_1.DETAIL_TILE_SPACE),
        h = (i.X + t / 2) % MapDefine_1.DETAIL_TILE_SPACE,
        _ = (i.Y + e / 2) % MapDefine_1.DETAIL_TILE_SPACE,
        r = this.lPn.get(s + "_" + a);
      if (r)
        for (let t = 0; t < r?.MultiMapRangeList.length; t++) {
          var o = r?.MultiMapRangeList[t];
          for (let i = 0; i < o.ArrayInt.length; i += 4) {
            var n = o.ArrayInt[i],
              M = o.ArrayInt[i + 1],
              f = o.ArrayInt[i + 2],
              l = o.ArrayInt[i + 3];
            if (n <= h && h <= f && M <= _ && _ <= l) return r.MultiMapList[t];
          }
        }
    }
    return 0;
  }
  CreateSubMapTile(i, e, s = !1) {
    this.TWs = [];
    i = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigByGroupId(i),
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
      for (const r of i)
        for (const o of r.MapTilePath) {
          this.GUi &&
            !this.GUi[t] &&
            ((a = LguiUtil_1.LguiUtil.CopyItem(this.jUi, this.HUi)),
            this.GUi.push(a)),
            t++;
          var a = o.split("_"),
            h = Number(a[2]),
            _ = Number(a[3]);
          const n = this.GUi[t - 1];
          n.SetAnchorOffsetX((h - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
            n.SetAnchorOffsetY((_ - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
            n.SetHierarchyIndex(t),
            n.SetWidth(MapDefine_1.DETAIL_TILE_SPACE),
            n.SetHeight(MapDefine_1.DETAIL_TILE_SPACE);
          h = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o);
          const M = e === r.Floor ? 255 : 20 + 20 * t;
          ResourceSystem_1.ResourceSystem.LoadAsync(h, UE.Texture, (i) => {
            n.SetUIActive(!0),
              i
                ? (n.SetColor(new UE.Color(M, M, M, 255)), n.SetTexture(i))
                : n.SetColor(this.WUi),
              s ? this.PWs(n, e === r.Floor) : this.xWs(n, !0),
              this.TWs.push(n);
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
    for (const t of this.GUi) this.uAi(t, void 0, !0);
  }
  HandleAreaOpen(t) {
    if (
      ((this.zUi = []),
      this.JUi || (this.JUi = (0, puerts_1.toManualReleaseDelegate)(this.nAi)),
      2 === this.gZs)
    ) {
      var e = new UE.Color(0, 0, 0, 0),
        i = DataTableUtil_1.DataTableUtil.GetDataTableRow(
          this.Ela,
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
            (a = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.yla, a))) &&
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
          r = this.qUi[i],
          r = this.mAi(r, t);
        void 0 !== r &&
          (((_ = new FogOpenParams()).MapTileIndex = i),
          (_.Channel = r),
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
          (i = ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(i));
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
  uAi(i, e, t = !1) {
    if (i && i.texture) {
      var s = i.texture.GetName();
      if (s === MAP_TILE_COMMON) i.SetColor(this.WUi);
      else {
        var s = this.bUi(s),
          s = s.X + "_" + s.Y,
          a = ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(s);
        if (a)
          if (
            (e?.IsValid() &&
              i.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, e),
            2 === this.gZs)
          ) {
            const _ = DataTableUtil_1.DataTableUtil.GetDataTableRow(
              this.yla,
              s,
            );
            e = i.GetColor().ReinterpretAsLinear();
            let t = 255 * e.R;
            void 0 !== _ &&
              void 0 !== this.OpenArea &&
              this.OpenArea?.forEach((i) => {
                _.AreaIDs.Contains(i) &&
                  ((i = DataTableUtil_1.DataTableUtil.GetDataTableRow(
                    this.Ela,
                    i.toString(),
                  )),
                  (t |= 1 << i.Mask));
              });
            s = new UE.LinearColor(t / 255, e.G, 0, 0).ToFColor(!1);
            i.SetColor(s);
          } else {
            var e = this.OpenArea.has(a.R) ? MAX_COLOR : 0,
              s = this.OpenArea.has(a.G) ? MAX_COLOR : 0,
              h = this.OpenArea.has(a.B) ? MAX_COLOR : 0,
              a = this.OpenArea.has(a.Alpha) ? MAX_COLOR : 0;
            (e !== MAX_COLOR &&
              s !== MAX_COLOR &&
              h !== MAX_COLOR &&
              a !== MAX_COLOR) ||
            !t
              ? ((t = new UE.Color(e, s, h, a)), i.SetColor(t))
              : i.SetColor(
                  new UE.Color(MAX_COLOR, MAX_COLOR, MAX_COLOR, MAX_COLOR),
                );
          }
        else i.SetColor(this.WUi);
      }
    }
  }
}
exports.MapTileMgr = MapTileMgr;
//# sourceMappingURL=MapTileMgr.js.map
