"use strict";
var SceneItemNearbyTrackingComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, n) {
      var s,
        r = arguments.length,
        o =
          r < 3
            ? t
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(t, i))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(e, t, i, n);
      else
        for (var h = e.length - 1; 0 <= h; h--)
          (s = e[h]) &&
            (o = (r < 3 ? s(o) : 3 < r ? s(t, i, o) : s(t, i)) || o);
      return 3 < r && o && Object.defineProperty(t, i, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemNearbyTrackingComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
let SceneItemNearbyTrackingComponent =
  (SceneItemNearbyTrackingComponent_1 = class SceneItemNearbyTrackingComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Tvn = !1),
        (this.Lvn = void 0),
        (this.Xte = void 0),
        (this.E9 = void 0),
        (this.Dvn = void 0),
        (this.Rvn = void 0),
        (this.w1n = (e) => {
          this.Xte && this.Uvn(e);
        }),
        (this.Avn = () => {
          this.Lo?.IsEnbaleWhileHoming &&
            "Icon" === this.Lvn?.Type &&
            this.Lvn.Duration &&
            ((this.EnableTracking = !0),
            this.Dvn &&
              TimerSystem_1.TimerSystem.Has(this.Dvn) &&
              (TimerSystem_1.TimerSystem.Remove(this.Dvn), (this.Dvn = void 0)),
            (this.Dvn = TimerSystem_1.TimerSystem.Delay(() => {
              this.EnableTracking = !1;
            }, this.Lvn.Duration * CommonDefine_1.MILLIONSECOND_PER_SECOND)));
        });
    }
    get ShowRange() {
      return "Icon" === this.Lvn?.Type
        ? this.Lvn.ShowRange
        : this.Lvn?.FarRadius;
    }
    get HideRange() {
      return "Icon" === this.Lvn?.Type
        ? this.Lvn.HideRange
        : this.Lvn?.FarRadius;
    }
    get IconOffset() {
      return this.Rvn;
    }
    get EnableTracking() {
      return this.Tvn;
    }
    set EnableTracking(e) {
      (this.Tvn = e),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnUpdateNearbyEnable,
          e,
        ),
        e ||
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RemoveNearbyTrack,
            this.Entity,
          );
    }
    get IconPath() {
      if ("Icon" === this.Lvn?.Type) return this.wYi(this.Lvn.TexturePath);
    }
    get TrackType() {
      return this.E9;
    }
    get AudioPointNearRadius() {
      if ("AudioPoint" === this.Lvn?.Type) return this.Lvn.NearRadius;
    }
    get AudioPointMiddleRadius() {
      if ("AudioPoint" === this.Lvn?.Type) return this.Lvn.MiddleRadius;
    }
    get AudioPointFarRadius() {
      if ("AudioPoint" === this.Lvn?.Type) return this.Lvn.FarRadius;
    }
    OnInitData(e) {
      var e = e.GetParam(SceneItemNearbyTrackingComponent_1)[0],
        t = this.Entity.GetComponent(0);
      return (
        (this.Tvn = t.GetTrackingIsEnable()),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            32,
            "[NearbyTracking OnCreate]",
            ["EntityId", t.GetPbDataId()],
            ["IsEnableValue", this.Tvn],
          ),
        (this.Lo = e),
        (this.Lvn = e.TrackingType),
        (this.E9 = this.Pvn(this.Lvn)),
        void 0 !== this.E9 ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              40,
              "组件OnCreate失败，追踪类型无法确定",
              ["EntityId", t.GetPbDataId()],
            ),
          !1)
      );
    }
    OnStart() {
      return (
        this.Lo?.IsEnableWhileUnlock &&
          !this.Lo?.IsEnable &&
          ((this.Xte = this.Entity?.GetComponent(181)),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemLockPropChange,
            this.w1n,
          )),
        this.Lo?.IsEnbaleWhileHoming &&
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnManipulatedItemPosReset,
            this.Avn,
          ),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemLockPropChange,
          this.w1n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemLockPropChange,
            this.w1n,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnManipulatedItemPosReset,
          this.Avn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnManipulatedItemPosReset,
            this.Avn,
          ),
        this.Dvn &&
          TimerSystem_1.TimerSystem.Has(this.Dvn) &&
          (TimerSystem_1.TimerSystem.Remove(this.Dvn), (this.Dvn = void 0)),
        !0
      );
    }
    Pvn(e) {
      return "Icon" === e?.Type
        ? ((this.Rvn = Vector_1.Vector.Create(0, 0, 0)),
          e.UiOffset && this.Rvn.Set(e.UiOffset.X, e.UiOffset.Y, e.UiOffset.Z),
          0)
        : "AudioPoint" === e?.Type
          ? 1
          : void 0;
    }
    wYi(e) {
      e = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
        "ENearbyTrackingTexture." + e,
      );
      if (e) return e.Value;
    }
    Uvn(e) {
      this.EnableTracking = !e;
    }
  });
(SceneItemNearbyTrackingComponent = SceneItemNearbyTrackingComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(147)],
    SceneItemNearbyTrackingComponent,
  )),
  (exports.SceneItemNearbyTrackingComponent = SceneItemNearbyTrackingComponent);
//# sourceMappingURL=SceneItemNearbyTrackingComponent.js.map
