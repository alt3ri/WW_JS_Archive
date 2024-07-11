"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingSwitchItem = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  MenuController_1 = require("../MenuController"),
  MenuTool_1 = require("../MenuTool"),
  MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingSwitchItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.pbi = () => {
        this.GetItemClickLimit(this.GetButton(2)) || this.vbi(-1);
      }),
      (this.Mbi = () => {
        this.GetItemClickLimit(this.GetButton(3)) || this.vbi(1);
      }),
      (this.Ebi = (t, e) => {
        this.Pe.MenuDataFunctionId === t &&
          ((t = this.Pe.MenuDataOptionsNameList[e]),
          this.Sbi(t, e, !1),
          this.RefreshInteractionGroup(e));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
    ];
  }
  OnStart() {
    this.GetButton(3).SetCanClickWhenDisable(!0),
      this.GetButton(2).SetCanClickWhenDisable(!0),
      this.ybi();
  }
  OnClear() {
    this.Pe && (this.Pe = void 0),
      this.GetButton(2).OnClickCallBack.Unbind(),
      this.GetButton(3).OnClickCallBack.Unbind(),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.ChangeConfigValue,
        this.Ebi,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangeConfigValue,
          this.Ebi,
        );
  }
  Update(t) {
    (this.Pe = t), this.mGe(), this.Ibi();
  }
  mGe() {
    this.GetText(0).ShowTextNew(this.Pe.MenuDataFunctionName ?? "");
  }
  Ibi() {
    this.GetRootItem().SetUIActive(!0);
    var t = this.fde(),
      e = this.Pe.MenuDataOptionsNameList[t];
    this.Sbi(e, t), this.RefreshInteractionGroup(t);
  }
  ybi() {
    this.GetButton(2).OnClickCallBack.Bind(this.pbi),
      this.GetButton(3).OnClickCallBack.Bind(this.Mbi),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeConfigValue,
        this.Ebi,
      );
  }
  SetInteractionActive(t) {
    var e = this.fde();
    this.RefreshInteractionGroup(e, t);
  }
  Sbi(t, e, i = !1) {
    this.GetText(1).ShowTextNew(t), i && this.FireSaveMenuChange(e);
  }
  RefreshInteractionGroup(t, e = !0) {
    e
      ? (this.GetButton(3).SetSelfInteractive(
          t !== this.Pe.MenuDataOptionsNameList.length - 1,
        ),
        this.GetButton(2).SetSelfInteractive(0 !== t))
      : (this.GetButton(3).SetSelfInteractive(!1),
        this.GetButton(2).SetSelfInteractive(!1));
  }
  vbi(t) {
    var e = this.fde(),
      e = Math.floor(e + t),
      t = this.Pe.MenuDataOptionsNameList[e];
    this.Sbi(t, e, !0),
      this.RefreshInteractionGroup(e),
      MenuTool_1.FunctionItemViewTool.CheckNotice(this.Pe) &&
        MenuController_1.MenuController.NoticeChange(
          this.Pe.MenuDataFunctionId,
        );
  }
  fde() {
    var t = MenuController_1.MenuController.GetTargetConfig(
        this.Pe.MenuDataFunctionId,
      ),
      e = this.Pe.MenuDataOptionsNameList.length - 1,
      t = MathUtils_1.MathUtils.Clamp(t, 0, e);
    return Math.floor(t);
  }
}
exports.MenuScrollSettingSwitchItem = MenuScrollSettingSwitchItem;
//# sourceMappingURL=MenuScrollSettingSwitchItem.js.map
