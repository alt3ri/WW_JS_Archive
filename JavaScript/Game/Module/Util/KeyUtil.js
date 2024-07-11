"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeyUtil = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
class KeyUtil {
  static GetActionMappingByName(e) {
    var t = UE.InputSettings.GetInputSettings();
    const r = (0, puerts_1.$ref)(void 0);
    var t =
      (t.GetActionMappingByName(FNameUtil_1.FNameUtil.GetDynamicFName(e), r),
      (0, puerts_1.$unref)(r));
    return t;
  }
  static GetAxisMappingByName(e) {
    var t = UE.InputSettings.GetInputSettings();
    const r = (0, puerts_1.$ref)(void 0);
    var t =
      (t.GetAxisMappingByName(FNameUtil_1.FNameUtil.GetDynamicFName(e), r),
      (0, puerts_1.$unref)(r));
    return t;
  }
  static GetKeyName(e, t) {
    e = this.GetKeyNames(e, t);
    if (e) return e[0];
  }
  static GetKeyNames(t, r) {
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      let e = this.GetKeyNameByAction(t, r);
      return (e = e?.length ? e : this.GetKeyNameByAxis(t, r));
    }
  }
  static GetKeyNameByAction(e, t) {
    const r = KeyUtil.GetActionMappingByName(e);
    if (r.Num() !== 0) {
      const i = [];
      for (let e = 0; e < r.Num(); e++) {
        const a = r.Get(e).Key;
        switch (t) {
          case 3:
            var s = UE.KismetInputLibrary.Key_IsKeyboardKey(a);
            var U = UE.KismetInputLibrary.Key_IsMouseButton(a);
            (s || U) && i.push(a.KeyName.toString());
            break;
          case 7:
            UE.KismetInputLibrary.Key_IsGamepadKey(a) &&
              i.push(a.KeyName.toString());
        }
      }
      return i;
    }
  }
  static GetKeyNameByAxis(e, t) {
    const r = KeyUtil.GetAxisMappingByName(e);
    if (r.Num() !== 0) {
      const i = [];
      for (let e = 0; e < r.Num(); e++) {
        const a = r.Get(e).Key;
        switch (t) {
          case 3:
            var s =
              UE.KismetInputLibrary.Key_IsAxis1D(a) ||
              UE.KismetInputLibrary.Key_IsAxis2D(a) ||
              UE.KismetInputLibrary.Key_IsAxis3D(a);
            var U = UE.KismetInputLibrary.Key_IsKeyboardKey(a);
            var c = UE.KismetInputLibrary.Key_IsMouseButton(a);
            ((s && (U || c)) || U || c) && i.push(a.KeyName.toString());
            break;
          case 7:
            (s =
              UE.KismetInputLibrary.Key_IsAxis1D(a) ||
              UE.KismetInputLibrary.Key_IsAxis2D(a) ||
              UE.KismetInputLibrary.Key_IsAxis3D(a)),
              (U = UE.KismetInputLibrary.Key_IsGamepadKey(a));
            ((s && U) || U) && i.push(a.KeyName.toString());
        }
      }
      return i;
    }
  }
  static GetPcKeyNameByAction(e, t) {
    if (t === 3 || t === 4 || t === 5) {
      const r = KeyUtil.GetActionMappingByName(e);
      if (r.Num() !== 0) {
        var t = [];
        const i = [];
        const a = [];
        for (let e = 0; e < r.Num(); e++) {
          const s = r.Get(e).Key;
          const U = UE.KismetInputLibrary.Key_IsKeyboardKey(s);
          const c = UE.KismetInputLibrary.Key_IsMouseButton(s);
          U ? i.push(s.KeyName.toString()) : c && a.push(s.KeyName.toString());
        }
        return t.push(i, a), t;
      }
    }
  }
}
exports.KeyUtil = KeyUtil;
// # sourceMappingURL=KeyUtil.js.map
