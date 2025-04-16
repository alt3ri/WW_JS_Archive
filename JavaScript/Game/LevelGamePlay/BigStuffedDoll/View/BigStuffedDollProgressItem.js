"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BigStuffedDollProgressItem = void 0);
const UE = require("ue"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Module/Util/LguiUtil"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelGeneralNetworks_1 = require("../../LevelGeneralNetworks"),
  ADD_SCORE_ANIMNAME = "Add",
  SUB_SCORE_ANIMNAME = "Subtract",
  QTE_EVENTKEY1 = "BrokenRockEventKey1",
  QTE_EVENTKEY2 = "BrokenRockEventKey2",
  QTE_EVENTKEY3 = "BrokenRockEventKey3",
  QTE_EVENTKEY4 = "BrokenRockEventKey4",
  QTE_EVENTKEY5 = "BrokenRockEventKey5",
  QTE_EVENTKEY_PROGRESS2 = 0.2,
  QTE_EVENTKEY_PROGRESS3 = 0.4,
  QTE_EVENTKEY_PROGRESS4 = 0.6,
  QTE_EVENTKEY_PROGRESS5 = 0.8;
class BigStuffedDollProgressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Afl = 0),
      (this.IDl = 0),
      (this.ScoreMax = 0),
      (this.AutoIncreaseScore = 0),
      (this.BAl = 0),
      (this.LevelSequencePlayer = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    super.OnStart();
    var e = this.GetItem(1);
    (this.Afl = e.GetWidth()),
      e.SetStretchLeft(0),
      e.SetStretchRight(this.Afl),
      e.SetUIActive(!0),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      (this.IDl = 0);
  }
  Init(e) {
    (this.ScoreMax = e.ScoreMax ?? 100),
      (this.AutoIncreaseScore = e.ScoreUp),
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(
        ModelManager_1.ModelManager.BigStuffedDollModel
          .BrokenRockEntityCreatureDataId,
        QTE_EVENTKEY1,
      ),
      this.Yqe(),
      this.GetSprite(0).SetFillAmount(0),
      this.GetItem(3)?.SetAnchorOffsetX(-0.5 * this.Afl);
  }
  OnTick(e) {
    2 === ModelManager_1.ModelManager.BigStuffedDollModel.GetGameStage() &&
      ((e = e / 1e3),
      this.AutoIncreaseScore && this.AddScore(e * this.AutoIncreaseScore, !1),
      this.TDl(e),
      this.bAl());
  }
  AddScore(e, t = !0) {
    var E,
      s = ModelManager_1.ModelManager.BigStuffedDollModel,
      s =
        (t && (this.IDl = s.CurrentScore),
        (s.CurrentScore = MathCommon_1.MathCommon.Clamp(
          s.CurrentScore + e,
          0,
          this.ScoreMax,
        )),
        this.Yqe());
    t
      ? ((t = this.GetItem(1)),
        (E = this.pje(this.IDl)),
        t.SetStretchLeft(this.Afl * E),
        t.SetStretchRight(this.Afl * (1 - s)),
        this.LevelSequencePlayer.StopCurrentSequence(!0, !0),
        this.LevelSequencePlayer.PlayLevelSequenceByName(
          0 <= e ? ADD_SCORE_ANIMNAME : SUB_SCORE_ANIMNAME,
        ))
      : this.GetSprite(0).SetFillAmount(s);
  }
  TDl(e) {
    var t = this.GetCurrentProgress(),
      e =
        ((this.IDl = MathCommon_1.MathCommon.Clamp(
          this.IDl + 10 * e,
          0,
          ModelManager_1.ModelManager.BigStuffedDollModel.CurrentScore,
        )),
        this.pje(this.IDl)),
      E = (this.GetSprite(0).SetFillAmount(e), this.GetItem(1));
    E.SetStretchLeft(this.Afl * e),
      E.SetStretchRight(this.Afl * (1 - t)),
      this.GetItem(3)?.SetAnchorOffsetX(this.Afl * (e - 0.5));
  }
  bAl() {
    var e = ModelManager_1.ModelManager.BigStuffedDollModel,
      t = this.GetCurrentProgress();
    t > QTE_EVENTKEY_PROGRESS2 && this.BAl <= QTE_EVENTKEY_PROGRESS2
      ? LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(
          e.BrokenRockEntityCreatureDataId,
          QTE_EVENTKEY2,
        )
      : t > QTE_EVENTKEY_PROGRESS3 && this.BAl <= QTE_EVENTKEY_PROGRESS3
        ? LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(
            e.BrokenRockEntityCreatureDataId,
            QTE_EVENTKEY3,
          )
        : t > QTE_EVENTKEY_PROGRESS4 && this.BAl <= QTE_EVENTKEY_PROGRESS4
          ? LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(
              e.BrokenRockEntityCreatureDataId,
              QTE_EVENTKEY4,
            )
          : t > QTE_EVENTKEY_PROGRESS5 &&
            this.BAl <= QTE_EVENTKEY_PROGRESS5 &&
            LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(
              e.BrokenRockEntityCreatureDataId,
              QTE_EVENTKEY5,
            ),
      1 <= t && ((e.GameResult = !0), e.EnterNextGameStage()),
      (this.BAl = t);
  }
  Yqe() {
    var e = this.GetText(2),
      t =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "TeddyBear_Progress"),
        e.GetText()),
      E = this.GetCurrentProgress(),
      s = this.GetCurrentProgressPercent();
    return e.SetText(t + `:${s}%`), E;
  }
  GetCurrentProgress() {
    return 0 === this.ScoreMax
      ? 1
      : this.pje(ModelManager_1.ModelManager.BigStuffedDollModel.CurrentScore);
  }
  GetCurrentProgressPercent() {
    return 0 === this.ScoreMax
      ? 100
      : Math.min(100, Math.floor(100 * this.GetCurrentProgress()));
  }
  pje(e) {
    return 0 === this.ScoreMax ? 1 : e / this.ScoreMax;
  }
}
exports.BigStuffedDollProgressItem = BigStuffedDollProgressItem;
//# sourceMappingURL=BigStuffedDollProgressItem.js.map
