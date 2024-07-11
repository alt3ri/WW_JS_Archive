"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventCameraShake = void 0);
const UE = require("ue");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventCameraShake extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.DLe = -0),
      (this.RLe = -0),
      (this.ULe = -0),
      (this.ALe = -0),
      (this.PLe = -0),
      (this.xLe = -0),
      (this.wLe = !1),
      (this.BLe = void 0),
      (this.bLe = (e) => {
        this.FinishExecute(!0);
      });
  }
  Execute(e, t) {
    !e || t !== Global_1.Global.BaseCharacter
      ? this.FinishExecute(!1)
      : ((this.DLe = parseFloat(e.get("MinInterval"))),
        (this.RLe = parseFloat(e.get("MaxInterval"))),
        (this.ALe = parseFloat(e.get("InnerRadius"))),
        (this.PLe = parseFloat(e.get("OuterRadius"))),
        (this.xLe = parseFloat(e.get("Falloff"))),
        (this.wLe =
          e.get("OrientShakeTowardsEpicenter").toLowerCase() === "true"),
        this.qLe(),
        (t = e.get("MatineeCameraShake") + "_C"),
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, (e) => {
          e?.IsValid() && (this.BLe = e);
        }),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnTriggerVolumeExit,
          this.bLe,
        ));
  }
  OnTick(e) {
    (this.ULe -= e), this.BLe && this.ULe < 0 && (this.GLe(), this.qLe());
  }
  GLe() {
    let e;
    CameraController_1.CameraController.Model.IsModeEnabled(2) ||
      CameraController_1.CameraController.Model.IsModeEnabled(1) ||
      ((e = Global_1.Global.CharacterCameraManager.GetCameraLocation()),
      CameraController_1.CameraController.PlayWorldCameraShake(
        this.BLe,
        e,
        this.ALe,
        this.PLe,
        this.xLe,
        this.wLe,
      ));
  }
  qLe() {
    (this.ULe = MathUtils_1.MathUtils.GetRandomFloatNumber(this.DLe, this.RLe)),
      (this.ULe *= CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  OnReset() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.OnTriggerVolumeExit,
      this.bLe,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnTriggerVolumeExit,
        this.bLe,
      ),
      (this.BLe = void 0),
      (this.DLe = 0),
      (this.RLe = 0),
      (this.ALe = 0),
      (this.PLe = 0),
      (this.xLe = 0),
      (this.wLe = !1),
      (this.ULe = 0);
  }
}
exports.LevelEventCameraShake = LevelEventCameraShake;
// # sourceMappingURL=LevelEventCameraShake.js.map
