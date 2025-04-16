"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PLAYER_TECH_TYPE =
    exports.PHOEBE_ID =
    exports.FISHING_TECH_LAST_NODE_AREA =
    exports.FISHING_TECH_BEHIND_NODE_AREA =
    exports.FISHING_TECH_FIRST_NODE_AREA =
    exports.SAILING_NIGHT_TIME =
    exports.SAILING_DAY_TIME =
    exports.SAILING_QUEST_HELP_ID =
    exports.SAILING_REPUTATION_HELP_ID =
    exports.SAILING_DURABILITY_HELP_ID =
    exports.SAILING_TIME_HELP_ID =
    exports.TIPS_ICON =
    exports.GOLD_CUP_ICON =
    exports.SILVER_CUP_ICON =
    exports.BAIT_ITEMID =
    exports.BOMB_ITEMID =
    exports.FISHING_DELEGATE_CURRENCY_ITEMID =
    exports.FISHING_TECH_SHOW_ITEM_FIVE =
    exports.FISHING_TECH_SHOW_ITEM_FOUR =
    exports.FISHING_TECH_SHOW_ITEM_THREE =
    exports.FISHING_TECH_SHOW_ITEM_TWO =
    exports.FISHING_TECH_SHOW_ITEM_ONE =
    exports.FISHING_ENTRUST_ITEMID =
    exports.FISHING_CURRENCY_ITEMID =
    exports.MATCH_SPRITE =
    exports.PREVIEW_MATCH_SPRITE =
    exports.PREVIEW_OCCUPANCY_SPRITE =
    exports.PREVIEW_ERROR_SPRITE =
    exports.OUTLINE_SPRITE =
    exports.FINISH_SPRITE =
    exports.PROHIBIT_SPRITE =
    exports.MULTI_OCCUPANCY_SPRITE =
    exports.SINGLE_OCCUPANCY_SPRITE =
    exports.PREVIEW_SPRITE =
    exports.DISABLE_SPRITE =
    exports.EMPTY_SPRITE =
    exports.INTERACT_COL_COUNT =
    exports.INTERACT_ROW_COUNT =
    exports.BACKPACK_COL_COUNT =
    exports.BACKPACK_ROW_COUNT =
    exports.UNVALID_ITEM_BLOCK_ID =
    exports.fishingNodeTypeText =
    exports.fishingItemTimeText =
    exports.fishingItemTypeText =
    exports.fishingEntrustTypeText =
    exports.fishingQuestPoolColorText =
    exports.fishingSelectStateColorText =
    exports.fishingStateColorText =
    exports.fishingStateText =
    exports.fishingQualityColor =
      void 0),
  (exports.FISHING_SILVER_TEXTURE =
    exports.FISHING_GLODEN_TEXTURE =
    exports.fishingEffectList =
    exports.FISHING_HIGHT_VALUE_ENTRUST_POOL =
    exports.FISHING_NORMAL_ENTRUST_POOL =
    exports.FISHING_SKILL_BAIT_LIMIT =
    exports.FISHING_SKILL_BOMB_SUCCESS =
    exports.FISHING_SKILL_BAIT_SUCCESS =
    exports.FISHING_SKILL_BAIT_NOT_ENOUGH =
    exports.FISHING_SKILL_IN_CD =
    exports.FISHING_SKILL_BOMB_NOT_ENOUGH =
    exports.fishingItemList =
    exports.FISHING_TECH_MATERIAL_WHITE_ENOUGHT =
    exports.FISHING_TECH_MATERIAL_ENOUGHT =
    exports.FISHING_TECH_MATERIAL_NOT_ENOUGHT =
    exports.FISHING_TECH_AUDIO_SIZE =
    exports.FISHING_PHOEBE_TECH_AUDIO =
    exports.FISHING_MALE_TECH_AUDIO =
    exports.FISHING_FEMALE_TECH_AUDIO =
    exports.materialProgressName =
    exports.FISHING_CAGE_TECH =
    exports.TRAWL_TECH_TYPE =
    exports.TRAWL_LIST_HELPID =
    exports.CAGE_LIST_HELPID =
    exports.FISHING_SIZE_TYPE =
    exports.FISHING_QUICK_SAIL_POOL =
    exports.FISHING_POINT_QUEST_MARK_ID =
    exports.FISHING_POINT_MARK_ID =
    exports.QUEST_COL_COUNT =
    exports.QUEST_ROW_COUNT =
    exports.FISHING_PHOEBE_ICON_SPRITE =
    exports.FISHING_MALE_ICON_SPRITE =
    exports.FISHING_FEMALE_ICON_SPRITE =
    exports.FISHING_PHOEBE_TEXTURE =
    exports.FISHING_MALE_TEXTURE =
    exports.FISHING_FEMALE_TEXTURE =
    exports.PHOEBE_TECH_TYPE =
      void 0);
