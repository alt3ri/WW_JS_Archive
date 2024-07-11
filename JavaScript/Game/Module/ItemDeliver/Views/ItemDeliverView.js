"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemDeliverView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  ItemInteractionPanel_1 = require("../../Common/ItemInteractionPanel/View/ItemInteractionPanel"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  ItemDeliverController_1 = require("../ItemDeliverController"),
  DeliverMediumItemGrid_1 = require("./DeliverMediumItemGrid"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class ItemDeliverView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.uCi = void 0),
      (this.cCi = void 0),
      (this.mCi = void 0),
      (this.nVt = void 0),
      (this.dCi = !1),
      (this.nNt = () => {
        if (!this.dCi)
          if (this.CCi()) {
            var t = this.uCi.Context;
            if (t) {
              this.dCi = !0;
              var e = this.uCi.GetSlotDataList();
              if (6 === t.Type) {
                var i = [];
                for (const o of e)
                  if (o.HasItem()) {
                    var r = {
                      Z5n: [
                        {
                          Ykn: 0,
                          G3n: o.GetCurrentItemConfigId(),
                          O3n: o.GetCurrentCount(),
                        },
                      ],
                      I5n: o.GetNeedCount(),
                      e6n: Protocol_1.Aki.Protocol.e6n.Proto_ItemIds,
                    };
                    switch (o.HandInType) {
                      case "ItemIds":
                        r.e6n = Protocol_1.Aki.Protocol.e6n.Proto_ItemIds;
                        break;
                      case "ItemType":
                        r.e6n = Protocol_1.Aki.Protocol.e6n.t6n;
                    }
                    i.push(r);
                  }
                ItemDeliverController_1.ItemDeliverController.HandInItemRequest(
                  t,
                  i,
                  this.gCi,
                );
              } else
                1 === t.Type &&
                  (e = e[0]).HasItem() &&
                  ItemDeliverController_1.ItemDeliverController.ItemUseRequest(
                    t,
                    e.GetCurrentItemConfigId(),
                    e.GetCurrentCount(),
                    this.gCi,
                  );
            }
          } else
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "DeliverNoMaterial",
            );
      }),
      (this.gCi = (t) => {
        (this.dCi = !1), t && this.CloseMe();
      }),
      (this.zAt = (t) => {
        var e;
        t.IsEnable()
          ? this.fCi(t.ItemConfigId, 1) &&
            (this.pCi(),
            (e = Math.min(t.GetCurrentCount() + 1, t.GetItemCount())),
            t.SetCurrentCount(e),
            this.mCi.RefreshItemGrid(t))
          : ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              t.ItemConfigId,
            );
      }),
      (this.vCi = (t) => {
        var e = Math.max(t.GetCurrentCount() - 1, 0);
        t.SetCurrentCount(e),
          this.mCi.RefreshItemGrid(t),
          this.fCi(t.ItemConfigId, -1),
          this.pCi(),
          e <= 0 && this.mCi.SetItemGridSelected(!1, t);
      }),
      (this.ACt = () => {
        ModelManager_1.ModelManager.ItemDeliverModel?.SetItemDeliverData(
          void 0,
        ),
          this.CloseMe();
      }),
      (this.MCi = () => {
        var t = new DeliverMediumItemGrid_1.DeliverMediumItemGrid();
        return t.BindReduceButtonCallback(this.SCi), t;
      }),
      (this.SCi = (t) => {
        var t = t.Data,
          e = t.GetCurrentCount() - 1,
          i =
            (t.SetCurrentCount(Math.max(e, 0)),
            this.mCi.GetItemData(t.GetCurrentItemConfigId()));
        i &&
          (i.SetCurrentCount(i.GetCurrentCount() - 1),
          this.mCi.RefreshItemGrid(i)),
          e <= 0 && t.ClearItem(),
          this.pCi();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [3, UE.UIText],
      [2, UE.UIButtonComponent],
      [4, UE.UIScrollViewWithScrollbarComponent],
      [5, UE.UIHorizontalLayout],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [[2, this.nNt]]);
  }
  CCi() {
    for (const t of this.uCi.GetSlotDataList())
      if (t.GetCurrentCount() < t.GetNeedCount()) return !1;
    return !0;
  }
  async OnBeforeStartAsync() {
    (this.cCi = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(5),
      this.MCi,
    )),
      (this.nVt = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.nVt.SetCloseCallBack(this.ACt),
      (this.mCi = new ItemInteractionPanel_1.ItemInteractionPanel()),
      this.mCi.BindOnItemExtendToggleStateChanged(this.zAt),
      this.mCi.BindOnReduceButtonTrigger(this.vCi),
      await this.mCi.CreateByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    (this.uCi = this.OpenParam),
      this.uCi &&
        (this.nVt.SetCloseBtnActive(!0),
        this.nVt.SetHelpBtnActive(!1),
        this.L0t(),
        this.ECi(),
        this.pCi(() => {
          var t = this.uCi.GetSlotDataList()[0];
          t &&
            (this.yCi(t, t.GetNeedCount()),
            (t = t.GetItemRangeList().length <= 1),
            this.nVt.SetTitleIconVisible(t),
            this.nVt.SetTitleTextActive(t),
            t) &&
            ((t =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                "SP_IconDeliver",
              )),
            this.nVt.SetTitleIcon(t));
        }));
  }
  OnBeforeDestroy() {
    this.uCi?.Clear(),
      (this.uCi = void 0),
      (this.cCi = void 0),
      (this.mCi = void 0);
  }
  L0t() {
    var t = this.uCi.TitleTextId;
    t &&
      ((t = void 0 === t ? "" : PublicUtil_1.PublicUtil.GetConfigTextByKey(t)),
      this.GetText(6)?.SetText(t));
  }
  ECi() {
    var t = this.uCi.DescriptionTextId,
      t = void 0 === t ? "" : PublicUtil_1.PublicUtil.GetConfigTextByKey(t);
    this.GetText(3)?.SetText(t);
  }
  fCi(e, i) {
    var r = this.uCi.GetSlotDataList();
    if (0 < i) {
      if (this.uCi?.IsSlotEnough(e))
        return (
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "RepeatedDeliveryItem",
          ),
          !1
        );
      for (const h of r) {
        var t = h.GetCurrentCount() + i,
          t = MathUtils_1.MathUtils.Clamp(t, 0, h.GetNeedCount());
        if (!h.IsEnough()) {
          if (t <= 0) return h.ClearItem(), !0;
          if (h.SetItem(e, t)) return !0;
        }
      }
    } else
      for (let t = r.length - 1; 0 <= t; t--) {
        var o = r[t],
          s = o.GetCurrentCount() + i,
          s = MathUtils_1.MathUtils.Clamp(s, 0, o.GetNeedCount());
        if (o.HasItem()) {
          if (s <= 0) return o.ClearItem(), !0;
          if (o.SetItem(e, s)) return !0;
        }
      }
    return !1;
  }
  pCi(t) {
    var e = this.uCi.GetSlotDataList();
    this.cCi?.RefreshByData(e, t);
  }
  yCi(t, e) {
    var i = [],
      t = t.GetItemRangeList();
    if (t.length <= 1) this.mCi.SetActive(!1);
    else {
      for (const o of t) {
        var r = { ItemConfigId: o, CurrentCount: 0, NeedCount: e };
        i.push(r);
      }
      this.mCi.Refresh({ ItemInfoList: i }).then(
        () => {
          var t,
            e,
            i = this.mCi.GetItemDataMainTypeMap(),
            r = this.uCi.GetSlotDataList()[0].GetNeedCount(),
            o = this.mCi.GetMainTypeIdList()[0];
          for ([t, e] of i)
            for (const s of e)
              if (s.GetItemCount() >= r && t !== o) {
                this.mCi?.SetMainTypeRedDotVisible(t, !0);
                break;
              }
        },
        () => {},
      ),
        this.mCi.SetActive(!0);
    }
  }
}
exports.ItemDeliverView = ItemDeliverView;
//# sourceMappingURL=ItemDeliverView.js.map
