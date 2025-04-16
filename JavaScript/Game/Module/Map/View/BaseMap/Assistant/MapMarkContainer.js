"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapMarkContainer = void 0);
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  GeneralLogicTreeUtil_1 = require("../../../../GeneralLogicTree/GeneralLogicTreeUtil"),
  TrackController_1 = require("../../../../Track/TrackController"),
  MapDefine_1 = require("../../../MapDefine"),
  MapUtil_1 = require("../../../MapUtil"),
  MarkDefine_1 = require("../../../Mark/MarkDefine"),
  MapLogger_1 = require("../../../Misc/MapLogger"),
  MapMarkPreemptiveFrameQueue_1 = require("./MapFrameTaskQueue/MapMarkPreemptiveFrameQueue");
class MapMarkContainer {
  constructor() {
    (this.vlh = new MapMarkPreemptiveFrameQueue_1.MapMarkPreemptiveFrameQueue(
      50,
    )),
      (this.rUi = new Map()),
      (this.Mlh = new Map()),
      (this.nUi = new Map()),
      (this.hUi = new Map()),
      (this.sUi = new Set()),
      (this.aUi = new Set()),
      (this.qDl = new Set());
  }
  Tick() {
    this.vlh.Process();
  }
  ClearMarkItems(e, t) {
    if (e) {
      var r = this.rUi.get(e);
      if (r) {
        for (var [, a] of r)
          this.hUi.delete(a.MarkId), a.Destroy(t), this.LUi(a);
        r.clear();
      }
      r = this.Mlh.get(e);
      if (r) {
        for (var [, i] of r) i.Destroy(t);
        r.clear();
      }
      this.vlh.CancelMapTaskByType(e);
    } else
      this.nIl(this.rUi, t),
        this.nIl(this.Mlh, t),
        this.sUi.clear(),
        this.rUi.clear(),
        this.Mlh.clear(),
        this.nUi.clear(),
        this.vlh.Dispose();
  }
  AddMarkItem(t, r) {
    var e;
    if (r)
      if (
        (r.IsTracked &&
          12 !== r.MarkType &&
          ((e = { MarkType: r.MarkType, MarkId: r.MarkId, Track: !0 }),
          ModelManager_1.ModelManager.MapModel.IsEqualToCurTrack(e) ||
            ModelManager_1.ModelManager.MapModel.SetCurTrackMark(e),
          this.sUi.add(r)),
        r.IsInConsistentDistrict())
      )
        MapLogger_1.MapLogger.Debug(
          63,
          "标记系统->MapMarkContainer.AddMarkItem, 被添加到跨地图列表，将不会显示在地图上",
          ["markType", t],
          ["markId", r.MarkId],
          ["MapType", r.MapType],
          ["InstanceDungeonId", r.InstanceDungeonId],
          ["MapId", r.MapId],
        ),
          this.Slh(t, r);
      else {
        let e = this.GetMarkItemsByType(t, !1);
        e || ((e = new Map()), this.rUi.set(t, e)),
          e.has(r.MarkId)
            ? ModelManager_1.ModelManager.WorldMapModel.EnableDebug &&
              MapLogger_1.MapLogger.ErrorOnce(
                r.MarkId,
                63,
                "重复添加标记_MarkMgr",
                ["MarkId", r.MarkId],
              )
            : (e.set(r.MarkId, r),
              this.TUi(r),
              MapLogger_1.MapLogger.Debug(
                63,
                "标记系统->MapMarkContainer.AddMarkItem",
                ["markType", t],
                ["markId", r.MarkId],
                ["MapType", r.MapType],
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.AddMapMark,
                r,
              ));
      }
  }
  Slh(t, r) {
    if (r) {
      let e = this.GetDifferMapMarkItemsByType(t);
      e || ((e = new Map()), this.Mlh.set(t, e)), e.set(r.MarkId, r);
    }
  }
  RemoveMarkItem(e, t) {
    this.vlh.CancelMapTask(e, t);
    var r = this.GetMarkItemsByType(e);
    if (r && 0 !== r.size) {
      var a = r.get(t);
      if ((r.delete(t), this.hUi.delete(t), a))
        return (
          this.LUi(a),
          MapLogger_1.MapLogger.Debug(
            63,
            "标记系统->MapMarkContainer.RemoveMarkItem",
            ["markType", e],
            ["markId", t],
          ),
          a
        );
    }
  }
  nIl(e, t) {
    for (var [, r] of e)
      for (var [, a] of r) this.hUi.delete(a.MarkId), a.Destroy(t);
  }
  TUi(e) {
    var t,
      r = e.WorldPosition;
    r &&
      ((r = this.ConvertWorldPositionToIndex(r)),
      (t = this.nUi.get(r))
        ? this.DO_(t, e)
        : ((t = new Set().add(e)), this.nUi.set(r, t)),
      (e.GridId = r));
  }
  DO_(e, t) {
    e.has(t)
      ? MapLogger_1.MapLogger.ErrorOnce(
          t.MarkId,
          63,
          "重复添加标记到格子集合中_MarkMarkContainer",
          ["MarkId", t.MarkId],
        )
      : e.add(t);
  }
  LUi(e) {
    var t = e.GridId,
      t = this.nUi.get(t);
    t && t.delete(e);
  }
  ExistMarkItem(e, t) {
    return void 0 !== this.GetMarkItemPurely(e, t);
  }
  ExistMarkItemTask(e, t) {
    return this.vlh.HasTask(e, t);
  }
  GetMarkItem(e, t) {
    return this.vlh.ForceExecuteTask(e, t), this.GetMarkItemPurely(e, t);
  }
  GetMarkItemPurely(e, t) {
    if (0 === e) {
      const a = this.GetMarkItemById(t);
      return a;
    }
    var r = this.GetMarkItemsByType(e);
    if (r) {
      const a = r.get(t);
      return a || this.GetDifferMapMarkItem(e, t);
    }
  }
  GetMarkItemById(a, e = !1) {
    var t = (e) => {
      let t = void 0;
      for (var [, r] of e) if ((t = r.get(a))) break;
      return t;
    };
    let r = t(this.GetAllMarkItems());
    return (
      void 0 === r && e && ((e = this.GetAllDiffMapMarkItems()), (r = t(e))), r
    );
  }
  GetDifferMapMarkItem(e, t) {
    e = this.GetDifferMapMarkItemsByType(e);
    if (e) return e.get(t) || void 0;
  }
  GetMarkItemsByType(e, t = !0) {
    var r = this.rUi.get(e);
    return (!r || r.size <= 0) && t ? this.GetDifferMapMarkItemsByType(e) : r;
  }
  GetDifferMapMarkItemsByType(e) {
    return this.Mlh.get(e);
  }
  GetAllMarkItems() {
    return this.rUi;
  }
  GetAllDiffMapMarkItems() {
    return this.Mlh;
  }
  ConvertWorldPositionToIndex(e) {
    var t = Math.floor(
        Math.round(e.X * MapDefine_1.MARK_WORLD_TO_HASH_SCALE) /
          MapDefine_1.MARK_SCOPE,
      ),
      e = Math.floor(
        Math.round(e.Y * MapDefine_1.MARK_WORLD_TO_HASH_SCALE) /
          MapDefine_1.MARK_SCOPE,
      );
    return t * MapDefine_1.MARK_HASH_XY_PANDING + e;
  }
  GetAroundIndex(e) {
    return new Set([
      e,
      e + MapDefine_1.MARK_HASH_XY_PANDING,
      e - MapDefine_1.MARK_HASH_XY_PANDING,
      e + 1,
      e - 1,
      e + MapDefine_1.MARK_HASH_XY_PANDING - 1,
      e + MapDefine_1.MARK_HASH_XY_PANDING + 1,
      e - MapDefine_1.MARK_HASH_XY_PANDING - 1,
      e - MapDefine_1.MARK_HASH_XY_PANDING + 1,
    ]);
  }
  GetMarkItemsByClickPosition(e) {
    var e = MapUtil_1.MapUtil.UiPosition2WorldPosition(e),
      e = this.ConvertWorldPositionToIndex(e),
      t = [];
    for (const a of this.GetAroundIndex(e)) {
      var r = this.nUi.get(a);
      r && t.push(...r);
    }
    return t;
  }
  UpdateNearbyMarkItem(e, t, r) {
    this.vlh.Flush();
    var a,
      e = this.ConvertWorldPositionToIndex(e),
      i = this.GetAroundIndex(e);
    for (const o of i) {
      var s = this.nUi.get(o);
      if (s)
        for (const h of s)
          this.hUi.has(h.MarkId) ||
            11 === h.MarkType ||
            this.hUi.set(h.MarkId, h);
    }
    this.GDl();
    for ([, a] of this.hUi) {
      t(a);
      var n = a.GridId;
      this.qDl.has(a.MarkId) ||
        (a.IsCanShowView && i.has(n)) ||
        (this.aUi.add(a), this.hUi.delete(a.MarkId));
    }
    for (const f of this.sUi) t(f);
    if (0 !== this.aUi.size) {
      for (const k of this.aUi) k.IsDestroy || r(k);
      this.aUi.clear();
    }
    for (const _ of i) {
      var M = this.nUi.get(_);
      if (M) for (const p of M) t(p);
    }
  }
  GDl() {
    this.qDl.clear();
    for (const r of MarkDefine_1.permanentUpdateTypeSet) {
      var e = this.GetMarkItemsByType(r);
      if (e)
        for (var [, t] of e) this.hUi.set(t.MarkId, t), this.qDl.add(t.MarkId);
    }
  }
  FindNearbyMarkItems(r, e, a) {
    this.vlh.Flush();
    var t = this.ConvertWorldPositionToIndex(r.WorldPosition),
      i =
        Math.ceil(
          1 / (MapDefine_1.MARK_SCOPE * MapDefine_1.MARK_WORLD_TO_HASH_SCALE),
        ) + 1,
      s = this.GetAroundIndex(t);
    let n = Array.from(s.values());
    var M = new Set();
    M.add(t);
    for (let e = 0; e <= i; ++e) {
      var o = [];
      for (const k of n)
        if (!M.has(k)) {
          for (const _ of this.GetAroundIndex(k)) M.has(_) || o.push(_);
          M.add(k);
        }
      n = o;
    }
    const h = [],
      f = e * e;
    for (const p of M)
      this.nUi.get(p)?.forEach((e) => {
        var t;
        (a?.(e) ?? !0) &&
          (t =
            (9 !== r.MarkType && 22 !== r.MarkType) ||
            !MathUtils_1.MathUtils.IsNearlyZero(r.WorldPosition.Z)
              ? Vector_1.Vector.DistSquared(e.WorldPosition, r.WorldPosition)
              : Vector2D_1.Vector2D.DistSquared(
                  Vector2D_1.Vector2D.Create(
                    e.WorldPosition.X,
                    e.WorldPosition.Y,
                  ),
                  Vector2D_1.Vector2D.Create(
                    r.WorldPosition.X,
                    r.WorldPosition.Y,
                  ),
                )) <= f &&
          h.push([e, t]);
      });
    return 0 < h.length && h.sort((e, t) => e[1] - t[1]), h;
  }
  RemoveDynamicMark(e, t) {
    var r = this.GetMarkItem(e, t);
    r &&
      (this.TrackMapMark(e, r.MarkId, !1),
      this.hUi.has(t) && this.hUi.delete(t),
      void 0 !== (r = this.RemoveMarkItem(e, t))) &&
      r.Destroy();
  }
  TrackMapMark(t, r, a, i = !1) {
    var s = ModelManager_1.ModelManager.TrackModel.GetTrackData(1, r),
      n = this.GetMarkItem(t, r);
    if (n || s) {
      let e = 0;
      s && ((e = s.TrackSource), (s.IconPath = n?.IconPath ?? s.IconPath)),
        n && (e = n.TrackSource);
      s = ModelManager_1.ModelManager.TrackModel.IsTracking(e, r);
      i || s !== a
        ? a
          ? n &&
            ((i = n.MarkItemEntity.GetComponent(15)?.Config),
            TrackController_1.TrackController.StartTrack({
              TrackSource: n.TrackSource,
              Id: r,
              MarkType: t,
              IconPath: n.IconPath,
              TrackTarget: n.TrackTarget,
              TrackInstanceId: n.RelativeInstanceDungeonId,
              TrackHudEnable: 1 === i?.TrackHudEnable,
              TrackAutoCancelDistance: i?.TrackAutoCancelDistance,
            }),
            this.sUi.add(n),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnMarkItemTrackStateChange,
              n,
            ))
          : (TrackController_1.TrackController.EndTrack(e, r),
            n &&
              (this.aUi.add(n),
              this.sUi.delete(n),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnMarkItemTrackStateChange,
                n,
              )))
        : n &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnMarkItemTrackStateChange,
            n,
          );
    }
  }
  TrackMark(e) {
    e = this.GetMarkItem(e.MarkType ?? 0, e.Id);
    e &&
      !e.IsTracked &&
      e.LogicUpdate(
        GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
      ),
      ((e && e.View) ?? e?.IsTracked) && this.sUi.add(e);
  }
  UnTrackMark(e) {
    e = this.GetMarkItem(e.MarkType ?? 0, e.Id);
    e && (this.sUi.delete(e), this.aUi.add(e));
  }
  ClearTrackMark() {
    for (const e of this.sUi) e && e.View && this.aUi.add(e);
    this.sUi.clear();
  }
  GetTrackMenuMarkList() {
    const t = [];
    return (
      this.GetMarkItemsByType(11, !1)?.forEach((e) => {
        t.push(e);
      }),
      this.GetMarkItemsByType(12, !1)?.forEach((e) => {
        e.IsTracked && t.push(e);
      }),
      this.sUi.forEach((e) => {
        e.IsTracked && !e.IsInConsistentDistrict() && t.push(e);
      }),
      t
    );
  }
  GetNavigateMarkList() {
    const r = [],
      a = ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId;
    this.GetMarkItemsByType(11, !1)?.forEach((e) => {
      var t = ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapId(
        e.InstanceDungeonOrMapConfigId,
      );
      a === t && r.push(e);
    }),
      this.GetDifferMapMarkItemsByType(11)?.forEach((e) => {
        var t = ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapId(
          e.InstanceDungeonOrMapConfigId,
        );
        ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(
          t ?? e.MapId,
        ) && r.push(e);
      });
    var e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest(),
      t = e?.GetFirstNoHideTrackActiveChildQuestNode()?.NodeId ?? 0,
      e = e?.GetDefaultMark(t) ?? 0,
      t = this.GetMarkItem(12, e);
    return t && t.IsBtTypeQuest() && r.push(t), r;
  }
  RemoveNeedUpdateMark(e) {
    this.hUi.has(e) && this.hUi.delete(e);
  }
  AddCreateMarkTask(e, t, r, a) {
    this.vlh.AddTask({
      Priority: e ? 0 : 1,
      MarkType: t,
      MarkId: r,
      Execute: a,
    });
  }
}
exports.MapMarkContainer = MapMarkContainer;
//# sourceMappingURL=MapMarkContainer.js.map
