"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraAimHandle = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  CameraAimUnit_1 = require("../HudUnit/CameraAimUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class CameraAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.voi = void 0),
      (this.Moi = void 0),
      (this.Eoi = (t, e, i) => {
        if (t && 0 === e) {
          if ((this.Moi !== i && (this.Moi = i), !this.voi))
            return void this.Soi();
          if (this.voi.ResourceId !== this.Moi)
            return this.yoi(), void this.Soi();
        }
        this.voi && this.voi.SetVisible(t, e);
      });
  }
  OnDestroyed() {
    (this.Moi = void 0), this.yoi();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SetCameraAimVisible,
      this.Eoi,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SetCameraAimVisible,
      this.Eoi,
    );
  }
  Soi() {
    this.Moi &&
      0 !== this.Moi.length &&
      ((this.voi = this.NewHudUnitWithReturn(
        CameraAimUnit_1.CameraAimUnit,
        this.Moi,
        !0,
        () => {
          this.Moi !== this.voi?.ResourceId && this.yoi();
        },
      )),
      this.voi.SetVisible(!0, 0));
  }
  yoi() {
    this.voi && (this.DestroyHudUnit(this.voi), (this.voi = void 0));
  }
}
exports.CameraAimHandle = CameraAimHandle;
//# sourceMappingURL=CameraAimHandle.js.map
