"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AndroidBackController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  LguiUtil_1 = require("../Util/LguiUtil");
class AndroidBackController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return Info_1.Info.IsMobilePlatform() && (this.IsLogOpen = !0), !0;
  }
  static OnAddEvents() {
    InputDistributeController_1.InputDistributeController.BindKey(
      InputMappingsDefine_1.keyMappings.AndroidBack,
      this.Tje,
    );
  }
  static OnRemoveEvents() {
    InputDistributeController_1.InputDistributeController.UnBindKey(
      InputMappingsDefine_1.keyMappings.AndroidBack,
      this.Tje,
    );
  }
  static Lje() {
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
  static Dje(e) {
    var r =
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    r && r.SimulateClickButton(0, e.RootUIComp, e.ClickPivot);
  }
  static OnClear() {
    return UE.UIAndroidBackComponent.ClearAndroidBackComponent(), !0;
  }
  static GmTestAndroidBack() {
    var e, r;
    this.Rje
      ? this.Uje()
      : ((e = ResourceSystem_1.ResourceSystem.Load(
          "/Game/Aki/UI/UIResources/Common/Prefabs/UiItem_BackBtn1.UiItem_BackBtn1",
          UE.PrefabAsset,
        )),
        (this.Rje = UE.LGUIBPLibrary.LoadPrefabWithAsset(
          GlobalData_1.GlobalData.World,
          e,
          UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Debug),
        )),
        (e = this.Rje.GetComponentByClass(
          UE.UIItem.StaticClass(),
        )).SetDisplayName("GmTestAndroidBack"),
        e.SetAnchorAlign(2, 2),
        e.SetAnchorOffset(new UE.Vector2D(0, 0)),
        (e = this.Rje.GetComponentByClass(UE.UIButtonComponent.StaticClass())),
        (r = this.Rje.GetComponentByClass(
          UE.UIAndroidBackComponent.StaticClass(),
        )) && this.Rje.K2_DestroyComponent(r),
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
        LguiUtil_1.LguiUtil.SetActorIsPermanent(this.Rje, !0, !0));
  }
  static Uje() {
    this.Rje.GetComponentByClass(
      UE.UIButtonComponent.StaticClass(),
    ).OnClickCallBack.Unbind(),
      this.Rje.K2_DestroyActor(),
      (this.Rje = void 0);
  }
}
(exports.AndroidBackController = AndroidBackController),
  ((_a = AndroidBackController).IsLogOpen = !1),
  (AndroidBackController.Tje = (e, r) => {
    var i;
    0 !== r &&
      (AndroidBackController.IsLogOpen &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("AndroidBack", 11, "安卓返回键触发"),
      UE.UIAndroidBackComponent.GetActiveAndroidBackComponentSize() <= 0
        ? _a.Lje()
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
          _a.Dje(r)));
  }),
  (AndroidBackController.Rje = void 0);
//# sourceMappingURL=AndroidBackController.js.map
