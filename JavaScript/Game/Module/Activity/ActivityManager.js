"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityManager = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  FragmentMemoryActivityController_1 = require("../FragmentMemory/FragmentMemoryActivityController"),
  TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController"),
  ActivityBeginnerBookController_1 = require("./ActivityContent/BeginnerBook/ActivityBeginnerBookController"),
  BossRushController_1 = require("./ActivityContent/BossRush/BossRushController"),
  ActivityCollectionController_1 = require("./ActivityContent/Collection/ActivityCollectionController"),
  ActivityDailyAdventureController_1 = require("./ActivityContent/DailyAdventure/ActivityDailyAdventureController"),
  ActivityDoubleRewardController_1 = require("./ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  ActivityLongShanController_1 = require("./ActivityContent/LongShan/ActivityLongShanController"),
  ActivityLoopTowerController_1 = require("./ActivityContent/LoopTower/ActivityLoopTowerController"),
  ActivityMoonChasingController_1 = require("./ActivityContent/MoonChasing/Activity/ActivityMoonChasingController"),
  ActivityMowingController_1 = require("./ActivityContent/Mowing/ActivityMowingController"),
  ActivityNoviceJourneyController_1 = require("./ActivityContent/NoviceJourney/ActivityNoviceJourneyController"),
  ActivityPhantomCollectController_1 = require("./ActivityContent/PhantomCollect/ActivityPhantomCollectController"),
  ActivityRecallController_1 = require("./ActivityContent/Recall/ActivityRecallController"),
  ActivityRoleGiveController_1 = require("./ActivityContent/RoleGive/ActivityRoleGiveController"),
  ActivityRoleGuideController_1 = require("./ActivityContent/RoleGuide/ActivityRoleGuideController"),
  ActivityRoleTrialController_1 = require("./ActivityContent/RoleTrial/ActivityRoleTrialController"),
  ActivityRogueController_1 = require("./ActivityContent/RougeActivity/ActivityRogueController"),
  ActivityRunController_1 = require("./ActivityContent/Run/ActivityRunController"),
  ActivitySevenDaySignController_1 = require("./ActivityContent/SevenDaySign/ActivitySevenDaySignController"),
  ActivityTimePointRewardController_1 = require("./ActivityContent/TimePointReward/ActivityTimePointRewardController"),
  ActivityTowerGuideController_1 = require("./ActivityContent/TowerGuide/ActivityTowerGuideController"),
  ActivityTurntableController_1 = require("./ActivityContent/Turntable/ActivityTurntableController"),
  ActivityUniversalController_1 = require("./ActivityContent/UniversalActivity/ActivityUniversalController");
class ActivityManager {
  constructor() {}
  static Init() {
    this.G4e();
    for (const o in Protocol_1.Aki.Protocol.oks) {
      var t = Number(o);
      isNaN(t) ||
        (t = this.N4e.get(t)) ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Activity", 28, "没有注册活动类型", ["type", t]));
    }
    this.O4e();
  }
  static G4e() {
    this.N4e.set(
      Protocol_1.Aki.Protocol.oks.Proto_Parkour,
      new ActivityRunController_1.ActivityRunController(),
    ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_GatherActivity,
        new ActivityCollectionController_1.ActivityCollectionController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_Sign,
        new ActivitySevenDaySignController_1.ActivitySevenDaySignController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_NewBieCourse,
        new ActivityNoviceJourneyController_1.ActivityNoviceJourneyController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_PureUIActivity,
        new ActivityUniversalController_1.ActivityUniversalController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_TowerGuide,
        new ActivityTowerGuideController_1.ActivityTowerGuideController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_WorldNewJourney,
        new ActivityBeginnerBookController_1.ActivityBeginnerBookController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_RougeActivity,
        new ActivityRogueController_1.ActivityRogueController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_RoleTrialActivity,
        new ActivityRoleTrialController_1.ActivityRoleTrialController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_Harvest,
        new ActivityMowingController_1.ActivityMowingController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_DoubleInstanceRewardActivity,
        new ActivityDoubleRewardController_1.ActivityDoubleRewardController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_NewRoleGuideActivity,
        new ActivityRoleGuideController_1.ActivityRoleGuideController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_PhantomCollect,
        new ActivityPhantomCollectController_1.ActivityPhantomCollectController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_DailyAdventureActivity,
        new ActivityDailyAdventureController_1.ActivityDailyAdventureController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_LongShanMainActivity,
        new ActivityLongShanController_1.ActivityLongShanController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_BossRushActivity,
        new BossRushController_1.BossRushController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_TurnTableActivity,
        new ActivityTurntableController_1.ActivityTurntableController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_TimePointRewardActivity,
        new ActivityTimePointRewardController_1.ActivityTimePointRewardController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_PhotoMemoryActivity,
        new FragmentMemoryActivityController_1.FragmentMemoryActivityController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_TowerDefenceActivity,
        new TowerDefenceController_1.TowerDefenseController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_TrackMoonActivity,
        new ActivityMoonChasingController_1.ActivityMoonChasingController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_TowerGuideNew,
        new ActivityLoopTowerController_1.ActivityLoopTowerController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_CircumFluence,
        new ActivityRecallController_1.ActivityRecallController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.oks.Proto_TrackMoonPhase,
        new ActivityRoleGiveController_1.ActivityRoleGiveController(),
      );
  }
  static O4e() {
    this.N4e.forEach((t, o) => {
      t.Init();
    });
  }
  static GetActivityController(t) {
    return this.N4e.get(t);
  }
  static Clear() {
    this.N4e.forEach((t, o) => {
      t.Clear();
    }),
      this.N4e.clear();
  }
}
(exports.ActivityManager = ActivityManager).N4e = new Map();
//# sourceMappingURL=ActivityManager.js.map
