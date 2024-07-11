"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  EffectSystem_1 = require("../Effect/EffectSystem"),
  RecorderBlueprintFunctionLibrary_1 = require("./RecorderBlueprintFunctionLibrary"),
  EffectContext_1 = require("../Effect/EffectContext/EffectContext");
class TsRecordEffect extends UE.KuroRecordEffect {
  constructor() {
    super(...arguments),
      (this.EffectModelDataPath = ""),
      (this.EffectModelData = void 0),
      (this.LifeTimeType = 0),
      (this.EffectHandle = 0),
      (this.Playing = !1);
  }
  ReceiveBeginPlay() {
    RecorderBlueprintFunctionLibrary_1.default.RecorderPlayerInitializeTs(),
      this.SetActorTickEnabled(!0);
  }
  ReceiveEndPlay(t) {
    EffectSystem_1.EffectSystem.IsValid(this.EffectHandle) &&
      EffectSystem_1.EffectSystem.StopEffectById(
        this.EffectHandle,
        "[TsRecordEffect.ReceiveEndPlay]",
        !0,
      );
  }
  ReceiveTick(t) {
    this.Playing &&
      !this.EffectModelData &&
      this.EffectModelDataPath &&
      this.TryAddEffectView(),
      this.EffectHandle &&
        !Info_1.Info.IsGameRunning() &&
        EffectSystem_1.EffectSystem.TickHandleInEditor(this.EffectHandle, t);
  }
  OnPlay() {
    (this.Playing = !0), this.TryAddEffectView();
  }
  OnStop() {
    (this.Playing = !1),
      EffectSystem_1.EffectSystem.IsValid(this.EffectHandle) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.EffectHandle,
          "[TsRecordEffect.OnStop]",
          !1,
        );
  }
  TryAddEffectView() {
    if (!this.EffectModelData) {
      if (!this.EffectModelDataPath)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Recorder", 6, "No EffectModelData", [
            "Actor",
            this.GetName(),
          ])
        );
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Recorder",
          6,
          "No EffectModelData but TryLoad",
          ["Actor", this.GetName()],
          ["Path", this.EffectModelDataPath],
        ),
        (this.EffectModelData = UE.Object.Load(this.EffectModelDataPath));
    }
    var t;
    this.EffectHandle ||
      ((t = UE.KismetSystemLibrary.GetPathName(this.EffectModelData)),
      (this.EffectHandle = EffectSystem_1.EffectSystem.SpawnEffect(
        this,
        this.GetTransform(),
        t,
        "[TsRecordEffect.TryAddEffectView]",
        new EffectContext_1.EffectContext(void 0, this),
        0,
        (t) => {
          3 === this.LifeTimeType &&
            EffectSystem_1.EffectSystem.FreezeHandle(t, !0);
        },
      )),
      EffectSystem_1.EffectSystem.IsValid(this.EffectHandle) &&
        EffectSystem_1.EffectSystem.GetEffectActor(
          this.EffectHandle,
        ).K2_AttachToActor(this, void 0, 2, 2, 2, !1));
  }
}
exports.default = TsRecordEffect;
//# sourceMappingURL=TsRecordEffect.js.map