const UE = require("ue"),
  roleTechLevelUpItem =
    ((exports.fishingQualityColor = {
      [0]: "FFFFFFFF",
      1: "ffffff00",
      2: "C788E9FF",
      3: "7BCDF5FF",
      4: "7BCDF5FF",
    }),
    (exports.fishingStateText = {
      [1]: "FishingReceiving",
      2: "FishingFinishing",
      0: "FishingReceiving",
      3: "FishingDoing",
    }),
    (exports.fishingStateColorText = {
      [1]: "#59B4D3",
      2: "#5CC35E",
      0: "#59B4D3",
      3: "#FFFFFF",
    }),
    (exports.fishingSelectStateColorText = {
      [1]: "#59B4D3",
      2: "#5CC35E",
      0: "#59B4D3",
      3: "#5B544A",
    }),
    (exports.fishingQuestPoolColorText = {
      [1]: "#A69B62",
      2: "#6EA079",
      3: "#A69B62",
      4: "#5F89A1",
      5: "#6EA079",
    }),
    (exports.fishingEntrustTypeText = {
      [0]: "FishingTagFishing",
      1: "FishingTagMaterial",
      2: "FishingTagDeliver",
    }),
    (exports.fishingItemTypeText = {
      [3]: "Fishing_FishingKing",
      4: "Fishing_FishingMaterial",
      1: "Fishing_FishingNormal",
      2: "Fishing_FishingVariation",
    }),
    (exports.fishingItemTimeText = {
      [2]: "Fishing_OnlyDay",
      3: "Fishing_OnlyNight",
      1: "Fishing_WholeDay",
    }),
    (exports.fishingNodeTypeText = {
      [1]: "Fishing_TechType1",
      2: "Fishing_TechType2",
      3: "Fishing_TechType3",
    }),
    (exports.UNVALID_ITEM_BLOCK_ID = -1),
    (exports.BACKPACK_ROW_COUNT = 7),
    (exports.BACKPACK_COL_COUNT = 8),
    (exports.INTERACT_ROW_COUNT = 3),
    (exports.INTERACT_COL_COUNT = 6),
    (exports.EMPTY_SPRITE = "SP_GridEmpty"),
    (exports.DISABLE_SPRITE = "SP_GridSellDisable"),
    (exports.PREVIEW_SPRITE = "SP_GridFinsh"),
    (exports.SINGLE_OCCUPANCY_SPRITE = "SP_GridReplace"),
    (exports.MULTI_OCCUPANCY_SPRITE = "SP_GridError"),
    (exports.PROHIBIT_SPRITE = "SP_GridError"),
    (exports.FINISH_SPRITE = "SP_GridQuality"),
    (exports.OUTLINE_SPRITE = "SP_GridFinsh"),
    (exports.PREVIEW_ERROR_SPRITE = "SP_GridError"),
    (exports.PREVIEW_OCCUPANCY_SPRITE = "SP_GridReplace"),
    (exports.PREVIEW_MATCH_SPRITE = "SP_GridFinsh"),
    (exports.MATCH_SPRITE = "SP_GridFinsh"),
    (exports.FISHING_CURRENCY_ITEMID = 27),
    (exports.FISHING_ENTRUST_ITEMID = 28),
    (exports.FISHING_TECH_SHOW_ITEM_ONE = 38),
    (exports.FISHING_TECH_SHOW_ITEM_TWO = 37),
    (exports.FISHING_TECH_SHOW_ITEM_THREE = 29),
    (exports.FISHING_TECH_SHOW_ITEM_FOUR = 30),
    (exports.FISHING_TECH_SHOW_ITEM_FIVE = 31),
    (exports.FISHING_DELEGATE_CURRENCY_ITEMID = 8),
    (exports.BOMB_ITEMID = 32),
    (exports.BAIT_ITEMID = 33),
    (exports.SILVER_CUP_ICON = "T_IconCupSilver"),
    (exports.GOLD_CUP_ICON = "T_IconCupGold"),
    (exports.TIPS_ICON = "T_TipsWorldNavigation"),
    (exports.SAILING_TIME_HELP_ID = 185),
    (exports.SAILING_DURABILITY_HELP_ID = 186),
    (exports.SAILING_REPUTATION_HELP_ID = 188),
    (exports.SAILING_QUEST_HELP_ID = 191),
    (exports.SAILING_DAY_TIME = 18e3),
    (exports.SAILING_NIGHT_TIME = 68400),
    (exports.FISHING_TECH_FIRST_NODE_AREA = 0),
    (exports.FISHING_TECH_BEHIND_NODE_AREA = 3),
    (exports.FISHING_TECH_LAST_NODE_AREA = 4),
    (exports.PHOEBE_ID = 1506),
    (exports.PLAYER_TECH_TYPE = 4),
    (exports.PHOEBE_TECH_TYPE = 5),
    (exports.FISHING_FEMALE_TEXTURE = "T_NavigationRoleFemale"),
    (exports.FISHING_MALE_TEXTURE = "T_NavigationRoleMale"),
    (exports.FISHING_PHOEBE_TEXTURE = "T_NavigationRoleFeibi"),
    (exports.FISHING_FEMALE_ICON_SPRITE = "SP_RoleFemale"),
    (exports.FISHING_MALE_ICON_SPRITE = "SP_RoleMale"),
    (exports.FISHING_PHOEBE_ICON_SPRITE = "SP_RoleFeibi"),
    (exports.QUEST_ROW_COUNT = 3),
    (exports.QUEST_COL_COUNT = 5),
    (exports.FISHING_POINT_MARK_ID = 9),
    (exports.FISHING_POINT_QUEST_MARK_ID = 20),
    (exports.FISHING_QUICK_SAIL_POOL = 3),
    (exports.FISHING_SIZE_TYPE = 3),
    (exports.CAGE_LIST_HELPID = 193),
    (exports.TRAWL_LIST_HELPID = 194),
    (exports.TRAWL_TECH_TYPE = 12),
    (exports.FISHING_CAGE_TECH = 6),
    (exports.materialProgressName = new UE.FName("Progress")),
    (exports.FISHING_FEMALE_TECH_AUDIO =
      "play_vo_nvzhu_sys_fishing_techupgrade0"),
    (exports.FISHING_MALE_TECH_AUDIO =
      "play_vo_nanzhu_sys_fishing_techupgrade0"),
    (exports.FISHING_PHOEBE_TECH_AUDIO =
      "play_vo_feibi_sys_fishing_techupgrade0"),
    (exports.FISHING_TECH_AUDIO_SIZE = 3),
    (exports.FISHING_TECH_MATERIAL_NOT_ENOUGHT = "<color=#c25757>{0}</color>"),
    (exports.FISHING_TECH_MATERIAL_ENOUGHT = "<color=#81764c>{0}</color>"),
    (exports.FISHING_TECH_MATERIAL_WHITE_ENOUGHT =
      "<color=#ffffff>{0}</color>"),
    [71510101, 71510102, 71510103, 71510201, 71510202, 71510203]);
