"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsMaterialComponent = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ItemTipsBaseSubComponent_1 = require("./ItemTipsBaseSubComponent");
const ItemTipsGetWay_1 = require("./ItemTipsGetWay");
class TipsMaterialComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
  constructor(i) {
    super(i),
      (this.Pe = void 0),
      (this.LPt = void 0),
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
    const i = this.GetItem(6);
    this.LPt = new ItemTipsGetWay_1.TipsGetWayPanel(i);
  }
  OnBeforeDestroy() {
    this.Pe &&
      ((this.Pe = void 0),
      ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(void 0));
  }
  Refresh(i) {
    const e = () => {
      var i = this.Pe;
      var e =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.MaterialType),
        this.GetSprite(1).SetUIActive(void 0 !== i.FunctionSpritePath),
        i.FunctionSpritePath &&
          this.SetSpriteByPath(i.FunctionSpritePath, this.GetSprite(1), !1),
        this.GetText(3).SetText(i.Num.toString()),
        (this.GetText(3).useChangeColor = i.Num === 0),
        !StringUtils_1.StringUtils.IsEmpty(i.TxtEffect));
      var e =
        (e && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.TxtEffect),
        this.GetText(4).SetUIActive(e),
        !StringUtils_1.StringUtils.IsEmpty(i.TxtDescription));
      var e =
        (e &&
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(5),
            i.TxtDescription,
          ),
        this.GetText(5).SetUIActive(e),
        this.DPt(i.GetWayData),
        this.RPt(i.LimitTimeTxt),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          i.ConfigId,
          !0,
        ));
      var i =
        e?.ItemType === 6e4 || e?.ItemType === 60002 || e?.ItemType === 60003;
      this.SetPanelNumVisible(!i);
    };
    (this.Pe = i),
      ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(i),
      this.InAsyncLoading() ? this.OperationMap.set("Refresh", e) : e();
  }
  DPt(i) {
    this.GetItem(6).SetUIActive(i.length !== 0), i && this.LPt.Refresh(i);
  }
  RPt(i) {
    this.GetItem(7).SetUIActive(void 0 !== i), i && this.GetText(8).SetText(i);
  }
  SetPanelNumVisible(i) {
    const e = () => {
      this.GetItem(2).SetUIActive(i);
    };
    this.InAsyncLoading()
      ? this.OperationMap.set("SetPanelNumVisible", e)
      : e();
  }
}
exports.TipsMaterialComponent = TipsMaterialComponent;
// # sourceMappingURL=ItemTipsMaterialComponent.js.map
