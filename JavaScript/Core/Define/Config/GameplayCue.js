"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCue = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const Vector_1 = require("./SubType/Vector");
class GameplayCue {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Path() {
    return this.path();
  }
  get CueType() {
    return this.cuetype();
  }
  get Comp() {
    return this.comp();
  }
  get CompName() {
    return this.compname();
  }
  get Socket() {
    return this.socket();
  }
  get Location() {
    return this.location();
  }
  get Rotation() {
    return this.rotation();
  }
  get Scale() {
    return this.scale();
  }
  get LocRule() {
    return this.locrule();
  }
  get RotaRule() {
    return this.rotarule();
  }
  get SclRule() {
    return this.sclrule();
  }
  get EndRule() {
    return this.endrule();
  }
  get Magni() {
    return this.magni();
  }
  get AttrId() {
    return this.attrid();
  }
  get Tag() {
    return this.tag();
  }
  get Max() {
    return this.max();
  }
  get Min() {
    return this.min();
  }
  get bListenAttr() {
    return this.blistenattr();
  }
  get bSoftFollow() {
    return this.bsoftfollow();
  }
  get bLockRevolution() {
    return this.blockrevolution();
  }
  get LockRotation() {
    return this.lockrotation();
  }
  get InterpSpeed() {
    return this.interpspeed();
  }
  get FarthestDistance() {
    return this.farthestdistance();
  }
  get FaultTolerance() {
    return this.faulttolerance();
  }
  get TargetScaleUp() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.targetscaleupLength(),
      (t) => this.targetscaleup(t),
    );
  }
  get Resources() {
    return GameUtils_1.GameUtils.ConvertToArray(this.resourcesLength(), (t) =>
      this.resources(t),
    );
  }
  get Parameters() {
    return GameUtils_1.GameUtils.ConvertToArray(this.parametersLength(), (t) =>
      this.parameters(t),
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsGameplayCue(t, s) {
    return (s || new GameplayCue()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt64(this.z7 + t) : BigInt("0");
  }
  path(t) {
    const s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  cuetype() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  comp() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  compname(t) {
    const s = this.J7.__offset(this.z7, 12);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  socket(t) {
    const s = this.J7.__offset(this.z7, 14);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  location(t) {
    const s = this.J7.__offset(this.z7, 16);
    return s
      ? (t || new Vector_1.Vector()).__init(
          this.J7.__indirect(this.z7 + s),
          this.J7,
        )
      : null;
  }
  rotation(t) {
    const s = this.J7.__offset(this.z7, 18);
    return s
      ? (t || new Vector_1.Vector()).__init(
          this.J7.__indirect(this.z7 + s),
          this.J7,
        )
      : null;
  }
  scale(t) {
    const s = this.J7.__offset(this.z7, 20);
    return s
      ? (t || new Vector_1.Vector()).__init(
          this.J7.__indirect(this.z7 + s),
          this.J7,
        )
      : null;
  }
  locrule() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rotarule() {
    const t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sclrule() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  endrule() {
    const t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  magni() {
    const t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  attrid() {
    const t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tag(t) {
    const s = this.J7.__offset(this.z7, 34);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  max() {
    const t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.readInt32(this.z7 + t) : 1e4;
  }
  min() {
    const t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  blistenattr() {
    const t = this.J7.__offset(this.z7, 40);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  bsoftfollow() {
    const t = this.J7.__offset(this.z7, 42);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  blockrevolution() {
    const t = this.J7.__offset(this.z7, 44);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  lockrotation(t) {
    const s = this.J7.__offset(this.z7, 46);
    return s
      ? (t || new Vector_1.Vector()).__init(
          this.J7.__indirect(this.z7 + s),
          this.J7,
        )
      : null;
  }
  interpspeed() {
    const t = this.J7.__offset(this.z7, 48);
    return t ? this.J7.readInt32(this.z7 + t) : 5;
  }
  farthestdistance() {
    const t = this.J7.__offset(this.z7, 50);
    return t ? this.J7.readInt32(this.z7 + t) : 100;
  }
  faulttolerance(t) {
    const s = this.J7.__offset(this.z7, 52);
    return s
      ? (t || new Vector_1.Vector()).__init(
          this.J7.__indirect(this.z7 + s),
          this.J7,
        )
      : null;
  }
  GetTargetscaleupAt(t) {
    return this.targetscaleup(t);
  }
  targetscaleup(t) {
    const s = this.J7.__offset(this.z7, 54);
    return s ? this.J7.readFloat32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  targetscaleupLength() {
    const t = this.J7.__offset(this.z7, 54);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  targetscaleupArray() {
    const t = this.J7.__offset(this.z7, 54);
    return t
      ? new Float32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetResourcesAt(t) {
    return this.resources(t);
  }
  resources(t, s) {
    const r = this.J7.__offset(this.z7, 56);
    return r
      ? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, s)
      : null;
  }
  resourcesLength() {
    const t = this.J7.__offset(this.z7, 56);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetParametersAt(t) {
    return this.parameters(t);
  }
  parameters(t, s) {
    const r = this.J7.__offset(this.z7, 58);
    return r
      ? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, s)
      : null;
  }
  parametersLength() {
    const t = this.J7.__offset(this.z7, 58);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.GameplayCue = GameplayCue;
// # sourceMappingURL=GameplayCue.js.map
