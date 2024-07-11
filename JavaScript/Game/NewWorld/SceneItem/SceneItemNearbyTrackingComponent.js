"use strict";
let SceneItemNearbyTrackingComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    let s;
    const r = arguments.length;
    let o =
      r < 3 ? t : n === null ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(e, t, i, n);
    else
      for (let h = e.length - 1; h >= 0; h--)
        (s = e[h]) && (o = (r < 3 ? s(o) : r > 3 ? s(t, i, o) : s(t, i)) || o);
    return r > 3 && o && Object.defineProperty(t, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemNearbyTrackingComponent = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
let SceneItemNearbyTrackingComponent =
  (SceneItemNearbyTrackingComponent_1 = class SceneItemNearbyTrackingComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Qvn = !1),
        (this.Xvn = void 0),
        (this.Xte = void 0),
        (this.S9 = void 0),
        (this.$vn = void 0),
        (this.Yvn = void 0),
        (this.e_n = (e) => {
          this.Xte && this.Jvn(e);
        }),
        (this.zvn = () => {
          this.Lo?.IsEnbaleWhileHoming &&
            this.Xvn?.Type === "Icon" &&
            this.Xvn.Duration &&
            ((this.EnableTracking = !0),
            this.$vn &&
              TimerSystem_1.TimerSystem.Has(this.$vn) &&
              (TimerSystem_1.TimerSystem.Remove(this.$vn), (this.$vn = void 0)),
            (this.$vn = TimerSystem_1.TimerSystem.Delay(() => {
              this.EnableTracking = !1;
            }, this.Xvn.Duration * CommonDefine_1.MILLIONSECOND_PER_SECOND)));
        });
    }
    get ShowRange() {
      return this.Xvn?.Type === "Icon"
        ? this.Xvn.ShowRange
        : this.Xvn?.FarRadius;
    }
    get HideRange() {
      return this.Xvn?.Type === "Icon"
        ? this.Xvn.HideRange
        : this.Xvn?.FarRadius;
    }
    get IconOffset() {
      return this.Yvn;
    }
    get EnableTracking() {
      return this.Qvn;
    }
    set EnableTracking(e) {
      (this.Qvn = e),
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
      if (this.Xvn?.Type === "Icon") return this.b$i(this.Xvn.TexturePath);
    }
    get TrackType() {
      return this.S9;
    }
    get AudioPointNearRadius() {
      if (this.Xvn?.Type === "AudioPoint") return this.Xvn.NearRadius;
    }
    get AudioPointMiddleRadius() {
      if (this.Xvn?.Type === "AudioPoint") return this.Xvn.MiddleRadius;
    }
    get AudioPointFarRadius() {
      if (this.Xvn?.Type === "AudioPoint") return this.Xvn.FarRadius;
    }
    OnInitData(e) {
      var e = e.GetParam(SceneItemNearbyTrackingComponent_1)[0];
      const t = this.Entity.GetComponent(0);
      return (
        (this.Qvn = t.GetTrackingIsEnable()),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            32,
            "[NearbyTracking OnCreate]",
            ["EntityId", t.GetPbDataId()],
            ["IsEnableValue", this.Qvn],
          ),
        (this.Lo = e),
        (this.Xvn = e.TrackingType),
        (this.S9 = this.Zvn(this.Xvn)),
        void 0 !== this.S9 ||
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
          ((this.Xte = this.Entity?.GetComponent(177)),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemLockPropChange,
            this.e_n,
          )),
        this.Lo?.IsEnbaleWhileHoming &&
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnManipulatedItemPosReset,
            this.zvn,
          ),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemLockPropChange,
          this.e_n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemLockPropChange,
            this.e_n,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnManipulatedItemPosReset,
          this.zvn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnManipulatedItemPosReset,
            this.zvn,
          ),
        this.$vn &&
          TimerSystem_1.TimerSystem.Has(this.$vn) &&
          (TimerSystem_1.TimerSystem.Remove(this.$vn), (this.$vn = void 0)),
        !0
      );
    }
    Zvn(e) {
      return e?.Type === "Icon"
        ? ((this.Yvn = Vector_1.Vector.Create(0, 0, 0)),
          e.UiOffset && this.Yvn.Set(e.UiOffset.X, e.UiOffset.Y, e.UiOffset.Z),
          0)
        : e?.Type === "AudioPoint"
          ? 1
          : void 0;
    }
    b$i(e) {
      e = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
        "ENearbyTrackingTexture." + e,
      );
      if (e) return e.Value;
    }
    Jvn(e) {
      this.EnableTracking = !e;
    }
  });
(SceneItemNearbyTrackingComponent = SceneItemNearbyTrackingComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(144)],
    SceneItemNearbyTrackingComponent,
  )),
  (exports.SceneItemNearbyTrackingComponent = SceneItemNearbyTrackingComponent);
// # sourceMappingURL=SceneItemNearbyTrackingComponent.js.map
