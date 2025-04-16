"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityManager = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  DreamLinkController_1 = require("../DreamLink/DreamLinkController"),
  FragmentMemoryActivityController_1 = require("../FragmentMemory/FragmentMemoryActivityController"),
  ActivityPermanentRogueController_1 = require("../PermanentRogue/ActivityPermanentRogueController"),
  RacingBetsController_1 = require("../RacingBets/RacingBetsController"),
  TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController"),
  WeeklyRogueController_1 = require("../WeeklyRogue/WeeklyRogueController"),
  ActivityLinkageController_1 = require("./ActivityContent/ActivityLinkPage/ActivityLinkageController"),
  AvignonController_1 = require("./ActivityContent/Avignon/Controller/AvignonController"),
  BabelTowerController_1 = require("./ActivityContent/BabelTower/BabelTowerController"),
  ActivityBeginnerBookController_1 = require("./ActivityContent/BeginnerBook/ActivityBeginnerBookController"),
  ActivityBlackCoastController_1 = require("./ActivityContent/BlackCoast/ActivityBlackCoastController"),
  BossRushController_1 = require("./ActivityContent/BossRush/BossRushController"),
  CiacconaActivityController_1 = require("./ActivityContent/Ciaccona/CiacconaActivityController"),
  ActivityCollectionController_1 = require("./ActivityContent/Collection/ActivityCollectionController"),
  ActivityCorniceMeetingController_1 = require("./ActivityContent/CorniceMeeting/ActivityCorniceMeetingController"),
  CumulativeShopController_1 = require("./ActivityContent/CumulativeShop/CumulativeShopController"),
  ActivityDailyAdventureController_1 = require("./ActivityContent/DailyAdventure/ActivityDailyAdventureController"),
  DangoAbyssActivityController_1 = require("./ActivityContent/DangoAbyss/DangoAbyssActivityController"),
  ActivityDangoMonopolyController_1 = require("./ActivityContent/DangoMonopoly/ActivityDangoMonopolyController"),
  ActivityDirectTrainController_1 = require("./ActivityContent/DirectTrain/ActivityDirectTrainController"),
  ActivityDoubleRewardController_1 = require("./ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  FarmGoldController_1 = require("./ActivityContent/FarmGold/FarmGoldController"),
  ActivityFishingController_1 = require("./ActivityContent/Fishing/Activity/ActivityFishingController"),
  ActivityInviteNewbieController_1 = require("./ActivityContent/InviteNewbie/Controller/ActivityInviteNewbieController"),
  ActivityLongShanController_1 = require("./ActivityContent/LongShan/ActivityLongShanController"),
  ActivityLoopTowerController_1 = require("./ActivityContent/LoopTower/ActivityLoopTowerController"),
  ActivityLordGymController_1 = require("./ActivityContent/LordGym/ActivityLordGymController"),
  ActivityMapExploreController_1 = require("./ActivityContent/MapExplore/ActivityMapExploreController"),
  ActivityMapTravelController_1 = require("./ActivityContent/MapTravel/ActivityMapTravelController"),
  ActivityMoonChasingController_1 = require("./ActivityContent/MoonChasing/Activity/ActivityMoonChasingController"),
  ActivityMowingController_1 = require("./ActivityContent/Mowing/ActivityMowingController"),
  ActivityMowingRiskController_1 = require("./ActivityContent/MowingRisk/Controller/ActivityMowingRiskController"),
  MowingTowerController_1 = require("./ActivityContent/MowingTower/MowingTowerController"),
  ActivityNoviceJourneyController_1 = require("./ActivityContent/NoviceJourney/ActivityNoviceJourneyController"),
  ActivityPhantomCollectController_1 = require("./ActivityContent/PhantomCollect/ActivityPhantomCollectController"),
  ActivityRegressController_1 = require("./ActivityContent/Regress/ActivityRegressController"),
  ActivityRoleGiveController_1 = require("./ActivityContent/RoleGive/ActivityRoleGiveController"),
  ActivityRoleGuideController_1 = require("./ActivityContent/RoleGuide/ActivityRoleGuideController"),
  RoleSkinTrialController_1 = require("./ActivityContent/RoleSkinTrail/RoleSkinTrialController"),
  ActivityRoleTrialController_1 = require("./ActivityContent/RoleTrial/ActivityRoleTrialController"),
  ActivityRogueController_1 = require("./ActivityContent/RougeActivity/ActivityRogueController"),
  ActivityRunController_1 = require("./ActivityContent/Run/ActivityRunController"),
  ActivityScratchTicketController_1 = require("./ActivityContent/ScratchTicket/ActivityScratchTicketController"),
  ActivitySevenDaySignController_1 = require("./ActivityContent/SevenDaySign/ActivitySevenDaySignController"),
  ActivityShipTowerController_1 = require("./ActivityContent/ShipTower/ActivityShipTowerController"),
  ActivitySolarSpeedController_1 = require("./ActivityContent/SolarisSpeed/Controller/ActivitySolarSpeedController"),
  ActivitySpring25Controller_1 = require("./ActivityContent/Spring25/Controller/ActivitySpring25Controller"),
  ActivityTimePointRewardController_1 = require("./ActivityContent/TimePointReward/ActivityTimePointRewardController"),
  ActivityTowerGuideController_1 = require("./ActivityContent/TowerGuide/ActivityTowerGuideController"),
  ActivityTurntableController_1 = require("./ActivityContent/Turntable/ActivityTurntableController"),
  ActivityUniversalController_1 = require("./ActivityContent/UniversalActivity/ActivityUniversalController"),
  ActivityVersionPreheatController_1 = require("./ActivityContent/VersionPreheat/Controller/ActivityVersionPreheatController"),
  ActivityControllerHolder_1 = require("./ActivityControllerHolder");
class ActivityManager {
  constructor() {}
  static Init() {
    this.G4e();
    for (const o in Protocol_1.Aki.Protocol.uks) {
      var t = Number(o);
      isNaN(t) ||
        (t = this.N4e.get(t)) ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Activity", 27, "没有注册活动类型", ["type", t]));
    }
    this.O4e();
  }
  static G4e() {
    this.N4e.set(
      Protocol_1.Aki.Protocol.uks.Proto_Parkour,
      new ActivityRunController_1.ActivityRunController(),
    ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_GatherActivity,
        new ActivityCollectionController_1.ActivityCollectionController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_Sign,
        new ActivitySevenDaySignController_1.ActivitySevenDaySignController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_NewBieCourse,
        new ActivityNoviceJourneyController_1.ActivityNoviceJourneyController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_PureUIActivity,
        new ActivityUniversalController_1.ActivityUniversalController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_TowerGuide,
        new ActivityTowerGuideController_1.ActivityTowerGuideController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_WorldNewJourney,
        new ActivityBeginnerBookController_1.ActivityBeginnerBookController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_RougeActivity,
        new ActivityRogueController_1.ActivityRogueController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_RoleTrialActivity,
        new ActivityRoleTrialController_1.ActivityRoleTrialController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_Harvest,
        new ActivityMowingController_1.ActivityMowingController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_DoubleInstanceRewardActivity,
        new ActivityDoubleRewardController_1.ActivityDoubleRewardController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_NewRoleGuideActivity,
        new ActivityRoleGuideController_1.ActivityRoleGuideController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_PhantomCollect,
        new ActivityPhantomCollectController_1.ActivityPhantomCollectController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_DailyAdventureActivity,
        new ActivityDailyAdventureController_1.ActivityDailyAdventureController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_LongShanMainActivity,
        new ActivityLongShanController_1.ActivityLongShanController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_BossRushActivity,
        new BossRushController_1.BossRushController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_TurnTableActivity,
        new ActivityTurntableController_1.ActivityTurntableController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_TimePointRewardActivity,
        new ActivityTimePointRewardController_1.ActivityTimePointRewardController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_PhotoMemoryActivity,
        new FragmentMemoryActivityController_1.FragmentMemoryActivityController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_TowerDefenceActivity,
        new TowerDefenceController_1.TowerDefenseController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_TrackMoonActivity,
        new ActivityMoonChasingController_1.ActivityMoonChasingController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_TowerGuideNew,
        new ActivityLoopTowerController_1.ActivityLoopTowerController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_SlashAndTowerLevelPlay,
        new ActivityShipTowerController_1.ActivityShipTowerController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_DangoMonopoly,
        new ActivityDangoMonopolyController_1.ActivityDangoMonopolyController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_Explore,
        new ActivityMapExploreController_1.ActivityMapExploreController(),
      );
    var t = new ActivityRegressController_1.ActivityRegressController(),
      t =
        (this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_RegressActivity, t),
        (ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController =
          t),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_TrackMoonPhase,
          new ActivityRoleGiveController_1.ActivityRoleGiveController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_CorniceMeeting,
          new ActivityCorniceMeetingController_1.ActivityCorniceMeetingController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_RiskHarvest,
          new ActivityMowingRiskController_1.ActivityMowingRiskController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_BlackCoastTheme,
          new ActivityBlackCoastController_1.ActivityBlackCoastController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_RogueWhiteCat,
          new DreamLinkController_1.DreamLinkController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_ScratchCard,
          new ActivityScratchTicketController_1.ActivityScratchTicketController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_PreheatSign,
          new ActivityVersionPreheatController_1.ActivityVersionPreheatController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_MowTower,
          new MowingTowerController_1.MowingTowerController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_ThroughTrain,
          new ActivityDirectTrainController_1.ActivityDirectTrainController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_MapTravelActivity,
          new ActivityMapTravelController_1.ActivityMapTravelController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_FarmGold,
          new FarmGoldController_1.FarmGoldController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_SprintSign,
          new ActivitySpring25Controller_1.ActivitySpring25Controller(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_NewLordGym,
          new ActivityLordGymController_1.ActivityLordGymController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_RoleSkinTrialActivity,
          new RoleSkinTrialController_1.RoleSkinTrialController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_RogueWeekly,
          new WeeklyRogueController_1.WeeklyRogueController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_FishingActivity,
          new ActivityFishingController_1.ActivityFishingController(),
        ),
        new ActivitySolarSpeedController_1.ActivitySolarSpeedController()),
      t =
        (this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_TeamParkOurActivity, t),
        (ActivityControllerHolder_1.ActivityControllerHolder.ActivitySolarSpeedController =
          t),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_BabelTower,
          new BabelTowerController_1.BabelTowerController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_BetHorses,
          new RacingBetsController_1.RacingBetsController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_RogueRes,
          new ActivityPermanentRogueController_1.ActivityPermanentRogueController(),
        ),
        new DangoAbyssActivityController_1.DangoAbyssActivityController()),
      t =
        (this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_Abyss, t),
        (ActivityControllerHolder_1.ActivityControllerHolder.DangoAbyssActivityController =
          t),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_Avignon,
          new AvignonController_1.AvignonController(),
        ),
        this.N4e.set(
          Protocol_1.Aki.Protocol.uks.Proto_CiacconaActivity,
          new CiacconaActivityController_1.CiacconaActivityController(),
        ),
        new ActivityInviteNewbieController_1.ActivityInviteNewbieController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_H5CircumFluence, t),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_ActivityLinkage,
        new ActivityLinkageController_1.ActivityLinkageController(),
      ),
      this.N4e.set(
        Protocol_1.Aki.Protocol.uks.Proto_ConsumptiveActivity,
        new CumulativeShopController_1.CumulativeShopController(),
      ),
      (ActivityControllerHolder_1.ActivityControllerHolder.ActivityInviteNewbieController =
        t);
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
      this.N4e.clear(),
      ActivityControllerHolder_1.ActivityControllerHolder.Clear();
  }
}
(exports.ActivityManager = ActivityManager).N4e = new Map();
//# sourceMappingURL=ActivityManager.js.map
