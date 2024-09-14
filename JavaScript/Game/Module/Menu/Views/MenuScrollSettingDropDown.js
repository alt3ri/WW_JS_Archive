"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingDropDown = void 0);
const UE = require("ue"),
  CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown"),
  OneTextDropDownItem_1 = require("../../Common/DropDown/Item/OneText/OneTextDropDownItem"),
  OneTextTitleItem_1 = require("../../Common/DropDown/Item/OneText/OneTextTitleItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  DropDownLogicCreator_1 = require("../DropDownLogic.ts/DropDownLogicCreator"),
  MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingDropDown extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments),
      (this.hbi = void 0),
      (this.lbi = void 0),
      (this.g8e = (t) => this.lbi.GetDataTextId(t, this.Data));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UISprite],
    ];
  }
  async OnBeforeStartAsync() {
    (this.hbi = new CommonDropDown_1.CommonDropDown(
      this.GetItem(1),
      (t) => new OneTextDropDownItem_1.OneTextDropDownItem(t),
      (t) => new OneTextTitleItem_1.OneTextTitleItem(t),
    )),
      await this.hbi.Init(),
      this.hbi.SetOnSelectCall((t, e) => {
        this.lbi.TriggerSelectChange(e, this.Data);
      });
  }
  OnStart() {}
  OnBeforeDestroy() {
    this.hbi.Destroy();
  }
  mGe() {
    this.GetText(0).ShowTextNew(this.Data.FunctionName ?? "");
  }
  _bi() {
    this.lbi = DropDownLogicCreator_1.DropDownLogicCreator.GetDropDownLogic(
      this.Data.FunctionId,
    );
    var t = this.lbi.GetDropDownDataList(),
      e = this.lbi.GetDefaultIndex(this.Data);
    this.hbi.InitScroll(t, this.g8e, e);
  }
  Update(t) {
    (this.Data = t), this.mGe(), this._bi(), this.sxi(), this.pVa();
  }
  async ClearAsync() {
    var t = [];
    for (const e of this.hbi.GetDropDownItemList()) t.push(e.DestroyAsync());
    await Promise.all(t);
  }
  SetInteractionActive(t) {}
  OnSetDetailVisible(t) {
    this.GetItem(2)?.SetUIActive(t);
  }
  sxi() {
    var t, e;
    this.Data &&
      this.Data.HasDetailText() &&
      ((t = this.GetText(3)),
      (e = this.Data.GetDetailTextId()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, e));
  }
  pVa() {
    this.Data && this.GetSprite(4)?.SetUIActive(this.Data.HasDetailText());
  }
}
exports.MenuScrollSettingDropDown = MenuScrollSettingDropDown;
//# sourceMappingURL=MenuScrollSettingDropDown.js.map
