"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkin = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleSkin {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get RoleId() {
    return this.roleid();
  }
  get SuitWeaponSkinId() {
    return this.suitweaponskinid();
  }
  get HeadId() {
    return this.headid();
  }
  get QualityId() {
    return this.qualityid();
  }
  get Name() {
    return this.name();
  }
  get TitleName() {
    return this.titlename();
  }
  get SubDecName() {
    return this.subdecname();
  }
  get TypeDescription() {
    return this.typedescription();
  }
  get AttributesDescription() {
    return this.attributesdescription();
  }
  get BgDescription() {
    return this.bgdescription();
  }
  get IconMiddle() {
    return this.iconmiddle();
  }
  get IconSmall() {
    return this.iconsmall();
  }
  get ItemAccess() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.itemaccessLength(),
      this.itemaccess,
      this,
    );
  }
  get SortIndex() {
    return this.sortindex();
  }
  get RedDotDisableRule() {
    return this.reddotdisablerule();
  }
  get ShowInBag() {
    return this.showinbag();
  }
  get ObtainedShowDescription() {
    return this.obtainedshowdescription();
  }
  get Icon() {
    return this.icon();
  }
  get FunctionDesc() {
    return this.functiondesc();
  }
  get FirstObtainDesc() {
    return this.firstobtaindesc();
  }
  get Quality() {
    return this.quality();
  }
  get Tag() {
    return this.tag();
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
  get PreviewRoleCard() {
    return this.previewrolecard();
  }
  get BuyShopPreviewRoleCard() {
    return this.buyshoppreviewrolecard();
  }
  get FormationRoleCard() {
    return this.formationrolecard();
  }
  get RoleStand() {
    return this.rolestand();
  }
  get SuitWeaponSkinColor() {
    return this.suitweaponskincolor();
  }
  get RoleObtainColor1() {
    return this.roleobtaincolor1();
  }
  get RoleObtainColor2() {
    return this.roleobtaincolor2();
  }
  get RolePortrait() {
    return this.roleportrait();
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
  get UiScenePerformanceABP() {
    return this.uisceneperformanceabp();
  }
  get FootStepState() {
    return this.footstepstate();
  }
  get PayShopPreviewRoleTexturePath() {
    return this.payshoppreviewroletexturepath();
  }
  get PayShopPreviewRoleTextureBgPath() {
    return this.payshoppreviewroletexturebgpath();
  }
  get PayShopPreviewWeaponTexturePath() {
    return this.payshoppreviewweapontexturepath();
  }
  get PayShopPreviewBuyRoleTexturePath() {
    return this.payshoppreviewbuyroletexturepath();
  }
  get PayShopPreviewBuyRoleSuitWeaponTexturePath() {
    return this.payshoppreviewbuyrolesuitweapontexturepath();
  }
  get ShareTexturePath() {
    return this.sharetexturepath();
  }
  get SpineSkeletonData() {
    return this.spineskeletondata();
  }
  get SmallSpineAtlas() {
    return this.smallspineatlas();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRoleSkin(t, i) {
    return (i || new RoleSkin()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  suitweaponskinid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  headid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  qualityid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  titlename(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  subdecname(t) {
    var i = this.J7.__offset(this.z7, 18),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  typedescription(t) {
    var i = this.J7.__offset(this.z7, 20),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  attributesdescription(t) {
    var i = this.J7.__offset(this.z7, 22),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  bgdescription(t) {
    var i = this.J7.__offset(this.z7, 24),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  iconmiddle(t) {
    var i = this.J7.__offset(this.z7, 26),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  iconsmall(t) {
    var i = this.J7.__offset(this.z7, 28),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetItemaccessAt(t) {
    return this.itemaccess(t);
  }
  itemaccess(t) {
    var i = this.J7.__offset(this.z7, 30);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  itemaccessLength() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  itemaccessArray() {
    var t = this.J7.__offset(this.z7, 30);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  reddotdisablerule() {
    var t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  showinbag() {
    var t = this.J7.__offset(this.z7, 36);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  obtainedshowdescription(t) {
    var i = this.J7.__offset(this.z7, 38),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 40),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  functiondesc(t) {
    var i = this.J7.__offset(this.z7, 42),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  firstobtaindesc(t) {
    var i = this.J7.__offset(this.z7, 44),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  quality() {
    var t = this.J7.__offset(this.z7, 46);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tag(t) {
    var i = this.J7.__offset(this.z7, 48),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  roleheadiconcircle(t) {
    var i = this.J7.__offset(this.z7, 50),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  roleheadiconlarge(t) {
    var i = this.J7.__offset(this.z7, 52),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  roleheadiconbig(t) {
    var i = this.J7.__offset(this.z7, 54),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  card(t) {
    var i = this.J7.__offset(this.z7, 56),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  roleheadicon(t) {
    var i = this.J7.__offset(this.z7, 58),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  previewrolecard(t) {
    var i = this.J7.__offset(this.z7, 60),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  buyshoppreviewrolecard(t) {
    var i = this.J7.__offset(this.z7, 62),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  formationrolecard(t) {
    var i = this.J7.__offset(this.z7, 64),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  rolestand(t) {
    var i = this.J7.__offset(this.z7, 66),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  suitweaponskincolor(t) {
    var i = this.J7.__offset(this.z7, 68),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  roleobtaincolor1(t) {
    var i = this.J7.__offset(this.z7, 70),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  roleobtaincolor2(t) {
    var i = this.J7.__offset(this.z7, 72),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  roleportrait(t) {
    var i = this.J7.__offset(this.z7, 74),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  meshid() {
    var t = this.J7.__offset(this.z7, 76);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  uimeshid() {
    var t = this.J7.__offset(this.z7, 78);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rolebody(t) {
    var i = this.J7.__offset(this.z7, 80),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  uisceneperformanceabp(t) {
    var i = this.J7.__offset(this.z7, 82),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  footstepstate(t) {
    var i = this.J7.__offset(this.z7, 84),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  payshoppreviewroletexturepath(t) {
    var i = this.J7.__offset(this.z7, 86),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  payshoppreviewroletexturebgpath(t) {
    var i = this.J7.__offset(this.z7, 88),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  payshoppreviewweapontexturepath(t) {
    var i = this.J7.__offset(this.z7, 90),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  payshoppreviewbuyroletexturepath(t) {
    var i = this.J7.__offset(this.z7, 92),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  payshoppreviewbuyrolesuitweapontexturepath(t) {
    var i = this.J7.__offset(this.z7, 94),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  sharetexturepath(t) {
    var i = this.J7.__offset(this.z7, 96),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  spineskeletondata(t) {
    var i = this.J7.__offset(this.z7, 98),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  smallspineatlas(t) {
    var i = this.J7.__offset(this.z7, 100),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.RoleSkin = RoleSkin;
//# sourceMappingURL=RoleSkin.js.map
