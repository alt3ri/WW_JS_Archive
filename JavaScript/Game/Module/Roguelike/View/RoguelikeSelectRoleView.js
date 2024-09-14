"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeSelectRoleData =
    exports.RoguelikeSelectRoleBaseGrid =
    exports.RoguelikeSelectRoleGrid =
    exports.RogueRoleSelectionItemGrid =
    exports.RogueAddLevelComponent =
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
  FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  MediumItemGridComponent_1 = require("../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridComponent"),
  HelpController_1 = require("../../Help/HelpController"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  RoleDataBase_1 = require("../../RoleUi/RoleData/RoleDataBase"),
  RoleDefine_1 = require("../../RoleUi/RoleDefine"),
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
      (this.Jho = void 0),
      (this.zho = []),
      (this.ShowRoleList = []),
      (this.yDn = []),
      (this.NUe = 0),
      (this.IDn = void 0),
      (this.WJs = 1),
      (this.xVi = void 0),
      (this.vNt = void 0),
      (this.Zho = void 0),
      (this.cya = 0),
      (this.mya = 0),
      (this.UQ = 0),
      (this.HUa = !0),
      (this.Gua = (t, e, i) => {
        this.HUa ||
          this.DynamicScrollViewComponent.GetScrollItemItems().forEach((e) => {
            1 === e.Data?.Type && ((e.Data.RoleIdList = t), e.RefreshData());
          });
      }),
      (this.Bqe = (e, t, i) => {
        e = new RoguelikeSelectRoleGrid(e);
        return e.BindSelectRoleCallBack(this.TDn), e;
      }),
      (this.TDn = (e, t) => {
        this.IDn = e;
        var i =
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
          s =
            0 < this.cya && this.cya > e.GetLevelData().GetLevel()
              ? this.cya
              : e.GetLevelData().GetLevel(),
          r = e.GetDataId(),
          n =
            void 0 !==
            ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(r),
          o = o.LimitRole.includes(r),
          s = s < i && o && n,
          i = r > RoleDefine_1.ROBOT_DATA_MIN_ID || (o && n),
          r =
            (n
              ? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
                  e.GetDataId(),
                ).GetLevel()
              : 0) < this.mya &&
            !e.IsTrialRole() &&
            n &&
            o,
          e =
            e.GetLevelData().GetLevel() < this.cya &&
            !e.IsTrialRole() &&
            n &&
            o;
        this.GetItem(9).SetUIActive(s),
          this.GetButton(10).RootUIComp.SetUIActive(i),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(14),
            "Text_RoleAddLevel_Text",
            this.cya,
          ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(15),
            "Text_WeaponAddLevel_Text",
            this.mya,
          ),
          this.GetText(15).SetUIActive(r),
          this.GetText(14).SetUIActive(e),
          this.GetItem(13).SetUIActive(e || r);
      }),
      (this.tlo = () => {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RevertEntranceFlowStep(),
          this.CloseMe();
      }),
      (this.ilo = () => {
        var e = this.OpenParam,
          e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
        ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
          e.FightFormationId,
        ).LimitRole.includes(this.IDn.GetRoleId())
          ? ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
              this.IDn.GetDataId(),
            )
            ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow()
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "Rogue_Dont_Have_Role",
              )
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "Roguelike_SelectRole_CannotUse",
            );
      }),
      (this.olo = (e) => {
        let t = RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE;
        for (const s of (this.Zho.BHn = e)) {
          var i =
            ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikePopularEntriesById(
              s,
            );
          i && (t += i.Rate);
        }
        let o = UE.Color.FromHex("adadad");
        t > RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE
          ? (o = UE.Color.FromHex("c25757"))
          : t < RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE &&
            (o = UE.Color.FromHex("36cd33")),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(11),
            "Rogue_Entry_Multiple",
            t / 100,
          ),
          this.GetText(11)?.SetColor(o);
      }),
      (this.rlo = () => {
        UiManager_1.UiManager.OpenView(
          "RoguelikeInstanceEntrySelectView",
          this.Zho,
        );
      }),
      (this.nlo = () => {
        2 === this.WJs
          ? RoleController_1.RoleController.OpenRoleMainView(1, 0, [
              this.IDn.GetDataId(),
            ])
          : RoleController_1.RoleController.OpenRoleMainView(0, 0, [
              this.IDn.GetDataId(),
            ]);
      }),
      (this.JGn = () => {
        HelpController_1.HelpController.OpenHelpById(
          RoguelikeDefine_1.ROGUELIKE_HELP_ID,
        );
      });
  }
  OnBeforeCreate() {
    this.xVi = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(8);
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
      [13, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [1, this.tlo],
        [2, this.ilo],
        [8, this.rlo],
        [10, this.nlo],
        [12, this.JGn],
      ]);
  }
  async OnBeforeStartAsync() {
    this.NUe = this.OpenParam;
    var e, t;
    await Promise.all([
      (e =
        await RoguelikeController_1.RoguelikeController.RoguelikePopularEntriesInfoRequest(
          this.NUe,
        )),
      (t =
        await RoguelikeController_1.RoguelikeController.RoguelikeTrialRoleInfoRequest(
          this.NUe,
        )),
    ]),
      (this.yDn = t.Rqs),
      (this.cya = t.Ebs),
      (this.mya = t.Cjn),
      (this.UQ = t.wJs),
      (this.Zho = e.sqs),
      this.olo(e.sqs.BHn),
      (this.Jho = new RoguelikeSelectRoleBaseGrid()),
      (this.DynamicScrollViewComponent = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(3),
        this.GetItem(4),
        this.Jho,
        this.Bqe,
      )),
      await this.DynamicScrollViewComponent.Init(),
      this.GetButton(8)?.GetRootComponent()?.SetUIActive(this.ITn()),
      (this.vNt = new FilterSortEntrance_1.FilterSortEntrance(
        this.GetItem(5),
        this.Gua,
      ));
  }
  OnStart() {
    (RoguelikeSelectRoleGrid.CurSelectRoleItem = void 0),
      this.InitRoleList(),
      (this.HUa = !1);
  }
  InitRoleList() {
    var e = this.OpenParam,
      e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    const s =
      ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
        e.FightFormationId,
      );
    e = this.GetTrailRoleInstanceList(this.yDn);
    0 < e.length &&
      this.zho.push(
        new RoguelikeSelectRoleData(
          0,
          e,
          this.cya,
          this.mya,
          this.UQ,
          s.LimitRole,
        ),
      );
    const r = s.LimitRole,
      i = ModelManager_1.ModelManager.RoleModel.GetRoleList();
    (e = ConfigManager_1.ConfigManager.RoleConfig?.GetRoleList()),
      (ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewShowRoleList =
        r),
      (ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewRecommendRoleList =
        s.RecommendFormation),
      (e = e.filter(
        (e) =>
          1 === e.RoleType &&
          !ModelManager_1.ModelManager.RoleModel.IsMainRole(e.Id),
      ));
    const o = [];
    r.forEach((t) => {
      (ModelManager_1.ModelManager.RoleModel.IsMainRole(t) &&
        !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t)) ||
        (void 0 !== i.find((e) => e.GetRoleId() === t)
          ? o.push(i.find((e) => e.GetRoleId() === t))
          : o.push(new RoleInstance_1.RoleInstance(t)));
    });
    e = e.filter((e) => !r.includes(e.Id));
    const n = [];
    e.forEach((t) => {
      void 0 !== i.find((e) => e.GetRoleId() === t.Id)
        ? n.push(i.find((e) => e.GetRoleId() === t.Id))
        : n.push(new RoleInstance_1.RoleInstance(t.Id));
    });
    e = (e, t) => {
      var i,
        o = r.includes(e.GetRoleId()) && 0 !== e.GetLevelData().GetLevel();
      return o !==
        (r.includes(t.GetRoleId()) && 0 !== t.GetLevelData().GetLevel()) ||
        (o = s.RecommendFormation.includes(e.GetRoleId())) !==
          s.RecommendFormation.includes(t.GetRoleId())
        ? o
          ? -1
          : 1
        : (o = e.GetLevelData().GetLevel()) !==
            (i = t.GetLevelData().GetLevel())
          ? i < o
            ? -1
            : 1
          : (i = e.GetRoleConfig().QualityId) !==
              (o = t.GetRoleConfig().QualityId)
            ? o < i
              ? -1
              : 1
            : ((o = e.GetRoleId()),
              (i = t.GetRoleId()) < o ? -1 : o < i ? 1 : 0);
    };
    n.sort(e),
      o.sort(e),
      this.zho.push(
        new RoguelikeSelectRoleData(
          1,
          o,
          this.cya,
          this.mya,
          this.UQ,
          r,
          s.RecommendFormation,
        ),
      ),
      this.zho.push(
        new RoguelikeSelectRoleData(
          2,
          n,
          this.cya,
          this.mya,
          this.UQ,
          r,
          s.RecommendFormation,
        ),
      ),
      0 < o.length
        ? ((this.IDn = o[0]), (this.WJs = 1))
        : 0 < n.length
          ? ((this.IDn = n[0]), (this.WJs = 2))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Roguelike",
              59,
              "RoguelikeSelectRoleView没有角色数据",
            ),
      this.DynamicScrollViewComponent.RefreshByData(this.zho),
      this.vNt?.UpdateData(34, o);
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.xVi);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoguelikePopularEntriesChange,
      this.olo,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoguelikePopularEntriesChange,
      this.olo,
    );
  }
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()
      .Model?.CheckGetComponent(1)
      ?.SetTransformByTag("RoleCase"),
      RoleController_1.RoleController.OnSelectedRoleChangeByConfig(
        this.IDn.GetRoleId(),
      ),
      this.TDn(this.IDn, this.WJs);
  }
  GetTrailRoleInstanceList(e) {
    const t = [];
    return (
      e.forEach((e) => {
        e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
          ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(
            e,
          ),
        );
        void 0 !== e && t.push(e);
      }),
      t
    );
  }
  ITn() {
    for (const e of ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikePopularEntries())
      if (e.Insts.includes(this.Zho.r6n)) return !0;
    return !1;
  }
}
exports.RoguelikeSelectRoleView = RoguelikeSelectRoleView;
class RogueAddLevelComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
  GetResourceId() {
    return "UiItem_ItemRogueRoleType";
  }
  OnRefresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      "Text_LevelShow_Text",
      e,
    );
  }
}
exports.RogueAddLevelComponent = RogueAddLevelComponent;
class RogueRoleSelectionItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, t, i) {
    var o = e.GetDataId(),
      o =
        void 0 !==
        ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(o, {
          ParamType: 0,
        }),
      o = {
        Type: 2,
        Data: e,
        ItemConfigId: e.GetRoleId(),
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [e.GetLevelData().GetLevel()],
        IsInTeam: o,
        ElementId: e.GetRoleConfig().ElementId,
        IsTrialRoleVisible: e.IsTrialRole(),
        IsNewVisible: e.GetIsNew(),
      };
    this.Apply(o), this.SetSelected(t);
  }
  OnSelected(e) {
    this.SetSelected(!0),
      this.SetNewVisible(!1),
      this.Data instanceof RoleDataBase_1.RoleDataBase &&
        this.Data.TryRemoveNewFlag();
  }
  SetAddLevelComponent(e, t, i) {
    var o = this.Data.GetLevelData().GetLevel(),
      o = Math.max(o, e),
      e = this.RefreshComponent(RogueAddLevelComponent, !0, o);
    this.SetComponentVisible(e, i);
  }
  OnDeselected(e) {
    this.SetSelected(!1, !0);
  }
}
exports.RogueRoleSelectionItemGrid = RogueRoleSelectionItemGrid;
class RoguelikeSelectRoleGrid extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.RoleItemList = []),
      (this.Data = void 0),
      (this.LDn = void 0),
      (this.slo = (e) => {
        var t;
        0 === e.State &&
          ((t = e.Data).IsTrialRole()
            ? (ModelManager_1.ModelManager.RoguelikeModel.EditFormationRoleList =
                [t.GetDataId()])
            : (ModelManager_1.ModelManager.RoguelikeModel.EditFormationRoleList =
                [t.GetRoleId()]),
          RoguelikeSelectRoleGrid.CurSelectRoleItem &&
            RoguelikeSelectRoleGrid.CurSelectRoleItem.SetSelected(!1, !1),
          (RoguelikeSelectRoleGrid.CurSelectRoleItem = e.MediumItemGrid),
          RoleController_1.RoleController.OnSelectedRoleChangeByConfig(
            t.GetDataId(),
          ),
          this.LDn) &&
          this.LDn(t, this.Data.Type);
      }),
      (this.Data = e);
  }
  BindSelectRoleCallBack(e) {
    this.LDn = e;
  }
  GetUsingItem(e) {
    return this.GetRootItem().GetOwner();
  }
  Update(e, t) {
    (this.Data = e), this.RefreshData();
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
  async RefreshData() {
    var t,
      i,
      o,
      s = (e, t) => {
        var i =
            (0 < this.Data.LimitRoleList.length &&
              !this.Data.LimitRoleList.includes(t.GetRoleId())) ||
            0 === t.GetLevelData().GetLevel(),
          o =
            void 0 !==
            ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
              t.GetDataId(),
            ),
          s = this.Data.LimitRoleList.includes(t.GetDataId()),
          r =
            (o
              ? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
                  t.GetDataId(),
                ).GetLevel()
              : 0) < this.Data.AddWeaponLevel &&
            !t.IsTrialRole() &&
            o &&
            s,
          o =
            t.GetLevelData().GetLevel() < this.Data.AddRoleLevel &&
            !t.IsTrialRole() &&
            o &&
            s,
          s = {
            Type: 2,
            Data: t,
            ItemConfigId: t.GetRoleId(),
            BottomTextId:
              (!o && !r) || i || t.IsTrialRole()
                ? 0 !== t.GetLevelData().GetLevel()
                  ? "Text_LevelShow_Text"
                  : "Text_Role_Not_Have"
                : "",
            BottomTextParameter: [t.GetLevelData().GetLevel()],
            ElementId: t.GetRoleConfig().ElementId,
            IsTrialRoleVisible: t.IsTrialRole(),
            IsNewVisible: !1,
            IsDisable: i,
            IsRecommendVisible: this.Data.RecommendedRoleList.includes(
              t.GetRoleId(),
            ),
          };
        e.Apply(s),
          e.BindOnExtendToggleClicked(this.slo),
          e?.SetAddLevelComponent(
            this.Data.AddRoleLevel,
            this.Data.MaxLevel,
            o || r,
          );
      };
    for (let e = 0; e < this.Data.RoleIdList.length; e++)
      this.RoleItemList.length <= e
        ? ((t = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1))),
          (i = new RogueRoleSelectionItemGrid()),
          (o = this.Data?.RoleIdList[e]),
          this.RoleItemList.push(i),
          await i.CreateThenShowByActorAsync(t.GetOwner()),
          s(i, o),
          o.IsTrialRole() ||
          void 0 !== RoguelikeSelectRoleGrid.CurSelectRoleItem
            ? i.SetSelected(!1, !1)
            : ((RoguelikeSelectRoleGrid.CurSelectRoleItem = i).SetSelected(
                !0,
                !1,
              ),
              (ModelManager_1.ModelManager.RoguelikeModel.EditFormationRoleList =
                [o.GetRoleId()])))
        : s(this.RoleItemList[e], this.Data?.RoleIdList[e]),
        this.RoleItemList[e].SetActive(!0);
    for (let e = this.Data.RoleIdList.length; e < this.RoleItemList.length; e++)
      this.RoleItemList[e].SetActive(!1);
    switch ((this.GetItem(2).SetUIActive(!1), this.Data.Type)) {
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
    var t = this.GetRootItem();
    return this.eqe.Set(t.GetWidth(), t.GetHeight()), this.eqe.ToUeVector2D(!0);
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
  }
  ClearItem() {}
}
exports.RoguelikeSelectRoleBaseGrid = RoguelikeSelectRoleBaseGrid;
class RoguelikeSelectRoleData {
  constructor(e, t, i, o, s, r, n) {
    (this.Type = 1),
      (this.RoleIdList = []),
      (this.LimitRoleList = []),
      (this.RecommendedRoleList = []),
      (this.AddRoleLevel = 0),
      (this.AddWeaponLevel = 0),
      (this.MaxLevel = 0),
      (this.Type = e),
      (this.RoleIdList = t),
      (this.AddRoleLevel = i),
      (this.AddWeaponLevel = o),
      (this.MaxLevel = s),
      r && (this.LimitRoleList = r),
      n && (this.RecommendedRoleList = n);
  }
}
exports.RoguelikeSelectRoleData = RoguelikeSelectRoleData;
//# sourceMappingURL=RoguelikeSelectRoleView.js.map
