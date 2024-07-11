"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AndroidBackController = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const LguiUtil_1 = require("../Util/LguiUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class AndroidBackController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
        (this.IsLogOpen = !0),
      !0
    );
  }
  static OnAddEvents() {
    InputDistributeController_1.InputDistributeController.BindKey(
      InputMappingsDefine_1.keyMappings.AndroidBack,
      this.mHe,
    );
  }
  static OnRemoveEvents() {
    InputDistributeController_1.InputDistributeController.UnBindKey(
      InputMappingsDefine_1.keyMappings.AndroidBack,
      this.mHe,
    );
  }
  static dHe() {
    UiManager_1.UiManager.IsViewOpen("LoginView")
      ? (AndroidBackController.IsLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("AndroidBack", 11, "在登录界面"),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowExitGameConfirmBox())
      : UiManager_1.UiManager.IsViewOpen("BattleView")
        ? ModelManager_1.ModelManager.LoadingModel.IsLoading
          ? AndroidBackController.IsLogOpen &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("AndroidBack", 11, "loading界面打开")
          : (AndroidBackController.IsLogOpen &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "AndroidBack",
                11,
                "当前处于主界面并且不在loading界面",
              ),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowReturnLoginConfirmBox())
        : AndroidBackController.IsLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("AndroidBack", 11, "不在主界面");
  }
  static CHe(e) {
    const r =
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    r && r.SimulateClickButton(0, e.RootUIComp, e.ClickPivot);
  }
  static OnClear() {
    return UE.UIAndroidBackComponent.ClearAndroidBackComponent(), !0;
  }
  static GmTestAndroidBack() {
    let e, r;
    this.gHe
      ? this.fHe()
      : ((e = ResourceSystem_1.ResourceSystem.Load(
          "/Game/Aki/UI/UIResources/Common/Prefabs/UiItem_BackBtn1.UiItem_BackBtn1",
          UE.PrefabAsset,
        )),
        (this.gHe = UE.LGUIBPLibrary.LoadPrefabWithAsset(
          GlobalData_1.GlobalData.World,
          e,
          UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Debug),
        )),
        (e = this.gHe.GetComponentByClass(
          UE.UIItem.StaticClass(),
        )).SetDisplayName("GmTestAndroidBack"),
        e.SetAnchorAlign(2, 2),
        e.SetAnchorOffset(new UE.Vector2D(0, 0)),
        (e = this.gHe.GetComponentByClass(UE.UIButtonComponent.StaticClass())),
        (r = this.gHe.GetComponentByClass(
          UE.UIAndroidBackComponent.StaticClass(),
        )) && this.gHe.K2_DestroyComponent(r),
        e.OnClickCallBack.Bind(() => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("AndroidBack", 11, "安卓返回点击"),
            InputDistributeController_1.InputDistributeController.InputKey(
              InputMappingsDefine_1.keyMappings.AndroidBack,
              !0,
            ),
            InputDistributeController_1.InputDistributeController.InputKey(
              InputMappingsDefine_1.keyMappings.AndroidBack,
              !1,
            );
        }),
        LguiUtil_1.LguiUtil.SetActorIsPermanent(this.gHe, !0, !0));
  }
  static fHe() {
    this.gHe
      .GetComponentByClass(UE.UIButtonComponent.StaticClass())
      .OnClickCallBack.Unbind(),
      this.gHe.K2_DestroyActor(),
      (this.gHe = void 0);
  }
}
(exports.AndroidBackController = AndroidBackController),
  ((_a = AndroidBackController).IsLogOpen = !1),
  (AndroidBackController.mHe = (e, r) => {
    let i;
    r !== 0 &&
      (AndroidBackController.IsLogOpen &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("AndroidBack", 11, "安卓返回键触发"),
      UE.UIAndroidBackComponent.GetActiveAndroidBackComponentSize() <= 0
        ? _a.dHe()
        : ((r = UE.UIAndroidBackComponent.GetTopActiveAndroidBack()),
          AndroidBackController.IsLogOpen &&
            ((i = (0, puerts_1.$ref)("")),
            UE.LGUIBPLibrary.GetFullPathOfActor(
              GlobalData_1.GlobalData.World,
              r.GetOwner(),
              i,
            ),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info("AndroidBack", 11, "触发了关闭按钮", [
              "按钮的节点路径",
              (0, puerts_1.$unref)(i),
            ]),
          _a.CHe(r)));
  }),
  (AndroidBackController.gHe = void 0);
// # sourceMappingURL=AndroidBackController.js.map
