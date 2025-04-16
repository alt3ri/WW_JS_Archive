"use strict";
function checkBuffInSpecialList(e) {
  if (exports.specialIgnoreBuff.includes(e)) return !0;
  if (exports.specialIgnoreGaBuff.includes(e)) return !0;
  let t = Object.values(exports.gameplayAbilityVisionBuffId);
  return !!t.includes(e) || !!(t = Object.values(exports.buffId)).includes(e);
}
function checkBulletInSpecialList(e) {
  return !!exports.specialIgnoreBullet.includes(e);
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.checkBulletInSpecialList =
    exports.specialIgnoreBullet =
    exports.specialBulletToSkillIdMap =
    exports.checkBuffInSpecialList =
    exports.specialSkillToBuffsMap =
    exports.specialIgnoreBuff =
    exports.specialIgnoreGaBuff =
    exports.specialBuffToSkillIdMap =
    exports.gameplayAbilityVisionBuffId =
    exports.buffId =
      void 0),
  (exports.buffId = {
    AfterDrownRecoverStrength: 1105,
    OverrideLifeToZero: 1108,
    SprintCost: 1201,
    FastClimbCost: 1205,
    GlideCost: 1206,
    DrownPunishment: 1208,
    GlideCoolDown: 1212,
    AirStrengthDecreaseRetain: 3009,
    AirStrengthRecoverForbidden: 3010,
    WaterClimbStrengthForbidden: 3011,
    SkillStrengthForbidden: 3015,
    WeakTimeCommon: 3022,
    EmptyStrengthPunish: 3023,
    ToughRecoverDelay: 3024,
    MultiQteGuide: 3025,
    ConsumeQte: 3026,
    ElementClean: 3027,
    ActivateMultiQte: 3028,
    ActivateQte: 3029,
    WaitRemoveQteInvincible: 3030,
    CounterInvincibleCommon: 3036,
    StoryInvincibleCommon: 3037,
    Invisible: 3072,
    FallImmune: 3098,
    GoBattleInvincible: 3051,
    GoDown: 1101006002,
    VisionControl: 9100000020002,
    QteAssistCd: 900000000012,
    ElevatorBuff: 640003011,
    IgnoreHateBuff: 1103100015,
    StealthIgnoreHateBuff: 70000049,
    ChangeRoleBuff: 70000049,
    ManipulateInteractBuffId: 640003012,
    ManipulateInteractBuffIdMaleX: 640003013,
    HardLockCompensateBuff: 1001006001,
  }),
  (exports.gameplayAbilityVisionBuffId = {
    RoleSummonBuffId: 1900000014,
    VisionSummonBuffId: 1900000015,
    VisionAppearBuffId: 1900000017,
  }),
  (exports.specialBuffToSkillIdMap = new Map([
    [1202002005, 120261],
    [1103200007, 11030012],
    [1404500003, 1404200],
    [1404500007, 1404307],
    [1403032004, 1403030],
    [1403020061, 1403050],
  ])),
  (exports.specialIgnoreGaBuff = [1404500005, 1103200005]),
  (exports.specialIgnoreBuff = [
    5003001003, 1204, 1211, 1210, 1209, 3124, 1403081001, 640003009, 640003010,
    1101009002, 80014011, 621030203, 621030207, 80003009, 80003002, 70000003,
    5008001002,
  ]),
  (exports.specialSkillToBuffsMap = new Map([
    [
      1407200,
      [
        1407300201, 1407300202, 1407300203, 1407300301, 1407300302, 1407300303,
        1407300401, 1407300402, 1407300403,
      ],
    ],
  ])),
  (exports.checkBuffInSpecialList = checkBuffInSpecialList),
  (exports.specialBulletToSkillIdMap = new Map([
    ["77042000004", 77042034],
    ["1103000013", 1103e4],
    ["1104015010", 1104017],
    ["1403021001", 1403012],
    ["28000701", 280007050],
    ["28000702", 280007051],
  ])),
  (exports.specialIgnoreBullet = ["4000000003", "210000004", "80004012001"]),
  (exports.checkBulletInSpecialList = checkBulletInSpecialList);
//# sourceMappingURL=CharacterBuffIds.js.map
