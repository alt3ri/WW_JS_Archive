"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaScanView =
    exports.SCENE_ROLE_TAG =
    exports.SCENE_CAMERA_TAG =
      void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ShareRewardById_1 = require("../../../../Core/Define/ConfigQuery/ShareRewardById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController");
const UiManager_1 = require("../../../Ui/UiManager");
const ChannelController_1 = require("../../Channel/ChannelController");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const ShareRewardInfo_1 = require("../../Photograph/View/ShareRewardInfo");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../UiModel/UiModelUtil");
const SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GachaDefine_1 = require("../GachaDefine");
const GachaSceneView_1 = require("../GachaUiSceneManager/GachaSceneView");
(exports.SCENE_CAMERA_TAG = new UE.FName("SequenceCamera")),
  (exports.SCENE_ROLE_TAG = new UE.FName("Role"));
class GachaScanView extends GachaSceneView_1.GachaSceneView {
  constructor() {
    super(...arguments),
      (this.GachaResult = void 0),
      (this.CurIndex = 0),
      (this.LastIndex = -1),
      (this.xjt = void 0),
      (this.Jjt = void 0),
      (this.EPe = void 0),
      (this.zjt = void 0),
      (this.Zjt = void 0),
      (this.Bkt = void 0),
      (this.eWt = void 0),
      (this.tWt = void 0),
      (this.iWt = void 0),
      (this.oWt = void 0),
      (this.exe = void 0),
      (this.$be = void 0),
      (this.Njt = void 0),
      (this.rWt = 0),
      (this.nWt = 0),
      (this.sWt = 0),
      (this.aWt = 0),
      (this.hWt = void 0),
      (this.lWt = 0),
      (this._Wt = !1),
      (this.uWt = void 0),
      (this.cWt = void 0),
      (this.mWt = 190),
      (this.dWt = 190),
      (this.CWt = !1),
      (this.gWt = void 0),
      (this.Ojt = () => {
        let i;
        let e =
          this.lWt >= 5 && ChannelController_1.ChannelController.CouldShare();
        this.GetItem(18)?.SetUIActive(e),
          e &&
            ((e = ShareRewardById_1.configShareRewardById.GetConfig(
              ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(
                this.fWt().u5n.G3n,
              ) === 2
                ? 4
                : 3,
            )),
            (i = ModelManager_1.ModelManager.ChannelModel.CouldGetShareReward(
              e.Id,
            )),
            this.GetItem(20)?.SetUIActive(i),
            i) &&
            ((i = [...e.ShareReward][0]), this.Njt?.SetItemInfo(i[0], i[1]));
      }),
      (this.pWt = () => {
        ChannelController_1.ChannelController.ShareGacha([this.fWt()]);
      }),
      (this.vWt = () => {
        (this._Wt = !0), this.AddIndex();
      }),
      (this.kjt = () => {
        this.CWt && this.AddIndex();
      }),
      (this.MWt = void 0),
      (this.SWt = void 0),
      (this.OnSequenceEventByStringParam = (i) => {
        const e = this.MWt;
        const t = this.SWt;
        const s = e.Model;
        const h = t.Model;
        switch (i) {
          case "Flash1":
            this.eWt.NiagaraComponent.ReinitializeSystem();
            break;
          case "Flash2":
            AudioSystem_1.AudioSystem.PostEvent("ui_gacha_scan_burst"),
              this.lWt === 5
                ? (this.tWt.SetActorHiddenInGame(!1),
                  this.tWt?.NiagaraComponent.ReinitializeSystem())
                : this.lWt === 4
                  ? (this.iWt.SetActorHiddenInGame(!1),
                    this.iWt?.NiagaraComponent.ReinitializeSystem())
                  : this.lWt === 3 &&
                    (this.oWt.SetActorHiddenInGame(!1),
                    this.oWt?.NiagaraComponent.ReinitializeSystem());
            break;
          case "WeaponDA":
            (this.rWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
              s,
              "GachaMaterialController",
            )),
              (this.nWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
                h,
                "GachaMaterialController",
              ));
            break;
          case "WeaponEffect":
            this.lWt === 5
              ? ((this.sWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
                  s,
                  "GachaBurstGoldController",
                )),
                (this.aWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
                  h,
                  "GachaBurstGoldController",
                )))
              : this.lWt === 4
                ? ((this.sWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
                    s,
                    "GachaBurstPurpleController",
                  )),
                  (this.aWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
                    h,
                    "GachaBurstPurpleController",
                  )))
                : this.lWt === 3 &&
                  ((this.sWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
                    s,
                    "GachaBurstWhiteController",
                  )),
                  (this.aWt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
                    h,
                    "GachaBurstWhiteController",
                  )));
            break;
          case "RemoveWeaponDA":
            UiModelUtil_1.UiModelUtil.RemoveRenderingMaterial(s, this.rWt),
              UiModelUtil_1.UiModelUtil.RemoveRenderingMaterial(h, this.nWt),
              UiModelUtil_1.UiModelUtil.RemoveRenderingMaterial(s, this.sWt),
              UiModelUtil_1.UiModelUtil.RemoveRenderingMaterial(h, this.aWt);
        }
      });
  }
  fWt() {
    return this.GachaResult[this.CurIndex];
  }
  EWt() {
    if (!(this.LastIndex < 0)) return this.GachaResult[this.LastIndex];
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UITexture],
      [5, UE.UITexture],
      [6, UE.UIHorizontalLayout],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UITexture],
      [16, UE.UIText],
      [18, UE.UIItem],
      [19, UE.UIButtonComponent],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.vWt],
        [1, this.kjt],
        [19, this.pWt],
      ]);
  }
  async OnBeforeStartAsync() {
    let i = this.OpenParam;
    if (void 0 !== i && i.SkipOnLoadResourceFinish) {
      const e = [];
      for (const t of ModelManager_1.ModelManager.GachaModel.CurGachaResult)
        e.push(t.u5n.G3n);
      await ModelManager_1.ModelManager.GachaModel.PreloadGachaSequence(e);
    }
    (this.Njt = new ShareRewardInfo_1.ShareRewardInfo()),
      await this.Njt.OnlyCreateByActorAsync(this.GetItem(21).GetOwner()),
      this.AddChild(this.Njt),
      (this.GachaResult =
        ModelManager_1.ModelManager.GachaModel.CurGachaResult),
      this.GachaResult || (this.GachaResult = []),
      this.GetItem(12).SetUIActive(!1),
      void 0 !==
        this.GachaResult.find((i) => {
          i = i.u5n?.G3n ?? 0;
          return (
            ModelManager_1.ModelManager.GachaModel.GetGachaQuality(i) === 5
          );
        }) &&
        ((i = (
          await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
            "UiItem_FiveStar",
            this.GetItem(12),
          )
        ).GetComponentByClass(UE.UIItem.StaticClass())),
        (this.zjt = new LevelSequencePlayer_1.LevelSequencePlayer(i)),
        this.zjt.BindSequenceCloseEvent(() => {
          this.GetItem(12).SetUIActive(!1), this.AfterFiveStarAnimation();
        })),
      (this.gWt = CameraController_1.CameraController.Model.CurrentCameraActor);
  }
  OnAfterOpenUiScene() {
    (this.exe = UE.KuroCollectActorComponent.GetActorWithTag(
      FNameUtil_1.FNameUtil.GetDynamicFName("SceneCamera1"),
      0,
    )),
      (this.eWt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("Flash1"),
        0,
      )),
      (this.tWt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("BurstGold"),
        0,
      )),
      (this.iWt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("BurstPurple"),
        0,
      )),
      (this.oWt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("BurstWhite"),
        0,
      )),
      (this.hWt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("UpdateInteractBP"),
        0,
      )),
      this.hWt.SetTickableWhenPaused(!0),
      this.eWt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1),
      this.tWt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1),
      this.iWt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1),
      this.oWt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1);
    const i = new UE.Vector(200, 0, 0);
    const e = new UE.Vector(60, 0, 0);
    const t = new UE.Rotator(0, 90, 0);
    this.eWt.K2_SetActorRelativeLocation(e, !1, void 0, !1),
      this.tWt.K2_SetActorRelativeLocation(i, !1, void 0, !1),
      this.iWt.K2_SetActorRelativeLocation(i, !1, void 0, !1),
      this.oWt.K2_SetActorRelativeLocation(i, !1, void 0, !1),
      this.eWt.K2_SetActorRelativeRotation(t, !1, void 0, !1),
      this.tWt.K2_SetActorRelativeRotation(t, !1, void 0, !1),
      this.iWt.K2_SetActorRelativeRotation(t, !1, void 0, !1),
      this.oWt.K2_SetActorRelativeRotation(t, !1, void 0, !1);
  }
  yWt() {
    this.tWt?.SetActorHiddenInGame(!0),
      this.iWt?.SetActorHiddenInGame(!0),
      this.oWt?.SetActorHiddenInGame(!0),
      this.tWt?.NiagaraComponent?.Deactivate(),
      this.iWt?.NiagaraComponent?.Deactivate(),
      this.oWt?.NiagaraComponent?.Deactivate();
  }
  IWt() {
    (this.xjt = new SmallItemGrid_1.SmallItemGrid()),
      this.xjt.Initialize(this.GetItem(8).GetOwner()),
      (this.Jjt = new SmallItemGrid_1.SmallItemGrid()),
      this.Jjt.Initialize(this.GetItem(10).GetOwner());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlaySequenceEventByStringParam,
      this.OnSequenceEventByStringParam,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFirstShare,
        this.Ojt,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlaySequenceEventByStringParam,
      this.OnSequenceEventByStringParam,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFirstShare,
        this.Ojt,
      );
  }
  Refresh() {
    this.yWt();
    let i = this.fWt().u5n?.G3n ?? 0;
    i <= 0
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Gacha", 44, "抽卡获得物品为空")
      : ((i = ModelManager_1.ModelManager.GachaModel.GetGachaQuality(i)) === 3
          ? AudioSystem_1.AudioSystem.SetState("ui_gacha_quality", "normal")
          : i === 4
            ? AudioSystem_1.AudioSystem.SetState("ui_gacha_quality", "purple")
            : i === 5 &&
              AudioSystem_1.AudioSystem.SetState("ui_gacha_quality", "golden"),
        AudioSystem_1.AudioSystem.PostEvent("ui_gacha_scan_next"),
        i === 5
          ? (this.GetItem(12).SetUIActive(!0),
            this.zjt?.PlayLevelSequenceByName("Start", !0))
          : this.AfterFiveStarAnimation());
  }
  AfterFiveStarAnimation() {
    this.RefreshView(), this.RefreshModel();
  }
  RefreshView() {
    const i = this.fWt();
    var e = i.u5n.G3n;
    let t = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(i.u5n.G3n);
    let s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    let h = 0;
    this.Zjt?.StopSequenceByKey("Show"),
      this.Zjt?.StopSequenceByKey("ConvertShow"),
      this.GetItem(13).SetAlpha(0),
      this.GetItem(22).SetAlpha(0),
      t === 1
        ? (this.GetItem(3).SetUIActive(!0),
          (t = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(e)),
          (h = t.QualityId),
          (e = t.ElementId),
          (e =
            ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e)) &&
            (this.GetTexture(5).SetColor(UE.Color.FromHex(e.ElementColor)),
            (r = this.GetTexture(4)),
            this.SetTextureByPath(e.Icon, r),
            (e = UE.Color.FromHex(e.ElementColor)),
            r.SetColor(e)),
          this.GetText(2).ShowTextNew(t.Name))
        : (this.GetItem(3).SetUIActive(!1),
          (h = s.QualityId),
          this.GetText(2).ShowTextNew(s.Name));
    var r = h === 5 || (h === 4 && i.IsNew);
    var e =
      (this.GetButton(0).RootUIComp.SetUIActive(!r),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Gacha",
          35,
          "星星刷新:",
          ["qualityId", h],
          ["LayoutDisplayCount", this.$be.GetDisplayCount()],
          ["LayoutItemList", this.$be.GetItemList()?.length],
        ),
      this.$be.RebuildLayout(h),
      i.v5n);
    if (
      (this.GetItem(11)?.SetUIActive(i.IsNew),
      this.GetItem(7).SetUIActive(!!e && e?.length > 0),
      i.v5n && i.v5n?.length > 0)
    ) {
      this.xjt.SetActive(!0);
      const a = i.v5n[0];
      t = {
        Type: 4,
        ItemConfigId: a.G3n,
        BottomText: a.g5n.toString(),
        Data: void 0,
      };
      this.xjt.Apply(t),
        this.xjt.BindOnCanExecuteChange(() => !1),
        this.xjt.BindOnExtendToggleRelease(() => {
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
            a.G3n,
          );
        });
    } else this.xjt.SetActive(!1);
    s = i.p5n;
    if (
      (this.GetItem(9).SetUIActive((s?.length ?? 0) > 0), s && s?.length > 0)
    ) {
      this.Jjt.SetActive(!0);
      const o = s[0];
      r = {
        Type: 4,
        ItemConfigId: o.G3n,
        BottomText: o.g5n.toString(),
        Data: void 0,
      };
      this.Jjt.Apply(r),
        this.Jjt.BindOnCanExecuteChange(() => !1),
        this.Jjt.BindOnExtendToggleRelease(() => {
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
            o.G3n,
          );
        }),
        this.Zjt.PlayLevelSequenceByName("ConvertShow", !1);
    } else this.Jjt.SetActive(!1);
    (s?.length ?? 0) > 1 &&
      ((e = s[1]), Log_1.Log.CheckError()) &&
      Log_1.Log.Error(
        "Gacha",
        9,
        "转换奖励只能有一个!, 请检查配置表",
        ["itemId", e.G3n],
        ["itemCount", e.g5n],
      );
    t = i.M5n;
    t && t.G3n > 0 && t.g5n > 0
      ? (this.GetItem(14).SetUIActive(!0),
        this.SetItemIcon(this.GetTexture(15), t.G3n),
        this.GetText(16)?.SetText(t.g5n.toString()))
      : this.GetItem(14).SetUIActive(!1),
      this.Ojt();
  }
  RefreshModel() {
    var i = this.EWt();
    if (i) {
      i = i.u5n.G3n;
      switch (ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(i)) {
        case 1:
          this.TWt();
          break;
        case 2:
          this.LWt();
      }
    }
    i = this.fWt();
    if (i) {
      const t = i.u5n.G3n;
      var i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(t);
      var s =
        ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(
          i.ShowSequence,
        );
      const h = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(t);
      var s = ModelManager_1.ModelManager.GachaModel.GetLoadedSequence(
        s.SequencePath,
      );
      let r =
        (this.DWt(),
        CameraController_1.CameraController.SetViewTarget(
          this.exe,
          "GachaScanView.RefreshModel",
        ),
        new UE.MovieSceneSequencePlaybackSettings());
      const a =
        ((r.bRestoreState = !0),
        (r.bPauseAtEnd = !0),
        (this.Bkt = ActorSystem_1.ActorSystem.Spawn(
          UE.LevelSequenceActor.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
          void 0,
        )),
        (this.Bkt.PlaybackSettings = r),
        (this.EPe = this.Bkt.SequencePlayer),
        this.Bkt.SetSequence(s),
        this.Bkt.SetTickableWhenPaused(!0),
        this.Bkt.AddBindingByTag(exports.SCENE_CAMERA_TAG, this.exe, !1, !0),
        RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow
          ? i.BindPoint?.length > 0
            ? ((this.Bkt.bOverrideInstanceData = !0),
              (this.Bkt.DefaultInstanceData.TransformOriginActor =
                UE.KuroCollectActorComponent.GetActorWithTag(
                  FNameUtil_1.FNameUtil.GetDynamicFName(i.BindPoint),
                  1,
                )))
            : ((this.Bkt.bOverrideInstanceData = !0),
              (r = this.Bkt.DefaultInstanceData),
              (s = UE.KuroCollectActorComponent.GetActorWithTag(
                FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"),
                1,
              )),
              (r.TransformOrigin = s.GetTransform()))
          : i.BindPoint?.length > 0 &&
            ((this.Bkt.bOverrideInstanceData = !0),
            (this.Bkt.DefaultInstanceData.TransformOriginActor =
              UE.KuroCollectActorComponent.GetActorWithTag(
                FNameUtil_1.FNameUtil.GetDynamicFName(i.BindPoint),
                1,
              ))),
        this.Bkt.GetBindingByTagInTemplate(exports.SCENE_ROLE_TAG, !0));
      const o = a.Num();
      for (let i = 0; i < o; i++) {
        const n = a.Get(i);
        if (n) {
          const l = n.K2_GetComponentsByClass(
            UE.SkeletalMeshComponent.StaticClass(),
          );
          const _ = l.Num();
          for (let i = 0; i < _; i++) {
            const d = l.Get(i);
            d && d.SetTickableWhenPaused(!0);
          }
        }
      }
      (this.CWt = !1),
        h === 1
          ? (this.EPe.OnPause.Add(() => {
              this.CWt = !0;
            }),
            (r = this.EPe.GetStartTime().Time),
            this.EPe.PlayTo(
              new UE.MovieSceneSequencePlaybackParams(r, 0, "A", 2, 0),
            ))
          : (this.EPe.OnFinished.Add(() => {
              this.CWt = !0;
            }),
            this.EPe.Play()),
        this.cWt &&
          (TimerSystem_1.TimerSystem.Remove(this.cWt), (this.cWt = void 0));
      let e = 120;
      switch (h) {
        case 1:
          (this.lWt =
            ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
              t,
            ).QualityId),
            (e = this.mWt),
            this.RWt();
          break;
        case 2:
          this.UWt(t),
            (this.lWt =
              ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
                t,
              )?.QualityId),
            (e = this.dWt);
      }
      this.Zjt.StopSequenceByKey("Show"),
        (this.cWt = TimerSystem_1.TimerSystem.Forever(() => {
          const i = this.EPe.GetCurrentTime().Time.FrameNumber.Value;
          this.EPe.GetEndTime().Time.FrameNumber.Value - i < e &&
            (this.Zjt.PlayLevelSequenceByName("Show", !1),
            TimerSystem_1.TimerSystem.Remove(this.cWt),
            (this.cWt = void 0));
        }, 100));
    }
  }
  LWt() {
    const i = this.MWt?.Model;
    const e = this.SWt?.Model;
    i && UiModelUtil_1.UiModelUtil.SetVisible(i, !1),
      e && UiModelUtil_1.UiModelUtil.SetVisible(e, !1);
  }
  RWt() {
    var i = this.fWt().u5n.G3n;
    var i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(i);
    i.Id === 1302
      ? this.hWt?.Yinlin()
      : i.Id === 1404
        ? this.hWt?.Jiyan()
        : i.Id === 1203
          ? this.hWt?.Anke()
          : i.Id === 1503
            ? this.hWt?.Jueyuan()
            : i.Id === 1301
              ? this.hWt?.Kakaluo()
              : i.Id === 1603
                ? this.hWt?.Chun()
                : i.Id === 1104
                  ? this.hWt?.Awu()
                  : i.QualityId === 5
                    ? this.hWt?.CharacterGolden()
                    : this.hWt?.UpdateGachaShowItem(i.Id);
  }
  TWt() {
    this.DWt();
  }
  DWt() {
    this.EPe && (this.EPe.OnStop.Clear(), this.EPe.Stop(), (this.EPe = void 0)),
      this.Bkt?.IsValid() &&
        (this.Bkt.ResetBindings(),
        (this.Bkt.bOverrideInstanceData = !1),
        (this.Bkt.DefaultInstanceData.TransformOriginActor = void 0),
        (this.Bkt = void 0));
  }
  UWt(i) {
    ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(i) === 2 &&
      this.YHt(i);
  }
  YHt(i) {
    let e = this.MWt;
    if (e) {
      const t =
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(i);
      let s = DataTableUtil_1.DataTableUtil.GetDataTableRow(
        this.uWt,
        i.toString(),
      );
      s =
        s ||
        ConfigManager_1.ConfigManager.GachaConfig.GetGachaWeaponTransformConfig(
          t.WeaponType,
        );
      const h = e.Model;
      i = h.CheckGetComponent(2);
      const r = h.CheckGetComponent(1);
      i?.LoadModelByModelId(t.ModelId, !1, () => {
        s.ShowScabbard || UiModelUtil_1.UiModelUtil.SetVisible(h, !0);
        var i = UE.KuroCollectActorComponent.GetActorWithTag(
          FNameUtil_1.FNameUtil.GetDynamicFName(
            GachaDefine_1.GACHA_WEAPON_CASE,
          ),
          1,
        );
        var i =
          (r.Actor?.K2_AttachToActor(i, void 0, 2, 2, 2, !1),
          Transform_1.Transform.Create());
        var e = s.Rotation;
        var e = Rotator_1.Rotator.Create(e.Y, e.Z, e.X);
        var t = s.Size;
        var t = Vector_1.Vector.Create(t, t, t);
        var e =
          (i.SetLocation(s.Location),
          i.SetRotation(e.Quaternion()),
          i.SetScale3D(t.ToUeVector()),
          r.MainMeshComponent?.K2_SetRelativeTransform(
            i.ToUeTransform(),
            !1,
            void 0,
            !1,
          ),
          h.CheckGetComponent(9));
        var t =
          (e?.SetRotateParam(s.RotateTime, 1, !0),
          new UE.Rotator(s.AxisRotate.Y, s.AxisRotate.Z, s.AxisRotate.X));
        r?.Actor?.K2_SetActorRotation(t, !1), e?.StartRotate();
      }),
        t.QualityId === 5
          ? this.hWt?.WeaponGolden()
          : t.QualityId === 4
            ? this.hWt?.WeaponPurple()
            : t.QualityId === 3 && this.hWt?.WeaponNormal();
      const a = this.SWt.Model;
      e = t.Models;
      s.ShowScabbard && e.length > 1
        ? ((i = e[1]),
          a.CheckGetComponent(2)?.LoadModelByModelId(i, !1, () => {
            const i = a.CheckGetComponent(1);
            const e =
              (i.Actor.K2_AttachToActor(r?.Actor, void 0, 2, 1, 1, !1),
              Transform_1.Transform.Create());
            e.SetLocation(s.ScabbardOffset),
              i?.MainMeshComponent?.K2_SetRelativeTransform(
                e.ToUeTransform(),
                !1,
                void 0,
                !1,
              ),
              UiModelUtil_1.UiModelUtil.SetVisible(a, !0);
          }))
        : UiModelUtil_1.UiModelUtil.SetVisible(a, !1);
    }
  }
  AddIndex() {
    if (this.CurIndex >= this.GachaResult.length - 1) this.Finish();
    else {
      if (this._Wt) {
        const i = this.AWt();
        if (!(i > 0)) return void this.Finish();
        (this.LastIndex = this.CurIndex), (this.CurIndex = i);
      } else (this.LastIndex = this.CurIndex), this.CurIndex++;
      this.Refresh();
    }
  }
  AWt() {
    for (let i = this.CurIndex + 1; i < this.GachaResult.length; i++) {
      const e = this.GachaResult[i];
      var t = e.u5n.G3n;
      var t = ModelManager_1.ModelManager.GachaModel.GetGachaQuality(t);
      if (t === 5 || (t >= 4 && e.IsNew)) return i;
    }
    return -1;
  }
  Finish() {
    (ModelManager_1.ModelManager.GachaModel.CanCloseView = !0),
      UiManager_1.UiManager.OpenView("GachaResultView", this.OpenParam, () => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (ModelManager_1.ModelManager.GachaModel.CanCloseView = !1);
  }
  OnBeforeShow() {
    super.OnBeforeShow(),
      UiSceneManager_1.UiSceneManager.InitGachaItemObserver(),
      (this.MWt = UiSceneManager_1.UiSceneManager.GetGachaItemObserver()),
      (this.SWt = UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver());
    var i = UE.KuroCollectActorComponent.GetActorWithTag(
      FNameUtil_1.FNameUtil.GetDynamicFName("GachaBP"),
      0,
    );
    var i =
      (i?.IsSkip || i.WhiteScreenOff(),
      (this.uWt = ResourceSystem_1.ResourceSystem.SyncLoad(
        "/Game/Aki/Data/GaCha/GachaWeaponTransform.GachaWeaponTransform",
        UE.DataTable,
      )),
      this.IWt(),
      this.OpenParam);
    (this._Wt = i && i.IsOnlyShowGold),
      this._Wt
        ? ((this.CurIndex = -1),
          (i = this.AWt()) > 0
            ? (this.CurIndex = i)
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Gacha",
                  44,
                  "打开抽卡展示界面时，没有抽中金色，却执行了跳过操作",
                ),
              (this.CurIndex = 0)))
        : (this.CurIndex = 0),
      (this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
        this.GetHorizontalLayout(6),
      )),
      (this.Zjt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.mWt =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "GachaRoleBeforeEndFrame",
        ) ?? this.mWt),
      (this.dWt =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "GachaWeaponBeforeEndFrame",
        ) ?? this.dWt),
      this.Refresh();
  }
  OnBeforeHideImplement() {
    this.hWt?.IsValid() && this.hWt?.EndGachaScene();
  }
  OnBeforeDestroyImplementImplement() {
    (this.uWt = void 0),
      UiSceneManager_1.UiSceneManager.DestroyGachaItemObserver(),
      UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(this.SWt),
      this.cWt &&
        (TimerSystem_1.TimerSystem.Remove(this.cWt), (this.cWt = void 0)),
      CameraController_1.CameraController.SetViewTarget(
        this.gWt,
        "GachaScanView.OnBeforeDestroyImplementImplement",
      );
  }
  OnBeforeDestroy() {
    this.AddChild(this.xjt),
      this.AddChild(this.Jjt),
      this.TWt(),
      ModelManager_1.ModelManager.GachaModel.ReleaseLoadGachaSequence();
  }
}
exports.GachaScanView = GachaScanView;
// # sourceMappingURL=GachaScanView.js.map
