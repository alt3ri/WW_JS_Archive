"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HudEntitySet = void 0);
const HudEntityData_1 = require("./HudEntityData");
class HudEntitySet {
  constructor() {
    (this.ioi = []), (this.ooi = new Map());
  }
  Initialize() {}
  Clear() {
    (this.ioi.length = 0), this.ooi.clear();
  }
  Add(t) {
    var i = new HudEntityData_1.HudEntityData();
    return i.Initialize(t), this.ooi.set(t.Id, i), this.ioi.push(i), i;
  }
  Remove(t) {
    var i = this.GetByEntity(t);
    i &&
      (i.Destroy(),
      (i = this.ioi.indexOf(i)),
      this.ioi.splice(i, 1),
      this.ooi.delete(t.Id));
  }
  Num() {
    return this.ioi.length;
  }
  GetByEntity(t) {
    return this.ooi.get(t.Id);
  }
  GetByEntityId(t) {
    return this.ooi.get(t);
  }
  GetAll() {
    return this.ioi;
  }
}
exports.HudEntitySet = HudEntitySet;
//# sourceMappingURL=HudEntitySet.js.map
