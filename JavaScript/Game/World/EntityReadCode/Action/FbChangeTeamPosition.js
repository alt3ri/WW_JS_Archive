"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeTeamPosition = void 0);
class FbChangeTeamPosition {
  constructor(t) {
    (this.FbDataInternal = t), (this._0h = !1), (this.c0h = 0);
  }
  static Create(t) {
    if (t) return new FbChangeTeamPosition(t);
  }
  get PositionId() {
    return (
      this._0h ||
        ((this._0h = !0), (this.c0h = this.FbDataInternal.positionId())),
      this.c0h
    );
  }
}
exports.FbChangeTeamPosition = FbChangeTeamPosition;
//# sourceMappingURL=FbChangeTeamPosition.js.map
