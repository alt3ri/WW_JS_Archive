"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsMaterialComponent = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ItemTipsBaseSubComponent_1 = require("./ItemTipsBaseSubComponent"),
  ItemTipsGetWay_1 = require("./ItemTipsGetWay");
class TipsMaterialComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
  constructor(i) {
    super(i),
      (this.Pe = void 0),
      (this.Axt = void 0),
      this.CreateThenShowByResourceIdAsync("UiItem_TipsMaterial", i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIText],
    ];
  }
  OnStart() {
    var i = this.GetItem(6);
    this.Axt = new ItemTipsGetWay_1.TipsGetWayPanel(i);
  }
  OnBeforeDestroy() {
    this.Pe &&
      ((this.Pe = void 0),
      ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(void 0));
  }
  Refresh(i) {
    var e = () => {
      var i = this.Pe,
        e =
          (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.MaterialType),
          this.GetSprite(1).SetUIActive(void 0 !== i.FunctionSpritePath),
          i.FunctionSpritePath &&
            this.SetSpriteByPath(i.FunctionSpritePath, this.GetSprite(1), !1),
          this.GetText(3).SetText(i.Num.toString()),
          (this.GetText(3).useChangeColor = 0 === i.Num),
          !StringUtils_1.StringUtils.IsEmpty(i.TxtEffect)),
        e =
          (e &&
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.TxtEffect),
          this.GetText(4).SetUIActive(e),
          !StringUtils_1.StringUtils.IsEmpty(i.TxtDescription)),
        e =
          (e &&
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(5),
              i.TxtDescription,
            ),
          this.GetText(5).SetUIActive(e),
          this.Pxt(i.GetWayData),
          this.xxt(i.LimitTimeTxt),
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
            i.ConfigId,
          )),
        i =
          6e4 === e?.ItemType || 60002 === e?.ItemType || 60003 === e?.ItemType;
      this.SetPanelNumVisible(!i);
    };
    (this.Pe = i),
      ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(i),
      this.InAsyncLoading() ? this.OperationMap.set("Refresh", e) : e();
  }
  Pxt(i) {
    this.GetItem(6).SetUIActive(0 !== i.length), i && this.Axt.Refresh(i);
  }
  xxt(i) {
    this.GetItem(7).SetUIActive(void 0 !== i), i && this.GetText(8).SetText(i);
  }
  SetPanelNumVisible(i) {
    var e = () => {
      this.GetItem(2).SetUIActive(i);
    };
    this.InAsyncLoading()
      ? this.OperationMap.set("SetPanelNumVisible", e)
      : e();
  }
}
exports.TipsMaterialComponent = TipsMaterialComponent;
//# sourceMappingURL=ItemTipsMaterialComponent.js.map
