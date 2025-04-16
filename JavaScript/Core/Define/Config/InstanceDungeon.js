"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeon = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt"),
  DicIntString_1 = require("./SubType/DicIntString"),
  DungeonEntrance_1 = require("./SubType/DungeonEntrance"),
  InstOnlineType_1 = require("./SubType/InstOnlineType");
class InstanceDungeon {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get MapConfigId() {
    return this.mapconfigid();
  }
  get MapName() {
    return this.mapname();
  }
  get InstType() {
    return this.insttype();
  }
  get InstSubType() {
    return this.instsubtype();
  }
  get WorldDungeonSubType() {
    return this.worlddungeonsubtype();
  }
  get OnlineType() {
    return this.onlinetype();
  }
  get CustomTypes() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.customtypesLength(),
      this.customtypes,
      this,
    );
  }
  get MiniMapId() {
    return this.minimapid();
  }
  get SubLevels() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.sublevelsLength(),
      this.sublevels,
      this,
    );
  }
  get FightFormationId() {
    return this.fightformationid();
  }
  get RoleTypeList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.roletypelistLength(),
      this.roletypelist,
      this,
    );
  }
  get TrialRoleInfo() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.trialroleinfoLength(),
      this.trialroleinfo,
      this,
    );
  }
  get TrialRoleFormation() {
    return this.trialroleformation();
  }
  get ReviveId() {
    return this.reviveid();
  }
  get BornPosition() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bornpositionLength(),
      this.bornposition,
      this,
    );
  }
  get BornRotation() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bornrotationLength(),
      this.bornrotation,
      this,
    );
  }
  get RecoverWorldLocation() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.recoverworldlocationLength(),
      this.recoverworldlocation,
      this,
    );
  }
  get ExitDungeonConfirmId() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.exitdungeonconfirmidLength(),
      this.exitdungeonconfirmid,
      this,
    );
  }
  get EntranceEntities() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.entranceentitiesLength(),
      this.entranceentities,
      this,
    );
  }
  get ExitEntities() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.exitentitiesLength(),
      this.exitentities,
      this,
    );
  }
  get DungeonDesc() {
    return this.dungeondesc();
  }
  get Title() {
    return this.title();
  }
  get BannerPath() {
    return this.bannerpath();
  }
  get MonsterPreview() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.monsterpreviewLength(),
      this.monsterpreview,
      this,
    );
  }
  get MonsterTips() {
    return this.monstertips();
  }
  get FirstRewardId() {
    return this.firstrewardid();
  }
  get RewardId() {
    return this.rewardid();
  }
  get RepeatRewardId() {
    return this.repeatrewardid();
  }
  get ExchangeRewardId() {
    return this.exchangerewardid();
  }
  get SharedTreasureGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.sharedtreasuregroupLength(),
      this.sharedtreasuregroup,
      this,
    );
  }
  get EnterControlId() {
    return this.entercontrolid();
  }
  get EnterCondition() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.enterconditionLength(),
      this.entercondition,
      this,
    );
  }
  get EnterConditionText() {
    return this.enterconditiontext();
  }
  get DifficultyIcon() {
    return this.difficultyicon();
  }
  get EntityLevel() {
    return this.entitylevel();
  }
  get RecommendLevel() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.recommendlevelLength(),
      this.recommendlevelKey,
      this.recommendlevelValue,
      this,
    );
  }
  recommendlevelKey(t) {
    return this.recommendlevel(t)?.key();
  }
  recommendlevelValue(t) {
    return this.recommendlevel(t)?.value();
  }
  get RecommendRole() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.recommendroleLength(),
      this.recommendrole,
      this,
    );
  }
  get RecommendElement() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.recommendelementLength(),
      this.recommendelement,
      this,
    );
  }
  get ShareAttri() {
    return this.shareattri();
  }
  get FightInfoDtType() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.fightinfodttypeLength(),
      this.fightinfodttype,
      this,
    );
  }
  get SaveDays() {
    return this.savedays();
  }
  get LimitViewName() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.limitviewnameLength(),
      this.limitviewname,
      this,
    );
  }
  get CanUseItem() {
    return this.canuseitem();
  }
  get GameplayMode() {
    return this.gameplaymode();
  }
  get GuideType() {
    return this.guidetype();
  }
  get GuideValue() {
    return this.guidevalue();
  }
  get SettleButtonType() {
    return this.settlebuttontype();
  }
  get SubTitle() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.subtitleLength(),
      this.subtitleKey,
      this.subtitleValue,
      this,
    );
  }
  subtitleKey(t) {
    return this.subtitle(t)?.key();
  }
  subtitleValue(t) {
    return this.subtitle(t)?.value();
  }
  get SubInstanceTitle() {
    return this.subinstancetitle();
  }
  get AutoLeaveTime() {
    return this.autoleavetime();
  }
  get LimitTime() {
    return this.limittime();
  }
  get LeaveWaitTime() {
    return this.leavewaittime();
  }
  get FailTips() {
    return this.failtips();
  }
  get VerifyCreatureGen() {
    return this.verifycreaturegen();
  }
  get DifficultyLevel() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.difficultylevelLength(),
      this.difficultylevel,
      this,
    );
  }
  get DifficultyDesc() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.difficultydescLength(),
      this.difficultydesc,
      this,
    );
  }
  get Drop() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.dropLength(),
      this.drop,
      this,
    );
  }
  get EnterCount() {
    return this.entercount();
  }
  get EnterConditionGroup() {
    return this.enterconditiongroup();
  }
  get IconTagPath() {
    return this.icontagpath();
  }
  get ViewMapId() {
    return this.viewmapid();
  }
  get RenderSettings() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.rendersettingsLength(),
      this.rendersettingsKey,
      this.rendersettingsValue,
      this,
    );
  }
  rendersettingsKey(t) {
    return this.rendersettings(t)?.key();
  }
  rendersettingsValue(t) {
    return this.rendersettings(t)?.value();
  }
  get DropVisionLimit() {
    return this.dropvisionlimit();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsInstanceDungeon(t, i) {
    return (i || new InstanceDungeon()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  mapconfigid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  mapname(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  insttype() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  instsubtype() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  worlddungeonsubtype() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  onlinetype() {
    var t = this.J7.__offset(this.z7, 16);
    return t
      ? this.J7.readInt8(this.z7 + t)
      : InstOnlineType_1.InstOnlineType.Single;
  }
  GetCustomtypesAt(t) {
    return this.customtypes(t);
  }
  customtypes(t) {
    var i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  customtypesLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  customtypesArray() {
    var t = this.J7.__offset(this.z7, 18);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  minimapid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  GetSublevelsAt(t) {
    return this.sublevels(t);
  }
  sublevels(t, i) {
    var s = this.J7.__offset(this.z7, 22),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  sublevelsLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  fightformationid() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 2;
  }
  GetRoletypelistAt(t) {
    return this.roletypelist(t);
  }
  roletypelist(t) {
    var i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  roletypelistLength() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  roletypelistArray() {
    var t = this.J7.__offset(this.z7, 26);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetTrialroleinfoAt(t) {
    return this.trialroleinfo(t);
  }
  trialroleinfo(t) {
    var i = this.J7.__offset(this.z7, 28);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  trialroleinfoLength() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  trialroleinfoArray() {
    var t = this.J7.__offset(this.z7, 28);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  trialroleformation() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  reviveid() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetBornpositionAt(t) {
    return this.bornposition(t);
  }
  bornposition(t) {
    var i = this.J7.__offset(this.z7, 34);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  bornpositionLength() {
    var t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  bornpositionArray() {
    var t = this.J7.__offset(this.z7, 34);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetBornrotationAt(t) {
    return this.bornrotation(t);
  }
  bornrotation(t) {
    var i = this.J7.__offset(this.z7, 36);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  bornrotationLength() {
    var t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  bornrotationArray() {
    var t = this.J7.__offset(this.z7, 36);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetRecoverworldlocationAt(t) {
    return this.recoverworldlocation(t);
  }
  recoverworldlocation(t) {
    var i = this.J7.__offset(this.z7, 38);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  recoverworldlocationLength() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  recoverworldlocationArray() {
    var t = this.J7.__offset(this.z7, 38);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetExitdungeonconfirmidAt(t) {
    return this.exitdungeonconfirmid(t);
  }
  exitdungeonconfirmid(t) {
    var i = this.J7.__offset(this.z7, 40);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  exitdungeonconfirmidLength() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  exitdungeonconfirmidArray() {
    var t = this.J7.__offset(this.z7, 40);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetEntranceentitiesAt(t, i) {
    return this.entranceentities(t);
  }
  entranceentities(t, i) {
    var s = this.J7.__offset(this.z7, 42);
    return s
      ? (i || new DungeonEntrance_1.DungeonEntrance()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  entranceentitiesLength() {
    var t = this.J7.__offset(this.z7, 42);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetExitentitiesAt(t) {
    return this.exitentities(t);
  }
  exitentities(t) {
    var i = this.J7.__offset(this.z7, 44);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  exitentitiesLength() {
    var t = this.J7.__offset(this.z7, 44);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  exitentitiesArray() {
    var t = this.J7.__offset(this.z7, 44);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  dungeondesc(t) {
    var i = this.J7.__offset(this.z7, 46),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  title() {
    var t = this.J7.__offset(this.z7, 48);
    return t ? this.J7.readInt32(this.z7 + t) : 999;
  }
  bannerpath(t) {
    var i = this.J7.__offset(this.z7, 50),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetMonsterpreviewAt(t) {
    return this.monsterpreview(t);
  }
  monsterpreview(t) {
    var i = this.J7.__offset(this.z7, 52);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  monsterpreviewLength() {
    var t = this.J7.__offset(this.z7, 52);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  monsterpreviewArray() {
    var t = this.J7.__offset(this.z7, 52);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  monstertips(t) {
    var i = this.J7.__offset(this.z7, 54),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  firstrewardid() {
    var t = this.J7.__offset(this.z7, 56);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rewardid() {
    var t = this.J7.__offset(this.z7, 58);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  repeatrewardid() {
    var t = this.J7.__offset(this.z7, 60);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  exchangerewardid() {
    var t = this.J7.__offset(this.z7, 62);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetSharedtreasuregroupAt(t) {
    return this.sharedtreasuregroup(t);
  }
  sharedtreasuregroup(t) {
    var i = this.J7.__offset(this.z7, 64);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  sharedtreasuregroupLength() {
    var t = this.J7.__offset(this.z7, 64);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  sharedtreasuregroupArray() {
    var t = this.J7.__offset(this.z7, 64);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  entercontrolid() {
    var t = this.J7.__offset(this.z7, 66);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetEnterconditionAt(t) {
    return this.entercondition(t);
  }
  entercondition(t) {
    var i = this.J7.__offset(this.z7, 68);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  enterconditionLength() {
    var t = this.J7.__offset(this.z7, 68);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  enterconditionArray() {
    var t = this.J7.__offset(this.z7, 68);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  enterconditiontext(t) {
    var i = this.J7.__offset(this.z7, 70),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  difficultyicon(t) {
    var i = this.J7.__offset(this.z7, 72),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  entitylevel() {
    var t = this.J7.__offset(this.z7, 74);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetRecommendlevelAt(t, i) {
    return this.recommendlevel(t);
  }
  recommendlevel(t, i) {
    var s = this.J7.__offset(this.z7, 76);
    return s
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  recommendlevelLength() {
    var t = this.J7.__offset(this.z7, 76);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetRecommendroleAt(t) {
    return this.recommendrole(t);
  }
  recommendrole(t) {
    var i = this.J7.__offset(this.z7, 78);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  recommendroleLength() {
    var t = this.J7.__offset(this.z7, 78);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  recommendroleArray() {
    var t = this.J7.__offset(this.z7, 78);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetRecommendelementAt(t) {
    return this.recommendelement(t);
  }
  recommendelement(t) {
    var i = this.J7.__offset(this.z7, 80);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  recommendelementLength() {
    var t = this.J7.__offset(this.z7, 80);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  recommendelementArray() {
    var t = this.J7.__offset(this.z7, 80);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  shareattri() {
    var t = this.J7.__offset(this.z7, 82);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  GetFightinfodttypeAt(t) {
    return this.fightinfodttype(t);
  }
  fightinfodttype(t) {
    var i = this.J7.__offset(this.z7, 84);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  fightinfodttypeLength() {
    var t = this.J7.__offset(this.z7, 84);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  fightinfodttypeArray() {
    var t = this.J7.__offset(this.z7, 84);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  savedays() {
    var t = this.J7.__offset(this.z7, 86);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetLimitviewnameAt(t) {
    return this.limitviewname(t);
  }
  limitviewname(t, i) {
    var s = this.J7.__offset(this.z7, 88),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  limitviewnameLength() {
    var t = this.J7.__offset(this.z7, 88);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  canuseitem() {
    var t = this.J7.__offset(this.z7, 90);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  gameplaymode() {
    var t = this.J7.__offset(this.z7, 92);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  guidetype() {
    var t = this.J7.__offset(this.z7, 94);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  guidevalue() {
    var t = this.J7.__offset(this.z7, 96);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  settlebuttontype() {
    var t = this.J7.__offset(this.z7, 98);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  GetSubtitleAt(t, i) {
    return this.subtitle(t);
  }
  subtitle(t, i) {
    var s = this.J7.__offset(this.z7, 100);
    return s
      ? (i || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  subtitleLength() {
    var t = this.J7.__offset(this.z7, 100);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  subinstancetitle(t) {
    var i = this.J7.__offset(this.z7, 102),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  autoleavetime() {
    var t = this.J7.__offset(this.z7, 104);
    return t ? this.J7.readInt32(this.z7 + t) : 300;
  }
  limittime() {
    var t = this.J7.__offset(this.z7, 106);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  leavewaittime() {
    var t = this.J7.__offset(this.z7, 108);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  failtips(t) {
    var i = this.J7.__offset(this.z7, 110),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  verifycreaturegen() {
    var t = this.J7.__offset(this.z7, 112);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  GetDifficultylevelAt(t) {
    return this.difficultylevel(t);
  }
  difficultylevel(t) {
    var i = this.J7.__offset(this.z7, 114);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  difficultylevelLength() {
    var t = this.J7.__offset(this.z7, 114);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  difficultylevelArray() {
    var t = this.J7.__offset(this.z7, 114);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetDifficultydescAt(t) {
    return this.difficultydesc(t);
  }
  difficultydesc(t, i) {
    var s = this.J7.__offset(this.z7, 116),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  difficultydescLength() {
    var t = this.J7.__offset(this.z7, 116);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetDropAt(t) {
    return this.drop(t);
  }
  drop(t) {
    var i = this.J7.__offset(this.z7, 118);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  dropLength() {
    var t = this.J7.__offset(this.z7, 118);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  dropArray() {
    var t = this.J7.__offset(this.z7, 118);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  entercount() {
    var t = this.J7.__offset(this.z7, 120);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  enterconditiongroup() {
    var t = this.J7.__offset(this.z7, 122);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  icontagpath(t) {
    var i = this.J7.__offset(this.z7, 124),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  viewmapid() {
    var t = this.J7.__offset(this.z7, 126);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetRendersettingsAt(t, i) {
    return this.rendersettings(t);
  }
  rendersettings(t, i) {
    var s = this.J7.__offset(this.z7, 128);
    return s
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  rendersettingsLength() {
    var t = this.J7.__offset(this.z7, 128);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  dropvisionlimit() {
    var t = this.J7.__offset(this.z7, 130);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.InstanceDungeon = InstanceDungeon;
//# sourceMappingURL=InstanceDungeon.js.map
