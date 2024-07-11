"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputDistributeModel = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../../Game/Manager/ConfigManager"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputActionHandle_1 = require("./InputActionHandle"),
  InputAxisHandle_1 = require("./InputAxisHandle"),
  InputDistributeDefine_1 = require("./InputDistributeDefine"),
  InputDistributeDelay_1 = require("./InputDistributeDelay"),
  InputDistributeSetupDefine_1 = require("./InputDistributeSetupDefine"),
  InputDistributeTag_1 = require("./InputDistributeTag"),
  InputKeyHandle_1 = require("./InputKeyHandle"),
  InputTouchHandle_1 = require("./InputTouchHandle"),
  EMIT_EVENT_AXIS_DELTA = 0.05;
class InputDistributeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Ymr = []),
      (this.Jmr = new Set()),
      (this.zmr = []),
      (this.Zmr = new Map()),
      (this.edr = new Map()),
      (this.tdr = new Map()),
      (this.idr = new Map()),
      (this.odr = new Map()),
      (this.rdr = new Map()),
      (this.ndr = new Set()),
      (this.sdr = void 0),
      (this.hdr = void 0),
      (this.ldr = 0);
  }
  OnInit() {
    return (
      this._dr(),
      this.udr(),
      this.cdr(),
      this.mdr(),
      this.ddr(),
      this.Cdr(),
      this.SetInputDistributeTag(
        InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag,
      ),
      !0
    );
  }
  OnClear() {
    this.ClearAllNotAllowFightInputViewNames(),
      this.Zmr.clear(),
      (this.zmr.length = 0);
    for (const t of this.idr.values()) t.Reset();
    this.idr.clear();
    for (const i of this.odr.values()) i.Reset();
    this.odr.clear();
    for (const e of this.tdr.values()) e.Reset();
    return this.tdr.clear(), !0;
  }
  Cdr() {
    for (const i of InputDistributeSetupDefine_1.inputDistributeSetups) {
      var t = new i();
      this.zmr.push(t);
    }
  }
  RefreshInputDistributeTag() {
    for (const t of this.zmr) if (t.OnRefresh()) return;
  }
  udr() {
    for (var [t, i] of InputDistributeDefine_1.actionTagMap) this.gdr(t, i);
  }
  cdr() {
    for (var [t, i] of InputDistributeDefine_1.axisTagMap) this.fdr(t, i);
  }
  mdr() {
    for (var [t, i] of InputDistributeDefine_1.touchTagMap) this.pdr(t, i);
  }
  ddr() {
    for (var [t, i] of InputDistributeDefine_1.keyTagMap) this.vdr(t, i);
  }
  InputAction(i, e) {
    var t = this.Mdr(i);
    if (!t)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Input", 8, "输入Action时，没有对应的ActionHandle", [
            "actionName",
            i,
          ]),
        !1
      );
    if (InputDistributeDelay_1.delayInput.includes(i)) {
      let t = void 0;
      this.edr.has(i)
        ? (t = this.edr.get(i))
        : ((t = new InputDistributeDelay_1.InputDistributeDelay()),
          this.edr.set(i, t)),
        t.CheckCondition(i, e) &&
          t.StartDelay(
            ConfigManager_1.ConfigManager.LevelGamePlayConfig
              .InteractInputCacheTime,
            e,
          );
    }
    if (this.HasActionLimitSet()) {
      if (!this.IsActionInLimitSet(i)) return !1;
    } else {
      var n = t.GetInputDistributeTag();
      if (n && !this.IsTagMatchAnyCurrentInputTag(n)) return !1;
      if (!this.Edr(i, n)) return !1;
    }
    return (
      t.InputAction(e),
      e ? (this.sdr = i) : this.sdr && (this.sdr = void 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnInputChangeForCond,
      ),
      !0
    );
  }
  Edr(t, i) {
    var i = this.Sdr(i);
    return (
      !i ||
      !(
        !i.MatchTag(
          InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
            .MouseInputTag,
        ) &&
        !i.MatchTag(
          InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
            .NavigationTag,
        ) &&
        (i = ModelManager_1.ModelManager.UiNavigationModel) &&
        i.CheckKeyNameListInNavigation(t)
      )
    );
  }
  GetCurrentActionName() {
    return this.sdr;
  }
  InputCacheAxisValue(t, i) {
    t = this.ydr(t);
    t && t.InputCacheAxisValue(i);
  }
  InputAxis(t, i) {
    var e = this.ydr(t);
    if (e) {
      if (this.HasActionLimitSet()) {
        if (!this.IsActionInLimitSet(t))
          return void (
            Info_1.Info.AxisInputOptimize &&
            0 !== e.GetCacheAxisValue() &&
            e.InputAxis(0)
          );
      } else {
        var n = e.GetInputDistributeTag();
        if (n && !this.IsTagMatchAnyCurrentInputTag(n))
          return void (
            Info_1.Info.AxisInputOptimize &&
            0 !== e.GetCacheAxisValue() &&
            e.InputAxis(0)
          );
      }
      e.InputAxis(i),
        this.Idr(t, i),
        0 < Math.abs(i) ? (this.hdr = t) : this.hdr && (this.hdr = void 0);
    }
  }
  Idr(t, i) {
    this.sdr !== t && (this.ldr = 0),
      Math.abs(i) &&
        Math.abs(i - this.ldr) > EMIT_EVENT_AXIS_DELTA &&
        ((this.sdr = t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnInputChangeForCond,
        ),
        (this.ldr = i));
  }
  GetCurrentAxisName() {
    return this.hdr;
  }
  InputTouch(t, i) {
    var e,
      n = this.Tdr(t);
    n
      ? ((e = n.GetInputDistributeTag()) &&
          !this.IsTagMatchAnyCurrentInputTag(e)) ||
        n.InputTouch(i)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Input", 8, "输入Action时，没有对应的ActionHandle", [
          "touchId",
          t,
        ]);
  }
  BindAction(t, i) {
    var e = this.Mdr(t);
    e
      ? e.BindAction(i)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Input", 8, "绑定Action回调时，没有对应的ActionHandle", [
          "actionName",
          t,
        ]);
  }
  ExecuteDelayInputAction(t) {
    var i = this.Mdr(t);
    i &&
      this.edr.has(t) &&
      this.edr.get(t).IsInputActive(!1) &&
      i.InputAction(!1);
  }
  BindActions(t, i) {
    for (const e of t) this.BindAction(e, i);
  }
  UnBindAction(t, i) {
    var e = this.Mdr(t);
    e
      ? e.UnBindAction(i)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Input",
          8,
          "取消绑定Action回调时，没有对应的ActionHandle",
          ["actionName", t],
        );
  }
  UnBindActions(t, i) {
    for (const e of t) this.UnBindAction(e, i);
  }
  gdr(t, i) {
    i = new InputActionHandle_1.InputActionHandle(i, t);
    return this.idr.set(t, i), i;
  }
  Mdr(t) {
    return this.idr.get(t);
  }
  BindAxis(t, i) {
    var e = this.ydr(t);
    e
      ? e.BindAxis(i)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Input", 8, "绑定Axis回调时，没有对应的ActionHandle", [
          "axisName",
          t,
        ]);
  }
  BindAxes(t, i) {
    for (const e of t) this.BindAxis(e, i);
  }
  GetAxisValue(t) {
    t = this.ydr(t);
    return t ? t.GetCacheAxisValue() : 0;
  }
  UnBindAxis(t, i) {
    var e = this.ydr(t);
    e
      ? e.UnBindAxis(i)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Input",
          8,
          "取消绑定Action回调时，没有对应的ActionHandle",
          ["axisName", t],
        );
  }
  UnBindAxes(t, i) {
    for (const e of t) this.UnBindAxis(e, i);
  }
  BindTouch(t, i) {
    var e = this.Tdr(t);
    e
      ? e.BindTouch(i)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Input", 8, "绑定Touch回调时，没有对应的ActionHandle", [
          "axisName",
          t,
        ]);
  }
  BindTouches(t, i) {
    for (const e of t) this.BindTouch(e, i);
  }
  UnBindTouch(t, i) {
    var e = this.Tdr(t);
    e
      ? e.UnBindTouch(i)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Input",
          8,
          "取消绑定Touch回调时，没有对应的ActionHandle",
          ["axisName", t],
        );
  }
  UnBindTouches(t, i) {
    for (const e of t) this.UnBindTouch(e, i);
  }
  fdr(t, i) {
    i = new InputAxisHandle_1.InputAxisHandle(i, t);
    return this.odr.set(t, i), i;
  }
  ydr(t) {
    return this.odr.get(t);
  }
  pdr(t, i) {
    i = new InputTouchHandle_1.InputTouchHandle(i, t.toString());
    return this.rdr.set(t, i), i;
  }
  Tdr(t) {
    return this.rdr.get(t);
  }
  vdr(t, i) {
    i = new InputKeyHandle_1.InputKeyHandle(i, t);
    return this.tdr.set(t, i), i;
  }
  Ldr(t) {
    return this.tdr.get(t);
  }
  BindKey(t, i) {
    var e = this.Ldr(t);
    e
      ? e.BindAction(i)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Input", 8, "绑定Key回调时，没有对应的KeyHandle", [
          "keyName",
          t,
        ]);
  }
  UnBindKey(t, i) {
    var e = this.Ldr(t);
    e
      ? e.UnBindAction(i)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Input", 8, "取消绑定Key回调时，没有对应的KeyHandle", [
          "keyName",
          t,
        ]);
  }
  InputKey(t, i) {
    var e,
      t = this.Ldr(t);
    !t ||
      ((e = t.GetInputDistributeTag()) &&
        !this.IsTagMatchAnyCurrentInputTag(e)) ||
      t.InputKey(i);
  }
  HasAnyNotAllowFightInputViewIsOpen() {
    return 0 < this.ndr.size;
  }
  AddNotAllowFightInputViewName(t) {
    this.ndr.add(t);
  }
  RemoveNotAllowFightInputViewName(t) {
    this.ndr.delete(t);
  }
  ClearAllNotAllowFightInputViewNames() {
    this.ndr.clear();
  }
  GetNotAllowFightInputViewNameSet() {
    return this.ndr;
  }
  _dr() {
    for (const e of InputDistributeDefine_1.initializeInputDistributeTagDefine) {
      var t = e.Tag,
        i = e.ParentTag,
        i = this.Sdr(i);
      this.Ddr(t, i);
    }
  }
  Ddr(t, i) {
    i = new InputDistributeTag_1.InputDistributeTag(t, i);
    return this.Zmr.set(t, i), i;
  }
  Sdr(t) {
    return this.Zmr.get(t);
  }
  MatchTag(t, i, e = !1) {
    t = this.Sdr(t);
    return !!i && t.MatchTag(i.TagName, e);
  }
  IsTagMatchAnyCurrentInputTag(t, i = !1) {
    return this.IsTagMatchAnyInputDistributeTags(t, this.Ymr, i);
  }
  IsAnyInputDistributeTagsMatchTag(t, i, e = !1) {
    for (const n of t) if (n.MatchTag(i, e)) return !0;
    return !1;
  }
  IsTagMatchAnyInputDistributeTags(t, i, e = !1) {
    var n = this.Sdr(t);
    for (const s of i) if (n.MatchTag(s.TagName, e)) return !0;
    return !1;
  }
  AddToLimitInputDistributeActions(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Input", 8, "[InputDistribute]设置输入分发限制Action", [
        "actionName",
        t,
      ]),
      this.Jmr.add(t);
  }
  ClearLimitInputDistributeActions() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Input", 8, "[InputDistribute]清除输入分发限制Action"),
      this.Jmr.clear();
  }
  HasActionLimitSet() {
    return 0 < this.Jmr.size;
  }
  IsActionInLimitSet(t) {
    return this.Jmr.has(t);
  }
  AddInputDistributeTag(t) {
    this.Rdr(t) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Input", 8, "[InputDistribute]添加输入分发Tag", [
          "tagName",
          t,
        ]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.Ymr,
      ));
  }
  Rdr(t) {
    t = this.Sdr(t);
    return !!t && (this.Ymr.push(t), !0);
  }
  SetInputDistributeTag(t) {
    var i = this.Sdr(t);
    i &&
      ((this.Ymr = [i]),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Input", 8, "[InputDistribute]设置输入分发Tag", [
          "tagName",
          t,
        ]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.Ymr,
      ));
  }
  SetInputDistributeTags(t) {
    this.ClearInputDistributeTag();
    for (const i of t) this.Rdr(i);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Input", 8, "[InputDistribute]设置输入分发Tag", [
        "tagNames",
        t,
      ]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.Ymr,
      );
  }
  RemoveInputDistributeTag(t, i = !1) {
    var e = this.Sdr(t);
    if (e)
      if (i) {
        var n = [];
        for (const r of this.Ymr) r.MatchTag(e.TagName) && n.push(r);
        for (const u of n) {
          var s = this.Ymr.indexOf(u);
          s < 0 || this.Ymr.splice(s, 1);
        }
      } else {
        t = this.Ymr.indexOf(e);
        t < 0 || this.Ymr.splice(t, 1);
      }
  }
  ClearInputDistributeTag() {
    this.Ymr.length = 0;
  }
  IsAllowFightInput() {
    return this.IsAnyInputDistributeTagsMatchTag(
      this.Ymr,
      InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag,
    );
  }
  IsAllowFightMoveInput() {
    return this.IsTagMatchAnyInputDistributeTags(
      InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput
        .MoveInputTag,
      this.Ymr,
    );
  }
  IsAllowFightActionInput() {
    return this.IsTagMatchAnyInputDistributeTags(
      InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot
        .ActionInputTag,
      this.Ymr,
    );
  }
  IsAllowFightCameraRotationInput() {
    return this.IsTagMatchAnyInputDistributeTags(
      InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput
        .CameraInput.CameraRotationTag,
      this.Ymr,
    );
  }
  IsAllowFightCameraZoomInput() {
    return this.IsTagMatchAnyInputDistributeTags(
      InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput
        .CameraInput.CameraZoomTag,
      this.Ymr,
    );
  }
  IsAllowHeadRotation() {
    return (
      this.IsAllowFightInput() ||
      this.IsTagMatchAnyInputDistributeTags(
        InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
          .MouseInputTag,
        this.Ymr,
      )
    );
  }
  IsAllowUiInput() {
    return this.IsTagMatchAnyInputDistributeTags(
      InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag,
      this.Ymr,
    );
  }
  GetActionInputDistributeTagName(t) {
    return InputDistributeDefine_1.actionTagMap.get(t);
  }
}
exports.InputDistributeModel = InputDistributeModel;
//# sourceMappingURL=InputDistributeModel.js.map
