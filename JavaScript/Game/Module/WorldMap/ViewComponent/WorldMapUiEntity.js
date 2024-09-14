"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapUiEntity = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  MapEntity_1 = require("../../Map/Base/MapEntity"),
  MapDefine_1 = require("../../Map/MapDefine"),
  MapUtil_1 = require("../../Map/MapUtil"),
  WorldMapUtil_1 = require("../WorldMapUtil"),
  RAD_2_DEG = 180 / Math.PI,
  DEG_PI_4 = 90;
class WorldMapUiEntity extends MapEntity_1.MapEntity {
  constructor() {
    super(...arguments),
      (this.IKa = void 0),
      (this.TKa = void 0),
      (this.LKa = void 0),
      (this.ClickedItem = void 0),
      (this.n4o = (i, s, r) => {
        if (this.ClickedItem) this.MoveComponent.PushMap(this.ClickedItem, !1);
        else {
          let t = void 0;
          var h = Vector2D_1.Vector2D.Create(
            this.Map.GetRootItem().GetAnchorOffset(),
          );
          let e = void 0;
          switch (r) {
            case 4:
            case 5:
              e = this.s4o();
          }
          (t = e
            ? h
                .SubtractionEqual(e)
                .MultiplyEqual(s / i)
                .AdditionEqual(e)
            : h.MultiplyEqual(s / i)),
            this.MoveComponent.SetMapPosition(t, !1, 2);
        }
        this.SyncTransformToFrontContainer();
      }),
      (this.MarkEdgeSize = void 0),
      (this.UpdateMarkItems = () => {
        var t;
        this.UpdateSelfPlayerMark();
        for ([, t] of this.Map.GetAllMarkItems())
          for (var [, e] of t)
            (this.D4o(e) && !e.IsTracked) || this.UpdateSingleMarkItem(e);
        this.ScaleComponent.FlushScaleDirty();
      }),
      (this.OnPlayerMarkPositionChanged = () => {
        if (void 0 !== this.Map) {
          var t = this.Map.GetMarkItemsByType(11);
          if (t && 0 !== t.size)
            for (var [, e] of t) this.UpdateSingleMarkItem(e);
        }
      });
  }
  get Map() {
    return this.IKa;
  }
  set Map(t) {
    void 0 !== (this.IKa = t) &&
      ((t = t.GetRootItem()),
      (this.MapSize = Vector2D_1.Vector2D.Create(t.GetWidth(), t.GetHeight())));
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
    this.TKa = t;
  }
  get UiParams() {
    return this.TKa;
  }
  set OpenParams(t) {
    this.LKa = t;
  }
  get OpenParams() {
    return this.LKa;
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
    var t = MapUtil_1.MapUtil.GetCurrentBigMapId();
    return MapUtil_1.MapUtil.CurrentInBigMap()
      ? t === this.MapId
      : MapUtil_1.MapUtil.GetCurrentBigMapOrWorldMapId() === this.MapId;
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
  OnInit() {
    this.Reset();
  }
  Reset() {
    var t;
    this.ScaleComponent.Initialize(),
      this.InitSelfPlayerMark(),
      this.SyncTransformToFrontContainer(),
      this.SecondaryUiComponent.IsSecondaryUiOpening ||
        (this.OpenParams &&
          this.OpenParams.IsNotFocusTween &&
          (t = this.Map.GetMarkItem(
            this.OpenParams.MarkType,
            this.OpenParams.MarkId,
          )) &&
          ((this.OpenParams.StartScale = this.ScaleComponent.MapScale),
          (this.OpenParams.StartWorldPosition = Vector2D_1.Vector2D.Create(
            -t.UiPosition.X * this.OpenParams.StartScale,
            -t.UiPosition.Y * this.OpenParams.StartScale,
          ))),
        this.OpenParams?.StartScale &&
          this.ScaleComponent.SetMapScale(this.OpenParams.StartScale, 6, !1),
        this.OpenParams?.StartWorldPosition
          ? this.MoveComponent.SetMapPosition(
              this.OpenParams.StartWorldPosition,
              !1,
            )
          : MapUtil_1.MapUtil.CurrentInBigMap()
            ? this.IsInPlayerMap &&
              (this.UpdateSelfPlayerMark(),
              this.MoveComponent.FocusPlayer(
                this.PlayerComponent.PlayerUiPosition,
                !1,
                1,
              ))
            : ((t =
                ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
                  .RecoverWorldLocation),
              (t = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(
                Vector2D_1.Vector2D.Create(t[1] ?? 0, t[2] ?? 0),
              )),
              this.UpdateSelfPlayerMark(),
              this.MoveComponent.FocusPlayer(t, !1, 1))),
      this.OnPlayerMarkPositionChanged(),
      this.UpdateMarkItems();
  }
  RegisterComponents() {
    (this.ViewPortSize = WorldMapUtil_1.WorldMapUtil.GetViewportSize()),
      this.AddComponent(1),
      this.AddComponent(2),
      this.AddComponent(3),
      this.AddComponent(5),
      this.AddComponent(6),
      this.AddComponent(7),
      (this.AddComponent(4).ScaleChangeEvent = this.n4o),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnTrackMark,
        this.UpdateMarkItems,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TrackMark,
        this.UpdateMarkItems,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MarkForceVisibleChanged,
        this.UpdateMarkItems,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ScenePlayerLocationChanged,
        this.OnPlayerMarkPositionChanged,
      );
  }
  OnDispose() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UnTrackMark,
      this.UpdateMarkItems,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TrackMark,
        this.UpdateMarkItems,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MarkForceVisibleChanged,
        this.UpdateMarkItems,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ScenePlayerLocationChanged,
        this.OnPlayerMarkPositionChanged,
      ),
      (this.Map = void 0);
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
    e.SetUIActive(t), t && e.SetAsLastHierarchy();
  }
  UpdateSelfPlayerMark() {
    this.PlayerComponent.UpdatePlayerPosition();
    var t = this.PlayerComponent.PlayerRotation,
      e = this.PlayerComponent.PlayerUiPosition,
      i = this.ScaleComponent.MapScale,
      t =
        (this.Map.PlayerArrow.SetUIRelativeRotation(new UE.Rotator(0, t, 0)),
        Vector2D_1.Vector2D.Create(this.Map.GetRootItem().GetAnchorOffset())),
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
  async UpdateSingleMarkItem(t) {
    let e = void 0;
    var i,
      s,
      r,
      h,
      n = this.ScaleComponent.MapScale;
    t.LogicUpdate(this.PlayerComponent.PlayerWorldPosition),
      t.ViewUpdate(
        this.PlayerComponent.PlayerWorldPosition,
        this.InteractComponent.IsDragging,
        this.ScaleComponent.IsScaleDirty,
      ),
      t.View &&
        ((i = Vector2D_1.Vector2D.Create(t.UiPosition.X, t.UiPosition.Y)),
        t.IsTracked
          ? ((s = Vector2D_1.Vector2D.Create(
              this.Map.GetRootItem().GetAnchorOffset(),
            )),
            (r = Vector2D_1.Vector2D.Create()),
            ([r, h] =
              (i.Multiply(n, r).Addition(s, r), this.ClampToMarkEdge(r))),
            (e = await t.GetRootItemAsync()),
            h
              ? ((t.IsOutOfBound = !0),
                t.View.SetOutOfBoundDirection(r),
                e.SetAnchorOffset(
                  r.SubtractionEqual(s).DivisionEqual(n).ToUeVector2D(!0),
                ))
              : ((t.IsOutOfBound = !1), e.SetAnchorOffset(i.ToUeVector2D(!0))))
          : ((t.IsOutOfBound = !1),
            (e = await t.GetRootItemAsync()).SetAnchorOffset(
              i.ToUeVector2D(!0),
            )));
  }
  D4o(t) {
    t = Vector2D_1.Vector2D.Create(
      t.UiPosition.X * ModelManager_1.ModelManager.WorldMapModel.MapScale +
        this.Map.GetRootItem().GetAnchorOffsetX(),
      t.UiPosition.Y * ModelManager_1.ModelManager.WorldMapModel.MapScale +
        this.Map.GetRootItem().GetAnchorOffsetY(),
    );
    return (
      Math.abs(t.X) > this.OutOfViewPortSize.X ||
      Math.abs(t.Y) > this.OutOfViewPortSize.Y
    );
  }
}
exports.WorldMapUiEntity = WorldMapUiEntity;
//# sourceMappingURL=WorldMapUiEntity.js.map
