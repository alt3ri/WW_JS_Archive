"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeyUtil = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils");
class KeyUtil {
  static GetActionMappingByName(t) {
    var e = UE.InputSettings.GetInputSettings(),
      r = (0, puerts_1.$ref)(void 0),
      e =
        (e.GetActionMappingByName(FNameUtil_1.FNameUtil.GetDynamicFName(t), r),
        (0, puerts_1.$unref)(r));
    return e;
  }
  static GetAxisMappingByName(t) {
    var e = UE.InputSettings.GetInputSettings(),
      r = (0, puerts_1.$ref)(void 0),
      e =
        (e.GetAxisMappingByName(FNameUtil_1.FNameUtil.GetDynamicFName(t), r),
        (0, puerts_1.$unref)(r));
    return e;
  }
  static GetKeyName(t) {
    t = this.GetKeyNames(t);
    if (t) return t[0];
  }
  static GetKeyNames(e) {
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      let t = this.GetKeyNameByAction(e);
      return (t = t?.length ? t : this.GetKeyNameByAxis(e));
    }
  }
  static GetKeyNameByAction(t) {
    var e = KeyUtil.GetActionMappingByName(t);
    if (0 !== e.Num()) {
      var r = [];
      for (let t = 0; t < e.Num(); t++) {
        var i,
          a,
          s = e.Get(t).Key;
        Info_1.Info.IsInKeyBoard()
          ? ((i = UE.KismetInputLibrary.Key_IsKeyboardKey(s)),
            (a = UE.KismetInputLibrary.Key_IsMouseButton(s)),
            (i || a) && r.push(s.KeyName.toString()))
          : Info_1.Info.IsInGamepad() &&
            UE.KismetInputLibrary.Key_IsGamepadKey(s) &&
            r.push(s.KeyName.toString());
      }
      return r;
    }
  }
  static GetKeyNameByAxis(t) {
    var e = KeyUtil.GetAxisMappingByName(t);
    if (0 !== e.Num()) {
      var r = [];
      for (let t = 0; t < e.Num(); t++) {
        var i,
          a,
          s,
          U = e.Get(t).Key;
        Info_1.Info.IsInKeyBoard()
          ? ((a =
              UE.KismetInputLibrary.Key_IsAxis1D(U) ||
              UE.KismetInputLibrary.Key_IsAxis2D(U) ||
              UE.KismetInputLibrary.Key_IsAxis3D(U)),
            (s = UE.KismetInputLibrary.Key_IsKeyboardKey(U)),
            (i = UE.KismetInputLibrary.Key_IsMouseButton(U)),
            ((a && (s || i)) || s || i) && r.push(U.KeyName.toString()))
          : Info_1.Info.IsInGamepad() &&
            ((a =
              UE.KismetInputLibrary.Key_IsAxis1D(U) ||
              UE.KismetInputLibrary.Key_IsAxis2D(U) ||
              UE.KismetInputLibrary.Key_IsAxis3D(U)),
            (s = UE.KismetInputLibrary.Key_IsGamepadKey(U)),
            (a && s) || s) &&
            r.push(U.KeyName.toString());
      }
      return r;
    }
  }
  static GetPcKeyNameByAction(t) {
    if (Info_1.Info.IsInKeyBoard()) {
      var e = KeyUtil.GetActionMappingByName(t);
      if (0 !== e.Num()) {
        var t = [],
          r = [],
          i = [];
        for (let t = 0; t < e.Num(); t++) {
          var a = e.Get(t).Key,
            s = UE.KismetInputLibrary.Key_IsKeyboardKey(a),
            U = UE.KismetInputLibrary.Key_IsMouseButton(a);
          s ? r.push(a.KeyName.toString()) : U && i.push(a.KeyName.toString());
        }
        return t.push(r, i), t;
      }
    }
  }
}
exports.KeyUtil = KeyUtil;
//# sourceMappingURL=KeyUtil.js.map
