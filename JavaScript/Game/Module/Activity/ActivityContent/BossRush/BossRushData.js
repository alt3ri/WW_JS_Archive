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
  UNLOCKLOCALKEY = 100;
class BossRushLevelDetailInfo {
  constructor() {
    (this.LOe = 0),
      (this.xe = 0),
      (this.AAe = 0),
      (this.HUr = 0),
      (this.jUr = []),
      (this.WUr = []),
      (this.mRn = []),
      (this.KUr = []),
      (this.R2e = !1);
  }
  Phrase(t, e, s) {
    (this.LOe = t),
      this.SetId(e.vFn),
      this.SetScore(e.J0s),
      this.SetUnLockTime(e.JCs),
      (this.R2e = e.zCs),
      (this.jUr = []),
      (this.WUr = []),
      (this.mRn = []);
    for (const h of e.Z0s) {
      var i = new BossRushModel_1.BossRushBuffInfo();
      (i.BuffId = h.JFn),
        (i.Slot = h.zFn),
        (i.ChangeAble =
          h.ZFn !== Protocol_1.Aki.Protocol.ABs.KPs &&
          h.ZFn !== Protocol_1.Aki.Protocol.ABs.Proto_Inactive),
        (i.State = h.ZFn),
        this.jUr.push(i);
    }
    for (const u of this.GetConfig().OptionalBuff) {
      var r = new BossRushModel_1.BossRushBuffInfo();
      (r.BuffId = u), (r.Slot = -1), (r.ChangeAble = !0), this.mRn.push(r);
    }
    for (const l of s) {
      var o = new BossRushModel_1.BossRushBuffInfo();
      (o.BuffId = l), (o.Slot = -1), (o.ChangeAble = !0), this.WUr.push(o);
    }
    this.KUr = [];
    let n = 0;
    for (const c of e.z0s) {
      var a = new BossRushModel_1.BossRushRoleInfo();
      (a.RoleId = c), (a.Slot = n), n++, this.KUr.push(a);
    }
  }
  SetId(t) {
    this.xe = t;
  }
  SetScore(t) {
    this.AAe = t;
  }
  SetUnLockTime(t) {
    this.HUr = t;
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
    return this.R2e;
  }
  GetScore() {
    return this.AAe;
  }
  GetUnlockTimeText() {
    var t, e, s;
    return TimeUtil_1.TimeUtil.GetServerTime() < this.HUr
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
    return this.HUr;
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
    for (const s of this.KUr) e.push(s.RoleId);
    return (
      t.SetCurrentTeamMembers(e),
      (t.LevelInfo = this),
      t.InitLevelBuff(this.jUr, this.WUr, this.mRn),
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
      (this.QUr = []),
      (this.XUr = []),
      (this.$Ur = !1),
      (this.YUr = !1),
      (this.JUr = []),
      (this.zUr = []),
      (this.Y6i = void 0),
      (this.ZUr = (t, e) => {
        var s = this.UAr(t),
          i = this.UAr(e);
        return s === i ? t.Id - e.Id : i - s;
      }),
      (this.ENe = (t, e) => {
        var s = this.UAr(e),
          i = this.UAr(t);
        return s === i ? t.Id - e.Id : s - i;
      });
  }
  PhraseEx(t) {
    (this.zUr = t.T0s.Y0s),
      this.PhraseLevelInfo(this.zUr, t.T0s.Q0s),
      this.CheckIfNewBossRushOpen(),
      this.PhraseRewardInfo(t.T0s.X0s),
      (this.Y6i = t);
  }
  RebuildData() {
    this.Y6i && this.PhraseEx(this.Y6i);
  }
  PhraseRewardInfo(t) {
    this.XUr = [];
    for (const s of t) {
      var e = this.PAr(s);
      this.XUr.push(e);
    }
    this.Y6i && (this.Y6i.T0s.X0s = t);
  }
  PhraseLevelInfo(t, e) {
    (this.JUr = []), (this.QUr = []);
    for (const i of e) {
      var s = new BossRushLevelDetailInfo();
      s.Phrase(this.Id, i, t), this.JUr.push(s);
      const e = this.xAr(s, i);
      this.QUr.push(e);
    }
    (this.QUr = this.QUr.reverse()),
      this.Y6i && ((this.Y6i.T0s.Q0s = e), (this.Y6i.T0s.Y0s = t));
  }
  GetBossRushLevelDetailInfoById(t) {
    for (const e of this.JUr) if (e.GetId() === t) return e;
  }
  GetBossRushLevelDetailInfo() {
    return this.JUr;
  }
  GetExDataRedPointShowState() {
    return this.GetPreGuideQuestFinishState() && (this.$Ur || this.wAr());
  }
  GetNewUnlockState() {
    return this.YUr;
  }
  wAr() {
    for (const t of this.XUr) if (1 === t.RewardState) return !0;
    for (const e of this.QUr) if (1 === e.RewardState) return !0;
    return !1;
  }
  GetUnlockedBuffIndices() {
    return this.zUr;
  }
  CheckIfNewBossRushOpen() {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        this.Id,
        0,
        this.Id,
        0,
        0,
      ),
      e = this.BAr(),
      t =
        ((this.$Ur = t < e),
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.Id,
          0,
          this.Id,
          UNLOCKLOCALKEY,
          0,
        ));
    (this.YUr = t < e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  BAr() {
    let t = 0;
    for (const e of this.GetBossRushLevelDetailInfo())
      e.GetUnLockState() && t++;
    return t;
  }
  CacheNewUnlock() {
    this.YUr = !1;
    var t = this.BAr();
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
    var t = this.BAr();
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
    return this.wAr();
  }
  GetRewardViewData() {
    var t = StringUtils_1.StringUtils.Format(
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushFullPoint"),
      this.GetFullScore().toString(),
    );
    return {
      DataPageList: [
        {
          DataList: this.QUr.sort(this.ZUr),
          TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "BossRushLevelRewardText",
          ),
          TabTips: " ",
        },
        {
          DataList: this.XUr.sort(this.ENe),
          TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "BossRushScoreRewardText",
          ),
          TabTips: t,
        },
      ],
    };
  }
  UAr(t) {
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
    for (const e of this.JUr) t += e.GetScore();
    return t;
  }
  PAr(t) {
    var e =
        ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushScoreConfigById(
          t.t3n,
        ),
      s = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "BossRushFullScoreTips",
        ),
        e.Score.toString(),
      );
    return {
      Id: t.t3n,
      NameText: s,
      RewardState: Number(t.tgs),
      ClickFunction: () => {
        BossRushController_1.BossRushController.RequestGetBossRushReward(
          this.Id,
          t.t3n,
          Protocol_1.Aki.Protocol.PBs.J0s,
        );
      },
      RewardList: this.ake(e.RewardId),
      RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        this.dwn(Number(t.tgs)),
      ),
    };
  }
  dwn(t) {
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
  ake(t) {
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
  xAr(t, e) {
    const s =
      ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushByActivityIdAndInstanceId(
        this.Id,
        e.vFn,
      );
    return {
      Id: t.GetId(),
      NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        s.LevelRewardDesc,
      ),
      RewardState: Number(e.egs),
      ClickFunction: () => {
        BossRushController_1.BossRushController.RequestGetBossRushReward(
          this.Id,
          s.Id,
          Protocol_1.Aki.Protocol.PBs.r3n,
        );
      },
      RewardList: this.ake(s.RewardId),
      RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        this.dwn(Number(e.egs)),
      ),
    };
  }
}
exports.BossRushData = BossRushData;
//# sourceMappingURL=BossRushData.js.map
