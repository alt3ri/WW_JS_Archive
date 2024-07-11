"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraAimHandle = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const CameraAimUnit_1 = require("../HudUnit/CameraAimUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class CameraAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.vii = void 0),
      (this.Mii = void 0),
      (this.Sii = (t, e, i) => {
        if (t && e === 0) {
          if ((this.Mii !== i && (this.Mii = i), !this.vii))
            return void this.Eii();
          if (this.vii.ResourceId !== this.Mii)
            return this.yii(), void this.Eii();
        }
        this.vii && this.vii.SetVisible(t, e);
      });
  }
  OnDestroyed() {
    (this.Mii = void 0), this.yii();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SetCameraAimVisible,
      this.Sii,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SetCameraAimVisible,
      this.Sii,
    );
  }
  Eii() {
    this.Mii &&
      this.Mii.length !== 0 &&
      ((this.vii = this.NewHudUnitWithReturn(
        CameraAimUnit_1.CameraAimUnit,
        this.Mii,
        !0,
        () => {
          this.Mii !== this.vii?.ResourceId && this.yii();
        },
      )),
      this.vii.SetVisible(!0, 0));
  }
  yii() {
    this.vii && (this.DestroyHudUnit(this.vii), (this.vii = void 0));
  }
}
exports.CameraAimHandle = CameraAimHandle;
// # sourceMappingURL=CameraAimHandle.js.map
