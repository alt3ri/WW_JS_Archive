"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManipulaterModel = void 0);
const UE = require("ue"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem");
class ManipulaterModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.PYo = 0),
      (this.xYo = Vector_1.Vector.ZeroVectorProxy),
      (this.ExitHoldingStateCameraLocation = void 0),
      (this.wYo = 0),
      (this.BYo = new Set()),
      (this.k0a = void 0),
      (this.G0a = void 0),
      (this.N0a = void 0);
  }
  SetManipulateMode(t) {
    this.PYo = t;
  }
  GetManipulateMode() {
    return this.PYo;
  }
  SetTargetPartLocation(t) {
    this.xYo = t;
  }
  GetTargetPartLocation() {
    return this.xYo;
  }
  NeedShowLandTips() {
    return 0 < this.wYo;
  }
  AddShowLandTipsCount(t) {
    this.BYo.has(t) ||
      (0 === this.wYo &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnManipulateShowLandTips,
          !0,
        ),
      this.wYo++,
      this.BYo.add(t));
  }
  RemoveShowLandTipsCount(t) {
    this.BYo.has(t) &&
      0 !== this.wYo &&
      (this.BYo.delete(t), this.wYo--, 0 === this.wYo) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnManipulateShowLandTips,
        !1,
      );
  }
  GetProjectilePath() {
    return (
      void 0 === this.k0a && (this.k0a = UE.NewArray(UE.VectorDouble)), this.k0a
    );
  }
  SetProjectilePath(t) {
    this.k0a = t;
  }
  GetAfterPortalProjectilePath() {
    return (
      void 0 === this.G0a && (this.G0a = UE.NewArray(UE.VectorDouble)), this.G0a
    );
  }
  SetAfterPortalProjectilePath(t) {
    this.G0a = t;
  }
  GetAfterPortalStartPosition() {
    return this.N0a;
  }
  SetAfterPortalStartPosition(t) {
    this.N0a = t;
  }
}
exports.ManipulaterModel = ManipulaterModel;
//# sourceMappingURL=CharacterManipulaterModel.js.map
