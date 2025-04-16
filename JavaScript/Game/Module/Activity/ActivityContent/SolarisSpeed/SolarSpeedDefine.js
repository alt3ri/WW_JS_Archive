"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.bonusRewardList =
    exports.bgPattern =
    exports.linePattern =
    exports.avatarPattern =
    exports.playerIndexSelfIconMap =
    exports.playerIndexIconMap =
    exports.fxColorHex =
    exports.medalColorHex =
    exports.medalTexPathMap =
    exports.rankBgPathMap =
    exports.SOLAR_SPEED_BONUS_LEVEL_ICON_PATH =
    exports.SOLAR_SPEED_REWARD_CANNOT_OPEN_TIPS_TEXT_ID =
    exports.SOLAR_SPEED_ADD_FRIEND_TIPS_TEXT_ID =
    exports.SOLAR_SPEED_CONFIRM_BUTTON_TEXT_ID_IN_RESULT =
    exports.SOLAR_SPEED_BONUS_REWARD_TEXT_ID_IN_REWARD =
    exports.SOLAR_SPEED_CONFIRM_BUTTON_TEXT_ID_IN_SUBVIEW =
    exports.SOLAR_SPEED_REWARD_PROGRESS_TEXT_ID_IN_SUBVIEW =
    exports.SOLAR_SPEED_REWARD_TITLE_TEXT_ID_IN_SUBVIEW =
    exports.SOLAR_SPEED_NO_RECORD_TEXT_ID =
    exports.SOLAR_SPEED_MOST_RECORD_TEXT_ID =
    exports.SOLAR_SPEED_UNLOCK_AFTER_DAYS =
    exports.SOLAR_SPEED_LAP_RECORD_NO_RECORD_TEXT_ID =
    exports.SOLAR_SPEED_LAP_RECORD_TEXT_ID =
    exports.SOLAR_SPEED_HIGHEST_SCORE_TEXT_ID =
    exports.SOLAR_SPEED_HIGHEST_RANK_TEXT_ID =
    exports.SOLAR_SPEED_RECORD_TEXT_ID_IN_SETTLE =
    exports.SOLAR_SPEED_DISTANCE_SCORE_TEXT_ID_IN_SETTLE =
    exports.SOLAR_SPEED_GOLD_SCORE_TEXT_ID_IN_SETTLE =
    exports.SOLAR_SPEED_RANK_SCORE_TEXT_ID_IN_SETTLE =
    exports.SOLAR_SPEED_CONFIRM_DESC_TEXT_ID_IN_SETTLE =
    exports.SOLAR_SPEED_CONFIRM_BUTTON_TEXT_ID_IN_SETTLE =
    exports.SOLAR_SPEED_CLOSE_BUTTON_TEXT_ID_IN_SETTLE =
    exports.SOLAR_SPEED_REWARD_BUTTON_TEXT_ID =
    exports.SOLAR_SPEED_REWARD_PROGRESS_TEXT_ID =
    exports.SOLAR_SPEED_REWARD_TITLE_TEXT_ID =
    exports.SOLAR_SPEED_BONUS_LEVEL_ID =
    exports.SOLAR_SPEED_INSTANCE_ENTRANCE_ID =
      void 0),
  (exports.SOLAR_SPEED_INSTANCE_ENTRANCE_ID = 9e3),
  (exports.SOLAR_SPEED_BONUS_LEVEL_ID = 99),
  (exports.SOLAR_SPEED_REWARD_TITLE_TEXT_ID = "LianjiPaoku_Reward_Title"),
  (exports.SOLAR_SPEED_REWARD_PROGRESS_TEXT_ID = "LianjiPaoku_Reward_Desc"),
  (exports.SOLAR_SPEED_REWARD_BUTTON_TEXT_ID = "LianjiPaoku_Button_Receive"),
  (exports.SOLAR_SPEED_CLOSE_BUTTON_TEXT_ID_IN_SETTLE =
    "LianjiPaoku_End_Leave"),
  (exports.SOLAR_SPEED_CONFIRM_BUTTON_TEXT_ID_IN_SETTLE =
    "LianjiPaoku_End_Again"),
  (exports.SOLAR_SPEED_CONFIRM_DESC_TEXT_ID_IN_SETTLE =
    "LianjiPaoku_End_BestScore"),
  (exports.SOLAR_SPEED_RANK_SCORE_TEXT_ID_IN_SETTLE =
    "LianjiPaoku_End_RankScore"),
  (exports.SOLAR_SPEED_GOLD_SCORE_TEXT_ID_IN_SETTLE =
    "LianjiPaoku_End_PickRank"),
  (exports.SOLAR_SPEED_DISTANCE_SCORE_TEXT_ID_IN_SETTLE =
    "LianjiPaoku_End_CompleteRank"),
  (exports.SOLAR_SPEED_RECORD_TEXT_ID_IN_SETTLE =
    "LianjiPaoku_End_HistoryRank"),
  (exports.SOLAR_SPEED_HIGHEST_RANK_TEXT_ID = "LianjiPaoku_Top_Rank"),
  (exports.SOLAR_SPEED_HIGHEST_SCORE_TEXT_ID = "LianjiPaoku_Top_Score"),
  (exports.SOLAR_SPEED_LAP_RECORD_TEXT_ID = "LianjiPaoku_Top_Time"),
  (exports.SOLAR_SPEED_LAP_RECORD_NO_RECORD_TEXT_ID =
    "LianjiPaoku_Top_Time_No_Time"),
  (exports.SOLAR_SPEED_UNLOCK_AFTER_DAYS = "LianjiPaokuReward_Level_UnLock"),
  (exports.SOLAR_SPEED_MOST_RECORD_TEXT_ID =
    "LianjiPaokuReward_Level_TopScore"),
  (exports.SOLAR_SPEED_NO_RECORD_TEXT_ID = "LianjiPaokuReward_Level_NoRecords"),
  (exports.SOLAR_SPEED_REWARD_TITLE_TEXT_ID_IN_SUBVIEW =
    "LianjiPaokuReward_9000_Preview"),
  (exports.SOLAR_SPEED_REWARD_PROGRESS_TEXT_ID_IN_SUBVIEW =
    "parkour_award_2_1"),
  (exports.SOLAR_SPEED_CONFIRM_BUTTON_TEXT_ID_IN_SUBVIEW =
    "PrefabTextItem_3950726357_Text"),
  (exports.SOLAR_SPEED_BONUS_REWARD_TEXT_ID_IN_REWARD =
    "LianjiPaoku_Bonus_Level_Title"),
  (exports.SOLAR_SPEED_CONFIRM_BUTTON_TEXT_ID_IN_RESULT =
    "PrefabTextItem_1234291298_Text"),
  (exports.SOLAR_SPEED_ADD_FRIEND_TIPS_TEXT_ID =
    "LianjiPaoku_Button_AddFr_Tip"),
  (exports.SOLAR_SPEED_REWARD_CANNOT_OPEN_TIPS_TEXT_ID =
    "LianjiPaoku_Reward_Cannot_Open_Tips"),
  (exports.SOLAR_SPEED_BONUS_LEVEL_ICON_PATH =
    "/Game/Aki/UI/UIResources/Common/Image/ComImg/T_ComRomeText_07.T_ComRomeText_07"),
  (exports.rankBgPathMap = [
    "/Game/Aki/UI/UIResources/UiTips/Image/GongduolaOnlineResult/T_ResultBgPlayer.T_ResultBgPlayer",
    "/Game/Aki/UI/UIResources/UiTips/Image/GongduolaOnlineResult/T_ResultBgOtherPlayer.T_ResultBgOtherPlayer",
    "/Game/Aki/UI/UIResources/UiTips/Image/GongduolaOnlineResult/T_ResultBgBronze.T_ResultBgBronze",
  ]),
  (exports.medalTexPathMap = [
    "/Game/Aki/UI/UIResources/Common/Image/Com/T_IconMedalGold.T_IconMedalGold",
    "/Game/Aki/UI/UIResources/Common/Image/Com/T_IconMedalSilver.T_IconMedalSilver",
    "/Game/Aki/UI/UIResources/Common/Image/Com/T_IconMedalBronze.T_IconMedalBronze",
  ]),
  (exports.medalColorHex = ["e1a846", "5488C2", "c89b76"]),
  (exports.fxColorHex = ["FFFFFF", "96C4FF", "B4A8E4"]),
  (exports.playerIndexIconMap = [
    "/Game/Aki/UI/UIResources/Common/Atlas/SP_Common1P.SP_Common1P",
    "/Game/Aki/UI/UIResources/Common/Atlas/SP_Common2P.SP_Common2P",
    "/Game/Aki/UI/UIResources/Common/Atlas/SP_Common3P.SP_Common3P",
  ]),
  (exports.playerIndexSelfIconMap = [
    "/Game/Aki/UI/UIResources/Common/Atlas/SP_CommonSelf1P.SP_CommonSelf1P",
    "/Game/Aki/UI/UIResources/Common/Atlas/SP_CommonSelf2P.SP_CommonSelf2P",
    "/Game/Aki/UI/UIResources/Common/Atlas/SP_CommonSelf3P.SP_CommonSelf3P",
  ]),
  (exports.avatarPattern = [
    "T_AvatarPatternGold",
    "T_AvatarPatternSilver",
    "T_AvatarPatternCopper",
  ]),
  (exports.linePattern = [
    "T_DescLineGold",
    "T_DescLineSilver",
    "T_DescLineCopper",
  ]),
  (exports.bgPattern = [
    "T_ResultBgPlayer",
    "T_ResultBgOtherPlayer",
    "T_ResultBgBronze",
  ]),
  (exports.bonusRewardList = [25, 26, 27, 28, 29, 30]);
//# sourceMappingURL=SolarSpeedDefine.js.map
