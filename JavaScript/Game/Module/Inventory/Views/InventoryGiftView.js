"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryGiftView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiBlurLogic_1 = require("../../../Ui/Base/UiBlur/UiBlurLogic"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  InventoryGiftController_1 = require("../InventoryGiftController"),
  InventoryGiftItem_1 = require("./InventoryGiftItem");
class InventoryGiftView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.vVt = void 0),
      (this.x5e = []),
      (this.zmi = []),
      (this.Zmi = void 0),
      (this.edi = void 0),
      (this.ZAt = void 0),
      (this.tdi = void 0),
      (this.ts = void 0),
      (this.HGe = void 0),
      (this.WGe = void 0),
      (this.ClickClose = () => {
        UiManager_1.UiManager.CloseView("InventoryGiftView");
      }),
      (this.OnClickConfirm = () => {
        var t = [],
          e = this.zmi.length;
        for (let i = 0; i < e; i++) {
          var s = this.zmi[i][0];
          t.push(s.ItemId);
        }
        InventoryGiftController_1.InventoryGiftController.SendItemGiftUseRequest(
          this.Zmi.ConfigId,
          this.WGe?.GetSelectNumber() ?? 1,
          t,
        );
      }),
      (this.OnClickErrorConfirm = () => {
        var i = this.Zmi.GiftPackage.AvailableNum;
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "SelectGiftItem",
          i,
        );
      }),
      (this.KGe = (i) => {
        var t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "ItemUseCount",
          );
        return new LguiUtil_1.TableTextArgNew(t, i);
      }),
      (this.sGe = () => {
        var i = new InventoryGiftItem_1.InventoryGiftItem();
        return (
          i.Initialize(),
          i.SetOnToggleStateChangeFunction(this.OnToggleStateChangeFunction),
          i.SetOnReduceFunction(this.OnReduceFunction),
          i
        );
      }),
      (this.idi = (i) => {
        return this.x5e[i];
      }),
      (this.OnToggleStateChangeFunction = (i, t, e, s) => {
        var r = this.Zmi.GiftPackage.AvailableNum;
        if (e) {
          if (this.zmi.length === r)
            return i.SetToggleState(0, !1), void t.RootUIComp.SetUIActive(!1);
          this.zmi.push(s);
        } else {
          e = this.zmi.indexOf(s);
          this.zmi.splice(e, 1);
        }
        this.RefreshSelectCountInfo();
      }),
      (this.OnReduceFunction = (i) => {
        i = this.zmi.indexOf(i);
        -1 !== i && (this.zmi.splice(i, 1), this.RefreshSelectCountInfo());
      }),
      (this.RefreshSelectCountInfo = () => {
        var i = this.Zmi.GiftPackage.AvailableNum,
          t = this.zmi.length,
          t =
            (LguiUtil_1.LguiUtil.SetLocalText(
              this.ts,
              "SelectRewardFromPool",
              i,
              t,
              i,
            ),
            t === i);
        this.odi(t);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UILoopScrollViewComponent],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.OnClickConfirm],
        [2, this.OnClickErrorConfirm],
        [6, this.ClickClose],
      ]);
  }
  OnStart() {
    (this.Zmi = this.OpenParam),
      (this.x5e = this.Zmi.ItemList),
      (this.vVt = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(3),
        this.GetItem(4).GetOwner(),
        this.sGe,
      )),
      this.vVt.ReloadProxyData(this.idi, this.x5e.length, !1),
      (this.ZAt = this.GetButton(1)),
      (this.tdi = this.GetButton(2)),
      (this.edi = this.ZAt.GetOwner().GetComponentByClass(
        UE.UIInteractionGroup.StaticClass(),
      )),
      (this.ts = this.GetText(5)),
      (this.HGe = this.GetText(0));
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        this.Zmi.ConfigId,
      ),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.HGe, i.Name),
        (this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
          this.GetItem(7),
        )),
        {
          MaxNumber:
            ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
              this.Zmi.ConfigId,
            ),
          GetExchangeTableText: this.KGe,
          ValueChangeFunction: () => {},
        });
    this.WGe.Init(i), this.RefreshSelectCountInfo();
  }
  OnAfterShow() {
    var i, t;
    this.Zmi
      ? ((i = this.Zmi.GiftPackage.AvailableNum),
        (t = this.zmi.length),
        this.odi(t === i))
      : this.odi(!1);
  }
  OnAfterHide() {
    UiBlurLogic_1.UiBlurLogic.ResumeTopUiRenderAfterBlur();
  }
  OnBeforeDestroy() {
    (this.vVt = void 0),
      (this.x5e = []),
      (this.zmi = []),
      (this.Zmi = void 0),
      (this.edi = void 0),
      (this.ZAt = void 0),
      (this.tdi = void 0),
      (this.ts = void 0),
      (this.HGe = void 0),
      this.WGe?.Destroy(),
      (this.WGe = void 0);
  }
  odi(i) {
    this.edi.SetInteractable(i), this.tdi.RootUIComp.SetUIActive(!i);
  }
}
exports.InventoryGiftView = InventoryGiftView;
//# sourceMappingURL=InventoryGiftView.js.map
