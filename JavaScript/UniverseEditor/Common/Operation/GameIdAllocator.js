"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.entityIdAllocator =
    exports.GameIdAllocator =
    exports.MAX_GAME_GEN_ID =
    exports.MIN_GAME_GEN_ID =
      void 0);
const File_1 = require("../Misc/File"),
  Log_1 = require("../Misc/Log"),
  Util_1 = require("../Misc/Util"),
  defaultSnapshot =
    ((exports.MIN_GAME_GEN_ID = 2147483648.5),
    (exports.MAX_GAME_GEN_ID = 4294967294),
    { LastGenId: exports.MIN_GAME_GEN_ID - 1, Ids: [] });
class GameIdAllocator {
  constructor(t) {
    (this.Ce = 0), (this.he = t), this.Reset();
  }
  static GetSavePath(t) {
    return (0, File_1.getSavePath)("Game/Generator") + `/${t}.json`;
  }
  static LoadSnapshot(t) {
    return (0, Util_1.readJsonObj)(this.GetSavePath(t), defaultSnapshot);
  }
  static SaveSnapshot(t, e) {
    (0, Util_1.writeJson)(e, this.GetSavePath(t));
  }
  static IsIdInAllocRange(t) {
    return exports.MIN_GAME_GEN_ID <= t && t <= exports.MAX_GAME_GEN_ID;
  }
  get AllocCount() {
    return this.Te?.size ?? 0;
  }
  Load() {
    var t = GameIdAllocator.LoadSnapshot(this.he);
    (this.Ce = t.LastGenId), (this.Te = new Set(t.Ids));
  }
  Save() {
    var t = { LastGenId: this.Ce, Ids: Array.from(this.Te ?? []) };
    GameIdAllocator.SaveSnapshot(this.he, t);
  }
  Reset() {
    (this.Ce = defaultSnapshot.LastGenId),
      (this.Te = new Set(defaultSnapshot.Ids));
  }
  SetLastGenId(t) {
    this.Ce = t;
  }
  Alloc() {
    for (;;)
      if (
        (this.Ce++,
        this.Ce > exports.MAX_GAME_GEN_ID &&
          (this.Ce = exports.MIN_GAME_GEN_ID),
        !this.Te?.has(this.Ce))
      ) {
        this.Te?.add(this.Ce);
        break;
      }
    return this.Ce;
  }
  Free(t) {
    if (!GameIdAllocator.IsIdInAllocRange(t))
      throw new Error(`GameIdAllocator[${this.he}] free invalid id [${t}]`);
    this.Te?.delete(t) ||
      (0, Log_1.error)(`GameIdAllocator[${this.he}] Free no exist id [${t}]`);
  }
}
(exports.GameIdAllocator = GameIdAllocator),
  (exports.entityIdAllocator = new GameIdAllocator("entity"));
//# sourceMappingURL=GameIdAllocator.js.map
