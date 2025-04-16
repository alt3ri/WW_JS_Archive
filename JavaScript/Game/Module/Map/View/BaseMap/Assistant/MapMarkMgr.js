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
  WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine"),
  MarkPanelPoolFactory_1 = require("../../../Container/MarkPanelPoolFactory"),
  MarkSpritePool_1 = require("../../../Container/MarkSpritePool"),
  MapController_1 = require("../../../Controller/MapController"),
  MapDefine_1 = require("../../../MapDefine"),
  MapUtil_1 = require("../../../MapUtil"),
  CustomMarkItem_1 = require("../../../Marks/MarkItem/CustomMarkItem"),
  MarkItemUtil_1 = require("../../../Marks/MarkItemUtil"),
  MapLogger_1 = require("../../../Misc/MapLogger"),
  MapMarkContainer_1 = require("./MapMarkContainer");
class MapMarkMgr {
  constructor(e) {
    (this.tUi = void 0),
      (this.iUi = new WorldMapDefine_1.MarkPriority2HierarchyIndexHelper()),
      (this.oUi = new WorldMapDefine_1.MarkPriority2HierarchyIndexHelper()),
      (this.MapType = 2),
      (this.ylh = new MapMarkContainer_1.MapMarkContainer()),
      (this.lUi = 1),
      (this._Ui = 0),
      (this.z3t = 0),
      (this.YCc = 1),
      (this.uUi = (e) => {
        this.cUi(e);
      }),
      (this.mUi = (e) => {
        this.dUi(e);
      }),
      (this.ixa = (e) => {
        if (e === this.MapType) {
          var i = this.GetMarkItemsByType(9);
          let t = `---自定义标记信息---地图类型:${e}
`;
          i?.forEach((e) => {
            t =
              "" +
              t +
              `MarkId:${e.MarkId},
UiPosition:${e.UiPosition.ToString()},
WorldPosition:${e.WorldPosition.ToString()}

`;
          }),
            Log_1.Log.CheckDebug() && Log_1.Log.Debug("Map", 63, t);
        }
      }),
      (this.xll = (e, t, i) => {
        t = this.iUi.AddMarkItem(t, i);
        e.SetHierarchyIndex(t);
      }),
      (this.Pll = (e, t) => {
        this.iUi.RemoveMarkItem(e, t);
      }),
      (this.CreateDynamicMark = (e, t = !0) => {
        if (t && this.ylh.ExistMarkItemTask(e.MarkType, e.MarkId))
          return void MapLogger_1.MapLogger.ErrorOnce(
            e.MarkId,
            63,
            "MarkMgr.CreateDynamicMark->重复添加标记,任务队列已存在",
            ["MarkId", e.MarkId],
            ["MarkType", e.MarkType],
          );
        if (this.ylh.ExistMarkItem(e.MarkType, e.MarkId))
          MapLogger_1.MapLogger.ErrorOnce(
            e.MarkId,
            63,
            "MarkMgr.CreateDynamicMark->重复添加标记,已存在",
            ["MarkId", e.MarkId],
            ["MarkType", e.MarkType],
          );
        else {
          t = MarkItemUtil_1.MarkItemUtil.Create(
            e,
            this.MapType,
            this.lUi,
            this.tUi,
          );
          if (t) return this.AddMarkItem(t.MarkType, t), t;
        }
      }),
      (this.CreateTempMapMark = (e) => {
        var t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
        if (t) {
          var i = this.ylh.GetMarkItem(t.ObjectType, e);
          if (void 0 !== i) i.MarkItemEntity.IsTempMapMark = !0;
          else {
            i = MarkItemUtil_1.MarkItemUtil.CreateConfigMark(
              t.MarkId,
              t,
              this.MapType,
              this.lUi,
              this.tUi,
            );
            if (i)
              return (
                (i.MarkItemEntity.IsTempMapMark = !0),
                this.AddMarkItem(i.MarkType, i),
                i
              );
          }
        } else
          MapLogger_1.MapLogger.DebugOnce(
            e,
            63,
            "创建临时静态标记失败,找不到MapMark配置",
            ["MapMarkId", e],
          );
      }),
      (this.CUi = (e, t, i) => {
        t = this.GetMarkItem(e, t);
        t &&
          t instanceof CustomMarkItem_1.CustomMarkItem &&
          (t.SetConfigId(i), t.IsTracked) &&
          (this.gUi(e, t.MarkId, !1), this.gUi(e, t.MarkId, !0));
      }),
      (this.fUi = (e, t) => {
        this.ylh.RemoveDynamicMark(e, t);
      }),
      (this.gUi = (e, t, i, s = !1) => {
        this.ylh.TrackMapMark(e, t, i, s);
      }),
      (this.ngt = (e) => {
        this.ylh.TrackMark(e);
      }),
      (this.sgt = (e) => {
        this.ylh.UnTrackMark(e);
      }),
      (this._Xt = () => {
        this.ylh.ClearTrackMark();
      }),
      (this.pUi = () => {
        var e = this.GetMarkItemsByType(11);
        e && 0 < e.size && this.vUi(11),
          this.MUi(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlayerMarkItemChanged,
          );
      }),
      (this.uRi = (e) => {
        e = this.GetMarkItem(0, e);
        void 0 !== e &&
          e.IsTracked &&
          34 !== e.MarkType &&
          MapController_1.MapController.RequestTrackMapMark({
            MarkType: e.MarkType,
            MarkId: e.MarkId,
            Track: !1,
          });
      }),
      (this.Gd_ = (e) => {
        if (!e) {
          e = this.GetMarkItemsByType(34, !0);
          if (e)
            for (const t of e.values())
              t.IsTracked &&
                MapController_1.MapController.RequestTrackMapMark({
                  MarkType: t.MarkType,
                  MarkId: t.MarkId,
                  Track: !1,
                });
        }
      }),
      (this.Jpe = (e, t, i) => {
        var s = t.Entity.GetComponent(0),
          r = s.GetPbEntityInitData(),
          n = s.GetEntityConfigType();
        n === Protocol_1.Aki.Protocol.rLs.Proto_OldEntity ||
          n === Protocol_1.Aki.Protocol.rLs.Proto_Character ||
          MapUtil_1.MapUtil.IsTemporaryTeleportEntity(r) ||
          ((n = s.GetBaseInfo())?.MapIcon && this.EUi(n.MapIcon, t.Id, i));
      }),
      (this.zpe = (e, t) => {
        this.ylh.RemoveNeedUpdateMark(t.Id),
          this.RemoveMarkItem(7, t.Id)?.Destroy();
      }),
      (this.MapType = e.MapType),
      (this._Ui = e.MapId),
      (this.z3t = e.InstanceDungeonId),
      (this.lUi = e.MarkScale),
      (this.tUi = e.MarkContainer),
      (this.YCc = e.Gravity ?? 1);
  }
  Initialize() {
    this.dde();
  }
  Dispose() {
    this.Cde(),
      MarkPanelPoolFactory_1.MarkItemViewPoolFactory.Dispose(),
      MarkSpritePool_1.MarkSpritePool.Dispose(),
      this.vUi(void 0);
  }
  OnMapSetup(e) {
    this.vUi(void 0, e), this.SUi(), this.yUi(), this.MUi();
  }
  OnChangeWorldMap(e, t, i) {
    this.z3t !== t || this.YCc !== i
      ? ((this._Ui = e), (this.z3t = t), (this.YCc = i), this.OnMapSetup(!1))
      : MapLogger_1.MapLogger.Debug(
          63,
          "地图系统->切换地图标记失败， 地图参数没有发生变化",
          ["InstanceDungeonIdInner", this.z3t],
          ["instanceId", t],
          ["MapId", e],
          ["MapGravity", this.YCc],
          ["gravity", i],
        );
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
        EventDefine_1.EEventName.CreateTempMapMark,
        this.CreateTempMapMark,
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
        EventDefine_1.EEventName.ScenePlayerLeaveScene,
        this.pUi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnlockTeleport,
        this.uRi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DriveFishingShipStateChanged,
        this.Gd_,
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
        EventDefine_1.EEventName.TakeMarkComponentEnterContainer,
        this.xll,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TakeMarkComponentExitContainer,
        this.Pll,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LogCustomMarkInfo,
        this.ixa,
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
        EventDefine_1.EEventName.CreateTempMapMark,
        this.CreateTempMapMark,
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
        EventDefine_1.EEventName.ScenePlayerLeaveScene,
        this.pUi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UnlockTeleport,
        this.uRi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DriveFishingShipStateChanged,
        this.Gd_,
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
        EventDefine_1.EEventName.TakeMarkComponentEnterContainer,
        this.xll,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TakeMarkComponentExitContainer,
        this.Pll,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LogCustomMarkInfo,
        this.ixa,
      );
  }
  vUi(e, t) {
    this.ylh.ClearMarkItems(e, t),
      e || (this.iUi.ClearData(), this.oUi.ClearData());
  }
  AddMarkItem(e, t) {
    this.ylh.AddMarkItem(e, t);
  }
  RemoveMarkItem(e, t) {
    return this.ylh.RemoveMarkItem(e, t);
  }
  DUi(e, t, i) {
    var s = e.Holder;
    s &&
      this.MapType === s.MapType &&
      void 0 !== t &&
      e.GetRootItem() &&
      (e.GetRootItem().SetUIParent(t),
      e.SetScale(this.lUi),
      (t = i.AddMarkItem(s.MarkType, s.ShowPriority)),
      e.GetRootItem().SetHierarchyIndex(t));
  }
  RUi(e, t, i) {
    var s = e.Holder;
    s &&
      this.MapType === s.MapType &&
      e.GetRootItem() &&
      t === e.GetRootItem().GetParentAsUIItem() &&
      (i.RemoveMarkItem(e.Holder.MarkType, e.Holder.ShowPriority),
      e.SetScale(this.lUi));
  }
  cUi(e) {
    this.DUi(e, this.tUi, this.iUi);
  }
  dUi(e) {
    this.RUi(e, this.tUi, this.iUi);
  }
  GetMarkItemsByType(e, t = !0) {
    return this.ylh.GetMarkItemsByType(e, t);
  }
  GetMarkItem(e, t) {
    return this.ylh.GetMarkItem(e, t);
  }
  GetAllMarkItems() {
    return this.ylh.GetAllMarkItems();
  }
  GetMarkItemsByClickPosition(e) {
    return this.ylh.GetMarkItemsByClickPosition(e);
  }
  UpdateNearbyMarkItem(e, t, i) {
    this.ylh.UpdateNearbyMarkItem(e, t, i);
  }
  Tick() {
    this.ylh.Tick(),
      MarkPanelPoolFactory_1.MarkItemViewPoolFactory.Tick(),
      MarkSpritePool_1.MarkSpritePool.Tick();
  }
  FindNearbyMarkItems(e, t, i) {
    return this.ylh.FindNearbyMarkItems(e, t, i);
  }
  SUi() {
    var e,
      t =
        ConfigManager_1.ConfigManager.MapConfig.GetMapMarkListByInstanceDungeonId(
          this.z3t,
        ),
      i = ConfigManager_1.ConfigManager.MapConfig.GetConfigMarks(this._Ui),
      t = t.concat(i),
      i = Array.from(new Set(t)),
      s =
        ((ModelManager_1.ModelManager.WorldMapModel.EnableInstanceDungeonFilterMark =
          !1),
        ModelManager_1.ModelManager.WorldMapModel.IsPlayerInActivityInstanceDungeon());
    for (const n of i) {
      var r = ModelManager_1.ModelManager.TrackModel.IsTracking(1, n.MarkId);
      (1 !== n.CreateOnStart && !r) ||
        (s &&
          n.InstanceDungeonId === this.z3t &&
          (ModelManager_1.ModelManager.WorldMapModel.EnableInstanceDungeonFilterMark =
            !0),
        (r = this._Ui === n.MapId),
        this.ylh.AddCreateMarkTask(r, n.ObjectType, n.MarkId, () => {
          var e = MarkItemUtil_1.MarkItemUtil.CreateConfigMark(
            n.MarkId,
            n,
            this.MapType,
            this.lUi,
            this.tUi,
          );
          this.AddMarkItem(n.ObjectType, e);
        }));
    }
    for (const [
      a,
      h,
    ] of ModelManager_1.ModelManager.MapModel.GetEntityPendingList()) {
      const _ = EntitySystem_1.EntitySystem.Get(a);
      _
        ? ((e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(h)),
          this.ylh.AddCreateMarkTask(!0, e?.ObjectType ?? 0, h, () => {
            var e = _.GetComponent(1)?.Owner;
            this.EUi(h, a, e);
          }))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Map", 63, "找不到实体对象", [
            "实体ID",
            a.toString(),
          ]);
    }
    this.no_();
  }
  no_() {
    var e;
    for (const t of ModelManager_1.ModelManager.MapModel.GetPendingAddTempMapMarkList()) {
      const i = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(t);
      i
        ? void 0 !== (e = this.ylh.GetMarkItem(i.ObjectType, t))
          ? (e.MarkItemEntity.IsTempMapMark = !0)
          : ((e = this._Ui === i.MapId),
            this.ylh.AddCreateMarkTask(e, i.ObjectType, i.MarkId, () => {
              var e = MarkItemUtil_1.MarkItemUtil.CreateConfigMark(
                i.MarkId,
                i,
                this.MapType,
                this.lUi,
                this.tUi,
              );
              (e.MarkItemEntity.IsTempMapMark = !0),
                this.AddMarkItem(i.ObjectType, e);
            }))
        : MapLogger_1.MapLogger.DebugOnce(
            t,
            63,
            "创建临时静态标记失败,找不到MapMark配置",
            ["MapMarkId", t],
          );
    }
  }
  yUi() {
    for (const t of ModelManager_1.ModelManager.MapModel.GetAllDynamicMarks().values())
      for (const i of t.values()) {
        var e = this._Ui === i.MapId;
        this.ylh.AddCreateMarkTask(e, i.MarkType, i.MarkId, () => {
          this.CreateDynamicMark(i, !1);
        });
      }
  }
  MUi() {
    if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
      var e, t;
      for (const i of ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers())
        i.GetPlayerId() !==
          ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
          ((e =
            ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(
              i.GetPlayerId(),
            )?.PlayerNumber ?? 1),
          (e = new MapDefine_1.PlayerMarkCreateInfo(
            i.GetPlayerId(),
            e,
            i.GetLocation().ToUeVectorOld(),
            ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId,
          )),
          (e = MarkItemUtil_1.MarkItemUtil.Create(
            e,
            this.MapType,
            this.lUi,
            this.tUi,
          )),
          ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(this._Ui) &&
            (e.IsInAoiRange = !0),
          this.AddMarkItem(11, e));
      for (const s of ModelManager_1.ModelManager.OnlineModel
        .OtherScenePlayerDataList)
        s.PlayerId !== ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
          ((t =
            ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(
              s.PlayerId,
            )?.PlayerNumber ?? 1),
          (t = new MapDefine_1.PlayerMarkCreateInfo(
            s.PlayerId,
            t,
            s.Location?.ToUeVectorOld() ?? Vector_1.Vector.ZeroVector,
            s.MapId,
          )),
          (t = MarkItemUtil_1.MarkItemUtil.Create(
            t,
            this.MapType,
            this.lUi,
            this.tUi,
          )),
          ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(this._Ui) &&
            (t.IsInAoiRange = !0),
          this.AddMarkItem(11, t));
    }
  }
  GetTrackMenuMarkList() {
    return this.ylh.GetTrackMenuMarkList();
  }
  GetNavigateMarkList() {
    return this.ylh.GetNavigateMarkList();
  }
  EUi(e, t, i) {
    ObjectUtils_1.ObjectUtils.IsValid(i) &&
      ((t = MarkItemUtil_1.MarkItemUtil.CreateEntityMark(
        t,
        e,
        this.tUi,
        i,
        this.MapType,
        this.lUi,
      )),
      this.AddMarkItem(7, t));
  }
}
exports.MapMarkMgr = MapMarkMgr;
//# sourceMappingURL=MapMarkMgr.js.map
