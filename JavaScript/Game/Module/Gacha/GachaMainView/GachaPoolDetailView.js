"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaPoolDropItem =
    exports.GachaPoolDetailGrid =
    exports.GachaPoolDetailView =
      void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GachaController_1 = require("../GachaController");
class GachaPoolDetailData {
  constructor() {
    (this.TitleTextKey = ""), (this.ItemList = []);
  }
}
class GachaPoolDetailView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    var a,
      i,
      e = this.OpenParam,
      t = await GachaController_1.GachaController.GachaPoolDetailRequestAsync(
        e.Id,
      ),
      e =
        (this.GetText(0).SetText(t.rRa.rRa),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(3),
          "GachaPoolDetailTitle",
          e.Title,
        ),
        (a, i) => (a.iRa ? -1 : i.iRa ? 1 : 0)),
      o = [];
    null != t.rRa?.oRa &&
      0 < t.rRa?.oRa.length &&
      (((a = new GachaPoolDetailData()).TitleTextKey =
        "GachaPoolDetailFiveRoleItemTitle"),
      (a.ItemList = t.rRa.oRa.sort(e)),
      ((i = new GachaPoolDetailGrid()).Data = a),
      (a = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1))),
      o.push(i.CreateByActorAsync(a.GetOwner())),
      this.AddChild(i)),
      null != t.rRa?.nRa &&
        0 < t.rRa?.nRa.length &&
        (((a = new GachaPoolDetailData()).TitleTextKey =
          "GachaPoolDetailFiveWeaponItemTitle"),
        (a.ItemList = t.rRa.nRa.sort(e)),
        ((i = new GachaPoolDetailGrid()).Data = a),
        (a = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1))),
        o.push(i.CreateByActorAsync(a.GetOwner())),
        this.AddChild(i)),
      null != t.rRa?.sRa &&
        0 < t.rRa?.sRa.length &&
        (((a = new GachaPoolDetailData()).TitleTextKey =
          "GachaPoolDetailFourRoleItemTitle"),
        (a.ItemList = t.rRa.sRa.sort(e)),
        ((i = new GachaPoolDetailGrid()).Data = a),
        (a = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1))),
        o.push(i.CreateByActorAsync(a.GetOwner())),
        this.AddChild(i)),
      null != t.rRa?.aRa &&
        0 < t.rRa?.aRa.length &&
        (((a = new GachaPoolDetailData()).TitleTextKey =
          "GachaPoolDetailFourWeaponItemTitle"),
        (a.ItemList = t.rRa.aRa.sort(e)),
        ((i = new GachaPoolDetailGrid()).Data = a),
        (a = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1))),
        o.push(i.CreateByActorAsync(a.GetOwner())),
        this.AddChild(i)),
      null != t.rRa?.hRa &&
        0 < t.rRa?.hRa.length &&
        (((a = new GachaPoolDetailData()).TitleTextKey =
          "GachaPoolDetailThreeWeaponItemTitle"),
        (a.ItemList = t.rRa.hRa.sort(e)),
        ((i = new GachaPoolDetailGrid()).Data = a),
        (t = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1))),
        o.push(i.CreateByActorAsync(t.GetOwner())),
        this.AddChild(i)),
      await Promise.all(o),
      this.GetItem(2).SetUIActive(!1);
  }
}
exports.GachaPoolDetailView = GachaPoolDetailView;
class GachaPoolDetailGrid extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Data = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(0),
      this.Data.TitleTextKey,
    );
    var a = [];
    for (const t of this.Data.ItemList) {
      var i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1)),
        e = new GachaPoolDropItem();
      (e.Data = t),
        a.push(e.CreateByActorAsync(i.GetOwner())),
        this.AddChild(e);
    }
    this.GetItem(2).SetUIActive(!1), await Promise.all(a);
  }
}
exports.GachaPoolDetailGrid = GachaPoolDetailGrid;
class GachaPoolDropItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Data = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    var a,
      i =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          this.Data.f8n,
        ),
      e = this.Data.iRa ? "GachaDropItemUp" : "GachaPoolDropItemNormal";
    1 === i
      ? ((a = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
          this.Data.f8n,
        )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          e,
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a.Name),
        ))
      : 2 === i &&
        ((a =
          ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
            this.Data.f8n,
          )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          e,
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a.WeaponName),
        ));
  }
}
exports.GachaPoolDropItem = GachaPoolDropItem;
//# sourceMappingURL=GachaPoolDetailView.js.map
