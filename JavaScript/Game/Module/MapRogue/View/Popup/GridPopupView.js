"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GridPopupView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  Global_1 = require("../../../../Global"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  PopupTypeRightItem_1 = require("../../../../Ui/Common/PopupTypeRightItem"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PopupComponentConditionBar_1 = require("./Components/PopupComponentConditionBar"),
  PopupComponentDescription_1 = require("./Components/PopupComponentDescription"),
  PopupComponentEventCost_1 = require("./Components/PopupComponentEventCost"),
  PopupComponentFunctionButton_1 = require("./Components/PopupComponentFunctionButton"),
  PopupComponentInfoList_1 = require("./Components/PopupComponentInfoList"),
  PopupComponentRecommendTip_1 = require("./Components/PopupComponentRecommendTip"),
  PopupComponentRewardList_1 = require("./Components/PopupComponentRewardList"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine");
class GridPopupView extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Vm = t),
      (this.LevelSequencePlayer = void 0),
      (this.UiBgItem = void 0),
      (this.Description = void 0),
      (this.ConditionBar = void 0),
      (this.Q_t = Vector2D_1.Vector2D.Create()),
      (this.b2c = () => {
        this.Vm.GetBtnDetailFunc();
      }),
      (this.J2i = () => {
        this.Vm.OnClickedClose();
      }),
      (this.JI1 = () => {
        if (!this.Vm.IsEnd) {
          if (this.Vm.EventAvailable()) {
            var t = this.Vm.GameInfo,
              e = Global_1.Global.CharacterController,
              i = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
            if ((this.Q_t.Reset(), e)) {
              e = e.GetInputPosition();
              if (e) {
                this.Q_t.AdditionEqual(e);
                e = i.ConvertPositionFromViewportToLGUICanvas(
                  this.Q_t.ToUeVector2D(),
                );
                if (t.IsPosInGridRange(e.X, e.Y, t.CurSelectedIndex))
                  return (
                    (this.Vm.IsEnd = !0),
                    t.RequestMove(),
                    void this.CloseMeAsync()
                  );
              }
            }
          }
          this.Vm.OnClickedClose();
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [4, this.b2c],
        [8, this.JI1],
      ]);
  }
  async OnBeforeStartAsync() {
    this.Vm.BindView(this);
    var t = [];
    (this.UiBgItem = new PopupTypeRightItem_1.PopupTypeRightItem()),
      t.push(
        this.UiBgItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      ),
      t.push(this.kNc()),
      t.push(this.k11()),
      await Promise.all(t),
      this.UiBgItem.AttachItem(this.GetOriginalItem(), this.GetRootItem()),
      this.UiBgItem.SetPopupViewBase(),
      this.UiBgItem.OverrideBackBtnCallBack(this.J2i),
      await this.Vm.Init();
  }
  OnStart() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RogueMapEventDetailOpenOrClose,
        !0,
      );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RogueMapEventDetailOpenOrClose,
      !1,
    );
  }
  OnBeforeShow() {
    this.Refresh(), this.GetButton(8).RootUIComp.SetUIActive(!0);
  }
  async OnShowAsyncImplementImplement() {
    var t = new CustomPromise_1.CustomPromise();
    await this.LevelSequencePlayer.PlaySequenceAsync("Start", t);
  }
  async OnHideAsyncImplementImplement() {
    this.GetButton(8).RootUIComp.SetUIActive(!1);
    var t = new CustomPromise_1.CustomPromise();
    await this.LevelSequencePlayer.PlaySequenceAsync("Close", t);
  }
  Refresh() {
    this.OnRefreshCommon(), this.OnRefreshComponent();
  }
  OnRefreshCommon() {
    var t = this.GetSprite(1),
      e = this.GetText(2),
      i = this.GetText(3),
      n = this.GetButton(4),
      o = ConfigManager_1.ConfigManager.MapRogueConfig?.GetGridEventConfigById(
        this.Vm.GridData.GridEventId,
      );
    if (o) {
      StringUtils_1.StringUtils.IsEmpty(o.Icon) ||
        this.SetSpriteByPath(o.Icon, t, !1),
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, o.Title),
        this.Description.SetDescriptionByTextId(o.Desc);
      (t = this.Vm.GetSubTxtInfo()),
        (e =
          (t && i.SetText(t),
          i.SetUIActive(!StringUtils_1.StringUtils.IsEmpty(t)),
          n.RootUIComp.SetUIActive(this.Vm.HasBtnDetail),
          this.Vm.EventAvailable()));
      if ((this.ConditionBar.SetUiActive(!e), !e)) {
        switch (
          (this.ConditionBar.SetButtonVisible(!1), this.Vm.GameInfo.MoveState)
        ) {
          case 2:
            return void this.ConditionBar.SetTextByTextId(
              "RogueRes_Block_UnableMove",
            );
          case 3:
            return void this.ConditionBar.SetTextByTextId(
              "RogueRes_Block_UnableMove_Event",
            );
        }
        i = this.Vm.GridData.ConditionInfo;
        i &&
          this.ConditionBar.SetTextByTextId(
            o.CondText,
            i.lMs.toString(),
            i.j6n.toString(),
          );
      }
    }
  }
  OnRefreshComponent() {
    this.Vm.RefreshTop(), this.Vm.RefreshBottom(), this.Vm.RefreshFunctional();
  }
  GetPanelTop() {
    return this.GetItem(5);
  }
  GetPanelBottom() {
    return this.GetItem(6);
  }
  GetPanelFunctional() {
    return this.GetItem(7);
  }
  async kNc(t = this.GetPanelTop()) {
    (this.Description =
      new PopupComponentDescription_1.PopupComponentDescription()),
      await this.Description.CreateThenShowByResourceIdAsync(
        "UiItem_PopupDescription",
        t,
      );
  }
  async k11(t = this.GetPanelFunctional()) {
    (this.ConditionBar =
      new PopupComponentConditionBar_1.PopupComponentConditionBar()),
      await this.ConditionBar.CreateByResourceIdAsync(
        "UiItem_PopupConditionBar",
        t,
      );
  }
  async InitComponentButton(t = this.GetPanelFunctional()) {
    const e = new CustomPromise_1.CustomPromise(),
      i = new PopupComponentFunctionButton_1.PopupComponentFunctionButton();
    return (
      i.CreateByResourceIdAsync("UiItem_PopupButton", t).finally(() => {
        e.SetResult(i);
      }),
      e.Promise
    );
  }
  async InitRecommendTip(t = this.GetPanelFunctional()) {
    const e = new CustomPromise_1.CustomPromise(),
      i = new PopupComponentRecommendTip_1.PopupComponentRecommendTip();
    return (
      i
        .CreateThenShowByResourceIdAsync("UiItem_PopupRecommendTip", t)
        .finally(() => {
          e.SetResult(i);
        }),
      e.Promise
    );
  }
  async InitInfoList(t = this.GetPanelBottom()) {
    const e = new CustomPromise_1.CustomPromise(),
      i = new PopupComponentInfoList_1.PopupComponentInfoList();
    return (
      i
        .CreateThenShowByResourceIdAsync("UiItem_PopupItemList", t)
        .finally(() => {
          e.SetResult(i);
        }),
      e.Promise
    );
  }
  async InitEventCost(t = this.GetPanelTop()) {
    const e = new CustomPromise_1.CustomPromise(),
      i = new PopupComponentEventCost_1.PopupComponentEventCost();
    return (
      i
        .CreateThenShowByResourceIdAsync("UiItem_PopupEventCost", t)
        .finally(() => {
          e.SetResult(i);
        }),
      e.Promise
    );
  }
  async InitRewardList(t = this.GetPanelBottom()) {
    const e = new CustomPromise_1.CustomPromise(),
      i = new PopupComponentRewardList_1.PopupComponentRewardList();
    return (
      i
        .CreateThenShowByResourceIdAsync("UiItem_PopupPreviewReward", t)
        .finally(() => {
          e.SetResult(i);
        }),
      e.Promise
    );
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (0 !== t.length) return this.Vm.GetGuideUiItemAndUiItemForShowEx(t);
  }
}
exports.GridPopupView = GridPopupView;
//# sourceMappingURL=GridPopupView.js.map
