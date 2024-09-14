"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WHOLE_SHADOW_CACHE_DELAY_TIME =
    exports.mainPlayerRealShadow =
    exports.maxDecalShadowDistanceWithGameGraphQualityMobile =
    exports.maxDecalShadowDistanceWithGameGraphQualityPc =
    exports.maxRoleShadowDistanceWithGameGraphQualityMobile =
    exports.maxRoleShadowDistanceWithGameGraphQualityPc =
    exports.maxRoleShadowNumWithGameGraphQualityMobile =
    exports.maxRoleShadowNumWithGameGraphQualityPc =
    exports.HD_SCREEN_HEIGHT =
    exports.HD_SCREEN_WIDTH =
    exports.performanceLimitConfigs =
    exports.PERFORMENCELIMIT_SEQ_TAIL =
    exports.frameRateListAndroid =
    exports.frameRateListIos =
    exports.frameRateListPc =
      void 0),
  (exports.frameRateListPc = [30, 45, 60, 120]),
  (exports.frameRateListIos = [30, 60]),
  (exports.frameRateListAndroid = [24, 30, 45, 60]),
  (exports.PERFORMENCELIMIT_SEQ_TAIL = "_Seq"),
  (exports.performanceLimitConfigs = new Map([
    ["RoleRootView", { FrameLimit: !0, CacheWorldFrame: !1 }],
    ["RoleLevelUpView", { FrameLimit: !0, CacheWorldFrame: !1 }],
    ["HandBookEntranceView", { FrameLimit: !0, CacheWorldFrame: !1 }],
    ["AchievementMainView", { FrameLimit: !0, CacheWorldFrame: !1 }],
    ["CommonActivityView", { FrameLimit: !0, CacheWorldFrame: !1 }],
    ["VideoView", { FrameLimit: !0, CacheWorldFrame: !0 }],
    [
      "GachaScanView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !1 },
    ],
    [
      "DrawMainView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !1 },
    ],
    [
      "GachaResultView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !1 },
    ],
    [
      "WorldMapView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "CalabashRootView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !1 },
    ],
    [
      "BattlePassMainView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !1 },
    ],
    [
      "GachaMainView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "PayShopRootView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "AdventureGuideView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "TutorialView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "QuestView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "FriendView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "TimeOfDaySecondView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "EditFormationView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "InventoryView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "MailBoxView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "MenuView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "FunctionView" + exports.PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
  ])),
  (exports.HD_SCREEN_WIDTH = 2e3),
  (exports.HD_SCREEN_HEIGHT = 1100),
  (exports.maxRoleShadowNumWithGameGraphQualityPc = [0, 0, 10, 15]),
  (exports.maxRoleShadowNumWithGameGraphQualityMobile = [0, 0, 3, 6]),
  (exports.maxRoleShadowDistanceWithGameGraphQualityPc = [0, 0, 2500, 5e3]),
  (exports.maxRoleShadowDistanceWithGameGraphQualityMobile = [0, 0, 1500, 3e3]),
  (exports.maxDecalShadowDistanceWithGameGraphQualityPc = [2e3, 2e3, 4e3, 6e3]),
  (exports.maxDecalShadowDistanceWithGameGraphQualityMobile = [
    1500, 1500, 2500, 3500,
  ]),
  (exports.mainPlayerRealShadow = [0, 1, 1, 1]),
  (exports.WHOLE_SHADOW_CACHE_DELAY_TIME = 1e3);
//# sourceMappingURL=GameSettingsDeviceRenderDefine.js.map
