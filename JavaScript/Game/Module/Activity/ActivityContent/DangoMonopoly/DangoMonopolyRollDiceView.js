"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyRollDiceView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  DangoMonopolyDiceBuffPanel_1 = require("./DangoMonopolyDiceBuffPanel"),
  DangoMonopolyViewBase_1 = require("./DangoMonopolyViewBase");
class DangoMonopolyRollDiceView extends DangoMonopolyViewBase_1.DangoMonopolyViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.IsRollDiceFinish = !1),
      (this.DiceBuffPanel = void 0),
      (this.AutoWaitTime = 1e3),
      (this.x4c = () => {
        this.ActivityData.SetActivitySpeed(), this.UpdateSpeed();
      }),
      (this.G4c = () => {
        this.IsRollDiceFinish && this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UITexture],
      [5, UE.UIText],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.x4c],
        [2, this.G4c],
      ]);
  }
  Es_() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, [
        "DataParam",
        this.OpenParam,
      ]);
  }
  async OnBeforeStartAsync() {
    this.Es_(),
      await super.OnBeforeStartAsync(),
      (this.DiceBuffPanel =
        new DangoMonopolyDiceBuffPanel_1.DangoMonopolyDiceBuffPanel()),
      await this.DiceBuffPanel.Init(this.GetItem(6)),
      this.GetText(5)?.SetUIActive(!1);
  }
  OnStart() {
    this.ActivityData.UpdateBoardGridUiInfoShow(!1);
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnBeforeShow() {
    this.UpdateData();
  }
  OnBeforeDestroy() {
    this.ActivityData.UpdateBoardGridUiInfoShow(!0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyMoveStart,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyMoveStepStartOrEnd,
        !0,
      ),
      this.DiceBuffPanel?.Destroy();
  }
  UpdateSpeed() {
    var t = this.ActivityData.GetSpeedStr();
    this.GetText(1)?.SetText(t);
  }
  async UpdateData() {
    this.UpdateSpeed();
    var t = this.OpenParam?.DiceResult ?? 1;
    this.DiceAnimStart(),
      await this.PlayRollDice(t),
      await this.CheckTriggerBuff(),
      this.DiceAnimEnd();
  }
  async PlayRollDice(t) {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.Kuro.AutoExposure 0",
    );
    var i = this.ActivityData.RollDice;
    await i.Promise?.Promise,
      (i.Param.DicePoints = [t]),
      await i.Run(),
      i.DiceOutlineBp?.SetActorHiddenInGame(!1),
      await this.PlaySequenceAsync("DiceAnim"),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Kuro.AutoExposure 1",
      );
  }
  GetDebugText(t) {
    return (
      `骰子: ${this.OpenParam?.DiceResult ?? 1}, 特性id: ${this.OpenParam?.TriggerBuffId ?? 0}, 特性结果: ${this.OpenParam?.TriggerBuffResult ?? 0}
` + t
    );
  }
  DiceAnimStart() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("DangoMonopoly", 69, "RollDice=>掷骰子动画开始"),
      this.SetDiceVisible(!0);
  }
  DiceAnimEnd() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("DangoMonopoly", 69, "RollDice=>掷骰子动画结束"),
      (this.IsRollDiceFinish = !0),
      this.ActivityData.RollDice.DiceOutlineBp?.SetActorHiddenInGame(!0),
      this.CloseMe();
  }
  async CheckTriggerBuff() {
    var t = this.OpenParam?.TriggerBuffId;
    t &&
      this.ActivityData.BuffIsAfterRollDiceFire(t) &&
      (this.ActivityData.OpenViewDangoTips(t), await this.PlayBuffEffect(t));
  }
  async PlayBuffEffect(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("DangoMonopoly", 69, "RollDice=>展示特性效果");
    t =
      ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.GetProperty(t)
        ?.PropertyInfo[0];
    if (t)
      switch (t) {
        case 1:
          await this.AgainPlayRollDice();
          break;
        case 3:
          await this.MoreStep();
          break;
        case 6:
          await this.PointDouble();
          break;
        case 4:
          await this.PointReplace();
      }
  }
  async AgainPlayRollDice() {
    var t = this.OpenParam?.TriggerBuffResult ?? 1;
    await this.PlayRollDice(t);
  }
  async MoreStep() {
    this.DiceBuffPanel.UpdateShowType(1),
      await this.DiceBuffPanel.PlaySequence("Start"),
      await this.DiceBuffPanel.PlaySequence("Close");
  }
  async PointDouble() {
    this.DiceBuffPanel.UpdateShowType(0),
      await this.DiceBuffPanel.PlaySequence("Start"),
      await this.DiceBuffPanel.PlaySequence("Close");
  }
  async PointReplace(t) {
    await this.PlaySequenceAsync("SwitchIn");
    t = t ?? this.OpenParam?.TriggerBuffResult ?? 1;
    this.ActivityData.RollDice.UpdateDicePoint(t),
      await this.PlaySequenceAsync("SwitchOut");
  }
  SetDiceVisible(t) {
    this.GetItem(3).SetUIActive(t);
  }
  async WaitAutoTime() {
    await TimerSystem_1.TimerSystem.Wait(this.AutoWaitTime);
  }
}
exports.DangoMonopolyRollDiceView = DangoMonopolyRollDiceView;
//# sourceMappingURL=DangoMonopolyRollDiceView.js.map
