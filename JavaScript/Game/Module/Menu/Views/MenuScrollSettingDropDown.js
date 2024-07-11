"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingDropDown = void 0);
const UE = require("ue"),
  CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown"),
  OneTextDropDownItem_1 = require("../../Common/DropDown/Item/OneText/OneTextDropDownItem"),
  OneTextTitleItem_1 = require("../../Common/DropDown/Item/OneText/OneTextTitleItem"),
  DropDownLogicCreator_1 = require("../DropDownLogic.ts/DropDownLogicCreator"),
  MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingDropDown extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments),
      (this.hbi = void 0),
      (this.Pe = void 0),
      (this.lbi = void 0),
      (this.g8e = (e) => this.lbi.GetDataTextId(e, this.Pe));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.hbi = new CommonDropDown_1.CommonDropDown(
      this.GetItem(1),
      (e) => new OneTextDropDownItem_1.OneTextDropDownItem(e),
      (e) => new OneTextTitleItem_1.OneTextTitleItem(e),
    )),
      await this.hbi.Init(),
      this.hbi.SetOnSelectCall((e, t) => {
        this.lbi.TriggerSelectChange(t, this.Pe);
      });
  }
  OnStart() {}
  OnBeforeDestroy() {
    this.hbi.Destroy();
  }
  mGe() {
    this.GetText(0).ShowTextNew(this.Pe.MenuDataFunctionName ?? "");
  }
  _bi() {
    this.lbi = DropDownLogicCreator_1.DropDownLogicCreator.GetDropDownLogic(
      this.Pe.MenuDataFunctionId,
    );
    var e = this.lbi.GetDropDownDataList(),
      t = this.lbi.GetDefaultIndex(this.Pe);
    this.hbi.InitScroll(e, this.g8e, t);
  }
  Update(e) {
    (this.Pe = e), this.mGe(), this._bi();
  }
  async ClearAsync() {
    var e = [];
    for (const t of this.hbi.GetDropDownItemList()) e.push(t.DestroyAsync());
    await Promise.all(e);
  }
  SetInteractionActive(e) {}
}
exports.MenuScrollSettingDropDown = MenuScrollSettingDropDown;
//# sourceMappingURL=MenuScrollSettingDropDown.js.map
