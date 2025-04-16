"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkScoreItem = void 0);
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
  DREAM_LINK_SCORE_GROUP_ID = 4,
  SCORE_LEVEL_UP_NIAGARA_PATH =
    "/Game/Aki/Effect/UI/Niagaras/RouGe/NS_Fx_LGUI_RouGeIcon_Brust_Weak.NS_Fx_LGUI_RouGeIcon_Brust_Weak",
  SCORE_FULL_NIAGARA_PATH =
    "/Game/Aki/Effect/UI/Niagaras/RouGe/NS_Fx_LGUI_RouGeIcon_Brust.NS_Fx_LGUI_RouGeIcon_Brust",
  MAX_SMOOTH_TIME = 200;
class DreamLinkScoreItem extends BaseScoreItem_1.BaseScoreItem {
  constructor() {
    super(...arguments),
      (this.SPe = void 0),
      (this.T1l = void 0),
      (this.L1l = void 0),
      (this.wIn = void 0),
      (this.R1l = void 0),
      (this.edt = void 0),
      (this.xvi = void 0),
      (this.Nll = void 0),
      (this.nel = !1),
      (this.ael = 0),
      (this.lel = 0),
      (this.hel = 0),
      (this.xte = 0),
      (this._el = 0),
      (this.U1l = 0),
      (this.yBn = void 0),
      (this.SBn = void 0),
      (this.IBn = void 0),
      (this.TBn = void 0),
      (this.D1l = void 0),
      (this.A1l = void 0),
      (this.x1l = 0),
      (this.oTn = (t, i) => {
        if (this.IsValidScore(t)) {
          if (
            (this.IsHideOrHiding && this.ShowScore(),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                67,
                "DreamLink评分变化",
                ["scoreId", t],
                ["score", i],
              ),
            i < this.IBn.LowerUpperLimits[0])
          )
            this.SBn = void 0;
          else if (i >= this.TBn.LowerUpperLimits[1]) this.SBn = this.TBn;
          else if (((this.SBn = void 0), this.yBn))
            for (const s of this.yBn)
              if (i >= s.LowerUpperLimits[0] && i < s.LowerUpperLimits[1]) {
                this.SBn = s;
                break;
              }
          this.SIn(i, this.SBn);
        } else this.IsShowOrShowing && this.HideScore();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UINiagara],
    ];
  }
  async OnCreateAsync() {
    await this.YIn(SCORE_LEVEL_UP_NIAGARA_PATH, 0),
      await this.YIn(SCORE_FULL_NIAGARA_PATH, 1);
  }
  OnStart() {
    super.OnStart(),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.wIn = this.GetUiNiagara(6)),
      this.wIn?.SetUIActive(!1),
      (this.R1l = [this.GetSprite(2), this.GetSprite(1), this.GetSprite(0)]),
      this.P1l(),
      this.GetSprite(3)?.SetUIActive(!1),
      (this.xvi = this.GetText(5)),
      this.xvi?.SetText("0%"),
      (this.edt = this.GetItem(4)),
      (this.Nll = new UE.Rotator(0, 0, 0)),
      (this.yBn =
        ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(
          DREAM_LINK_SCORE_GROUP_ID,
        )),
      this.rTn();
    for (var [
      t,
      i,
    ] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap())
      0 < i && this.oTn(t, i);
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
  async YIn(t, i) {
    const s = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.NiagaraSystem,
        (t) => {
          0 === i ? (this.L1l = t) : 1 === i && (this.T1l = t), s.SetResult();
        },
        103,
      ),
      s.Promise
    );
  }
  SIn(t, i) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        67,
        "DreamLink评分UI更新",
        ["score", t],
        ["level", i?.Level],
      ),
      (this.nel = !!i),
      this.uel(t),
      0 < this.xte &&
        ((i = Math.floor((t / this.xte) * 100)), this.xvi?.SetText(i + "%"));
  }
  OnTick(t) {
    if (
      (DreamLinkScoreItem.Ult.Start(),
      this.nel && this.hel !== this.lel && this.GetActive())
    ) {
      this._el = Math.min(MAX_SMOOTH_TIME, this._el + t);
      t = this._el / MAX_SMOOTH_TIME;
      if (((this.hel = this.ael * (1 - t) + this.lel * t), 0 < this.xte)) {
        var i = this.hel / this.xte,
          t = this.U1l;
        if (this.R1l)
          for (let t = 0; t < this.R1l.length; t++) {
            var s = this.R1l[t];
            t < this.U1l ||
              (this.hel >= this.D1l[t] &&
                (this.hel < this.D1l[t + 1]
                  ? ((this.U1l = t), s.SetFillAmount(i))
                  : (this.hel === this.D1l[this.x1l] && (this.U1l = this.x1l),
                    s.SetFillAmount(this.A1l[t + 1]))));
          }
        t < this.U1l &&
          (this.U1l < this.x1l
            ? this.wIn?.SetNiagaraSystem(this.L1l)
            : this.wIn?.SetNiagaraSystem(this.T1l),
          this.wIn?.SetUIActive(!0),
          this.wIn?.ActivateSystem(!0)),
          (this.Nll.Yaw = -360 * i),
          this.edt?.SetUIRelativeRotation(this.Nll);
      }
    }
    DreamLinkScoreItem.Ult.Stop();
  }
  uel(t) {
    0 < t
      ? ((this.ael = this.hel), (this.lel = t), (this._el = 0))
      : ((this.ael = this.hel),
        (this.lel = 0),
        (this._el = MAX_SMOOTH_TIME),
        this.P1l());
  }
  P1l() {
    if (((this.U1l = 0), this.R1l))
      for (const t of this.R1l) t.SetFillAmount(0);
  }
  rTn() {
    if (
      ((this.IBn = void 0),
      (this.TBn = void 0),
      (this.D1l = []),
      (this.A1l = []),
      this.yBn && 0 !== this.yBn.length)
    ) {
      let t = MathUtils_1.MathUtils.Int32Max,
        i = 0;
      for (const e of this.yBn) {
        var s = e.Level;
        t > s && ((t = s), (this.IBn = e)),
          i < s && ((i = s), (this.TBn = e)),
          this.D1l.push(e.LowerUpperLimits[0]);
      }
      if (
        ((this.x1l = this.D1l.length - 1),
        (this.xte = this.TBn.LowerUpperLimits[1]),
        0 < this.xte)
      )
        for (const h of this.D1l) this.A1l.push(h / this.xte);
      else
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 67, "DreamLink评分最大值不合法", [
            "MaxScore",
            this.xte,
          ]);
    } else
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 67, "DreamLink评分配置缺失");
  }
  IsValidScore(t) {
    t = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(t, !0);
    return !(!t || 5 !== t.Type);
  }
  ShowScore() {
    super.ShowScore(), this.Show();
  }
  HideScore() {
    super.HideScore(), this.Hide();
  }
}
(exports.DreamLinkScoreItem = DreamLinkScoreItem).Ult = Stats_1.Stat.Create(
  "[BattleView]DreamLinkScoreItemTick",
);
//# sourceMappingURL=DreamLinkScoreItem.js.map
