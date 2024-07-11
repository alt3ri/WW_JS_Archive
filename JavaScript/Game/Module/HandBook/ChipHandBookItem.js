"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChipHandBookItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  SmallItemGrid_1 = require("../Common/SmallItemGrid/SmallItemGrid");
class ChipHandBookItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.YQn = void 0),
      (this.JQn = void 0),
      (this.GZt = void 0),
      (this.FZt = void 0);
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), void 0, !0), await this.WZt();
  }
  async WZt() {
    (this.YQn = new HandBookChipToggleItem()),
      this.AddChild(this.YQn),
      (this.JQn = new HandBookChipDesItem()),
      this.AddChild(this.JQn);
    var t = this.GetItem(0),
      i = (t.SetUIActive(!1), this.GetItem(1));
    i.SetUIActive(!1),
      await Promise.all([
        this.YQn.CreateByActorAsync(t.GetOwner()),
        this.JQn.CreateByActorAsync(i.GetOwner()),
      ]),
      this.YQn.BindToggleCallback(this.GZt),
      this.JQn.BindChildToggleCallback(this.FZt);
  }
  GetUsingItem(t) {
    return (
      t.HandBookChipConfigId ? this.GetItem(1) : this.GetItem(0)
    ).GetOwner();
  }
  ClearItem() {
    this.Destroy();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  Update(t, i) {
    this.JQn?.SetUiActive(!1),
      this.YQn?.SetUiActive(!1),
      t.HandBookChipConfigId
        ? (this.JQn?.SetUiActive(!0),
          this.JQn?.Refresh(t.HandBookChipConfigId, t.IsShowContent))
        : t.HandBookCommonItemData &&
          (this.YQn?.SetUiActive(!0),
          this.YQn?.Refresh(t.HandBookCommonItemData, t.IsShowContent));
  }
  RefreshNewState() {
    this.YQn?.RefreshNewState(), this.JQn?.RefreshNewState();
  }
  BindChildToggleCallback(t) {
    this.FZt = t;
  }
  BindToggleCallback(t) {
    this.GZt = t;
  }
}
exports.ChipHandBookItem = ChipHandBookItem;
class HandBookChipToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.GZt = void 0),
      (this.sft = void 0),
      (this.kZt = void 0),
      (this.OZt = (t) => {
        var i,
          s,
          t = 1 === t;
        t &&
          ((i = this.kZt.Config),
          (s = this.CheckIsCanShowChildList(i.Id)),
          this.GetItem(1).SetUIActive(s && !0),
          this.GetItem(6).SetUIActive(!1),
          this.GetItem(4).SetUIActive(!s),
          this.GZt) &&
          t &&
          this.GZt(i.Id);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIExtendToggle],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[5, this.OZt]]);
  }
  OnStart() {
    (this.sft = new SmallItemGrid_1.SmallItemGrid()),
      this.sft.Initialize(this.GetItem(0).GetOwner());
  }
  Refresh(t, i) {
    var s = (this.kZt = t).Config,
      t = { Type: 4, Data: t, IconPath: t.Icon, QualityId: t.QualityId },
      t =
        (this.sft.Apply(t),
        this.sft.BindOnCanExecuteChange(() => !1),
        this.CheckIsCanShowChildList(s.Id)),
      t =
        (this.GetText(2).SetText(
          t
            ? this.kZt.Title
            : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "Text_Unknown_Text",
              ),
        ),
        this.GetItem(4).SetUIActive(!t),
        this.GetItem(1).SetUIActive(t && i),
        this.GetItem(6).SetUIActive(t && !i),
        this.CheckNewState(s.Id));
    this.GetItem(3).SetUIActive(t),
      this.GetExtendToggle(5).SetToggleState(i ? 1 : 0, !1);
  }
  CheckIsCanShowChildList(t) {
    var i =
        ConfigManager_1.ConfigManager.HandBookConfig.GetChipHandBookConfigList(
          t,
        ),
      s = i?.length ?? 0;
    let e = !1;
    for (let t = 0; t < s; t++) {
      var h = i[t];
      if (ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(6, h.Id)) {
        e = !0;
        break;
      }
    }
    return e;
  }
  CheckNewState(t) {
    var i =
        ConfigManager_1.ConfigManager.HandBookConfig.GetChipHandBookConfigList(
          t,
        ),
      s = i?.length ?? 0;
    let e = !1;
    for (let t = 0; t < s; t++) {
      var h = i[t],
        h = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(6, h.Id);
      if (!(void 0 === h) && !h.IsRead) {
        e = !0;
        break;
      }
    }
    return e;
  }
  RefreshNewState() {
    var t;
    this.kZt &&
      ((t = this.kZt.Config),
      (t = this.CheckNewState(t.Id)),
      this.GetItem(3).SetUIActive(t));
  }
  BindToggleCallback(t) {
    this.GZt = t;
  }
}
class HandBookChipDesItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.FZt = void 0),
      (this.zQn = void 0),
      (this.Rjt = !1),
      (this.H5e = void 0),
      (this.OZt = (t) => {
        this.FZt && 1 === t && this.FZt(this.zQn, this.H5e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIItem],
      [3, UE.UIText],
      [2, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [0, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[0, this.OZt]]);
  }
  OnStart() {
    this.H5e = this.GetExtendToggle(0);
  }
  Refresh(t, i) {
    var t =
        ConfigManager_1.ConfigManager.HandBookConfig.GetChipHandBookConfig(t),
      s =
        ((this.zQn = t),
        ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(6, t.Id)),
      t =
        ((this.Rjt = void 0 === s),
        this.GetItem(1).SetUIActive(this.Rjt),
        this.GetText(2).SetUIActive(!this.Rjt),
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
          t.Id,
        )),
      t =
        (this.GetText(2).SetText(t),
        this.GetText(3).SetText(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_Unknown_Text",
          ),
        ),
        this.GetItem(4)),
      e = this.GetItem(5),
      s = void 0 !== s && !s.IsRead;
    e.SetUIActive(this.Rjt),
      this.Rjt ? t.SetUIActive(!1) : t.SetUIActive(s),
      i && this.H5e?.SetToggleState(1, !0);
  }
  BindChildToggleCallback(t) {
    this.FZt = t;
  }
  RefreshNewState() {
    var t;
    this.zQn &&
      ((t =
        void 0 !==
          (t = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
            6,
            this.zQn.Id,
          )) && !t.IsRead),
      this.GetItem(4).SetUIActive(t));
  }
}
//# sourceMappingURL=ChipHandBookItem.js.map
