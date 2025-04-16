"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemTipsAbyssDangoComponent = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  InActiveRedItem_1 = require("../../../Common/InActiveRedItem"),
  ItemTipsBaseSubComponent_1 = require("../../../Common/ItemTips/SubComponents/ItemTipsBaseSubComponent"),
  RoleAttributeItem_1 = require("../../../RoleUi/TabView/VisionSubView/RoleAttributeItem"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  DangoAbyssTagItem_1 = require("./DangoAbyssTagItem");
class ItemTipsAbyssDangoComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
  constructor(e) {
    super(e),
      (this.$8i = void 0),
      (this.ugc = void 0),
      (this.Qgc = void 0),
      (this.kgc = void 0),
      (this.Ogc = void 0),
      (this.L3a = (e) => {
        this.Og(this.$8i);
      }),
      (this.tWt = () => {}),
      (this.qgc = () => {
        return new DangoAbyssTagItem_1.DangoAbyssTagItem();
      }),
      (this.Bqe = () => {
        return new RoleAttributeItem_1.RoleAttributeItem();
      }),
      this.CreateThenShowByResourceIdAsync("UiItem_TipsChipInfo", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ];
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnItemFuncValueChange,
      this.L3a,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemFuncValueChange,
      this.L3a,
    );
  }
  async OnBeforeStartAsync() {
    var e = [];
    (this.ugc = new InActiveRedItem_1.InActiveRedItem()),
      e.push(this.ugc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())),
      (this.Qgc = new ButtonItem_1.ButtonItem()),
      e.push(this.Qgc.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())),
      this.Qgc.SetFunction(this.tWt),
      await Promise.all(e);
  }
  OnStart() {
    (this.kgc = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(1),
      this.Bqe,
      this.GetItem(2).GetOwner(),
    )),
      (this.Ogc = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(3),
        this.qgc,
        this.GetItem(4).GetOwner(),
      ));
  }
  Refresh(e) {
    var t = () => {
      this.Og(e);
    };
    this.InAsyncLoading() ? this.OperationMap.set("Refresh", t) : t();
  }
  Og(e) {
    this.$8i = e;
    var t =
        ModelManager_1.ModelManager.DangoAbyssModel.GetPluginShowAttributeList(
          e.ConfigId,
        ),
      t =
        (this.fvt(t),
        ModelManager_1.ModelManager.DangoAbyssModel.GetPluginShowTagDataList(
          e.ConfigId,
        )),
      t =
        (this.qSo(t),
        ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemConfig(
          e.ConfigId,
        ));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.BgDescription),
      this.Cgc(e),
      this.P7e(e),
      this.Kgc(e);
  }
  Kgc(e) {
    e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemLockState(
      e.IncId,
    )
      ? 1
      : 0;
    this.GetExtendToggle(0).SetToggleState(e);
  }
  P7e(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemBelongId(
        e.IncId,
      ),
      e = 0 === t || e.DangoId === t;
    this.Qgc?.SetButtonAllowEventBubbleUp(e);
  }
  Cgc(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemBelongId(
      e.IncId,
    );
    0 === t
      ? this.ugc?.SetActive(!1)
      : ((e = e.DangoId !== t), this.ugc?.SetActive(e));
  }
  fvt(e) {
    const i = new Array();
    e?.forEach((e) => {
      var t = new RoleAttributeItem_1.RoleAttributeSt();
      (t.Data = e), (t.NeedCheckBg = !1), i.push(t);
    }),
      this.kgc.RefreshByData(i);
  }
  qSo(e) {
    this.Ogc.RefreshByData(e);
  }
}
exports.ItemTipsAbyssDangoComponent = ItemTipsAbyssDangoComponent;
//# sourceMappingURL=ItemTipsAbyssDanngoComponent.js.map
