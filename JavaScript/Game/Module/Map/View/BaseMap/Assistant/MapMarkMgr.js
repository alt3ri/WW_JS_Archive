"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapMarkMgr = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
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
  constructor(t, e, i, r) {
    (this.tRi = void 0),
      (this.iRi = new WorldMapDefine_1.MarkPriority2HierarchyIndexHelper()),
      (this.oRi = new WorldMapDefine_1.MarkPriority2HierarchyIndexHelper()),
      (this.MapType = 2),
      (this.rRi = new Map()),
      (this.nRi = new Map()),
      (this.sRi = new Set()),
      (this.aRi = new Set()),
      (this.hRi = new Map()),
      (this.lRi = 1),
      (this._Ri = 0),
      (this.uRi = (t) => {
        this.cRi(t);
      }),
      (this.mRi = (t) => {
        this.dRi(t);
      }),
      (this.CreateDynamicMark = (t) => {
        if (t.MapId === this._Ri) {
          t = MarkItemUtil_1.MarkItemUtil.Create(
            t,
            this.MapType,
            this.lRi,
            this.tRi,
          );
          if (t) return this.AddMarkItem(t.MarkType, t), t;
        }
      }),
      (this.CRi = (t, e, i) => {
        e = this.GetMarkItem(t, e);
        e &&
          e instanceof CustomMarkItem_1.CustomMarkItem &&
          (e.SetConfigId(i), e.IsTracked) &&
          (this.gRi(t, e.MarkId, !1), this.gRi(t, e.MarkId, !0));
      }),
      (this.fRi = (t, e) => {
        var i = this.GetMarkItem(t, e);
        i &&
          (this.gRi(t, i.MarkId, !1),
          this.hRi.has(e) && this.hRi.delete(e),
          this.RemoveMarkItem(t, e)?.Destroy());
      }),
      (this.gRi = (t, e, i, r = !1) => {
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
                this.sRi.add(t))
              : (TrackController_1.TrackController.EndTrack(t.TrackSource, e),
                this.aRi.add(t),
                this.sRi.delete(t))));
      }),
      (this.Qdt = (t) => {
        t = this.GetMarkItem(0, t.Id);
        t &&
          !t.IsTracked &&
          t.LogicUpdate(
            GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
          ),
          ((t && t.View) ?? t?.IsTracked) && this.sRi.add(t);
      }),
      (this.Xdt = (t) => {
        t = this.GetMarkItem(0, t.Id);
        t && t.View && (this.sRi.delete(t), this.aRi.add(t));
      }),
      (this._Qt = () => {
        this.sRi.clear();
      }),
      (this.pRi = (t) => {
        var e = this.GetMarkItemsByType(11);
        e && 0 < e.size && this.vRi(11), this.MRi(t);
      }),
      (this.uDi = (t) => {
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
        n === Protocol_1.Aki.Protocol.USs.Proto_OldEntity ||
          n === Protocol_1.Aki.Protocol.USs.Proto_Character ||
          MapUtil_1.MapUtil.IsTemporaryTeleportEntity(s) ||
          ((n = r.GetBaseInfo())?.MapIcon && this.SRi(n.MapIcon, e.Id, i));
      }),
      (this.zpe = (t, e) => {
        this.hRi.has(e.Id) && this.hRi.delete(e.Id),
          this.RemoveMarkItem(7, e.Id)?.Destroy();
      }),
      (this.MapType = t),
      (this.lRi = r),
      (this.tRi = e),
      (this._Ri =
        2 === t
          ? MapDefine_1.BIG_WORLD_MAP_ID
          : ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
              .MapConfigId);
  }
  Initialize() {
    this.dde();
  }
  Dispose() {
    this.Cde(), this.vRi();
  }
  OnMapSetup() {
    this.vRi(),
      this.ERi(),
      this.yRi(),
      this.MRi(ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers());
    for (var [, t] of this.rRi)
      for (var [, e] of t)
        e.IsTracked &&
          12 !== e.MarkType &&
          ModelManager_1.ModelManager.MapModel.SetCurTrackMark([
            e.MarkType,
            e.MarkId,
          ]);
  }
  IRi(t) {
    var e = Math.floor(Math.round(0.01 * t.X) / MapDefine_1.MARK_SCOPE),
      t = Math.floor(Math.round(0.01 * t.Y) / MapDefine_1.MARK_SCOPE);
    return e * MapDefine_1.MARK_HASH_XY_PANDING + t;
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MapReplaceMarkResponse,
      this.CRi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CreateMapMark,
        this.CreateDynamicMark,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveMapMark,
        this.fRi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TrackMapMark,
        this.gRi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TrackMark,
        this.Qdt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnTrackMark,
        this.Xdt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearTrackMark,
        this._Qt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ScenePlayerChanged,
        this.pRi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnlockTeleport,
        this.uDi,
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
        this.uRi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMarkItemViewDestroy,
        this.mRi,
      );
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MapReplaceMarkResponse,
      this.CRi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CreateMapMark,
        this.CreateDynamicMark,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveMapMark,
        this.fRi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TrackMapMark,
        this.gRi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TrackMark,
        this.Qdt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ClearTrackMark,
        this._Qt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ScenePlayerChanged,
        this.pRi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UnlockTeleport,
        this.uDi,
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
        this.Xdt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMarkItemViewCreate,
        this.uRi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMarkItemViewDestroy,
        this.mRi,
      );
  }
  vRi(t) {
    if (t) {
      t = this.rRi.get(t);
      if (t) {
        for (var [, e] of t)
          this.hRi.delete(e.MarkId),
            this.RemoveMarkItem(e.MarkType, e.MarkId),
            e.Destroy();
        t.clear();
      }
    } else {
      for (var [, i] of this.rRi)
        for (var [, r] of i) this.hRi.delete(r.MarkId), r.Destroy();
      this.rRi.clear(),
        this.sRi.clear(),
        this.nRi.clear(),
        this.iRi.ClearData(),
        this.oRi.ClearData();
    }
  }
  TRi(t) {
    var e,
      i = t.WorldPosition;
    i &&
      ((i = this.IRi(i)),
      (e = this.nRi.get(i))
        ? e.add(t)
        : ((e = new Set().add(t)), this.nRi.set(i, e)),
      (t.GridId = i));
  }
  LRi(t) {
    var e = t.GridId,
      e = this.nRi.get(e);
    e && e.delete(t);
  }
  AddMarkItem(e, i) {
    if (i) {
      let t = this.GetMarkItemsByType(e);
      t || ((t = new Map()), this.rRi.set(e, t)),
        t.set(i.MarkId, i),
        this.TRi(i);
    }
  }
  RemoveMarkItem(t, e) {
    t = this.GetMarkItemsByType(t);
    if (t && 0 !== t.size) {
      var i = t.get(e);
      if ((t.delete(e), this.hRi.delete(e), i))
        return (
          this.LRi(i),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Map", 50, "移除标记_MarkMgr", ["MarkId", e]),
          i
        );
    }
  }
  DRi(t, e, i) {
    var r = t.Holder;
    r &&
      this.MapType === r.MapType &&
      void 0 !== e &&
      t.GetRootItem() &&
      (t.GetRootItem().SetUIParent(e),
      t.SetScale(this.lRi),
      (e = i.AddMarkItem(r.MarkType, r.ShowPriority)),
      t.GetRootItem().SetHierarchyIndex(e));
  }
  RRi(t, e, i) {
    var r = t.Holder;
    r &&
      this.MapType === r.MapType &&
      t.GetRootItem() &&
      e === t.GetRootItem().GetParentAsUIItem() &&
      (i.RemoveMarkItem(t.Holder.MarkType, t.Holder.ShowPriority),
      t.SetScale(this.lRi));
  }
  cRi(t) {
    this.DRi(t, this.tRi, this.iRi);
  }
  dRi(t) {
    this.RRi(t, this.tRi, this.iRi);
  }
  GetMarkItemsByType(t) {
    return this.rRi.get(t);
  }
  GetMarkItem(t, e) {
    if (0 === t) {
      let t = void 0;
      for (const [, i] of this.GetAllMarkItems()) if ((t = i.get(e))) break;
      return t;
    }
    const i = this.GetMarkItemsByType(t);
    if (i) return i.get(e);
  }
  GetAllMarkItems() {
    return this.rRi;
  }
  GetAllMarkItemsByMapId(t) {
    var e,
      i,
      r = new Map();
    for ([e, i] of this.rRi)
      for (var [s, n] of i)
        if (n.MapId === t) {
          let t = r.get(e);
          t || ((t = new Map()), r.set(e, t)), t.set(s, n);
        }
    return r;
  }
  GetMarkItemsByClickPosition(t) {
    var t = MapUtil_1.MapUtil.UiPosition2WorldPosition(t),
      t = this.IRi(t),
      e = [];
    for (const r of this.URi(t)) {
      var i = this.nRi.get(r);
      i && e.push(...i);
    }
    return e;
  }
  URi(t) {
    return new Set([
      t,
      t + MapDefine_1.MARK_HASH_XY_PANDING,
      t - MapDefine_1.MARK_HASH_XY_PANDING,
      t + 1,
      t - 1,
      t + MapDefine_1.MARK_HASH_XY_PANDING - 1,
      t + MapDefine_1.MARK_HASH_XY_PANDING + 1,
      t - MapDefine_1.MARK_HASH_XY_PANDING - 1,
      t + 1,
    ]);
  }
  UpdateNearbyMarkItem(t, e, i) {
    var r,
      t = this.IRi(t),
      s = this.URi(t);
    for (const _ of s) {
      const n = this.nRi.get(_);
      if (n)
        for (const M of n)
          this.hRi.has(M.MarkId) ||
            M instanceof PlayerMarkItem_1.PlayerMarkItem ||
            this.hRi.set(M.MarkId, M);
    }
    const n = this.GetMarkItemsByType(11);
    if (n) for (var [, a] of n) this.hRi.set(a.MarkId, a);
    for ([, r] of this.hRi)
      e(r), r.IsCanShowView || (this.aRi.add(r), this.hRi.delete(r.MarkId));
    for (const f of this.sRi) e(f);
    if (0 !== this.aRi.size) {
      for (const v of this.aRi) {
        var h = v.GridId;
        s.has(h) ||
          (v.LogicUpdate(
            GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
          ),
          i(v));
      }
      this.aRi.clear();
    }
    for (const l of s) {
      var o = this.nRi.get(l);
      if (o) for (const m of o) e(m);
    }
  }
  ERi() {
    let t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMarks(this._Ri);
    0 === t.length &&
      this._Ri !== MapDefine_1.BIG_WORLD_MAP_ID &&
      2 === this.MapType &&
      ((this._Ri = MapDefine_1.BIG_WORLD_MAP_ID),
      (t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMarks(this._Ri)));
    for (const n of t) {
      var e;
      1 !== n.MarkId &&
        ((e = MarkItemUtil_1.MarkItemUtil.CreateConfigMark(
          n.MarkId,
          n,
          this.MapType,
          this.lRi,
          this.tRi,
        )),
        this.AddMarkItem(n.ObjectType, e));
    }
    var i, r;
    for ([
      i,
      r,
    ] of ModelManager_1.ModelManager.MapModel.GetEntityPendingList()) {
      var s = EntitySystem_1.EntitySystem.Get(i);
      s
        ? ((s = s.GetComponent(1)?.Owner), this.SRi(r, i, s))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Map", 50, "找不到实体对象", [
            "实体ID",
            i.toString(),
          ]);
    }
  }
  yRi() {
    for (const t of ModelManager_1.ModelManager.MapModel.GetAllDynamicMarks().values())
      for (const e of t.values())
        e.MapId === this._Ri && this.CreateDynamicMark(e);
  }
  MRi(t) {
    if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel())
      for (const i of t) {
        var e;
        i.GetPlayerId() !==
          ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
          ((e =
            ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(
              i.GetPlayerId(),
            )?.PlayerNumber ?? 1),
          (e = new MapDefine_1.PlayerMarkCreateInfo(
            i.GetPlayerId(),
            e,
            i.GetLocation().ToUeVector(),
          )),
          (e = MarkItemUtil_1.MarkItemUtil.Create(
            e,
            this.MapType,
            this.lRi,
            this.tRi,
          )),
          this._Ri === MapDefine_1.BIG_WORLD_MAP_ID && (e.IsInAoiRange = !0),
          this.AddMarkItem(11, e));
      }
  }
  SRi(t, e, i) {
    ObjectUtils_1.ObjectUtils.IsValid(i) &&
      ((e = MarkItemUtil_1.MarkItemUtil.CreateEntityMark(
        e,
        t,
        this.tRi,
        i,
        this.MapType,
        this.lRi,
      )),
      this.AddMarkItem(7, e));
  }
}
exports.MapMarkMgr = MapMarkMgr;
//# sourceMappingURL=MapMarkMgr.js.map
