"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FeedingAnimal = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class FeedingAnimal {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ItemIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.itemidsLength(), (t) =>
      this.itemids(t),
    );
  }
  get GameplayTags() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.gameplaytagsLength(),
      (t) => this.gameplaytags(t),
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFeedingAnimal(t, i) {
    return (i || new FeedingAnimal()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetItemidsAt(t) {
    return this.itemids(t);
  }
  itemids(t) {
    const i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  itemidsLength() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  itemidsArray() {
    const t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetGameplaytagsAt(t) {
    return this.gameplaytags(t);
  }
  gameplaytags(t, i) {
    const s = this.J7.__offset(this.z7, 8);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  gameplaytagsLength() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.FeedingAnimal = FeedingAnimal;
// # sourceMappingURL=FeedingAnimal.js.map
