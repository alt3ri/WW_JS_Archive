"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TurntableControlModel = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase");
class TurntableControlModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Vwe = void 0), (this.Hwe = void 0);
  }
  get CurControllerEntity() {
    return this.Vwe;
  }
  get CurControllerEntityComp() {
    return this.Hwe;
  }
  SetCurControllerEntity(t) {
    var t = EntitySystem_1.EntitySystem.Get(t),
      e = t?.GetComponent(122);
    e || this.ClearCurControllerEntity(), (this.Vwe = t), (this.Hwe = e);
  }
  ClearCurControllerEntity() {
    (this.Vwe = void 0), (this.Hwe = void 0);
  }
  OnClear() {
    return this.ClearCurControllerEntity(), !0;
  }
}
exports.TurntableControlModel = TurntableControlModel;
//# sourceMappingURL=TurntableControlModel.js.map
