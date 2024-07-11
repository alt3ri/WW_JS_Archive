"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionIntensifyView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem");
const VisionTabItem_1 = require("../../../Common/TabComponent/TabItem/VisionTabItem");
const TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent");
const HelpController_1 = require("../../../Help/HelpController");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const CANNOTLEVELSUBQUALITY = 2;
const VISION_INTENSIFY_HELPID = 32;
class VisionIntensifyView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TabComponent = void 0),
      (this.TabViewComponent = void 0),
      (this.upt = []),
      (this.lHi = 0),
      (this._Hi = !1),
      (this.i7i = void 0),
      (this.uHi = (e) => {
        this.TabComponent.SetCloseBtnShowState(e);
      }),
      (this.cHi = () => {
        this.TabComponent.SelectToggleByIndex(1);
      }),
      (this.mHi = () => {
        let e, t;
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
          this.lHi,
        ).GetQuality() > CANNOTLEVELSUBQUALITY &&
          (e = this.TabComponent.GetTabItemByIndex(1)) &&
          ((t = this.dHi()), e.SetToggleStateForce(t ? 0 : 2, !1));
      }),
      (this.CanToggleChange = (e) => {
        return (
          e !== 1 ||
          ((e = this.dHi()) ||
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "VisionIdentifyLock",
            ),
          e)
        );
      }),
      (this.dVe = (e, t) => {
        return new VisionTabItem_1.VisionTabItem();
      }),
      (this.SetOnUndeterminedClick = () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "VisionIdentifyLock",
        );
      }),
      (this.pqe = (e) => {
        const t = this.upt[e];
        const i = t.ChildViewName;
        var e = this.TabComponent.GetTabItemByIndex(e);
        const n = this.TabViewComponent.GetCurrentTabView();
        n && n.HideUiTabView(!1),
          this.TabViewComponent.ToggleCallBack(t, i, e, this.lHi),
          this.TabComponent.SetHelpButtonCallBack(this.CHi);
      }),
      (this.CHi = () => {
        HelpController_1.HelpController.OpenHelpById(VISION_INTENSIFY_HELPID);
      }),
      (this.yqe = (e) => {
        e = this.upt[e];
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
      this.dVe,
      this.pqe,
      this.yqe,
    );
    var e =
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
      this.uHi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PhantomLevelUp,
        this.mHi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnClickVisionIntensifyItemJump,
        this.cHi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshVisionIntensifyViewBackBtnState,
      this.uHi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PhantomLevelUp,
        this.mHi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnClickVisionIntensifyItemJump,
        this.cHi,
      );
  }
  dHi() {
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
      this.lHi,
    );
    const t = e.GetSubPropUnlockLevel(0);
    var e = e.GetPhantomLevel() >= t;
    return (
      e &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.VisionIntensifyTabOpen,
        ),
      e
    );
  }
  OnBeforePlayCloseSequence() {
    const e = this.TabViewComponent.GetCurrentTabView();
    e &&
      new UiSequencePlayer_1.UiSequencePlayer(e.GetRootItem()).PlaySequence(
        "Close",
      );
  }
  OnHandleLoadScene() {
    const e =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.lHi,
      );
    e &&
      ((this._Hi = !0),
      ControllerHolder_1.ControllerHolder.PhantomBattleController.SetMeshShow(
        e.GetConfigId(),
        void 0,
        this.i7i,
      ));
  }
  OnBeforeShow() {
    const e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
      this.Info.Name,
    );
    const t =
      (e.forEach((e) => {
        this.upt.push(e);
      }),
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
        this.lHi,
      ));
    const i = ModelManager_1.ModelManager.FunctionModel.IsOpen(10001004);
    let n = 0;
    n = t.GetQuality() <= CANNOTLEVELSUBQUALITY || !i ? 1 : e.length;
    this.TabComponent.RefreshTabItemByLength(n, () => {
      let e, t, i;
      for ([e, t] of this.TabComponent.GetTabItemMap())
        e === 1 &&
          ((i = this.dHi()),
          t.SetToggleStateForce(i ? 0 : 2, !1),
          t.SetCanClickWhenDisable(!0),
          t.SetOnUndeterminedClick(this.SetOnUndeterminedClick));
      this.TabComponent.SelectToggleByIndex(0, !0),
        this.TabViewComponent.SetCurrentTabViewState(!0),
        this.x6e(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshVisionIdentifyRedPoint,
          this.lHi,
        );
    });
  }
  x6e() {
    let e = this.upt.findIndex((e) => e.ChildViewName === "VisionIdentifyView");
    e > 0 &&
      (e = this.TabComponent.GetTabItemByIndex(e)) &&
      e.BindRedDot("IdentifyTab", this.lHi);
  }
  Dpt() {
    let e = this.upt.findIndex((e) => e.ChildViewName === "VisionIdentifyView");
    e > 0 && (e = this.TabComponent.GetTabItemByIndex(e)) && e.UnBindRedDot();
  }
  OnBeforeHide() {
    this.Dpt();
  }
  OnAfterHide() {
    const e = this.TabViewComponent.GetCurrentTabView();
    e && e.HideUiTabView(!1);
  }
  OnBeforeCreate() {
    (this.lHi = this.OpenParam),
      UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() ||
        (UiSceneManager_1.UiSceneManager.InitVisionSkeletalHandle(),
        (this._Hi = !0)),
      (this.i7i = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle());
  }
  OnBeforeDestroy() {
    this.TabViewComponent.DestroyTabViewComponent(),
      this.TabComponent.Destroy(),
      this._Hi &&
        (UiSceneManager_1.UiSceneManager.DestroyVisionSkeletalHandle(),
        (this.i7i = void 0));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    const t = Number(e[0]);
    const i = this.TabComponent.GetTabItemByIndex(
      this.upt.findIndex((e) => e.Id === t),
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
// # sourceMappingURL=VisionIntensifyView.js.map
