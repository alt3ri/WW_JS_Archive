"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeySettingRowKeyItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  InputSettings_1 = require("../../../InputSettings/InputSettings"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class KeySettingRowKeyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.uPi = void 0),
      (this.oxi = 0),
      (this.SPi = void 0),
      (this.c2n = void 0),
      (this.rxi = (i) => {
        1 === i && this.uPi && this.SPi && this.SPi(this.uPi, this);
      }),
      (this.L7a = () => {
        !this.uPi ||
          this.uPi.IsBothAction() ||
          (0 === this.uPi.OpenViewType &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "InputSettings",
                8,
                "按下清空按键按钮，清空此输入按键",
                ["ActionOrAxisName", this.uPi.GetActionOrAxisName()],
              ),
            this.uPi.DisableKey(this.oxi),
            this.nxi(),
            InputSettings_1.InputSettings.SaveKeyMappings()));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UISprite],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [1, this.rxi],
        [9, this.L7a],
      ]);
  }
  OnStart() {
    this.c2n = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(8));
  }
  OnBeforeDestroy() {
    this.ClearData(),
      (this.SPi = void 0),
      this.c2n?.Clear(),
      (this.c2n = void 0);
  }
  ClearData() {
    (this.uPi = void 0), (this.oxi = 0);
  }
  BindOnWaitInput(i) {
    this.SPi = i;
  }
  Refresh(i, t) {
    2 === i.GetRowType() &&
      ((this.uPi = i),
      (this.oxi = t),
      this.Nft(),
      this.nxi(),
      this.sxi(),
      this.Rxt(),
      this.MOt(),
      this.A7a());
  }
  Nft() {
    var i = this.GetText(0),
      t = this.uPi.GetSettingName();
    StringUtils_1.StringUtils.IsEmpty(t)
      ? i.SetText(this.uPi.GetActionOrAxisName())
      : LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
  }
  nxi() {
    var t = this.uPi.ButtonTextId;
    if (t && !StringUtils_1.StringUtils.IsBlank(t))
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t);
    else {
      let i = "+";
      var s,
        e,
        h,
        n,
        r,
        t = this.uPi.BothActionName,
        t =
          (t && 1 < t.length && (i = "/"),
          this.uPi.GetCurrentKeyNameRichText(this.oxi, i));
      t.length <= 0
        ? ((r = this.uPi.FindCombinationActionBinding()),
          (s = this.uPi.CombinationAxisBinding),
          (e = this.uPi.ActionBinding),
          (h = this.uPi.AxisBinding),
          e?.GetKeyNameList((e = [])),
          h?.GetKeyNameList((h = [])),
          (n = new Map()),
          r?.GetKeyMap(n),
          (r = new Map()),
          s?.GetKeyMap(r),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "InputSettings",
              8,
              "刷新按键设置项时，按键名称为空",
              ["ActionOrAxisName", this.uPi.GetActionOrAxisName()],
              ["IsActionOrAxis", this.uPi.IsActionOrAxis],
              ["ActionBindingKeys", e],
              ["AxisBindingKeys", h],
              ["combinationActionBindingKeyMap", n],
              ["combinationAxisBindingKeyMap", n],
            ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "NoneText"))
        : this.GetText(2)?.SetText(t);
    }
  }
  sxi() {
    var i;
    this.uPi.CanDisable ||
    ((i = this.uPi.DetailTextId), StringUtils_1.StringUtils.IsEmpty(i))
      ? this.GetSprite(5)?.SetUIActive(!1)
      : (this.GetSprite(5)?.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i));
  }
  Rxt() {
    var i = this.uPi.IsLock;
    this.GetSprite(6)?.SetUIActive(i),
      this.GetButton(1)?.SetSelfInteractive(!i);
  }
  MOt() {
    var i;
    this.uPi &&
      (i = this.GetButton(9)?.GetOwner()?.GetUIItem()) &&
      (!this.uPi.CanDisable ||
      this.uPi.IsLock ||
      this.uPi.IsBothAction() ||
      0 !== this.uPi.OpenViewType
        ? i.SetUIActive(!1)
        : i.SetUIActive(!0));
  }
  A7a() {
    this.uPi
      ? this.SetDetailItemVisible(this.uPi.IsExpandDetail)
      : this.SetDetailItemVisible(!1);
  }
  SetSelected(i) {
    this.GetSprite(7)?.SetUIActive(i),
      this.GetExtendToggle(1)?.SetToggleState(i ? 1 : 0, !1),
      this.GetText(2)?.SetUIActive(!i),
      this.GetItem(8)?.SetUIActive(i),
      i
        ? this.c2n.PlayLevelSequenceByName("Loop")
        : this.c2n.StopCurrentSequence();
  }
  SetDetailItemVisible(i) {
    var t,
      s = this.GetItem(3);
    !this.uPi ||
    ((t = this.uPi.DetailTextId), StringUtils_1.StringUtils.IsEmpty(t))
      ? s.SetUIActive(!1)
      : (s.SetUIActive(i), (this.uPi.IsExpandDetail = i));
  }
}
exports.KeySettingRowKeyItem = KeySettingRowKeyItem;
//# sourceMappingURL=KeySettingRowKeyItem.js.map
