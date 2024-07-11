"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManipulaterModel = void 0);
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
class ManipulaterModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.B$o = 0),
      (this.b$o = Vector_1.Vector.ZeroVectorProxy),
      (this.ExitHoldingStateCameraLocation = void 0),
      (this.q$o = 0),
      (this.G$o = new Set());
  }
  SetManipulateMode(e) {
    this.B$o = e;
  }
  GetManipulateMode() {
    return this.B$o;
  }
  SetTargetPartLocation(e) {
    this.b$o = e;
  }
  GetTargetPartLocation() {
    return this.b$o;
  }
  NeedShowLandTips() {
    return this.q$o > 0;
  }
  AddShowLandTipsCount(e) {
    this.G$o.has(e) ||
      (this.q$o === 0 &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnManipulateShowLandTips,
          !0,
        ),
      this.q$o++,
      this.G$o.add(e));
  }
  RemoveShowLandTipsCount(e) {
    this.G$o.has(e) &&
      this.q$o !== 0 &&
      (this.G$o.delete(e), this.q$o--, this.q$o === 0) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnManipulateShowLandTips,
        !1,
      );
  }
}
exports.ManipulaterModel = ManipulaterModel;
// # sourceMappingURL=CharacterManipulaterModel.js.map
