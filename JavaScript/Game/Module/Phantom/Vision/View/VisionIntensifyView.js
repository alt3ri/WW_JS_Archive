"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionIntensifyView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem"),
  VisionTabItem_1 = require("../../../Common/TabComponent/TabItem/VisionTabItem"),
  TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent"),
  HelpController_1 = require("../../../Help/HelpController"),
  ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
  UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
  CANNOTLEVELSUBQUALITY = 2,
  VISION_INTENSIFY_HELPID = 32;
class VisionIntensifyView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TabComponent = void 0),
      (this.TabViewComponent = void 0),
      (this.yvt = []),
      (this.aji = 0),
      (this.hji = !1),
      (this.tHi = void 0),
      (this.lji = (e) => {
        this.TabComponent.SetCloseBtnShowState(e);
      }),
      (this._ji = () => {
        this.TabComponent.SelectToggleByIndex(1);
      }),
      (this.uji = () => {
        var e, t;
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
          this.aji,
        ).GetQuality() > CANNOTLEVELSUBQUALITY &&
          (e = this.TabComponent.GetTabItemByIndex(1)) &&
          ((t = this.cji()), e.SetToggleStateForce(t ? 0 : 2, !1));
      }),
      (this.CanToggleChange = (e) => {
        return (
          1 !== e ||
          ((e = this.cji()) ||
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "VisionIdentifyLock",
            ),
          e)
        );
      }),
      (this.R6e = (e, t) => {
        return new VisionTabItem_1.VisionTabItem();
      }),
      (this.SetOnUndeterminedClick = () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "VisionIdentifyLock",
        );
      }),
      (this.pqe = (e) => {
        var t = this.yvt[e],
          i = t.ChildViewName,
          e = this.TabComponent.GetTabItemByIndex(e),
          n = this.TabViewComponent.GetCurrentTabView();
        n && n.HideUiTabView(!1),
          this.TabViewComponent.ToggleCallBack(t, i, e, this.aji),
          this.TabComponent.SetHelpButtonCallBack(this.mji);
      }),
      (this.mji = () => {
        HelpController_1.HelpController.OpenHelpById(VISION_INTENSIFY_HELPID);
      }),
      (this.yqe = (e) => {
        e = this.yvt[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
        );
      }),
      (this.CloseClick = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(
        this.R6e,
        this.pqe,
        this.yqe,
      ),
      e =
        ((this.TabComponent =
          new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
            this.GetItem(0),
            e,
            this.CloseClick,
          )),
        (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
          this.GetItem(1),
        )),
        new Array());
    e.push(ItemDefines_1.EItemId.Gold),
      this.TabComponent.SetCurrencyItemList(e),
      this.TabComponent.SetHelpButtonShowState(!0),
      this.TabComponent.SetCanChange(this.CanToggleChange),
      this.GetItem(2).SetUIActive(!1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshVisionIntensifyViewBackBtnState,
      this.lji,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PhantomLevelUp,
        this.uji,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnClickVisionIntensifyItemJump,
        this._ji,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshVisionIntensifyViewBackBtnState,
      this.lji,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PhantomLevelUp,
        this.uji,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnClickVisionIntensifyItemJump,
        this._ji,
      );
  }
  cji() {
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
        this.aji,
      ),
      t = e.GetSubPropUnlockLevel(0),
      e = e.GetPhantomLevel() >= t;
    return (
      e &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.VisionIntensifyTabOpen,
        ),
      e
    );
  }
  OnBeforePlayCloseSequence() {
    var e = this.TabViewComponent.GetCurrentTabView();
    e &&
      new UiSequencePlayer_1.UiSequencePlayer(e.GetRootItem()).PlaySequence(
        "Close",
      );
  }
  OnHandleLoadScene() {
    var e =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.aji,
      );
    e &&
      ControllerHolder_1.ControllerHolder.PhantomBattleController.SetMeshShow(
        e.GetConfigId(!0),
        void 0,
        this.tHi,
      );
  }
  OnBeforeShow() {
    var e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
        this.Info.Name,
      ),
      t =
        (e.forEach((e) => {
          this.yvt.push(e);
        }),
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
          this.aji,
        )),
      i = ModelManager_1.ModelManager.FunctionModel.IsOpen(10001004);
    let n = 0;
    n = t.GetQuality() <= CANNOTLEVELSUBQUALITY || !i ? 1 : e.length;
    this.TabComponent.RefreshTabItemByLength(n, () => {
      var e, t, i;
      for ([e, t] of this.TabComponent.GetTabItemMap())
        1 === e &&
          ((i = this.cji()),
          t.SetToggleStateForce(i ? 0 : 2, !1),
          t.SetCanClickWhenDisable(!0),
          t.SetOnUndeterminedClick(this.SetOnUndeterminedClick));
      this.TabComponent.SelectToggleByIndex(0, !0),
        this.TabViewComponent.SetCurrentTabViewState(!0),
        this.K8e(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshVisionIdentifyRedPoint,
          this.aji,
        );
    });
  }
  K8e() {
    var e = this.yvt.findIndex((e) => "VisionIdentifyView" === e.ChildViewName);
    0 < e &&
      (e = this.TabComponent.GetTabItemByIndex(e)) &&
      e.BindRedDot("IdentifyTab", this.aji);
  }
  Ovt() {
    var e = this.yvt.findIndex((e) => "VisionIdentifyView" === e.ChildViewName);
    0 < e && (e = this.TabComponent.GetTabItemByIndex(e)) && e.UnBindRedDot();
  }
  OnBeforeHide() {
    this.Ovt();
  }
  OnAfterHide() {
    var e = this.TabViewComponent.GetCurrentTabView();
    e && e.HideUiTabView(!1);
  }
  OnBeforeCreate() {
    (this.aji = this.OpenParam),
      UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() ||
        (UiSceneManager_1.UiSceneManager.InitVisionSkeletalHandle(),
        (this.hji = !0)),
      (this.tHi = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle());
  }
  OnBeforeDestroy() {
    this.TabViewComponent.DestroyTabViewComponent(),
      this.TabComponent.Destroy(),
      this.hji &&
        (UiSceneManager_1.UiSceneManager.DestroyVisionSkeletalHandle(),
        (this.tHi = void 0));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    const t = Number(e[0]);
    var i = this.TabComponent.GetTabItemByIndex(
      this.yvt.findIndex((e) => e.Id === t),
    ).GetRootItem();
    if (i) return [i, i];
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        e,
      ]);
  }
}
exports.VisionIntensifyView = VisionIntensifyView;
//# sourceMappingURL=VisionIntensifyView.js.map
