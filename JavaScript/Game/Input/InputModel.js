"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputModel = exports.INPUT_COMMAND_TRANSFORM_DT_PATH = void 0);
const ModelBase_1 = require("../../Core/Framework/ModelBase"),
  DataTableUtil_1 = require("../../Core/Utils/DataTableUtil"),
  Switcher_1 = require("../Utils/Switcher"),
  InputLayer_1 = require("./InputLayer");
exports.INPUT_COMMAND_TRANSFORM_DT_PATH =
  "/Game/Aki/Data/Fight/DT_InputCommandTransform.DT_InputCommandTransform";
class InputModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.jMe = new Map([
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
        [7, 0],
        [8, 0],
        [9, 0],
        [10, 0],
      ])),
      (this.WMe = new Array()),
      (this.KMe = new Map()),
      (this.QMe = new Map()),
      (this.whh = new Map()),
      (this.OnlyMoveForward = new Switcher_1.Switcher(!1)),
      (this.IsOpenInputAxisLog = !1),
      (this.Ze_ = void 0),
      (this.et_ = !1),
      (this.eKa = !1);
  }
  GetHandlers() {
    return this.WMe;
  }
  GetPressTimes() {
    return this.KMe;
  }
  GetAxisValues() {
    return this.QMe;
  }
  get LastClearAxisValue() {
    return this.eKa;
  }
  ResetLastTemporaryClearAxisValues() {
    this.eKa = !1;
  }
  TemporaryClearAxisValues() {
    (this.eKa = !0), this.QMe.clear();
  }
  NextFrameRefreshAxisValues() {
    this.eKa = !0;
  }
  QueryCommandPriority(t) {
    return this.jMe.get(t);
  }
  AddInputHandler(t) {
    this.WMe.includes(t) ||
      (this.WMe.push(t),
      this.WMe.sort((t, e) => e.GetPriority() - t.GetPriority()));
  }
  IsAxisBlock(t) {
    for (const e of this.WMe) if (e.GetInputFilter().BlockAxis(t)) return !0;
    return !1;
  }
  RemoveInputHandler(t) {
    t = this.WMe.indexOf(t);
    -1 !== t && this.WMe.splice(t, 1);
  }
  OnClear() {
    this.WMe.splice(0, this.WMe.length), this.KMe.clear(), this.QMe.clear();
    for (const t of this.whh.values()) t.Clear();
    return this.whh.clear(), !0;
  }
  AddInputLayer(t, e) {
    let s = this.whh.get(t);
    s || ((s = new InputLayer_1.InputLayerUnit()), this.whh.set(t, s)),
      s.Add(e);
  }
  RemoveInputLayer(t) {
    var e = this.whh.get(t.UnitId);
    e && (e.Remove(t), 0 === e.LayerMap.size) && this.whh.delete(t.UnitId);
  }
  GetInputLayer(t, e) {
    return this.whh.get(t)?.LayerMap.get(e);
  }
  GetInputLayers(t) {
    return this.whh.get(t)?.GetLayerList();
  }
  GetInputCommandTransformData(t, e) {
    if ((this.et_ || this.InitInputCommandTransformMap(), this.Ze_))
      return this.Ze_.get(t)?.get(e);
  }
  InitInputCommandTransformMap() {
    if (!this.et_) {
      this.et_ = !0;
      var t,
        e = new Map();
      for (const s of DataTableUtil_1.DataTableUtil.GetDataTableAllRow(23))
        0 !== s.Action &&
          0 !== s.State &&
          "None" !== s.Tag.TagName &&
          (e.has(s.Action) || e.set(s.Action, new Map()),
          (t = e.get(s.Action)).has(s.State)
            ? t.get(s.State).push(s)
            : t.set(s.State, [s]));
      this.Ze_ = e;
    }
  }
}
exports.InputModel = InputModel;
//# sourceMappingURL=InputModel.js.map
