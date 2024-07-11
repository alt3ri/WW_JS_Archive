"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WaterMaskView = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
const Info_1 = require("../../../Core/Common/Info");
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
      this.CreateWaterMask,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetResolution,
        this.ResolutionChange,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BackLoginView,
        this.RemoveWaterMask,
      );
  }

  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      this.CreateWaterMask,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetResolution,
        this.ResolutionChange,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BackLoginView,
        this.RemoveWaterMask,
      );
  }
}
(exports.WaterMaskView = WaterMaskView),
  ((_a = WaterMaskView).ContainerActor = void 0),
  (WaterMaskView.Text = (() => {
    const stringRef = (0, puerts_1.$ref)(void 0);
    UE.KuroStaticLibrary.LoadFileToString(
      stringRef,
      `${UE.BlueprintPathsLibrary.ProjectSavedDir()}WaterMask.txt`,
    );
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
      UiLayerType_1.ELayerType.WaterMask,
    );
    const a =
      ((_a.ContainerActor = UE.KuroActorManager.SpawnActor(
        Info_1.Info.World,
        UE.UIContainerActor.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
        void 0,
      )),
      _a.ContainerActor.RootComponent);
    var e =
      (a.SetDisplayName("WaterMaskContainer"),
      UE.KuroStaticLibrary.SetActorPermanent(_a.ContainerActor, !0, !0),
      _a.ContainerActor.K2_AttachRootComponentTo(e),
      a.GetRootCanvas().GetOwner().RootComponent);
    const o = (e.widget.width % _a.ColSpace) / 2;
    const r = (e.widget.height % _a.RowSpace) / 2;
    const n = e.widget.width / 2;
    const i = e.widget.height / 2;
    const s = Math.ceil(e.widget.width / _a.ColSpace);
    const l = Math.ceil(e.widget.height / _a.RowSpace);
    var e = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    var e = new Date(e);
    const v = WaterMaskView.Text;
    for (let t = 0; t < s; t++) {
      for (let e = 0; e < l; e++) {
        const _ = UE.KuroActorManager.SpawnActor(
          Info_1.Info.World,
          UE.UITextActor.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
          void 0,
        );
        var m = _.RootComponent;
        var m =
          (_.K2_AttachRootComponentTo(a),
          m.SetDisplayName("WaterMaskText"),
          _.GetComponentByClass(UE.UIText.StaticClass()));
        m.SetFontSize(_a.FontSize),
          m.SetOverflowType(0),
          m.SetAlpha(_a.TextAlpha),
          m.SetFont(UE.LGUIFontData.GetDefaultFont()),
          m.SetText(v),
          m.SetUIRelativeLocation(
            new UE.Vector(t * _a.ColSpace - n + o, e * _a.RowSpace - i + r, 0),
          ),
          m.SetUIRelativeRotation(new UE.Rotator(0, _a.TextRotation, 0)),
          UE.KuroStaticLibrary.SetActorPermanent(_, !0, !0);
      }
    }
  }),
  (WaterMaskView.RemoveWaterMask = () => {
    void 0 !== _a.ContainerActor &&
      (_a.ContainerActor.K2_DestroyActor(), (_a.ContainerActor = void 0));
  }),
  (WaterMaskView.ResolutionChange = () => {
    _a.RemoveWaterMask(), _a.CreateWaterMask();
  });
// # sourceMappingURL=../../../../JavaScript_Sourcemap/Game/Module/WaterMask/WaterMaskController.js.map
