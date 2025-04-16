"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssAttributeTagItem =
    exports.DangoAbyssAttributeItem =
    exports.DangoAbyssAttributeTitleItem =
      void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  AttributeModel_1 = require("../../../Attribute/AttributeModel"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class DangoAbyssAttributeTitleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
    ];
  }
  Initialize(e) {
    this.CreateByActorAsync(e.GetOwner());
  }
  Refresh(e) {
    var t = this.GetText(0),
      i = this.GetSprite(1),
      s = e.IsValid
        ? "Text_AttributeValid_Text"
        : "Text_AttributeNotValid_Text";
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, s),
      t.SetChangeColor(!e.IsValid, t.changeColor),
      i.SetChangeColor(!e.IsValid, i.changeColor),
      this.SetUiActive(!0);
  }
}
exports.DangoAbyssAttributeTitleItem = DangoAbyssAttributeTitleItem;
class DangoAbyssAttributeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Sequence = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  Initialize(e) {
    this.CreateByActorAsync(e.GetOwner());
  }
  OnStart() {
    this.Sequence = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
  }
  Refresh(e) {
    var t = e.Attribute,
      i =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          t.Id,
        ),
      i =
        (this.GetText(1).ShowTextNew(i.Name),
        this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(0)),
        AttributeModel_1.TipsDataTool.GetPropRatioValue(t.AddValue, t.IsRatio)),
      i =
        ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
          t.Id,
          i,
          t.IsRatio,
        );
    this.GetText(2).SetText(i),
      this.SetUiActive(!0),
      e.IsChange && this.PlaySequence("Change");
  }
  async PlaySequence(e) {
    var t = new CustomPromise_1.CustomPromise();
    await this.Sequence?.PlaySequenceAsync(e, t);
  }
}
exports.DangoAbyssAttributeItem = DangoAbyssAttributeItem;
class DangoAbyssAttributeTagItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Sequence = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  Initialize(e) {
    this.CreateByActorAsync(e.GetOwner());
  }
  OnStart() {
    this.Sequence = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
  }
  Refresh(e) {
    var t = e.Tag,
      i =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(
          t.TagId,
        ),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Name),
        UE.Color.FromHex(i.BgColor)),
      i =
        (this.GetSprite(0).SetColor(i),
        ModelManager_1.ModelManager.DangoAbyssModel.GetFormatAttributeValueByTagId(
          t.Value,
          t.TagId,
        ));
    this.GetText(2).SetText(i),
      this.SetUiActive(!0),
      e.IsChange && this.PlaySequence("Change");
  }
  async PlaySequence(e) {
    var t = new CustomPromise_1.CustomPromise();
    await this.Sequence?.PlaySequenceAsync(e, t);
  }
}
exports.DangoAbyssAttributeTagItem = DangoAbyssAttributeTagItem;
//# sourceMappingURL=DangoAbyssAttributeItems.js.map
