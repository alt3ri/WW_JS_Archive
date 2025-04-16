"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQteModel = void 0);
const puerts_1 = require("puerts"),
  ue_1 = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  DockyardItemBlockOriginalData_1 = require("../../Module/Activity/ActivityContent/Fishing/Dockyard/Base/DockyardItemBlockOriginalData"),
  FishingQteDefine_1 = require("./FishingQteDefine"),
  PERCENT_CONVERT = 0.01;
class FishingQteModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CurrentGameplayId = 0),
      (this.CurrentFishingPointConfigId = 0),
      (this.CurrentFishingPointCreatureDataId = 0),
      (this.CurrentInteractType = 0),
      (this.GameInfo = void 0),
      (this.GSl = void 0),
      (this.kSl = void 0),
      (this.CurrentFishingIconType = void 0),
      (this.hO_ = 1),
      (this.lO_ = 1),
      (this.f7_ = 0),
      (this.vt_ = new Map()),
      (this._O_ = new Map()),
      (this.Xi_ = []);
  }
  get GameConfig() {
    return PublicUtil_1.PublicUtil.UseDbConfig() ? this.GSl : this.kSl;
  }
  async GameplayStart(t, e) {
    t =
      ModelManager_1.ModelManager.FishingModel.GetFishingPointDataByPbEntityId(
        t,
      );
    if (!t) return !1;
    t.IsValid() ||
      (await ControllerHolder_1.ControllerHolder.FishingController.RequestFishingPointInfo(
        t.SceneId,
        t.Id,
      ));
    var i,
      r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingPointConfigById(
        t.Id,
      );
    return ModelManager_1.ModelManager.FishingModel.GetFishingTechUnlock(
      r.UnlockTech,
    )
      ? 0 === t.CurrentCount
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelPlay",
              37,
              "[FishingQte] 交互点可捕捞次数不足",
              ["捕捞点配置Id", t.Id],
            ),
          !1)
        : ((i = r.ShowItem),
          (i =
            ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(
              i,
            )),
          (this.CurrentFishingPointCreatureDataId = e),
          (this.CurrentFishingPointConfigId = t.Id),
          (this.CurrentGameplayId = t.GamePlayId),
          (this.CurrentInteractType = 0),
          (this.CurrentFishingIconType = 1 === i.Type ? 0 : 1),
          this.Fn_(t.CurrentCount))
      : ((e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(
          r.UnlockTech,
        )),
        (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Fishing_TechUnlockTip2",
        )),
        (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name)),
        (r = StringUtils_1.StringUtils.Format(i, t)),
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText(
          r,
        ),
        !1);
  }
  GameplayStartByTempFishPoint(t) {
    var e =
      ModelManager_1.ModelManager.FishingModel.GetTempFishingPointDataByCreatureDataId(
        t,
      );
    return e
      ? 0 === e.CurrentCount
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelPlay",
              37,
              "[FishingQte] 交互点可捕捞次数不足",
              ["临时捕捞点实体Id", e.CreatureDataId],
            ),
          !1)
        : ((this.CurrentFishingPointCreatureDataId = t),
          (this.CurrentFishingPointConfigId = 0),
          (this.CurrentGameplayId = e.GamePlayId),
          (this.CurrentInteractType = 1),
          (this.CurrentFishingIconType = 0),
          this.Fn_(e.CurrentCount))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelPlay",
            37,
            "[FishingQte] 无法查到对应临时捕捞点信息",
            ["CreatureDataId", t],
          ),
        !1);
  }
  Fn_(t) {
    this.cO_(),
      this.NSl(),
      this.GameInfo ||
        (this.GameInfo = new FishingQteDefine_1.FishingQteGameInfo()),
      this.GameInfo.Clear();
    var e = this.GameConfig.IsAnticlockwise ? 1 : 0,
      e =
        (this.GameInfo.CreateRingInfo(e),
        (this.GameInfo.MaxRound = t),
        this.GameConfig.InvalidArea);
    return (
      (this.GameInfo.GetRingInfo().IsWholeRing = 0 === e.length),
      (this.AccumulatePerfectCombo = 0),
      this.vt_.clear(),
      this._O_.clear(),
      (this.Xi_.length = 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "LevelPlay",
          37,
          "[FishingQte] 捕鱼玩法开始",
          ["LevelGameplayId", this.CurrentGameplayId],
          ["FishingPointId", this.CurrentFishingPointConfigId],
          ["cIncId", this.CurrentFishingPointCreatureDataId],
        ),
      !0
    );
  }
  cO_() {
    (this.lO_ = 1), (this.hO_ = 1);
    var t,
      e = ModelManager_1.ModelManager.FishingModel.EffectType2TechIdsMap,
      i = e.get(11);
    if (i)
      for (const s of i)
        ModelManager_1.ModelManager.FishingModel.GetFishingTechUnlock(s) &&
          ((t =
            ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(s)
              .Effect[0]),
          (t =
            ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(
              t,
            )),
          (this.lO_ += t.Params[0] * PERCENT_CONVERT));
    var r,
      i = e.get(10);
    if (i)
      for (const a of i)
        ModelManager_1.ModelManager.FishingModel.GetFishingTechUnlock(a) &&
          ((r =
            ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(a)
              .Effect[0]),
          (r =
            ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(
              r,
            )),
          (this.hO_ += r.Params[0] * PERCENT_CONVERT));
  }
  NSl() {
    var t, e, i;
    PublicUtil_1.PublicUtil.UseDbConfig()
      ? (this.GSl =
          ConfigManager_1.ConfigManager.FishingConfig.GetFishingQteConfig(
            this.CurrentGameplayId,
          ))
      : (e = IGlobal_1.globalConfig.FishingRouletteConfig)
        ? ((e = (0, PublicUtil_1.getConfigPath)(e)),
          (i = ((t = ""), puerts_1.$ref)("")),
          ue_1.KuroStaticLibrary.LoadFileToString(i, e),
          (t = (0, puerts_1.$unref)(i)),
          (e = JSON.parse(t)) &&
            ((i = e.find((t) => t.Id === this.CurrentGameplayId)),
            (this.kSl = i),
            (this.kSl.CursorSpeed = this.g7_(i.CursorSpeed)),
            (this.kSl.RouletteRotateSpeed = this.g7_(i.RouletteRotateSpeed)),
            (this.kSl.PerfectAppearRate = this.g7_(i.PerfectAppearRate))))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelPlay",
            37,
            "[FishingQte] 捕鱼转盘玩法找不到Json数据配置",
          );
  }
  g7_(t) {
    var t = t.replace("[", "").replace("]", "").split(","),
      e = new Map();
    for (const r of t) {
      var i = r.split(":");
      e.set(Number(i[0]), Number(i[1]));
    }
    return e;
  }
  EnterNextRound() {
    (this.GameInfo.CurrentRound = Math.min(
      this.GameInfo.CurrentRound + 1,
      this.GameInfo.MaxRound,
    )),
      this.GameInfo.CurrentRound !== this.GameInfo.MaxRound
        ? (this.GameInfo.CurrentScore -= this.GameConfig.MaxScore)
        : this.GameInfo.SetGameStage(4);
  }
  get ScoreUp() {
    return this.GameConfig.ScoreUp * this.lO_;
  }
  get HitAreaScore() {
    return this.GameConfig.HitAreaScore * this.hO_;
  }
  get PerfectScore() {
    return this.GameConfig.PerfectScore * this.hO_;
  }
  set AccumulatePerfectCombo(t) {
    (this.f7_ = t), this.C7_();
  }
  get AccumulatePerfectCombo() {
    return this.f7_;
  }
  OnQteOn() {
    (this.GameInfo.CurrentScore += this.HitAreaScore),
      this.AccumulatePerfectCombo++;
  }
  OnPerfectOn() {
    (this.GameInfo.CurrentScore += this.PerfectScore),
      this.AccumulatePerfectCombo++;
  }
  OnMissOn() {
    (this.GameInfo.CurrentScore = Math.max(
      0,
      this.GameInfo.CurrentScore - this.GameConfig.MistakeScore,
    )),
      (this.AccumulatePerfectCombo = 0);
  }
  C7_() {
    var t = this.AccumulatePerfectCombo;
    (this.GameInfo.CursorSpeed = this.p7_(t, this.GameConfig.CursorSpeed)),
      (this.GameInfo.RingSpeed = this.p7_(
        t,
        this.GameConfig.RouletteRotateSpeed,
      )),
      (this.GameInfo.PerfectAppearRate = this.p7_(
        t,
        this.GameConfig.PerfectAppearRate,
      )),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "LevelPlay",
          37,
          "[FishingQte] ComboInfoChange",
          ["Combo", this.AccumulatePerfectCombo],
          ["CursorSpeed", this.GameInfo.CursorSpeed],
          ["RingSpeed", this.GameInfo.RingSpeed],
          ["PerfectAppearRate", this.GameInfo.PerfectAppearRate],
        );
  }
  p7_(e, t) {
    var i = Array.from(t.entries());
    for (let t = 0; t < i.length; t++) {
      var r = i[t][0],
        s = i[t][1];
      if (!(t < i.length - 1)) return s;
      var a = i[t + 1][0];
      if (r <= e && e < a) return s;
    }
    return 0;
  }
  SetTempGetDataListFromServer(t, e) {
    for (const r of t) {
      var i = new DockyardItemBlockOriginalData_1.DockyardItemBlockOriginalData(
        r,
      );
      this.vt_.set(r.b9n, i), this._O_.set(r.b9n, e), this.Xi_.push(i);
    }
  }
  GetTempGetDataList() {
    var t = Array.from(this.vt_.values());
    return this.vt_.clear(), this._O_.clear(), (this.Xi_.length = 0), t;
  }
  ShiftTempGetData() {
    return this.Xi_.shift();
  }
  IsTempGetDataEmpty() {
    return 0 === this.Xi_.length;
  }
  GetTempGetDataTag(t) {
    return this._O_.get(t) ?? 0;
  }
}
exports.FishingQteModel = FishingQteModel;
//# sourceMappingURL=FishingQteModel.js.map
