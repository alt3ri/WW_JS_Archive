"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController"),
  ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../ItemReward/ItemRewardDefine"),
  RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../UiModel/UiModelUtil");
class LordGymController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.OnRegisterNetEvent(), this.OnAddEvents(), !0;
  }
  static OnClear() {
    return this.OnUnRegisterNetEvent(), this.OnRemoveEvents(), !0;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(20925, this.PSi), Net_1.Net.Register(17069, this.xSi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20925), Net_1.Net.UnRegister(17069);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.$5e);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      this.$5e,
    );
  }
  static async LordGymInfoRequest() {
    var e = Protocol_1.Aki.Protocol.Ass.create({}),
      e = await Net_1.Net.CallAsync(25407, e);
    if (
      (0 < e.jxs?.length &&
        ((ModelManager_1.ModelManager.LordGymModel.UnLockLordGym = e.jxs),
        ModelManager_1.ModelManager.LordGymModel.UnLockLordGym.sort(
          (e, r) => e - r,
        )),
      e.Wxs?.length &&
        (ModelManager_1.ModelManager.LordGymModel.ReadLoadGymIds = e.Wxs),
      0 < e.Kxs?.length)
    )
      for (const r of e.Kxs)
        ModelManager_1.ModelManager.LordGymModel.LordGymRecord.set(r.y7n, r);
  }
  static async LordGymBeginRequest(e) {
    var r = Protocol_1.Aki.Protocol.wss.create(),
      r = ((r.y7n = e), await Net_1.Net.CallAsync(24100, r));
    return (
      !!r &&
      (r.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? (ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
            r.Q4n,
            24100,
          ),
          !1)
        : ((ModelManager_1.ModelManager.LordGymModel.CurrentChallengeLordGymId =
            e),
          ModelManager_1.ModelManager.LordGymModel.GetLordGymHasRead(e) ||
            LordGymController.ReadLordGym(e),
          !0))
    );
  }
  static async OpenLordGymEntrance(e, r = 0) {
    return (
      await this.LordGymInfoRequest(),
      (ModelManager_1.ModelManager.LordGymModel.EntranceEntityId = r),
      void 0 !==
        (await UiManager_1.UiManager.OpenViewAsync("LordGymEntranceView", e))
    );
  }
  static async OpenLordGymLordEntranceSelectView(e, r = 0) {
    return (
      (ModelManager_1.ModelManager.LordGymModel.EntranceEntityId = r),
      (ModelManager_1.ModelManager.LordGymModel.EntranceSetId = e),
      void 0 !==
        (await UiManager_1.UiManager.OpenViewAsync(
          "LordGymLordEntranceSelectView",
          e,
        ))
    );
  }
  static OpenGymUnlockTipView(e) {
    UiManager_1.UiManager.OpenView("LordGymUnlockTipView", e),
      (ModelManager_1.ModelManager.LordGymModel.FirstUnLockLordGym = []);
  }
  static async ReadLordGym(e) {
    ModelManager_1.ModelManager.LordGymModel.ReadLordGym(e);
    var r = Protocol_1.Aki.Protocol.bss.create();
    (r.y7n = e), await Net_1.Net.CallAsync(19917, r);
  }
  static IsInEntranceEntity() {
    var e = ModelManager_1.ModelManager.LordGymModel.EntranceEntityId;
    return (
      !e ||
      !(e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e))
        ?.IsInit ||
      (e.Entity?.GetComponent(117)?.IsInInteractRange ?? !1)
    );
  }
  static CreateLordModelByEntranceId(e) {
    UiSceneManager_1.UiSceneManager.InitLordSkeletalHandle();
    var r = UiSceneManager_1.UiSceneManager.GetLordSkeletalHandle();
    UiModelUtil_1.UiModelUtil.SetTransformByTag(r.Model, "MonsterCase"),
      this.LoadLordModelByEntranceId(e);
  }
  static LoadLordModelByEntranceId(e) {
    if (UiSceneManager_1.UiSceneManager.GetLordSkeletalHandle()) {
      const i =
        ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceConfig(e);
      e = i.MeshId;
      const l = UiSceneManager_1.UiSceneManager.GetLordSkeletalHandle().Model;
      var r = l.CheckGetComponent(0).ModelConfigId;
      if (r !== e) {
        const d = l.CheckGetComponent(10),
          s = l.CheckGetComponent(2),
          _ = l.CheckGetComponent(1),
          M = i.StandAnim,
          c = i.LordChangeMaterialController,
          g = i.LordChangeMaterialController;
        r = [M];
        StringUtils_1.StringUtils.IsBlank(c) || r.push(c),
          StringUtils_1.StringUtils.IsBlank(g) || r.push(g);
        s?.LoadModelByModelId(
          e,
          !0,
          () => {
            var e = ModelManager_1.ModelManager.LordGymModel;
            let r = e.CacheLocation,
              t = e.CacheRotator,
              o = e.CacheScale,
              n = e.CacheTransform;
            var a = i.Location,
              a =
                (r
                  ? r.Set(a[0], a[1], a[2])
                  : ((r = new UE.Vector(a[0], a[1], a[2])),
                    (e.CacheLocation = r)),
                i.Rotator),
              a =
                (t
                  ? ((t.Pitch = a[0]), (t.Yaw = a[1]), (t.Roll = a[2]))
                  : ((t = new UE.Rotator(a[0], a[1], a[2])),
                    (e.CacheRotator = t)),
                i.Zoom),
              a =
                (o
                  ? o.Set(a[0], a[1], a[2])
                  : ((o = new UE.Vector(a[0], a[1], a[2])), (e.CacheScale = o)),
                n
                  ? (n.SetLocation(r),
                    n.SetRotation(t.Quaternion()),
                    n.SetScale3D(o))
                  : ((n = new UE.Transform(t, r, o)), (e.CacheTransform = n)),
                _.SetAllMeshComponentRelativeTransform(n, !1, void 0, !1),
                s?.GetLoadedResource(M)),
              e =
                (a ||
                  (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "UiCommon",
                      43,
                      "[LordGym] 道馆界面待机动画预加载失败",
                    )),
                d.PlayAnimation(a, !0),
                l.CheckGetComponent(5));
            StringUtils_1.StringUtils.IsBlank(c) ||
              ((a = s.GetLoadedResource(c)) &&
                e?.AddRenderingMaterialByData(a)),
              StringUtils_1.StringUtils.IsBlank(g) ||
                ((a = s.GetLoadedResource(g)) &&
                  e?.AddRenderingMaterialByData(a));
          },
          r,
        );
      }
    }
  }
}
(exports.LordGymController = LordGymController),
  ((_a = LordGymController).$5e = () => {
    ModelManager_1.ModelManager.LordGymModel?.InitNewLordGymEntranceIdRecord(),
      _a.LordGymInfoRequest();
  }),
  (LordGymController.PSi = (e) => {
    ModelManager_1.ModelManager.LordGymModel.FirstUnLockLordGym = e.jxs;
  }),
  (LordGymController.xSi = (r) => {
    var t = ModelManager_1.ModelManager.LordGymModel,
      e = t.IsDeadInChallenge,
      o = ((t.IsDeadInChallenge = !1), r.Jxs.y7n);
    if ((t.LordGymRecord.set(o, r.Jxs), r.Mws)) {
      var n = [];
      for (const d of r.zxs) {
        var a = new RewardItemData_1.RewardItemData(
          d.L8n,
          d.m9n,
          0 !== d.Xxs ? d.Xxs : void 0,
        );
        n.push(a);
      }
      let e = void 0;
      var t = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(o);
      const i = ModelManager_1.ModelManager.LordGymModel.GetNextGymId(o);
      e = t.IsNew
        ? ((o = {
            ButtonTextId: "Text_GymReturnToWorld_Text",
            DescriptionTextId: void 0,
            IsTimeDownCloseView: !1,
            IsClickedCloseView: !0,
          }),
          i && ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(i)
            ? [
                o,
                {
                  ButtonTextId: "Text_GymContinueChallenge_Text",
                  DescriptionTextId: void 0,
                  IsTimeDownCloseView: !1,
                  IsClickedCloseView: !0,
                  OnClickedCallback: () => {
                    LordGymController.LordGymBeginRequest(i);
                  },
                },
              ]
            : [
                o,
                {
                  ButtonTextId: "Text_GymReturnToLordGym_Text",
                  DescriptionTextId: void 0,
                  IsTimeDownCloseView: !1,
                  IsClickedCloseView: !0,
                  OnClickedCallback: () => {
                    var e =
                      ModelManager_1.ModelManager.LordGymModel.EntranceSetId;
                    0 < e &&
                      UiManager_1.UiManager.OpenView(
                        "LordGymLordEntranceSelectView",
                        e,
                      );
                  },
                },
              ])
        : [
            {
              ButtonTextId: "ConfirmBox_45_ButtonText_1",
              DescriptionTextId: void 0,
              IsTimeDownCloseView: !1,
              IsClickedCloseView: !0,
            },
          ];
      t = {
        TitleTextId: "LordGym_TimeTitle",
        Record: TimeUtil_1.TimeUtil.GetTimeString(r.Jxs.Qxs),
        IsNewRecord: r.Yxs,
      };
      const l =
        i &&
        !ModelManager_1.ModelManager.LordGymModel.GetLordGymHasRead(i) &&
        ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(i);
      var o = {
        ConfigId: ItemRewardDefine_1.LORD_GYM_RESULT,
        IsSuccess: !0,
        RewardItemDataList: n,
        ExploreRecordInfo: t,
        ButtonInfoList: e,
        OnCloseCallback: () => {
          l && UiManager_1.UiManager.OpenView("LordGymUnlockTipView", i);
        },
        IsBagFull: r.Ksc,
      };
      ItemRewardController_1.ItemRewardController.OpenExploreRewardViewNew(o);
    } else
      (t = r.E7_),
        ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(t).IsNew &&
          !e &&
          ((o = { LordId: t }),
          UiManager_1.UiManager.OpenView("LordGymChallengeFailView", o));
  });
//# sourceMappingURL=LordGymController.js.map
