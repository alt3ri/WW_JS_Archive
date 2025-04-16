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
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityCommonDefine_1 = require("../../ActivityCommonDefine"),
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
      (this.tll = []),
      (this.ill = []),
      (this.TSn = []),
      (this.jFe = !1);
  }
  Phrase(t, e, s) {
    (this.LOe = t),
      this.SetId(e.r6n),
      this.SetScore(e.SMs),
      this.SetUnLockTime(e.Mps),
      (this.jFe = e.Sps),
      (this.ySn = []),
      (this.ISn = []),
      (this.xAn = []),
      (this.tll = []),
      (this.ill = []);
    for (const _ of e.yMs) {
      var i = new BossRushModel_1.BossRushBuffInfo();
      (i.BuffId = _.b6n),
        (i.Slot = _.q6n),
        (i.ChangeAble =
          _.G6n !== Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked &&
          _.G6n !== Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive),
        (i.State = _.G6n),
        this.ySn.push(i);
    }
    for (const c of this.GetConfig().OptionalBuff) {
      var r = new BossRushModel_1.BossRushBuffInfo();
      (r.BuffId = c), (r.Slot = -1), (r.ChangeAble = !0), this.xAn.push(r);
    }
    for (const v of s) {
      var n = new BossRushModel_1.BossRushBuffInfo();
      (n.BuffId = v), (n.Slot = -1), (n.ChangeAble = !0), this.ISn.push(n);
    }
    let a = 1;
    for (const d of e.Zal) {
      var o = new BossRushModel_1.BossRushBuffInfo();
      (o.BuffId = d),
        (o.Slot = a++),
        (o.ChangeAble = !0),
        (o.State = Protocol_1.Aki.Protocol.Iks.Proto_BuffSelected),
        this.tll.push(o);
    }
    for (let t = a; t <= 2; t++) {
      var h = new BossRushModel_1.BossRushBuffInfo();
      (h.BuffId = 0),
        (h.Slot = a++),
        (h.ChangeAble = this.GetConfig().ScoreBuffCount >= t),
        (h.State =
          this.GetConfig().ScoreBuffCount >= t
            ? Protocol_1.Aki.Protocol.Iks.Proto_BuffEmpty
            : Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive),
        this.tll.push(h);
    }
    for (const R of this.GetConfig().ScoreBuff) {
      var u = new BossRushModel_1.BossRushBuffInfo();
      (u.BuffId = R), (u.Slot = -1), (u.ChangeAble = !0), this.ill.push(u);
    }
    this.TSn = [];
    let l = 0;
    for (const g of e.EMs) {
      var f = new BossRushModel_1.BossRushRoleInfo();
      (f.RoleId = g), (f.Slot = l), l++, this.TSn.push(f);
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
  GetLevelDesc() {
    return this.GetConfig().LevelDesc;
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
    var t, e;
    return TimeUtil_1.TimeUtil.GetServerTime() < this.SSn
      ? ((t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(
          this.GetUnLockTime() - TimeUtil_1.TimeUtil.GetServerTime(),
        )),
        (e =
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "BossRushUnLockTime",
          )),
        StringUtils_1.StringUtils.Format(e, t.CountDownText))
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
    return 0 ===
      ModelManager_1.ModelManager.BossRushModel.CurrentSelectBuffTabName
      ? this.GetConfig().BuffCount
      : this.GetConfig().ScoreBuffCount;
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
      t.InitLevelBuff(this.ySn, this.ISn, this.xAn, this.tll, this.ill),
      t.InitPrepareSelectBuff(),
      t.InitPrepareSelectScoreBuff(),
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
      (this.rll = new Map()),
      (this.sOn = new Map()),
      (this.TB_ = new Map()),
      (this.DSn = []),
      (this.RSn = !1),
      (this.USn = !1),
      (this.s1a = !1),
      (this.ASn = []),
      (this.PSn = []),
      (this.$8i = void 0),
      (this.bB_ = new Map()),
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
    (this.PSn = t.Xps.MMs),
      this.PhraseLevelInfo(this.PSn, t.Xps.vMs),
      this.CheckIfNewBossRushOpen(),
      this.PhraseRewardInfo(t.Xps.pMs),
      this.RefreshTaskData(t.Xps.E$s),
      (this.$8i = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BossRushDataUpdate,
      ),
      UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
          this.GetRewardViewData(),
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BossRefreshBossRushRewardRedDot,
        this.Id,
      );
  }
  RefreshSingleTaskData(e) {
    let s = this.sOn.get(e.s5n);
    if (!s) {
      s = new ActivityCommonDefine_1.ActivityTaskData();
      var i =
        ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushTaskConfig(
          e.s5n,
        ).TabId;
      let t = this.TB_.get(i);
      (t = t || []).push(s), this.TB_.set(i, t);
    }
    s.Refresh(e), this.sOn.set(e.s5n, s);
  }
  RefreshTaskData(t) {
    for (const e of t) this.RefreshSingleTaskData(e);
  }
  GetFinishTaskCount() {
    let t = 0;
    for (const e of this.sOn.values())
      (0 !== e.Status && 2 !== e.Status) || t++;
    return t;
  }
  GetAllTaskCount() {
    return this.sOn.size;
  }
  GetBossRushAllTabData() {
    var t =
        ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushTabListByActivityId(
          this.Id,
        ),
      e = new Array();
    for (const s of t) e.push(s);
    return e;
  }
  GetTabRedDotState(t) {
    t = this.TB_.get(t);
    if (t) for (const e of t) if (0 === e.Status) return !0;
    return !1;
  }
  RebuildData() {
    this.$8i && this.PhraseEx(this.$8i);
  }
  SetInsSelectedBuffIdMap(t, e) {
    this.bB_.set(t, e);
  }
  GetInsSelectedBuffId(t) {
    return this.bB_.get(t) ?? [];
  }
  PhraseRewardInfo(t) {
    this.DSn = [];
    for (const s of t) {
      var e = this.BSn(s);
      this.DSn.push(e);
    }
    this.$8i && (this.$8i.Xps.pMs = t);
  }
  PhraseLevelInfo(t, e) {
    (this.ASn = []), (this.LSn = []), this.rll.clear();
    for (const i of e) {
      var s = new BossRushLevelDetailInfo();
      s.Phrase(this.Id, i, t), this.ASn.push(s);
      const e = this.bSn(s, i);
      this.LSn.push(...e), this.rll.set(s.GetId(), e);
    }
    (this.LSn = this.LSn.reverse()),
      this.$8i && ((this.$8i.Xps.vMs = e), (this.$8i.Xps.MMs = t));
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
    return this.s1a;
  }
  qSn() {
    for (const t of this.sOn.values()) if (0 === t.Status) return !0;
    return !1;
  }
  oll(t) {
    for (const e of this.LSn) if (e.Id === t && 1 === e.RewardState) return !0;
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
      this.a1a(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  a1a() {
    this.s1a = !1;
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        this.Id,
        0,
        this.Id,
        UNLOCKBUFFKEY,
        0,
      ),
      e = this.h1a();
    t < e &&
      0 < e &&
      (t = this.GetBossRushLevelDetailInfo()[e - 1]) &&
      t.GetConfig() &&
      (this.s1a = 0 < t.GetConfig().UnlockBuff.length);
  }
  h1a() {
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
    this.s1a = !1;
    var t = this.h1a();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      this.Id,
      this.Id,
      UNLOCKBUFFKEY,
      0,
      t,
    ),
      this.a1a();
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
  HaveLevelRewardCanTake(t) {
    return this.oll(t);
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
      Source: "BossRush",
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
          t.N6n,
        ),
      s = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "BossRushFullScoreTips",
        ),
        e.Score.toString(),
      );
    return {
      Id: t.N6n,
      NameText: s,
      RewardState: Number(t.TMs),
      ClickFunction: () => {
        BossRushController_1.BossRushController.RequestGetBossRushReward(
          this.Id,
          t.N6n,
          Protocol_1.Aki.Protocol.Tks.SMs,
        );
      },
      RewardList: this.I2e(e.RewardId),
      RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        this.kbn(Number(t.TMs)),
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
      s,
      i = [];
    for ([
      e,
      s,
    ] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(t))
      i.push([{ ItemId: e, IncId: 0 }, s]);
    return i;
  }
  bSn(e, s) {
    const i =
      ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushByActivityIdAndInstanceId(
        this.Id,
        s.r6n,
      );
    var r = [];
    for (let t = 0; t < s.YM_.length; t++) {
      var n = s.YM_[t],
        a = i.LevelScoreRewardList[t],
        a = {
          Id: e.GetId(),
          NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            i.LevelRewardDesc,
          ),
          NameTextArgs: ["" + a?.Item1, "" + s.SMs],
          RewardState: Number(n),
          ClickFunction: () => {
            BossRushController_1.BossRushController.RequestGetBossRushLevelReward(
              this.Id,
              i.Id,
              i.InstId,
              t++,
            );
          },
          RewardList: this.I2e(a.Item2),
          RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            this.kbn(Number(n)),
          ),
        };
      r.push(a);
    }
    return r;
  }
  LB_(t) {
    var e = t.Status,
      s = t.Current,
      i = t.Target,
      r = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushTaskConfig(
        t.Id,
      );
    return {
      Id: t.Id,
      NameText: StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.Title),
        i.toString(),
      ),
      NameTextArgs: ["" + s, "" + i],
      RewardState: ActivityCommonDefine_1.taskStateToRewardStateResolver[e],
      ClickFunction: () => {
        BossRushController_1.BossRushController.RequestBossRushTaskReward(t.Id);
      },
      RewardList: this.I2e(r.DropId),
      RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        this.kbn(ActivityCommonDefine_1.taskStateToRewardStateResolver[e]),
      ),
    };
  }
  GetTabRewardData(t) {
    if (0 === t) return [];
    t = this.TB_.get(t);
    if (!t) return [];
    var e = [];
    for (const i of t) {
      var s = this.LB_(i);
      e.push(s);
    }
    return e.sort(this.SNe);
  }
  GetRewardByLevelId(t) {
    return this.rll.get(t ?? 0) ?? [];
  }
  SetRewardStateClaimed(t, e) {
    var t = this.rll.get(t);
    t && (t = t[e]) && (t.RewardState = 2);
  }
}
exports.BossRushData = BossRushData;
//# sourceMappingURL=BossRushData.js.map
