"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyRoundRewardItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class DangoMonopolyRoundRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.qsi = void 0),
      (this.ClickCallBack = void 0),
      (this.Buc = () => {
        this.ClickCallBack?.(this.fGt);
      });
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.qsi = new SmallItemGrid_1.SmallItemGrid()),
      this.qsi.Initialize(this.GetItem(1).GetOwner()),
      this.qsi.BindOnExtendToggleClicked(this.Buc),
      this.qsi.BindOnCanExecuteChange(() => !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UISprite],
    ];
  }
  Refresh(t) {
    (this.fGt = t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("DangoMonopoly", 69, "DangoRoundRewardItem", [
          "",
          this.fGt,
        ]);
    var t = this.fGt.IsReceived,
      i =
        (this.GetSprite(0)?.SetUIActive(!1),
        this.GetSprite(3)?.SetUIActive(t),
        this.GetText(2)),
      t =
        (i.SetText(this.fGt.Position.toString()),
        i.SetChangeColor(t, i.changeColor),
        {
          Data: this.fGt,
          Type: 4,
          ItemConfigId: this.fGt.ItemId,
          IsRedDotVisible: this.fGt.IsCanReceived,
          IsReceivedVisible: this.fGt.IsReceived,
          IsReceivableVisible: this.fGt.IsCanReceived,
          BottomText: this.GetCountStr(),
        });
    this.qsi.Apply(t);
  }
  GetCountStr() {
    return 0 < this.fGt.Count ? "x " + this.fGt.Count : "";
  }
}
exports.DangoMonopolyRoundRewardItem = DangoMonopolyRoundRewardItem;
//# sourceMappingURL=DangoMonopolyRoundRewardItem.js.map
