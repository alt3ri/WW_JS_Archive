"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkRewardViewLimit = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  ActivityWeaponDescribeComponent_1 = require("../../Activity/ActivityContent/UniversalComponents/ActivityWeaponDescribeComponent"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData"),
  DreamLinkController_1 = require("../DreamLinkController"),
  DreamLinkWeaponModelHandle_1 = require("../DreamLinkWeaponModelHandle"),
  DreamLinkRewardLimitTimeItem_1 = require("./SubView/DreamLinkRewardLimitTimeItem"),
  DreamLinkRewardSpecialItem_1 = require("./SubView/DreamLinkRewardSpecialItem");
class DreamLinkRewardViewLimit extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.boh = void 0),
      (this.Ntl = !0),
      (this.Ftl = ""),
      (this.Ivt = void 0),
      (this.qoh = void 0),
      (this.Cua = 0),
      (this.pcl = void 0),
      (this.fcl = void 0),
      (this.$pt = void 0),
      (this.b2t = void 0),
      (this.AHt = void 0),
      (this.vcl = void 0),
      (this.Ngl = void 0),
      (this.TTi = () => {
        this.Mcl(this.Cua), this.v4e(this.Cua), this.pcl.Refresh();
      }),
      (this.jdi = (e, i) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.Wdi = (e) => {
        this.v4e(e);
      }),
      (this.yqe = (e) => {
        var [e, i] = this.boh.GetTypeInfoByTabId(e + 1);
        return new CommonTabData_1.CommonTabData(
          i,
          new CommonTabTitleData_1.CommonTabTitleData(e),
        );
      }),
      (this.VOe = () => {
        return new DreamLinkRewardLimitTimeItem_1.DreamLinkRewardLimitTimeItem();
      }),
      (this.Vtl = () => {
        var e;
        this.Ntl &&
          ((e = this.boh.GetLimitTimeEndTime()) -
            TimeUtil_1.TimeUtil.GetServerTime() <
          0
            ? ((this.Ntl = !1),
              ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView())
            : ((e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(
                e,
                this.Ftl,
              )),
              this.GetText(2).SetText(e)));
      }),
      (this.Fgl = () => {
        var e = UE.KuroCollectActorComponent.GetActorWithTag(
            FNameUtil_1.FNameUtil.GetDynamicFName("WeaponRoot"),
            1,
          ),
          e =
            ((this.Ngl =
              new DreamLinkWeaponModelHandle_1.DreamLinkWeaponModelHandle(e)),
            CommonParamById_1.configCommonParamById.GetIntConfig(
              "DreamLinkModelRotateTime",
            ));
        this.Ngl.SetRotateParam(e), this.Ngl.StartRotate();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.boh =
      DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    var e = [],
      i =
        ((this.qoh = new GenericScrollViewNew_1.GenericScrollViewNew(
          this.GetScrollViewWithScrollbar(1),
          this.VOe,
        )),
        new CommonTabComponentData_1.CommonTabComponentData(
          this.jdi,
          this.Wdi,
          this.yqe,
        )),
      i =
        ((this.Ivt =
          new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
            this.GetItem(0),
            i,
            () => {
              this.CloseMe();
            },
          )),
        this.ICi()),
      i =
        (e.push(this.Ivt.RefreshTabItemAsync(i)),
        this.boh.GetLimitTimeRewardListByTabId(5));
    (this.pcl = new DreamLinkRewardSpecialItem_1.DreamLinkRewardSpecialItem(
      i[0],
    )),
      e.push(this.pcl.CreateByActorAsync(this.GetItem(3).GetOwner())),
      this.AddChild(this.pcl),
      (this.fcl =
        new ActivityWeaponDescribeComponent_1.ActivityWeaponDescribeComponent()),
      e.push(this.fcl.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())),
      await Promise.all(e);
    for (let e = 0; e < this.boh.GetLimitTimeRewardTypeLength(); e++)
      this.Mcl(e);
    this.Ivt.SelectToggleByIndex(0, !0);
  }
  OnStart() {
    this.Ftl = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      "ActivityRemainingTime",
    );
    var e = this.boh.GetPreviewWeaponId(),
      i = new WeaponTrialData_1.WeaponTrialData();
    i.SetTrialId(e),
      this.fcl.Refresh(i.GetItemId(), !1),
      this.fcl.SetLookButtonVisible(!0),
      this.fcl.BindWeaponPreviewFunction([e]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.DreamLinkLimitRewardRefresh,
      this.TTi,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.DreamLinkLimitRewardRefresh,
      this.TTi,
    );
  }
  OnTick(e) {
    this.Vtl(), this.Ngl?.Tick(e);
  }
  OnHandleLoadScene() {
    (this.AHt = ModelManager_1.ModelManager.CameraModel.CurrentCameraActor),
      (this.vcl = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("DoorCamera"),
        1,
      )),
      ControllerHolder_1.ControllerHolder.CameraController.SetViewTarget(
        this.vcl,
        "DreamLinkRewardViewLimit.OpenAndStartSequence",
      );
    for (const t of [
      UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("Weapon1"),
        1,
      ),
      UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("Weapon2"),
        1,
      ),
    ]) {
      var e = t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
      e.SetTickableWhenPaused(!0), e.SetForcedLOD(1);
    }
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      "Sequence_DreamLinkRewardStart",
    );
    this.PlaySceneLevelSequence(i, this.Fgl);
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.CameraController.SetViewTarget(
      this.AHt,
      "DreamLinkRewardViewLimit.OnBeforeDestroy",
    ),
      (this.AHt = void 0),
      (this.vcl = void 0),
      this.b2t?.IsValid() && (this.b2t?.K2_DestroyActor(), (this.b2t = void 0)),
      this.$pt?.IsValid() && (this.$pt?.Stop(), (this.$pt = void 0)),
      this.Ngl?.StopRotate(),
      this.Ngl?.Destroy();
  }
  ICi() {
    return this.Ivt.CreateTabItemDataByLength(
      this.boh.GetLimitTimeRewardTypeLength(),
    );
  }
  Mcl(e) {
    var i = e + 1;
    this.Ivt.GetTabItemByIndex(e).SetRedDotState(
      this.boh.CheckHasLimitTimeTabReward(i),
    );
  }
  async v4e(e) {
    this.Cua = e;
    e = this.boh.GetLimitTimeRewardListByTabId(e + 1);
    await this.qoh.RefreshByDataAsync(e, !0);
  }
  PlaySceneLevelSequence(e, r) {
    this.$pt && (this.$pt.Stop(), (this.$pt = void 0)),
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LevelSequence, (e) => {
        var i, t;
        ObjectUtils_1.ObjectUtils.IsValid(e) &&
          ((i = ActorSystem_1.ActorSystem.Spawn(
            UE.LevelSequenceActor.StaticClass(),
            new UE.TransformDouble(),
            void 0,
          )).SetSequence(e),
          ((t = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState =
            !1),
          (t.bPauseAtEnd = !0),
          (i.PlaybackSettings = t),
          i.SetTickableWhenPaused(!0),
          UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(e, !0),
          (this.b2t = i),
          (this.$pt = i.SequencePlayer),
          (this.b2t.bOverrideInstanceData = !0),
          (t = this.b2t.DefaultInstanceData),
          (e = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(
            RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform(),
          )),
          (t.TransformOrigin = e),
          this.$pt.PlayTo(
            new UE.MovieSceneSequencePlaybackParams(
              this.$pt.GetEndTime().Time,
              0,
              "A",
              2,
              0,
            ),
          ),
          r?.());
      });
  }
}
exports.DreamLinkRewardViewLimit = DreamLinkRewardViewLimit;
//# sourceMappingURL=DreamLinkRewardViewLimit.js.map
