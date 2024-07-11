"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushData =
    exports.BossRushLevelRewardData =
    exports.BossRushLevelDetailInfo =
      void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  BossRushController_1 = require("./BossRushController"),
  BossRushModel_1 = require("./BossRushModel"),
  UNLOCKLOCALKEY = 100,
  UNLOCKBUFFKEY = 200;
class BossRushLevelDetailInfo {
  constructor() {
    (this.LOe = 0),
      (this.xe = 0),
      (this.AAe = 0),
      (this.SSn = 0),
      (this.ySn = []),
      (this.ISn = []),
      (this.xAn = []),
      (this.TSn = []),
      (this.jFe = !1);
  }
  Phrase(t, e, s) {
    (this.LOe = t),
      this.SetId(e.X5n),
      this.SetScore(e.mMs),
      this.SetUnLockTime(e.cps),
      (this.jFe = e.dps),
      (this.ySn = []),
      (this.ISn = []),
      (this.xAn = []);
    for (const h of e.gMs) {
      var i = new BossRushModel_1.BossRushBuffInfo();
      (i.BuffId = h.L6n),
        (i.Slot = h.D6n),
        (i.ChangeAble =
          h.A6n !== Protocol_1.Aki.Protocol.fks.cBs &&
          h.A6n !== Protocol_1.Aki.Protocol.fks.Proto_Inactive),
        (i.State = h.A6n),
        this.ySn.push(i);
    }
    for (const u of this.GetConfig().OptionalBuff) {
      var r = new BossRushModel_1.BossRushBuffInfo();
      (r.BuffId = u), (r.Slot = -1), (r.ChangeAble = !0), this.xAn.push(r);
    }
    for (const l of s) {
      var o = new BossRushModel_1.BossRushBuffInfo();
      (o.BuffId = l), (o.Slot = -1), (o.ChangeAble = !0), this.ISn.push(o);
    }
    this.TSn = [];
    let n = 0;
    for (const c of e.CMs) {
      var a = new BossRushModel_1.BossRushRoleInfo();
      (a.RoleId = c), (a.Slot = n), n++, this.TSn.push(a);
    }
  }
  SetId(t) {
    this.xe = t;
  }
  SetScore(t) {
    this.AAe = t;
  }
  SetUnLockTime(t) {
    this.SSn = t;
  }
  GetId() {
    return this.xe;
  }
  GetMonsterTexturePath() {
    return this.GetConfig().PreviewTexture;
  }
  GetBigMonsterTexturePath() {
    return this.GetConfig().StageTexture;
  }
  GetMonsterName() {
    var t = this.GetConfig().BossInfo,
      t =
        ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(t);
    return t ? t.Name : "";
  }
  GetRecommendElementIdArray() {
    return this.GetInstanceDungeonConfig().RecommendElement;
  }
  GetUnLockState() {
    return this.jFe;
  }
  GetScore() {
    return this.AAe;
  }
  GetUnlockTimeText() {
    var t, e, s;
    return TimeUtil_1.TimeUtil.GetServerTime() < this.SSn
      ? ((t = TimeUtil_1.TimeUtil.CalculateRemainingTime(
          this.GetUnLockTime() - TimeUtil_1.TimeUtil.GetServerTime(),
        )),
        (s = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
          t.TextId,
        )),
        (s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s)),
        (e =
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "BossRushUnLockTime",
          )),
        (s = StringUtils_1.StringUtils.Format(s, t.TimeValue.toString())),
        StringUtils_1.StringUtils.Format(e, s))
      : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "BossRushUnlockCondition",
        );
  }
  GetUnLockTime() {
    return this.SSn;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushByActivityIdAndInstanceId(
      this.LOe,
      this.xe,
    );
  }
  GetMaxBuffCount() {
    return this.GetConfig().BuffCount;
  }
  GetInstanceDungeonId() {
    return this.GetConfig().InstId;
  }
  GetInstanceDungeonFormationId() {
    return this.GetInstanceDungeonConfig().FightFormationId;
  }
  GetInstanceDungeonFormationNumb() {
    return ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
      this.GetInstanceDungeonFormationId(),
    ).LimitCount.length;
  }
  GetInstanceDungeonConfig() {
    var t = this.GetConfig().InstId;
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
  }
  ConvertToTeamInfo() {
    var t = new BossRushModel_1.BossRushTeamInfo(),
      e = (t.SetCurrentSelectLevel(this), []);
    for (const s of this.TSn) e.push(s.RoleId);
    return (
      t.SetCurrentTeamMembers(e),
      (t.LevelInfo = this),
      t.InitLevelBuff(this.ySn, this.ISn, this.xAn),
      t.InitPrepareSelectBuff(),
      (t.ActivityId = this.LOe),
      t
    );
  }
}
exports.BossRushLevelDetailInfo = BossRushLevelDetailInfo;
class BossRushLevelRewardData {
  constructor() {
    (this.LevelInfo = void 0), (this.RewardInfo = []);
  }
}
exports.BossRushLevelRewardData = BossRushLevelRewardData;
class BossRushData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.LSn = []),
      (this.DSn = []),
      (this.RSn = !1),
      (this.USn = !1),
      (this.naa = !1),
      (this.ASn = []),
      (this.PSn = []),
      (this.$8i = void 0),
      (this.xSn = (t, e) => {
        var s = this.wSn(t),
          i = this.wSn(e);
        return s === i ? t.Id - e.Id : i - s;
      }),
      (this.SNe = (t, e) => {
        var s = this.wSn(e),
          i = this.wSn(t);
        return s === i ? t.Id - e.Id : s - i;
      });
  }
  PhraseEx(t) {
    (this.PSn = t.Vps.dMs),
      this.PhraseLevelInfo(this.PSn, t.Vps.uMs),
      this.CheckIfNewBossRushOpen(),
      this.PhraseRewardInfo(t.Vps.cMs),
      (this.$8i = t);
  }
  RebuildData() {
    this.$8i && this.PhraseEx(this.$8i);
  }
  PhraseRewardInfo(t) {
    this.DSn = [];
    for (const s of t) {
      var e = this.BSn(s);
      this.DSn.push(e);
    }
    this.$8i && (this.$8i.Vps.cMs = t);
  }
  PhraseLevelInfo(t, e) {
    (this.ASn = []), (this.LSn = []);
    for (const i of e) {
      var s = new BossRushLevelDetailInfo();
      s.Phrase(this.Id, i, t), this.ASn.push(s);
      const e = this.bSn(s, i);
      this.LSn.push(e);
    }
    (this.LSn = this.LSn.reverse()),
      this.$8i && ((this.$8i.Vps.uMs = e), (this.$8i.Vps.dMs = t));
  }
  GetBossRushLevelDetailInfoById(t) {
    for (const e of this.ASn) if (e.GetId() === t) return e;
  }
  GetBossRushLevelDetailInfo() {
    return this.ASn;
  }
  GetExDataRedPointShowState() {
    return this.GetPreGuideQuestFinishState() && (this.RSn || this.qSn());
  }
  GetNewUnlockState() {
    return this.USn;
  }
  GetNewBuffState() {
    return this.naa;
  }
  qSn() {
    for (const t of this.DSn) if (1 === t.RewardState) return !0;
    for (const e of this.LSn) if (1 === e.RewardState) return !0;
    return !1;
  }
  GetUnlockedBuffIndices() {
    return this.PSn;
  }
  CheckIfNewBossRushOpen() {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        this.Id,
        0,
        this.Id,
        0,
        0,
      ),
      e = this.GSn(),
      t =
        ((this.RSn = t < e),
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.Id,
          0,
          this.Id,
          UNLOCKLOCALKEY,
          0,
        ));
    (this.USn = t < e),
      this.saa(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  saa() {
    this.naa = !1;
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        this.Id,
        0,
        this.Id,
        UNLOCKBUFFKEY,
        0,
      ),
      e = this.aaa();
    t < e &&
      0 < e &&
      (t = this.GetBossRushLevelDetailInfo()[e - 1]) &&
      t.GetConfig() &&
      (this.naa = 0 < t.GetConfig().UnlockBuff.length);
  }
  aaa() {
    let e = 0;
    var s = this.GetBossRushLevelDetailInfo(),
      i = s.length;
    for (let t = 0; t < i; t++) s[t].GetUnLockState() && (e = t);
    return e;
  }
  GSn() {
    let t = 0;
    for (const e of this.GetBossRushLevelDetailInfo())
      e.GetUnLockState() && t++;
    return t;
  }
  CacheNewBuffUnlock() {
    this.naa = !1;
    var t = this.aaa();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      this.Id,
      this.Id,
      UNLOCKBUFFKEY,
      0,
      t,
    ),
      this.saa();
  }
  CacheNewUnlock() {
    this.USn = !1;
    var t = this.GSn();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      this.Id,
      this.Id,
      UNLOCKLOCALKEY,
      0,
      t,
    ),
      this.CheckIfNewBossRushOpen();
  }
  CacheCurrentOpenBossNum() {
    var t = this.GSn();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      this.Id,
      this.Id,
      0,
      0,
      t,
    ),
      this.CheckIfNewBossRushOpen();
  }
  EntranceRedDot() {
    return this.GetExDataRedPointShowState();
  }
  HaveRewardCanTake() {
    return this.qSn();
  }
  GetRewardPopUpViewData() {
    return this.RebuildData(), this.GetRewardViewData();
  }
  GetRewardViewData() {
    var t = StringUtils_1.StringUtils.Format(
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushFullPoint"),
      this.GetFullScore().toString(),
    );
    return {
      DataPageList: [
        {
          DataList: this.LSn.sort(this.xSn),
          TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "BossRushLevelRewardText",
          ),
          TabTips: " ",
        },
        {
          DataList: this.DSn.sort(this.SNe),
          TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "BossRushScoreRewardText",
          ),
          TabTips: t,
        },
      ],
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
  GetFullScore() {
    let t = 0;
    for (const e of this.ASn) t += e.GetScore();
    return t;
  }
  BSn(t) {
    var e =
        ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushScoreConfigById(
          t.R6n,
        ),
      s = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "BossRushFullScoreTips",
        ),
        e.Score.toString(),
      );
    return {
      Id: t.R6n,
      NameText: s,
      RewardState: Number(t.vMs),
      ClickFunction: () => {
        BossRushController_1.BossRushController.RequestGetBossRushReward(
          this.Id,
          t.R6n,
          Protocol_1.Aki.Protocol.vks.mMs,
        );
      },
      RewardList: this.I2e(e.RewardId),
      RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        this.xbn(Number(t.vMs)),
      ),
    };
  }
  xbn(t) {
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
      s,
      i = [];
    for ([
      e,
      s,
    ] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(t))
      i.push([{ ItemId: e, IncId: 0 }, s]);
    return i;
  }
  bSn(t, e) {
    const s =
      ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushByActivityIdAndInstanceId(
        this.Id,
        e.X5n,
      );
    return {
      Id: t.GetId(),
      NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        s.LevelRewardDesc,
      ),
      RewardState: Number(e.fMs),
      ClickFunction: () => {
        BossRushController_1.BossRushController.RequestGetBossRushReward(
          this.Id,
          s.Id,
          Protocol_1.Aki.Protocol.vks.P6n,
        );
      },
      RewardList: this.I2e(s.RewardId),
      RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        this.xbn(Number(e.fMs)),
      ),
    };
  }
}
exports.BossRushData = BossRushData;
//# sourceMappingURL=BossRushData.js.map
