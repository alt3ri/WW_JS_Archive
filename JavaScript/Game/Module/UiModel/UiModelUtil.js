"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelUtil = void 0);
const Log_1 = require("../../../Core/Common/Log");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines");
const EffectUtil_1 = require("../../Utils/EffectUtil");
class UiModelUtil {
  static PlayEffectOnRoot(e, t) {
    const r = e.CheckGetComponent(4);
    var e = e.CheckGetComponent(1);
    var t = EffectUtil_1.EffectUtil.GetEffectPath(t);
    var e = e?.MainMeshComponent;
    e
      ? r?.PlayEffectOnRoot(
          t,
          e,
          CharacterNameDefines_1.CharacterNameDefines.ROOT,
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 44, "MainMeshComponent为空");
  }
  static PlayEffectAtRootComponent(e, t) {
    const r = e.CheckGetComponent(4);
    var e = e.CheckGetComponent(1);
    var t = EffectUtil_1.EffectUtil.GetEffectPath(t);
    var e = e?.Actor?.RootComponent;
    e
      ? r?.PlayEffectOnRoot(t, e, FNameUtil_1.FNameUtil.EMPTY)
      : Log_1.Log.CheckError() && Log_1.Log.Error("Character", 44, "Actor为空");
  }
  static SetRenderingMaterial(e, t) {
    return e.CheckGetComponent(5)?.SetRenderingMaterial(t) ?? 0;
  }
  static RemoveRenderingMaterial(e, t) {
    e.CheckGetComponent(5)?.RemoveRenderingMaterial(t);
  }
  static SetVisible(e, t) {
    return e.CheckGetComponent(0)?.SetVisible(t) ?? !1;
  }
}
exports.UiModelUtil = UiModelUtil;
// # sourceMappingURL=UiModelUtil.js.map
