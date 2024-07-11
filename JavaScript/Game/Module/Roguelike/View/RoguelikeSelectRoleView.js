"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeSelectRoleData =
    exports.RoguelikeSelectRoleBaseGrid =
    exports.RoguelikeSelectRoleGrid =
    exports.RoguelikeSelectRoleView =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  HelpController_1 = require("../../Help/HelpController"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  RoleDefine_1 = require("../../RoleUi/RoleDefine"),
  RoleSelectionMediumItemGrid_1 = require("../../RoleUi/View/RoleSelectionMediumItemGrid"),
  RoleInstance_1 = require("../../RoleUi/View/ViewData/RoleInstance"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  DynScrollView_1 = require("../../Util/ScrollView/DynScrollView"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeSelectRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.DynamicScrollViewComponent = void 0),
      (this.eho = void 0),
      (this.tho = []),
      (this.ShowRoleList = []),
      (this.wLn = []),
      (this.NUe = 0),
      (this.BLn = void 0),
      (this.Q6s = 1),
      (this.w5i = void 0),
      (this.iho = void 0),
      (this.Bqe = (e, i, t) => {
        e = new RoguelikeSelectRoleGrid(e);
        return e.BindSelectRoleCallBack(this.bLn), e;
      }),
      (this.bLn = (e, i) => {
        this.BLn = e;
        var t =
            ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
              this.NUe,
              ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
            ),
          o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
            this.NUe,
          ),
          o =
            ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
              o.FightFormationId,
            ),
          n = e.GetLevelData().GetLevel(),
          e = e.GetDataId(),
          r = !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e),
          o = o.LimitRole.includes(e),
          n = n < t && o && !r,
          t =
            (this.GetItem(9).SetUIActive(n),
            e > RoleDefine_1.ROBOT_DATA_MIN_ID || (o && !r));
        this.GetButton(10).RootUIComp.SetUIActive(t);
      }),
      (this.rho = () => {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RevertEntranceFlowStep(),
          this.CloseMe();
      }),
      (this.nho = () => {
        var e = this.OpenParam,
          e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
        ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
          e.FightFormationId,
        ).LimitRole.includes(this.BLn.GetRoleId())
          ? ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
              this.BLn.GetDataId(),
            )
            ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow()
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "Rogue_Dont_Have_Role",
              )
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "Roguelike_SelectRole_CannotUse",
            );
      }),
      (this.sho = (e) => {
        let i = RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE;
        for (const n of (this.iho.W8n = e)) {
          var t =
            ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikePopularEntriesById(
              n,
            );
          t && (i += t.Rate);
        }
        let o = UE.Color.FromHex("adadad");
        i > RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE
          ? (o = UE.Color.FromHex("c25757"))
          : i < RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE &&
            (o = UE.Color.FromHex("36cd33")),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(11),
            "Rogue_Entry_Multiple",
            i / 100,
          ),
          this.GetText(11)?.SetColor(o);
      }),
      (this.aho = () => {
        UiManager_1.UiManager.OpenView(
          "RoguelikeInstanceEntrySelectView",
          this.iho,
        );
      }),
      (this.hho = () => {
        2 === this.Q6s
          ? RoleController_1.RoleController.OpenRoleMainView(1, 0, [
              this.BLn.GetDataId(),
            ])
          : RoleController_1.RoleController.OpenRoleMainView(0, 0, [
              this.BLn.GetDataId(),
            ]);
      }),
      (this.ebn = () => {
        HelpController_1.HelpController.OpenHelpById(
          RoguelikeDefine_1.ROGUELIKE_HELP_ID,
        );
      });
  }
  OnBeforeCreate() {
    this.w5i = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(7);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIDynScrollViewComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
      [10, UE.UIButtonComponent],
      [11, UE.UIText],
      [12, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [1, this.rho],
        [2, this.nho],
        [8, this.aho],
        [10, this.hho],
        [12, this.ebn],
      ]);
  }
  async OnBeforeStartAsync() {
    this.NUe = this.OpenParam;
    var e;
    await Promise.all([
      (e =
        await RoguelikeController_1.RoguelikeController.RoguelikePopularEntriesInfoRequest(
          this.NUe,
        )),
      (this.wLn =
        await RoguelikeController_1.RoguelikeController.RoguelikeTrialRoleInfoRequest(
          this.NUe,
        )),
    ]),
      (this.iho = e.bws),
      this.sho(e.bws.W8n),
      (this.eho = new RoguelikeSelectRoleBaseGrid()),
      (this.DynamicScrollViewComponent = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(3),
        this.GetItem(4),
        this.eho,
        this.Bqe,
      )),
      await this.DynamicScrollViewComponent.Init(),
      this.GetButton(8)?.GetRootComponent()?.SetUIActive(this.oIn());
  }
  OnStart() {
    (RoguelikeSelectRoleGrid.CurSelectRoleItem = void 0), this.InitRoleList();
  }
  InitRoleList() {
    var e = this.OpenParam,
      e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    const n =
      ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
        e.FightFormationId,
      );
    e = this.GetTrailRoleInstanceList(this.wLn);
    0 < e.length &&
      this.tho.push(new RoguelikeSelectRoleData(0, e, n.LimitRole));
    const r = n.LimitRole,
      t = ModelManager_1.ModelManager.RoleModel.GetRoleList();
    e = ConfigManager_1.ConfigManager.RoleConfig?.GetRoleList().filter(
      (e) =>
        1 === e.RoleType &&
        !ModelManager_1.ModelManager.RoleModel.IsMainRole(e.Id),
    );
    const o = [];
    r.forEach((i) => {
      (ModelManager_1.ModelManager.RoleModel.IsMainRole(i) &&
        !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i)) ||
        (void 0 !== t.find((e) => e.GetRoleId() === i)
          ? o.push(t.find((e) => e.GetRoleId() === i))
          : o.push(new RoleInstance_1.RoleInstance(i)));
    });
    e = e.filter((e) => !r.includes(e.Id));
    const l = [];
    e.forEach((i) => {
      void 0 !== t.find((e) => e.GetRoleId() === i.Id)
        ? l.push(t.find((e) => e.GetRoleId() === i.Id))
        : l.push(new RoleInstance_1.RoleInstance(i.Id));
    });
    e = (e, i) => {
      var t,
        o = r.includes(e.GetRoleId()) && 0 !== e.GetLevelData().GetLevel();
      return o !==
        (r.includes(i.GetRoleId()) && 0 !== i.GetLevelData().GetLevel()) ||
        (o = n.RecommendFormation.includes(e.GetRoleId())) !==
          n.RecommendFormation.includes(i.GetRoleId())
        ? o
          ? -1
          : 1
        : (o = e.GetLevelData().GetLevel()) !==
            (t = i.GetLevelData().GetLevel())
          ? t < o
            ? -1
            : 1
          : (t = e.GetRoleConfig().QualityId) !==
              (o = i.GetRoleConfig().QualityId)
            ? o < t
              ? -1
              : 1
            : ((o = e.GetRoleId()),
              (t = i.GetRoleId()) < o ? -1 : o < t ? 1 : 0);
    };
    l.sort(e),
      o.sort(e),
      this.tho.push(new RoguelikeSelectRoleData(1, o, r, n.RecommendFormation)),
      this.tho.push(new RoguelikeSelectRoleData(2, l, r, n.RecommendFormation)),
      0 < o.length
        ? ((this.BLn = o[0]), (this.Q6s = 1))
        : 0 < l.length
          ? ((this.BLn = l[0]), (this.Q6s = 2))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Roguelike",
              59,
              "RoguelikeSelectRoleView没有角色数据",
            ),
      this.DynamicScrollViewComponent.RefreshByData(this.tho);
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.w5i);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoguelikePopularEntriesChange,
      this.sho,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoguelikePopularEntriesChange,
      this.sho,
    );
  }
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()
      .Model?.CheckGetComponent(1)
      ?.SetTransformByTag("RoleCase"),
      RoleController_1.RoleController.OnSelectedRoleChangeByConfig(
        this.BLn.GetRoleId(),
      ),
      this.bLn(this.BLn, this.Q6s);
  }
  GetTrailRoleInstanceList(e) {
    const i = [];
    return (
      e.forEach((e) => {
        e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
          ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(
            e,
          ),
        );
        void 0 !== e && i.push(e);
      }),
      i
    );
  }
  oIn() {
    for (const e of ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikePopularEntries())
      if (e.Insts.includes(this.iho.vFn)) return !0;
    return !1;
  }
}
exports.RoguelikeSelectRoleView = RoguelikeSelectRoleView;
class RoguelikeSelectRoleGrid extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.RoleItemList = new Map()),
      (this.Data = void 0),
      (this.qLn = void 0),
      (this.lho = (e) => {
        var i;
        0 === e.State &&
          ((i = e.Data).IsTrialRole()
            ? (ModelManager_1.ModelManager.RoguelikeModel.EditFormationRoleList =
                [i.GetDataId()])
            : (ModelManager_1.ModelManager.RoguelikeModel.EditFormationRoleList =
                [i.GetRoleId()]),
          RoguelikeSelectRoleGrid.CurSelectRoleItem &&
            RoguelikeSelectRoleGrid.CurSelectRoleItem.SetSelected(!1, !1),
          (RoguelikeSelectRoleGrid.CurSelectRoleItem = e.MediumItemGrid),
          RoguelikeSelectRoleGrid.CurSelectRoleItem.SetSelected(!0, !1),
          RoleController_1.RoleController.OnSelectedRoleChangeByConfig(
            i.GetDataId(),
          ),
          this.qLn) &&
          this.qLn(i, this.Data.Type);
      }),
      (this.Data = e);
  }
  BindSelectRoleCallBack(e) {
    this.qLn = e;
  }
  GetUsingItem(e) {
    return this.GetRootItem().GetOwner();
  }
  Update(e, i) {
    this.Data = e;
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    switch (
      (this.Data.RoleIdList.forEach((e, i) => {
        let t = this.RoleItemList.get(e.GetRoleId());
        if (!t) {
          var o = LguiUtil_1.LguiUtil.CopyItem(
            this.GetItem(2),
            this.GetItem(1),
          );
          t = new RoleSelectionMediumItemGrid_1.RoleSelectionMediumItemGrid();
          const n = e;
          t.CreateThenShowByActorAsync(o.GetOwner()).then(() => {
            var e = {
              Type: 2,
              Data: n,
              ItemConfigId: n.GetRoleId(),
              BottomTextId:
                0 !== n.GetLevelData().GetLevel()
                  ? "Text_LevelShow_Text"
                  : "Text_Role_Not_Have",
              BottomTextParameter: [n.GetLevelData().GetLevel()],
              ElementId: n.GetRoleConfig().ElementId,
              IsTrialRoleVisible: n.IsTrialRole(),
              IsNewVisible: !1,
              IsDisable:
                (0 < this.Data.LimitRoleList.length &&
                  !this.Data.LimitRoleList.includes(n.GetRoleId())) ||
                0 === n.GetLevelData().GetLevel(),
              IsRecommendVisible: this.Data.RecommendedRoleList.includes(
                n.GetRoleId(),
              ),
            };
            t.Apply(e),
              t.BindOnExtendToggleClicked(this.lho),
              n.IsTrialRole() ||
              void 0 !== RoguelikeSelectRoleGrid.CurSelectRoleItem
                ? t.SetSelected(!1, !1)
                : ((RoguelikeSelectRoleGrid.CurSelectRoleItem = t).SetSelected(
                    !0,
                    !1,
                  ),
                  (ModelManager_1.ModelManager.RoguelikeModel.EditFormationRoleList =
                    [n.GetRoleId()]));
          }),
            this.RoleItemList.set(e.GetRoleId(), t);
        }
      }),
      this.GetItem(2).SetUIActive(!1),
      this.Data.Type)
    ) {
      case 1:
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "Rogue_juesexuanze_02",
        );
        break;
      case 0:
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "Rogue_juesexuanze_01",
        );
        break;
      case 2:
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "Rogue_juesexuanze_03",
        );
    }
  }
  ClearItem() {
    this.Destroy();
  }
}
(exports.RoguelikeSelectRoleGrid = RoguelikeSelectRoleGrid).CurSelectRoleItem =
  void 0;
class RoguelikeSelectRoleBaseGrid extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.eqe = void 0);
  }
  GetItemSize(e) {
    void 0 === this.eqe && (this.eqe = Vector2D_1.Vector2D.Create());
    var i = this.GetRootItem();
    return this.eqe.Set(i.GetWidth(), i.GetHeight()), this.eqe.ToUeVector2D(!0);
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
  }
  ClearItem() {}
}
exports.RoguelikeSelectRoleBaseGrid = RoguelikeSelectRoleBaseGrid;
class RoguelikeSelectRoleData {
  constructor(e, i, t, o) {
    (this.Type = 1),
      (this.RoleIdList = []),
      (this.LimitRoleList = []),
      (this.RecommendedRoleList = []),
      (this.Type = e),
      (this.RoleIdList = i),
      t && (this.LimitRoleList = t),
      o && (this.RecommendedRoleList = o);
  }
}
exports.RoguelikeSelectRoleData = RoguelikeSelectRoleData;
//# sourceMappingURL=RoguelikeSelectRoleView.js.map
