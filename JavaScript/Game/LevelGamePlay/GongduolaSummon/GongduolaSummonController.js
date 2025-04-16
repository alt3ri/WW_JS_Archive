"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GongduolaSummonController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MAX_NUM_PER_FRAME = 100;
class GongduolaSummonController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      (this.w_c = Stats_1.Stat.Create("GongduolaSummonController.QueryPoint")),
      !0
    );
  }
  static StartSummonGongduola(t) {
    if (ModelManager_1.ModelManager.GongduolaSummonModel.IsLoaded) {
      if (!this.R_c) {
        (this.R_c = !0),
          (this.A_c = t),
          (this.P_c = MathUtils_1.MathUtils.MaxFloat),
          (this.x_c = 0),
          (this.U_c = void 0);
        t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
        if (t) {
          this.D_c = t.ActorLocationProxy;
          var n =
            ModelManager_1.ModelManager.GongduolaSummonModel.SummonedActorComp;
          if (n && n.Valid) {
            n = n?.ActorLocationProxy;
            if (
              Vector_1.Vector.DistSquared2D(this.D_c, n) <=
              ModelManager_1.ModelManager.GongduolaSummonModel.GetResummonDistanceSquared()
            )
              return this.B_c(), void (this.R_c = !1);
          }
          n = t.ActorGravityDirectProxy;
          let o = "NegativeZ";
          if (n?.Equals(Vector_1.Vector.UpVectorProxy)) o = "PositiveZ";
          else {
            if (!n?.Equals(Vector_1.Vector.DownVectorProxy))
              return void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Item",
                  31,
                  "[GongduolaSummonController.StartSummonGongduola] 未知的重力方向，只支持正反Z",
                  ["Gravity", n],
                )
              );
            o = "NegativeZ";
          }
          (this.k_c =
            ModelManager_1.ModelManager.GongduolaSummonModel.GetSummonPointInfo(
              o,
            )),
            this.k_c.length <= 0
              ? Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Item",
                  31,
                  "[GongduolaSummonController.StartSummonGongduola] 未找到可召唤的点",
                  ["Gravity", o],
                )
              : (this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
                  this.O_c();
                }, 50));
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Item",
              31,
              "[GongduolaSummonController.StartSummonGongduola] 未找到角色ActorComp",
            ),
            (this.R_c = !1);
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SummonGongdola",
          31,
          "[GongduolaSummonController.StartSummonGongduola] 未加载配置",
        );
  }
  static O_c() {
    this.w_c.Start();
    let o = 0;
    for (; this.x_c < this.k_c.length && o < MAX_NUM_PER_FRAME; ) {
      var t = this.k_c[this.x_c],
        n = Vector_1.Vector.DistSquared2D(this.D_c, t.Pos);
      n <=
        ModelManager_1.ModelManager.GongduolaSummonModel.GetRadiusSquared() &&
        n < this.P_c &&
        ((this.P_c = n), (this.U_c = t)),
        this.x_c++,
        o++;
    }
    var e;
    this.x_c >= this.k_c.length &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe),
      this.U_c
        ? (((e = Protocol_1.Aki.Protocol.Soc.create()).lT_ = this.A_c),
          (e.Dt1 = this.U_c.Key),
          Net_1.Net.Call(17470, e, (o) => {
            o?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                o.Q4n,
                21705,
              ),
              (this.R_c = !1);
          }))
        : (this.R_c = !1)),
      this.w_c.Stop();
  }
  static OnClear() {
    return (
      this.TDe &&
        (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0)),
      !0
    );
  }
  static PlaySummonAnim(t) {
    (ModelManager_1.ModelManager.GongduolaSummonModel.SummonedActorComp =
      t.GetComponent(1)),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        ModelManager_1.ModelManager.GongduolaSummonModel.SummonAmPath,
        UE.AnimMontage,
        (o) => {
          o
            ? (this.B_c(),
              (this.q_c = o),
              (this.G_c = t.GetComponent(232)),
              this.G_c
                ? ((this.F_c = t.GetComponent(233)),
                  this.F_c
                    ? ((this.N_c = t.GetComponent(112)),
                      this.N_c
                        ? ((this.Tu1 = t.GetComponent(203)),
                          this.Tu1
                            ? (this.G_c.StartForceDisableAnimOptimization(
                                3,
                                !1,
                              ),
                              this.N_c.StartForceDisableAnimDelay(0),
                              this.G_c.Play(this.q_c, this.V_c),
                              Log_1.Log.CheckInfo() &&
                                Log_1.Log.Info(
                                  "SummonGongdola",
                                  31,
                                  "[CHTest] PlaySummonAnim",
                                ),
                              this.Tu1.HasTag(786205849) ||
                                this.Tu1.AddTag(786205849),
                              TimerSystem_1.TimerSystem.Delay(() => {
                                ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                                  t,
                                  !0,
                                  "GongduolaSummonController.PlaySummonAnim",
                                  !0,
                                ),
                                  (this.F_c.IsSummoningPerform = !0),
                                  this.F_c?.EnableUeMovementTick(
                                    "GongduolaSummonController.PlaySummonAnim",
                                  );
                              }, 100))
                            : Log_1.Log.CheckError() &&
                              Log_1.Log.Error(
                                "Item",
                                31,
                                "[GongduolaSummonController.PlaySummonAnim] 未找到BaseTagComponent",
                              ))
                        : Log_1.Log.CheckError() &&
                          Log_1.Log.Error(
                            "Item",
                            31,
                            "[GongduolaSummonController.PlaySummonAnim] 未找到UeSkeletalTickManageComponent",
                          ))
                    : Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Item",
                        31,
                        "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleMoveComponent",
                      ))
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Item",
                    31,
                    "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleAnimationComponent",
                  ))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Item",
                31,
                "[GongduolaSummonController.PlaySummonAnim] 加载召唤动画失败",
                [
                  "Path",
                  ModelManager_1.ModelManager.GongduolaSummonModel.SummonAmPath,
                ],
              );
        },
      );
  }
  static PlayCancelSummonAnim(t, n, e, l) {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      ModelManager_1.ModelManager.GongduolaSummonModel.CancelSummonAmPath,
      UE.AnimMontage,
      (o) => {
        o
          ? ((this.j_c = o),
            (ModelManager_1.ModelManager.GongduolaSummonModel.SummonLocation =
              n),
            (ModelManager_1.ModelManager.GongduolaSummonModel.SummonRotation =
              e),
            (ModelManager_1.ModelManager.GongduolaSummonModel.SummonGravityDir =
              l),
            (this.G_c = t.GetComponent(232)),
            this.G_c
              ? ((this.F_c = t.GetComponent(233)),
                this.F_c
                  ? ((this.H_c = t.GetComponent(1)),
                    this.H_c
                      ? ((this.N_c = t.GetComponent(112)),
                        this.N_c
                          ? ((this.Tu1 = t.GetComponent(203)),
                            this.Tu1
                              ? ((this.F_c.IsSummoningPerform = !0),
                                this.N_c.StartForceDisableAnimDelay(0),
                                this.G_c.StartForceDisableAnimOptimization(
                                  3,
                                  !1,
                                ),
                                this.F_c?.EnableUeMovementTick(
                                  "GongduolaSummonController.PlaySummonAnim",
                                ),
                                this.G_c.Play(this.j_c, this.$_c),
                                this.Tu1.HasTag(786205849) ||
                                  this.Tu1.AddTag(786205849),
                                Log_1.Log.CheckInfo() &&
                                  Log_1.Log.Info(
                                    "SummonGongdola",
                                    31,
                                    "[CHTest] PlayCancelSummonAnim",
                                  ))
                              : Log_1.Log.CheckError() &&
                                Log_1.Log.Error(
                                  "Item",
                                  31,
                                  "[GongduolaSummonController.PlaySummonAnim] 未找到BaseTagComponent",
                                ))
                          : Log_1.Log.CheckError() &&
                            Log_1.Log.Error(
                              "Item",
                              31,
                              "[GongduolaSummonController.PlaySummonAnim] 未找到UeSkeletalTickManageComponent",
                            ))
                      : Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "Item",
                          31,
                          "[GongduolaSummonController.PlaySummonAnim] 未找到BaseActorComponent",
                        ))
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Item",
                      31,
                      "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleMoveComponent",
                    ))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Item",
                  31,
                  "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleAnimationComponent",
                ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Item",
              31,
              "[GongduolaSummonController.PlaySummonAnim] 加载召唤动画失败",
              [
                "Path",
                ModelManager_1.ModelManager.GongduolaSummonModel.SummonAmPath,
              ],
            );
      },
    );
  }
  static StopCancelSummonAnim(o) {
    o = o.GetComponent(232);
    o
      ? (o.StopMontage(), o.StopModelBuffer())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Item",
          31,
          "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleAnimationComponent",
        );
  }
  static W_c() {
    (this.F_c.IsSummoningPerform = !1),
      this.N_c?.CancelForceDisableAnimDelay(0),
      this.G_c?.CancelForceDisableAnimOptimization(3);
  }
  static B_c() {
    const o = ModelManager_1.ModelManager.GongduolaSummonModel.SummonConfig;
    var t;
    o
      ? (t =
          ModelManager_1.ModelManager.GongduolaSummonModel.SummonedActorComp) &&
        t.Valid
        ? (o.BanInput &&
            ((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
              !0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ForceReleaseInput,
              ModelManager_1.ModelManager.GongduolaSummonModel.BanInputReason,
            ),
            ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "SummonGongdola",
              31,
              "[StartLookAtGongduola] StartLookAtGongduola BanInput",
            ),
          (t = Vector_1.Vector.Create(t.ActorLocationProxy)).Set(
            t.X,
            t.Y,
            t.Z + o.OffsetZ,
          ),
          ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(
            t,
            o.FadeInTime,
            o.StayTime,
            o.FadeOutTime,
            o.LockCamera,
            void 0,
            void 0,
          ),
          (t = o.FadeInTime + o.StayTime + o.FadeOutTime),
          TimerSystem_1.TimerSystem.Delay(() => {
            o.BanInput &&
              ((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
                !1),
              ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(),
              Log_1.Log.CheckInfo()) &&
              Log_1.Log.Info(
                "SummonGongdola",
                31,
                "[StartLookAtGongduola] StartLookAtGongduola StopBanInput",
              );
          }, t * MathUtils_1.MathUtils.SecondToMillisecond))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SummonGongdola",
            31,
            "[GongduolaSummonController.StartLookAtGongduola] 未找到GongduolaActorComp",
          )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SummonGongdola",
          31,
          "[GongduolaSummonController.StartLookAtGongduola] 未找到召唤配置",
        );
  }
}
(exports.GongduolaSummonController = GongduolaSummonController),
  ((_a = GongduolaSummonController).w_c = void 0),
  (GongduolaSummonController.R_c = !1),
  (GongduolaSummonController.k_c = []),
  (GongduolaSummonController.D_c = Vector_1.Vector.Create()),
  (GongduolaSummonController.TDe = void 0),
  (GongduolaSummonController.x_c = 0),
  (GongduolaSummonController.U_c = void 0),
  (GongduolaSummonController.P_c = MathUtils_1.MathUtils.MaxFloat),
  (GongduolaSummonController.A_c = -1),
  (GongduolaSummonController.q_c = void 0),
  (GongduolaSummonController.j_c = void 0),
  (GongduolaSummonController.H_c = void 0),
  (GongduolaSummonController.G_c = void 0),
  (GongduolaSummonController.F_c = void 0),
  (GongduolaSummonController.N_c = void 0),
  (GongduolaSummonController.Tu1 = void 0),
  (GongduolaSummonController.V_c = (o, t) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Temp",
        31,
        "[ChTest]OnSummonAnimEnd",
        ["Montage", o?.GetName()],
        ["interrupted", t],
      ),
      o === _a.q_c &&
        (_a.G_c.RemoveOnMontageEnded(_a.V_c),
        _a.Tu1?.HasTag(786205849) && _a.Tu1?.RemoveTag(786205849),
        _a.W_c());
  }),
  (GongduolaSummonController.$_c = (o, t) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Temp",
        31,
        "[ChTest]OnCancelSummonAnimEnd",
        ["Montage", o?.GetName()],
        ["interrupted", t],
      ),
      o === _a.j_c && (_a.G_c.RemoveOnMontageEnded(_a.$_c), _a.W_c());
  });
//# sourceMappingURL=GongduolaSummonController.js.map
