"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssPluginItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  DangoAbyssDefine_1 = require("../DangoAbyssDefine");
class DangoAbyssPluginItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i) {
    super(),
      (this.Xy = -1),
      (this.vc1 = !0),
      (this.$8i = void 0),
      (this.ViewModel = void 0),
      (this.Sequence = void 0),
      (this.N8e = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Activity", 75, "OnToggleClick, " + this.Xy);
        var e = this.ViewModel.GetDangoId();
        ModelManager_1.ModelManager.DangoAbyssModel.GetDangoIfLock(e) ||
          (ModelManager_1.ModelManager.DangoAbyssModel.GetSlotLockState(
            e,
            this.Xy,
          )
            ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                305,
              )).FunctionMap.set(2, this.Ny1),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                e,
              ))
            : (this.ViewModel.SetSlotIndex(this.Xy),
              this.vc1 ||
                UiManager_1.UiManager.OpenView(
                  "DangoAbyssPluginEquipView",
                  this.ViewModel,
                )));
      }),
      (this.Ny1 = () => {
        var e = this.ViewModel.GetDangoId();
        UiManager_1.UiManager.OpenView("DangoAbyssLevelUpView", e);
      }),
      (this.Xy = e),
      (this.vc1 = i);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[0, this.N8e]]);
  }
  OnStart() {
    (this.Sequence = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      this.GetExtendToggle(0).OnUndeterminedClicked.Add(this.N8e);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(0).OnUndeterminedClicked.Clear();
  }
  Refresh(e) {
    e
      ? (this.eI1(this.$8i, e),
        (this.$8i = e),
        this._Oe(),
        this.Aqe(),
        this.qwt(!1))
      : this.ME1();
  }
  ME1() {
    var e = this.ViewModel.GetDangoId(),
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetSlotUnlockLevel(
        e,
        this.Xy,
      );
    this.GetExtendToggle(0).SetToggleState(2),
      this.GetText(2).SetText(
        StringUtils_1.StringUtils.Format("Lv.{0}", e.toString()),
      ),
      this.GetText(2).SetUIActive(!0),
      this.GetTexture(1).SetUIActive(!1),
      this.GetTexture(5).SetUIActive(!1),
      this.GetSprite(3).SetUIActive(!0),
      this.GetSprite(4).SetUIActive(!1);
  }
  eI1(e, i) {
    var s = i?.GetDangoId() ?? 0,
      s = ModelManager_1.ModelManager.DangoAbyssModel.GetSlotLockState(
        s,
        this.Xy,
      );
    if (!s)
      switch (
        ModelManager_1.ModelManager.DangoAbyssModel.GetSlotSwitchTypeByData(
          e,
          i,
        )
      ) {
        case 3:
          this.PlaySequence("DropIn");
          break;
        case 2:
          this.PlaySequence("Replace");
          break;
        case 1:
          this.PlaySequence("MoveAway");
      }
  }
  async PlaySequence(e) {
    var i = new CustomPromise_1.CustomPromise();
    await this.Sequence?.PlaySequenceAsync(e, i);
  }
  _Oe() {
    var e = this.$8i.GetDangoId(),
      i = ModelManager_1.ModelManager.DangoAbyssModel.GetSlotUnlockLevel(
        e,
        this.Xy,
      ),
      s = this.GetExtendToggle(0),
      t = this.ViewModel.GetSlotIndex(),
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetSlotLockState(
        e,
        this.Xy,
      ),
      t = t === this.Xy;
    this.GetText(2).SetText(
      StringUtils_1.StringUtils.Format("Lv.{0}", i.toString()),
    ),
      this.GetText(2).SetUIActive(e),
      t && !e && this.vc1
        ? s.SetToggleState(1)
        : e
          ? s.SetToggleState(2)
          : s.SetToggleState(0);
  }
  Aqe() {
    var e = this.$8i.GetEquipId(),
      i = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(e);
    e <= 0 || !i || "" === i.IconMiddle
      ? (this.GetTexture(1).SetUIActive(!1), this.GetTexture(5).SetUIActive(!1))
      : ((e =
          ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemQualityIcon(
            e,
          )),
        this.SetTextureByPath(i.IconMiddle, this.GetTexture(1)),
        this.SetTextureByPath(e, this.GetTexture(5)),
        this.GetTexture(1).SetUIActive(!0),
        this.GetTexture(5).SetUIActive(!0),
        (i = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetSlotTypeByIndex(
          this.Xy,
        )),
        (e = this.GetTexture(1)),
        (i = DangoAbyssDefine_1.iconSizeBySlotType.get(i)),
        e.SetWidth(i),
        e.SetHeight(i));
  }
  qwt(e) {
    var i = this.$8i,
      s = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(
        i.GetEquipId(),
      ),
      i = !(0 === i.GetEquipId() || !s || "" === s.Icon) || !e;
    this.GetSprite(3).SetUIActive(i), this.GetSprite(4).SetUIActive(!i);
  }
}
exports.DangoAbyssPluginItem = DangoAbyssPluginItem;
//# sourceMappingURL=DangoAbyssPluginItem.js.map
