"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleVisionAttribute = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
class RoleVisionAttributeSt {
  constructor() {
    (this.Data = void 0), (this.NeedCheckBg = !1);
  }
}
class RoleVisionAttribute extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.AttributeScroller = void 0),
      (this.wqe = void 0),
      (this.Bdo = () => {
        return new RoleVisionAttributeItem();
      }),
      (this.wqe = e);
  }
  Init() {
    this.CreateThenShowByActor(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.AttributeScroller = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(0),
      this.Bdo,
      this.GetItem(1).GetOwner(),
    );
  }
  Refresh(e, i = !1) {
    const s = new Array();
    e?.forEach((e) => {
      const t = new RoleVisionAttributeSt();
      (t.Data = e), (t.NeedCheckBg = i), s.push(t);
    }),
      this.AttributeScroller.RefreshByData(s);
  }
}
exports.RoleVisionAttribute = RoleVisionAttribute;
class RoleVisionAttributeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0);
  }
  Refresh(e, t, i) {
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
    ];
  }
  Update(e) {
    let t;
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
          this.GetItem(2).SetUIActive(e.Data.AttributeType === 2),
          this.GetText(3).SetUIActive(e.Data.AttributeType === 2),
          this.npt(e.Data));
  }
  npt(e) {
    e.AttributeType === 4 || e.AttributeType === 1 || e.AttributeType === 3
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
  SetBgEnable(e) {
    this.GetSprite(5).SetUIActive(e);
  }
}
// # sourceMappingURL=RoleVisionAttribute.js.map
