"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewSoundDetectItem = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const AdventureDefine_1 = require("../AdventureDefine");
const NewSoundLordItem_1 = require("./NewSoundLordItem");
const NewSoundNormalItem_1 = require("./NewSoundNormalItem");
const NewSoundTeachItem_1 = require("./NewSoundTeachItem");
const NewSoundTowerItem_1 = require("./NewSoundTowerItem");
class NewSoundDetectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.u6e = void 0),
      (this.Pe = void 0),
      (this.c6e = void 0),
      (this.m6e = void 0),
      (this.d6e = void 0),
      (this.C6e = void 0),
      (this.g6e = void 0),
      (this.q5e = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.f6e = () => {
        if (
          ModelManager_1.ModelManager.CreatureModel.GetInstanceId() !==
          AdventureDefine_1.BigWorldID
        )
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "DungeonDetection",
          );
        else if (
          this.Pe.Conf?.Secondary === AdventureDefine_1.EDungeonType.Tutorial ||
          this.Pe.Conf?.Secondary === AdventureDefine_1.EDungeonType.SkillTeach
        ) {
          const i = this.Pe.Conf.SubDungeonId;
          var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(94);
          var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            this.Pe.Conf.Name,
          );
          e.SetTextArgs(t),
            e.FunctionMap.set(2, () => {
              var e =
                ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
                  i,
                ).FightFormationId;
              var e =
                ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
                  e,
                )?.AutoRole;
              if ((e?.length ?? 0) > 0) {
                const t = new Array();
                for (const r of e)
                  t.push(
                    ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(
                      r,
                    ),
                  );
                InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
                  i,
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
          this.Pe.Type === 0
            ? ((t =
                ModelManager_1.ModelManager.AdventureGuideModel.GetSoundAreaDetectData(
                  this.Pe.Conf.Id,
                )),
              ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(
                !0,
              ),
              ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(
                t.Conf.Secondary !== AdventureDefine_1.EDangerType.Middle
                  ? Protocol_1.Aki.Protocol.d3n.Proto_Dungeon
                  : Protocol_1.Aki.Protocol.d3n.Proto_SilentArea,
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
                Protocol_1.Aki.Protocol.d3n.Proto_SilentArea,
                e.Conf.LevelPlayList,
                this.Pe.Conf.Id,
              ));
      }),
      (this.p6e = (e) => {
        const t =
          ConfigManager_1.ConfigManager.AdventureModuleConfig.GetShowReward(
            this.Pe.Conf.ShowRewardMap,
            e,
          );
        const r = new Array();
        for (const n of t.keys()) {
          const i = [{ IncId: 0, ItemId: n }, t.get(n)];
          r.push(i);
        }
        this.u6e.RefreshByData(r, this.v6e);
      }),
      (this.v6e = () => {
        this.u6e?.ScrollToLeft(0);
        let e = this.Pe.Conf.Secondary;
        if (e === AdventureDefine_1.EDungeonType.LordGym) {
          if (
            !ModelManager_1.ModelManager.LordGymModel?.GetGymEntranceAllFinish(
              this.Pe.Conf.AdditionalId,
            )
          )
            return;
          for (const t of this.u6e.GetScrollItemList())
            t.SetReceivedVisible(!0);
        }
        if (
          e === AdventureDefine_1.EDungeonType.Tutorial ||
          e === AdventureDefine_1.EDungeonType.SkillTeach
        ) {
          (e = this.Pe.Conf.SubDungeonId),
            (e =
              ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(
                e,
              ));
          if (e)
            for (const r of this.u6e.GetScrollItemList())
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
      (this.BtnBindInfo = [[1, this.f6e]]);
  }
  OnStart() {
    (this.u6e = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(0),
      this.q5e,
    )),
      (this.m6e = new NewSoundLordItem_1.NewSoundLordItem()),
      this.m6e.CreateByActorAsync(this.GetItem(2).GetOwner()),
      (this.d6e = new NewSoundNormalItem_1.NewSoundNormalItem()),
      this.d6e.CreateByActorAsync(this.GetItem(5).GetOwner()),
      (this.C6e = new NewSoundTeachItem_1.NewSoundTeachItem()),
      this.C6e.CreateByActorAsync(this.GetItem(4).GetOwner()),
      (this.g6e = new NewSoundTowerItem_1.NewSoundTowerItem()),
      this.g6e.CreateByActorAsync(this.GetItem(3).GetOwner()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NewSoundAreaRefreshReward,
        this.p6e,
      );
  }
  Refresh(e, t, r) {
    switch (((this.Pe = e), this.c6e?.SetUiActive(!1), e.Conf.Secondary)) {
      case AdventureDefine_1.EDungeonType.LordGym:
        this.m6e?.SetUiActive(!0), (this.c6e = this.m6e);
        break;
      case AdventureDefine_1.EDungeonType.Tower:
        this.g6e?.SetUiActive(!0), (this.c6e = this.g6e);
        break;
      case AdventureDefine_1.EDungeonType.Tutorial:
        this.C6e?.SetUiActive(!0), (this.c6e = this.C6e);
        break;
      default:
        this.d6e?.SetUiActive(!0), (this.c6e = this.d6e);
    }
    this.c6e?.Update(e),
      this.GetButton(1).RootUIComp.SetUIActive(!e.IsLock),
      this.GetItem(6).SetUIActive(e.IsLock);
    let i = 0;
    if (e.Type === 0) {
      var n = e.Conf;
      if (
        n.SubDungeonId &&
        !ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          n.SubDungeonId,
        ) &&
        e.Conf.Secondary === AdventureDefine_1.EDungeonType.Tutorial
      )
        return;
    } else {
      var n = e.Conf;
      e.Conf.Secondary === AdventureDefine_1.EDungeonType.LordGym &&
        (i = n.AdditionalId);
    }
    let o = 0;
    i &&
      ((n = ModelManager_1.ModelManager.LordGymModel.GetHasFinishLord(i)),
      (o = n + 1));
    const s = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetShowReward(
      e.Conf.ShowRewardMap,
      o,
    );
    const a = new Array();
    for (const l of s.keys()) {
      const h = [{ IncId: 0, ItemId: l }, s.get(l)];
      a.push(h);
    }
    this.u6e.RefreshByData(a, this.v6e);
  }
  OnBeforeDestroy() {
    this.m6e?.Destroy(),
      this.d6e?.Destroy(),
      this.C6e?.Destroy(),
      this.g6e?.Destroy(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NewSoundAreaRefreshReward,
        this.p6e,
      );
  }
}
exports.NewSoundDetectItem = NewSoundDetectItem;
// # sourceMappingURL=NewSoundDetectItem.js.map
