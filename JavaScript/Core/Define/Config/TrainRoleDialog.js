"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrainRoleDialog = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class TrainRoleDialog {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get RoleId() {
    return this.roleid();
  }
  get TrainType() {
    return this.traintype();
  }
  get Dialog() {
    return this.dialog();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsTrainRoleDialog(t, i) {
    return (i || new TrainRoleDialog()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  traintype() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dialog(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.TrainRoleDialog = TrainRoleDialog;
//# sourceMappingURL=TrainRoleDialog.js.map
