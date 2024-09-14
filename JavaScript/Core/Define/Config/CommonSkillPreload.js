"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonSkillPreload = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class CommonSkillPreload {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get IsCommon() {
    return this.iscommon();
  }
  get HasMontagePath() {
    return this.hasmontagepath();
  }
  get ActorClass() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.actorclassLength(),
      this.actorclass,
      this,
    );
  }
  get Animations() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.animationsLength(),
      this.animations,
      this,
    );
  }
  get Effects() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.effectsLength(),
      this.effects,
      this,
    );
  }
  get Audios() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.audiosLength(),
      this.audios,
      this,
    );
  }
  get Meshes() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.meshesLength(),
      this.meshes,
      this,
    );
  }
  get Materials() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.materialsLength(),
      this.materials,
      this,
    );
  }
  get AnimationBlueprints() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.animationblueprintsLength(),
      this.animationblueprints,
      this,
    );
  }
  get Others() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.othersLength(),
      this.others,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsCommonSkillPreload(t, s) {
    return (s || new CommonSkillPreload()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  iscommon() {
    var t = this.J7.__offset(this.z7, 6);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  hasmontagepath() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetActorclassAt(t) {
    return this.actorclass(t);
  }
  actorclass(t, s) {
    var i = this.J7.__offset(this.z7, 10);
    return i
      ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
      : null;
  }
  actorclassLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetAnimationsAt(t) {
    return this.animations(t);
  }
  animations(t, s) {
    var i = this.J7.__offset(this.z7, 12);
    return i
      ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
      : null;
  }
  animationsLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetEffectsAt(t) {
    return this.effects(t);
  }
  effects(t, s) {
    var i = this.J7.__offset(this.z7, 14);
    return i
      ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
      : null;
  }
  effectsLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetAudiosAt(t) {
    return this.audios(t);
  }
  audios(t, s) {
    var i = this.J7.__offset(this.z7, 16);
    return i
      ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
      : null;
  }
  audiosLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetMeshesAt(t) {
    return this.meshes(t);
  }
  meshes(t, s) {
    var i = this.J7.__offset(this.z7, 18);
    return i
      ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
      : null;
  }
  meshesLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetMaterialsAt(t) {
    return this.materials(t);
  }
  materials(t, s) {
    var i = this.J7.__offset(this.z7, 20);
    return i
      ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
      : null;
  }
  materialsLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetAnimationblueprintsAt(t) {
    return this.animationblueprints(t);
  }
  animationblueprints(t, s) {
    var i = this.J7.__offset(this.z7, 22);
    return i
      ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
      : null;
  }
  animationblueprintsLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetOthersAt(t) {
    return this.others(t);
  }
  others(t, s) {
    var i = this.J7.__offset(this.z7, 24);
    return i
      ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
      : null;
  }
  othersLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.CommonSkillPreload = CommonSkillPreload;
//# sourceMappingURL=CommonSkillPreload.js.map
