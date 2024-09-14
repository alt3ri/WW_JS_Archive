"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapMarkMgr = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  GeneralLogicTreeUtil_1 = require("../../../../GeneralLogicTree/GeneralLogicTreeUtil"),
  TrackController_1 = require("../../../../Track/TrackController"),
  WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine"),
  MapController_1 = require("../../../Controller/MapController"),
  MapDefine_1 = require("../../../MapDefine"),
  MapUtil_1 = require("../../../MapUtil"),
  CustomMarkItem_1 = require("../../../Marks/MarkItem/CustomMarkItem"),
  PlayerMarkItem_1 = require("../../../Marks/MarkItem/PlayerMarkItem"),
  TeleportMarkItem_1 = require("../../../Marks/MarkItem/TeleportMarkItem"),
  MarkItemUtil_1 = require("../../../Marks/MarkItemUtil");
class MapMarkMgr {
  constructor(t, e, i, r, s) {
    (this.tUi = void 0),
      (this.iUi = new WorldMapDefine_1.MarkPriority2HierarchyIndexHelper()),
      (this.oUi = new WorldMapDefine_1.MarkPriority2HierarchyIndexHelper()),
      (this.MapType = 2),
      (this.rUi = new Map()),
      (this.nUi = new Map()),
      (this.sUi = new Set()),
      (this.aUi = new Set()),
      (this.hUi = new Map()),
      (this.lUi = 1),
      (this._Ui = 0),
      (this.uUi = (t) => {
        this.cUi(t);
      }),
      (this.mUi = (t) => {
        this.dUi(t);
      }),
      (this.JUa = (t) => {
        if (t === this.MapType) {
          var i = this.GetMarkItemsByType(9);
          let e = `---自定义标记信息---地图类型:${t}
`;
          i?.forEach((t) => {
            e =
              "" +
              e +
              `MarkId:${t.MarkId},
UiPosition:${t.UiPosition.ToString()},
WorldPosition:${t.WorldPosition.ToString()}

`;
          }),
            Log_1.Log.CheckDebug() && Log_1.Log.Debug("Map", 64, e);
        }
      }),
      (this.CreateDynamicMark = (t) => {
        if (t.MapId === this._Ui) {
          t = MarkItemUtil_1.MarkItemUtil.Create(
            t,
            this.MapType,
            this.lUi,
            this.tUi,
          );
          if (t) return this.AddMarkItem(t.MarkType, t), t;
        }
      }),
      (this.CUi = (t, e, i) => {
        e = this.GetMarkItem(t, e);
        e &&
          e instanceof CustomMarkItem_1.CustomMarkItem &&
          (e.SetConfigId(i), e.IsTracked) &&
          (this.gUi(t, e.MarkId, !1), this.gUi(t, e.MarkId, !0));
      }),
      (this.fUi = (t, e) => {
        var i = this.GetMarkItem(t, e);
        i &&
          (this.gUi(t, i.MarkId, !1),
          this.hUi.has(e) && this.hUi.delete(e),
          void 0 !== (i = this.RemoveMarkItem(t, e))) &&
          i.Destroy();
      }),
      (this.gUi = (t, e, i, r = !1) => {
        var s,
          t = this.GetMarkItem(t, e);
        t &&
          ((s = ModelManager_1.ModelManager.TrackModel.IsTracking(
            t.TrackSource,
            e,
          )),
          (!r && s === i) ||
            (i
              ? (TrackController_1.TrackController.StartTrack({
                  TrackSource: t.TrackSource,
                  Id: e,
                  IconPath: t.IconPath,
                  TrackTarget: t.TrackTarget,
                }),
                this.sUi.add(t))
              : (TrackController_1.TrackController.EndTrack(t.TrackSource, e),
                this.aUi.add(t),
                this.sUi.delete(t))));
      }),
      (this.ngt = (t) => {
        t = this.GetMarkItem(t.MarkType ?? 0, t.Id);
        t &&
          !t.IsTracked &&
          t.LogicUpdate(
            GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
          ),
          ((t && t.View) ?? t?.IsTracked) && this.sUi.add(t);
      }),
      (this.sgt = (t) => {
        t = this.GetMarkItem(t.MarkType ?? 0, t.Id);
        t && t.View && (this.sUi.delete(t), this.aUi.add(t));
      }),
      (this._Xt = () => {
        this.sUi.clear();
      }),
      (this.pUi = (t) => {
        var e = this.GetMarkItemsByType(11);
        e && 0 < e.size && this.vUi(11), this.MUi(t);
      }),
      (this.uRi = (t) => {
        let e = this.GetMarkItem(5, t);
        (e = e || this.GetMarkItem(6, t)) &&
          e instanceof TeleportMarkItem_1.TeleportMarkItem &&
          e.IsTracked &&
          MapController_1.MapController.RequestTrackMapMark(
            e.MarkType,
            e.MarkId,
            !1,
          );
      }),
      (this.Jpe = (t, e, i) => {
        var r = e.Entity.GetComponent(0),
          s = r.GetPbEntityInitData(),
          n = r.GetEntityConfigType();
        n === Protocol_1.Aki.Protocol.rLs.Proto_OldEntity ||
          n === Protocol_1.Aki.Protocol.rLs.Proto_Character ||
          MapUtil_1.MapUtil.IsTemporaryTeleportEntity(s) ||
          ((n = r.GetBaseInfo())?.MapIcon && this.EUi(n.MapIcon, e.Id, i));
      }),
      (this.zpe = (t, e) => {
        this.hUi.has(e.Id) && this.hUi.delete(e.Id),
          this.RemoveMarkItem(7, e.Id)?.Destroy();
      }),
      (this.MapType = t),
      (this._Ui = e),
      (this.lUi = s),
      (this.tUi = i);
  }
  Initialize() {
    this.dde();
  }
  Dispose() {
    this.Cde(), this.vUi();
  }
  OnMapSetup() {
    this.vUi(),
      this.SUi(),
      this.yUi(),
      this.MUi(ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers());
    for (var [, t] of this.rUi)
      for (var [, e] of t)
        e.IsTracked &&
          12 !== e.MarkType &&
          ModelManager_1.ModelManager.MapModel.SetCurTrackMark([
            e.MarkType,
            e.MarkId,
          ]);
  }
  IUi(t) {
    var e = Math.floor(
        Math.round(t.X * MapDefine_1.MARK_WORLD_TO_HASH_SCALE) /
          MapDefine_1.MARK_SCOPE,
      ),
      t = Math.floor(
        Math.round(t.Y * MapDefine_1.MARK_WORLD_TO_HASH_SCALE) /
          MapDefine_1.MARK_SCOPE,
      );
    return e * MapDefine_1.MARK_HASH_XY_PANDING + t;
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MapReplaceMarkResponse,
      this.CUi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CreateMapMark,
        this.CreateDynamicMark,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveMapMark,
        this.fUi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TrackMapMark,
        this.gUi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TrackMark,
        this.ngt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnTrackMark,
        this.sgt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearTrackMark,
        this._Xt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ScenePlayerChanged,
        this.pUi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnlockTeleport,
        this.uRi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddEntity,
        this.Jpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMarkItemViewCreate,
        this.uUi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMarkItemViewDestroy,
        this.mUi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LogCustomMarkInfo,
        this.JUa,
      );
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MapReplaceMarkResponse,
      this.CUi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CreateMapMark,
        this.CreateDynamicMark,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveMapMark,
        this.fUi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TrackMapMark,
        this.gUi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TrackMark,
        this.ngt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ClearTrackMark,
        this._Xt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ScenePlayerChanged,
        this.pUi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UnlockTeleport,
        this.uRi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddEntity,
        this.Jpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UnTrackMark,
        this.sgt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMarkItemViewCreate,
        this.uUi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMarkItemViewDestroy,
        this.mUi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LogCustomMarkInfo,
        this.JUa,
      );
  }
  vUi(t) {
    if (t) {
      t = this.rUi.get(t);
      if (t) {
        for (var [, e] of t)
          this.hUi.delete(e.MarkId),
            this.RemoveMarkItem(e.MarkType, e.MarkId),
            e.Destroy();
        t.clear();
      }
    } else {
      for (var [, i] of this.rUi)
        for (var [, r] of i) this.hUi.delete(r.MarkId), r.Destroy();
      this.rUi.clear(),
        this.sUi.clear(),
        this.nUi.clear(),
        this.iUi.ClearData(),
        this.oUi.ClearData();
    }
  }
  TUi(t) {
    var e,
      i = t.WorldPosition;
    i &&
      ((i = this.IUi(i)),
      (e = this.nUi.get(i))
        ? e.add(t)
        : ((e = new Set().add(t)), this.nUi.set(i, e)),
      (t.GridId = i));
  }
  LUi(t) {
    var e = t.GridId,
      e = this.nUi.get(e);
    e && e.delete(t);
  }
  AddMarkItem(e, i) {
    if (i) {
      let t = this.GetMarkItemsByType(e);
      t || ((t = new Map()), this.rUi.set(e, t)),
        t.set(i.MarkId, i),
        this.TUi(i);
    }
  }
  RemoveMarkItem(t, e) {
    t = this.GetMarkItemsByType(t);
    if (t && 0 !== t.size) {
      var i = t.get(e);
      if ((t.delete(e), this.hUi.delete(e), i))
        return (
          this.LUi(i),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Map", 50, "移除标记_MarkMgr", ["MarkId", e]),
          i
        );
    }
  }
  DUi(t, e, i) {
    var r = t.Holder;
    r &&
      this.MapType === r.MapType &&
      void 0 !== e &&
      t.GetRootItem() &&
      (t.GetRootItem().SetUIParent(e),
      t.SetScale(this.lUi),
      (e = i.AddMarkItem(r.MarkType, r.ShowPriority)),
      t.GetRootItem().SetHierarchyIndex(e));
  }
  RUi(t, e, i) {
    var r = t.Holder;
    r &&
      this.MapType === r.MapType &&
      t.GetRootItem() &&
      e === t.GetRootItem().GetParentAsUIItem() &&
      (i.RemoveMarkItem(t.Holder.MarkType, t.Holder.ShowPriority),
      t.SetScale(this.lUi));
  }
  cUi(t) {
    this.DUi(t, this.tUi, this.iUi);
  }
  dUi(t) {
    this.RUi(t, this.tUi, this.iUi);
  }
  GetMarkItemsByType(t) {
    return this.rUi.get(t);
  }
  GetMarkItem(t, e) {
    if (0 === t) {
      let t = void 0;
      for (const [, i] of this.GetAllMarkItems()) if ((t = i.get(e))) break;
      return t;
    }
    const i = this.GetMarkItemsByType(t);
    if (i) return i.get(e) || void 0;
  }
  GetAllMarkItems() {
    return this.rUi;
  }
  GetAllMarkItemsByMapId(t) {
    var e,
      i,
      r = new Map();
    for ([e, i] of this.rUi)
      for (var [s, n] of i)
        if (n.MapId === t) {
          let t = r.get(e);
          t || ((t = new Map()), r.set(e, t)), t.set(s, n);
        }
    return r;
  }
  GetMarkItemsByClickPosition(t) {
    var t = MapUtil_1.MapUtil.UiPosition2WorldPosition(t),
      t = this.IUi(t),
      e = [];
    for (const r of this.UUi(t)) {
      var i = this.nUi.get(r);
      i && e.push(...i);
    }
    return e;
  }
  UUi(t) {
    return new Set([
      t,
      t + MapDefine_1.MARK_HASH_XY_PANDING,
      t - MapDefine_1.MARK_HASH_XY_PANDING,
      t + 1,
      t - 1,
      t + MapDefine_1.MARK_HASH_XY_PANDING - 1,
      t + MapDefine_1.MARK_HASH_XY_PANDING + 1,
      t - MapDefine_1.MARK_HASH_XY_PANDING - 1,
      t - MapDefine_1.MARK_HASH_XY_PANDING + 1,
    ]);
  }
  UpdateNearbyMarkItem(t, e, i) {
    var t = this.IUi(t),
      r = this.UUi(t);
    for (const f of r) {
      const s = this.nUi.get(f);
      if (s)
        for (const M of s)
          this.hUi.has(M.MarkId) ||
            M instanceof PlayerMarkItem_1.PlayerMarkItem ||
            this.hUi.set(M.MarkId, M);
    }
    const s = this.GetMarkItemsByType(11);
    if (s) for (var [, n] of s) this.hUi.set(n.MarkId, n);
    var a,
      t = this.GetMarkItemsByType(22);
    if (t) for (var [, o] of t) this.hUi.set(o.MarkId, o);
    for ([, a] of this.hUi)
      e(a), a.IsCanShowView || (this.aUi.add(a), this.hUi.delete(a.MarkId));
    for (const v of this.sUi) e(v);
    if (0 !== this.aUi.size) {
      for (const l of this.aUi) {
        var h = l.GridId;
        r.has(h) ||
          (l.LogicUpdate(
            GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
          ),
          i(l));
      }
      this.aUi.clear();
    }
    for (const m of r) {
      var _ = this.nUi.get(m);
      if (_) for (const E of _) e(E);
    }
  }
  FindNearbyMarkItems(i, t) {
    const r = i.WorldPosition;
    var e = this.IUi(r),
      s = Math.ceil(
        1 / (MapDefine_1.MARK_SCOPE * MapDefine_1.MARK_WORLD_TO_HASH_SCALE),
      ),
      n = this.UUi(e);
    let a = Array.from(n.values());
    var o = new Set();
    if ((o.add(e), 0 < n.size))
      for (let t = 0; t <= s; ++t) {
        var h = [];
        for (const v of a)
          if (!o.has(v)) {
            for (const l of this.UUi(v)) o.has(l) || h.push(l);
            o.add(v);
          }
        a = h;
      }
    const _ = [],
      f = Math.pow(t, 2);
    for (const m of o) {
      var M = this.nUi.get(m);
      M &&
        M.forEach((t) => {
          var e;
          i !== t &&
            (e = Vector_1.Vector.DistSquared(t.WorldPosition, r)) <= f &&
            _.push([t, e]);
        });
    }
    return 0 < _.length && _.sort((t, e) => t[1] - e[1]), _;
  }
  SUi() {
    var t, e, i;
    for (const s of ConfigManager_1.ConfigManager.MapConfig.GetConfigMarks(
      this._Ui,
    ))
      7 !== s.ObjectType &&
        22 !== s.ObjectType &&
        23 !== s.ObjectType &&
        ((t = MarkItemUtil_1.MarkItemUtil.CreateConfigMark(
          s.MarkId,
          s,
          this.MapType,
          this.lUi,
          this.tUi,
        )),
        this.AddMarkItem(s.ObjectType, t));
    for ([
      e,
      i,
    ] of ModelManager_1.ModelManager.MapModel.GetEntityPendingList()) {
      var r = EntitySystem_1.EntitySystem.Get(e);
      r
        ? ((r = r.GetComponent(1)?.Owner), this.EUi(i, e, r))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Map", 50, "找不到实体对象", [
            "实体ID",
            e.toString(),
          ]);
    }
  }
  yUi() {
    for (const t of ModelManager_1.ModelManager.MapModel.GetAllDynamicMarks().values())
      for (const e of t.values())
        e.MapId === this._Ui && this.CreateDynamicMark(e);
  }
  MUi(t) {
    if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
      for (const r of t) {
        var e;
        r.GetPlayerId() !==
          ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
          ((e =
            ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(
              r.GetPlayerId(),
            )?.PlayerNumber ?? 1),
          (e = new MapDefine_1.PlayerMarkCreateInfo(
            r.GetPlayerId(),
            e,
            r.GetLocation().ToUeVector(),
          )),
          (e = MarkItemUtil_1.MarkItemUtil.Create(
            e,
            this.MapType,
            this.lUi,
            this.tUi,
          )),
          MapUtil_1.MapUtil.IsInBigWorld(this._Ui) && (e.IsInAoiRange = !0),
          this.AddMarkItem(11, e));
      }
      var i;
      for (const s of ModelManager_1.ModelManager.OnlineModel
        .OtherScenePlayerDataList)
        s.PlayerId !== ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
          s.MapId === MapUtil_1.MapUtil.GetCurrentBigMapOrWorldMapId() &&
          ((i =
            ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(
              s.PlayerId,
            )?.PlayerNumber ?? 1),
          (i = new MapDefine_1.PlayerMarkCreateInfo(
            s.PlayerId,
            i,
            s.Location?.ToUeVector() ?? Vector_1.Vector.ZeroVector,
          )),
          (i = MarkItemUtil_1.MarkItemUtil.Create(
            i,
            this.MapType,
            this.lUi,
            this.tUi,
          )),
          MapUtil_1.MapUtil.IsInBigWorld(this._Ui) && (i.IsInAoiRange = !0),
          this.AddMarkItem(11, i));
    }
  }
  EUi(t, e, i) {
    ObjectUtils_1.ObjectUtils.IsValid(i) &&
      ((e = MarkItemUtil_1.MarkItemUtil.CreateEntityMark(
        e,
        t,
        this.tUi,
        i,
        this.MapType,
        this.lUi,
      )),
      this.AddMarkItem(7, e));
  }
}
exports.MapMarkMgr = MapMarkMgr;
//# sourceMappingURL=MapMarkMgr.js.map
