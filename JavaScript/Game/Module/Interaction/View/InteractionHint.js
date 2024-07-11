"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractionHint = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  GlobalConfigFromCsvByName_1 = require("../../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem"),
  ToggleActionItem_1 = require("../../Common/Toggle/ToggleActionItem"),
  InteractionDefine_1 = require("../InteractionDefine");
class InteractionHint extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.$_i = void 0),
      (this.Y_i = 0),
      (this.J_i = void 0),
      (this.z_i = void 0),
      (this.Z_i = void 0),
      (this.ZXs = void 0),
      (this.tui = void 0),
      (this.iui = void 0),
      (this.oui = void 0),
      (this.rui = void 0),
      (this.ETt = 0),
      (this.apt = void 0),
      (this.nui = void 0),
      (this.sui = void 0),
      (this.aui = !1),
      (this.XBo = () => {
        this.RefreshChangeInteractionAction();
      }),
      (this.hui = () =>
        !ModelManager_1.ModelManager.InteractionModel.InInteractCd()),
      (this.lui = (t) => {
        this.sui && this.sui(t, this.ActorIndex);
      }),
      (this._ui = () => {
        this.tui && this.tui(this);
      }),
      (this.uui = () => {
        this.iui && this.iui(this);
      }),
      (this.cui = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [3, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(0),
      e =
        ((this.$_i = new ToggleActionItem_1.ToggleActionItem()),
        this.GetItem(2)),
      i =
        ((this.oui = new InputMultiKeyItem_1.InputMultiKeyItem()),
        this.GetItem(3));
    (this.rui = new InputMultiKeyItem_1.InputMultiKeyItem(
      !0,
      !0,
      "Hint_" + this.GridIndex,
    )),
      await Promise.all([
        this.$_i.CreateThenShowByActorAsync(t.GetOwner()),
        this.oui.CreateThenShowByActorAsync(e.GetOwner()),
        this.rui.CreateThenShowByActorAsync(i.GetOwner()),
      ]);
  }
  OnStart() {
    this.mui(),
      (this.Z_i = this.$_i.GetToggleText()),
      (this.ZXs = this.GetSprite(1)),
      this.Z_i.OnSelfLanguageChange.Bind(() => {
        this.P5e();
      }),
      this.RefreshInteractKeyItem(),
      this.RefreshChangeInteractionAction(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      );
  }
  OnBeforeShow() {
    this.PlayAppearSequence();
  }
  async OnBeforeHideAsync() {
    return this.PlayDisappearSequence();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.InputControllerChange,
      this.XBo,
    ),
      this.Cui(),
      (this.$_i = void 0),
      this.Z_i.OnSelfLanguageChange.Unbind(),
      (this.Z_i = void 0),
      (this.J_i = void 0),
      (this.tui = void 0),
      (this.Y_i = -1),
      (this.z_i = void 0),
      (this.ZXs = void 0),
      (this.oui = void 0),
      (this.rui = void 0);
  }
  Refresh(t, e, i) {
    (this.Y_i = this.GridIndex),
      (this.J_i = t.GetComponent(105)),
      (this.z_i = t.GetComponent(104)),
      this.z_i &&
        ((this.ETt = this.z_i.DropItemId), this.ETt) &&
        (this.apt =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
            this.ETt,
          ));
    let s = InteractionDefine_1.qualityColorList[0];
    this.apt &&
      0 < (t = this.apt.QualityId) &&
      (s = InteractionDefine_1.qualityColorList[t - 1]),
      (this.nui = UE.Color.FromHex(s)),
      this.P5e(),
      this.dui(),
      this.oIn(),
      this.rIn(),
      this.rui?.ResetLongPress();
  }
  Clear() {
    (this.Y_i = -1), (this.J_i = void 0), (this.z_i = void 0);
  }
  OnSelected(t) {
    this.SetSelected(!0);
  }
  OnDeselected(t) {
    this.SetSelected(!1);
  }
  GetKey(t, e) {
    return this.GridIndex;
  }
  RefreshChangeInteractionAction() {
    var t;
    Info_1.Info.IsInGamepad()
      ? ((t = {
          ActionOrAxisName: InputMappingsDefine_1.actionMappings.切换交互,
          IsDownArrowVisible: !0,
        }),
        this.oui.RefreshByActionOrAxis(t))
      : ((t = {
          ActionOrAxisName: InputMappingsDefine_1.axisMappings.WheelAxis,
          IsUpArrowVisible: !0,
          IsDownArrowVisible: !0,
        }),
        this.oui.RefreshByActionOrAxis(t));
  }
  RefreshInteractKeyItem() {
    var t = ModelManager_1.ModelManager.InteractionModel,
      e =
        (this.rui.ResetLongPress(),
        void 0 !==
        ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity
          ? InputMappingsDefine_1.actionMappings.UI键盘F手柄A
          : InputMappingsDefine_1.actionMappings.通用交互),
      e = {
        ActionOrAxisName: e,
        IsLongPressDisable: !this.aui,
        LongPressTime: t.AutoLongPressTime,
        DelayPressTime: t.ShowLongPressTime,
        IsShowLongPressWhenPress: !0,
        IsShowLongPressWhenRelease: !1,
        IsTextArrowVisible: !1,
        IsShowTextArrowWhenPress: !1,
        IsShowTextArrowWhenRelease: !1,
      };
    this.rui?.RefreshByActionOrAxis(e);
  }
  SetLongPressTime(t) {
    this.rui?.SetLongPressTime(t);
  }
  gui() {
    return this.z_i?.IsDropItem() ?? !1;
  }
  P5e() {
    var t, e;
    this.Z_i &&
      ((t = this.fui()),
      (e = this.pui()),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Test",
          8,
          "[InteractionHint]刷新交互列表项名称",
          ["interactText", e],
          ["iconPath", t],
        ),
      this.$_i.SetToggleTexture(t),
      this.$_i.SetToggleText(e));
  }
  pui() {
    var t = ModelManager_1.ModelManager.InteractionModel.GetOptionNameByIndex(
      this.ActorIndex,
    );
    if (t)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Test", 8, "[InteractionHint]GetInteractText", [
            "optionName",
            t,
          ]),
        PublicUtil_1.PublicUtil.GetConfigTextByKey(t)
      );
    if ((0, RegisterComponent_1.isComponentInstance)(this.J_i, 181)) {
      t = this.J_i.GetInteractController().DefaultShowOption;
      if (t)
        return (
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Test", 8, "[InteractionHint]GetInteractText", [
              "showOption",
              t,
            ]),
          t
        );
    }
    if (this.z_i) {
      var t = this.z_i.DropItemCount,
        e = this.z_i.PawnName;
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Test",
            8,
            "[InteractionHint]GetInteractText",
            ["PawnName", e],
            ["count", t],
          ),
        !StringUtils_1.StringUtils.IsEmpty(e))
      )
        return this.gui() && 1 < t ? e + "x" + t : e;
    }
    return "";
  }
  fui() {
    let t = "";
    if (this.gui()) {
      var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        this.ETt,
      );
      t = e?.IconMiddle;
    } else if ((0, RegisterComponent_1.isComponentInstance)(this.J_i, 181)) {
      e = this.J_i.GetInteractController().InteractIcon;
      if ("Collect" === e) {
        var i =
            this.J_i.GetInteractController().CreatureData.GetPbEntityInitData(),
          s = (0, IComponent_1.getComponent)(
            i.ComponentsData,
            "CollectComponent",
          ),
          i =
            ((t = this.vui("Dialog")),
            (0, IComponent_1.getComponent)(
              i.ComponentsData,
              "RewardComponent",
            ));
        if (s) {
          (s = i.RewardId),
            (i =
              ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
                s,
              ).DropPreview);
          if (0 < i.size)
            for (const r of i.keys()) {
              var n = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
                Number(r),
              );
              t = n.IconMiddle;
              break;
            }
        }
      } else
        t =
          "BigTeleporter" === e ||
          "SmallTeleporter" === e ||
          "TreasureBox" === e ||
          "UnknownCollect" === e
            ? this.Mui(e)
            : this.vui(e);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Interaction",
          37,
          "InteractionHit.SetIconAndEffect 旧版交互已经废除",
        );
    return t ?? "";
  }
  dui() {
    this.gui()
      ? (this.ZXs.SetColor(this.nui), this.ZXs.SetUIActive(!0))
      : this.ZXs.SetUIActive(!1);
  }
  Mui(t) {
    t = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
      "EInteractDefaultIcon." + t,
    );
    return void 0 === t ? "" : t.Value;
  }
  vui(t) {
    t = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
      "EInteractIcon." + t,
    );
    return void 0 === t ? "" : t.Value;
  }
  mui() {
    var t = this.$_i.GetToggleItem();
    t.CanExecuteChange.Bind(this.hui),
      t.OnStateChange.Add(this.lui),
      t.OnHover.Add(this._ui),
      t.OnUnHover.Add(this.uui);
  }
  Cui() {
    var t;
    this.$_i &&
      (t = this.$_i.GetToggleItem()) &&
      (t.OnStateChange.Clear(),
      t.CanExecuteChange.Unbind(),
      t.OnHover.Clear(),
      t.OnUnHover.Clear());
  }
  SetSelected(t) {
    (this.aui = t), this.oIn(), this.rIn();
    var e = this.$_i.GetToggleItem();
    t
      ? (e.SetToggleState(0, !1), e.SetToggleState(1, !1))
      : e.SetToggleState(0, !1);
  }
  oIn() {
    this.oui?.SetActive(
      void 0 ===
        ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity &&
        this.aui &&
        1 < ModelManager_1.ModelManager.InteractionModel.GetInteractItemCount(),
    );
  }
  rIn() {
    this.rui?.SetLongPressDisable(!this.aui), this.rui?.SetActive(this.aui);
  }
  BindOnHover(t) {
    this.tui = t;
  }
  BindOnUnHover(t) {
    this.iui = t;
  }
  BindOnToggleStateChanged(t) {
    this.sui = t;
  }
  get ActorIndex() {
    return this.Y_i;
  }
  GetPriority() {
    return this.cui;
  }
  UpdatePriority() {
    (0, RegisterComponent_1.isComponentInstance)(this.J_i, 181) &&
      (this.cui = this.J_i.GetInteractController().InteractEntity.Priority);
  }
  GetButtonForGuide() {
    return this.GetItem(0);
  }
  async PlayReleaseSequence() {
    return this.$_i.PlayReleaseSequence();
  }
  PlayAppearSequence() {
    this.$_i.PlayAppearSequence();
  }
  async PlayDisappearSequence() {
    await this.$_i.PlayDisappearSequence();
  }
}
exports.InteractionHint = InteractionHint;
//# sourceMappingURL=InteractionHint.js.map
