"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManipulateConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase"),
  DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  SECOND_TO_MICROSECOND = 1e3;
class ManipulateConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.mrr = void 0),
      (this.drr = -0),
      (this.Crr = -0),
      (this.grr = void 0),
      (this.frr = void 0),
      (this.prr = void 0),
      (this.vrr = []),
      (this.Mrr = []),
      (this.Srr = -0),
      (this.Err = -0),
      (this.yrr = ""),
      (this.Irr = ""),
      (this.Trr = ""),
      (this.Lrr = ""),
      (this.Drr = -0),
      (this.Rrr = -0),
      (this.Urr = -0);
  }
  OnInit() {
    return (
      (this.mrr = new Array(
        "Manipulate_Precast_Line_L",
        "Manipulate_Precast_Line_R",
        "Manipulate_Precast_Line_F",
        "Manipulate_Precast_Line_B",
      )),
      (this.drr = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ManipulatableItemDisconnectDistance",
      )),
      (this.Crr = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ManipulatableItemSearchRange",
      )),
      (this.grr = CommonParamById_1.configCommonParamById.GetStringConfig(
        "ManipulatableItemPushFXAsset",
      )),
      (this.frr = CommonParamById_1.configCommonParamById.GetStringConfig(
        "ManipulateItemAppearEffect",
      )),
      (this.prr = CommonParamById_1.configCommonParamById.GetStringConfig(
        "ManipulateItemDisappearEffect",
      )),
      (this.vrr = new Array()),
      CommonParamById_1.configCommonParamById
        .GetIntArrayConfig("ManipulatebleItemSearchAngle")
        .forEach((t) => {
          this.vrr.push(t);
        }),
      (this.Mrr = new Array()),
      CommonParamById_1.configCommonParamById
        .GetIntArrayConfig("ManipulatebleItemSearchAngleWeight")
        .forEach((t) => {
          this.Mrr.push(t);
        }),
      (this.Srr =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "ManipulatePrecastTime",
        ) * SECOND_TO_MICROSECOND),
      (this.Err = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ManipulateDontUseLineDistance",
      )),
      (this.yrr = CommonParamById_1.configCommonParamById.GetStringConfig(
        "ManipulateItemLine_Common",
      )),
      (this.Irr = CommonParamById_1.configCommonParamById.GetStringConfig(
        "ManipulatableItemLineNiagaraSystemAssetPath",
      )),
      (this.Trr = CommonParamById_1.configCommonParamById.GetStringConfig(
        "ManipulatableItemHandFXAssetPath",
      )),
      (this.Lrr = CommonParamById_1.configCommonParamById.GetStringConfig(
        "MatControllerDAPath",
      )),
      (this.Drr = CommonParamById_1.configCommonParamById.GetFloatConfig(
        "ManipulatableItemMass",
      )),
      (this.Rrr = CommonParamById_1.configCommonParamById.GetFloatConfig(
        "ManipulatableItemLinearDamping",
      )),
      (this.Urr = CommonParamById_1.configCommonParamById.GetFloatConfig(
        "ManipulatableItemAngularDamping",
      )),
      !0
    );
  }
  get ManipulatePrecastLines() {
    return this.mrr;
  }
  get DisconnectDistance() {
    return this.drr;
  }
  get SearchRange() {
    return this.Crr;
  }
  get PushEffectPath() {
    return this.grr;
  }
  get ItemAppearEffectPath() {
    return this.frr;
  }
  get ItemDisappearEffectPath() {
    return this.prr;
  }
  get SearchAnglesCos() {
    return this.vrr;
  }
  get SearchAnglesWeight() {
    return this.Mrr;
  }
  get PrecastTime() {
    return this.Srr;
  }
  get DontUseLineDistance() {
    return this.Err;
  }
  get CommonItemLine() {
    return this.yrr;
  }
  get LineFxNsPath() {
    return this.Irr;
  }
  get MatControllerDaPath() {
    return this.Lrr;
  }
  get HandFxPath() {
    return this.Trr;
  }
  get ItemMass() {
    return this.Drr;
  }
  get ItemLinearDamping() {
    return this.Rrr;
  }
  get ItemAngularDampling() {
    return this.Urr;
  }
  GetPrecastLineValue(t, e) {
    var a = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(10, t);
    if (a) return this.Arr(a.ManipulatePoints, a.Duration, e);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("World", 32, "加载失败，Manipulate Precast表中没有该项", [
        "Row Name",
        t,
      ]);
  }
  GetItemLineValue(t, e) {
    var a = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(9, t);
    if (a) return this.Arr(a.ManipulatePoints, a.Duration, e);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("World", 32, "加载失败，Manipulate Item表中没有该项", [
        "Row Name",
        t,
      ]);
  }
  Arr(t, e, a) {
    var i = t.Num(),
      e = (i - 1) / e;
    return a <= 0
      ? t.Get(0).Location
      : 1 <= a
        ? t.Get(i - 1).Location
        : ((i = a * e),
          (a = Math.floor(i)),
          (e = t.Get(a)),
          (t = t.Get(a + 1)),
          2 !== e.PointType
            ? ((i = i - a),
              0 === e.PointType
                ? MathUtils_1.MathUtils.LerpVector(e.Location, t.Location, i)
                : this.Prr(
                    e.Location,
                    e.LeaveTangent,
                    t.Location,
                    t.ArriveTangent,
                    i,
                  ))
            : e.Location);
  }
  OnClear() {
    return (
      (this.mrr = void 0),
      (this.grr = void 0),
      (this.frr = void 0),
      !(this.prr = void 0)
    );
  }
  Prr(t, e, a, i, r) {
    var n = r * r,
      s = n * r,
      o = 2 * s - 3 * n + 1,
      r = s - 2 * n + r,
      m = s - n,
      s = -2 * s + 3 * n,
      n = Vector_1.Vector.Create(t).MultiplyEqual(o),
      t = Vector_1.Vector.Create(e).MultiplyEqual(r),
      o = Vector_1.Vector.Create(i).MultiplyEqual(m),
      e = Vector_1.Vector.Create(a).MultiplyEqual(s);
    return n.AdditionEqual(t).AdditionEqual(o).AdditionEqual(e), n.ToUeVector();
  }
}
exports.ManipulateConfig = ManipulateConfig;
//# sourceMappingURL=ManipulateConfig.js.map
