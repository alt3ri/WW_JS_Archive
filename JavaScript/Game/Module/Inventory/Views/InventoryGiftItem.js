"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryGiftItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class InventoryGiftItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.OGe = void 0),
      (this.Qmi = void 0),
      (this.Xmi = void 0),
      (this.qTt = void 0),
      (this.H5e = void 0),
      (this.fGt = void 0),
      (this.sft = void 0),
      (this.$mi = void 0),
      (this.Ymi = void 0),
      (this.Jmi = () => {
        this.H5e.SetToggleState(0, !1),
          this.Xmi.RootUIComp.SetUIActive(!1),
          this.Ymi && this.Ymi(this.fGt);
      }),
      (this.Yai = (i) => {
        i = 1 === i;
        this.Xmi && this.Xmi.RootUIComp.SetUIActive(i),
          this.$mi && this.$mi(this.H5e, this.Xmi, i, this.fGt);
      });
  }
  Initialize(i) {
    i && this.CreateThenShowByActor(i.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[3, this.Jmi]]);
  }
  OnStart() {
    this.SHe();
  }
  OnBeforeDestroy() {
    (this.OGe = void 0),
      (this.Qmi = void 0),
      (this.Xmi = void 0),
      (this.qTt = void 0),
      (this.H5e = void 0),
      (this.fGt = void 0),
      (this.sft = void 0);
  }
  SHe() {
    (this.OGe = this.GetText(1)),
      (this.Qmi = this.GetText(2)),
      (this.H5e = this.GetExtendToggle(4)),
      this.H5e.OnStateChange.Add(this.Yai),
      (this.Xmi = this.GetButton(3)),
      this.Xmi.RootUIComp.SetUIActive(!1),
      (this.sft = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      this.sft.Initialize(this.GetItem(0).GetOwner());
  }
  Refresh(i, t, s) {
    (this.fGt = i), this.RefreshItem(this.fGt[0], this.fGt[1]);
  }
  RefreshItem(i, t = 0) {
    this.qTt = i.ItemId;
    var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        this.qTt,
      ),
      s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s.Name) ?? "";
    this.OGe.SetText(s),
      LguiUtil_1.LguiUtil.SetLocalText(this.Qmi, "Quantity", t),
      this.sft.RefreshByConfigId(i.ItemId);
  }
  SetOnToggleStateChangeFunction(i) {
    this.$mi = i;
  }
  SetOnReduceFunction(i) {
    this.Ymi = i;
  }
}
exports.InventoryGiftItem = InventoryGiftItem;
//# sourceMappingURL=InventoryGiftItem.js.map
