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
  MarkItem_1 = require("../../Map/Marks/MarkItem/MarkItem"),
  WorldMapComponentBase_1 = require("./WorldMapComponentBase");
class WorldMapMoveComponent extends WorldMapComponentBase_1.WorldMapComponentBase {
  constructor(t, e) {
    super(t),
      (this.G2o = void 0),
      (this.K2o = !1),
      (this.Q2o = void 0),
      (this.X2o = void 0),
      (this.$2o = void 0),
      (this.Y2o = new Vector2D_1.Vector2D()),
      (this.J2o = new Vector2D_1.Vector2D()),
      (this.z2o = void 0),
      (this.Z2o = (t) => {
        t = Vector2D_1.Vector2D.Create(t);
        this.SetMapPosition(t, !1, 2);
      }),
      (this.eFo = (t) => {
        var e = Vector2D_1.Vector2D.Create(),
          t =
            (t.Multiply(this.G2o.TweenTime, e),
            Vector2D_1.Vector2D.Create(
              this.Map.GetRootItem().GetAnchorOffset(),
            ).AdditionEqual(e));
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
      (this.FCo = () => {
        this.Q2o?.Kill(!0);
      }),
      (this.tFo = () => {
        this.Q2o?.Kill(!0);
      }),
      (this.aWe = (t) => {
        this.iFo(t);
      }),
      (this.oFo = !1),
      (this.rFo = !1),
      (this.nFo = (t) => {
        (this.Y2o.Y = t), (this.oFo = !0);
      }),
      (this.sFo = (t) => {
        (this.J2o.X = t), (this.rFo = !0);
      }),
      (this.$2o = { MinX: 0, MaxX: 0, MinY: 0, MaxY: 0 }),
      (this.z2o = { MinX: 0, MaxX: 0, MinY: 0, MaxY: 0 }),
      (this.G2o = e),
      (this.X2o = (0, puerts_1.toManualReleaseDelegate)(this.Z2o));
  }
  get SafeAreaSize() {
    var t = this.$2o;
    return (
      (t.MinX =
        -(
          (this.MapSize.X + this.Map.MapOffset.Y) * this.MapScale -
          this.ViewportSize.X
        ) / 2),
      (t.MaxX =
        ((this.MapSize.X - this.Map.MapOffset.X) * this.MapScale -
          this.ViewportSize.X) /
        2),
      (t.MinY =
        -(
          (this.MapSize.Y - this.Map.MapOffset.Z) * this.MapScale -
          this.ViewportSize.Y
        ) / 2),
      (t.MaxY =
        ((this.MapSize.Y - this.Map.MapOffset.W) * this.MapScale -
          this.ViewportSize.Y) /
        2),
      t
    );
  }
  get DangerousAreaSize() {
    var t = this.z2o;
    return (
      (t.MinX =
        -(
          (this.MapSize.X + this.Map.MapOffset.Y + this.Map.FakeOffset) *
            this.MapScale -
          this.ViewportSize.X
        ) / 2),
      (t.MaxX =
        ((this.MapSize.X - this.Map.MapOffset.X + this.Map.FakeOffset) *
          this.MapScale -
          this.ViewportSize.X) /
        2),
      (t.MinY =
        -(
          (this.MapSize.Y - this.Map.MapOffset.Z + this.Map.FakeOffset) *
            this.MapScale -
          this.ViewportSize.Y
        ) / 2),
      (t.MaxY =
        ((this.MapSize.Y - this.Map.MapOffset.W + this.Map.FakeOffset) *
          this.MapScale -
          this.ViewportSize.Y) /
        2),
      t
    );
  }
  get IsTweeningMove() {
    return this.K2o;
  }
  KillTweening() {
    this.K2o && this.aFo(), (this.K2o = !1);
  }
  get MapScale() {
    return ModelManager_1.ModelManager.WorldMapModel.MapScale;
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldMapDragInertia,
      this.eFo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapPointerDrag,
        this.aWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapPointerDown,
        this.FCo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapWheelAxisInput,
        this.tFo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapJoystickMoveForward,
        this.nFo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapJoystickMoveRight,
        this.sFo,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldMapDragInertia,
      this.eFo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapPointerDrag,
        this.aWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapPointerDown,
        this.FCo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapWheelAxisInput,
        this.tFo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapJoystickMoveForward,
        this.nFo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapJoystickMoveRight,
        this.sFo,
      );
  }
  OnDestroy() {
    this.aFo(),
      (0, puerts_1.releaseManualReleaseDelegate)(this.Z2o),
      (this.X2o = void 0),
      (this.$2o = void 0),
      (this.z2o = void 0),
      (this.G2o = void 0);
  }
  PushMap(t, e = !0, i = 2) {
    var s, h, n, o, r;
    this.G2o
      ? ((s = t.UiPosition.X),
        (t = t.UiPosition.Y),
        (h = this.Map.GetRootItem().GetAnchorOffset()),
        (r = s * this.MapScale + h.X),
        (h = t * this.MapScale + h.Y),
        (n = this.G2o.FocusMark_AnchoredPosition.X),
        (o = this.G2o.FocusMark_AnchoredPosition.Y),
        r === n && h === o
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapPositionChanged,
            )
          : ((r = Vector2D_1.Vector2D.Create(
              -s * this.MapScale + n,
              -t * this.MapScale + o,
            )),
            this.SetMapPosition(
              r,
              e,
              i,
              this.G2o.TweenTypeEase,
              this.G2o.TweenTime,
            )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 19, "请于根节点挂KuroWorldMapUIParams组件");
  }
  SetMapPosition(e, i, s = 0, h, n, o = !0) {
    if (e)
      if (this.G2o) {
        let t = Vector2D_1.Vector2D.Create();
        e instanceof Vector2D_1.Vector2D
          ? t.DeepCopy(e)
          : e instanceof MarkItem_1.MarkItem &&
            ((t.X = e.UiPosition.X),
            (t.Y = e.UiPosition.Y),
            t.MultiplyEqual(this.MapScale).UnaryNegation(t));
        e = Vector2D_1.Vector2D.Create(t.X, t.Y);
        (t = this.hFo(e, s)),
          i
            ? ((this.K2o = !0),
              this.aFo(),
              (this.Q2o = UE.LTweenBPLibrary.Vector2To(
                GlobalData_1.GlobalData.World,
                this.X2o,
                this.Map.GetRootItem().GetAnchorOffset(),
                t.ToUeVector2D(!0),
                n,
                0,
                h,
              )),
              this.Q2o.OnCompleteCallBack.Bind(() => {
                this.K2o = !1;
              }))
            : (this.Map.GetRootItem().SetAnchorOffset(t.ToUeVector2D(!0)),
              o &&
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.WorldMapPositionChanged,
                ));
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 19, "请于根节点挂KuroWorldMapUIParams组件");
  }
  FocusPlayer(t, e = !1, i = 0) {
    var s = Vector2D_1.Vector2D.Create();
    t.Multiply(this.MapScale, s).UnaryNegation(s),
      this.SetMapPosition(s, e, i, this.G2o.TweenTypeEase, this.G2o.TweenTime);
  }
  hFo(t, e, i = !1) {
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
            this.$2o.MinY,
            this.$2o.MaxY,
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
    let n = t;
    return (
      i || 0 === e
        ? ((n.X = s), (n.Y = h))
        : (n = Vector2D_1.Vector2D.Create(s, h)),
      n
    );
  }
  aFo() {
    this.Q2o && (this.Q2o.Kill(), (this.Q2o = void 0));
  }
  iFo(t) {
    var e = Vector2D_1.Vector2D.Create(
      this.Map.GetRootItem().GetAnchorOffset(),
    );
    this.SetMapPosition(e.AdditionEqual(t), !1, 2);
  }
  TickMoveDirty() {
    var t;
    (this.oFo || this.rFo) &&
      ((t = Vector2D_1.Vector2D.Create(
        this.Map.GetRootItem().GetAnchorOffset(),
      )),
      this.oFo && (t.AdditionEqual(this.Y2o), (this.oFo = !1)),
      this.rFo && (t.AdditionEqual(this.J2o), (this.rFo = !1)),
      this.SetMapPosition(t, !1, 2));
  }
}
exports.WorldMapMoveComponent = WorldMapMoveComponent;
//# sourceMappingURL=WorldMapMoveComponent.js.map
