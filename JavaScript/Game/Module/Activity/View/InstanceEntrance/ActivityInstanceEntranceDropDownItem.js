"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityInstanceEntranceDropDownItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  CommonDropDown_1 = require("../../../Common/DropDown/CommonDropDown"),
  DropDownItemBase_1 = require("../../../Common/DropDown/Item/DropDownItemBase"),
  TitleItemBase_1 = require("../../../Common/DropDown/Item/TitleItemBase");
class ActivityInstanceEntranceDropDownItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.c_i = void 0),
      (this.EntranceData = void 0),
      (this.g_i = (e) => e),
      (this.d_i = (e, t) => new DropDownItem(e)),
      (this.C_i = (e) => new DropDownTitle(e)),
      (this.f_i = (e, t) => {
        this.EntranceData.GetActivityEntranceDropDownData()?.SetDefaultIndex(
          t.GetDataIndex(),
        ),
          t.GetOnSelectCallBack()?.(this.EntranceData, t.GetDataIndex());
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.p_i();
  }
  async p_i() {
    (this.c_i = new CommonDropDown_1.CommonDropDown(
      this.GetItem(0),
      this.d_i,
      this.C_i,
    )),
      this.c_i.SetOnSelectCall(this.f_i),
      await this.c_i.Init();
  }
  OnStart() {}
  RefreshView(e, t) {
    this.EntranceData = e;
    (e = t.GetDropDownContentDataList()),
      (t = this.EntranceData.GetActivityEntranceSelectItemData()
        .GetCurrentSelectData()
        .GetDefaultDifficultIndex());
    this.c_i?.InitScroll(e, this.g_i, t);
  }
}
exports.ActivityInstanceEntranceDropDownItem =
  ActivityInstanceEntranceDropDownItem;
class DropDownItem extends DropDownItemBase_1.DropDownItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
    ];
  }
  OnShowDropDownItemBase(e) {
    e = e.GetTogOptionText() ?? "";
    this.GetText(1).SetText(e);
  }
  GetDropDownToggle() {
    return this.GetExtendToggle(0);
  }
}
class DropDownTitle extends TitleItemBase_1.TitleItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  ShowTemp(e, t) {
    e = e.GetDropDownText();
    this.GetText(0).SetText(e);
  }
}
//# sourceMappingURL=ActivityInstanceEntranceDropDownItem.js.map
