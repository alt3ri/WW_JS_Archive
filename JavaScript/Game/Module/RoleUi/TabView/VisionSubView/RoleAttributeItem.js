"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleAttributeItem = exports.RoleAttributeSt = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RoleAttributeSt {
  constructor() {
    (this.Data = void 0), (this.NeedCheckBg = !1);
  }
}
exports.RoleAttributeSt = RoleAttributeSt;
class RoleAttributeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0);
  }
  Refresh(e, t, s) {
    this.Update(e);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UISprite],
      [6, UE.UIItem],
    ];
  }
  OnStart() {}
  Update(e) {
    var t;
    e.NeedCheckBg && this.GetSprite(5).SetUIActive(this.GridIndex % 2 == 0),
      e.Data.IsUnknown
        ? (this.GetText(0).SetText("???"),
          this.GetText(1).SetText("???"),
          this.GetTexture(4).SetUIActive(!1))
        : ((t =
            ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
              e.Data.Id,
            )),
          this.SetTextureByPath(t.Icon, this.GetTexture(4)),
          this.GetText(0).ShowTextNew(t.Name),
          this.GetItem(2).SetUIActive(2 === e.Data.AttributeType),
          this.GetText(3).SetUIActive(2 === e.Data.AttributeType),
          this.fvt(e.Data),
          this.Yo_(e.Data.NeedHighLight));
  }
  fvt(e) {
    4 === e.AttributeType || 1 === e.AttributeType || 3 === e.AttributeType
      ? this.GetText(1).SetText(
          ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
            e.Id,
            e.BaseValue + e.AddValue,
            e.IsRatio,
          ),
        )
      : (this.GetText(3).SetText(
          ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
            e.Id,
            e.AddValue,
            e.IsRatio,
          ),
        ),
        this.GetText(1).SetText(
          ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
            e.Id,
            e.BaseValue,
            e.IsRatio,
          ),
        ));
  }
  Yo_(e) {
    this.GetItem(6).SetUIActive(e);
  }
}
exports.RoleAttributeItem = RoleAttributeItem;
//# sourceMappingURL=RoleAttributeItem.js.map
