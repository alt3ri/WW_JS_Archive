"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewSoundDetectItem = exports.NewSoundDetectItemData = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  NewSoundDetectRewardItem_1 = require("./NewSoundDetectRewardItem"),
  NewSoundLordItem_1 = require("./NewSoundLordItem"),
  NewSoundNormalItem_1 = require("./NewSoundNormalItem"),
  NewSoundTeachItem_1 = require("./NewSoundTeachItem"),
  NewSoundTowerItem_1 = require("./NewSoundTowerItem"),
  NewSoundWeeklyRogueItem_1 = require("./NewSoundWeeklyRogueItem");
class NewSoundDetectItemData {
  constructor() {
    (this.DetectRecordData = void 0), (this.TracingList = void 0);
  }
}
exports.NewSoundDetectItemData = NewSoundDetectItemData;
class NewSoundDetectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.T8e = void 0),
      (this.Pe = void 0),
      (this.ZAt = void 0),
      (this.L8e = void 0),
      (this.D8e = void 0),
      (this.R8e = void 0),
      (this.U8e = void 0),
      (this.A8e = void 0),
      (this.Z4_ = void 0),
      (this.oO_ = void 0),
      (this.YVe = () => {
        return new NewSoundDetectRewardItem_1.NewSoundDetectRewardItem();
      }),
      (this.P8e = () => {
        if (
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
        )
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "DungeonDetection",
          );
        else if (
          6 === this.Pe.Conf?.Secondary ||
          62 === this.Pe.Conf?.Secondary
        ) {
          const o = this.Pe.Conf.SubDungeonId;
          var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(94),
            t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              this.Pe.Conf.Name,
            );
          e.SetTextArgs(t),
            e.FunctionMap.set(2, () => {
              var e =
                  ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
                    o,
                  ).FightFormationId,
                e =
                  ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
                    e,
                  )?.AutoRole;
              if (0 < (e?.length ?? 0)) {
                var t = new Array();
                for (const r of e)
                  t.push(
                    ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(
                      r,
                    ),
                  );
                e = { Kah: this.Pe.Conf.Id };
                (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Vah =
                  e),
                  InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
                    o,
                    t,
                    0,
                    0,
                  );
              } else
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error("Role", 5, "未配置出战人物");
            }),
            void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            );
        } else {
          if (29 === this.Pe.Conf.Secondary)
            return (t =
              ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData)
              ? ((e = { MarkId: t.GetCycleConfig().MapMark, MarkType: 6 }),
                void UiManager_1.UiManager.OpenView("WorldMapView", e))
              : void (
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "WeeklyRogue",
                    34,
                    "点击周常肉鸽追踪 活动数据为空",
                  )
                );
          0 === this.Pe.Type ? this.iql() : this.rql();
        }
      }),
      (this.x8e = (e) => {
        var t =
            ConfigManager_1.ConfigManager.AdventureModuleConfig.GetShowReward(
              this.Pe.Conf.ShowRewardMap,
              e,
            ),
          r =
            ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionFinished(
              this.Pe,
            ),
          o = new Array();
        for (const n of t.keys()) {
          var i = [{ IncId: 0, ItemId: n }, t.get(n)];
          o.push({ ItemData: i, HaveFinish: r });
        }
        this.T8e.RefreshByData(o, this.w8e);
      }),
      (this.w8e = () => {
        this.T8e?.ScrollToLeft(0);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIItem],
      [0, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.ZAt = new ButtonItem_1.ButtonItem()),
      await this.ZAt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      this.ZAt.SetFunction(this.P8e),
      (this.oO_ = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(0),
        this.YVe,
      )),
      (this.D8e = new NewSoundLordItem_1.NewSoundLordItem()),
      (this.R8e = new NewSoundNormalItem_1.NewSoundNormalItem()),
      (this.U8e = new NewSoundTeachItem_1.NewSoundTeachItem()),
      (this.A8e = new NewSoundTowerItem_1.NewSoundTowerItem()),
      (this.Z4_ = new NewSoundWeeklyRogueItem_1.NewSoundWeeklyRogueItem()),
      await Promise.all([
        this.D8e.CreateByActorAsync(this.GetItem(2).GetOwner()),
        this.R8e.CreateByActorAsync(this.GetItem(5).GetOwner()),
        this.U8e.CreateByActorAsync(this.GetItem(4).GetOwner()),
        this.A8e.CreateByActorAsync(this.GetItem(3).GetOwner()),
        this.Z4_.CreateByActorAsync(this.GetItem(10).GetOwner()),
      ]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.NewSoundAreaRefreshReward,
      this.x8e,
    );
  }
  nO_(e) {
    (e.TracingList?.includes(e.DetectRecordData.Conf.Id) ?? !1) &&
      this.oO_?.PlayLevelSequenceByName("Track");
  }
  Refresh(e, t, r) {
    const o = e.DetectRecordData;
    switch (((this.Pe = o), this.L8e?.SetUiActive(!1), o.Conf.Secondary)) {
      case 61:
        this.D8e?.SetUiActive(!0), (this.L8e = this.D8e);
        break;
      case 28:
      case 5:
        this.A8e?.SetUiActive(!0), (this.L8e = this.A8e);
        break;
      case 6:
        this.U8e?.SetUiActive(!0), (this.L8e = this.U8e);
        break;
      case 29:
        this.Z4_?.SetUiActive(!0), (this.L8e = this.Z4_);
        break;
      default:
        this.R8e?.SetUiActive(!0), (this.L8e = this.R8e);
    }
    this.L8e?.Update(e);
    var i =
        ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionPreOpen(o),
      n = i || !o.IsLock,
      s =
        ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionNewContentOpen(
          o,
        ),
      n =
        (this.ZAt?.SetUiActive(n),
        this.GetItem(6).SetUIActive(!n),
        this.GetItem(9).SetUIActive(i),
        !i && s);
    this.GetItem(7).SetUIActive(n),
      n &&
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), o.Conf.NewContent);
    let a = 0;
    if (0 === o.Type) {
      i = o.Conf;
      if (
        i.SubDungeonId &&
        !ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          i.SubDungeonId,
        ) &&
        6 === o.Conf.Secondary
      )
        return;
    } else {
      s = o.Conf;
      61 === o.Conf.Secondary && (a = s.AdditionalId);
    }
    let l = 0;
    a &&
      ((n = ModelManager_1.ModelManager.LordGymModel.GetHasFinishLord(a)),
      (l = n + 1)),
      (l =
        0 !== l
          ? l
          : ModelManager_1.ModelManager.AdventureGuideModel.CurrentShowLevel);
    var h = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetShowReward(
        o.Conf.ShowRewardMap,
        l,
      ),
      d = ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionFinished(
        this.Pe,
      ),
      _ = new Array();
    for (const u of h.keys()) {
      const o = {
        ItemData: [{ IncId: 0, ItemId: u }, h.get(u)],
        HaveFinish: d,
      };
      _.push(o);
    }
    this.T8e.RefreshByData(_, this.w8e), this.nO_(e);
  }
  iql() {
    var e, t;
    ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionPreOpen(this.Pe)
      ? this.oql()
      : ((e =
          ModelManager_1.ModelManager.AdventureGuideModel.GetSoundAreaDetectData(
            this.Pe.Conf.Id,
          )),
        (t =
          ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
            e.Conf.DungeonId,
          )),
        ControllerHolder_1.ControllerHolder.AdventureGuideController.IsMarkUnlock(
          t.MarkId,
        ) &&
          (ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(
            !0,
          ),
          ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(
            2 !== e.Conf.Secondary
              ? Protocol_1.Aki.Protocol.r8n.Proto_Dungeon
              : Protocol_1.Aki.Protocol.r8n.Proto_SilentArea,
            [e.Conf.DungeonId],
            this.Pe.Conf.Id,
          )));
  }
  oql() {
    if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel())
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
        "CantUseInMultiplayerMode",
      );
    else {
      let e = !1;
      var t =
        ModelManager_1.ModelManager.AdventureGuideModel.GetPreOpenDetectionConf(
          this.Pe.Conf.Id,
          this.Pe.Type,
          this.Pe.Conf.PreOpenId,
        );
      (e = t ? t.Spoiler : e)
        ? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(238)).FunctionMap.set(
            2,
            () => {
              this.nql();
            },
          ),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            t,
          ))
        : this.nql();
    }
  }
  rql() {
    var e;
    ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionPreOpen(this.Pe)
      ? this.oql()
      : ((e =
          ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(
            this.Pe.Conf.Id,
          )),
        ControllerHolder_1.ControllerHolder.AdventureGuideController.IsMarkUnlock(
          e.Conf.MarkId,
        ) &&
          (ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(
            !0,
          ),
          ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(
            Protocol_1.Aki.Protocol.r8n.Proto_SilentArea,
            e.Conf.LevelPlayList,
            this.Pe.Conf.Id,
          )));
  }
  nql() {
    var e =
        ModelManager_1.ModelManager.AdventureGuideModel.GetPreOpenDetectionConf(
          this.Pe.Conf.Id,
          this.Pe.Type,
          this.Pe.Conf.PreOpenId,
        ),
      t = e.TeleportEntityId;
    if (t) WorldMapController_1.WorldMapController.TryTeleport(t);
    else {
      t = e.DungeonEntranceId;
      if (t)
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterEntrance(
          t,
        );
      else {
        t = e.InstanceID;
        if (t) {
          var r = { v9n: e.Id },
            o =
              ((ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Wsc =
                r),
              []);
          for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems())
            o.push(i.GetConfigId);
          InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
            t,
            o,
            0,
            0,
          );
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "AdventureGuide",
              63,
              "未配置预开放检测的传送点或副本入口",
              ["detectionId", this.Pe.Conf.Id],
              ["preOpenDetectionId", e?.Id],
            );
      }
    }
  }
  OnBeforeDestroy() {
    this.D8e?.Destroy(),
      this.R8e?.Destroy(),
      this.U8e?.Destroy(),
      this.A8e?.Destroy(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NewSoundAreaRefreshReward,
        this.x8e,
      );
  }
}
exports.NewSoundDetectItem = NewSoundDetectItem;
//# sourceMappingURL=NewSoundDetectItem.js.map
