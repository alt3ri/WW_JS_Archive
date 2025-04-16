"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RollDice = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class RollDice {
  constructor(i) {
    (this.z2c = void 0),
      (this.Promise = void 0),
      (this.TDe = void 0),
      (this.J2c = 5e3),
      (this.Ns1 = 10),
      (this.e8 = 0),
      (this.Z2c = void 0),
      (this.TimerCreate = void 0),
      (this.TimerRemove = void 0),
      (this.Param = void 0),
      (this.DiceOutlineBp = void 0),
      (this.DiceCamera = void 0),
      (this.J_ = (i) => {
        (this.e8 += i),
          this.e8 >= this.J2c
            ? this.eFc()
            : ((i = this.e8 / this.J2c), this.cEo(i));
      }),
      (this.TimerSystemCreate = () => {
        this.TDe = TimerSystem_1.TimerSystem.Forever(
          this.J_,
          TimerSystem_1.MIN_TIME,
        );
      }),
      (this.TimerSystemRemove = () => {
        this.TDe &&
          (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
      }),
      (this.FlowSystemCreate = () => {
        this.TDe = TimerSystem_1.FlowTimeTimerSystem.Forever(
          this.J_,
          TimerSystem_1.MIN_TIME,
        );
      }),
      (this.FlowSystemRemove = () => {
        this.TDe &&
          (TimerSystem_1.FlowTimeTimerSystem.Remove(this.TDe),
          (this.TDe = void 0));
      }),
      (this.Param = i);
  }
  static Create(i) {
    return new RollDice(i);
  }
  async Run() {
    await this.Promise?.Promise,
      (this.z2c =
        await ModelManager_1.ModelManager.RacingBetsModel.LoadDiceMaterialParameterCollection()),
      (this.Promise = new CustomPromise_1.CustomPromise()),
      this.UpdateSceneBind(),
      this.Ks1(),
      this.eFc(),
      await this.Promise?.Promise,
      (this.Promise = void 0);
  }
  Ks1() {
    var i = this.Param,
      t =
        (this.TimerRemove?.(),
        (this.Z2c = FNameUtil_1.FNameUtil.GetDynamicFName("Ani_Process")),
        this.cEo(i?.AniProcess ?? 0),
        UE.KismetMaterialLibrary.SetScalarParameterValue(
          GlobalData_1.GlobalData.GameInstance.GetWorld(),
          this.z2c,
          FNameUtil_1.FNameUtil.GetDynamicFName("DiceNub"),
          i?.DicePoints.length ?? 0,
        ),
        i?.AniNum ?? this.Ns1),
      t = Math.floor(Math.random() * t);
    UE.KismetMaterialLibrary.SetScalarParameterValue(
      GlobalData_1.GlobalData.GameInstance.GetWorld(),
      this.z2c,
      FNameUtil_1.FNameUtil.GetDynamicFName("Ani_Num"),
      t,
    ),
      i?.DicePoints.forEach((i, t) => {
        this.UpdateDicePoint(i, t);
      });
  }
  UpdateSceneBind() {
    this.Param?.BpDiceCase &&
      (this.DiceOutlineBp = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName(this.Param.BpDiceCase),
        1,
      )),
      this.Param?.DiceCameraCase &&
        (this.DiceCamera = UE.KuroCollectActorComponent.GetActorWithTag(
          FNameUtil_1.FNameUtil.GetDynamicFName(this.Param.DiceCameraCase),
          1,
        ));
  }
  UpdateDicePoint(i, t = 0) {
    UE.KismetMaterialLibrary.SetScalarParameterValue(
      GlobalData_1.GlobalData.GameInstance.GetWorld(),
      this.z2c,
      FNameUtil_1.FNameUtil.GetDynamicFName("DicePoints_" + (t + 1)),
      i,
    );
  }
  cEo(i) {
    UE.KismetMaterialLibrary.SetScalarParameterValue(
      GlobalData_1.GlobalData.GameInstance.GetWorld(),
      this.z2c,
      this.Z2c,
      i,
    );
  }
  eFc() {
    this.TimerRemove?.(), this.Promise?.SetResult(), (this.Promise = void 0);
  }
  TickStart() {
    (this.e8 = 0), this.TimerCreate?.();
  }
}
exports.RollDice = RollDice;
//# sourceMappingURL=RollDice.js.map
