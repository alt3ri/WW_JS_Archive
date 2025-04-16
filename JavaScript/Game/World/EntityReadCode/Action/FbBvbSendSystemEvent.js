"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBvbSendSystemEvent = void 0);
const UnionBvbEventDataHelper_1 = require("../Common/UnionBvbEventDataHelper");
class FbBvbSendSystemEvent {
  constructor(t) {
    (this.FbDataInternal = t), (this.k01 = !1), (this.O01 = void 0);
  }
  static Create(t) {
    if (t) return new FbBvbSendSystemEvent(t);
  }
  get EventData() {
    var t, e;
    return (
      !this.k01 &&
        ((this.k01 = !0),
        (t = this.FbDataInternal.eventDataType()),
        (e =
          UnionBvbEventDataHelper_1.UnionBvbEventDataHelper.GetUnionBvbEventDataObject(
            t,
          ))) &&
        (this.O01 =
          UnionBvbEventDataHelper_1.UnionBvbEventDataHelper.ReadUnionBvbEventData(
            t,
            this.FbDataInternal.eventData(e),
          )),
      this.O01
    );
  }
}
exports.FbBvbSendSystemEvent = FbBvbSendSystemEvent;
//# sourceMappingURL=FbBvbSendSystemEvent.js.map
