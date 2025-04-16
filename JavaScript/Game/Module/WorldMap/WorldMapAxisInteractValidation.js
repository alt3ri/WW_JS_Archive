"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapAxisInteractValidation = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager");
class WorldMapAxisInteractValidation {
  constructor() {
    (this.kpl = !1),
      (this.Opl = new Map()),
      (this.Npl = () => {
        this.kpl = !0;
      });
  }
  Reset() {
    this.kpl = !1;
    for (const t of this.Opl.keys()) this.InitAxisLock(t);
  }
  InitAxisLock(t) {
    var e = ModelManager_1.ModelManager.InputDistributeModel.GetAxisValue(t);
    this.Opl.set(t, 0 !== e);
  }
  Init() {
    this.dde();
  }
  Clear() {
    this.Cde(), this.Opl.clear(), (this.kpl = !1);
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldMapViewOpened,
      this.Npl,
    );
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldMapViewOpened,
      this.Npl,
    );
  }
  InputAxis(t, e) {
    if (this.IsAxisInValid(t) && this.kpl && 0 === e)
      for (const t of this.Opl.keys()) this.Opl.set(t, !1);
  }
  get IsInValid() {
    for (const t of this.Opl.values()) if (t) return !0;
    return !1;
  }
  IsAxisInValid(t) {
    return this.Opl.get(t) ?? !1;
  }
}
exports.WorldMapAxisInteractValidation = WorldMapAxisInteractValidation;
//# sourceMappingURL=WorldMapAxisInteractValidation.js.map
