"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRecordDungeonEvent = void 0);
const UnionDungeonEventTypeHelper_1 = require("./UnionDungeonEventTypeHelper");
class FbRecordDungeonEvent {
  constructor(e) {
    (this.FbDataInternal = e), (this.BEh = !1), (this.qEh = void 0);
  }
  static Create(e) {
    if (e) return new FbRecordDungeonEvent(e);
  }
  get EventConfig() {
    var e, n;
    return (
      !this.BEh &&
        ((this.BEh = !0),
        (e = this.FbDataInternal.eventConfigType()),
        (n =
          UnionDungeonEventTypeHelper_1.UnionDungeonEventTypeHelper.GetUnionDungeonEventTypeObject(
            e,
          ))) &&
        (this.qEh =
          UnionDungeonEventTypeHelper_1.UnionDungeonEventTypeHelper.ReadUnionDungeonEventType(
            e,
            this.FbDataInternal.eventConfig(n),
          )),
      this.qEh
    );
  }
}
exports.FbRecordDungeonEvent = FbRecordDungeonEvent;
//# sourceMappingURL=FbRecordDungeonEvent.js.map
