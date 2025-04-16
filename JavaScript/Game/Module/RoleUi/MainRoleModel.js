"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MainRoleModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimeUtil_1 = require("../../Common/TimeUtil");
class MainRoleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Lkl = 0);
  }
  UpdateCanChangeSexTime(e) {
    this.Lkl = e;
  }
  CanChangeSex() {
    return TimeUtil_1.TimeUtil.GetServerTimeStamp() >= this.Lkl;
  }
  GetCanChangeSexTime() {
    return this.Lkl;
  }
}
exports.MainRoleModel = MainRoleModel;
//# sourceMappingURL=MainRoleModel.js.map
