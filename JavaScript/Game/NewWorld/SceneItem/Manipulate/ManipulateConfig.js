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
      (this._nr = void 0),
      (this.unr = -0),
      (this.cnr = -0),
      (this.mnr = void 0),
      (this.dnr = void 0),
      (this.Cnr = void 0),
      (this.gnr = []),
      (this.fnr = []),
      (this.pnr = -0),
      (this.vnr = -0),
      (this.Mnr = ""),
      (this.Enr = ""),
      (this.Snr = ""),
      (this.ynr = ""),
      (this.Inr = -0),
      (this.Tnr = -0),
      (this.Lnr = -0);
  }
  OnInit() {
    return (
      (this._nr = new Array(
        "Manipulate_Precast_Line_L",
        "Manipulate_Precast_Line_R",
        "Manipulate_Precast_Line_F",
        "Manipulate_Precast_Line_B",
      )),
      (this.unr = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ManipulatableItemDisconnectDistance",
      )),
      (this.cnr = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ManipulatableItemSearchRange",
      )),
      (this.mnr = CommonParamById_1.configCommonParamById.GetStringConfig(
        "ManipulatableItemPushFXAsset",
      )),
      (this.dnr = CommonParamById_1.configCommonParamById.GetStringConfig(
        "ManipulateItemAppearEffect",
      )),
      (this.Cnr = CommonParamById_1.configCommonParamById.GetStringConfig(
        "ManipulateItemDisappearEffect",
      )),
      (this.gnr = new Array()),
      CommonParamById_1.configCommonParamById
        .GetIntArrayConfig("ManipulatebleItemSearchAngle")
        .forEach((t) => {
          this.gnr.push(t);
        }),
      (this.fnr = new Array()),
      CommonParamById_1.configCommonParamById
        .GetIntArrayConfig("ManipulatebleItemSearchAngleWeight")
        .forEach((t) => {
          this.fnr.push(t);
        }),
      (this.pnr =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "ManipulatePrecastTime",
        ) * SECOND_TO_MICROSECOND),
      (this.vnr = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ManipulateDontUseLineDistance",
      )),
      (this.Mnr = CommonParamById_1.configCommonParamById.GetStringConfig(
        "ManipulateItemLine_Common",
      )),
      (this.Enr = CommonParamById_1.configCommonParamById.GetStringConfig(
        "ManipulatableItemLineNiagaraSystemAssetPath",
      )),
      (this.Snr = CommonParamById_1.configCommonParamById.GetStringConfig(
        "ManipulatableItemHandFXAssetPath",
      )),
      (this.ynr = CommonParamById_1.configCommonParamById.GetStringConfig(
        "MatControllerDAPath",
      )),
      (this.Inr = CommonParamById_1.configCommonParamById.GetFloatConfig(
        "ManipulatableItemMass",
      )),
      (this.Tnr = CommonParamById_1.configCommonParamById.GetFloatConfig(
        "ManipulatableItemLinearDamping",
      )),
      (this.Lnr = CommonParamById_1.configCommonParamById.GetFloatConfig(
        "ManipulatableItemAngularDamping",
      )),
      !0
    );
  }
  get ManipulatePrecastLines() {
    return this._nr;
  }
  get DisconnectDistance() {
    return this.unr;
  }
  get SearchRange() {
    return this.cnr;
  }
  get PushEffectPath() {
    return this.mnr;
  }
  get ItemAppearEffectPath() {
    return this.dnr;
  }
  get ItemDisappearEffectPath() {
    return this.Cnr;
  }
  get SearchAnglesCos() {
    return this.gnr;
  }
  get SearchAnglesWeight() {
    return this.fnr;
  }
  get PrecastTime() {
    return this.pnr;
  }
  get DontUseLineDistance() {
    return this.vnr;
  }
  get CommonItemLine() {
    return this.Mnr;
  }
  get LineFxNsPath() {
    return this.Enr;
  }
  get MatControllerDaPath() {
    return this.ynr;
  }
  get HandFxPath() {
    return this.Snr;
  }
  get ItemMass() {
    return this.Inr;
  }
  get ItemLinearDamping() {
    return this.Tnr;
  }
  get ItemAngularDampling() {
    return this.Lnr;
  }
  GetPrecastLineValue(t, e) {
    var a = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(10, t);
    if (a) return this.Dnr(a.ManipulatePoints, a.Duration, e);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("World", 32, "加载失败，Manipulate Precast表中没有该项", [
        "Row Name",
        t,
      ]);
  }
  GetItemLineValue(t, e) {
    var a = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(9, t);
    if (a) return this.Dnr(a.ManipulatePoints, a.Duration, e);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("World", 32, "加载失败，Manipulate Item表中没有该项", [
        "Row Name",
        t,
      ]);
  }
  Dnr(t, e, a) {
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
                : this.Rnr(
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
      (this._nr = void 0),
      (this.mnr = void 0),
      (this.dnr = void 0),
      !(this.Cnr = void 0)
    );
  }
  Rnr(t, e, a, i, r) {
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
