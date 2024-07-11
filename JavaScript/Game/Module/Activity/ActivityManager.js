"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityManager = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const FragmentMemoryActivityController_1 = require("../FragmentMemory/FragmentMemoryActivityController");
const ActivityBeginnerBookController_1 = require("./ActivityContent/BeginnerBook/ActivityBeginnerBookController");
const BossRushController_1 = require("./ActivityContent/BossRush/BossRushController");
const ActivityCollectionController_1 = require("./ActivityContent/Collection/ActivityCollectionController");
const ActivityDailyAdventureController_1 = require("./ActivityContent/DailyAdventure/ActivityDailyAdventureController");
const ActivityDoubleRewardController_1 = require("./ActivityContent/DoubleReward/ActivityDoubleRewardController");
const ActivityLongShanController_1 = require("./ActivityContent/LongShan/ActivityLongShanController");
const ActivityMowingController_1 = require("./ActivityContent/Mowing/ActivityMowingController");
const ActivityNoviceJourneyController_1 = require("./ActivityContent/NoviceJourney/ActivityNoviceJourneyController");
const ActivityPhantomCollectController_1 = require("./ActivityContent/PhantomCollect/ActivityPhantomCollectController");
const ActivityRoleGuideController_1 = require("./ActivityContent/RoleGuide/ActivityRoleGuideController");
const ActivityRoleTrialController_1 = require("./ActivityContent/RoleTrial/ActivityRoleTrialController");
const ActivityRogueController_1 = require("./ActivityContent/RougeActivity/ActivityRogueController");
const ActivityRunController_1 = require("./ActivityContent/Run/ActivityRunController");
const ActivitySevenDaySignController_1 = require("./ActivityContent/SevenDaySign/ActivitySevenDaySignController");
const ActivityTimePointRewardController_1 = require("./ActivityContent/TimePointReward/ActivityTimePointRewardController");
const ActivityTowerGuideController_1 = require("./ActivityContent/TowerGuide/ActivityTowerGuideController");
const ActivityTurntableController_1 = require("./ActivityContent/Turntable/ActivityTurntableController");
const ActivityUniversalController_1 = require("./ActivityContent/UniversalActivity/ActivityUniversalController");
class ActivityManager {
  constructor() {}
  static Init() {
    this.S3e();
    for (const o in Protocol_1.Aki.Protocol.gBs) {
      let t = Number(o);
      isNaN(t) ||
        (t = this.E3e.get(t)) ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Activity", 28, "没有注册活动类型", ["type", t]));
    }
    this.y3e();
  }
  static S3e() {
    this.E3e.set(
      Protocol_1.Aki.Protocol.gBs.Proto_Parkour,
      new ActivityRunController_1.ActivityRunController(),
    ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_GatherActivity,
        new ActivityCollectionController_1.ActivityCollectionController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_Sign,
        new ActivitySevenDaySignController_1.ActivitySevenDaySignController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_NewBieCourse,
        new ActivityNoviceJourneyController_1.ActivityNoviceJourneyController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_PureUIActivity,
        new ActivityUniversalController_1.ActivityUniversalController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_TowerGuide,
        new ActivityTowerGuideController_1.ActivityTowerGuideController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_WorldNewJourney,
        new ActivityBeginnerBookController_1.ActivityBeginnerBookController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_RougeActivity,
        new ActivityRogueController_1.ActivityRogueController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_RoleTrialActivity,
        new ActivityRoleTrialController_1.ActivityRoleTrialController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_Harvest,
        new ActivityMowingController_1.ActivityMowingController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_DoubleInstanceRewardActivity,
        new ActivityDoubleRewardController_1.ActivityDoubleRewardController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_NewRoleGuideActivity,
        new ActivityRoleGuideController_1.ActivityRoleGuideController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_PhantomCollect,
        new ActivityPhantomCollectController_1.ActivityPhantomCollectController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_DailyAdventureActivity,
        new ActivityDailyAdventureController_1.ActivityDailyAdventureController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_LongShanMainActivity,
        new ActivityLongShanController_1.ActivityLongShanController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_BossRushActivity,
        new BossRushController_1.BossRushController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_TurnTableActivity,
        new ActivityTurntableController_1.ActivityTurntableController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_TimePointRewardActivity,
        new ActivityTimePointRewardController_1.ActivityTimePointRewardController(),
      ),
      this.E3e.set(
        Protocol_1.Aki.Protocol.gBs.Proto_PhotoMemoryActivity,
        new FragmentMemoryActivityController_1.FragmentMemoryActivityController(),
      );
  }
  static y3e() {
    this.E3e.forEach((t, o) => {
      t.Init();
    });
  }
  static GetActivityController(t) {
    return this.E3e.get(t);
  }
  static IsOpeningActivityView() {
    let o = !1;
    const i = Array.from(this.E3e.values());
    const e = i.length;
    for (let t = 0; t < e; t++)
      if (i[t].GetIsOpeningActivityRelativeView()) {
        o = !0;
        break;
      }
    return o;
  }
  static Clear() {
    this.E3e.forEach((t, o) => {
      t.Clear();
    }),
      this.E3e.clear();
  }
}
(exports.ActivityManager = ActivityManager).E3e = new Map();
// # sourceMappingURL=ActivityManager.js.map
