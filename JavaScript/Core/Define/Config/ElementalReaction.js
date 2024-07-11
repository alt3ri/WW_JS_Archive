"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ElementalReaction = void 0);
class ElementalReaction {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ReactionId() {
    return this.reactionid();
  }
  get ReactionName() {
    return this.reactionname();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get ReactionTexturePath() {
    return this.reactiontexturepath();
  }
  get ReactionColor() {
    return this.reactioncolor();
  }
  get IsVisible() {
    return this.isvisible();
  }
  get ReactionDescription() {
    return this.reactiondescription();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsElementalReaction(t, i) {
    return (i || new ElementalReaction()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  reactionid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  reactionname(t) {
    const i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  sortindex() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  reactiontexturepath(t) {
    const i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  reactioncolor(t) {
    const i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  isvisible() {
    const t = this.J7.__offset(this.z7, 16);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  reactiondescription(t) {
    const i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
}
exports.ElementalReaction = ElementalReaction;
// # sourceMappingURL=ElementalReaction.js.map
