"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemDeliverView = void 0);
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const ItemInteractionPanel_1 = require("../../Common/ItemInteractionPanel/View/ItemInteractionPanel");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const ItemDeliverController_1 = require("../ItemDeliverController");
const DeliverMediumItemGrid_1 = require("./DeliverMediumItemGrid");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
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
            const t = this.uCi.Context;
            if (t) {
              this.dCi = !0;
              let e = this.uCi.GetSlotDataList();
              if (t.Type === 6) {
                const i = [];
                for (const o of e)
                  if (o.HasItem()) {
                    const r = {
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
                t.Type === 1 &&
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
        let e;
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
        const e = Math.max(t.GetCurrentCount() - 1, 0);
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
        const t = new DeliverMediumItemGrid_1.DeliverMediumItemGrid();
        return t.BindReduceButtonCallback(this.SCi), t;
      }),
      (this.SCi = (t) => {
        var t = t.Data;
        const e = t.GetCurrentCount() - 1;
        const i =
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
          let t = this.uCi.GetSlotDataList()[0];
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
    let t = this.uCi.TitleTextId;
    t &&
      ((t = void 0 === t ? "" : PublicUtil_1.PublicUtil.GetConfigTextByKey(t)),
      this.GetText(6)?.SetText(t));
  }
  ECi() {
    var t = this.uCi.DescriptionTextId;
    var t = void 0 === t ? "" : PublicUtil_1.PublicUtil.GetConfigTextByKey(t);
    this.GetText(3)?.SetText(t);
  }
  fCi(e, i) {
    const r = this.uCi.GetSlotDataList();
    if (i > 0) {
      if (this.uCi?.IsSlotEnough(e))
        return (
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "RepeatedDeliveryItem",
          ),
          !1
        );
      for (const h of r) {
        var t = h.GetCurrentCount() + i;
        var t = MathUtils_1.MathUtils.Clamp(t, 0, h.GetNeedCount());
        if (!h.IsEnough()) {
          if (t <= 0) return h.ClearItem(), !0;
          if (h.SetItem(e, t)) return !0;
        }
      }
    } else
      for (let t = r.length - 1; t >= 0; t--) {
        const o = r[t];
        var s = o.GetCurrentCount() + i;
        var s = MathUtils_1.MathUtils.Clamp(s, 0, o.GetNeedCount());
        if (o.HasItem()) {
          if (s <= 0) return o.ClearItem(), !0;
          if (o.SetItem(e, s)) return !0;
        }
      }
    return !1;
  }
  pCi(t) {
    const e = this.uCi.GetSlotDataList();
    this.cCi?.RefreshByData(e, t);
  }
  yCi(t, e) {
    const i = [];
    var t = t.GetItemRangeList();
    if (t.length <= 1) this.mCi.SetActive(!1);
    else {
      for (const o of t) {
        const r = { ItemConfigId: o, CurrentCount: 0, NeedCount: e };
        i.push(r);
      }
      this.mCi.Refresh({ ItemInfoList: i }).then(
        () => {
          let t;
          let e;
          const i = this.mCi.GetItemDataMainTypeMap();
          const r = this.uCi.GetSlotDataList()[0].GetNeedCount();
          const o = this.mCi.GetMainTypeIdList()[0];
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
// # sourceMappingURL=ItemDeliverView.js.map
