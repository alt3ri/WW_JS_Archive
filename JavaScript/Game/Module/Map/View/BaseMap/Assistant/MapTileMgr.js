"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTileMgr = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  ConfigCommon_1 = require("../../../../../../Core/Config/ConfigCommon"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../../../Core/Utils/DataTableUtil"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../../GlobalData"),
  LevelConditionRegistry_1 = require("../../../../../LevelGamePlay/LevelConditions/LevelConditionRegistry"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiLayer_1 = require("../../../../../Ui/UiLayer"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  MapDefine_1 = require("../../../MapDefine"),
  MapUtil_1 = require("../../../MapUtil"),
  MapLogger_1 = require("../../../Misc/MapLogger"),
  MapTileItem_1 = require("./MapTile/MapTileItem"),
  FAKE_TILE_COUNT = 3,
  MAP_TILE_COMMON = "T_CommonDefault_UI",
  MAX_COLOR = 255,
  FOG_TEXTURE_NAME = new UE.FName("FogTexture"),
  HD_TEXTURE_NAME = new UE.FName("HDTexture"),
  HD_SCALAR_NAME = new UE.FName("UseHDPicture"),
  FOG_MASK_1 = new UE.FName("FogMask"),
  FOG_MASK_2 = new UE.FName("FogMask2"),
  FOG_TEXTURE_1 = FOG_TEXTURE_NAME,
  FOG_TEXTURE_2 = new UE.FName("FogTexture2"),
  FOG_UNLOCK_CENTERX_NAME = new UE.FName("CenterX"),
  FOG_UNLOCK_CENTERY_NAME = new UE.FName("CenterY"),
  DTPATH_AREA_ID_TO_MASK_CODE =
    "/Game/Aki/Data/PathLine/FogLine/DT_AreaToMaskCode.DT_AreaToMaskCode",
  DTPATH_FOG_AREA_ID =
    "/Game/Aki/Data/PathLine/FogLine/DT_FogToArea.DT_FogToArea",
  V2FogPath = "/Game/Aki/UI/UIResources/UIWorldMap/Image/FogTilesV2",
  V2FogMiniPath = "/Game/Aki/UI/UIResources/UIWorldMap/Image/FogTilesV2Mini";
class FogOpenParams {
  constructor() {
    (this.ExtraHdMapTileIndex = -1),
      (this.MapTileIndex = -1),
      (this.Channel = 0),
      (this.ChannelV2 = 0);
  }
}
class MapTileMgr {
  constructor(i) {
    (this.qUi = void 0),
      (this.zCc = []),
      (this.J__ = void 0),
      (this.GUi = void 0),
      (this.vKs = void 0),
      (this.NUi = void 0),
      (this.OUi = void 0),
      (this.wUi = new Map()),
      (this.AUi = void 0),
      (this.OpenFogSet = void 0),
      (this.qLc = -1),
      (this.xUi = void 0),
      (this.GLc = 0),
      (this.kUi = void 0),
      (this.FUi = void 0),
      (this.VUi = void 0),
      (this.HUi = void 0),
      (this.dil = !1),
      (this.jUi = void 0),
      (this.tzs = void 0),
      (this.MKs = void 0),
      (this.SKs = 0),
      (this.PUi = 2),
      (this._Ui = 0),
      (this.z3t = 0),
      (this.WUi = new UE.Color(0, 0, 0, MAX_COLOR)),
      (this.ish = new UE.Color(0, 0, 0, 0)),
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
      (this.h8l = void 0),
      (this.Yfe = !1),
      (this.YCc = 1),
      (this.FLc = []),
      (this.og1 = void 0),
      (this.tAi = () => {
        this.NUi &&
          (this.NUi.GetOwner()?.K2_DestroyActor(), (this.NUi = void 0)),
          this.LoadMapBorder();
      }),
      (this.NLc = () => {
        var i = 2 * (this.qUi.length - 1) + 1;
        if (!(this.FLc.length <= i))
          for (let i = 0; i < this.qUi.length; i++) {
            var t = this.FLc[2 * i],
              e = this.FLc[2 * i + 1];
            this.nzs(this.qUi[i], t, e);
          }
      }),
      (this.Vhl = (i) => {
        this.OpenFogSet && (this.OpenFogSet.add(i), this.rAi());
      }),
      (this.Hhl = (i) => {
        if (this.OpenFogSet) {
          this.OpenFogSet.clear();
          for (const t of i.keys()) this.OpenFogSet.add(t);
          this.rAi();
        }
      }),
      (this.nAi = (i) => {
        if (this.zUi && 0 !== this.zUi.length && this.qUi)
          for (const e of this.zUi) {
            var t = e.MapTileIndex;
            0 <= t &&
              t < this.qUi.length &&
              ((t = this.qUi[t]),
              2 === this.Ata
                ? this.Cil(t, e.ChannelV2, i)
                : this.sAi(t, e.Channel, i));
          }
      }),
      (this.Ata = i.MapVersion),
      2 === this.Ata &&
        ((this.yua = ResourceSystem_1.ResourceSystem.Load(
          DTPATH_AREA_ID_TO_MASK_CODE,
          UE.DataTable,
        )),
        (this.Iua = ResourceSystem_1.ResourceSystem.Load(
          DTPATH_FOG_AREA_ID,
          UE.DataTable,
        ))),
      (this.kUi = i.MapRootItem),
      (this.L7s = UE.NewArray(UE.UIItem)),
      this.L7s.Add(this.kUi),
      (this.D7s = (0, puerts_1.$ref)(this.L7s)),
      (this.FUi = i.TileContainer),
      (this.VUi = i.TileTexture),
      (this.HUi = i.SubMapContainer),
      (this.dil = !1),
      (this.jUi = i.SubMapTexture),
      (this.MKs = i.SubMapContainer?.GetOwner().GetComponentByClass(
        UE.LGUIPlayTweenComponent.StaticClass(),
      )),
      (this.SKs = i.SubMapContainer?.GetOwner()
        .GetComponentByClass(UE.UISprite.StaticClass())
        ?.GetAlpha()),
      (this.tzs = i.SubMapMask),
      this.tzs?.SetWidth(MapDefine_1.DETAIL_TILE_REALSIZE),
      this.tzs?.SetHeight(MapDefine_1.DETAIL_TILE_REALSIZE),
      this.VUi.SetColor(this.WUi),
      (this.PUi = i.MapType),
      (this._Ui = i.MapId),
      (this.z3t = i.InstanceDungeonId),
      i.PreloadTiles && (this.wUi = i.PreloadTiles),
      (this.YCc = i.Gravity ?? 1),
      (this.h8l = i);
  }
  aAi() {
    (this.qUi = []),
      (this.J__ = []),
      (this.GUi = []),
      (this.vKs = []),
      (this.AUi = []),
      (this.MapOffset = new UE.Vector4(0, 0, 0, 0)),
      (this.FakeOffset = 0);
  }
  Initialize() {
    this.aAi(), this.dde();
  }
  async OnChangeTilesAsync(i, t, e) {
    return this.z3t !== t || this.YCc !== e
      ? ((this._Ui = i),
        (this.z3t = t),
        (this.YCc = e),
        this.JCc(),
        this.ZCc(),
        this.aAi(),
        this.OnMapSetUp(),
        this.LoadMapBorder())
      : (MapLogger_1.MapLogger.Debug(
          63,
          "地图系统->切换地图地块失败， 地图参数没有发生变化",
          ["InstanceDungeonIdInner", this.z3t],
          ["instanceId", t],
          ["MapId", i],
          ["MapGravity", this.YCc],
          ["gravity", e],
        ),
        new Promise((i) => {
          i();
        }));
  }
  JCc() {
    this.qUi.forEach((i) => {
      i.SetTexture(void 0),
        2 === this.Ata
          ? (i.SetCustomMaterialTextureParameter(FOG_TEXTURE_1, void 0),
            i.SetCustomMaterialTextureParameter(FOG_TEXTURE_2, void 0))
          : i.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, void 0),
        i.SetCustomMaterialTextureParameter(HD_TEXTURE_NAME, void 0),
        this.VUi !== i && this.e0c(i);
    }),
      (this.qUi = void 0);
  }
  e0c(i) {
    i.SetUIActive(!1), this.zCc.push(i);
  }
  t0c() {
    var i;
    return 0 < this.zCc.length
      ? ((i = this.zCc.shift()).SetUIActive(!0), i)
      : LguiUtil_1.LguiUtil.CopyItem(this.VUi, this.FUi);
  }
  ZCc() {
    this.AUi && (this.AUi.splice(0, this.AUi.length), (this.AUi = void 0)),
      this.yKs(),
      (this.J__.length = 0),
      this.HUi?.SetAlpha(this.SKs),
      this.HUi?.SetUIActive(!1),
      (this.dil = !1),
      this.NUi?.GetOwner()?.K2_DestroyActor(),
      (this.qLc = -1);
  }
  Dispose() {
    this.Cde(),
      this.ZCc(),
      this.JCc(),
      this.zCc.forEach((i) => {
        this.VUi !== i && i.GetOwner()?.K2_DestroyActor();
      }),
      this.GUi.forEach((i) => {
        i.SetTexture(void 0), this.jUi !== i && i.GetOwner()?.K2_DestroyActor();
      }),
      (this.zCc.length = 0),
      (this.qUi = void 0),
      (this.J__ = void 0),
      (this.GUi = void 0),
      (this.vKs = void 0),
      (this.Yfe = !0);
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MapOpenFogChange,
      this.Vhl,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MapOpenFogFullUpdate,
        this.Hhl,
      ),
      1 === this.PUi &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.MiniMapForceUpdate,
          this.NLc,
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
      EventDefine_1.EEventName.MapOpenFogChange,
      this.Vhl,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MapOpenFogFullUpdate,
        this.Hhl,
      ),
      1 === this.PUi &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.MiniMapForceUpdate,
          this.NLc,
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
  GetMapTileItems() {
    return this.J__;
  }
  OnMapSetUp() {
    var i;
    1 !== this.PUi ||
    ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(this._Ui)
      ? ((this.eAi = !0),
        this.hAi(),
        this.lAi(),
        (i =
          ConfigManager_1.ConfigManager.MapConfig?.GetMultiMapAreaConfigList()),
        this.lPn.clear(),
        i?.forEach((i) => {
          i.MapConfigId === this._Ui &&
            i.GravityFlip === this.YCc &&
            this.lPn.set(i.Block, i);
        }),
        (i = ConfigManager_1.ConfigManager.MapConfig?.GetAllSubMapConfig()),
        this.DPn.clear(),
        i?.forEach((t) => {
          t.MapId === this._Ui &&
            t.Area.forEach((i) => {
              this.DPn.set(i, t.Id);
            });
        }),
        (this.KUi = Number.MAX_SAFE_INTEGER),
        (this.QUi = Number.MAX_SAFE_INTEGER))
      : (this.eAi = !1);
  }
  _Ai(i, t) {
    return 1 === this.PUi ? t : i;
  }
  hAi() {
    this.OpenFogSet = new Set();
    for (var [i] of ModelManager_1.ModelManager.MapModel.GetAllUnlockedFogs())
      this.OpenFogSet.add(i);
  }
  i0c() {
    var i = ConfigManager_1.ConfigManager.MapConfig.GetAllTileConfigByMapId(
      this._Ui,
    );
    this.AUi.splice(0, this.AUi.length);
    for (const r of i)
      if (
        !StringUtils_1.StringUtils.IsEmpty(r.MapTilePath) &&
        this.YCc === r.GravityFlip
      ) {
        var e = ModelManager_1.ModelManager.MapModel.CheckUnlockMapBlockIds(
            r.Block,
            this.YCc,
            this._Ui,
          ),
          s = r.MapTilePath.split("/"),
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
                  r.MapTilePath,
                )),
              ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
                r.MiniMapTilePath,
              ));
        var e = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
            r.HdMapTilePath,
          ),
          h = this._Ai(i, t),
          a = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
            r.FogTilePath,
          ),
          _ = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
            r.MiniFogTilePath,
          ),
          a = this._Ai(a, _);
        this.AUi.push({
          MapTilePath: h,
          HdMapTilePath: e,
          FogTilePath: a,
          MapTileName: s,
        });
      }
  }
  r0c() {
    let t = 0,
      i = 0;
    if (1 === this.PUi) {
      (t = 4), (this.GUi.length = 0), this.GUi.push(this.jUi);
      for (let i = 1; i < t; ++i) {
        var e = LguiUtil_1.LguiUtil.CopyItem(this.jUi, this.HUi);
        this.GUi.push(e);
      }
    } else {
      this.xUi = { MaxX: -1, MinX: 1, MaxY: -1, MinY: 1 };
      for (const r of this.AUi) {
        var s = this.bUi(r.MapTileName),
          h = s.X,
          s = s.Y;
        (this.xUi.MaxX = Math.max(h, this.xUi.MaxX)),
          (this.xUi.MinX = Math.min(h, this.xUi.MinX)),
          (this.xUi.MaxY = Math.max(s, this.xUi.MaxY)),
          (this.xUi.MinY = Math.min(s, this.xUi.MinY));
      }
      i = this.xUi.MaxX - this.xUi.MinX + 1 + 2 * FAKE_TILE_COUNT;
      var a = this.xUi.MaxY - this.xUi.MinY + 1 + 2 * FAKE_TILE_COUNT;
      t = i * a;
    }
    (this.qUi.length = 0),
      this.VUi.SetUIActive(!0),
      this.qUi.push(this.VUi),
      (this.J__.length = 0);
    for (let i = 1; i < t; ++i) {
      var _ = this.t0c();
      this.qUi.push(_);
    }
    return [t, i];
  }
  o0c() {
    var i = this.xUi.MaxX,
      t = 1 - this.xUi.MinX,
      e = Math.max(i, t),
      s = this.xUi.MaxY,
      h = 1 - this.xUi.MinY,
      a = Math.max(s, h);
    this.kUi.SetWidth(2 * e * MapDefine_1.DETAIL_TILE_REALSIZE),
      this.kUi.SetHeight(2 * a * MapDefine_1.DETAIL_TILE_REALSIZE),
      this.MapOffset.Set(
        Math.max(0, i - t) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
        Math.max(0, t - i) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
        Math.max(0, h - s) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
        Math.max(0, s - h) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
      ),
      (this.FakeOffset = MapDefine_1.DETAIL_TILE_REALSIZE * FAKE_TILE_COUNT);
  }
  lAi() {
    this.i0c();
    var [, i] = this.r0c(),
      t = ((this.GLc = i), new Map());
    for (const _ of this.AUi) {
      var e = this.bUi(_.MapTileName);
      if (2 === this.Ata) {
        var s = `${this._Ui}_${e.X}_` + e.Y,
          s = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, s);
        let i = V2FogPath;
        1 === this.PUi && (i = V2FogMiniPath),
          s &&
            (s.IsFogP1 &&
              (_.FogTilePath = `${i}/T_FogTiles_${this._Ui}_${e.X}_${e.Y}_UI_p1.T_FogTiles_${this._Ui}_${e.X}_${e.Y}_UI_p1`),
            s.IsFogP2) &&
            (_.FogTilePath2 = `${i}/T_FogTiles_${this._Ui}_${e.X}_${e.Y}_UI_p2.T_FogTiles_${this._Ui}_${e.X}_${e.Y}_UI_p2`);
      }
      t.set(e.X + "_" + e.Y, _);
    }
    var h,
      a = Vector2D_1.Vector2D.Create();
    for (let i = 0; i < this.qUi.length; i++) {
      const r = this.qUi[i];
      if (
        (r.SetWidth(MapDefine_1.DETAIL_TILE_SPACE),
        r.SetHeight(MapDefine_1.DETAIL_TILE_SPACE),
        1 === this.PUi)
      )
        this.uAi(r);
      else {
        const [n, o] = this.VLc(i),
          M =
            ((a.X = (n - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
            (a.Y = (o - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
            r.SetAnchorOffset(a.ToUeVector2D()),
            GlobalData_1.GlobalData.IsPlayInEditor &&
              r.GetOwner()?.SetActorLabel(`X:${n}_Y:` + o),
            t.get(n + "_" + o));
        M &&
          (GlobalData_1.GlobalData.IsPlayInEditor &&
            r.GetOwner()?.SetActorLabel(M.MapTileName),
          r.SetCustomMaterialScalarParameter(HD_SCALAR_NAME, 0),
          (h = {
            TileX: n,
            TileY: o,
            AnchorOffset: a,
            LoadMapTileCallBack: (i) => {
              var t;
              r.SetTexture(i),
                2 === this.Ata
                  ? ((t = `${this._Ui}_${n}_` + o),
                    (t = DataTableUtil_1.DataTableUtil.GetDataTableRow(
                      this.Iua,
                      t,
                    )) &&
                      (t.IsFogP1 && this.gil(r, M.FogTilePath, 1), t.IsFogP2) &&
                      this.gil(r, M.FogTilePath2, 2))
                  : StringUtils_1.StringUtils.IsEmpty(M.FogTilePath)
                    ? r.SetColor(this.WUi)
                    : (void 0 === i &&
                        Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "Map",
                          63,
                          "[地图系统]->loadCallback 切块贴图为空",
                          ["MapId", this._Ui],
                          ["TileX", n],
                          ["TileY", o],
                          ["assetData", M],
                        ),
                      this.cAi(r, M.FogTilePath));
            },
            AssetData: M,
            FogDefaultColor: this.WUi,
            MapType: this.PUi,
            MapTile: r,
            MapId: this._Ui,
          }),
          (h = new MapTileItem_1.MapTileItem(h)),
          this.J__.push(h));
      }
    }
    1 !== this.PUi && this.o0c();
  }
  VLc(i) {
    var t = Math.ceil((i + 1) / this.GLc);
    return [
      i - (t - 1) * this.GLc + this.xUi.MinX - FAKE_TILE_COUNT,
      -(t - 1) + this.xUi.MaxY + FAKE_TILE_COUNT,
    ];
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
    this.rsh(t, (i) => {
      i ? this.uAi(s, i) : s.SetColor(this.WUi), e && e();
    });
  }
  gil(i, t, e, s) {
    const h = i;
    this.rsh(t, (i) => {
      i ? this.uAi(h, i, e) : h.SetColor(this.WUi), s && s();
    });
  }
  osh(i, t, e, s = 1) {
    const h = i;
    this.rsh(t, (i) => {
      i ? this.nsh(h, i, s) : h.SetColor(this.ish), e && e();
    });
  }
  rsh(i, t) {
    var e = this.wUi.get(i);
    e ? t(e) : ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.Texture, t, 102);
  }
  async LoadMapBorder() {
    this.NUi && (this.NUi.GetOwner()?.K2_DestroyActor(), (this.NUi = void 0));
    var i = ModelManager_1.ModelManager.MapModel.GetCurMapBorderConfig(
      this._Ui,
      this.z3t,
      this.PUi,
      this.YCc,
    );
    void 0 !== i &&
      ((i = i.PrefabPath),
      (i = await LguiUtil_1.LguiUtil.LoadPrefabByAsync(i, this.kUi)),
      this.Yfe
        ? i?.K2_DestroyActor()
        : ((this.NUi = i.GetComponentByClass(UE.UIItem.StaticClass())),
          this.NUi.SetAnchorOffset(new UE.Vector2D(0, 0))));
  }
  UpdateMinimapTiles(i) {
    if (1 === this.PUi && this.eAi) {
      var t = MapUtil_1.MapUtil.GetTilePosition(i, 0.5),
        e = t.X,
        t = t.Y,
        s = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(),
        h = this.DPn.has(s) ? this.DPn.get(s) : 0,
        a = this.RPn !== h;
      if (
        !(
          Math.abs(this.XUi - i.X) <
            MapDefine_1.MINI_MAP_UPDATE_GAP * MapDefine_1.UNIT &&
          Math.abs(this.$Ui - i.Y) <
            MapDefine_1.MINI_MAP_UPDATE_GAP * MapDefine_1.UNIT &&
          this.KUi === e &&
          this.QUi === t
        ) ||
        a
      ) {
        this.FLc = [e, t, e - 1, t, e, t - 1, e - 1, t - 1];
        var _ = this.izs(i, e, t),
          r = (this.rzs(this.qUi, this.FLc, _), 0 !== h && void 0 !== this.HUi);
        if (r) {
          this.rzs(this.GUi, this.FLc, _);
          for (let i = 0; i < this.GUi.length; i++) {
            var n = this.FLc[2 * i],
              o = this.FLc[2 * i + 1];
            if (0 < _[i].R) {
              (n =
                (n - 0.5 - 0.5 + _[i].B + _[i].R / 2) *
                MapDefine_1.DETAIL_TILE_SPACE),
                (o =
                  (o - 0.5 + 0.5 - _[i].A - _[i].G / 2) *
                  MapDefine_1.DETAIL_TILE_SPACE);
              this.tzs?.SetAnchorOffset(new UE.Vector2D(n, o));
              break;
            }
          }
        }
        if (
          (this.HUi?.SetUIActive(r),
          (this.dil = r),
          this.KUi !== e || this.QUi !== t || a)
        ) {
          (this.KUi = e), (this.QUi = t);
          for (let i = 0; i < this.qUi.length; i++) {
            var M = this.FLc[2 * i],
              l = this.FLc[2 * i + 1];
            r && this.ozs(this.GUi[i], M, l, h, s), this.nzs(this.qUi[i], M, l);
          }
          r
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WorldMapSubMapChanged,
                h,
              )
            : EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WorldMapSubMapChanged,
                0,
              ),
            (this.RPn = h ?? 0);
        }
      }
    }
  }
  ozs(e, s, h, i, t) {
    var a = ConfigManager_1.ConfigManager.MapConfig.GetTileConfig(
      s.toString() + "_" + h.toString(),
      this._Ui,
      this.YCc,
    );
    if (!a || StringUtils_1.StringUtils.IsEmpty(a.MapTilePath))
      e.SetColor(this.ish);
    else {
      var _ = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(i);
      if (_) {
        _ = _.MiniMapTilePath.find((i) => i.includes(s + "_" + h));
        if (_) {
          _ = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(_);
          if (StringUtils_1.StringUtils.IsEmpty(_))
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Map",
                34,
                "UpdateMinimapTiles 多层地图小地图获取地图块资源为空",
                ["x", s],
                ["y", h],
                ["MultiMapId", i],
                ["AreaId", t],
              ),
              e.SetColor(this.ish);
          else if (2 === this.Ata) {
            i = this._Ui + `_${s}_` + h;
            const r = DataTableUtil_1.DataTableUtil.GetDataTableRow(
              this.Iua,
              i,
            );
            ResourceSystem_1.ResourceSystem.LoadAsync(_, UE.Texture, (t) => {
              if (t)
                if ((e.SetTexture(t), r && (r.IsFogP1 || r.IsFogP2))) {
                  e.SetColor(this.WUi);
                  let i = V2FogPath;
                  1 === this.PUi && (i = V2FogMiniPath),
                    r.IsFogP1 &&
                      ((t = `${i}/T_FogTiles_${this._Ui}_${s}_${h}_UI_p1.T_FogTiles_${this._Ui}_${s}_${h}_UI_p1`),
                      this.osh(e, t, void 0, 1)),
                    r.IsFogP2 &&
                      ((t = `${i}/T_FogTiles_${this._Ui}_${s}_${h}_UI_p2.T_FogTiles_${this._Ui}_${s}_${h}_UI_p2`),
                      this.osh(e, t, void 0, 2));
                } else e.SetColor(this.WUi);
            });
          } else {
            (t = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
              a.MiniFogTilePath,
            )),
              (i =
                ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
                  a.FogTilePath,
                ));
            const n = this._Ai(i, t);
            ResourceSystem_1.ResourceSystem.LoadAsync(_, UE.Texture, (i) => {
              i &&
                (e.SetTexture(i),
                StringUtils_1.StringUtils.IsEmpty(n)
                  ? e.SetColor(this.WUi)
                  : this.osh(e, n, void 0));
            });
          }
        } else e.SetColor(this.ish);
      } else e.SetColor(this.ish);
    }
  }
  nzs(e, s, h) {
    var a = ConfigManager_1.ConfigManager.MapConfig.GetTileConfig(
      s.toString() + "_" + h.toString(),
      this._Ui,
      this.YCc,
    );
    if (a && !StringUtils_1.StringUtils.IsEmpty(a.MapTilePath)) {
      var _ = ModelManager_1.ModelManager.MapModel.CheckUnlockMapBlockIds(
        a.Block,
        this.YCc,
        this._Ui,
      );
      let i = "",
        t = "";
      t =
        0 !== _
          ? ((_ =
              ConfigManager_1.ConfigManager.MapConfig.GetUnlockMapTileConfigById(
                _,
              )),
            (i = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
              _.MapTilePath,
            )),
            ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
              _.MiniMapTilePath,
            ))
          : ((i = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
              a.MapTilePath,
            )),
            ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
              a.MiniMapTilePath,
            ));
      _ = this._Ai(i, t);
      if (2 === this.Ata) {
        var r = this._Ui + `_${s}_` + h;
        const n = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, r);
        ResourceSystem_1.ResourceSystem.LoadAsync(_, UE.Texture, (t) => {
          if (t?.IsValid() && (e.SetTexture(t), n)) {
            let i = V2FogPath;
            1 === this.PUi && (i = V2FogMiniPath),
              n.IsFogP1 &&
                ((t = `${i}/T_FogTiles_${this._Ui}_${s}_${h}_UI_p1.T_FogTiles_${this._Ui}_${s}_${h}_UI_p1`),
                this.gil(e, t, 1)),
              n.IsFogP2 &&
                ((t = `${i}/T_FogTiles_${this._Ui}_${s}_${h}_UI_p2.T_FogTiles_${this._Ui}_${s}_${h}_UI_p2`),
                this.gil(e, t, 2));
          }
        });
      } else {
        (r = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
          a.FogTilePath,
        )),
          (a = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
            a.MiniFogTilePath,
          ));
        const o = this._Ai(r, a);
        ResourceSystem_1.ResourceSystem.LoadAsync(_, UE.Texture, (i) => {
          i?.IsValid() &&
            (e.SetTexture(i),
            StringUtils_1.StringUtils.IsEmpty(o)
              ? e.SetColor(this.WUi)
              : this.cAi(e, o));
        });
      }
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
      h = Math.max(t - e, 0),
      a = Math.min(s + e, 1),
      _ = Math.max(s - e, 0),
      i = new UE.LinearColor(i - h, a - _, h, _),
      a = new UE.LinearColor(2 * e - i.R, i.G, Math.min(1 - e + t, 1), _),
      t = new UE.LinearColor(i.R, 2 * e - i.G, h, Math.max(s - e - 1, 0));
    return [i, a, t, new UE.LinearColor(a.R, t.G, a.B, t.A)];
  }
  rzs(t, e, s) {
    var h = Vector2D_1.Vector2D.Create();
    for (let i = 0; i < t.length; i++) {
      var a = t[i],
        _ =
          (a.SetWidth(Math.max(s[i].R * MapDefine_1.DETAIL_TILE_REALSIZE, 0)),
          a.SetHeight(Math.max(s[i].G * MapDefine_1.DETAIL_TILE_REALSIZE, 0)),
          e[2 * i]),
        r = e[2 * i + 1];
      (h.X =
        (_ - 0.5 - 0.5 + s[i].B + s[i].R / 2) * MapDefine_1.DETAIL_TILE_SPACE),
        (h.Y =
          (r - 0.5 + 0.5 - s[i].A - s[i].G / 2) *
          MapDefine_1.DETAIL_TILE_SPACE),
        a.SetAnchorOffset(h.ToUeVector2D()),
        a.SetCustomMaterialVectorParameter(new UE.FName("UVCorrect"), s[i]);
    }
  }
  ShowSubMapByPosition(i, t, e = !1) {
    var s;
    1 === this.PUi ||
      0 === i ||
      ((s = this.dil),
      this.CreateSubMapTile(i, -t, s),
      this.HUi?.SetUIActive(!0),
      (this.dil = !0),
      s) ||
      this.IKs(!1, void 0, e);
  }
  HideSubMap() {
    this.dil
      ? (this.vKs.forEach((i) => {
          this.TKs(i, !1);
        }),
        this.IKs(!0, () => {
          this.HUi?.SetUIActive(!1);
        }))
      : this.HUi?.SetUIActive(!1),
      (this.dil = !1);
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
        ((this.og1 = () => {
          t(), this.ng1();
        }),
        (i = (0, puerts_1.toManualReleaseDelegate)(this.og1)),
        (this.EKs = s.RegisterOnComplete(i))),
      this.MKs.Play());
  }
  ng1() {
    this.og1 &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.og1),
      (this.og1 = void 0));
  }
  yKs() {
    void 0 !== this.EKs &&
      (this.MKs?.GetPlayTween().UnregisterOnComplete(this.EKs),
      (this.EKs = void 0)),
      this.ng1();
  }
  TKs(i, t = !0) {
    var e,
      s,
      h = this.MKs?.GetPlayTween();
    h &&
      ((s = (e = i
        .GetOwner()
        .GetComponentByClass(
          UE.LGUIPlayTweenComponent.StaticClass(),
        ))?.GetPlayTween()),
      e.Stop(),
      (s.duration = h.duration - 0.25 * h.duration),
      (s.from = t ? 0 : i.GetAlpha()),
      (s.to = t ? i.GetAlpha() : 0),
      e.Play());
  }
  LKs(i, t = !0) {
    var e = i
        .GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      s = e?.GetPlayTween();
    e.Stop();
    (s.duration = t ? 0.3 : 0.15),
      t ? ((s.from = i.GetAlpha()), (s.to = 1)) : (s.to = i.GetAlpha()),
      e.Play();
  }
  GetWorldMapCenterAreaId() {
    var i = this.GetSubMapGroupByRootItemPosition(),
      i = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigByGroupId(i);
    if (i && 0 < i.length) {
      i = i.find((i) => -1 === i.Floor);
      if (i && 0 < i.Area.length) return i.Area[0];
    }
    return 0;
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
        h = s.X,
        s = s.Y,
        a = (i.X + t / 2) % MapDefine_1.DETAIL_TILE_SPACE,
        _ = (i.Y + e / 2) % MapDefine_1.DETAIL_TILE_SPACE,
        r = this.lPn.get(h + "_" + s);
      if (r)
        for (let t = 0; t < r?.MultiMapRangeList.length; t++) {
          var n = r?.MultiMapRangeList[t];
          for (let i = 0; i < n.ArrayInt.length; i += 4) {
            var o = n.ArrayInt[i],
              M = n.ArrayInt[i + 1],
              l = n.ArrayInt[i + 2],
              v = n.ArrayInt[i + 3];
            if (o <= a && a <= l && M <= _ && _ <= v) return r.MultiMapList[t];
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
      for (const r of i)
        for (const n of r.MapTilePath) {
          this.GUi &&
            !this.GUi[t] &&
            ((h = LguiUtil_1.LguiUtil.CopyItem(this.jUi, this.HUi)),
            this.GUi.push(h)),
            t++;
          var h = n.split("_"),
            a = Number(h[2]),
            _ = Number(h[3]);
          const o = this.GUi[t - 1];
          s && o.SetColor(this.ish),
            o.SetAnchorOffsetX((a - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
            o.SetAnchorOffsetY((_ - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
            o.SetHierarchyIndex(t),
            o.SetWidth(MapDefine_1.DETAIL_TILE_SPACE),
            o.SetHeight(MapDefine_1.DETAIL_TILE_SPACE);
          a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(n);
          const M = e === r.Floor ? 255 : 20 + 20 * t;
          ResourceSystem_1.ResourceSystem.LoadAsync(a, UE.Texture, (i) => {
            i
              ? (o.SetTexture(i), o.SetColor(new UE.Color(M, M, M, 255)))
              : o.SetColor(this.WUi),
              o.SetUIActive(!0),
              s ? this.LKs(o, e === r.Floor) : this.TKs(o, !0),
              this.vKs.push(o);
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
    for (const t of this.GUi) this.nsh(t, void 0);
  }
  HandleFogAreaOpen(e) {
    if (
      ((this.zUi = []),
      this.JUi || (this.JUi = (0, puerts_1.toManualReleaseDelegate)(this.nAi)),
      (this.qLc = e),
      2 === this.Ata)
    ) {
      var i = DataTableUtil_1.DataTableUtil.GetDataTableRow(
        this.yua,
        e.toString(),
      );
      if (void 0 === i)
        return void (
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Map", 63, "fog data not found", ["fogId", e])
        );
      var s,
        h,
        a = i.Mask;
      let t = !1;
      for (let i = 0; i < this.qUi.length; i++)
        this.qUi[i] &&
          (([h, s] = this.VLc(i)),
          (h = this._Ui + `_${h}_` + s),
          (s = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, h))) &&
          s.AreaFogIDs &&
          s.AreaFogIDs.Contains(e) &&
          (((h = new FogOpenParams()).MapTileIndex = i),
          this.zUi.push(h),
          (h.ChannelV2 = a),
          t ||
            ((s = this.Mwl(e)),
            (h = Vector_1.Vector.Create(s.X, s.Y, s.Z)),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.MoveWorldMapToPosition,
              h,
            ),
            (t = !0)));
    } else
      for (let i = 0; i < this.qUi.length; i++) {
        var t,
          _ = this.qUi[i],
          _ = this.mAi(_, e);
        void 0 !== _ &&
          (((t = new FogOpenParams()).MapTileIndex = i),
          (t.Channel = _),
          this.zUi.push(t));
      }
    this.nAi(0);
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
  Cil(i, t, e) {
    if (t < 4) {
      var s = i.CustomVectorParameterTMap.Get(FOG_MASK_1),
        h = s || new UE.LinearColor(0, 0, 0, 0);
      switch (t) {
        case 0:
          h.R = e;
          break;
        case 1:
          h.G = e;
          break;
        case 2:
          h.B = e;
          break;
        case 3:
          h.A = e;
      }
      i.SetCustomMaterialVectorParameter(FOG_MASK_1, h);
    } else {
      var s = i.CustomVectorParameterTMap.Get(FOG_MASK_2),
        a = s || new UE.LinearColor(0, 0, 0, 0);
      switch (t) {
        case 4:
          a.R = e;
          break;
        case 5:
          a.G = e;
          break;
        case 6:
          a.B = e;
          break;
        case 7:
          a.A = e;
      }
      i.SetCustomMaterialVectorParameter(FOG_MASK_2, a);
    }
  }
  ywl() {
    if (2 === this.Ata && this.zUi && 0 !== this.zUi.length && this.qUi) {
      let i = void 0;
      for (const a of this.zUi) {
        var t,
          e,
          s,
          h = a.MapTileIndex;
        void 0 === i &&
          ((s = this.h8l.FogUnlockItem),
          (e = UiLayer_1.UiLayer.UiRootItem.GetRenderCanvas()),
          (t = s.GetAnchorOffset()),
          (s = s.GetPositionInViewPort(!0)),
          (e = e.GetViewportSize()),
          (i = new UE.Vector2D(s.X / e.X, s.Y / e.Y)),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Map",
            63,
            "Fog unlock center screen uv",
            ["anchorOffset", t],
            ["screenUv", i],
          ),
          0 <= h &&
            h < this.qUi.length &&
            ((s = this.qUi[h]).SetCustomMaterialScalarParameter(
              FOG_UNLOCK_CENTERX_NAME,
              i?.X ?? 0.5,
            ),
            s.SetCustomMaterialScalarParameter(
              FOG_UNLOCK_CENTERY_NAME,
              i?.Y ?? 0.5,
            ));
      }
    }
  }
  Mwl(i) {
    var t = ConfigManager_1.ConfigManager.WorldMapConfig.GetMapFogConfig(i);
    return void 0 === t
      ? (MapLogger_1.MapLogger.Error(
          63,
          `FogId ${i} not found in config, can not unlock material effect`,
        ),
        new UE.VectorDouble(0, 0, 0))
      : ((i = t.FogUnlockPosition), new UE.VectorDouble(i[0], i[1], i[2]));
  }
  HandleDelegate() {
    var i;
    this.JUi &&
      (this.ywl(),
      (i = ConfigManager_1.ConfigManager.MapConfig.GetMapDissolveTime()),
      this.ZUi?.IsValid() && (this.ZUi.Kill(), (this.ZUi = void 0)),
      (this.ZUi = UE.LTweenBPLibrary.FloatTo(
        GlobalData_1.GlobalData.World,
        this.JUi,
        0,
        1,
        i,
      )),
      (this.qLc = -1));
  }
  UnBindDelegate() {
    this.JUi &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.nAi),
      (this.JUi = void 0)),
      this.ZUi?.IsValid() && (this.ZUi.Kill(), (this.ZUi = void 0));
  }
  uAi(i, t, e = 0) {
    var s;
    i &&
      i.texture &&
      ((s = i.texture.GetName()) === MAP_TILE_COMMON
        ? i.SetColor(this.WUi)
        : ((s = (s = this.bUi(s)).X + "_" + s.Y),
          2 === this.Ata
            ? (t?.IsValid() &&
                (1 === e
                  ? i.SetCustomMaterialTextureParameter(FOG_TEXTURE_1, t)
                  : i.SetCustomMaterialTextureParameter(FOG_TEXTURE_2, t)),
              this.ssh(i, s))
            : (e = ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(
                  s,
                  this._Ui,
                ))
              ? (t?.IsValid() &&
                  i.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, t),
                (s = this.ash(e)),
                i.SetColor(s))
              : i.SetColor(this.WUi)));
  }
  nsh(t, i, e = 0) {
    if (t && t.texture) {
      var s = t.texture.GetName();
      if (s === MAP_TILE_COMMON) t.SetColor(this.ish);
      else {
        var [s, h] = this.hsh(s);
        if (2 === this.Ata) {
          var h = this._Ui + "_" + h;
          const a = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, h);
          void 0 !== a &&
            void 0 !== this.OpenFogSet &&
            this.OpenFogSet?.forEach((i) => {
              a.AreaFogIDs.Contains(i) &&
                t.SetColor(
                  new UE.Color(MAX_COLOR, MAX_COLOR, MAX_COLOR, MAX_COLOR),
                );
            });
        } else
          s
            ? (i?.IsValid() &&
                t.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, i),
              (h = this.lsh(s)),
              t.SetColor(h))
            : t.SetColor(this.ish);
      }
    }
  }
  hsh(i) {
    (i = this.bUi(i)), (i = i.X + "_" + i.Y);
    return [
      ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(i, this._Ui),
      i,
    ];
  }
  ssh(i, t) {
    t = this._Ui + "_" + t;
    const e = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, t),
      s = [0, 0, 0, 0, 0, 0, 0, 0];
    if (
      (void 0 !== e &&
        void 0 !== this.OpenFogSet &&
        this.OpenFogSet?.forEach((i) => {
          this.qLc !== i &&
            e.AreaFogIDs.Contains(i) &&
            ((i = DataTableUtil_1.DataTableUtil.GetDataTableRow(
              this.yua,
              i.toString(),
            )),
            (s[i.Mask] = 1));
        }),
      ModelManager_1.ModelManager.WorldMapModel.EnableInstanceDungeonFilterMark)
    )
      for (let i = 0; i < s.length; i++) s[i] = 1;
    var h = new UE.LinearColor(s[0], s[1], s[2], s[3]),
      a = new UE.LinearColor(s[4], s[5], s[6], s[7]),
      _ = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, t);
    if (this.OpenFogSet && _)
      for (let i = 0; i < _.AreaFogIDs.Num(); i++) {
        var r = _.AreaFogIDs.Get(i);
        if (this.qLc !== r && this.OpenFogSet.has(r))
          switch (
            DataTableUtil_1.DataTableUtil.GetDataTableRow(
              this.yua,
              r.toString(),
            ).Mask
          ) {
            case 0:
              h.R = 1;
              break;
            case 1:
              h.G = 1;
              break;
            case 2:
              h.B = 1;
              break;
            case 3:
              h.A = 1;
              break;
            case 4:
              a.R = 1;
              break;
            case 5:
              a.G = 1;
              break;
            case 6:
              a.B = 1;
              break;
            case 7:
              a.A = 1;
          }
      }
    i.SetCustomMaterialVectorParameter(FOG_MASK_1, h),
      i.SetCustomMaterialVectorParameter(FOG_MASK_2, a);
  }
  ash(i) {
    var t = this.OpenFogSet.has(i.R) ? MAX_COLOR : 0,
      e = this.OpenFogSet.has(i.G) ? MAX_COLOR : 0,
      s = this.OpenFogSet.has(i.B) ? MAX_COLOR : 0,
      i = this.OpenFogSet.has(i.Alpha) ? MAX_COLOR : 0;
    return new UE.Color(t, e, s, i);
  }
  lsh(i) {
    var t = this.OpenFogSet.has(i.R) ? MAX_COLOR : 0,
      e = this.OpenFogSet.has(i.G) ? MAX_COLOR : 0,
      s = this.OpenFogSet.has(i.B) ? MAX_COLOR : 0,
      i = this.OpenFogSet.has(i.Alpha) ? MAX_COLOR : 0;
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
