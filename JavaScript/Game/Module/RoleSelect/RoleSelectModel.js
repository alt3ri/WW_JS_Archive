"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSelectModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class RoleSelectModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.SelectedRoleSet = new Set()),
      (this.RoleIndexMap = new Map());
  }
  GetRoleIndex(e) {
    for (const t of this.RoleIndexMap) if (t[1].GetDataId() === e) return t[0];
    return 0;
  }
  ClearData() {
    this.SelectedRoleSet.clear(), this.RoleIndexMap.clear();
  }
}
exports.RoleSelectModel = RoleSelectModel;
//# sourceMappingURL=RoleSelectModel.js.map
