"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTileMgr = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ConfigCommon_1 = require("../../../../../../Core/Config/ConfigCommon");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../../GlobalData");
const LevelConditionRegistry_1 = require("../../../../../LevelGamePlay/LevelConditions/LevelConditionRegistry");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const MapDefine_1 = require("../../../MapDefine");
const MapUtil_1 = require("../../../MapUtil");
const FAKE_TILE_COUNT = 2;
const MAP_TILE_COMMON = "T_CommonDefault_UI";
const MAX_COLOR = 255;
const FOG_TEXTURE_NAME = new UE.FName("FogTexture");
const HD_TEXTURE_NAME = new UE.FName("HDTexture");
const HD_SCALAR_NAME = new UE.FName("UseHDPicture");
class FogOpenParams {
  constructor() {
    (this.ExtraHdMapTileIndex = -1),
      (this.MapTileIndex = -1),
      (this.Channel = 0);
  }
}
class MapTileMgr {
  constructor(i, t, e, s, h, a, n, r) {
    (this.qRi = void 0),
      (this.GRi = void 0),
      (this.w5s = void 0),
      (this.NRi = void 0),
      (this.ORi = void 0),
      (this.wRi = new Map()),
      (this.ARi = void 0),
      (this.OpenArea = void 0),
      (this.xRi = void 0),
      (this.kRi = void 0),
      (this.FRi = void 0),
      (this.VRi = void 0),
      (this.HRi = void 0),
      (this.jRi = void 0),
      (this.Y6s = void 0),
      (this.b5s = void 0),
      (this.q5s = 0),
      (this.PRi = 2),
      (this.WRi = new UE.Color(0, 0, 0, MAX_COLOR)),
      (this.jRn = new Map()),
      (this.zRn = new Map()),
      (this.ZRn = -1),
      (this.MapOffset = void 0),
      (this.FakeOffset = 0),
      (this.KRi = Number.MAX_SAFE_INTEGER),
      (this.QRi = Number.MAX_SAFE_INTEGER),
      (this.XRi = Number.MAX_SAFE_INTEGER),
      (this.$Ri = Number.MAX_SAFE_INTEGER),
      (this.YRi = 0),
      (this.JRi = void 0),
      (this.zRi = void 0),
      (this.ZRi = void 0),
      (this.eUi = !1),
      (this.A4s = void 0),
      (this.U4s = void 0),
      (this.G5s = void 0),
      (this.tUi = () => {
        this.NRi &&
          (this.NRi.GetOwner()?.K2_DestroyActor(), (this.NRi = void 0)),
          this.iUi();
      }),
      (this.oUi = (i) => {
        this.OpenArea && (this.OpenArea.add(i), this.rUi());
      }),
      (this.C5s = (i) => {
        if (this.OpenArea) {
          this.OpenArea.clear();
          for (const t of i.keys()) this.OpenArea.add(t);
          this.rUi();
        }
      }),
      (this.nUi = (i) => {
        if (this.zRi && this.zRi.length !== 0 && this.qRi)
          for (const e of this.zRi) {
            let t = e.MapTileIndex;
            t >= 0 &&
              t < this.qRi.length &&
              ((t = this.qRi[t]), this.sUi(t, e.Channel, i));
          }
      }),
      (this.kRi = i),
      (this.A4s = UE.NewArray(UE.UIItem)),
      this.A4s.Add(i),
      (this.U4s = (0, puerts_1.$ref)(this.A4s)),
      (this.FRi = t),
      (this.VRi = e),
      (this.HRi = s),
      (this.jRi = h),
      (this.b5s = s
        ?.GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      (this.q5s = s
        ?.GetOwner()
        .GetComponentByClass(UE.UISprite.StaticClass())
        ?.GetAlpha()),
      (this.Y6s = r),
      this.Y6s?.SetWidth(MapDefine_1.DETAIL_TILE_REALSIZE),
      this.Y6s?.SetHeight(MapDefine_1.DETAIL_TILE_REALSIZE),
      this.VRi.SetColor(this.WRi),
      (this.PRi = a),
      (this.YRi =
        ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId),
      n && (this.wRi = n);
  }
  aUi() {
    (this.qRi = []),
      (this.GRi = []),
      (this.w5s = []),
      (this.ARi = []),
      (this.MapOffset = new UE.Vector4(0, 0, 0, 0)),
      (this.FakeOffset = 0);
  }
  Initialize() {
    this.aUi(), this.dde();
  }
  Dispose() {
    this.Cde(),
      this.ARi && (this.ARi.splice(0, this.ARi.length), (this.ARi = void 0)),
      this.qRi.forEach((i) => {
        i.SetTexture(void 0),
          i.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, void 0),
          i.SetCustomMaterialTextureParameter(HD_TEXTURE_NAME, void 0),
          this.VRi !== i && i.GetOwner()?.K2_DestroyActor();
      }),
      this.GRi.forEach((i) => {
        i.SetTexture(void 0), this.jRi !== i && i.GetOwner()?.K2_DestroyActor();
      }),
      this.O5s(),
      this.HRi?.SetAlpha(this.q5s),
      this.HRi?.SetUIActive(!1),
      this.NRi?.GetOwner()?.K2_DestroyActor(),
      (this.qRi = void 0),
      (this.GRi = void 0),
      (this.w5s = void 0),
      this.jRn.clear(),
      this.zRn.clear();
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MapOpenAreaChange,
      this.oUi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MapOpenAreaFullUpdate,
        this.C5s,
      ),
      (this.ORi = new LevelConditionRegistry_1.ConditionPassCallback(this.tUi));
    for (const t of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
      const i = t.ConditionId;
      i > 0 &&
        LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(
          i,
          this.ORi,
        );
    }
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MapOpenAreaChange,
      this.oUi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MapOpenAreaFullUpdate,
        this.C5s,
      );
    for (const t of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
      const i = t.ConditionId;
      i > 0 &&
        LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(
          i,
          this.ORi,
        );
    }
  }
  GetMapTiles() {
    return this.qRi;
  }
  OnMapSetUp() {
    this.PRi === 1 && this.YRi !== MapDefine_1.BIG_WORLD_MAP_ID
      ? (this.eUi = !1)
      : ((this.eUi = !0),
        this.hUi(),
        this.lUi(),
        ConfigManager_1.ConfigManager.MapConfig?.GetMultiMapAreaConfigList()?.forEach(
          (i) => {
            this.jRn.set(i.Block, i);
          },
        ),
        ConfigManager_1.ConfigManager.MapConfig?.GetAllSubMapConfig()?.forEach(
          (t) => {
            t.Area.forEach((i) => {
              this.zRn.set(i, t.Id);
            });
          },
        ),
        (this.KRi = Number.MAX_SAFE_INTEGER),
        (this.QRi = Number.MAX_SAFE_INTEGER));
  }
  _Ui(i, t) {
    return this.PRi === 1 ? t : i;
  }
  hUi() {
    this.OpenArea = new Set();
    for (const [
      i,
    ] of ModelManager_1.ModelManager.MapModel.GetAllUnlockedAreas())
      this.OpenArea.add(i);
  }
  lUi() {
    let i = ConfigManager_1.ConfigManager.MapConfig.GetAllTileConfig();
    this.ARi.splice(0, this.ARi.length);
    for (const T of i)
      if (!StringUtils_1.StringUtils.IsEmpty(T.MapTilePath)) {
        var e = ModelManager_1.ModelManager.MapModel.CheckUnlockMapBlockIds(
          T.Block,
        );
        var s = T.MapTilePath.split("/");
        var s = s[s.length - 1];
        let i = "";
        let t = "";
        t =
          e !== 0
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
                  T.MapTilePath,
                )),
              ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
                T.MiniMapTilePath,
              ));
        var e = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
          T.HdMapTilePath,
        );
        const h = this._Ui(i, t);
        var a = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
          T.FogTilePath,
        );
        const n = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
          T.MiniFogTilePath,
        );
        var a = this._Ui(a, n);
        this.ARi.push({
          MapTilePath: h,
          HdMapTilePath: e,
          FogTilePath: a,
          MapTileName: s,
        });
      }
    let t = 0;
    let r = 0;
    if (this.PRi === 1) {
      (t = 4), (this.GRi.length = 0), this.GRi.push(this.jRi);
      for (let i = 1; i < t; ++i) {
        const o = LguiUtil_1.LguiUtil.CopyItem(this.jRi, this.HRi);
        this.GRi.push(o);
      }
    } else {
      this.xRi = { MaxX: -1, MinX: 1, MaxY: -1, MinY: 1 };
      for (const c of this.ARi) {
        var _ = this.bRi(c.MapTileName);
        const M = _.X;
        var _ = _.Y;
        (this.xRi.MaxX = Math.max(M, this.xRi.MaxX)),
          (this.xRi.MinX = Math.min(M, this.xRi.MinX)),
          (this.xRi.MaxY = Math.max(_, this.xRi.MaxY)),
          (this.xRi.MinY = Math.min(_, this.xRi.MinY));
      }
      r = this.xRi.MaxX - this.xRi.MinX + 1 + 2 * FAKE_TILE_COUNT;
      i = this.xRi.MaxY - this.xRi.MinY + 1 + 2 * FAKE_TILE_COUNT;
      t = r * i;
    }
    (this.qRi.length = 0), this.qRi.push(this.VRi);
    for (let i = 1; i < t; ++i) {
      const f = LguiUtil_1.LguiUtil.CopyItem(this.VRi, this.FRi);
      this.qRi.push(f);
    }
    const v = new Map();
    for (const m of this.ARi) {
      const g = this.bRi(m.MapTileName);
      v.set(g.X + "_" + g.Y, m);
    }
    let p;
    let l;
    let E;
    let C;
    let U;
    const d = Vector2D_1.Vector2D.Create();
    for (let i = 0; i < this.qRi.length; i++) {
      const S = this.qRi[i];
      if (
        (S.SetWidth(MapDefine_1.DETAIL_TILE_SPACE),
        S.SetHeight(MapDefine_1.DETAIL_TILE_SPACE),
        this.PRi === 1)
      )
        this.uUi(S);
      else {
        var u = Math.ceil((i + 1) / r);
        let D = i - (u - 1) * r + this.xRi.MinX - FAKE_TILE_COUNT;
        var u = -(u - 1) + this.xRi.MaxY + FAKE_TILE_COUNT;
        (d.X = (D - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
          (d.Y = (u - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
          S.SetAnchorOffset(d.ToUeVector2D());
        const L = v.get(D + "_" + u);
        L &&
          ((D = (i) => {
            S.SetTexture(i),
              StringUtils_1.StringUtils.IsEmpty(L.FogTilePath)
                ? S.SetColor(this.WRi)
                : this.cUi(S, L.FogTilePath);
          }),
          S.SetCustomMaterialScalarParameter(HD_SCALAR_NAME, 0),
          GlobalData_1.GlobalData.IsPlayInEditor &&
            S.GetOwner()?.SetActorLabel(L.MapTileName),
          L && !StringUtils_1.StringUtils.IsEmpty(L.MapTilePath)
            ? ((u = this.wRi.get(L.MapTilePath))
                ? D(u)
                : ResourceSystem_1.ResourceSystem.LoadAsync(
                    L.MapTilePath,
                    UE.Texture,
                    D,
                    102,
                  ),
              ModelManager_1.ModelManager.PlatformModel.IsPc() &&
                !StringUtils_1.StringUtils.IsEmpty(L.HdMapTilePath) &&
                this.PRi === 2 &&
                ((u = (i) => {
                  S.SetCustomMaterialScalarParameter(HD_SCALAR_NAME, 1),
                    S.SetCustomMaterialTextureParameter(HD_TEXTURE_NAME, i);
                }),
                this.wRi.has(L.HdMapTilePath)
                  ? u(this.wRi.get(L.HdMapTilePath))
                  : ResourceSystem_1.ResourceSystem.LoadAsync(
                      L.HdMapTilePath,
                      UE.Texture,
                      u,
                      102,
                    )))
            : (S.SetTexture(void 0), S.SetColor(this.WRi)));
      }
    }
    this.iUi(),
      this.PRi !== 1 &&
        ((i = this.xRi.MaxX),
        (p = 1 - this.xRi.MinX),
        (l = Math.max(i, p)),
        (E = this.xRi.MaxY),
        (C = 1 - this.xRi.MinY),
        (U = Math.max(E, C)),
        this.kRi.SetWidth(2 * l * MapDefine_1.DETAIL_TILE_REALSIZE),
        this.kRi.SetHeight(2 * U * MapDefine_1.DETAIL_TILE_REALSIZE),
        this.MapOffset.Set(
          Math.max(0, i - p) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
          Math.max(0, p - i) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
          Math.max(0, C - E) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
          Math.max(0, E - C) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
        ),
        (this.FakeOffset = MapDefine_1.DETAIL_TILE_REALSIZE * FAKE_TILE_COUNT));
  }
  bRi(i) {
    i = i.split("_");
    return {
      X: UE.KismetStringLibrary.Conv_StringToInt(i[2]),
      Y: UE.KismetStringLibrary.Conv_StringToInt(i[3]),
    };
  }
  cUi(i, t, e = !1, s) {
    const h = i;
    var i = (i) => {
      i ? this.uUi(h, i, e) : h.SetColor(this.WRi), s && s();
    };
    const a = this.wRi.get(t);
    a ? i(a) : ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, i, 102);
  }
  async iUi() {
    this.NRi && (this.NRi.GetOwner()?.K2_DestroyActor(), (this.NRi = void 0));
    var i = ModelManager_1.ModelManager.MapModel.GetCurMapBorderId();
    var i =
      ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfig(i).PrefabPath;
    var i = await LguiUtil_1.LguiUtil.LoadPrefabByAsync(i, this.kRi);
    (this.NRi = i.GetComponentByClass(UE.UIItem.StaticClass())),
      this.NRi.SetAnchorOffset(new UE.Vector2D(0, 0));
  }
  UpdateMinimapTiles(i) {
    if (this.PRi === 1 && this.eUi) {
      var t = MapUtil_1.MapUtil.GetTilePosition(i, 0.5);
      const e = t.X;
      var t = t.Y;
      const s = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
      const h = this.zRn.has(s) ? this.zRn.get(s) : 0;
      const a = this.ZRn !== h;
      if (
        !(
          Math.abs(this.XRi - i.X) <
            MapDefine_1.MINI_MAP_UPDATE_GAP * MapDefine_1.UNIT &&
          Math.abs(this.$Ri - i.Y) <
            MapDefine_1.MINI_MAP_UPDATE_GAP * MapDefine_1.UNIT &&
          this.KRi === e &&
          this.QRi === t
        ) ||
        a
      ) {
        const n = [e, t, e - 1, t, e, t - 1, e - 1, t - 1];
        const r = this.J6s(i, e, t);
        const o = (this.z6s(this.qRi, n, r), h !== 0 && void 0 !== this.HRi);
        if (o) {
          this.z6s(this.GRi, n, r);
          for (let i = 0; i < this.GRi.length; i++) {
            let _ = n[2 * i];
            let M = n[2 * i + 1];
            if (r[i].R > 0) {
              (_ =
                (_ - 0.5 - 0.5 + r[i].B + r[i].R / 2) *
                MapDefine_1.DETAIL_TILE_SPACE),
                (M =
                  (M - 0.5 + 0.5 - r[i].A - r[i].G / 2) *
                  MapDefine_1.DETAIL_TILE_SPACE);
              this.Y6s?.SetAnchorOffset(new UE.Vector2D(_, M));
              break;
            }
          }
        }
        if ((this.HRi?.SetUIActive(o), this.KRi !== e || this.QRi !== t || a)) {
          (this.KRi = e), (this.QRi = t);
          for (let i = 0; i < this.qRi.length; i++) {
            const f = n[2 * i];
            const v = n[2 * i + 1];
            o && this.Z6s(this.GRi[i], f, v, h, s), this.V8s(this.qRi[i], f, v);
          }
          o
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WorldMapSubMapChanged,
                h,
              )
            : EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WorldMapSubMapChanged,
                0,
              ),
            (this.ZRn = h ?? 0);
        }
      }
    }
  }
  Z6s(t, e, s, i, h) {
    const a = ConfigManager_1.ConfigManager.MapConfig.GetTileConfig(
      e.toString() + "_" + s.toString(),
    );
    if (a && !StringUtils_1.StringUtils.IsEmpty(a.MapTilePath)) {
      let n = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(i);
      if (n) {
        n = n.MiniMapTilePath.find((i) => i.includes(e + "_" + s));
        if (n) {
          n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(n);
          if (StringUtils_1.StringUtils.IsEmpty(n))
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Map",
                35,
                "UpdateMinimapTiles 多层地图小地图获取地图块资源为空",
                ["x", e],
                ["y", s],
                ["MultiMapId", i],
                ["AreaId", h],
              );
          else {
            (i = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
              a.MiniFogTilePath,
            )),
              (h =
                ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
                  a.FogTilePath,
                ));
            const r = this._Ui(h, i);
            ResourceSystem_1.ResourceSystem.LoadAsync(n, UE.Texture, (i) => {
              i &&
                (t.SetTexture(i),
                StringUtils_1.StringUtils.IsEmpty(r)
                  ? t.SetColor(this.WRi)
                  : this.cUi(t, r, !0));
            });
          }
        }
      }
    }
  }
  V8s(t, i, e) {
    i = ConfigManager_1.ConfigManager.MapConfig.GetTileConfig(
      i.toString() + "_" + e.toString(),
    );
    if (i && !StringUtils_1.StringUtils.IsEmpty(i.MapTilePath)) {
      var e = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
        i.MapTilePath,
      );
      const s = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
        i.MiniMapTilePath,
      );
      const h = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
        i.FogTilePath,
      );
      var i = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
        i.MiniFogTilePath,
      );
      var e = this._Ui(e, s);
      const a = this._Ui(h, i);
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (i) => {
        i?.IsValid() &&
          (t.SetTexture(i),
          StringUtils_1.StringUtils.IsEmpty(a)
            ? t.SetColor(this.WRi)
            : this.cUi(t, a));
      });
    }
  }
  J6s(i, t, e) {
    var s = Vector2D_1.Vector2D.Create(i);
    var t =
      (s.DivisionEqual(MapDefine_1.DETAIL_TILE_REALSIZE * MapDefine_1.UNIT),
      s.X - t + 1);
    var s = s.Y + e;
    var e =
      ((this.XRi = i.X),
      (this.$Ri = i.Y),
      MapDefine_1.MINI_MAP_RADIUS / MapDefine_1.DETAIL_TILE_REALSIZE);
    var i = Math.min(t + e, 1);
    const h = Math.max(t - e, 0);
    var a = Math.min(s + e, 1);
    const n = Math.max(s - e, 0);
    var i = new UE.LinearColor(i - h, a - n, h, n);
    var a = new UE.LinearColor(2 * e - i.R, i.G, Math.min(1 - e + t, 1), n);
    var t = new UE.LinearColor(i.R, 2 * e - i.G, h, Math.max(s - e - 1, 0));
    return [i, a, t, new UE.LinearColor(a.R, t.G, a.B, t.A)];
  }
  z6s(t, e, s) {
    const h = Vector2D_1.Vector2D.Create();
    for (let i = 0; i < t.length; i++) {
      const a = t[i];
      const n =
        (a.SetWidth(Math.max(s[i].R * MapDefine_1.DETAIL_TILE_REALSIZE, 0)),
        a.SetHeight(Math.max(s[i].G * MapDefine_1.DETAIL_TILE_REALSIZE, 0)),
        e[2 * i]);
      const r = e[2 * i + 1];
      (h.X =
        (n - 0.5 - 0.5 + s[i].B + s[i].R / 2) * MapDefine_1.DETAIL_TILE_SPACE),
        (h.Y =
          (r - 0.5 + 0.5 - s[i].A - s[i].G / 2) *
          MapDefine_1.DETAIL_TILE_SPACE),
        a.SetAnchorOffset(h.ToUeVector2D()),
        a.SetCustomMaterialVectorParameter(new UE.FName("UVCorrect"), s[i]);
    }
  }
  ShowSubMapByPosition(i, t) {
    let e;
    this.PRi === 1 ||
      i === 0 ||
      ((e = this.HRi?.IsUIActiveInHierarchy()),
      this.CreateSubMapTile(i, -t, e),
      this.HRi?.SetUIActive(!0),
      e) ||
      this.N5s();
  }
  HideSubMap() {
    this.HRi?.IsUIActiveInHierarchy()
      ? (this.w5s.forEach((i) => {
          this.k5s(i, !1);
        }),
        this.N5s(!0, () => {
          this.HRi?.SetUIActive(!1);
        }))
      : this.HRi?.SetUIActive(!1);
  }
  N5s(i = !1, t) {
    const e = this.b5s?.GetPlayTween();
    e &&
      (this.O5s(),
      this.b5s.Stop(),
      (e.from = i ? this.q5s : 0),
      (e.to = i ? 0 : this.q5s),
      t &&
        ((i = (0, puerts_1.toManualReleaseDelegate)(t)),
        (this.G5s = e.RegisterOnComplete(i))),
      this.b5s.Play());
  }
  O5s() {
    void 0 !== this.G5s &&
      (this.b5s?.GetPlayTween().UnregisterOnComplete(this.G5s),
      (this.G5s = void 0));
  }
  k5s(i, t = !0) {
    let e;
    let s;
    const h = this.b5s?.GetPlayTween();
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
  F5s(i, t = !0) {
    var i = i
      .GetOwner()
      .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    const e = i?.GetPlayTween();
    i.Stop();
    (e.duration = t ? 0.3 : 0.15), i.Play();
  }
  GetSubMapFloorCountByGroupId(i) {
    return i === 0
      ? 0
      : ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigByGroupId(i)
          .length;
  }
  GetSubMapGroupByRootItemPosition() {
    var i = UE.LGUIBPLibrary.SimulationLineTraceOnCenterScreen(
      GlobalData_1.GlobalData.World,
      this.U4s,
    );
    if (i && i.enterComponent) {
      const t = this.kRi.GetWidth();
      const e = this.kRi.GetHeight();
      var i = i.GetLocalPointInPlane();
      const s =
        i.X >= 0
          ? Math.ceil(i.X / MapDefine_1.DETAIL_TILE_SPACE)
          : Math.floor(i.X / MapDefine_1.DETAIL_TILE_SPACE);
      const h =
        i.Y >= 0
          ? Math.floor(i.Y / MapDefine_1.DETAIL_TILE_SPACE)
          : Math.ceil(i.Y / MapDefine_1.DETAIL_TILE_SPACE);
      const a = (i.X + t / 2) % MapDefine_1.DETAIL_TILE_SPACE;
      const n = (i.Y + e / 2) % MapDefine_1.DETAIL_TILE_SPACE;
      const r = this.jRn.get(s + "_" + h);
      if (r)
        for (let t = 0; t < r?.MultiMapRangeList.length; t++) {
          const o = r?.MultiMapRangeList[t];
          for (let i = 0; i < o.ArrayInt.length; i += 4) {
            const _ = o.ArrayInt[i];
            const M = o.ArrayInt[i + 1];
            const f = o.ArrayInt[i + 2];
            const v = o.ArrayInt[i + 3];
            if (_ <= a && a <= f && M <= n && n <= v) return r.MultiMapList[t];
          }
        }
    }
    return 0;
  }
  CreateSubMapTile(i, e, s = !1) {
    this.w5s = [];
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
          this.GRi &&
            !this.GRi[t] &&
            ((h = LguiUtil_1.LguiUtil.CopyItem(this.jRi, this.HRi)),
            this.GRi.push(h)),
            t++;
          var h = o.split("_");
          let a = Number(h[2]);
          const n = Number(h[3]);
          const _ = this.GRi[t - 1];
          _.SetAnchorOffsetX((a - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
            _.SetAnchorOffsetY((n - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
            _.SetHierarchyIndex(t),
            _.SetWidth(MapDefine_1.DETAIL_TILE_SPACE),
            _.SetHeight(MapDefine_1.DETAIL_TILE_SPACE);
          a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o);
          const M = e === r.Floor ? 255 : 20 + 20 * t;
          ResourceSystem_1.ResourceSystem.LoadAsync(a, UE.Texture, (i) => {
            _.SetUIActive(!0),
              i
                ? (_.SetColor(new UE.Color(M, M, M, 255)), _.SetTexture(i))
                : _.SetColor(this.WRi),
              s ? this.F5s(_, e === r.Floor) : this.k5s(_, !0),
              this.w5s.push(_);
          });
        }
      for (let i = t; i < this.GRi.length; i++) this.GRi[i].SetUIActive(!1);
    }
  }
  ConvertUiPositionToMapTilePosition(i) {
    return Vector2D_1.Vector2D.Create();
  }
  rUi() {
    for (const i of this.qRi) this.uUi(i);
    for (const t of this.GRi) this.uUi(t, void 0, !0);
  }
  HandleAreaOpen(t) {
    (this.zRi = []),
      this.JRi || (this.JRi = (0, puerts_1.toManualReleaseDelegate)(this.nUi));
    for (let i = 0; i < this.qRi.length; i++) {
      var e;
      var s = this.qRi[i];
      var s = this.mUi(s, t);
      void 0 !== s &&
        (((e = new FogOpenParams()).MapTileIndex = i),
        (e.Channel = s),
        this.zRi.push(e));
    }
    this.nUi(0);
  }
  mUi(i, t) {
    if (i && i.texture) {
      i = i.texture.GetName();
      if (i !== MAP_TILE_COMMON) {
        (i = this.bRi(i)),
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
  sUi(i, t, e) {
    const s = i.GetColor().ReinterpretAsLinear();
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
    i.SetColor(s.ToFColor(!0));
  }
  HandleDelegate() {
    let i;
    this.JRi &&
      ((i = ConfigManager_1.ConfigManager.MapConfig.GetMapDissolveTime()),
      this.ZRi && this.ZRi.Kill(),
      (this.ZRi = UE.LTweenBPLibrary.FloatTo(
        GlobalData_1.GlobalData.World,
        this.JRi,
        0,
        1,
        i,
      )));
  }
  UnBindDelegate() {
    this.JRi &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.nUi),
      (this.JRi = void 0)),
      this.ZRi && (this.ZRi.Kill(), (this.ZRi = void 0));
  }
  uUi(i, t, e = !1) {
    let s, h;
    i &&
      i.texture &&
      ((h = i.texture.GetName()) !== MAP_TILE_COMMON &&
      ((h = (h = this.bRi(h)).X + "_" + h.Y),
      (h = ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(h)))
        ? e
          ? i.SetColor(new UE.Color(MAX_COLOR, MAX_COLOR, MAX_COLOR, MAX_COLOR))
          : (t?.IsValid() &&
              i.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, t),
            (e = this.OpenArea.has(h.R) ? MAX_COLOR : 0),
            (t = this.OpenArea.has(h.G) ? MAX_COLOR : 0),
            (s = this.OpenArea.has(h.B) ? MAX_COLOR : 0),
            (h = this.OpenArea.has(h.Alpha) ? MAX_COLOR : 0),
            (e = new UE.Color(e, t, s, h)),
            i.SetColor(e))
        : i.SetColor(this.WRi));
  }
}
exports.MapTileMgr = MapTileMgr;
// # sourceMappingURL=MapTileMgr.js.map
