"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManipulateAimHandle = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ManipulateAimUnit_1 = require("../HudUnit/ManipulateAimUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class ManipulateAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.Qoi = void 0),
      (this.Xoi = void 0),
      (this.$oi = void 0),
      (this.Yoi = void 0),
      (this.Joi = !1),
      (this.Moi = void 0),
      (this.zoi = (t, i, s) => {
        t || this.Xoi || this.Qoi?.PlayCloseAnim();
      }),
      (this.Zoi = (t, i) => {
        (this.Moi = i),
          this.Qoi
            ? this.Qoi.ResourceId !== this.Moi
              ? (this.eri(), this.tri())
              : (this.iri(), this.ori(), this.Qoi.PlayStartAnim())
            : this.tri();
      }),
      (this.rri = (t, i) => {
        t &&
          ((this.Xoi = t.GetComponent(3)),
          (this.$oi = this.Xoi?.Actor.Mesh),
          (this.Yoi = i?.PartSocketName),
          (this.Joi = i?.IsWeakness),
          this.Qoi
            ? this.Qoi.ResourceId !== this.Moi
              ? (this.eri(), this.tri())
              : (this.iri(), this.ori())
            : this.tri());
      }),
      (this.nri = () => {
        (this.Xoi = void 0),
          (this.$oi = void 0),
          (this.Yoi = void 0),
          this.Qoi?.SetTargetAimVisible(!1);
      }),
      (this.sri = () => {
        (this.Xoi = void 0),
          (this.$oi = void 0),
          (this.Yoi = void 0),
          (this.Moi = void 0),
          this.Qoi?.PlayCloseAnim();
      });
  }
  OnDestroyed() {
    this.eri(),
      (this.Qoi = void 0),
      (this.Xoi = void 0),
      (this.$oi = void 0),
      (this.Yoi = void 0);
  }
  OnTick(t) {
    this.iri();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
      this.zoi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnManipulateStartChanting,
        this.Zoi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ManipulateStartLockCastTarget,
        this.rri,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ManipulateEndLockCastTarget,
        this.nri,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.HiddenManipulateUI,
        this.sri,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
      this.zoi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnManipulateStartChanting,
        this.Zoi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ManipulateStartLockCastTarget,
        this.rri,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ManipulateEndLockCastTarget,
        this.nri,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.HiddenManipulateUI,
        this.sri,
      );
  }
  tri() {
    this.Moi &&
      0 !== this.Moi.length &&
      ((this.Qoi = this.NewHudUnitWithReturn(
        ManipulateAimUnit_1.ManipulateAimUnit,
        this.Moi,
        !0,
        () => {
          this.Moi !== this.Qoi?.ResourceId
            ? this.eri()
            : (this.Qoi?.SetCloseAnimCallback(() => {
                this.eri();
              }),
              this.iri(),
              this.ori());
        },
      )),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetCameraAimVisible,
        !1,
        1,
      ));
  }
  eri() {
    this.Qoi &&
      (this.DestroyHudUnit(this.Qoi),
      (this.Qoi = void 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetCameraAimVisible,
        !0,
        1,
      ));
  }
  iri() {
    var t;
    this.Qoi &&
      !this.Qoi.InAsyncLoading() &&
      ((t = this.ari()) && (t = this.ProjectWorldToScreen(t))
        ? (this.Qoi.SetTargetItemOffset(t.X, t.Y),
          this.Qoi.SetTargetAimVisible(!0))
        : this.Qoi.SetTargetAimVisible(!1));
  }
  ori() {
    !this.Qoi || this.Qoi.InAsyncLoading() || this.Qoi.SetIsWeakness(this.Joi);
  }
  ari() {
    if (this.Xoi)
      return this.$oi && this.Yoi && this.$oi.DoesSocketExist(this.Yoi)
        ? this.$oi.GetSocketLocation(this.Yoi)
        : this.Xoi.ActorLocation;
  }
}
exports.ManipulateAimHandle = ManipulateAimHandle;
//# sourceMappingURL=ManipulateAimHandle.js.map