(exports.fishingItemList = [
  exports.FISHING_TECH_SHOW_ITEM_ONE,
  exports.FISHING_TECH_SHOW_ITEM_TWO,
  exports.FISHING_TECH_SHOW_ITEM_THREE,
  exports.FISHING_TECH_SHOW_ITEM_FOUR,
  exports.FISHING_TECH_SHOW_ITEM_FIVE,
  exports.FISHING_CURRENCY_ITEMID,
  ...roleTechLevelUpItem,
]),
  (exports.FISHING_SKILL_BOMB_NOT_ENOUGH = "Fishing_SkillTip1"),
  (exports.FISHING_SKILL_IN_CD = "Fishing_SkillTip2"),
  (exports.FISHING_SKILL_BAIT_NOT_ENOUGH = "Fishing_SkillTip3"),
  (exports.FISHING_SKILL_BAIT_SUCCESS = "Fishing_SkillTip4"),
  (exports.FISHING_SKILL_BOMB_SUCCESS = "Fishing_SkillTip5"),
  (exports.FISHING_SKILL_BAIT_LIMIT = "Fishing_SkillTip6"),
  (exports.FISHING_NORMAL_ENTRUST_POOL = 4),
  (exports.FISHING_HIGHT_VALUE_ENTRUST_POOL = 2),
  (exports.fishingEffectList = [880700303, 880700310, 880700305, 880700307]),
  (exports.FISHING_GLODEN_TEXTURE =
    "/Game/Aki/UI/UIResources/UiActivity/Image/Navigation/T_IconCupGold.T_IconCupGold"),
  (exports.FISHING_SILVER_TEXTURE =
    "/Game/Aki/UI/UIResources/UiActivity/Image/Navigation/T_IconCupSilver.T_IconCupSilver");
//# sourceMappingURL=FishingDefine.js.map
