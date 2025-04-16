"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbConveyorBeltState = void 0);
const UnionConveyorBeltFieldTypeHelper_1 = require("./UnionConveyorBeltFieldTypeHelper"),
  UnionConveyorBeltMoveTypeHelper_1 = require("./UnionConveyorBeltMoveTypeHelper");
class FbConveyorBeltState {
  constructor(e) {
    (this.FbDataInternal = e),
      (this._vh = !1),
      (this.cvh = void 0),
      (this.PWh = !1),
      (this.UWh = void 0),
      (this._dh = !1),
      (this.cdh = void 0);
  }
  static Create(e) {
    if (e) return new FbConveyorBeltState(e);
  }
  get EntityState() {
    return (
      this._vh ||
        ((this._vh = !0), (this.cvh = this.FbDataInternal.entityState())),
      this.cvh
    );
  }
  get FieldType() {
    var e, t;
    return (
      !this.PWh &&
        ((this.PWh = !0),
        (e = this.FbDataInternal.fieldTypeType()),
        (t =
          UnionConveyorBeltFieldTypeHelper_1.UnionConveyorBeltFieldTypeHelper.GetUnionConveyorBeltFieldTypeObject(
            e,
          ))) &&
        (this.UWh =
          UnionConveyorBeltFieldTypeHelper_1.UnionConveyorBeltFieldTypeHelper.ReadUnionConveyorBeltFieldType(
            e,
            this.FbDataInternal.fieldType(t),
          )),
      this.UWh
    );
  }
  get MoveType() {
    var e, t;
    return (
      !this._dh &&
        ((this._dh = !0),
        (e = this.FbDataInternal.moveTypeType()),
        (t =
          UnionConveyorBeltMoveTypeHelper_1.UnionConveyorBeltMoveTypeHelper.GetUnionConveyorBeltMoveTypeObject(
            e,
          ))) &&
        (this.cdh =
          UnionConveyorBeltMoveTypeHelper_1.UnionConveyorBeltMoveTypeHelper.ReadUnionConveyorBeltMoveType(
            e,
            this.FbDataInternal.moveType(t),
          )),
      this.cdh
    );
  }
}
exports.FbConveyorBeltState = FbConveyorBeltState;
//# sourceMappingURL=FbConveyorBeltState.js.map
