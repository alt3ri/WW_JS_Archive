"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItem = void 0);
const UE = require("ue"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
  WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine"),
  WorldMapSecondaryUiDefine_1 = require("../../../WorldMap/WorldMapSecondaryUiDefine"),
  MarkPanelPoolFactory_1 = require("../../Container/MarkPanelPoolFactory"),
  MarkSpritePool_1 = require("../../Container/MarkSpritePool"),
  MapController_1 = require("../../Controller/MapController"),
  MapDefine_1 = require("../../MapDefine"),
  MapUtil_1 = require("../../MapUtil"),
  MarkDefine_1 = require("../../Mark/MarkDefine"),
  MapLogger_1 = require("../../Misc/MapLogger");
class MarkItem {
  constructor(t, e, i, s = 1) {
    (this.IsVisible = !1),
      (this.wDl = void 0),
      (this.MapType = 2),
      (this.kDi = 1),
      (this.ShowPriority = 0),
      (this.IsDestroy = !1),
      (this.IsIgnoreScaleShow = !1),
      (this.ConfigScale = 1),
      (this.HCc = 1),
      (this.CornerScaleVector = new UE.Vector(1, 1, 1)),
      (this.TrackFxScale = 1),
      (this.FDi = void 0),
      (this.WorldPositionVector = void 0),
      (this.X__ = Vector2D_1.Vector2D.Create(0, 0)),
      (this.GridId = 0),
      (this.NeedPlayShowOrHideSeq = void 0),
      (this.h5l = void 0),
      (this.IsStreaming = !0),
      (this.gql = void 0),
      (this.EnableCachePosition = !0),
      (this.TrackSourceInner = 2),
      (this.QDi = void 0),
      (this.InnerView = void 0),
      (this.xbt = ""),
      (this.XDi = !1),
      (this.IsCanShowViewFinally = !1),
      (this.MapType = e),
      (this.kDi = i),
      (this.QDi = t),
      (this.TrackSourceInner = s),
      (this.FDi = void 0),
      (this.WorldPositionVector = Vector_1.Vector.Create());
  }
  get MarkItemEntity() {
    return (
      void 0 === this.wDl &&
        MapLogger_1.MapLogger.ErrorOnce(
          this.MarkId ?? 0,
          63,
          "没有初始化标记逻辑实体，请检查代码逻辑!",
          ["MarkId", this.MarkId],
          ["MarkType", this.MarkType],
        ),
      this.wDl
    );
  }
  set MarkItemEntity(t) {
    this.wDl = t;
  }
  get MarkItemType() {
    return 0;
  }
  set CornerScale(t) {
    (this.HCc = t),
      this.CornerScaleVector.Set(
        this.CornerScale,
        this.CornerScale,
        this.CornerScale,
      );
  }
  get CornerScale() {
    return this.HCc;
  }
  get VDi() {
    return ModelManager_1.ModelManager.TeleportModel.IsTeleport ?? !1;
  }
  get MapId() {
    return 0;
  }
  get InstanceDungeonId() {}
  get RelativeInstanceDungeonId() {
    return this.InstanceDungeonId;
  }
  get InstanceDungeonOrMapConfigId() {
    return void 0 === this.InstanceDungeonId || 0 === this.InstanceDungeonId
      ? this.MapId
      : this.InstanceDungeonId;
  }
  get MarkScale() {
    return this.kDi;
  }
  get UiPosition() {
    return (
      this.FDi ||
      MapUtil_1.MapUtil.WorldPosition2UiPosition(this.WorldPosition, this.FDi)
    );
  }
  get InitUiPosition() {
    return this.h5l || this.UiPosition;
  }
  SetAnchorOffset(t) {
    var e;
    (t.X === this.h5l?.X && t.Y === this.h5l?.Y) ||
      ((e = this.View?.GetRootItem()),
      (this.h5l = Vector_1.Vector.Create(t.X, t.Y, 0)),
      void 0 === e) ||
      ((t = t.ToUeVector2D(!0)), e.SetAnchorOffset(t));
  }
  IsMultiMap() {
    return !1;
  }
  LocateInGround() {
    return !0;
  }
  ConnectGround() {
    return !0;
  }
  GetMultiMapId() {
    return 0;
  }
  ShowSecondaryUiMultiMapIcon() {
    return this.IsMultiMap() && !this.LocateInGround();
  }
  get IsSelectThisFloor() {
    return this.MarkItemEntity.MultiFloor.IsSelectThisFloor;
  }
  set IsSelectThisFloor(t) {
    this.MarkItemEntity.MultiFloor.IsSelectThisFloor = t;
  }
  GetIsSelectThisFloor() {
    var t;
    return (
      !!this.IsMultiMap() &&
      ((t = this.GetMultiMapId()),
      1 === this.MapType
        ? this.InMultiMapArea(t)
        : ModelManager_1.ModelManager.WorldMapModel
            .WorldMapCurrentMultiMapId === t)
    );
  }
  InMultiMapArea(t) {
    var e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(),
      t = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(t);
    return !(!t || !t.Area.includes(e));
  }
  $Di(t, e) {
    (e = e.Tuple), (t = t.Tuple);
    return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
  }
  get WorldPosition() {
    var t;
    return (
      2 !== this.MapType &&
        this.TrackTarget instanceof Vector2D_1.Vector2D &&
        ((t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation()),
        this.$Di(t, this.TrackTarget) *
          MapDefine_1.FLOAT_0_01 *
          MapDefine_1.FLOAT_0_01 <
          3600) &&
        !this.VDi &&
        ((t = MapUtil_1.MapUtil.WorldPosition2UiPosition(
          Vector_1.Vector.Create(this.TrackTarget.X, this.TrackTarget.Y, 0),
        )),
        (t = MapController_1.MapController.GetMarkPosition(t.X, -t.Y))
          ? this.UpdateCustomMapMarkPosition(t)
          : (this.TrackTarget = Vector_1.Vector.Create(
              this.TrackTarget.X,
              this.TrackTarget.Y,
              0,
            ))),
      (void 0 !== this.WorldPositionVector && this.EnableCachePosition) ||
        ((this.WorldPositionVector =
          MapUtil_1.MapUtil.GetTrackPositionByTrackTargetConfig(
            this.TrackTarget,
            this.MapId,
            this.WorldPositionVector,
          )),
        (this.WorldPositionVector =
          this.WorldPositionVector ?? Vector_1.Vector.ZeroVectorProxy),
        (this.FDi = MapUtil_1.MapUtil.WorldPosition2UiPosition(
          this.WorldPositionVector,
          this.FDi,
        ))),
      this.WorldPositionVector
    );
  }
  UpdateCustomMapMarkPosition(t) {
    var e;
    9 === this.MarkType &&
      ((e = Vector_1.Vector.Create(t.X, -t.Y, t.Z)),
      (t = Vector_1.Vector.Create(t.X, t.Y, t.Z)),
      (e = MapUtil_1.MapUtil.UiPosition2WorldPosition(e)),
      (this.TrackTarget = e),
      MapController_1.MapController.UpdateCustomMapMarkPosition(this.MarkId, t),
      (e = Vector_1.Vector.Create()),
      this.TrackTarget.Multiply(MapDefine_1.FLOAT_0_01, e),
      ModelManager_1.ModelManager.MapModel.UpdateCustomMarkInfo(this.MarkId, e),
      ModelManager_1.ModelManager.TrackModel.UpdateTrackData(
        this.TrackSourceInner,
        this.MarkId,
        this.TrackTarget,
      ));
  }
  OnLoad() {}
  OnUnload() {}
  GetPreloadThreshold() {
    return this.X__;
  }
  GetUiPosition() {
    return this.UiPosition;
  }
  Initialize() {
    this.MarkItemEntity.Init(),
      (this.IsOutOfBound = !1),
      (this.IsInAoiRange = !1),
      this.OnInitialize();
  }
  OnInitialize() {}
  SetTrackData(t) {
    this.TrackTarget = t;
  }
  LogicUpdate(t) {
    this.OnUpdate(t), this.UpdateVisibleRelativeState();
  }
  async ViewUpdateAsync(t, e = !1, i = !1) {
    this.CreateOrCycleView(),
      await this.View?.LoadingPromise,
      this.InnerView?.OnUpdate(t, e, i);
  }
  Destroy(t = !0) {
    MapLogger_1.MapLogger.Debug(
      63,
      "标记系统->MarkItem.Destroy",
      ["markType", this.MarkType],
      ["MarkId", this.MarkId],
      ["InstanceDungeonId", this.InstanceDungeonId],
      ["MapId", this.MapId],
    ),
      (this.IsDestroy = !0),
      this.OnDestroy(),
      this.Ah_(t),
      this.MarkItemEntity.Dispose(),
      (this.QDi = void 0);
  }
  get IsInAoiRange() {
    return this.MarkItemEntity.ViewLifeCircle.IsInAoiRange;
  }
  set IsInAoiRange(t) {
    this.MarkItemEntity.ViewLifeCircle.IsInAoiRange = t;
  }
  u8_() {
    var t;
    void 0 === this.InnerView
      ? ((t = this.GetMarkItemViewType()),
        void 0 !==
        (t = MarkPanelPoolFactory_1.MarkItemViewPoolFactory.Get(
          t + "_" + this.MapType,
        ))
          ? ((this.InnerView = t),
            (this.InnerView.Holder =
              this).MarkItemEntity.ViewLifeCircle.SetAllChildViewStateDirty(),
            this.InnerView.Reset(),
            this.InnerView.SetUiActive(!0))
          : ((this.InnerView = this.CreateView()),
            this.InnerView.InitializeMarkItemViewAsync()))
      : (this.InnerView.Holder = this).InnerView.SetUiActive(!0);
  }
  Ah_(t = !1) {
    this.InnerView &&
      (this.MarkItemEntity.ViewLifeCircle.SetAllChildViewStateDirty(),
      this.InnerView.IsRegister || t
        ? this.InnerView.RecycleToPool()
        : (this.InnerView.SetVisible(!1),
          MarkSpritePool_1.MarkSpritePool.UnRef(this.InnerView.ComponentId),
          this.InnerView.OnRecycle(),
          (t = this.GetMarkItemViewType()),
          MarkPanelPoolFactory_1.MarkItemViewPoolFactory.Recycle(
            t + "_" + this.MapType,
            this.InnerView,
          )),
      (this.InnerView = void 0));
  }
  get TrackTarget() {
    return this.gql;
  }
  set TrackTarget(t) {
    (this.gql = t), (this.WorldPositionVector = void 0), (this.h5l = void 0);
  }
  get TrackAreaId() {}
  get TrackSource() {
    return this.TrackSourceInner;
  }
  get IsTracked() {
    return this.MarkItemEntity.ViewLifeCircle.IsTracked;
  }
  set IsTracked(t) {
    (this.MarkItemEntity.ViewLifeCircle.IsTracked = t),
      this.MarkItemEntity.ViewLifeCircle.IsTrackedDirty &&
        (t ? this.OnStartTrack() : this.OnEndTrack());
  }
  get PermanentUpdate() {
    return (
      this.IsTracked ||
      MarkDefine_1.permanentUpdateTypeSet.has(this.MarkType) ||
      this.MarkItemEntity.ViewLifeCircle.IsSelected
    );
  }
  get CanOutOfBound() {
    return (
      this.IsTracked ||
      MarkDefine_1.canOutOfBoundUpdateTypeSet.has(this.MarkType)
    );
  }
  UpdateVisibleRelativeState() {
    var t = !this.IsInConsistentDistrict(),
      e = this.CheckCanShowInGravityLayer(),
      t = t && e,
      e = this.MarkItemEntity.ViewLifeCircle.IsSelected,
      e = this.CheckCanShowView() || e;
    let i = t && e,
      s =
        (1 !== this.MarkItemType && (i &&= this.IsTempMapMarkShow()),
        (this.IsCanShowView = i),
        (this.IsTracked = this.IsTracking()),
        !0);
    (s =
      !(!i || !t) &&
      ((1 === this.MapType && !this.IsTracked) || (this.IsInAoiRange = !0),
      this.IsTracked || this.IsInAoiRange)),
      this.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(
        9,
        this.MarkItemEntity.GamePlay.CanShowGravityChildIcon,
      ),
      this.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(0, s);
  }
  CreateOrCycleView() {
    var t;
    this.MarkItemEntity.ViewLifeCircle.IsChildViewStateDirty(0) &&
      ((t = this.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(0)),
      this.MarkItemEntity.ViewLifeCircle.SetChildViewVisibleClean(0),
      t ? this.u8_() : this.Ah_());
  }
  IsTempMapMarkShow() {
    return (
      1 !== this.MapType || !this.MarkItemEntity.IsTempMapMark || this.IsTracked
    );
  }
  IsTracking() {
    return ModelManager_1.ModelManager.TrackModel.IsTracking(
      this.TrackSource,
      this.MarkId,
    );
  }
  OnStartTrack() {
    this.View?.OnStartTrack();
  }
  OnEndTrack() {
    this.View?.OnEndTrack();
  }
  OnUpdate(t) {}
  OnDestroy() {}
  get ViewRoot() {
    return this.QDi;
  }
  get View() {
    return this.InnerView;
  }
  get IconPath() {
    return this.xbt;
  }
  set IconPath(t) {
    this.xbt !== t && (this.xbt = t);
  }
  get IsOutOfBound() {
    return this.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(4);
  }
  set IsOutOfBound(t) {
    this.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(4, t),
      this.View && this.View.IsViewReady && this.View.ApplyOutOfBoundActive();
  }
  SetSelected(t) {
    (this.MarkItemEntity.ViewLifeCircle.IsSelected = t),
      this.InnerView && (this.View.IsSelected = t);
  }
  async GetRootItemAsync() {
    if (this.View)
      return (
        this.View.IsCreating && (await this.View.LoadingPromise),
        this.View.GetRootItem()
      );
  }
  GetTitleText() {}
  SetTitleText(t) {
    var e = this.GetTitleText();
    e && t.SetText(e);
  }
  GetStateIconPath() {
    var t = this.IsMultiMap();
    if (t && !(this.LocateInGround() && this.IsSelectThisFloor))
      return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        this.IsSelectThisFloor
          ? WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH
          : WorldMapDefine_1.MULTI_MAP_ICON_PATH,
      );
  }
  GetLocaleDesc() {}
  SetConfigScale(t) {
    this.ConfigScale = t;
  }
  SetCornerScale(t) {
    this.CornerScale = t;
  }
  get JDi() {
    return ModelManager_1.ModelManager.MapModel.GetMarkForceVisible(
      this.MarkType,
      this.MarkId,
    );
  }
  get IsCanShowViewIntermediately() {
    return this.XDi && this.JDi;
  }
  get IsCanShowView() {
    return this.IsCanShowViewIntermediately || this.IsCanShowViewFinally;
  }
  set IsCanShowView(t) {
    this.XDi = t;
  }
  CheckCanShowView() {
    return 2 === this.MapType;
  }
  IsInConsistentDistrict(t = !1) {
    let e = void 0;
    var i,
      s = ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId;
    return (
      (e =
        t || 1 === this.MapType
          ? ModelManager_1.ModelManager.MapModel.GetDungeonMapConfigId(
              this.InstanceDungeonOrMapConfigId,
            )
          : ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapId(
              this.InstanceDungeonOrMapConfigId,
            )) !== s ||
      ((t =
        ModelManager_1.ModelManager.WorldMapModel.IsPlayerInActivityInstanceDungeon()),
      (s = ModelManager_1.ModelManager.MapModel.CurrentMapConfigId),
      (i =
        ModelManager_1.ModelManager.WorldMapModel
          .EnableInstanceDungeonFilterMark),
      t && i && s === e && 1 !== this.MarkType
        ? void 0 === this.InstanceDungeonId || this.PW_()
        : ModelManager_1.ModelManager.WorldMapModel.IsPlayerInStoryInstanceDungeon()
          ? this.$Cc()
          : ((t = ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(
              this.InstanceDungeonOrMapConfigId,
            )),
            1 === this.MapType
              ? t
                ? this.AW_()
                : void 0 !== this.InstanceDungeonId && this.PW_()
              : ModelManager_1.ModelManager.WorldMapModel.IsPlayerInWorldInstanceDungeon()
                ? this.WCc(t)
                : this.AW_()))
    );
  }
  AW_() {
    return (
      0 !== this.InstanceDungeonId &&
      void 0 !== this.InstanceDungeonId &&
      this.InstanceDungeonId !==
        ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapInstanceId
    );
  }
  WCc(t) {
    return (
      0 !== this.InstanceDungeonId &&
      void 0 !== this.InstanceDungeonId &&
      this.InstanceDungeonId !==
        ModelManager_1.ModelManager.WorldMapModel.GetCurrentLocateWorldMapInstanceId(
          t,
        )
    );
  }
  PW_() {
    return (
      this.InstanceDungeonId !==
      ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapInstanceId
    );
  }
  $Cc() {
    return 1 === this.MapType ? this.PW_() : 12 !== this.MarkType && this.AW_();
  }
  CheckCanShowInGravityLayer() {
    return (
      !(
        !this.IsTracking() &&
        !MarkDefine_1.permanentShowInGravityLayerTypeSet.has(this.MarkType)
      ) || this.MarkItemEntity.GamePlay.InGravityLayer
    );
  }
  GetShowScale() {
    var t = this.GetCurrentMapShowScale();
    return Math.max(0, t);
  }
  GetCurrentMapShowScale() {
    return 100 * ModelManager_1.ModelManager.WorldMapModel.MapScale - 100;
  }
  OnLevelSequenceStart(t) {
    ("ShowView" !== t && "HideView" !== t) || (this.IsCanShowViewFinally = !0);
  }
  OnLevelSequenceStop(t) {
    ("ShowView" !== t && "HideView" !== t) || (this.IsCanShowViewFinally = !1);
  }
  GetInteractiveFlag() {
    return this.IsCanShowView ?? !1;
  }
  GamePlayIsDiscover() {
    return !1;
  }
  GetSecondaryUiType() {
    return (
      WorldMapSecondaryUiDefine_1.markPanelTypeMap.get(this.MarkType) ??
      WorldMapDefine_1.ESecondaryPanel.GeneralPanel
    );
  }
}
exports.MarkItem = MarkItem;
//# sourceMappingURL=MarkItem.js.map
