"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FragmentMemoryMainViewOpenData =
    exports.FragmentMemoryTopicData =
    exports.FragmentMemoryCollectData =
      void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  LevelGeneralCommons_1 = require("../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
class FragmentMemoryCollectData {
  constructor() {
    (this.xe = 0), (this.ige = 0), (this.iwn = void 0), (this._be = 0);
  }
  GetId() {
    return this.xe;
  }
  GetFlag() {
    return this.ige;
  }
  GetIfCanGetReward() {
    return this.GetIfUnlock() && !this.GetIfGetReward();
  }
  GetIfUnlock() {
    return 1 == (1 & this.ige);
  }
  GetTopicData() {
    return this.iwn;
  }
  GetIfGetReward() {
    return 1 == ((this.ige >> 1) & 1);
  }
  GetTraceEntityId() {
    return this.GetConfig().TraceEntityId;
  }
  GetTraceMarkId() {
    return this.GetConfig().TraceMarkId;
  }
  GetFinishTime() {
    return this._be;
  }
  PhraseFromConfig(e) {
    this.xe = e.Id;
  }
  GetRank() {
    return this.GetConfig().Rank;
  }
  Phrase(e) {
    (this.xe = e.J4n),
      (this.ige = e.$4n),
      (this._be = Number(MathUtils_1.MathUtils.LongToBigInt(e.wBs)) / 1e3),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FragmentRewardRedDot,
        this.xe,
      );
  }
  GetTimeText() {
    return 0 === this._be ? "" : TimeUtil_1.TimeUtil.DateFormatString(this._be);
  }
  BindSourceTopic(e) {
    this.iwn = e;
  }
  GetClueEntrance() {
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetClueEntrance(
      this.GetClueId(),
    );
  }
  GetClueContent() {
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetClueContent(
      this.GetClueEntrance().ContentGroupId,
    );
  }
  GetClueId() {
    return this.GetConfig().ClueId;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryCollectById(
      this.xe,
    );
  }
  GetTitle() {
    return this.GetConfig().Title;
  }
  GetTipsDesc() {
    return this.GetConfig().TipsDesc;
  }
  GetDesc() {
    return this.GetConfig().Desc;
  }
  GetDropId() {
    return this.GetConfig().DropId;
  }
  GetPreviewReward() {
    var e,
      t,
      r = [];
    for ([e, t] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
      this.GetDropId(),
    ).DropPreview) {
      var n = [{ IncId: 0, ItemId: e }, t];
      r.push(n);
    }
    return r;
  }
  GetThemeBg() {
    return this.GetBgResource();
  }
  GetBgResource() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    return 1 === e ? this.rwn() : 0 === e ? this.own() : "";
  }
  rwn() {
    return this.GetConfig().BgResourceM;
  }
  own() {
    return this.GetConfig().BgResourceF;
  }
}
exports.FragmentMemoryCollectData = FragmentMemoryCollectData;
class FragmentMemoryTopicData {
  constructor() {
    (this.xe = 0), (this.nwn = []), (this.swn = !0);
  }
  GetId() {
    return this.xe;
  }
  Phrase(t) {
    (this.xe = t.J4n), (this.nwn = []);
    for (const i of t.xBs) {
      var e = new FragmentMemoryCollectData(),
        r =
          (e.Phrase(i),
          ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryCollectById(
            i.J4n,
          ));
      e.PhraseFromConfig(r), e.BindSourceTopic(this), this.nwn.push(e);
    }
    var n;
    for (const t of ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryCollectConfigListByTopicId(
      this.xe,
    ))
      this.nwn.find((e) => e.GetId() === t.Id) ||
        ((n = new FragmentMemoryCollectData()).PhraseFromConfig(t),
        n.BindSourceTopic(this),
        this.nwn.push(n));
    this.nwn.sort((e, t) => e.GetRank() - t.GetRank()),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FragmentRewardTopicRedDot,
        this.xe,
      );
  }
  GetRedDotState() {
    for (const e of this.nwn) if (e.GetIfCanGetReward()) return !0;
    return !1;
  }
  GetClueEntrance() {
    var e =
      ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryTopicById(
        this.xe,
      );
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetClueEntrance(
      e.ClueId,
    );
  }
  GetClueContent() {
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetClueContent(
      this.GetClueEntrance().ContentGroupId,
    );
  }
  GetCollectDataList() {
    return this.nwn;
  }
  GetMemoryCollectNum() {
    return this.nwn.length;
  }
  GetFinishCollectNum() {
    let e = 0;
    for (const t of this.nwn) t.GetIfUnlock() && e++;
    return e;
  }
  GetAllCollectState() {
    for (const e of this.nwn) if (!e.GetIfUnlock()) return !1;
    return !0;
  }
  GetUnlockState() {
    return this.swn;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryTopicById(
      this.xe,
    );
  }
  GetConditionDesc() {
    var e = this.GetConfig().ConditionGroupId;
    return (
      LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e) ??
      ""
    );
  }
}
exports.FragmentMemoryTopicData = FragmentMemoryTopicData;
class FragmentMemoryMainViewOpenData {
  constructor() {
    (this.FragmentMemoryTopicData = void 0), (this.CurrentSelectId = 0);
  }
}
exports.FragmentMemoryMainViewOpenData = FragmentMemoryMainViewOpenData;
//# sourceMappingURL=FragmentMemoryData.js.map
