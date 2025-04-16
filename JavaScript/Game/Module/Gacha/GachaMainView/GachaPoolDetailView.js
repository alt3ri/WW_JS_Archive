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
    (this.TitleTextKey = ""), (this.TitleDescKey = ""), (this.ItemList = []);
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
    var i,
      t = this.OpenParam,
      a = await GachaController_1.GachaController.GachaPoolDetailRequestAsync(
        t.Id,
      ),
      t =
        (this.GetText(0).SetText(a.Mb_.Mb_),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(3),
          "GachaPoolDetailTitle",
          t.Title,
        ),
        (i, t) => (i.Sb_ ? -1 : t.Sb_ ? 1 : 0)),
      e = [],
      o =
        (void 0 !== a.Mb_?.Eb_ &&
          0 < a.Mb_?.Eb_.length &&
          (((o = new GachaPoolDetailData()).TitleTextKey = a.Mb_.q4_),
          (o.TitleDescKey = a.Mb_.O4_),
          (o.ItemList = a.Mb_.Eb_.sort(t)),
          ((i = new GachaPoolDetailGrid()).Data = o),
          (o = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1))),
          e.push(i.CreateByActorAsync(o.GetOwner())),
          this.AddChild(i)),
        null != a.Mb_?.Ib_ &&
          0 < a.Mb_?.Ib_.length &&
          (((o = new GachaPoolDetailData()).TitleTextKey = a.Mb_.q4_),
          (o.TitleDescKey = a.Mb_.O4_),
          (o.ItemList = a.Mb_.Ib_.sort(t)),
          ((i = new GachaPoolDetailGrid()).Data = o),
          (o = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1))),
          e.push(i.CreateByActorAsync(o.GetOwner())),
          this.AddChild(i)),
        []);
    null != a.Mb_?.Tb_ && 0 < a.Mb_?.Tb_.length && o.push(...a.Mb_.Tb_),
      null != a.Mb_?.bb_ && 0 < a.Mb_?.bb_.length && o.push(...a.Mb_.bb_),
      0 < o.length &&
        (((i = new GachaPoolDetailData()).TitleTextKey = a.Mb_.G4_),
        (i.TitleDescKey = a.Mb_.F4_),
        (i.ItemList = o.sort(t)),
        ((o = new GachaPoolDetailGrid()).Data = i),
        (i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1))),
        e.push(o.CreateByActorAsync(i.GetOwner())),
        this.AddChild(o)),
      null != a.Mb_?.Lb_ &&
        0 < a.Mb_?.Lb_.length &&
        (((i = new GachaPoolDetailData()).TitleTextKey = a.Mb_.N4_),
        (i.TitleDescKey = a.Mb_.V4_),
        (i.ItemList = a.Mb_.Lb_.sort(t)),
        ((o = new GachaPoolDetailGrid()).Data = i),
        (a = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1))),
        e.push(o.CreateByActorAsync(a.GetOwner())),
        this.AddChild(o)),
      await Promise.all(e),
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
      [3, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    this.GetText(0).SetText(this.Data.TitleDescKey),
      this.GetText(3).SetText(this.Data.TitleTextKey);
    var i = [];
    for (const e of this.Data.ItemList) {
      var t = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1)),
        a = new GachaPoolDropItem();
      (a.Data = e),
        i.push(a.CreateByActorAsync(t.GetOwner())),
        this.AddChild(a);
    }
    this.GetItem(2).SetUIActive(!1), await Promise.all(i);
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
    var i,
      t =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          this.Data.L8n,
        ),
      a = this.Data.Sb_ ? "GachaDropItemUp" : "GachaPoolDropItemNormal";
    1 === t
      ? ((i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
          this.Data.L8n,
        )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          a,
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name),
        ))
      : 2 === t &&
        ((i =
          ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
            this.Data.L8n,
          )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          a,
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.WeaponName),
        ));
  }
}
exports.GachaPoolDropItem = GachaPoolDropItem;
//# sourceMappingURL=GachaPoolDetailView.js.map
