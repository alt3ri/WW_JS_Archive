"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelUtil = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines"),
  EffectUtil_1 = require("../../Utils/EffectUtil"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  Global_1 = require("../../Global"),
  WorldMapUtil_1 = require("../WorldMap/WorldMapUtil");
class UiModelUtil {
  static PlayEffectOnRoot(e, t) {
    var r = e.CheckGetComponent(4),
      e = e.CheckGetComponent(1),
      t = EffectUtil_1.EffectUtil.GetEffectPath(t),
      e = e?.MainMeshComponent;
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
    var r = e.CheckGetComponent(4),
      e = e.CheckGetComponent(1),
      t = EffectUtil_1.EffectUtil.GetEffectPath(t),
      e = e?.Actor?.RootComponent;
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
  static GetActorLguiPos(e) {
    var e = e.K2_GetActorLocation(),
      t = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler(),
      r = (0, puerts_1.$ref)(void 0),
      e =
        (UE.GameplayStatics.ProjectWorldToScreen(
          Global_1.Global.CharacterController,
          e,
          r,
          !0,
        ),
        t.ConvertPositionFromViewportToLGUICanvas((0, puerts_1.$unref)(r))),
      t = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool();
    return t.Set(e.X - t.X / 2, e.Y - t.Y / 2), t.ToUeVector2D();
  }
}
exports.UiModelUtil = UiModelUtil;
//# sourceMappingURL=UiModelUtil.js.map
