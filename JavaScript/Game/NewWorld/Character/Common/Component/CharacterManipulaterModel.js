"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManipulaterModel = void 0);
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
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
      (this.BYo = new Set());
  }
  SetManipulateMode(e) {
    this.PYo = e;
  }
  GetManipulateMode() {
    return this.PYo;
  }
  SetTargetPartLocation(e) {
    this.xYo = e;
  }
  GetTargetPartLocation() {
    return this.xYo;
  }
  NeedShowLandTips() {
    return 0 < this.wYo;
  }
  AddShowLandTipsCount(e) {
    this.BYo.has(e) ||
      (0 === this.wYo &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnManipulateShowLandTips,
          !0,
        ),
      this.wYo++,
      this.BYo.add(e));
  }
  RemoveShowLandTipsCount(e) {
    this.BYo.has(e) &&
      0 !== this.wYo &&
      (this.BYo.delete(e), this.wYo--, 0 === this.wYo) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnManipulateShowLandTips,
        !1,
      );
  }
}
exports.ManipulaterModel = ManipulaterModel;
//# sourceMappingURL=CharacterManipulaterModel.js.map
