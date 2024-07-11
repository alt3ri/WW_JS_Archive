"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingButtonItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GameQualitySettingsManager_1 = require("../../../GameQualitySettings/GameQualitySettingsManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ChannelController_1 = require("../../Channel/ChannelController"),
  MenuController_1 = require("../MenuController"),
  MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingButtonItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.HBi = "{0}x{1}"),
      (this.jBi = "Account,"),
      (this.WBi = () => {
        this.GetActive() && this.ZGe();
      }),
      (this.KBi = () => {
        var t, e;
        this.GetItemClickLimit(this.GetButton(1)) ||
          ((t = this.Pe.MenuDataButtonViewName).includes(this.jBi)
            ? void 0 !== (e = Number(t.substring(this.jBi.length))) &&
              ChannelController_1.ChannelController.ProcessAccountSetting(e)
            : (e = MenuController_1.MenuController.OpenViewFuncMap.get(t))
              ? e()
              : UiManager_1.UiManager.OpenView(t, [this.Pe, this.QBi]));
      }),
      (this.QBi = (t, e) => {
        void 0 !== this.Pe &&
          t === this.Pe.MenuDataFunctionId &&
          (6 === t
            ? this.XBi(e, !0)
            : 7 === t
              ? this.FireSaveMenuChange(e)
              : this.SetButtonText(this.Pe.MenuDataOptionsNameList[e], e, !0));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[1, this.KBi]]);
  }
  OnStart() {
    this.GetButton(1).SetCanClickWhenDisable(!0), this.Ore();
  }
  OnBeforeDestroy() {
    this.Pe && (this.Pe = void 0), this.kre();
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
    (this.Pe = t), this.RefreshTitle(), this.ZGe();
  }
  RefreshTitle() {
    this.GetText(0).ShowTextNew(this.Pe.MenuDataFunctionName ?? "");
  }
  ZGe() {
    this.GetRootItem().SetUIActive(!0);
    var t = MenuController_1.MenuController.GetTargetConfig(
      this.Pe.MenuDataFunctionId,
    );
    6 === this.Pe.MenuDataFunctionId
      ? this.XBi(t)
      : this.SetButtonText(this.Pe.MenuDataOptionsNameList[t], t);
  }
  XBi(t, e = !1) {
    var i =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetResolutionByList(
        t,
      );
    this.GetText(2).SetText(
      StringUtils_1.StringUtils.FormatStaticBuilder(this.HBi, i.X, i.Y),
    );
    for (
      let t = 0;
      t <
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetResolutionList()
        .length;
      t++
    )
      this.Pe.MenuDataOptionsValueList.push(t);
    e && this.FireSaveMenuChange(t);
  }
  SetButtonText(t, e, i = !1) {
    var s = this.Pe.MenuDataButtonTextId,
      n = this.GetText(2);
    s ? n.ShowTextNew(s) : n.ShowTextNew(t), i && this.FireSaveMenuChange(e);
  }
  SetInteractionActive(t) {
    this.GetButton(1).SetSelfInteractive(t);
  }
}
exports.MenuScrollSettingButtonItem = MenuScrollSettingButtonItem;
//# sourceMappingURL=MenuScrollSettingButtonItem.js.map
