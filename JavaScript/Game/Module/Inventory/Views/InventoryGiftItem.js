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
      (this.Qci = void 0),
      (this.Xci = void 0),
      (this.PIt = void 0),
      (this.R4e = void 0),
      (this.dqt = void 0),
      (this.Xgt = void 0),
      (this.$ci = void 0),
      (this.Yci = void 0),
      (this.Jci = () => {
        this.R4e.SetToggleState(0, !1),
          this.Xci.RootUIComp.SetUIActive(!1),
          this.Yci && this.Yci(this.dqt);
      }),
      (this.Ysi = (i) => {
        i = 1 === i;
        this.Xci && this.Xci.RootUIComp.SetUIActive(i),
          this.$ci && this.$ci(this.R4e, this.Xci, i, this.dqt);
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
      (this.BtnBindInfo = [[3, this.Jci]]);
  }
  OnStart() {
    this.h7e();
  }
  OnBeforeDestroy() {
    (this.OGe = void 0),
      (this.Qci = void 0),
      (this.Xci = void 0),
      (this.PIt = void 0),
      (this.R4e = void 0),
      (this.dqt = void 0),
      (this.Xgt = void 0);
  }
  h7e() {
    (this.OGe = this.GetText(1)),
      (this.Qci = this.GetText(2)),
      (this.R4e = this.GetExtendToggle(4)),
      this.R4e.OnStateChange.Add(this.Ysi),
      (this.Xci = this.GetButton(3)),
      this.Xci.RootUIComp.SetUIActive(!1),
      (this.Xgt = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      this.Xgt.Initialize(this.GetItem(0).GetOwner());
  }
  Refresh(i, t, s) {
    (this.dqt = i), this.RefreshItem(this.dqt[0], this.dqt[1]);
  }
  RefreshItem(i, t = 0) {
    this.PIt = i.ItemId;
    var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        this.PIt,
      ),
      s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s.Name) ?? "";
    this.OGe.SetText(s),
      LguiUtil_1.LguiUtil.SetLocalText(this.Qci, "Quantity", t),
      this.Xgt.RefreshByConfigId(i.ItemId);
  }
  SetOnToggleStateChangeFunction(i) {
    this.$ci = i;
  }
  SetOnReduceFunction(i) {
    this.Yci = i;
  }
}
exports.InventoryGiftItem = InventoryGiftItem;
//# sourceMappingURL=InventoryGiftItem.js.map
