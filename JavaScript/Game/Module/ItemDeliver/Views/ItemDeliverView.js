"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemDeliverView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  ItemInteractionPanel_1 = require("../../Common/ItemInteractionPanel/View/ItemInteractionPanel"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  ItemDeliverController_1 = require("../ItemDeliverController"),
  DeliverMediumItemGrid_1 = require("./DeliverMediumItemGrid");
class ItemDeliverView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ugi = void 0),
      (this.cgi = void 0),
      (this.mgi = void 0),
      (this.n6t = void 0),
      (this.dgi = !1),
      (this.sOt = () => {
        if (!this.dgi)
          if (this.Cgi()) {
            var t = this.ugi.Context;
            if (t) {
              this.dgi = !0;
              var e = this.ugi.GetSlotDataList();
              if (6 === t.Type) {
                var i = [];
                for (const o of e)
                  if (o.HasItem()) {
                    var r = {
                      F9n: [
                        {
                          w5n: 0,
                          L8n: o.GetCurrentItemConfigId(),
                          D8n: o.GetCurrentCount(),
                        },
                      ],
                      m9n: o.GetNeedCount(),
                      V9n: Protocol_1.Aki.Protocol.V9n.Proto_ItemIds,
                    };
                    switch (o.HandInType) {
                      case "ItemIds":
                        r.V9n = Protocol_1.Aki.Protocol.V9n.Proto_ItemIds;
                        break;
                      case "ItemType":
                        r.V9n = Protocol_1.Aki.Protocol.V9n.H9n;
                    }
                    i.push(r);
                  }
                ItemDeliverController_1.ItemDeliverController.HandInItemRequest(
                  t,
                  i,
                  this.ggi,
                );
              } else
                1 === t.Type &&
                  (e = e[0]).HasItem() &&
                  ItemDeliverController_1.ItemDeliverController.ItemUseRequest(
                    t,
                    e.GetCurrentItemConfigId(),
                    e.GetCurrentCount(),
                    this.ggi,
                  );
            }
          } else
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "DeliverNoMaterial",
            );
      }),
      (this.ggi = (t) => {
        (this.dgi = !1), t && this.CloseMe();
      }),
      (this.txt = (t) => {
        var e;
        t.IsEnable()
          ? this.fgi(t.ItemConfigId, 1)
            ? (this.pgi(),
              (e = Math.min(t.GetCurrentCount() + 1, t.GetItemCount())),
              t.SetCurrentCount(e),
              this.mgi.RefreshItemGrid(t))
            : this.mgi.SetItemGridSelected(!1, t)
          : (ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              t.ItemConfigId,
            ),
            this.mgi.SetItemGridSelected(!1, t));
      }),
      (this.gke = (t) => !!this.ugi && this.ugi.HasEmptySlot()),
      (this.vgi = (t) => {
        var e = Math.max(t.GetCurrentCount() - 1, 0);
        t.SetCurrentCount(e),
          this.mgi.RefreshItemGrid(t),
          this.fgi(t.ItemConfigId, -1),
          this.pgi(),
          e <= 0 && this.mgi.SetItemGridSelected(!1, t);
      }),
      (this.Vgt = () => {
        ModelManager_1.ModelManager.ItemDeliverModel?.SetItemDeliverData(
          void 0,
        ),
          this.CloseMe();
      }),
      (this.Mgi = () => {
        var t = new DeliverMediumItemGrid_1.DeliverMediumItemGrid();
        return t.BindReduceButtonCallback(this.Egi), t;
      }),
      (this.Egi = (t) => {
        var t = t.Data,
          e = t.GetCurrentCount() - 1,
          i =
            (t.SetCurrentCount(Math.max(e, 0)),
            this.mgi.GetItemData(t.GetCurrentItemConfigId()));
        i &&
          (i.SetCurrentCount(i.GetCurrentCount() - 1),
          this.mgi.RefreshItemGrid(i)),
          e <= 0 && t.ClearItem(),
          this.pgi();
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
      (this.BtnBindInfo = [[2, this.sOt]]);
  }
  Cgi() {
    for (const t of this.ugi.GetSlotDataList())
      if (t.GetCurrentCount() < t.GetNeedCount()) return !1;
    return !0;
  }
  async OnBeforeStartAsync() {
    (this.cgi = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(5),
      this.Mgi,
    )),
      (this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.n6t.SetCloseCallBack(this.Vgt),
      (this.mgi = new ItemInteractionPanel_1.ItemInteractionPanel()),
      this.mgi.BindOnItemExtendToggleStateChanged(this.txt),
      this.mgi.BindOnCanExecuteChange(this.gke),
      this.mgi.BindOnReduceButtonTrigger(this.vgi),
      await this.mgi.CreateByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    (this.ugi = this.OpenParam),
      this.ugi &&
        (this.n6t.SetCloseBtnActive(!0),
        this.n6t.SetHelpBtnActive(!1),
        this.Nft(),
        this.Sgi(),
        this.pgi(() => {
          var t = this.ugi.GetSlotDataList()[0];
          t &&
            (this.ygi(t, t.GetNeedCount()),
            (t = t.GetItemRangeList().length <= 1),
            this.n6t.SetTitleIconVisible(t),
            this.n6t.SetTitleTextActive(t),
            t) &&
            ((t =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                "SP_IconDeliver",
              )),
            this.n6t.SetTitleIcon(t));
        }));
  }
  OnBeforeDestroy() {
    this.ugi?.Clear(),
      (this.ugi = void 0),
      (this.cgi = void 0),
      (this.mgi = void 0);
  }
  Nft() {
    var t = this.ugi.TitleTextId;
    t &&
      ((t = void 0 === t ? "" : PublicUtil_1.PublicUtil.GetConfigTextByKey(t)),
      this.GetText(6)?.SetText(t));
  }
  Sgi() {
    var t = this.ugi.DescriptionTextId,
      t = void 0 === t ? "" : PublicUtil_1.PublicUtil.GetConfigTextByKey(t);
    this.GetText(3)?.SetText(t);
  }
  fgi(e, i) {
    var r = this.ugi.GetSlotDataList();
    if (0 < i) {
      if (this.ugi?.IsSlotEnough(e))
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
  pgi(t) {
    var e = this.ugi.GetSlotDataList();
    this.cgi?.RefreshByData(e, t);
  }
  ygi(t, e) {
    var i = [],
      t = t.GetItemRangeList();
    if (t.length <= 1) this.mgi.SetActive(!1);
    else {
      for (const o of t) {
        var r = { ItemConfigId: o, CurrentCount: 0, NeedCount: e };
        i.push(r);
      }
      this.mgi.Refresh({ ItemInfoList: i }).then(
        () => {
          var t,
            e,
            i = this.mgi.GetItemDataMainTypeMap(),
            r = this.ugi.GetSlotDataList()[0].GetNeedCount(),
            o = this.mgi.GetMainTypeIdList()[0];
          for ([t, e] of i)
            for (const s of e)
              if (s.GetItemCount() >= r && t !== o) {
                this.mgi?.SetMainTypeRedDotVisible(t, !0);
                break;
              }
        },
        () => {},
      ),
        this.mgi.SetActive(!0);
    }
  }
}
exports.ItemDeliverView = ItemDeliverView;
//# sourceMappingURL=ItemDeliverView.js.map
