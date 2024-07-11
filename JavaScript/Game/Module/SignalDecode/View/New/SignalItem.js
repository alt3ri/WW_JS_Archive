"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalItem = void 0);
const UE = require("ue");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const SignalItemBase_1 = require("./SignalItemBase");
const NIAGARA_PARAM_NAME = "Dissolve";
const NIAGARA_YELLOW_COLOR = "FFFBE8FF";
const NIAGARA_RED_COLOR = "FFD6D6FF";
const NIAGARA_GREEN_COLOR = "E0FCDEFF";
const NIAGARA_ORANGE_COLOR = "FFBCA4FF";
class SignalItem extends SignalItemBase_1.SignalItemBase {
  constructor() {
    super(...arguments),
      (this.ngo = void 0),
      (this.pMo = void 0),
      (this.vMo = void 0),
      (this.MMo = void 0),
      (this.SMo = void 0),
      (this.EMo = void 0),
      (this.yMo = void 0),
      (this.IMo = void 0),
      (this.xxn = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.ac = 0);
  }
  Init(t) {
    this.SetRootActor(t.GetOwner(), !0),
      (this.Width = this.RootItem.Width),
      (this.EMo = UE.Color.FromHex("E8CD74")),
      (this.IMo = UE.Color.FromHex("FF6A6A")),
      (this.yMo = UE.Color.FromHex("9DED87")),
      (this.xxn = UE.Color.FromHex("FF6827"));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UINiagara],
      [2, UE.UINiagara],
      [3, UE.UISprite],
      [4, UE.UISprite],
    ];
  }
  OnStart() {
    (this.ngo = this.GetSprite(0)),
      (this.pMo = this.GetSprite(4)),
      (this.vMo = this.GetUiNiagara(1)),
      (this.MMo = this.GetUiNiagara(2)),
      (this.SMo = this.GetSprite(3)),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      ));
  }
  OnReset() {
    this.ngo.SetFillAmount(1),
      this.ngo.SetAlpha(1),
      this.ngo.SetUIActive(!0),
      this.pMo.SetFillAmount(0);
    const t = ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType;
    let i = t === 2 ? this.yMo : this.EMo;
    t === 3 && ((i = this.xxn), this.ngo.SetColor(i)),
      this.pMo.SetColor(i),
      this.ngo.SetAlpha(1),
      this.pMo.SetUIActive(!1),
      this.vMo?.SetUIActive(t === 1),
      this.vMo.SetUIItemScale(Vector_1.Vector.OneVector),
      this.vMo.SetAlpha(1),
      this.MMo.SetNiagaraVarFloat(NIAGARA_PARAM_NAME, 1),
      this.MMo.SetUIActive(!0),
      this.MMo.SetUIItemScale(Vector_1.Vector.OneVector),
      this.MMo.SetAlpha(1),
      this.TMo(),
      this.SMo.SetAlpha(0),
      (this.ac = 0);
  }
  InitByGameplayType(t) {
    super.InitByGameplayType(t);
    let i =
      t === 2 ? "SP_SignalNoteSolidLineGreen" : "SP_SignalNoteSolidLineYellow";
    t === 3 && (i = "SP_SignalNoteSolidLineOrange");
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetSpriteByPath(t, this.SMo, !1), this.Reset();
  }
  TMo() {
    let t =
      this.GameplayType === 2 ? NIAGARA_GREEN_COLOR : NIAGARA_YELLOW_COLOR;
    this.GameplayType === 3 && (t = NIAGARA_ORANGE_COLOR),
      this.MMo.SetColor(UE.Color.FromHex(t));
  }
  OnUpdate() {
    super.OnUpdate(), this.UpdateState(), this.ac === 1 && this.LMo();
  }
  UpdateState() {
    let t = -this.StartDecisionSize / 2;
    this.CurrentRelativeX < t
      ? this.qxt(0)
      : ((this.EndDecisionSize / 2 < this.CurrentRelativeX - this.Width &&
          this.ac !== 2) ||
          ((t = this.StartDecisionSize / 2),
          this.CurrentRelativeX > t && this.ac === 0)) &&
        this.qxt(3);
  }
  qxt(t) {
    if (this.ac !== t)
      switch ((this.ac = t)) {
        case 1:
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSignalCatchStart,
          );
          break;
        case 2:
          this.tMo(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSignalCatchSuccess,
            );
          break;
        case 3:
          this.oMo(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSignalCatchFailed,
            );
      }
  }
  LMo() {
    const t = this.GetProgress();
    this.MMo.SetNiagaraVarFloat(NIAGARA_PARAM_NAME, 1 - t),
      this.pMo.SetUIActive(!0),
      this.ngo.SetFillAmount(1 - t),
      this.pMo.SetFillAmount(t);
  }
  oMo() {
    switch (this.Type) {
      case 1:
        this.DMo();
        break;
      case 2:
        if (this.pMo.bIsUIActive)
          this.pMo.SetColor(this.IMo),
            this.MMo.SetColor(UE.Color.FromHex(NIAGARA_RED_COLOR));
        else if (
          ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType ===
          2
        ) {
          this.DMo();
          break;
        }
        this.LevelSequencePlayer.PlayLevelSequenceByName("Trans");
    }
  }
  tMo() {
    this.MMo.SetNiagaraVarFloat(NIAGARA_PARAM_NAME, 0),
      this.MMo.SetUIActive(!0),
      this.vMo.SetUIActive(!1),
      this.ngo.SetUIActive(!1),
      this.pMo.SetUIActive(!1),
      this.SMo.SetAlpha(0);
  }
  OnCatchBtnDown() {
    super.OnCatchBtnDown(), this.ac === 0 && this.RMo() && this.qxt(1);
  }
  OnCatchBtnUp() {
    let t;
    super.OnCatchBtnUp(),
      this.ac === 1 && ((t = this.UMo()), this.qxt(t ? 2 : 3));
  }
  RMo() {
    const t = -this.StartDecisionSize / 2;
    const i = this.StartDecisionSize / 2;
    return this.RelativeXWhenCatchDown > t && this.RelativeXWhenCatchDown < i;
  }
  UMo() {
    const t = this.EndDecisionSize / 2;
    const i = -this.EndDecisionSize / 2;
    const e = this.RelativeXWhenCatchUp - this.Width;
    return i < e && e < t;
  }
  GetProgress() {
    var t = -this.DecisionShowSize / 2;
    var t = this.CurrentRelativeX - t;
    return MathCommon_1.MathCommon.Clamp(t / this.Width, 0, 1);
  }
  GetCompleteness() {
    let t = 0;
    switch (this.ac) {
      case 1:
        t = this.GetProgress();
        break;
      case 2:
        t = 1;
        break;
      case 0:
      case 3:
        t = 0;
    }
    return t;
  }
  DMo() {
    this.pMo.SetUIActive(!1),
      this.MMo.SetUIActive(!1),
      this.vMo.SetUIActive(!1),
      this.ngo.SetUIActive(!1),
      this.SMo.SetAlpha(1);
  }
  TestCanBtnDown() {
    let t, i;
    return (
      this.ac === 0 &&
      ((t = -this.StartDecisionSize / 2),
      (i = this.StartDecisionSize / 2),
      this.CurrentRelativeX > t) &&
      this.CurrentRelativeX < i
    );
  }
  TestCanBtnUp() {
    let t, i;
    return (
      this.ac === 1 &&
      ((t = this.EndDecisionSize / 2),
      -this.EndDecisionSize / 2 < (i = this.CurrentRelativeX - this.Width)) &&
      i < t
    );
  }
}
exports.SignalItem = SignalItem;
// # sourceMappingURL=SignalItem.js.map
