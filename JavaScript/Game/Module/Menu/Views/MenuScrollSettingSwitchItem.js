"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingSwitchItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MenuController_1 = require("../MenuController"),
  MenuTool_1 = require("../MenuTool"),
  MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingSwitchItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments),
      (this.pbi = () => {
        this.GetItemClickLimit(this.GetButton(2)) || this.vbi(-1);
      }),
      (this.Mbi = () => {
        this.GetItemClickLimit(this.GetButton(3)) || this.vbi(1);
      }),
      (this.Ebi = (t, e) => {
        this.Data.FunctionId === t &&
          ((t = this.Data.OptionsNameList[e]),
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
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UISprite],
    ];
  }
  OnStart() {
    this.GetButton(3).SetCanClickWhenDisable(!0),
      this.GetButton(2).SetCanClickWhenDisable(!0),
      this.ybi();
  }
  OnClear() {
    this.Data && (this.Data = void 0),
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
    (this.Data = t), this.mGe(), this.Ibi(), this.sxi(), this.pVa();
  }
  mGe() {
    this.GetText(0).ShowTextNew(this.Data.FunctionName ?? "");
  }
  Ibi() {
    this.GetRootItem().SetUIActive(!0);
    var t = this.RZa(),
      e = this.Data.OptionsNameList[t];
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
    var e = this.RZa();
    this.RefreshInteractionGroup(e, t);
  }
  Sbi(t, e, i = !1) {
    this.GetText(1).ShowTextNew(t),
      i && this.FireSaveMenuChange(this.Data.OptionsValueList[e]);
  }
  RefreshInteractionGroup(t, e = !0) {
    e
      ? (this.GetButton(3).SetSelfInteractive(
          t !== this.Data.OptionsNameList.length - 1,
        ),
        this.GetButton(2).SetSelfInteractive(0 !== t))
      : (this.GetButton(3).SetSelfInteractive(!1),
        this.GetButton(2).SetSelfInteractive(!1));
  }
  vbi(t) {
    var e = this.RZa(),
      e = Math.floor(e + t),
      t = this.Data.OptionsNameList[e];
    this.RefreshInteractionGroup(e),
      this.Sbi(t, e, !0),
      MenuTool_1.FunctionItemViewTool.CheckNotice(this.Data) &&
        MenuController_1.MenuController.NoticeChange(this.Data.FunctionId);
  }
  RZa() {
    var t = MenuController_1.MenuController.GetTargetConfig(
        this.Data.FunctionId,
      ),
      e = this.Data.OptionsValueList;
    let i = e.indexOf(t);
    return (
      i < 0 &&
        ((t = this.Data.OptionsDefault),
        (e = e.indexOf(t)) < 0 &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Menu",
            65,
            "默认值不存在于可选值列表中，请策划策划策划检查配置",
            ["Default Value", t],
          ),
        (i = e)),
      i
    );
  }
  OnSetDetailVisible(t) {
    this.GetItem(4)?.SetUIActive(t);
  }
  sxi() {
    var t, e;
    this.Data &&
      this.Data.HasDetailText() &&
      ((t = this.GetText(5)),
      (e = this.Data.GetDetailTextId()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, e));
  }
  pVa() {
    this.Data && this.GetSprite(6)?.SetUIActive(this.Data.HasDetailText());
  }
}
exports.MenuScrollSettingSwitchItem = MenuScrollSettingSwitchItem;
//# sourceMappingURL=MenuScrollSettingSwitchItem.js.map
