"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalItem = void 0);
const UE = require("ue"),
  MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  SignalItemBase_1 = require("./SignalItemBase"),
  NIAGARA_PARAM_NAME = "Dissolve",
  NIAGARA_YELLOW_COLOR = "FFFBE8FF",
  NIAGARA_RED_COLOR = "FFD6D6FF",
  NIAGARA_GREEN_COLOR = "E0FCDEFF",
  NIAGARA_ORANGE_COLOR = "FFBCA4FF";
class SignalItem extends SignalItemBase_1.SignalItemBase {
  constructor() {
    super(...arguments),
      (this.i0o = void 0),
      (this.CEo = void 0),
      (this.gEo = void 0),
      (this.fEo = void 0),
      (this.pEo = void 0),
      (this.vEo = void 0),
      (this.MEo = void 0),
      (this.EEo = void 0),
      (this.sBn = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.ac = 0);
  }
  Init(t) {
    this.SetRootActor(t.GetOwner(), !0),
      (this.Width = this.RootItem.Width),
      (this.vEo = UE.Color.FromHex("E8CD74")),
      (this.EEo = UE.Color.FromHex("FF6A6A")),
      (this.MEo = UE.Color.FromHex("9DED87")),
      (this.sBn = UE.Color.FromHex("FF6827"));
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
    (this.i0o = this.GetSprite(0)),
      (this.CEo = this.GetSprite(4)),
      (this.gEo = this.GetUiNiagara(1)),
      (this.fEo = this.GetUiNiagara(2)),
      (this.pEo = this.GetSprite(3)),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      ));
  }
  OnReset() {
    this.i0o.SetFillAmount(1),
      this.i0o.SetAlpha(1),
      this.i0o.SetUIActive(!0),
      this.CEo.SetFillAmount(0);
    var t = ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType;
    let i = 2 === t ? this.MEo : this.vEo;
    3 === t && ((i = this.sBn), this.i0o.SetColor(i)),
      this.CEo.SetColor(i),
      this.i0o.SetAlpha(1),
      this.CEo.SetUIActive(!1),
      this.gEo?.SetUIActive(1 === t),
      this.gEo.SetUIItemScale(Vector_1.Vector.OneVector),
      this.gEo.SetAlpha(1),
      this.fEo.SetNiagaraVarFloat(NIAGARA_PARAM_NAME, 1),
      this.fEo.SetUIActive(!0),
      this.fEo.SetUIItemScale(Vector_1.Vector.OneVector),
      this.fEo.SetAlpha(1),
      this.SEo(),
      this.pEo.SetAlpha(0),
      (this.ac = 0);
  }
  InitByGameplayType(t) {
    super.InitByGameplayType(t);
    let i =
      2 === t ? "SP_SignalNoteSolidLineGreen" : "SP_SignalNoteSolidLineYellow";
    3 === t && (i = "SP_SignalNoteSolidLineOrange");
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetSpriteByPath(t, this.pEo, !1), this.Reset();
  }
  SEo() {
    let t =
      2 === this.GameplayType ? NIAGARA_GREEN_COLOR : NIAGARA_YELLOW_COLOR;
    3 === this.GameplayType && (t = NIAGARA_ORANGE_COLOR),
      this.fEo.SetColor(UE.Color.FromHex(t));
  }
  OnUpdate() {
    super.OnUpdate(), this.UpdateState(), 1 === this.ac && this.yEo();
  }
  UpdateState() {
    var t = -this.StartDecisionSize / 2;
    this.CurrentRelativeX < t
      ? this.Owt(0)
      : ((this.EndDecisionSize / 2 < this.CurrentRelativeX - this.Width &&
          2 !== this.ac) ||
          ((t = this.StartDecisionSize / 2),
          this.CurrentRelativeX > t && 0 === this.ac)) &&
        this.Owt(3);
  }
  Owt(t) {
    if (this.ac !== t)
      switch ((this.ac = t)) {
        case 1:
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSignalCatchStart,
          );
          break;
        case 2:
          this.zMo(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSignalCatchSuccess,
            );
          break;
        case 3:
          this.eEo(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSignalCatchFailed,
            );
      }
  }
  yEo() {
    var t = this.GetProgress();
    this.fEo.SetNiagaraVarFloat(NIAGARA_PARAM_NAME, 1 - t),
      this.CEo.SetUIActive(!0),
      this.i0o.SetFillAmount(1 - t),
      this.CEo.SetFillAmount(t);
  }
  eEo() {
    switch (this.Type) {
      case 1:
        this.IEo();
        break;
      case 2:
        if (this.CEo.bIsUIActive)
          this.CEo.SetColor(this.EEo),
            this.fEo.SetColor(UE.Color.FromHex(NIAGARA_RED_COLOR));
        else if (
          2 ===
          ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType
        ) {
          this.IEo();
          break;
        }
        this.LevelSequencePlayer.PlayLevelSequenceByName("Trans");
    }
  }
  zMo() {
    this.fEo.SetNiagaraVarFloat(NIAGARA_PARAM_NAME, 0),
      this.fEo.SetUIActive(!0),
      this.gEo.SetUIActive(!1),
      this.i0o.SetUIActive(!1),
      this.CEo.SetUIActive(!1),
      this.pEo.SetAlpha(0);
  }
  OnCatchBtnDown() {
    super.OnCatchBtnDown(), 0 === this.ac && this.TEo() && this.Owt(1);
  }
  OnCatchBtnUp() {
    var t;
    super.OnCatchBtnUp(),
      1 === this.ac && ((t = this.LEo()), this.Owt(t ? 2 : 3));
  }
  TEo() {
    var t = -this.StartDecisionSize / 2,
      i = this.StartDecisionSize / 2;
    return this.RelativeXWhenCatchDown > t && this.RelativeXWhenCatchDown < i;
  }
  LEo() {
    var t = this.EndDecisionSize / 2,
      i = -this.EndDecisionSize / 2,
      e = this.RelativeXWhenCatchUp - this.Width;
    return i < e && e < t;
  }
  GetProgress() {
    var t = -this.DecisionShowSize / 2,
      t = this.CurrentRelativeX - t;
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
  IEo() {
    this.CEo.SetUIActive(!1),
      this.fEo.SetUIActive(!1),
      this.gEo.SetUIActive(!1),
      this.i0o.SetUIActive(!1),
      this.pEo.SetAlpha(1);
  }
  TestCanBtnDown() {
    var t, i;
    return (
      0 === this.ac &&
      ((t = -this.StartDecisionSize / 2),
      (i = this.StartDecisionSize / 2),
      this.CurrentRelativeX > t) &&
      this.CurrentRelativeX < i
    );
  }
  TestCanBtnUp() {
    var t, i;
    return (
      1 === this.ac &&
      ((t = this.EndDecisionSize / 2),
      -this.EndDecisionSize / 2 < (i = this.CurrentRelativeX - this.Width)) &&
      i < t
    );
  }
}
exports.SignalItem = SignalItem;
//# sourceMappingURL=SignalItem.js.map
