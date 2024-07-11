"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChipHandBookItem = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const SmallItemGrid_1 = require("../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew");
const ChipHandBookChildItem_1 = require("./ChipHandBookChildItem");
class ChipHandBookItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.kzt = void 0),
      (this.Gzt = void 0),
      (this.Fzt = void 0),
      (this.Vzt = void 0),
      (this.Hzt = []),
      (this.jzt = []),
      (this.Xgt = void 0),
      (this.Wzt = (t, i, e) => {
        i = new ChipHandBookChildItem_1.ChipHandBookChildItem(i);
        return (
          i.Refresh(t, !1, 0),
          i.BindToggleCallback(this.Kzt),
          this.jzt.push(i),
          { Key: e, Value: i }
        );
      }),
      (this.Kzt = (t) => {
        this.Fzt && this.Fzt(t);
      }),
      (this.Ozt = (t) => {
        var t = t === 1;
        const i = this.CheckIsCanShowChildList();
        this.GetItem(1).SetUIActive(i && t),
          this.GetItem(2).SetUIActive(!t && i),
          this.GetItem(6).SetUIActive(t && i),
          this.GetItem(8).SetUIActive(!i),
          this.Gzt && t && this.Gzt(this);
      });
  }
  Initialize(t) {
    t && this.SetRootActor(t.GetOwner(), !0);
  }
  OnRegisterComponent() {
    (this.ComponentsRegisterInfo = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIVerticalLayout],
      [5, UE.UIExtendToggle],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[5, this.Ozt]]);
  }
  OnStart() {
    (this.Xgt = new SmallItemGrid_1.SmallItemGrid()),
      this.Xgt.Initialize(this.GetItem(0).GetOwner());
  }
  Refresh(t, i, e) {
    var s = (this.kzt = t).Config.Id;
    var s =
      ConfigManager_1.ConfigManager.HandBookConfig.GetChipHandBookConfigList(s);
    var s =
      ((this.Hzt = s),
      { Type: 4, Data: t, IconPath: t.Icon, QualityId: t.QualityId });
    var t =
      (this.Xgt.Apply(s),
      this.Xgt.BindOnCanExecuteChange(() => !1),
      (this.jzt = []),
      (this.Vzt = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetVerticalLayout(4),
        this.Wzt,
      )),
      this.Vzt.RebuildLayoutByDataNew(this.Hzt),
      this.CheckIsCanShowChildList());
    this.GetText(3).SetText(
      t
        ? this.kzt.Title
        : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_Unknown_Text",
          ),
    ),
      this.GetItem(6).SetUIActive(!1),
      this.RefreshNewState(),
      this.GetItem(8).SetUIActive(!t),
      this.GetItem(1).SetUIActive(!1),
      this.GetItem(2).SetUIActive(t);
  }
  RefreshNewState() {
    const i = this.Hzt.length;
    let e = !1;
    for (let t = 0; t < i; t++) {
      var s = this.Hzt[t];
      var s = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
        6,
        s.Id,
      );
      if (!(void 0 === s) && !s.IsRead) {
        e = !0;
        break;
      }
    }
    this.GetItem(7).SetUIActive(e);
  }
  BindChildToggleCallback(t) {
    this.Fzt = t;
  }
  BindToggleCallback(t) {
    this.Gzt = t;
  }
  SelectFirstChildItem() {
    this.jzt.length !== 0 &&
      (this.CheckIsCanShowChildList() &&
        (this.GetItem(1).SetUIActive(!0),
        this.GetItem(2).SetUIActive(!1),
        this.GetItem(6).SetUIActive(!0),
        this.GetExtendToggle(5).SetToggleState(1)),
      this.ResetChildToggleState(),
      this.jzt[0].SetToggleStateForce(1));
  }
  CheckIsCanShowChildList() {
    const i = this.jzt.length;
    let e = !1;
    for (let t = 0; t < i; t++) {
      const s = this.jzt[t].GetData();
      if (ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(6, s.Id)) {
        e = !0;
        break;
      }
    }
    return e;
  }
  ResetChildToggleState() {
    const i = this.jzt.length;
    for (let t = 0; t < i; t++) this.jzt[t].SetToggleStateForce(0);
  }
  SetToggleStateForce(t, i = 0) {
    this.GetExtendToggle(5).SetToggleState(t), this.Ozt(t);
  }
  GetChildItemList() {
    return this.jzt;
  }
  OnClearComponentsData() {
    (this.kzt = void 0),
      (this.Gzt = void 0),
      (this.Fzt = void 0),
      this.Vzt && (this.Vzt.ClearChildren(), (this.Vzt = void 0)),
      (this.Hzt = []),
      (this.jzt = []),
      this.Xgt.ClearComponentsData(),
      (this.Xgt = void 0);
  }
}
exports.ChipHandBookItem = ChipHandBookItem;
// # sourceMappingURL=ChipHandBookItem.js.map
