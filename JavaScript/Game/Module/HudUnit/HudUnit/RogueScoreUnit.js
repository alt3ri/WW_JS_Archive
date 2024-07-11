"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueScoreUnit = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  Time_1 = require("../../../../Core/Common/Time"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  CurveUtils_1 = require("../../../../Core/Utils/Curve/CurveUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  HudUnitBase_1 = require("../HudUnitBase"),
  RogueScoreMachine_1 = require("./RogueScoreMachine"),
  filledAmount = new UE.FName("FilledAmount"),
  fillColor = new UE.FName("FillColor"),
  flowColorA = new UE.FName("FlowColorA"),
  flowColorB = new UE.FName("FlowColorB"),
  globalInt = new UE.FName("GlobalInt"),
  rgbSplitProgress = new UE.FName("RGBSplit_Progress"),
  UP_ANIM_TIME = 600,
  HALF_UP_ANIM_TIME = 0,
  UP_EFFECT_TIME = 100,
  scoreTexturePathList = [
    "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreD.T_FightScoreD",
    "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreC.T_FightScoreC",
    "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreB.T_FightScoreB",
    "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreA.T_FightScoreA",
    "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreS.T_FightScoreS",
    "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreSS.T_FightScoreSS",
  ],
  scoreBgTexturePathList = [
    "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgD.T_FightScoreBgD",
    "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgC.T_FightScoreBgC",
    "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgB.T_FightScoreBgB",
    "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgA.T_FightScoreBgA",
    "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgS.T_FightScoreBgS",
    "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgSS.T_FightScoreBgSS",
  ],
  fillColorList = [
    new UE.LinearColor(0.0118, 0.2588, 1, 0.5255),
    new UE.LinearColor(0.0118, 0.2588, 1, 0.5255),
    new UE.LinearColor(1, 0.2588, 0.5961, 0.5255),
    new UE.LinearColor(1, 0.2588, 0.5961, 0.5255),
    new UE.LinearColor(1, 0.5725, 0.1098, 0.651),
    new UE.LinearColor(1, 0.5725, 0.1098, 0.651),
  ],
  flowColorListA = [
    new UE.LinearColor(0.451, 0.5922, 0.949, 1),
    new UE.LinearColor(0.451, 0.5922, 0.949, 1),
    new UE.LinearColor(1, 0.2824, 0.7098, 1),
    new UE.LinearColor(1, 0.2824, 0.7098, 1),
    new UE.LinearColor(1, 0.8588, 0.7451, 1),
    new UE.LinearColor(1, 0.8588, 0.7451, 1),
  ],
  flowColorListB = [
    new UE.LinearColor(0.5686, 0.6196, 0.702, 0.0941),
    new UE.LinearColor(0.5686, 0.6196, 0.702, 0.0941),
    new UE.LinearColor(0.7255, 0.5451, 0.5451, 0.0941),
    new UE.LinearColor(0.7255, 0.5451, 0.5451, 0.0941),
    new UE.LinearColor(0.7255, 0.6471, 0.1882, 0.0941),
    new UE.LinearColor(0.7255, 0.6471, 0.1882, 0.0941),
  ],
  scoreNiagaraPathList = [
    "/Game/Aki/Effect/UI/Niagaras/RouGe/PingFen/NS_Fx_LGUI_Rouge_CD.NS_Fx_LGUI_Rouge_CD",
    "/Game/Aki/Effect/UI/Niagaras/RouGe/PingFen/NS_Fx_LGUI_Rouge_AB.NS_Fx_LGUI_Rouge_AB",
    "/Game/Aki/Effect/UI/Niagaras/RouGe/PingFen/NS_Fx_LGUI_Rouge_S.NS_Fx_LGUI_Rouge_S",
    "/Game/Aki/Effect/UI/Niagaras/RouGe/PingFen/NS_Fx_LGUI_Rouge_S02.NS_Fx_LGUI_Rouge_S02",
  ],
  SHADER_PATH =
    "/Game/Aki/Render/Shaders/UI/MPC_RGBSplitGlitch_FightScore.MPC_RGBSplitGlitch_FightScore",
  scoreNiagaraIndexList = [0, 0, 1, 1, 2, 3],
  sequenceNameList = [
    "StartD",
    "StartC",
    "StartB",
    "StartA",
    "StartS",
    "StartSS",
  ],
  musicStateList = ["none", "d", "c", "b", "a", "s", "ss"];
class RogueScoreUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.IIn = 0),
      (this.CBn = void 0),
      (this.RIn = new RogueScoreMachine_1.RogueScoreMachine()),
      (this.SPe = void 0),
      (this.UIn = void 0),
      (this.AIn = void 0),
      (this.PIn = void 0),
      (this.xIn = void 0),
      (this.wIn = void 0),
      (this.BIn = -1),
      (this.XIt = []),
      (this.bIn = -1),
      (this.qIn = []),
      (this.GIn = []),
      (this.NIn = []),
      (this.OIn = !1),
      (this.kIn = !1),
      (this.FIn = CurveUtils_1.CurveUtils.DefaultPara),
      (this.VIn = 0),
      (this.Cnt = void 0),
      (this.zRn = -1),
      (this.HIn = (t, i) => {
        var e;
        if (
          this.IIn !== t &&
          ((this.IIn = t),
          this.CBn !== i &&
            ((s = this.CBn?.Level ?? 0),
            (e = void 0 !== this.CBn),
            (this.CBn = i),
            this.CBn
              ? (this.jIn(this.CBn.Level),
                this.WIn(this.CBn.Level),
                this.KIn(this.CBn.Level),
                this.QIn(this.CBn.Level),
                this.XZi(this.CBn.Level, this.CBn.Level > s),
                e && this.XIn(this.CBn.Level))
              : (this.SetVisible(!1), this.XZi(0, !1))),
          this.CBn)
        ) {
          var i = this.CBn.LowerUpperLimits[0],
            s = this.CBn.LowerUpperLimits[1];
          let e = 0;
          (e = s === i ? 1 : ((e = (t - i) / (s - i)), Math.min(e, 1))),
            this.Fst(e);
        }
      }),
      (this.yIn = () => {
        (this.kIn = !0),
          (this.VIn = Time_1.Time.Now),
          (this.zRn = UP_EFFECT_TIME),
          this.ZRn(1);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UINiagara],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ];
  }
  async OnCreateAsync() {
    var t = [];
    for (let e = 0; e < scoreTexturePathList.length; e++)
      t.push(this.$In(scoreTexturePathList[e], e, this.qIn));
    for (let e = 0; e < scoreBgTexturePathList.length; e++)
      t.push(this.$In(scoreBgTexturePathList[e], e, this.GIn));
    for (let e = 0; e < scoreNiagaraPathList.length; e++)
      t.push(this.YIn(scoreNiagaraPathList[e], e, this.NIn));
    t.push(this.eUn(SHADER_PATH)), await Promise.all(t);
  }
  async $In(e, t, i) {
    const s = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.Texture,
        (e) => {
          (i[t] = e), s.SetResult();
        },
        103,
      ),
      s.Promise
    );
  }
  async YIn(e, t, i) {
    const s = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.NiagaraSystem,
        (e) => {
          (i[t] = e), s.SetResult();
        },
        103,
      ),
      s.Promise
    );
  }
  async eUn(e) {
    const t = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.MaterialParameterCollection,
        (e) => {
          (this.Cnt = e), t.SetResult();
        },
        103,
      ),
      t.Promise
    );
  }
  OnStart() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "[RogueScoreUnit]OnStart"),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.UIn = this.GetTexture(0)),
      (this.AIn = this.UIn.GetOwner().GetComponentByClass(
        UE.UITextureTransitionComponent.StaticClass(),
      )),
      (this.PIn = this.GetTexture(1)),
      (this.xIn = this.PIn.GetOwner().GetComponentByClass(
        UE.UITextureTransitionComponent.StaticClass(),
      )),
      (this.wIn = this.GetUiNiagara(2));
    for (let e = 3; e <= 8; e++) {
      var t = this.GetItem(e);
      this.XIt.push(t);
    }
    this.RIn.SetUpdateCallback(this.HIn, this.yIn);
  }
  OnBeforeDestroy() {
    this.SPe.Clear(), (this.SPe = void 0);
  }
  async OnShowAsyncImplementImplement() {
    (this.OIn = !0),
      await this.SPe.PlaySequenceAsync(
        "Start",
        new CustomPromise_1.CustomPromise(),
      ),
      (this.OIn = !1);
  }
  async OnBeforeHideAsync() {
    await this.SPe.PlaySequenceAsync(
      "Close",
      new CustomPromise_1.CustomPromise(),
    );
  }
  UpdateScore(e, t) {
    (this.IsShowOrShowing || this.IsHideOrHiding) &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          18,
          "肉鸽战斗评分UI更新",
          ["score", e],
          ["level", t?.Level],
        ),
      this.RIn.UpdateTargetScore(e, t));
  }
  jIn(e) {
    e = this.qIn[e - 1];
    this.UIn.SetTexture(e),
      this.AIn?.SetAllStateTexture(e),
      this.UIn.SetSizeFromTexture();
  }
  WIn(e) {
    var t = this.GIn[e - 1];
    this.PIn.SetTexture(t),
      this.xIn?.SetAllStateTexture(t),
      this.PIn.SetSizeFromTexture(),
      this.PIn.SetCustomMaterialVectorParameter(
        fillColor,
        fillColorList[e - 1],
      ),
      this.PIn.SetCustomMaterialVectorParameter(
        flowColorA,
        flowColorListA[e - 1],
      ),
      this.PIn.SetCustomMaterialVectorParameter(
        flowColorB,
        flowColorListB[e - 1],
      );
  }
  KIn(e) {
    var e = scoreNiagaraIndexList[e - 1];
    this.BIn !== e &&
      ((this.BIn = e),
      (e = this.NIn[e]),
      this.wIn.SetNiagaraSystem(e),
      this.wIn.ActivateSystem(!0));
  }
  QIn(e) {
    e -= 1;
    this.bIn !== e &&
      (0 <= this.bIn && this.XIt[this.bIn].SetUIActive(!1),
      0 <= e && this.XIt[e].SetUIActive(!0),
      (this.bIn = e));
  }
  XZi(e, t) {
    (ModelManager_1.ModelManager.BattleScoreModel.RougeScoreMusicState.State =
      musicStateList[e]),
      t
        ? AudioSystem_1.AudioSystem.PostEvent("play_ui_rogue_combo")
        : AudioSystem_1.AudioSystem.PostEvent("play_ui_rogue_combo_down");
  }
  XIn(e) {
    this.OIn || this.SPe.PlaySequencePurely(sequenceNameList[e - 1]);
  }
  Fst(e) {
    this.PIn.SetCustomMaterialScalarParameter(filledAmount, e);
  }
  ZRn(e) {
    this.Cnt &&
      UE.KismetMaterialLibrary.SetScalarParameterValue(
        GlobalData_1.GlobalData.GameInstance.GetWorld(),
        this.Cnt,
        rgbSplitProgress,
        e,
      );
  }
  Tick(e) {
    if (this.GetVisible()) {
      if ((this.RIn.Tick(e), this.kIn)) {
        let e = Time_1.Time.Now - this.VIn,
          t = (e >= UP_ANIM_TIME && ((e = UP_ANIM_TIME), (this.kIn = !1)), 0);
        t =
          e < HALF_UP_ANIM_TIME
            ? e / HALF_UP_ANIM_TIME
            : (UP_ANIM_TIME - e) / (UP_ANIM_TIME - HALF_UP_ANIM_TIME);
        var i = this.FIn.GetCurrentValue(t);
        this.PIn.SetCustomMaterialScalarParameter(globalInt, 0.1 + 0.9 * i);
      }
      0 < this.zRn &&
        ((this.zRn -= e),
        this.zRn <= 0
          ? this.ZRn(0)
          : ((i = this.FIn.GetCurrentValue(this.zRn / UP_EFFECT_TIME)),
            this.ZRn(i)));
    }
  }
}
(exports.RogueScoreUnit = RogueScoreUnit).Ult = void 0;
//# sourceMappingURL=RogueScoreUnit.js.map
