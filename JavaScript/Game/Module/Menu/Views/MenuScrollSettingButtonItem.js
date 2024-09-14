"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingButtonItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
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
      (this.WBi = () => {
        this.GetActive() && this.ZGe();
      }),
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
          (6 === t
            ? this.XBi(e, !0)
            : 7 === t
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
    this.GetButton(1).SetCanClickWhenDisable(!0), this.Ore();
  }
  OnBeforeDestroy() {
    this.Data && (this.Data = void 0), this.kre();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ChangeConfigValue,
      this.WBi,
    );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ChangeConfigValue,
      this.WBi,
    );
  }
  OnClear() {
    this.GetButton(1)?.OnClickCallBack.Unbind();
  }
  Update(t) {
    (this.Data = t),
      this.RefreshTitle(),
      this.ZGe(),
      this.sxi(),
      this.pVa(),
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
    6 === this.Data.FunctionId
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
  pVa() {
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
    s ? r.ShowTextNew(s) : r.ShowTextNew(t), i && this.FireSaveMenuChange(e);
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
