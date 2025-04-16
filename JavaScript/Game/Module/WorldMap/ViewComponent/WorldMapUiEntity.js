"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapUiEntity = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  MapEntity_1 = require("../../Map/Base/MapEntity"),
  MapDefine_1 = require("../../Map/MapDefine"),
  MapUtil_1 = require("../../Map/MapUtil"),
  MapGamePlayRequestPreemptiveFrameQueue_1 = require("../../Map/View/BaseMap/Assistant/MapFrameTaskQueue/MapGamePlayRequestPreemptiveFrameQueue"),
  MapUpdateTaskPreemptiveFrameQueue_1 = require("../../Map/View/BaseMap/Assistant/MapFrameTaskQueue/MapUpdateTaskPreemptiveFrameQueue"),
  WorldMapUtil_1 = require("../WorldMapUtil"),
  RAD_2_DEG = 180 / Math.PI,
  DEG_PI_4 = 90;
class WorldMapUiEntity extends MapEntity_1.MapEntity {
  constructor() {
    super(...arguments),
      (this.jYa = void 0),
      (this.WYa = void 0),
      (this.QYa = void 0),
      (this.ClickedItem = void 0),
      (this.du_ =
        new MapGamePlayRequestPreemptiveFrameQueue_1.MapGamePlayRequestPreemptiveFrameQueue(
          200,
        )),
      (this.f8_ =
        new MapUpdateTaskPreemptiveFrameQueue_1.MapUpdateTaskPreemptiveFrameQueue(
          1500,
        )),
      (this.n4o = (s, r, a) => {
        if (this.ClickedItem) this.MoveComponent.PushMap(this.ClickedItem, !1);
        else {
          let t = void 0,
            e = void 0;
          var h = Vector2D_1.Vector2D.Create(
              this.Map.GetRootItem().GetAnchorOffset(),
            ),
            n = this.MoveComponent.TweenTarget;
          let i = void 0;
          switch (a) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              i = this.s4o();
          }
          a = 0 === s ? 1 : r / s;
          i
            ? ((t = h.SubtractionEqual(i).MultiplyEqual(a).AdditionEqual(i)),
              n &&
                (e = n.SubtractionEqual(i).MultiplyEqual(a).AdditionEqual(i)))
            : ((t = h.MultiplyEqual(a)), n && (e = n.MultiplyEqual(a))),
            this.MoveComponent.SetMapPositionCauseByScaling(t, e, 2);
        }
        this.SyncTransformToFrontContainer();
      }),
      (this.MarkEdgeSize = void 0),
      (this.OnMarkItemTrackStateChanged = (t) => {
        t.IsDestroy || this.UpdateSingleMarkItem(t, !0);
      }),
      (this.kH_ = (t, e, i) => {
        this.UpdateMarkItems();
      }),
      (this.UpdateMarkItems = (t) => {
        var e;
        this.UpdateSelfPlayerMark();
        for ([, e] of this.Map.GetAllMarkItems())
          for (var [, i] of e) this.g8_(i, t);
        this.ScaleComponent.FlushScaleDirty();
      }),
      (this.Fll = (t, e) => {
        t = this.Map.GetMarkItem(t, e);
        t && !t.IsDestroy && this.UpdateSingleMarkItem(t);
      }),
      (this.OnPlayerMarkPositionChanged = () => {
        if (void 0 !== this.Map) {
          var t = this.Map.GetMarkItemsByType(11);
          if (t && 0 !== t.size)
            for (var [, e] of t) this.UpdateSingleMarkItem(e);
        }
      }),
      (this.a4o = () => {
        this.WorldMapStreamingComponent.Update(),
          this.UpdateMarkItems(!0),
          this.SyncTransformToFrontContainer();
      }),
      (this.g5l = () => {
        this.MultiFloorComponent.UpdateMultiMap();
      });
  }
  get Map() {
    return this.jYa;
  }
  set Map(t) {
    void 0 !== (this.jYa = t) && this.RecalculateMapSize();
  }
  RecalculateMapSize() {
    var t = this.Map.GetRootItem();
    this.MapSize = Vector2D_1.Vector2D.Create(t.GetWidth(), t.GetHeight());
  }
  get ViewPortSize() {
    return this.PropertyMap.tryGet(0) ?? Vector2D_1.Vector2D.ZeroVector;
  }
  set ViewPortSize(t) {
    this.PropertyMap.set(0, t);
  }
  get OutOfViewPortSize() {
    return this.PropertyMap.tryGet(1) ?? Vector2D_1.Vector2D.ZeroVector;
  }
  set OutOfViewPortSize(t) {
    this.PropertyMap.set(1, t);
  }
  get MapSize() {
    return this.PropertyMap.tryGet(2) ?? Vector2D_1.Vector2D.ZeroVector;
  }
  set MapSize(t) {
    this.PropertyMap.set(2, t);
  }
  set UiParams(t) {
    this.WYa = t;
  }
  get UiParams() {
    return this.WYa;
  }
  set OpenParams(t) {
    this.QYa = t;
  }
  get OpenParams() {
    return this.QYa;
  }
  get MapId() {
    return (
      this.PropertyMap.tryGet(3) ??
      this.OpenParams.MapId ??
      MapDefine_1.BIG_WORLD_MAP_ID
    );
  }
  set MapId(t) {
    this.PropertyMap.set(3, t);
  }
  get IsInPlayerMap() {
    var t = ModelManager_1.ModelManager.WorldMapModel.LastBigSceneMiniMapInfo;
    if (t) {
      (t = t.AreaId),
        (t = ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(t)),
        (t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t));
      if (t) return t.MapConfigId === this.MapId;
    }
    return (
      ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId ===
      this.MapId
    );
  }
  get IsInPlayerGravity() {
    return (
      ModelManager_1.ModelManager.MapModel.CurrentPlayerGravity ===
      ModelManager_1.ModelManager.WorldMapModel.WorldMapSelectGravity
    );
  }
  get SecondaryUiComponent() {
    return this.GetComponent(1);
  }
  get InteractComponent() {
    return this.GetComponent(2);
  }
  get MoveComponent() {
    return this.GetComponent(3);
  }
  get ScaleComponent() {
    return this.GetComponent(4);
  }
  get PlayerComponent() {
    return this.GetComponent(5);
  }
  get MultiFloorComponent() {
    return this.GetComponent(6);
  }
  get QuickNavigateComponent() {
    return this.GetComponent(7);
  }
  get WorldMapStreamingComponent() {
    return this.GetComponent(8);
  }
  get WorldMapAlterMapComponent() {
    return this.GetComponent(9);
  }
  OnInit() {
    this.Reset();
  }
  Reset(t = !0) {
    var e;
    this.ScaleComponent.Initialize(),
      this.InitSelfPlayerMark(),
      this.SyncTransformToFrontContainer(),
      this.SecondaryUiComponent.IsSecondaryUiOpening ||
        (this.OpenParams &&
          this.OpenParams.IsNotFocusTween &&
          (e = this.Map.GetMarkItem(
            this.OpenParams.MarkType,
            this.OpenParams.MarkId,
          )) &&
          ((this.OpenParams.StartScale = this.ScaleComponent.MapScale),
          (this.OpenParams.StartWorldPosition = Vector2D_1.Vector2D.Create(
            -e.UiPosition.X * this.OpenParams.StartScale,
            -e.UiPosition.Y * this.OpenParams.StartScale,
          ))),
        this.OpenParams?.StartScale &&
          this.ScaleComponent.SetMapScale(this.OpenParams.StartScale, 6, !1),
        this.OpenParams?.StartWorldPosition
          ? t &&
            this.MoveComponent.SetMapPosition(
              this.OpenParams.StartWorldPosition,
              !1,
            )
          : ModelManager_1.ModelManager.MapModel.CurrentInWorld
            ? this.IsInPlayerMap &&
              (this.UpdateSelfPlayerMark(), t) &&
              this.MoveComponent.FocusPlayer(
                this.PlayerComponent.PlayerUiPosition,
                !1,
                1,
              )
            : this.fdl(t)),
      this.WorldMapStreamingComponent.BindAll(this.Map.GetAllMapTileItems()),
      this.WorldMapStreamingComponent.Update(),
      this.OnPlayerMarkPositionChanged(),
      this.UpdateMarkItems(),
      this.SecondaryUiComponent.AllSecondaryPanelsUpdateMap();
  }
  RegisterComponents() {
    (this.ViewPortSize = WorldMapUtil_1.WorldMapUtil.GetViewportSize()),
      this.AddComponent(1),
      this.AddComponent(2),
      this.AddComponent(3),
      this.AddComponent(5),
      this.AddComponent(6),
      this.AddComponent(7),
      this.AddComponent(8),
      this.AddComponent(9),
      (this.AddComponent(4).ScaleChangeEvent = this.n4o),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMarkItemTrackStateChange,
        this.OnMarkItemTrackStateChanged,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MarkForceVisibleChanged,
        this.kH_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ScenePlayerLocationChanged,
        this.OnPlayerMarkPositionChanged,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMapMarkTaskComplete,
        this.Fll,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapPositionChanged,
        this.a4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapUpdateMultiMap,
        this.g5l,
      );
  }
  OnDispose() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnMarkItemTrackStateChange,
      this.OnMarkItemTrackStateChanged,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MarkForceVisibleChanged,
        this.kH_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ScenePlayerLocationChanged,
        this.OnPlayerMarkPositionChanged,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMapMarkTaskComplete,
        this.Fll,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapPositionChanged,
        this.a4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapUpdateMultiMap,
        this.g5l,
      ),
      this.du_.Dispose(),
      this.f8_.Dispose(),
      (this.Map = void 0);
  }
  OnTick() {
    this.Map?.Tick(), this.du_.Process(), this.f8_.Process();
  }
  CancelAllTasks() {
    this.du_.Dispose(), this.f8_.Dispose();
  }
  SyncTransformToFrontContainer() {
    this.Map.SyncTransformToFrontContainer();
  }
  s4o() {
    var e = Global_1.Global.CharacterController;
    if (e) {
      let t = void 0;
      if (
        (Info_1.Info.IsInKeyBoard()
          ? (t = Vector2D_1.Vector2D.Create(e.GetCursorPosition()))
          : Info_1.Info.IsInTouch() &&
            (t = this.InteractComponent.MultiTouchOriginCenter),
        t)
      ) {
        var i,
          e = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
        if (e)
          return (
            (e = e.ConvertPositionFromViewportToLGUICanvas(t.ToUeVector2D())),
            (i = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool()).Set(
              e.X - i.X / 2,
              e.Y - i.Y / 2,
            ),
            i
          );
      }
    }
  }
  InitSelfPlayerMark() {
    var t = this.IsInPlayerMap,
      e = this.Map.SelfPlayerNode;
    e.SetUIActive(t), t && e.SetAsLastHierarchy(), this.pUc();
  }
  pUc() {
    var t = ModelManager_1.ModelManager.WorldMapModel.IsGravityMap(this.MapId),
      e = this.Map.PlayerArrow;
    t && !this.IsInPlayerGravity
      ? (e.SetAlpha(0.4),
        this.Map.SetPlayerGravityActive(
          !0,
          ModelManager_1.ModelManager.MapModel.CurrentPlayerGravity,
        ))
      : (e.SetAlpha(1), this.Map.SetPlayerGravityActive(!1));
  }
  UpdateSelfPlayerMark() {
    this.PlayerComponent.UpdatePlayerPosition();
    var t = this.PlayerComponent.PlayerRotation,
      e = this.PlayerComponent.PlayerUiPosition,
      i = this.ScaleComponent.MapScale,
      t =
        (this.Map.PlayerArrow.SetUIRelativeRotation(new UE.Rotator(0, t, 0)),
        this.MoveComponent.MapUiPosition),
      s = Vector2D_1.Vector2D.Create(),
      [e, i] = (e.Multiply(i, s).Addition(t, s), this.ClampToMarkEdge(s)),
      r = this.Map.PlayerOutOfBoundIndicator;
    i
      ? ((this.PlayerComponent.PlayerOutOfBound = !0),
        this.Map.SelfPlayerNode.SetAnchorOffset(
          e
            .SubtractionEqual(t)
            .DivisionEqual(this.ScaleComponent.MapScale)
            .ToUeVector2D(!0),
        ),
        (e = Math.atan2(s.Y, s.X) * RAD_2_DEG - DEG_PI_4),
        r.SetUIRelativeRotation(new UE.Rotator(0, e, 0)))
      : ((this.PlayerComponent.PlayerOutOfBound = !1),
        this.Map.SelfPlayerNode.SetAnchorOffset(
          this.PlayerComponent.PlayerUiPosition.ToUeVector2D(),
        )),
      r.SetUIActive(i);
  }
  fdl(t = !0) {
    this.UpdateSelfPlayerMark(),
      t &&
        ((t = MapUtil_1.MapUtil.GetLastBigScenePlayerUiPosition()),
        this.MoveComponent.FocusPlayer(t, !1, 1));
  }
  ClampToMarkEdge(t) {
    var e,
      i = this.MarkEdgeSize;
    return Math.abs(t.X) < i.X && Math.abs(t.Y) < i.Y
      ? [t, !1]
      : ((e = Vector2D_1.Vector2D.Create()),
        Math.abs(t.X / t.Y) > i.X / i.Y
          ? t.Multiply(i.X / Math.abs(t.X), e)
          : t.Multiply(i.Y / Math.abs(t.Y), e),
        [e, !0]);
  }
  pdl(t) {
    return !(
      !t.PermanentUpdate &&
      !this.WorldMapStreamingComponent.HandleStreamingUpdate(t)
    );
  }
  g8_(t, e = !1) {
    if (t.PermanentUpdate || this.ScaleComponent.IsScaleDirty)
      this.UpdateSingleMarkItem(t, !0);
    else {
      const i = {
        MapUiPosition: this.MoveComponent.MapUiPosition,
        MapScale: this.ScaleComponent.MapScale,
        PlayerWorldPosition: this.PlayerComponent.PlayerWorldPosition,
        IsDragging: this.InteractComponent.IsDragging,
        IsScaleDirty: this.ScaleComponent.IsScaleDirty,
        ForceViewUpdate: e,
      };
      e = {
        Priority: 0,
        Execute: () => {
          t.IsDestroy || this.TK_(t, i);
        },
        MarkId: t.MarkId,
        MarkType: t.MarkType,
      };
      this.f8_.AddTask(e);
    }
  }
  UpdateSingleMarkItem(t, e = !1) {
    e = {
      MapUiPosition: this.MoveComponent.MapUiPosition,
      MapScale: this.ScaleComponent.MapScale,
      PlayerWorldPosition: this.PlayerComponent.PlayerWorldPosition,
      IsDragging: this.InteractComponent.IsDragging,
      IsScaleDirty: this.ScaleComponent.IsScaleDirty,
      ForceViewUpdate: e,
    };
    this.TK_(t, e);
  }
  TK_(t, e) {
    var i, s, r, a;
    this.pdl(t)
      ? (t.LogicUpdate(this.PlayerComponent.PlayerWorldPosition),
        (t.MarkItemEntity.ViewLifeCircle.IsChildViewStateDirty(0) ||
          e.ForceViewUpdate) &&
          (t.ViewUpdateAsync(
            e.PlayerWorldPosition,
            e.IsDragging,
            e.IsScaleDirty,
          ),
          this.mu_(t)),
        t.View &&
          ((i = e.MapScale),
          (s = Vector2D_1.Vector2D.Create(t.UiPosition.X, t.UiPosition.Y)),
          t.CanOutOfBound &&
          ((e = e.MapUiPosition),
          (r = Vector2D_1.Vector2D.Create()),
          ([r, a] = (s.Multiply(i, r).Addition(e, r), this.ClampToMarkEdge(r))),
          a)
            ? ((t.MarkItemEntity.Resource.OutOfBoundDirection = r),
              t.SetAnchorOffset(r.SubtractionEqual(e).DivisionEqual(i)),
              (t.IsOutOfBound = !0))
            : ((t.IsOutOfBound = !1), t.SetAnchorOffset(s))))
      : (t.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(0, !1),
        t.CreateOrCycleView());
  }
  mu_(t) {
    var e,
      i = t.MarkItemEntity.GetComponent(14);
    void 0 !== i &&
      i.NeedRequestGamePlayState() &&
      ((e = t.MarkItemEntity.GetComponent(15).MapMarkConfig),
      (t = {
        Priority: 0,
        Execute: () => {},
        MarkId: t.MarkId,
        GamePlayId: e.RelativeId,
        InstId: e.RelativeDungeonId,
      }),
      this.du_.AddTask(t),
      (i.HasRequestGamePlay = !0));
  }
}
exports.WorldMapUiEntity = WorldMapUiEntity;
//# sourceMappingURL=WorldMapUiEntity.js.map
