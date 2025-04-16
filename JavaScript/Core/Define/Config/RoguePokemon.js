"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguePokemon = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RoguePokemon {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get PhantomItem() {
    return this.phantomitem();
  }
  get Quality() {
    return this.quality();
  }
  get PokemonIcon() {
    return this.pokemonicon();
  }
  get PokemonName() {
    return this.pokemonname();
  }
  get PokemonSettleIcon() {
    return this.pokemonsettleicon();
  }
  get PokemonSkillDesc() {
    return this.pokemonskilldesc();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRoguePokemon(t, e) {
    return (e || new RoguePokemon()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  phantomitem() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  quality() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  pokemonicon(t) {
    var e = this.J7.__offset(this.z7, 10),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  pokemonname(t) {
    var e = this.J7.__offset(this.z7, 12),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  pokemonsettleicon(t) {
    var e = this.J7.__offset(this.z7, 14),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  pokemonskilldesc(t) {
    var e = this.J7.__offset(this.z7, 16),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.RoguePokemon = RoguePokemon;
//# sourceMappingURL=RoguePokemon.js.map
