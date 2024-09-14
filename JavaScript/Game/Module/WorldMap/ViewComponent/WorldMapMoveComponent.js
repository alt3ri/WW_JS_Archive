"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapMoveComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MapComponent_1 = require("../../Map/Base/MapComponent"),
  MarkItem_1 = require("../../Map/Marks/MarkItem/MarkItem");
class WorldMapMoveComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.HFo = !1),
      (this.jFo = void 0),
      (this.WFo = void 0),
      (this.KFo = void 0),
      (this.QFo = new Vector2D_1.Vector2D()),
      (this.XFo = new Vector2D_1.Vector2D()),
      (this.$Fo = void 0),
      (this.YFo = (t) => {
        t = Vector2D_1.Vector2D.Create(t);
        this.SetMapPosition(t, !1, 2);
      }),
      (this.JFo = (t) => {
        var e = Vector2D_1.Vector2D.Create(),
          t = (t.Multiply(this.BFo.TweenTime, e), this.MKa.Map),
          t = Vector2D_1.Vector2D.Create(
            t.GetRootItem().GetAnchorOffset(),
          ).AdditionEqual(e);
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
        this.jFo?.IsValid() && this.jFo.Kill(!0);
      }),
      (this.zFo = () => {
        this.jFo?.IsValid() && this.jFo.Kill(!0);
      }),
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
      });
  }
  get ComponentType() {
    return 3;
  }
  get MKa() {
    var t = this.Parent;
    if (void 0 !== t) return t;
    this.LogError(64, "[地图系统]->二级界面组件没有附加到容器下！");
  }
  get BFo() {
    return this.MKa.UiParams;
  }
  get PYe() {
    return this.MKa.ViewPortSize;
  }
  get SKa() {
    return this.MKa.MapSize;
  }
  get SafeAreaSize() {
    var t = this.MKa.Map,
      e = this.KFo;
    return (
      (e.MinX =
        -((this.SKa.X + t.MapOffset.Y) * this.MapScale - this.PYe.X) / 2),
      (e.MaxX =
        ((this.SKa.X - t.MapOffset.X) * this.MapScale - this.PYe.X) / 2),
      (e.MinY =
        -((this.SKa.Y - t.MapOffset.Z) * this.MapScale - this.PYe.Y) / 2),
      (e.MaxY =
        ((this.SKa.Y - t.MapOffset.W) * this.MapScale - this.PYe.Y) / 2),
      e
    );
  }
  get DangerousAreaSize() {
    var t = this.MKa.Map,
      e = this.$Fo;
    return (
      (e.MinX =
        -(
          (this.SKa.X + t.MapOffset.Y + t.FakeOffset) * this.MapScale -
          this.PYe.X
        ) / 2),
      (e.MaxX =
        ((this.SKa.X - t.MapOffset.X + t.FakeOffset) * this.MapScale -
          this.PYe.X) /
        2),
      (e.MinY =
        -(
          (this.SKa.Y - t.MapOffset.Z + t.FakeOffset) * this.MapScale -
          this.PYe.Y
        ) / 2),
      (e.MaxY =
        ((this.SKa.Y - t.MapOffset.W + t.FakeOffset) * this.MapScale -
          this.PYe.Y) /
        2),
      e
    );
  }
  get IsTweeningMove() {
    return this.HFo;
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
    var s, h, r, n, o;
    this.BFo
      ? ((s = t.UiPosition.X),
        (t = t.UiPosition.Y),
        (h = this.MKa.Map.GetRootItem().GetAnchorOffset()),
        (o = s * this.MapScale + h.X),
        (h = t * this.MapScale + h.Y),
        (r = this.BFo.FocusMark_AnchoredPosition.X),
        (n = this.BFo.FocusMark_AnchoredPosition.Y),
        o === r && h === n
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapPositionChanged,
            )
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
        Log_1.Log.Error("Map", 19, "请于根节点挂KuroWorldMapUIParams组件");
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
        (e = Vector2D_1.Vector2D.Create(t.X, t.Y)),
          (e = ((t = this.n3o(e, s)), this.MKa.Map));
        i
          ? ((this.HFo = !0),
            this.r3o(),
            (this.jFo = UE.LTweenBPLibrary.Vector2To(
              GlobalData_1.GlobalData.World,
              this.WFo,
              e.GetRootItem().GetAnchorOffset(),
              t.ToUeVector2D(!0),
              r,
              0,
              h,
            )),
            this.jFo.OnCompleteCallBack.Bind(() => {
              this.HFo = !1;
            }))
          : (e.GetRootItem().SetAnchorOffset(t.ToUeVector2D(!0)),
            n &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WorldMapPositionChanged,
              ));
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 64, "请于根节点挂KuroWorldMapUIParams组件");
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
  r3o() {
    this.jFo?.IsValid() && (this.jFo.Kill(), (this.jFo = void 0));
  }
  ZFo(t) {
    var e = this.MKa.Map,
      e = Vector2D_1.Vector2D.Create(e.GetRootItem().GetAnchorOffset());
    this.SetMapPosition(e.AdditionEqual(t), !1, 2);
  }
  TickMoveDirty() {
    var t;
    (this.e3o || this.t3o) &&
      ((t = this.MKa.Map),
      (t = Vector2D_1.Vector2D.Create(t.GetRootItem().GetAnchorOffset())),
      this.e3o && (t.AdditionEqual(this.QFo), (this.e3o = !1)),
      this.t3o && (t.AdditionEqual(this.XFo), (this.t3o = !1)),
      this.SetMapPosition(t, !1, 2));
  }
}
exports.WorldMapMoveComponent = WorldMapMoveComponent;
//# sourceMappingURL=WorldMapMoveComponent.js.map
