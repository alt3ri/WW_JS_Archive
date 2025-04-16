"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerDeTermMutex = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BabelTowerDeTermMutex {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get MutexDeTermGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.mutexdetermgroupLength(),
      this.mutexdetermgroup,
      this,
    );
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsBabelTowerDeTermMutex(t, e) {
    return (e || new BabelTowerDeTermMutex()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetMutexdetermgroupAt(t) {
    return this.mutexdetermgroup(t);
  }
  mutexdetermgroup(t) {
    var e = this.J7.__offset(this.z7, 6);
    return e ? this.J7.readInt32(this.J7.__vector(this.z7 + e) + 4 * t) : 0;
  }
  mutexdetermgroupLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  mutexdetermgroupArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.BabelTowerDeTermMutex = BabelTowerDeTermMutex;
//# sourceMappingURL=BabelTowerDeTermMutex.js.map
