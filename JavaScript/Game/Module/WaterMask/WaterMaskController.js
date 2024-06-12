"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WaterMaskView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  Info_1 = require("../../../Core/Common/Info");
class WaterMaskView extends UiControllerBase_1.UiControllerBase {
  static Init() {
    return super.Init();
  }
  static OnClear() {
    return super.Clear(), !0;
  }
  static CanOpenView() {
    return !1;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      this.CreateWaterMask
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetResolution,
        this.ResolutionChange
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BackLoginView,
        this.RemoveWaterMask
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      this.CreateWaterMask
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetResolution,
        this.ResolutionChange
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BackLoginView,
        this.RemoveWaterMask
      );
  }
}
(exports.WaterMaskView = WaterMaskView),
  ((_a = WaterMaskView).ContainerActor = void 0),
  (WaterMaskView.Text = (() => {
    var stringRef = (0, puerts_1.$ref)(void 0);
    UE.KuroStaticLibrary.LoadFileToString(stringRef, `${UE.BlueprintPathsLibrary.ProjectSavedDir()}WaterMask.txt`);
    return (0, puerts_1.$unref)(stringRef);
  })()),
  (WaterMaskView.ColSpace = 400),
  (WaterMaskView.RowSpace = 400),
  (WaterMaskView.TextRotation = 30),
  (WaterMaskView.TextAlpha = 0.02),
  (WaterMaskView.FontSize = 40),
  (WaterMaskView.CreateWaterMask = () => {
    void 0 !== _a.ContainerActor && _a.RemoveWaterMask();
    var e = UiLayer_1.UiLayer.GetLayerRootUiItem(
        UiLayerType_1.ELayerType.WaterMask
      ),
      a =
        ((_a.ContainerActor = UE.KuroActorManager.SpawnActor(
          Info_1.Info.World,
          UE.UIContainerActor.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
          void 0
        )),
        _a.ContainerActor.RootComponent),
      e =
        (a.SetDisplayName("WaterMaskContainer"),
        UE.KuroStaticLibrary.SetActorPermanent(_a.ContainerActor, !0, !0),
        _a.ContainerActor.K2_AttachRootComponentTo(e),
        a.GetRootCanvas().GetOwner().RootComponent),
      o = (e.widget.width % _a.ColSpace) / 2,
      r = (e.widget.height % _a.RowSpace) / 2,
      n = e.widget.width / 2,
      i = e.widget.height / 2,
      s = Math.ceil(e.widget.width / _a.ColSpace),
      l = Math.ceil(e.widget.height / _a.RowSpace),
      e = TimeUtil_1.TimeUtil.GetServerTimeStamp(),
      e = new Date(e),
      v = WaterMaskView.Text;
    for (let t = 0; t < s; t++)
      for (let e = 0; e < l; e++) {
        var _ = UE.KuroActorManager.SpawnActor(
            Info_1.Info.World,
            UE.UITextActor.StaticClass(),
            MathUtils_1.MathUtils.DefaultTransform,
            void 0
          ),
          m = _.RootComponent,
          m =
            (_.K2_AttachRootComponentTo(a),
            m.SetDisplayName("WaterMaskText"),
            _.GetComponentByClass(UE.UIText.StaticClass()));
        m.SetFontSize(_a.FontSize),
          m.SetOverflowType(0),
          m.SetAlpha(_a.TextAlpha),
          m.SetFont(UE.LGUIFontData.GetDefaultFont()),
          m.SetText(v),
          m.SetUIRelativeLocation(
            new UE.Vector(t * _a.ColSpace - n + o, e * _a.RowSpace - i + r, 0)
          ),
          m.SetUIRelativeRotation(new UE.Rotator(0, _a.TextRotation, 0)),
          UE.KuroStaticLibrary.SetActorPermanent(_, !0, !0);
      }
  }),
  (WaterMaskView.RemoveWaterMask = () => {
    void 0 !== _a.ContainerActor &&
      (_a.ContainerActor.K2_DestroyActor(), (_a.ContainerActor = void 0));
  }),
  (WaterMaskView.ResolutionChange = () => {
    _a.RemoveWaterMask(), _a.CreateWaterMask();
  });
//# sourceMappingURL=../../../../JavaScript_Sourcemap/Game/Module/WaterMask/WaterMaskController.js.map
