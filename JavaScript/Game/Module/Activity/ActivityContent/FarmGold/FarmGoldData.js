"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FarmGoldData = exports.FarmGoldLevelData = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  FarmGoldController_1 = require("./FarmGoldController"),
  UNLOCKLOCALKEY = 100;
class FarmGoldLevelData {
  constructor() {
    (this.LOe = 0),
      (this.kwl = 0),
      (this.ae = 0),
      (this.IsOpen = !1),
      (this.Owl = 0),
      (this.Nwl = !1),
      (this.Fwl = 0);
  }
  GetInstId() {
    return this.kwl;
  }
  GetStartTime() {
    return this.ae;
  }
  GetIsOpen() {
    var t = this.GetConfig().PreLevel;
    let e = !0;
    return (
      0 < t &&
        (t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          this.LOe,
        ).GetLevelInfoByInstId(t)) &&
        (e = t.GetIfPassLevel()),
      TimeUtil_1.TimeUtil.GetServerTime() >= this.ae && e
    );
  }
  GetIfPassLevel() {
    return this.Owl >= this.GetConfig().PassScore;
  }
  GetPoint() {
    return this.Owl;
  }
  GetHasGetLevelReward() {
    return this.Nwl;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldConfigByActivityIdAndInstId(
      this.LOe,
      this.kwl,
    );
  }
  GetRecommendLevel() {
    return this.GetDifficultConfig().RecommendedLevel;
  }
  GetFinishState() {
    return this.GetIfPassLevel();
  }
  GetRedDotState() {
    return this.GetNewOpenState();
  }
  GetSelectDifficultIndex() {
    var e =
      ConfigManager_1.ConfigManager.FarmGoldConfig.GetAllFarmGoldActivity();
    for (let t = 0; t < e.length; t++) if (e[t].Id === this.Fwl) return t;
    return 0;
  }
  GetInstanceBg() {
    return this.GetInstanceConfig().BannerPath;
  }
  GetSelectDifficult() {
    return 0 === this.Fwl ? 1 : this.Fwl;
  }
  GetDifficultConfig() {
    return ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldDifficultById(
      this.GetSelectDifficult(),
    );
  }
  SetDifficult(t) {
    this.Fwl = t;
  }
  GetNewOpenState() {
    return (
      0 ===
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.LOe,
          0,
          this.LOe,
          UNLOCKLOCALKEY,
          this.kwl,
        ) && this.GetIsOpen()
    );
  }
  GetUnlockTimeText() {
    var t, e;
    return TimeUtil_1.TimeUtil.GetServerTime() < this.ae
      ? ((t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(
          this.ae - TimeUtil_1.TimeUtil.GetServerTime(),
        )),
        (e =
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "FarmGoldUnLockTime",
          )),
        StringUtils_1.StringUtils.Format(e, t.CountDownText))
      : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "FarmGoldUnlockCondition",
        );
  }
  SaveOpenState() {
    this.GetIsOpen() &&
      (ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
        this.LOe,
        this.LOe,
        UNLOCKLOCALKEY,
        this.kwl,
        1,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.LOe,
      ));
  }
  GetNameText() {
    var t = this.GetInstanceConfig().MapName;
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
  }
  GetDescText() {
    var t = this.GetInstanceConfig().DungeonDesc;
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
  }
  GetSubTitleText() {
    return StringUtils_1.StringUtils.Format(
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "FarmGoldHighestPoint",
      ),
      this.Owl.toString(),
    );
  }
  GetRecommendElement() {
    return this.GetInstanceConfig().RecommendElement;
  }
  GetInstanceConfig() {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
      this.kwl,
    );
  }
  GetInstanceEntranceId() {
    return this.GetConfig().EntranceId;
  }
  FinishLevelReward() {
    this.Nwl = !0;
  }
  GetMonsterTips() {
    var t = this.GetInstanceConfig().MonsterTips;
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
  }
  GetMonsterPreviewState() {
    return 0 < this.GetInstanceConfig().MonsterPreview.length;
  }
  Phrase(t, e) {
    (this.LOe = t),
      (this.kwl = e.r6n),
      (this.ae = e.Mps),
      (this.IsOpen = e.Sps),
      (this.Owl = e.Eps),
      (this.Nwl = e.Gwl);
  }
}
exports.FarmGoldLevelData = FarmGoldLevelData;
class FarmGoldData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.Vwl = new Array()),
      (this.DSn = []),
      (this.Hwl = new Array()),
      (this.LSn = []),
      (this.$8i = void 0),
      (this.SNe = (t, e) => {
        var i = this.wSn(e),
          r = this.wSn(t);
        return i === r ? t.Id - e.Id : i - r;
      }),
      (this.xSn = (t, e) => {
        var i = this.wSn(t),
          r = this.wSn(e);
        return i === r ? t.Id - e.Id : r - i;
      });
  }
  PhraseEx(t) {
    (this.$8i = t),
      (this.Vwl = t.bwl.qwl),
      this.PhraseLevelData(t.bwl.uE_),
      this.PhraseRewardInfo();
  }
  AddFinishPointId(t) {
    this.Vwl.includes(t) || (this.$8i?.bwl.qwl.push(t), this.Vwl.push(t));
  }
  FinishLevelReward(t) {
    var e = this.GetLevelInfoByInstId(t);
    e && e.FinishLevelReward();
    for (const i of this.$8i.bwl.uE_) i.r6n === t && (i.Gwl = !0);
  }
  GetCurrentFullScore() {
    let t = 0;
    for (const e of this.Hwl) t += e.GetPoint();
    return t;
  }
  PhraseLevelData(t) {
    (this.Hwl = []), (this.LSn = []);
    for (const i of t) {
      var e = new FarmGoldLevelData(),
        e = (e.Phrase(this.Id, i), this.Hwl.push(e), this.bSn(e));
      this.LSn.push(e);
    }
  }
  RefreshLevelData(e) {
    for (const i of this.$8i.bwl.uE_)
      if (i.r6n === e.r6n) {
        (i.Eps = e.Eps), (i.Gwl = e.Gwl);
        break;
      }
    var t = this.Hwl.find((t) => t.GetInstId() === e.r6n);
    t && t.Phrase(this.Id, e), this.PhraseLevelData(this.$8i.bwl.uE_);
  }
  PhraseRewardInfo() {
    this.DSn = [];
    var t = this.GetCurrentFullScore();
    for (const i of ConfigManager_1.ConfigManager.FarmGoldConfig.GetScoreConfigByActivityId(
      this.Id,
    )) {
      var e = this.BSn(i.Id, this.Vwl, t);
      this.DSn.push(e);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.FarmGoldRefreshRewardRedDot,
      this.Id,
    );
  }
  bSn(t) {
    var e = t.GetConfig(),
      i = t.GetHasGetLevelReward(),
      r = t.GetPoint() >= e.PassScore,
      i = i ? 2 : r ? 1 : 0;
    return {
      Id: e.Id,
      NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        e.LevelRewardDesc,
      ),
      RewardState: i,
      ClickFunction: () => {
        FarmGoldController_1.FarmGoldController.RequestFarmGoldLevelPlay(
          this.Id,
          t.GetInstId(),
        );
      },
      RewardList: this.I2e(e.RewardId),
      RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        this.kbn(Number(i)),
      ),
    };
  }
  BSn(t, e, i) {
    var r = ConfigManager_1.ConfigManager.FarmGoldConfig.GetScoreConfigById(t),
      n = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "FarmGoldFullScoreTips",
        ),
        r.Score.toString(),
      ),
      e = e.includes(t) ? 2 : i >= r.Score ? 1 : 0;
    return {
      Id: r.RewardId,
      NameText: n,
      RewardState: e,
      ClickFunction: () => {
        FarmGoldController_1.FarmGoldController.RequestFarmGoldPoint(
          this.Id,
          t,
        );
      },
      RewardList: this.I2e(r.RewardId),
      RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        this.kbn(e),
      ),
    };
  }
  kbn(t) {
    let e = "";
    switch (t) {
      case 0:
        e = "PrefabTextItem_1443074454_Text";
        break;
      case 1:
        e = "CollectActivity_state_CanRecive";
        break;
      case 2:
        e = "CollectActivity_state_recived";
    }
    return e;
  }
  I2e(t) {
    var e,
      i,
      r = [];
    for ([
      e,
      i,
    ] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(t))
      r.push([{ ItemId: e, IncId: 0 }, i]);
    return r;
  }
  GetExDataRedPointShowState() {
    return this.GetPreGuideQuestFinishState() && (this.qSn() || this.gu_());
  }
  gu_() {
    for (const t of this.Hwl) if (t.GetNewOpenState()) return !0;
    return !1;
  }
  qSn() {
    for (const t of this.DSn) if (1 === t.RewardState) return !0;
    for (const e of this.LSn) if (1 === e.RewardState) return !0;
    return !1;
  }
  EntranceRedDot() {
    return this.GetExDataRedPointShowState();
  }
  RebuildData() {
    this.$8i && this.PhraseEx(this.$8i);
  }
  GetRewardPopUpViewData() {
    return this.RebuildData(), this.GetRewardViewData();
  }
  GetScoreDesc() {
    return this.GetCurrentFullScore().toString();
  }
  GetRewardViewData() {
    var t = StringUtils_1.StringUtils.Format(
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FarmGoldFullPoint"),
      this.GetCurrentFullScore().toString(),
    );
    return {
      DataPageList: [
        {
          DataList: this.LSn.sort(this.xSn),
          TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "FarmGoldLevelRewardText",
          ),
          TabTips: " ",
        },
        {
          DataList: this.DSn.sort(this.SNe),
          TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "FarmGoldScoreRewardText",
          ),
          TabTips: t,
        },
      ],
      Source: "FarmGold",
    };
  }
  wSn(t) {
    let e = 0;
    switch (t.RewardState) {
      case 0:
        e = 2;
        break;
      case 1:
        e = 3;
        break;
      case 2:
        e = 1;
        break;
      default:
        e = 4;
    }
    return e;
  }
  GetLevelInfoByInstId(e) {
    return this.Hwl.find((t) => t.GetInstId() === e);
  }
  HaveRewardCanTake() {
    return this.qSn();
  }
  SaveOpenState(t) {
    t = this.GetLevelInfoByInstId(t);
    t && t.SaveOpenState();
  }
  GetInsOpenState(t) {
    t = this.GetLevelInfoByInstId(t);
    return !!t && t.GetNewOpenState();
  }
  GetInsUnlockState(t) {
    t = this.GetLevelInfoByInstId(t);
    return t ? t.GetUnlockTimeText() : "";
  }
  GetInsUnlockText(t) {
    t = this.GetLevelInfoByInstId(t);
    return t ? t.GetUnlockTimeText() : "";
  }
  GetAllLevelData() {
    return this.Hwl;
  }
  GetLevelDataByIndex(t) {
    return this.Hwl[t];
  }
  GetLevelNameTextByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return t ? t.GetNameText() : "";
  }
  GetLevelDescTextByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return t ? t.GetDescText() : "";
  }
  GetLevelRecommendElementByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return t ? t.GetRecommendElement() : [];
  }
  GetLevelSubTitleTextByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return t ? t.GetSubTitleText() : "";
  }
  GetLevelLockStateByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return !!t && !t.GetIsOpen();
  }
  GetLevelInstanceDungeonIdByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return t ? t.GetInstId() : 0;
  }
  GetLevelUnlockTextByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return t ? t.GetUnlockTimeText() : "";
  }
  GetLevelFinishStateByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return !!t && t.GetFinishState();
  }
  GetLevelRecommendLevelByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return t ? t.GetRecommendLevel() : 0;
  }
  GetLevelRedDotStateByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return !!t && t.GetRedDotState();
  }
  GetLevelDifficultIndexByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return t ? t.GetSelectDifficultIndex() : 1;
  }
  GetLevelBgByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return t ? t.GetInstanceBg() : "";
  }
  GetDifficultTogText(t) {
    t =
      ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldDifficultById(t);
    return (
      (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Desc) ?? "") +
      "•" +
      StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "FarmGoldPointMultiply",
        ) ?? "",
        (t.Magnification / 100).toString(),
      )
    );
  }
  GetDifficultTitle(t) {
    t =
      ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldDifficultById(t);
    return (
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Desc) +
      "•" +
      StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "FarmGoldPointMultiply",
        ) ?? "",
        (t.Magnification / 100).toString(),
      )
    );
  }
  GetDifficultRecommendLevel(t) {
    return ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldDifficultById(
      t,
    ).RecommendedLevel;
  }
  SetInsDifficult(t, e) {
    t = this.GetLevelInfoByInstId(t);
    t && t.SetDifficult(e);
  }
}
(exports.FarmGoldData = FarmGoldData).CurrentSelectEntranceId = 0;
//# sourceMappingURL=FarmGoldData.js.map
