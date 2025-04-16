"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapMoveComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MapComponent_1 = require("../../Map/Base/MapComponent"),
  MapUtil_1 = require("../../Map/MapUtil"),
  MarkItem_1 = require("../../Map/Marks/MarkItem/MarkItem");
class WorldMapMoveComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.HFo = !1),
      (this.F9l = void 0),
      (this.jFo = void 0),
      (this.WFo = void 0),
      (this.KFo = void 0),
      (this.QFo = new Vector2D_1.Vector2D()),
      (this.XFo = new Vector2D_1.Vector2D()),
      (this.m5l = void 0),
      (this.$Fo = void 0),
      (this.YFo = (t) => {
        t = Vector2D_1.Vector2D.Create(t);
        this.SetMapPosition(t, !1, 2);
      }),
      (this.JFo = (t) => {
        var e = Vector2D_1.Vector2D.Create(),
          t =
            (t.Multiply(this.BFo.TweenTime, e),
            Vector2D_1.Vector2D.Create(this.MapUiPosition).AdditionEqual(e));
        this.SetMapPosition(
          t,
          !0,
          1,
          2,
          CommonParamById_1.configCommonParamById.GetFloatConfig(
            "MapDragInertiaTime",
          ),
        );
      }),
      (this.Ngo = () => {
        this.r3o(!0);
      }),
      (this.zFo = () => {}),
      (this.vKe = (t) => {
        this.ZFo(t);
      }),
      (this.e3o = !1),
      (this.t3o = !1),
      (this.i3o = (t) => {
        (this.QFo.Y = t), (this.e3o = !0);
      }),
      (this.o3o = (t) => {
        (this.XFo.X = t), (this.t3o = !0);
      }),
      (this.Iwl = (t) => {
        var t = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(
            Vector2D_1.Vector2D.Create(t.X, t.Y),
          ),
          e = ModelManager_1.ModelManager.WorldMapModel.MapScale;
        t.UnaryNegation(t), t.MultiplyEqual(e), this.SetMapPosition(t, !1, 2);
      });
  }
  get ComponentType() {
    return 3;
  }
  get NYa() {
    var t = this.Parent;
    if (void 0 !== t) return t;
    this.LogError(63, "[地图系统]->二级界面组件没有附加到容器下！");
  }
  get BFo() {
    return this.NYa.UiParams;
  }
  get PYe() {
    return this.NYa.ViewPortSize;
  }
  get FYa() {
    return this.NYa.MapSize;
  }
  get MapUiPosition() {
    var t;
    return (
      void 0 === this.m5l &&
        ((t = this.NYa.Map.GetRootItem().GetAnchorOffset()),
        (this.m5l = Vector2D_1.Vector2D.Create(t.X, t.Y))),
      this.m5l
    );
  }
  get SafeAreaSize() {
    var t = this.NYa.Map,
      e = this.KFo;
    return (
      (e.MinX =
        -((this.FYa.X + t.MapOffset.Y) * this.MapScale - this.PYe.X) / 2),
      (e.MaxX =
        ((this.FYa.X - t.MapOffset.X) * this.MapScale - this.PYe.X) / 2),
      (e.MinY =
        -((this.FYa.Y - t.MapOffset.Z) * this.MapScale - this.PYe.Y) / 2),
      (e.MaxY =
        ((this.FYa.Y - t.MapOffset.W) * this.MapScale - this.PYe.Y) / 2),
      e
    );
  }
  get DangerousAreaSize() {
    var t = this.NYa.Map,
      e = this.$Fo;
    return (
      (e.MinX =
        -(
          (this.FYa.X + t.MapOffset.Y + t.FakeOffset) * this.MapScale -
          this.PYe.X
        ) / 2),
      (e.MaxX =
        ((this.FYa.X - t.MapOffset.X + t.FakeOffset) * this.MapScale -
          this.PYe.X) /
        2),
      (e.MinY =
        -(
          (this.FYa.Y - t.MapOffset.Z + t.FakeOffset) * this.MapScale -
          this.PYe.Y
        ) / 2),
      (e.MaxY =
        ((this.FYa.Y - t.MapOffset.W + t.FakeOffset) * this.MapScale -
          this.PYe.Y) /
        2),
      e
    );
  }
  get IsTweeningMove() {
    return this.HFo;
  }
  get TweenTarget() {
    return this.F9l;
  }
  KillTweening() {
    this.HFo && this.r3o(), (this.HFo = !1);
  }
  get MapScale() {
    return ModelManager_1.ModelManager.WorldMapModel.MapScale;
  }
  OnAdd() {
    (this.KFo = { MinX: 0, MaxX: 0, MinY: 0, MaxY: 0 }),
      (this.$Fo = { MinX: 0, MaxX: 0, MinY: 0, MaxY: 0 }),
      (this.WFo = (0, puerts_1.toManualReleaseDelegate)(this.YFo));
  }
  OnEnable() {
    this.dde();
  }
  OnDisable() {
    this.Cde();
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldMapDragInertia,
      this.JFo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapPointerDrag,
        this.vKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapPointerDown,
        this.Ngo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapWheelAxisInput,
        this.zFo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapJoystickMoveForward,
        this.i3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapJoystickMoveRight,
        this.o3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MoveWorldMapToPosition,
        this.Iwl,
      );
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldMapDragInertia,
      this.JFo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapPointerDrag,
        this.vKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapPointerDown,
        this.Ngo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapWheelAxisInput,
        this.zFo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapJoystickMoveForward,
        this.i3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapJoystickMoveRight,
        this.o3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MoveWorldMapToPosition,
        this.Iwl,
      );
  }
  OnRemove() {
    this.r3o(),
      (0, puerts_1.releaseManualReleaseDelegate)(this.YFo),
      (this.WFo = void 0),
      (this.KFo = void 0),
      (this.$Fo = void 0);
  }
  PushMap(t, e = !0, i = 2) {
    this.BFo
      ? this.PushMapByUiPosition(t.UiPosition, e, i)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 18, "请于根节点挂KuroWorldMapUIParams组件");
  }
  PushMapByUiPosition(t, e = !0, i = 2) {
    var s, h, r, n, o;
    this.BFo
      ? ((s = t.X),
        (t = t.Y),
        (h = this.NYa.Map.GetRootItem().GetAnchorOffset()),
        (o = s * this.MapScale + h.X),
        (h = t * this.MapScale + h.Y),
        (r = this.BFo.FocusMark_AnchoredPosition.X),
        (n = this.BFo.FocusMark_AnchoredPosition.Y),
        o === r && h === n
          ? (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapPositionChanged,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapUpdateMultiMap,
            ))
          : ((o = Vector2D_1.Vector2D.Create(
              -s * this.MapScale + r,
              -t * this.MapScale + n,
            )),
            this.SetMapPosition(
              o,
              e,
              i,
              this.BFo.TweenTypeEase,
              this.BFo.TweenTime,
            )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 18, "请于根节点挂KuroWorldMapUIParams组件");
  }
  SetMapPosition(e, i, s = 0, h, r, n = !0) {
    if (e)
      if (this.BFo) {
        let t = Vector2D_1.Vector2D.Create();
        e instanceof Vector2D_1.Vector2D
          ? t.DeepCopy(e)
          : e instanceof MarkItem_1.MarkItem &&
            ((t.X = e.UiPosition.X),
            (t.Y = e.UiPosition.Y),
            t.MultiplyEqual(this.MapScale).UnaryNegation(t));
        var e = Vector2D_1.Vector2D.Create(t.X, t.Y);
        t = this.n3o(e, s);
        const o = () => {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.WorldMapPositionChanged,
          ),
            this.HFo ||
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WorldMapUpdateMultiMap,
              );
        };
        i
          ? ((e = this.NYa.Map.GetRootItem().GetAnchorOffset()),
            (s = t.ToUeVector2D(!0)),
            this.Elh(e, s)
              ? (this.l8l(t), o())
              : (this.r3o(),
                (this.HFo = !0),
                (this.F9l = t),
                (this.jFo = UE.LTweenBPLibrary.Vector2To(
                  GlobalData_1.GlobalData.World,
                  this.WFo,
                  e,
                  s,
                  r,
                  0,
                  h,
                )),
                this.jFo.OnCompleteCallBack.Bind(() => {
                  (this.F9l = void 0), (this.HFo = !1), o();
                })))
          : (this.l8l(t), n && o());
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 63, "请于根节点挂KuroWorldMapUIParams组件");
  }
  SetMapPositionCauseByScaling(t, e, i = 0) {
    var s = this.IsTweeningMove;
    this.KillTweening(),
      this.SetMapPosition(t, !1, i),
      e && this.SetMapPosition(e, s, i);
  }
  l8l(t) {
    this.NYa.Map.GetRootItem().SetAnchorOffset(t.ToUeVector2D(!0)),
      (this.m5l = t),
      this._8l(t);
  }
  _8l(t) {
    var t = Vector2D_1.Vector2D.Create(t.X, t.Y),
      e = this.NYa.Map,
      i = ModelManager_1.ModelManager.WorldMapModel.MapScale;
    t.DivisionEqual(i),
      t.UnaryNegation(t),
      e.FogUnlockAnchorItem.SetAnchorOffset(t.ToUeVector2D(!0));
  }
  Elh(t, e) {
    return (
      MathUtils_1.MathUtils.IsNearlyEqual(t.X, e.X) &&
      MathUtils_1.MathUtils.IsNearlyEqual(t.Y, e.Y)
    );
  }
  FocusPlayer(t, e = !1, i = 0) {
    var s = Vector2D_1.Vector2D.Create();
    t.Multiply(this.MapScale, s).UnaryNegation(s),
      this.SetMapPosition(s, e, i, this.BFo.TweenTypeEase, this.BFo.TweenTime);
  }
  n3o(t, e, i = !1) {
    let s = t.X,
      h = t.Y;
    switch (e) {
      case 0:
        break;
      case 1:
        (s = MathCommon_1.MathCommon.Clamp(
          t.X,
          this.SafeAreaSize.MinX,
          this.SafeAreaSize.MaxX,
        )),
          (h = MathCommon_1.MathCommon.Clamp(
            t.Y,
            this.KFo.MinY,
            this.KFo.MaxY,
          ));
        break;
      case 2:
        (s = MathCommon_1.MathCommon.Clamp(
          t.X,
          this.DangerousAreaSize.MinX,
          this.DangerousAreaSize.MaxX,
        )),
          (h = MathCommon_1.MathCommon.Clamp(
            t.Y,
            this.DangerousAreaSize.MinY,
            this.DangerousAreaSize.MaxY,
          ));
    }
    let r = t;
    return (
      i || 0 === e
        ? ((r.X = s), (r.Y = h))
        : (r = Vector2D_1.Vector2D.Create(s, h)),
      r
    );
  }
  r3o(t) {
    this.jFo?.IsValid() && (this.jFo.Kill(t), (this.jFo = void 0)),
      (this.F9l = void 0),
      (this.HFo = !1);
  }
  ZFo(t) {
    var e = Vector2D_1.Vector2D.Create(this.MapUiPosition);
    this.SetMapPosition(e.AdditionEqual(t), !1, 2);
  }
  TickMoveDirty() {
    var t;
    (this.e3o || this.t3o) &&
      ((t = Vector2D_1.Vector2D.Create(this.MapUiPosition)),
      this.e3o && (t.AdditionEqual(this.QFo), (this.e3o = !1)),
      this.t3o && (t.AdditionEqual(this.XFo), (this.t3o = !1)),
      this.SetMapPosition(t, !1, 2));
  }
}
exports.WorldMapMoveComponent = WorldMapMoveComponent;
//# sourceMappingURL=WorldMapMoveComponent.js.map
