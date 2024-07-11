"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingButtonItem = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GameQualitySettingsManager_1 = require("../../../GameQualitySettings/GameQualitySettingsManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ChannelController_1 = require("../../Channel/ChannelController");
const MenuController_1 = require("../MenuController");
const MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingButtonItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.Hwi = "{0}x{1}"),
      (this.jwi = "Account,"),
      (this.Wwi = () => {
        this.RootItem?.IsActive() && this.ZGe();
      }),
      (this.Kwi = () => {
        let t, e;
        this.GetItemClickLimit(this.GetButton(1)) ||
          ((t = this.Pe.MenuDataButtonViewName).includes(this.jwi)
            ? void 0 !== (e = Number(t.substring(this.jwi.length))) &&
              ChannelController_1.ChannelController.ProcessAccountSetting(e)
            : (e = MenuController_1.MenuController.OpenViewFuncMap.get(t))
              ? e()
              : UiManager_1.UiManager.OpenView(t, [this.Pe, this.Qwi]));
      }),
      (this.Qwi = (t, e) => {
        void 0 !== this.Pe &&
          t === this.Pe.MenuDataFunctionId &&
          (t === 6
            ? this.Xwi(e, !0)
            : t === 7
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
      (this.BtnBindInfo = [[1, this.Kwi]]);
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
      this.Wwi,
    );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ChangeConfigValue,
      this.Wwi,
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
    const t = MenuController_1.MenuController.GetTargetConfig(
      this.Pe.MenuDataFunctionId,
    );
    this.Pe.MenuDataFunctionId === 6
      ? this.Xwi(t)
      : this.SetButtonText(this.Pe.MenuDataOptionsNameList[t], t);
  }
  Xwi(t, e = !1) {
    const i =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetResolutionByList(
        t,
      );
    this.GetText(2).SetText(
      StringUtils_1.StringUtils.FormatStaticBuilder(this.Hwi, i.X, i.Y),
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
    const s = this.Pe.MenuDataButtonTextId;
    const n = this.GetText(2);
    s ? n.ShowTextNew(s) : n.ShowTextNew(t), i && this.FireSaveMenuChange(e);
  }
  SetInteractionActive(t) {
    this.GetButton(1).SetSelfInteractive(t);
  }
}
exports.MenuScrollSettingButtonItem = MenuScrollSettingButtonItem;
// # sourceMappingURL=MenuScrollSettingButtonItem.js.map
