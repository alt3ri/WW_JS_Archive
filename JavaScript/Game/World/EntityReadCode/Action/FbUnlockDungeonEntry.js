"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbUnlockDungeonEntry = void 0);
class FbUnlockDungeonEntry {
  constructor(t) {
    (this.FbDataInternal = t), (this.RMh = !1), (this.wMh = 0);
  }
  static Create(t) {
    if (t) return new FbUnlockDungeonEntry(t);
  }
  get DungeonEntryId() {
    return (
      this.RMh ||
        ((this.RMh = !0), (this.wMh = this.FbDataInternal.dungeonEntryId())),
      this.wMh
    );
  }
}
exports.FbUnlockDungeonEntry = FbUnlockDungeonEntry;
//# sourceMappingURL=FbUnlockDungeonEntry.js.map
