"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformRideVehicleState = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  NpcPerformBaseState_1 = require("./NpcPerformBaseState");
class NpcPerformRideVehicleState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments),
      (this._Ul = new Map()),
      (this.uUl = !1),
      (this.uKl = !1),
      (this.dKl = !1),
      (this.Qer = void 0),
      (this.mKl = (t, e) => {
        (this.uUl = !1), (this.dKl = !1), (this.Qer = void 0);
      }),
      (this.OnLoopMontageEndForTurning = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "NPC",
            50,
            "[NpcPerformRideVehicleState.OnLoopMontageEndForTurning][交互转身] Montage播放完毕",
            ["PbDataID", this.ConfigId],
          ),
          this.AnimComp?.MainAnimInstance?.OnAllMontageInstancesEnded.Remove(
            this.OnLoopMontageEndForTurning,
          ),
          9 !== this.Owner.Entity.GetComponent(185)?.GetCurrentState() &&
            this.TurnActionController.TurnToInteractTarget();
      });
  }
  OnCreate(t) {
    if ((super.OnCreate(t), t?.ShowOnRideInVehicle?.length))
      for (const e of t.ShowOnRideInVehicle) this._Ul.set(e.Type, e.Montage);
  }
  OnEnter(t) {
    this.PerformComp?.IsBaseRoleNpc || this.CKl();
  }
  OnExit(t) {
    9 === t || this.PerformComp?.IsBaseRoleNpc || this.vtr();
  }
  OnUpdate(t) {
    this.PerformComp?.IsBaseRoleNpc ||
      this.PerformComp?.IsInPlot ||
      this.InteractRequestWaiting ||
      this.TurnActionController.NeedTurn ||
      this.CKl();
  }
  CKl() {
    if (!this.uKl && !this.uUl) {
      const e = this.Owner?.Entity?.GetComponent(226);
      var t;
      e?.VehicleType &&
        ((t = this._Ul.get(e.VehicleType))
          ? ((this.uKl = !0),
            ResourceSystem_1.ResourceSystem.LoadAsync(
              t,
              UE.AnimMontage,
              (t) => {
                (this.uKl = !1),
                  t?.IsValid() &&
                    e.IsOnVehicle &&
                    8 === this.PerformComp?.GetCurrentState() &&
                    (this.PlayMontage({
                      MontageAsset: t,
                      OnEndCallback: this.mKl,
                    }),
                    (this.uUl = !0),
                    (this.Qer = t));
              },
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "NPC",
              50,
              "获取NPC乘坐载具Montage失败",
              ["PbDataId", this.ConfigId],
              ["VehicleType", e.VehicleType],
            ));
    }
  }
  vtr(t = 0) {
    (!this.uUl && !this.uUl) ||
      this.dKl ||
      ((this.dKl = !0), this.StopMontage({ Method: 2 }));
  }
  OnPlayerInteractTurnActionStart() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "NPC",
        50,
        "[NpcPerformRideVehicleState.OnPlayerInteractTurnActionStart] 开始执行交互转身",
        ["PbDataID", this.ConfigId],
      ),
      (this.InteractRequestWaiting = !0);
    var t = this.Owner?.Entity?.GetComponent(43);
    t?.MainAnimInstance?.IsAnyMontagePlaying() &&
    this.TurnActionController.NeedTurn
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "NPC",
            50,
            "[NpcPerformRideVehicleState.OnPlayerInteractTurnActionStart][交互转身] 停止播放Montage",
            ["PbDataID", this.ConfigId],
            [
              "CurrentMontage",
              t?.MainAnimInstance?.GetCurrentActiveMontage()?.GetName(),
            ],
          ),
        this.AnimComp?.MainAnimInstance?.OnAllMontageInstancesEnded.Add(
          this.OnLoopMontageEndForTurning,
        ),
        this.Utr())
      : this.TurnActionController.TurnToInteractTarget();
  }
  OnPlayerInteractTurnActionEnd() {
    var t = this.Owner.Entity.GetComponent(43);
    t.MainAnimInstance.IsAnyMontagePlaying() &&
      this.TurnActionController.NeedTurn &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "NPC",
          50,
          "[NpcPerformRideVehicleState.OnPlayerInteractTurnActionEnd][结束交互转身] 停止播放Montage",
          ["PbDataID", this.ConfigId],
          [
            "CurrentMontage",
            t?.MainAnimInstance?.GetCurrentActiveMontage()?.GetName(),
          ],
        ),
      this.Utr());
    const e = this.Owner.Entity.GetComponent(226);
    e?.GetSeatTransform(this.TmpTrans) &&
      (this.TmpTrans.GetRotation().GetForwardVector(this.TmpVector),
      this.TurnActionController.UpdateDefaultDirect(this.TmpVector),
      (this.TurnActionController.OnTurnToDefaultForwardEndHandle = () => {
        this?.Owner?.Valid &&
          ((this.TurnActionController.NeedTurn = !1),
          e?.AttachAndSetPassengerTransform());
      }),
      this.TurnActionController.TurnToDefaultForward(),
      (this.InteractRequestWaiting = !1));
  }
  Utr() {
    (this.dKl = !0),
      this.StopMontage({ Method: 0, BlendOutTime: 0.5, Montage: this.Qer });
  }
}
exports.NpcPerformRideVehicleState = NpcPerformRideVehicleState;
//# sourceMappingURL=NpcPerformRideVehicleState.js.map
