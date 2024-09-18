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
      i = this.OpenParam,
      t = await GachaController_1.GachaController.GachaPoolDetailRequestAsync(
        i.Id,
      ),
      i =
        (this.GetText(0).SetText(t.Erh.Erh),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(3),
          "GachaPoolDetailTitle",
          i.Title,
        ),
        ConfigManager_1.ConfigManager.GachaConfig?.GetGachaPoolConfig(i.Id)),
      i = ConfigManager_1.ConfigManager.GachaConfig?.GetGachaConfig(i.GachaId),
      e = (a, i) => (a.yrh ? -1 : i.yrh ? 1 : 0),
      o = [],
      l =
        (null != t.Erh?.Irh &&
          0 < t.Erh?.Irh.length &&
          (((l = new GachaPoolDetailData()).TitleTextKey =
            "GachaPoolDetail_FiveStar_" + i?.RuleGroupId),
          (l.ItemList = t.Erh.Irh.sort(e)),
          ((a = new GachaPoolDetailGrid()).Data = l),
          (l = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1))),
          o.push(a.CreateByActorAsync(l.GetOwner())),
          this.AddChild(a)),
        null != t.Erh?.Trh &&
          0 < t.Erh?.Trh.length &&
          (((l = new GachaPoolDetailData()).TitleTextKey =
            "GachaPoolDetail_FiveStar_" + i?.RuleGroupId),
          (l.ItemList = t.Erh.Trh.sort(e)),
          ((a = new GachaPoolDetailGrid()).Data = l),
          (l = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1))),
          o.push(a.CreateByActorAsync(l.GetOwner())),
          this.AddChild(a)),
        []);
    null != t.Erh?.Lrh && 0 < t.Erh?.Lrh.length && l.push(...t.Erh.Lrh),
      null != t.Erh?.Rrh && 0 < t.Erh?.Rrh.length && l.push(...t.Erh.Rrh),
      0 < l.length &&
        (((a = new GachaPoolDetailData()).TitleTextKey =
          "GachaPoolDetail_FourStar_" + i?.RuleGroupId),
        (a.ItemList = l.sort(e)),
        ((l = new GachaPoolDetailGrid()).Data = a),
        (a = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1))),
        o.push(l.CreateByActorAsync(a.GetOwner())),
        this.AddChild(l)),
      null != t.Erh?.Arh &&
        0 < t.Erh?.Arh.length &&
        (((a = new GachaPoolDetailData()).TitleTextKey =
          "GachaPoolDetail_ThreeStar_" + i?.RuleGroupId),
        (a.ItemList = t.Erh.Arh.sort(e)),
        ((l = new GachaPoolDetailGrid()).Data = a),
        (i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1))),
        o.push(l.CreateByActorAsync(i.GetOwner())),
        this.AddChild(l)),
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
    for (const e of this.Data.ItemList) {
      var i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1)),
        t = new GachaPoolDropItem();
      (t.Data = e),
        a.push(t.CreateByActorAsync(i.GetOwner())),
        this.AddChild(t);
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
          this.Data.L8n,
        ),
      t = this.Data.yrh ? "GachaDropItemUp" : "GachaPoolDropItemNormal";
    1 === i
      ? ((a = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
          this.Data.L8n,
        )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          t,
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a.Name),
        ))
      : 2 === i &&
        ((a =
          ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
            this.Data.L8n,
          )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          t,
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a.WeaponName),
        ));
  }
}
exports.GachaPoolDropItem = GachaPoolDropItem;
//# sourceMappingURL=GachaPoolDetailView.js.map
