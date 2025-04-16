"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BigStuffedDollModel = void 0);
const puerts_1 = require("puerts"),
  ue_1 = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  BrokenRockConfigById_1 = require("../../../Core/Define/ConfigQuery/BrokenRockConfigById"),
  BrokenRockRingById_1 = require("../../../Core/Define/ConfigQuery/BrokenRockRingById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  BigStuffedDefine_1 = require("./BigStuffedDefine");
class BigStuffedDollModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.nfl = 0),
      (this.BehaviorTreeConfigId = 0),
      (this.BrokenRockEntityPbDataId = 0),
      (this.BrokenRockEntityCreatureDataId = 0),
      (this.GSl = void 0),
      (this.kSl = void 0),
      (this.OSl = void 0),
      (this.GameInfo = new BigStuffedDefine_1.BigStuffedGameInfo()),
      (this.afl = 0),
      (this.GameResult = !1),
      (this.CurrentScore = 0),
      (this.CurrentArrowDirection = 0),
      (this.LastGameStage = 0);
  }
  get Config() {
    return PublicUtil_1.PublicUtil.UseDbConfig() ? this.GSl : this.kSl;
  }
  GameplayStart(e, t) {
    (this.nfl = e),
      (this.BehaviorTreeConfigId = t),
      this.SetGameStage(0),
      this.GameInfo.Clear(),
      (this.CurrentScore = 0),
      (this.CurrentArrowDirection = 0),
      this.InitialConfig(),
      this.Config &&
        ((e = this.Config.EntityUid.split("_")),
        (this.BrokenRockEntityPbDataId = Number(e[2])));
  }
  InitialConfig() {
    if (PublicUtil_1.PublicUtil.UseDbConfig())
      this.GSl = BrokenRockConfigById_1.configBrokenRockConfigById.GetConfig(
        this.nfl,
      );
    else {
      var e = IGlobal_1.globalConfig.BrokenRockConfig;
      if (e) {
        var e = (0, PublicUtil_1.getConfigPath)(e),
          t = (0, puerts_1.$ref)(""),
          i =
            (ue_1.KuroStaticLibrary.LoadFileToString(t, e),
            (e = (0, puerts_1.$unref)(t)),
            JSON.parse(e));
        if (
          i &&
          ((this.kSl = i.Config.find((e) => e.Id === this.nfl)), this.kSl)
        ) {
          this.OSl = new Map();
          for (const r of this.kSl.Rings) {
            var s = i.Rings.find((e) => e.Id === r);
            s &&
              ((s.BonusRate = this.FSl(s.BonusRate)),
              (s.Speed = this.FSl(s.Speed)),
              this.OSl.set(r, s));
          }
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelPlay",
            18,
            "大个布偶坚固岩石玩法找不到Json数据配置",
          );
    }
  }
  FSl(e) {
    var e = e.replace("[", "").replace("]", "").split(","),
      t = new Map();
    for (const s of e) {
      var i = s.split(":");
      t.set(Number(i[0]), Number(i[1]));
    }
    return t;
  }
  GetCurrentGameplayId() {
    return this.nfl;
  }
  SetGameStage(e) {
    (this.LastGameStage = this.afl),
      (this.afl = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnBigStuffedDollGameStageUpdate,
        this.afl,
      );
  }
  GetGameStage() {
    return this.afl;
  }
  EnterNextGameStage() {
    (this.LastGameStage = this.afl),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnBigStuffedDollGameStageUpdate,
        ++this.afl,
      );
  }
  ArrowEnterNextValidArea() {
    var e = this.GameInfo.GetValidAreaNum();
    if (e) {
      var t = this.GameInfo.CurrentArrowStayTotalIndex;
      switch (this.CurrentArrowDirection) {
        case 0:
          this.GameInfo.CurrentArrowStayTotalIndex++;
          break;
        case 1:
          this.GameInfo.CurrentArrowStayTotalIndex--;
      }
      this.GameInfo.CurrentArrowStayTotalIndex > e - 1
        ? (this.GameInfo.CurrentArrowStayTotalIndex = 0)
        : this.GameInfo.CurrentArrowStayTotalIndex < 0 &&
          (this.GameInfo.CurrentArrowStayTotalIndex = e - 1),
        t !== this.GameInfo.CurrentArrowStayTotalIndex &&
          ((e = this.GameInfo.CurrentArrowStayRingId),
          this.GameInfo.UpdateCurrentArrowStayInfo(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnBigStuffedDollArrowStayAreaUpdate,
            e,
            this.GameInfo.CurrentArrowStayRingId,
            this.GameInfo.CurrentArrowStayRelativeValidAreaIndex,
          ));
    }
  }
  GetGlobalTime() {
    return PublicUtil_1.PublicUtil.UseDbConfig()
      ? (this.GSl?.GlobalTime ?? 0)
      : (this.kSl?.GlobalTime ?? 0);
  }
  GetScoreDown() {
    return PublicUtil_1.PublicUtil.UseDbConfig()
      ? (this.GSl?.ScoreDown ?? 0)
      : (this.kSl?.ScoreDown ?? 0);
  }
  GetRingConfig(e) {
    return PublicUtil_1.PublicUtil.UseDbConfig()
      ? BrokenRockRingById_1.configBrokenRockRingById.GetConfig(e)
      : this.OSl?.get(e);
  }
  GetArrowSpeed(e) {
    let t = 0;
    if (e) {
      var i,
        s,
        r = this.CurrentScore;
      for ([i, s] of e.Speed) {
        if (!(r >= i)) break;
        t = s;
      }
    }
    return t;
  }
  ArrowDirectionReverse() {
    switch (this.CurrentArrowDirection) {
      case 0:
        this.CurrentArrowDirection = 1;
        break;
      case 1:
        this.CurrentArrowDirection = 0;
    }
    this.GameInfo.OnArrowDirectionReverse();
  }
}
exports.BigStuffedDollModel = BigStuffedDollModel;
//# sourceMappingURL=BigStuffedDollModel.js.map
