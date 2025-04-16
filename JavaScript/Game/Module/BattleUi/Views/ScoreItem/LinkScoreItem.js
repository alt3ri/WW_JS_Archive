"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LinkScoreItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  BaseScoreItem_1 = require("./BaseScoreItem"),
  LINK_SCORE_GROUP_ID = 2,
  SCORE_NIAGARA_PATH =
    "/Game/Aki/Effect/UI/Niagaras/RouGe/NS_Fx_LGUI_WhiteCat_Button_Panner.NS_Fx_LGUI_WhiteCat_Button_Panner",
  MAX_SMOOTH_TIME = 200;
class LinkScoreItem extends BaseScoreItem_1.BaseScoreItem {
  constructor() {
    super(...arguments),
      (this.SPe = void 0),
      (this.wIn = void 0),
      (this.oel = void 0),
      (this.edt = void 0),
      (this.Nll = void 0),
      (this.nel = !1),
      (this.sel = !1),
      (this.ael = 0),
      (this.lel = 0),
      (this.hel = 0),
      (this.xte = 0),
      (this._el = 0),
      (this.yBn = void 0),
      (this.SBn = void 0),
      (this.IBn = void 0),
      (this.TBn = void 0),
      (this.oTn = (t, e) => {
        this.IsValidScore(t)
          ? (this.IsHideOrHiding && this.ShowScore(),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                67,
                "Link评分变化",
                ["scoreId", t],
                ["score", e],
              ),
            e < this.IBn.LowerUpperLimits[0]
              ? (this.SBn = void 0)
              : e >= this.TBn.LowerUpperLimits[1]
                ? (this.SBn = this.TBn)
                : (this.SBn = this.IBn),
            this.SIn(e, this.SBn))
          : this.IsShowOrShowing && this.HideScore();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UINiagara],
      [1, UE.UIItem],
    ];
  }
  async OnCreateAsync() {
    await this.YIn(SCORE_NIAGARA_PATH);
  }
  OnStart() {
    super.OnStart(),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.oel = this.GetUiNiagara(0)),
      this.wIn &&
        (this.oel?.SetUIActive(!1), this.oel?.SetNiagaraSystem(this.wIn)),
      (this.edt = this.GetItem(1)),
      (this.Nll = new UE.Rotator(0, 0, 0));
    var t,
      e,
      i = ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()
        ? ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.CycleId
        : LINK_SCORE_GROUP_ID;
    (this.yBn =
      ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(
        i,
      )),
      this.rTn();
    for ([t, e] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap())
      0 < e && this.oTn(t, e);
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleScoreChanged,
      this.oTn,
    );
  }
  OnBeforeDestroy() {
    this.SPe?.Clear(),
      (this.SPe = void 0),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleScoreChanged,
        this.oTn,
      ),
      super.OnBeforeDestroy();
  }
  async YIn(t) {
    const e = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.NiagaraSystem,
        (t) => {
          (this.wIn = t), e.SetResult();
        },
        103,
      ),
      e.Promise
    );
  }
  SIn(t, e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        67,
        "Link评分UI更新",
        ["score", t],
        ["level", e?.Level],
      ),
      (this.nel = !!e),
      this.uel(t),
      this.IsShowOrShowing
        ? t >= this.xte && !this.sel
          ? ((this.sel = !0),
            this.SPe?.StopSequenceByKey("Restart"),
            this.SPe?.PlaySequencePurely("Full"))
          : t !== this.xte &&
            this.sel &&
            ((this.sel = !1),
            this.SPe?.StopSequenceByKey("Full"),
            this.SPe?.PlaySequencePurely("Restart"))
        : this.ShowScore();
  }
  OnTick(t) {
    LinkScoreItem.Ult.Start(),
      this.nel &&
        this.hel !== this.lel &&
        this.GetActive() &&
        ((this._el = Math.min(MAX_SMOOTH_TIME, this._el + t)),
        (t = this._el / MAX_SMOOTH_TIME),
        (this.hel = this.ael * (1 - t) + this.lel * t),
        0 < this.xte) &&
        ((t = this.hel / this.xte),
        this.oel?.SetNiagaraVarFloat("Dissolve", t),
        (this.Nll.Yaw = -360 * t),
        this.edt?.SetUIRelativeRotation(this.Nll)),
      LinkScoreItem.Ult.Stop();
  }
  uel(t) {
    0 < t
      ? ((this.ael = this.hel), (this.lel = t), (this._el = 0))
      : ((this.ael = this.hel), (this.lel = 0), (this._el = MAX_SMOOTH_TIME));
  }
  rTn() {
    if (((this.IBn = void 0), (this.TBn = void 0), this.yBn)) {
      let t = MathUtils_1.MathUtils.Int32Max,
        e = 0;
      for (const s of this.yBn) {
        var i = s.Level;
        t > i && ((t = i), (this.IBn = s)), e < i && ((e = i), (this.TBn = s));
      }
      (this.xte = this.TBn.LowerUpperLimits[0]),
        this.xte <= 0 &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 67, "Link评分最大值不合法", [
            "MaxScore",
            this.xte,
          ]);
    }
  }
  IsValidScore(t) {
    t = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(t, !0);
    return !(!t || (4 !== t.Type && 7 !== t.Type));
  }
  ShowScore() {
    super.ShowScore(),
      this.Show(),
      this.oel?.SetUIActive(!0),
      this.oel?.ActivateSystem(!0),
      this.SPe?.StopCurrentSequence(),
      this.SPe?.PlaySequencePurely("Start");
  }
  HideScore() {
    super.HideScore(),
      this.oel?.SetUIActive(!1),
      this.SPe?.StopCurrentSequence(),
      this.SPe?.PlaySequenceAsync(
        "Close",
        new CustomPromise_1.CustomPromise(),
      ).then(() => {
        this.IsScoreEnable || this.Hide();
      });
  }
}
(exports.LinkScoreItem = LinkScoreItem).Ult = Stats_1.Stat.Create(
  "[BattleView]LinkScoreItemTick",
);
//# sourceMappingURL=LinkScoreItem.js.map
