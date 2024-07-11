"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckPointEffectController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  EffectUtil_1 = require("../../../../Utils/EffectUtil");
class CheckPointEffectInfo {
  constructor() {
    (this.EffectPathKey = ""),
      (this.EffectSpawnPosition = Vector_1.Vector.ZeroVectorProxy);
  }
}
class CheckPointEffectController {
  constructor() {
    (this.qKt = new Map()), (this.GKt = new Map());
  }
  EnableAllEffects(t) {
    if (this.GKt)
      for (var [e, o] of this.qKt) t ? this.NKt(e, o) : this.StopEffect(e);
  }
  OnNodeStart(t, e, o, i) {
    var r = this.qKt.get(t);
    r ||
      (((r = new CheckPointEffectInfo()).EffectPathKey = e),
      (r.EffectSpawnPosition = o),
      this.qKt.set(t, r),
      i) ||
      this.NKt(t, r);
  }
  OnNodeEnd(t) {
    this.qKt.delete(t), this.StopEffect(t);
  }
  OnBtApplyExpressionOccupation(t) {
    t || this.EnableAllEffects(!0);
  }
  OnBtReleaseExpressionOccupation(t) {
    t || this.EnableAllEffects(!1);
  }
  NKt(o, t) {
    var e = EffectUtil_1.EffectUtil.GetEffectPath(
      t.EffectPathKey ?? "DA_Fx_Group_Sl3_Cishi_10idle",
    );
    StringUtils_1.StringUtils.IsBlank(e) ||
      EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        new UE.Transform(
          Rotator_1.Rotator.ZeroRotator,
          t.EffectSpawnPosition.ToUeVector(),
          Vector_1.Vector.OneVector,
        ),
        e,
        "[CheckPointEffectController.CreateTrackEffect]",
        void 0,
        3,
        void 0,
        (t, e) => {
          5 !== t
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "GeneralLogicTree",
                19,
                "GeneralLogicTree:CheckPointEffectController.SpawnEffect 错误",
                ["result", t],
              )
            : e &&
              (this.GKt.has(o) && this.StopEffect(o),
              this.GKt.set(o, e),
              EffectSystem_1.EffectSystem.RegisterCustomCheckOwnerFunc(
                e,
                () => void 0 !== this.GKt.get(o),
              ));
        },
      );
  }
  StopEffect(t) {
    var e = this.GKt.get(t) ?? 0;
    EffectSystem_1.EffectSystem.IsValid(e) &&
      EffectSystem_1.EffectSystem.StopEffectById(
        e,
        "[CheckPointEffectController.End]",
        !0,
      ),
      this.GKt.delete(t);
  }
}
exports.CheckPointEffectController = CheckPointEffectController;
//# sourceMappingURL=CheckPointEffectController.js.map
