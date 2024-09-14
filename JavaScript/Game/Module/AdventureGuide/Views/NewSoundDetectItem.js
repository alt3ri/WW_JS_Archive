"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewSoundDetectItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  NewSoundLordItem_1 = require("./NewSoundLordItem"),
  NewSoundNormalItem_1 = require("./NewSoundNormalItem"),
  NewSoundTeachItem_1 = require("./NewSoundTeachItem"),
  NewSoundTowerItem_1 = require("./NewSoundTowerItem");
class NewSoundDetectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.T8e = void 0),
      (this.Pe = void 0),
      (this.L8e = void 0),
      (this.D8e = void 0),
      (this.R8e = void 0),
      (this.U8e = void 0),
      (this.A8e = void 0),
      (this.YVe = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
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
                InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
                  o,
                  t,
                );
              } else
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error("Role", 5, "未配置出战人物");
            }),
            void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            );
        } else
          0 === this.Pe.Type
            ? ((t =
                ModelManager_1.ModelManager.AdventureGuideModel.GetSoundAreaDetectData(
                  this.Pe.Conf.Id,
                )),
              ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(
                !0,
              ),
              ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(
                2 !== t.Conf.Secondary
                  ? Protocol_1.Aki.Protocol.r8n.Proto_Dungeon
                  : Protocol_1.Aki.Protocol.r8n.Proto_SilentArea,
                [t.Conf.DungeonId],
                this.Pe.Conf.Id,
              ))
            : ((e =
                ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(
                  this.Pe.Conf.Id,
                )),
              ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(
                !0,
              ),
              ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(
                Protocol_1.Aki.Protocol.r8n.Proto_SilentArea,
                e.Conf.LevelPlayList,
                this.Pe.Conf.Id,
              ));
      }),
      (this.x8e = (e) => {
        var t =
            ConfigManager_1.ConfigManager.AdventureModuleConfig.GetShowReward(
              this.Pe.Conf.ShowRewardMap,
              e,
            ),
          r = new Array();
        for (const i of t.keys()) {
          var o = [{ IncId: 0, ItemId: i }, t.get(i)];
          r.push(o);
        }
        this.T8e.RefreshByData(r, this.w8e);
      }),
      (this.w8e = () => {
        this.T8e?.ScrollToLeft(0);
        var e = this.Pe.Conf.Secondary;
        if (61 === e) {
          if (
            !ModelManager_1.ModelManager.LordGymModel?.GetGymEntranceAllFinish(
              this.Pe.Conf.AdditionalId,
            )
          )
            return;
          for (const t of this.T8e.GetScrollItemList())
            t.SetReceivedVisible(!0);
        }
        if (6 === e || 62 === e) {
          (e = this.Pe.Conf.SubDungeonId),
            (e =
              ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(
                e,
              ));
          if (e)
            for (const r of this.T8e.GetScrollItemList())
              r.SetReceivedVisible(!0);
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIButtonComponent],
      [0, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.P8e]]);
  }
  OnStart() {
    (this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(0),
      this.YVe,
    )),
      (this.D8e = new NewSoundLordItem_1.NewSoundLordItem()),
      this.D8e.CreateByActorAsync(this.GetItem(2).GetOwner()),
      (this.R8e = new NewSoundNormalItem_1.NewSoundNormalItem()),
      this.R8e.CreateByActorAsync(this.GetItem(5).GetOwner()),
      (this.U8e = new NewSoundTeachItem_1.NewSoundTeachItem()),
      this.U8e.CreateByActorAsync(this.GetItem(4).GetOwner()),
      (this.A8e = new NewSoundTowerItem_1.NewSoundTowerItem()),
      this.A8e.CreateByActorAsync(this.GetItem(3).GetOwner()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NewSoundAreaRefreshReward,
        this.x8e,
      );
  }
  Refresh(e, t, r) {
    switch (((this.Pe = e), this.L8e?.SetUiActive(!1), e.Conf.Secondary)) {
      case 61:
        this.D8e?.SetUiActive(!0), (this.L8e = this.D8e);
        break;
      case 5:
        this.A8e?.SetUiActive(!0), (this.L8e = this.A8e);
        break;
      case 6:
        this.U8e?.SetUiActive(!0), (this.L8e = this.U8e);
        break;
      default:
        this.R8e?.SetUiActive(!0), (this.L8e = this.R8e);
    }
    this.L8e?.Update(e),
      this.GetButton(1).RootUIComp.SetUIActive(!e.IsLock),
      this.GetItem(6).SetUIActive(e.IsLock);
    let o = 0;
    if (0 === e.Type) {
      var i = e.Conf;
      if (
        i.SubDungeonId &&
        !ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          i.SubDungeonId,
        ) &&
        6 === e.Conf.Secondary
      )
        return;
    } else {
      var i = e.Conf;
      61 === e.Conf.Secondary && (o = i.AdditionalId);
    }
    let n = 0;
    o &&
      ((i = ModelManager_1.ModelManager.LordGymModel.GetHasFinishLord(o)),
      (n = i + 1)),
      (n =
        0 !== n
          ? n
          : ModelManager_1.ModelManager.AdventureGuideModel.CurrentShowLevel);
    var s = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetShowReward(
        e.Conf.ShowRewardMap,
        n,
      ),
      a = new Array();
    for (const l of s.keys()) {
      var h = [{ IncId: 0, ItemId: l }, s.get(l)];
      a.push(h);
    }
    this.T8e.RefreshByData(a, this.w8e);
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
