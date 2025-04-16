"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingButtonItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ChannelController_1 = require("../../Channel/ChannelController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MenuController_1 = require("../MenuController"),
  MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingButtonItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments),
      (this.HBi = "{0}x{1}"),
      (this.jBi = "Account,"),
      (this.KBi = () => {
        var t, e;
        this.GetItemClickLimit(this.GetButton(1)) ||
          ((t = this.Data.ButtonViewName).includes(this.jBi)
            ? void 0 !== (e = Number(t.substring(this.jBi.length))) &&
              ChannelController_1.ChannelController.ProcessAccountSetting(e)
            : (e = MenuController_1.MenuController.OpenViewFuncMap.get(t))
              ? e()
              : UiManager_1.UiManager.OpenView(t, [this.Data, this.QBi]));
      }),
      (this.QBi = (t, e) => {
        void 0 !== this.Data &&
          t === this.Data.FunctionId &&
          (t === GameSettingsDefine_1.EFunction.RESOLUTION
            ? this.XBi(e, !0)
            : t === GameSettingsDefine_1.EFunction.BRIGHTNESS
              ? this.FireSaveMenuChange(e)
              : this.SetButtonText(this.Data.OptionsNameList[e], e, !0));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[1, this.KBi]]);
  }
  OnStart() {
    this.GetButton(1).SetCanClickWhenDisable(!0);
  }
  OnBeforeDestroy() {
    this.Data && (this.Data = void 0);
  }
  OnClear() {
    this.GetButton(1)?.OnClickCallBack.Unbind();
  }
  Update(t) {
    (this.Data = t),
      this.RefreshTitle(),
      this.ZGe(),
      this.sxi(),
      this.cHa(),
      this.SetInteractionActive(t.GetEnable());
  }
  RefreshTitle() {
    this.GetText(0).ShowTextNew(this.Data.FunctionName ?? "");
  }
  ZGe() {
    this.GetRootItem().SetUIActive(!0);
    var t = MenuController_1.MenuController.GetTargetConfig(
      this.Data.FunctionId,
    );
    this.Data.FunctionId === GameSettingsDefine_1.EFunction.RESOLUTION
      ? this.XBi(t)
      : this.SetButtonText(this.Data.OptionsNameList[t], t);
  }
  sxi() {
    var t, e;
    this.Data &&
      this.Data.HasDetailText() &&
      ((t = this.GetText(4)),
      (e = this.Data.GetDetailTextId()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, e));
  }
  cHa() {
    this.Data && this.GetSprite(5)?.SetUIActive(this.Data.HasDetailText());
  }
  XBi(t, e = !1) {
    var i =
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(
        t,
      );
    this.GetText(2).SetText(
      StringUtils_1.StringUtils.FormatStaticBuilder(this.HBi, i.X, i.Y),
    ),
      e && this.FireSaveMenuChange(t);
  }
  SetButtonText(t, e, i = !1) {
    var s = this.Data.ButtonTextId,
      r = this.GetText(2);
    s ? r.ShowTextNew(s) : r.ShowTextNew(t ?? ""),
      i && this.FireSaveMenuChange(e);
  }
  SetInteractionActive(t) {
    this.GetButton(1).SetSelfInteractive(t);
  }
  OnSetDetailVisible(t) {
    this.GetItem(3)?.SetUIActive(t);
  }
}
exports.MenuScrollSettingButtonItem = MenuScrollSettingButtonItem;
//# sourceMappingURL=MenuScrollSettingButtonItem.js.map
