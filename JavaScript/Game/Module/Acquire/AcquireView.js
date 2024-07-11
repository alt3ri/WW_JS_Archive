"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AcquireView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid");
const NumberSelectComponent_1 = require("../Common/NumberSelect/NumberSelectComponent");
const LguiUtil_1 = require("../Util/LguiUtil");
const GenericScrollView_1 = require("../Util/ScrollView/GenericScrollView");
class AcquireView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OGe = void 0),
      (this.kGe = void 0),
      (this.FGe = void 0),
      (this.VGe = void 0),
      (this.HGe = void 0),
      (this.jGe = void 0),
      (this.WGe = void 0),
      (this.KGe = (i) => {
        const e =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "UseCount",
          );
        return new LguiUtil_1.TableTextArgNew(e, i);
      }),
      (this.QGe = (i) => {
        this.jGe.GetRemainItemCount() > 0
          ? this.jGe.SetAmount(i)
          : this.jGe.SetAmount(0);
      }),
      (this.XGe = () => {
        this.ChildPopView?.HidePopView();
      }),
      (this.$Ge = (i) => {
        (i !== "CommonRewardView" &&
          i !== "CompositeRewardView" &&
          i !== "ExploreRewardView") ||
          this.ChildPopView?.ShowPopView();
      }),
      (this.bl = (i) => {
        i.GetRemainItemCount() <= 0
          ? this.CloseMe()
          : ((this.jGe = i),
            (i = this.jGe.GetItemData()),
            this.kGe.RefreshByData(i),
            this.RefreshButtonState(),
            this.YGe(),
            this.WGe.Refresh(this.jGe.GetRemainItemCount()));
      }),
      (this.JGe = (i, e, t) => {
        const s = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
        return s.Initialize(e.GetOwner()), s.Refresh(i), { Key: t, Value: s };
      }),
      (this.YGe = () => {
        this.zGe(), this.ZGe();
      }),
      (this.eNe = () => {
        this.CloseMe();
      }),
      (this.tNe = () => {
        const i = this.jGe.GetLeftButtonFunction();
        i ? i() : this.eNe();
      }),
      (this.iNe = () => {
        const i = this.jGe.GetRightButtonFunction();
        i ? i() : this.eNe();
      }),
      (this.oNe = () => {
        this.eNe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.iNe],
        [3, this.tNe],
        [8, this.oNe],
        [9, this.tNe],
      ]);
  }
  rNe() {
    this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
      this.GetItem(10),
    );
    const i = {
      MaxNumber: this.jGe.GetMaxAmount(),
      GetExchangeTableText: this.KGe,
      ValueChangeFunction: this.QGe,
    };
    this.WGe.Init(i);
  }
  OnStart() {
    (this.jGe = this.OpenParam),
      (this.OGe = this.GetText(5)),
      (this.VGe = this.GetText(7)),
      (this.HGe = this.GetText(2)),
      this.rNe(),
      (this.kGe = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(0),
        this.JGe,
      ));
    const i = this.jGe.GetItemData();
    this.kGe.RefreshByData(i), this.RefreshButtonState(), this.YGe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshAcquireView,
      this.bl,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnShowRewardView,
        this.XGe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshAcquireView,
      this.bl,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnShowRewardView,
        this.XGe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  RefreshButtonState() {
    let i = this.jGe.GetLeftButtonFunction();
    const e = this.jGe.GetRightButtonFunction();
    const t = this.GetButton(3);
    const s = this.GetButton(4);
    const h = this.GetButton(8);
    const r = this.GetButton(9);
    i || e
      ? ((i = this.jGe.GetAcquireViewType()),
        s.RootUIComp.SetUIActive(!0),
        h.RootUIComp.SetUIActive(!1),
        i === 2
          ? (r.RootUIComp.SetUIActive(!0), t.RootUIComp.SetUIActive(!1))
          : (r.RootUIComp.SetUIActive(!1), t.RootUIComp.SetUIActive(!0)),
        s.RootUIComp.SetUIActive(!0),
        h.RootUIComp.SetUIActive(!1))
      : (t.RootUIComp.SetUIActive(!1),
        s.RootUIComp.SetUIActive(!1),
        r.RootUIComp.SetUIActive(!1),
        h.RootUIComp.SetUIActive(!0));
  }
  zGe() {
    const i = this.jGe.GetAcquireViewType() === 0;
    this.OGe.SetUIActive(i),
      i
        ? (this.OGe.SetText(this.jGe.GetNameText()),
          LguiUtil_1.LguiUtil.SetLocalText(this.HGe, "AcquireOpenCount"))
        : LguiUtil_1.LguiUtil.SetLocalText(this.HGe, "AcquireGetReward");
  }
  ZGe() {
    var i = this.jGe.GetLeftButtonTextTableId();
    var i =
      (LguiUtil_1.LguiUtil.SetLocalText(this.FGe, i ?? "AcquireCancel"),
      this.jGe.GetRightButtonTextTableId());
    LguiUtil_1.LguiUtil.SetLocalText(this.VGe, i ?? "AcquireConfirm");
  }
  OnBeforeDestroy() {
    const i = this.jGe.GetMidButtonFunction();
    i && i(),
      ModelManager_1.ModelManager.InventoryModel.SetAcquireData(void 0),
      (this.OGe = void 0),
      this.kGe.ClearChildren(),
      (this.kGe = void 0),
      (this.FGe = void 0),
      (this.VGe = void 0),
      (this.HGe = void 0),
      (this.jGe = void 0);
  }
}
exports.AcquireView = AcquireView;
// # sourceMappingURL=AcquireView.js.map
