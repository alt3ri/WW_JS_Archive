"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GridEventCompDesc = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class GridEventCompDesc extends UiPanelBase_1.UiPanelBase {
  constructor(i, t = 1) {
    super(),
      (this.StepId = i),
      (this.StepType = t),
      (this.CanInteractCallback = void 0),
      (this.QYt = void 0),
      (this.XYt = void 0),
      (this.GZi = void 0),
      (this.NZi = void 0),
      (this.Nr1 = 0),
      (this.Vr1 = !1),
      (this.jr1 = () => {
        (this.Vr1 = !1), this.CanInteractCallback?.(this.StepId, this.StepType);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    var i = this.GetText(0);
    i.SetUIActive(!1),
      (this.QYt = i
        .GetOwner()
        .GetComponentByClass(UE.UIEffectTextAnimation.StaticClass())),
      (this.XYt = i
        .GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      this.QYt?.SetSelectorOffset(1),
      (this.GZi = (0, puerts_1.toManualReleaseDelegate)(this.jr1)),
      (this.NZi = this.XYt.GetPlayTween().RegisterOnComplete(this.GZi)),
      (this.Nr1 =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "MapRogueRandomEventTextSpeed",
        ) ?? 10);
  }
  OnBeforeDestroy() {
    this.NZi &&
      (this.XYt?.GetPlayTween()?.UnregisterOnComplete(this.NZi),
      (this.NZi = void 0)),
      (0, puerts_1.releaseManualReleaseDelegate)(this.jr1),
      (this.GZi = void 0);
  }
  Hr1(i, t) {
    var s = this.GetText(3),
      e = this.GetSprite(2),
      h = this.GetItem(1);
    StringUtils_1.StringUtils.IsEmpty(i)
      ? h.SetUIActive(!1)
      : (LguiUtil_1.LguiUtil.SetLocalTextNew(s, i),
        t && ((s = UE.Color.FromHex(t)), e.SetColor(s)),
        h.SetUIActive(!0));
  }
  P9e(i, t) {
    var s = this.GetText(0),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(s, i),
        s.SetUIActive(!0),
        s.GetDisplayCharLength());
    this.XYt &&
      (t
        ? this.QYt.SetSelectorOffset(0)
        : ((s = i / this.Nr1),
          this.QYt.SetSelectorOffset(1),
          (this.XYt.GetPlayTween().duration = s),
          this.XYt.Play(),
          (this.Vr1 = !0)));
  }
  Refresh(i) {
    var t = ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventStepById(
      this.StepId,
    );
    t &&
      (this.Hr1(t.TitleKey, t.TagColor),
      this.P9e(t.TextKey, i),
      this.SetActive(!0));
  }
  MaskClick() {
    this.ShowAllText();
  }
  ShowAllText() {
    this.Vr1 &&
      (this.XYt.Stop(),
      this.QYt.SetSelectorOffset(0),
      this.CanInteractCallback?.(this.StepId, this.StepType));
  }
}
exports.GridEventCompDesc = GridEventCompDesc;
//# sourceMappingURL=GridEventCompDesc.js.map
