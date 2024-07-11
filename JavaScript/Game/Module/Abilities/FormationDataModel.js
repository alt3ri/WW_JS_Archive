"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationDataModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
class FormationDataModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.PlayerAggroSet = new Set()),
      (this.LastPositionOnLand = Vector_1.Vector.Create(0, 0, 0));
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return this.PlayerAggroSet.clear(), !0;
  }
}
exports.FormationDataModel = FormationDataModel;
// # sourceMappingURL=FormationDataModel.js.map
