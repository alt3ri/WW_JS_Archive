"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingWarningTips = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase"),
  ADD_VALUE = 20;
class FishingWarningTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.AddText = void 0),
      (this.SpriteBar = void 0),
      (this.AddValue = 0),
      (this.LastBarValue = 0),
      (this.BarMaxValue = 0),
      (this.TargetValue = 0),
      (this.eOi = !0),
      (this.$pt = void 0),
      (this.R4_ = !1),
      (this.A4_ = (t) => {
        "NumChange" === t && (this.AddText.SetUIActive(!1), (this.R4_ = !1));
      }),
      (this._yo = (t, i, e) => {
        (this.TargetValue = i),
          (this.AddValue = i - e),
          (this.eOi = !0),
          this.HandleShowAddValue();
      }),
      (this.P4_ = (t, i) => {
        (this.BarMaxValue = i), this.HandleWarningBar(0);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(2))),
      this.$pt.BindOnEndSequenceEvent(this.A4_),
      (this.AddText = this.GetText(1)),
      this.AddText.SetUIActive(!1),
      (this.SpriteBar = this.GetSprite(0));
    var t = ModelManager_1.ModelManager.FishingModel.GetShipData();
    (this.LastBarValue = t.GetAttributeValue(
      CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1,
    )),
      (this.BarMaxValue = t.GetAttributeValue(
        CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1Max,
      )),
      this.SpriteBar.SetFillAmount(this.LastBarValue / this.BarMaxValue);
  }
  OnAddEventListener() {
    var t = ModelManager_1.ModelManager.FishingModel.GetShipData();
    t.AddAttributeListener(
      CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1,
      this._yo,
    ),
      t.AddAttributeListener(
        CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1Max,
        this.P4_,
      );
  }
  OnRemoveEventListener() {
    var t = ModelManager_1.ModelManager.FishingModel.GetShipData();
    t.RemoveAttributeListener(
      CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1,
      this._yo,
    ),
      t.RemoveAttributeListener(
        CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1Max,
        this.P4_,
      );
  }
  OnBeforeDestroy() {
    this.$pt.Clear();
  }
  OnTick(t) {
    this.eOi &&
      (this.HandleWarningBar(t), this.LastBarValue === this.TargetValue) &&
      (this.eOi = !1);
  }
  HandleWarningBar(t) {
    t = ADD_VALUE * t * TimeUtil_1.TimeUtil.Millisecond;
    (this.LastBarValue = MathUtils_1.MathUtils.Clamp(
      this.LastBarValue + t,
      this.LastBarValue,
      this.TargetValue,
    )),
      this.SpriteBar.SetFillAmount(this.LastBarValue / this.BarMaxValue);
  }
  HandleShowAddValue() {
    1 < this.AddValue &&
      (this.R4_
        ? (this.AddText.SetText("+" + this.AddValue.toString()),
          this.$pt.ReplaySequence("NumChange"))
        : (this.AddText.SetUIActive(!0),
          (this.R4_ = !0),
          this.AddText.SetText("+" + this.AddValue.toString()),
          this.$pt.PlaySequence("NumChange")));
  }
}
exports.FishingWarningTips = FishingWarningTips;
//# sourceMappingURL=FishingWarningTips.js.map
