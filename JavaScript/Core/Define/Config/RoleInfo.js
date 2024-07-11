"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class RoleInfo {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get QualityId() {
    return this.qualityid();
  }
  get RoleType() {
    return this.roletype();
  }
  get IsTrial() {
    return this.istrial();
  }
  get Name() {
    return this.name();
  }
  get NickName() {
    return this.nickname();
  }
  get Introduction() {
    return this.introduction();
  }
  get Tag() {
    return GameUtils_1.GameUtils.ConvertToArray(this.tagLength(), (t) =>
      this.tag(t),
    );
  }
  get ParentId() {
    return this.parentid();
  }
  get Priority() {
    return this.priority();
  }
  get PropertyId() {
    return this.propertyid();
  }
  get ShowProperty() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.showpropertyLength(),
      (t) => this.showproperty(t),
    );
  }
  get ElementId() {
    return this.elementid();
  }
  get RoleHeadIconCircle() {
    return this.roleheadiconcircle();
  }
  get RoleHeadIconLarge() {
    return this.roleheadiconlarge();
  }
  get RoleHeadIconBig() {
    return this.roleheadiconbig();
  }
  get Card() {
    return this.card();
  }
  get RoleHeadIcon() {
    return this.roleheadicon();
  }
  get FormationRoleCard() {
    return this.formationrolecard();
  }
  get RoleStand() {
    return this.rolestand();
  }
  get RolePortrait() {
    return this.roleportrait();
  }
  get SpilloverItem() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.spilloveritemLength(),
      (t) => this.spilloveritem(t)?.key(),
      (t) => this.spilloveritem(t)?.value(),
    );
  }
  get MeshId() {
    return this.meshid();
  }
  get UiMeshId() {
    return this.uimeshid();
  }
  get RoleBody() {
    return this.rolebody();
  }
  get BreachModel() {
    return this.breachmodel();
  }
  get SpecialEnergyBarId() {
    return this.specialenergybarid();
  }
  get CameraConfig() {
    return this.cameraconfig();
  }
  get CameraFloatHeight() {
    return this.camerafloatheight();
  }
  get EntityProperty() {
    return this.entityproperty();
  }
  get MaxLevel() {
    return this.maxlevel();
  }
  get LevelConsumeId() {
    return this.levelconsumeid();
  }
  get BreachId() {
    return this.breachid();
  }
  get SkillId() {
    return this.skillid();
  }
  get SkillTreeGroupId() {
    return this.skilltreegroupid();
  }
  get ResonanceId() {
    return this.resonanceid();
  }
  get ResonantChainGroupId() {
    return this.resonantchaingroupid();
  }
  get IsShow() {
    return this.isshow();
  }
  get ExchangeConsume() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.exchangeconsumeLength(),
      (t) => this.exchangeconsume(t)?.key(),
      (t) => this.exchangeconsume(t)?.value(),
    );
  }
  get InitWeaponItemId() {
    return this.initweaponitemid();
  }
  get WeaponType() {
    return this.weapontype();
  }
  get SkillDAPath() {
    return this.skilldapath();
  }
  get SkillLockDAPath() {
    return this.skilllockdapath();
  }
  get UiScenePerformanceABP() {
    return this.uisceneperformanceabp();
  }
  get LockOnDefaultId() {
    return this.lockondefaultid();
  }
  get LockOnLookOnId() {
    return this.lockonlookonid();
  }
  get SkillEffectDA() {
    return this.skilleffectda();
  }
  get FootStepState() {
    return this.footstepstate();
  }
  get PartyId() {
    return this.partyid();
  }
  get AttributesDescription() {
    return this.attributesdescription();
  }
  get Icon() {
    return this.icon();
  }
  get ItemQualityId() {
    return this.itemqualityid();
  }
  get ObtainedShowDescription() {
    return this.obtainedshowdescription();
  }
  get NumLimit() {
    return this.numlimit();
  }
  get ShowInBag() {
    return this.showinbag();
  }
  get WeaponScale() {
    return GameUtils_1.GameUtils.ConvertToArray(this.weaponscaleLength(), (t) =>
      this.weaponscale(t),
    );
  }
  get Intervene() {
    return this.intervene();
  }
  get CharacterVoice() {
    return this.charactervoice();
  }
  get TrialRole() {
    return this.trialrole();
  }
  get IsAim() {
    return this.isaim();
  }
  get RoleGuide() {
    return this.roleguide();
  }
  get RedDotDisableRule() {
    return this.reddotdisablerule();
  }
  get SkinDamage() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skindamageLength(), (t) =>
      this.skindamage(t),
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRoleInfo(t, i) {
    return (i || new RoleInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  qualityid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roletype() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  istrial() {
    const t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  name(t) {
    const i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  nickname(t) {
    const i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  introduction(t) {
    const i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetTagAt(t) {
    return this.tag(t);
  }
  tag(t) {
    const i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  tagLength() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  tagArray() {
    const t = this.J7.__offset(this.z7, 18);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  parentid() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  priority() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  propertyid() {
    const t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetShowpropertyAt(t) {
    return this.showproperty(t);
  }
  showproperty(t) {
    const i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  showpropertyLength() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  showpropertyArray() {
    const t = this.J7.__offset(this.z7, 26);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  elementid() {
    const t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roleheadiconcircle(t) {
    const i = this.J7.__offset(this.z7, 30);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  roleheadiconlarge(t) {
    const i = this.J7.__offset(this.z7, 32);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  roleheadiconbig(t) {
    const i = this.J7.__offset(this.z7, 34);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  card(t) {
    const i = this.J7.__offset(this.z7, 36);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  roleheadicon(t) {
    const i = this.J7.__offset(this.z7, 38);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  formationrolecard(t) {
    const i = this.J7.__offset(this.z7, 40);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  rolestand(t) {
    const i = this.J7.__offset(this.z7, 42);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  roleportrait(t) {
    const i = this.J7.__offset(this.z7, 44);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetSpilloveritemAt(t, i) {
    return this.spilloveritem(t);
  }
  spilloveritem(t, i) {
    const r = this.J7.__offset(this.z7, 46);
    return r
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  spilloveritemLength() {
    const t = this.J7.__offset(this.z7, 46);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  meshid() {
    const t = this.J7.__offset(this.z7, 48);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  uimeshid() {
    const t = this.J7.__offset(this.z7, 50);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rolebody(t) {
    const i = this.J7.__offset(this.z7, 52);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  breachmodel() {
    const t = this.J7.__offset(this.z7, 54);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  specialenergybarid() {
    const t = this.J7.__offset(this.z7, 56);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  cameraconfig(t) {
    const i = this.J7.__offset(this.z7, 58);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  camerafloatheight() {
    const t = this.J7.__offset(this.z7, 60);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  entityproperty() {
    const t = this.J7.__offset(this.z7, 62);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxlevel() {
    const t = this.J7.__offset(this.z7, 64);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  levelconsumeid() {
    const t = this.J7.__offset(this.z7, 66);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  breachid() {
    const t = this.J7.__offset(this.z7, 68);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skillid() {
    const t = this.J7.__offset(this.z7, 70);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skilltreegroupid() {
    const t = this.J7.__offset(this.z7, 72);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  resonanceid() {
    const t = this.J7.__offset(this.z7, 74);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  resonantchaingroupid() {
    const t = this.J7.__offset(this.z7, 76);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  isshow() {
    const t = this.J7.__offset(this.z7, 78);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  GetExchangeconsumeAt(t, i) {
    return this.exchangeconsume(t);
  }
  exchangeconsume(t, i) {
    const r = this.J7.__offset(this.z7, 80);
    return r
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  exchangeconsumeLength() {
    const t = this.J7.__offset(this.z7, 80);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  initweaponitemid() {
    const t = this.J7.__offset(this.z7, 82);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  weapontype() {
    const t = this.J7.__offset(this.z7, 84);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skilldapath(t) {
    const i = this.J7.__offset(this.z7, 86);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  skilllockdapath(t) {
    const i = this.J7.__offset(this.z7, 88);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  uisceneperformanceabp(t) {
    const i = this.J7.__offset(this.z7, 90);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  lockondefaultid() {
    const t = this.J7.__offset(this.z7, 92);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  lockonlookonid() {
    const t = this.J7.__offset(this.z7, 94);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skilleffectda(t) {
    const i = this.J7.__offset(this.z7, 96);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  footstepstate(t) {
    const i = this.J7.__offset(this.z7, 98);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  partyid() {
    const t = this.J7.__offset(this.z7, 100);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  attributesdescription(t) {
    const i = this.J7.__offset(this.z7, 102);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  icon(t) {
    const i = this.J7.__offset(this.z7, 104);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  itemqualityid() {
    const t = this.J7.__offset(this.z7, 106);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  obtainedshowdescription(t) {
    const i = this.J7.__offset(this.z7, 108);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  numlimit() {
    const t = this.J7.__offset(this.z7, 110);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  showinbag() {
    const t = this.J7.__offset(this.z7, 112);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  GetWeaponscaleAt(t) {
    return this.weaponscale(t);
  }
  weaponscale(t) {
    const i = this.J7.__offset(this.z7, 114);
    return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  weaponscaleLength() {
    const t = this.J7.__offset(this.z7, 114);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  weaponscaleArray() {
    const t = this.J7.__offset(this.z7, 114);
    return t
      ? new Float32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  intervene() {
    const t = this.J7.__offset(this.z7, 116);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  charactervoice(t) {
    const i = this.J7.__offset(this.z7, 118);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  trialrole() {
    const t = this.J7.__offset(this.z7, 120);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  isaim() {
    const t = this.J7.__offset(this.z7, 122);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  roleguide() {
    const t = this.J7.__offset(this.z7, 124);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  reddotdisablerule() {
    const t = this.J7.__offset(this.z7, 126);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetSkindamageAt(t) {
    return this.skindamage(t);
  }
  skindamage(t, i) {
    const r = this.J7.__offset(this.z7, 128);
    return r
      ? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
      : null;
  }
  skindamageLength() {
    const t = this.J7.__offset(this.z7, 128);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.RoleInfo = RoleInfo;
// # sourceMappingURL=RoleInfo.js.map
