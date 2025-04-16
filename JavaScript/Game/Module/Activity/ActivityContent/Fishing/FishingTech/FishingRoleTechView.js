"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingRoleTechView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiTabViewBase_1 = require("../../../../../Ui/Base/UiTabViewBase"),
  LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  FishingController_1 = require("../FishingController"),
  FishingDefine_1 = require("../FishingDefine"),
  FishingRoleTechItem_1 = require("./FishingRoleTechItem"),
  FishingTechCostItem_1 = require("./FishingTechCostItem"),
  FishingTechLevelUpItem_1 = require("./FishingTechLevelUpItem");
class FishingRoleTechView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.kpo = 0),
      (this.xz = void 0),
      (this.oul = void 0),
      (this.rul = void 0),
      (this.rh_ = void 0),
      (this.s4e = void 0),
      (this.ebl = void 0),
      (this.oh_ = void 0),
      (this.U1a = void 0),
      (this.SPe = void 0),
      (this.ytc = 0),
      (this.th_ = (e) => {
        (this.ebl = void 0),
          this.Og(this.kpo),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh,
            e,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnFishingRoleTechRefresh,
            this.kpo,
          );
      }),
      (this.IK_ = () => {
        this.kpo && this.Og(this.kpo);
      }),
      (this.nh_ = (e) => {
        5 !== this.kpo &&
          (this.Og(5), this.oh_?.SetToggleState(0, !1), (this.oh_ = e));
      }),
      (this.sh_ = (e) => {
        4 !== this.kpo &&
          (this.Og(4), this.oh_?.SetToggleState(0, !1), (this.oh_ = e));
      }),
      (this.ih_ = () => {
        this.xz &&
          FishingController_1.FishingController.RequestFishingTechLevelUp(
            this.xz.ConfigId,
          );
      }),
      (this.sGe = () => {
        return new FishingTechLevelUpItem_1.FishingTechLevelUpItem();
      }),
      (this.ah_ = () => {
        var e = new FishingRoleTechItem_1.FishingRoleTechItem();
        return (e.OnClickToggleBack = this.hh_), e;
      }),
      (this.hh_ = (t, s) => {
        this.ebl?.SetToggleState(0, !1), (this.ebl = s), (this.xz = t);
        s = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(
          t.ConfigId,
        );
        if (s) {
          t = ModelManager_1.ModelManager.FishingModel.GetTechNodeCurrentLevel(
            t.ConfigId,
          );
          if (s.Effect.length <= t)
            this.GetHorizontalLayout(6).RootUIComp.SetUIActive(!1),
              this.GetItem(10).SetUIActive(!0),
              this.GetButton(8).RootUIComp.SetUIActive(!1),
              this.U1a?.SetUiActive(!1),
              this.GetItem(14).SetUIActive(!1);
          else {
            this.GetItem(14).SetUIActive(!0),
              this.GetHorizontalLayout(6).RootUIComp.SetUIActive(!0),
              this.GetItem(10).SetUIActive(!1);
            var s = s.Effect[t],
              h = [];
            let e = !1,
              i = !0;
            for (const o of ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(
              s,
            ).Consume) {
              var n =
                ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
                  o[0],
                );
              (i = i && n >= o[1]),
                (e = !0),
                o[0] === FishingDefine_1.FISHING_CURRENCY_ITEMID
                  ? this.U1a?.RefreshCost(o[0], o[1], !1)
                  : ((n = { ItemId: o[0], ItemNeedNum: o[1] }), h.push(n));
            }
            this.GetButton(8).RootUIComp.SetUIActive(i),
              this.GetItem(9).SetUIActive(!i),
              this.s4e?.RefreshByData(h),
              this.U1a?.SetUiActive(e);
          }
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [2, UE.UIItem],
      [1, UE.UIItem],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIHorizontalLayout],
      [7, UE.UIItem],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[8, this.ih_]]);
  }
  async OnBeforeStartAsync() {
    (this.oul = new RoleTechToggle()),
      await this.oul.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
      (this.rul = new RoleTechToggle()),
      await this.rul.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      (this.oul.OnClickToggleBack = this.nh_),
      (this.rul.OnClickToggleBack = this.sh_),
      RedDotController_1.RedDotController.BindRedDot(
        "FishingRoleToggleTech",
        this.GetItem(12),
        void 0,
        5,
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "FishingRoleToggleTech",
        this.GetItem(11),
        void 0,
        4,
      ),
      (this.rh_ = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(3),
        this.ah_,
      )),
      (this.s4e = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(6),
        this.sGe,
      )),
      (this.U1a = new FishingTechCostItem_1.FishingTechCostItem()),
      await this.U1a.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
      this.U1a.RefreshCost(FishingDefine_1.FISHING_CURRENCY_ITEMID, 0, !1),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnStart() {
    this.oul?.RefreshItem(5), this.rul?.RefreshItem(4);
    var i = this.ExtraParams;
    if (i) {
      this.ytc = i;
      let e = !1;
      for (const t of ModelManager_1.ModelManager.FishingModel.RoleTechNodeMap.get(
        5,
      ))
        if (t.ConfigId === i) {
          this.oul?.SelectToggle(), (e = !0);
          break;
        }
      e || this.rul?.SelectToggle();
    } else this.rul?.SelectToggle();
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.FishingRoleTechViewOpened,
    ),
      ModelManager_1.ModelManager.FunctionModel.IsOpen(100781) ||
        this.GetItem(13).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "FishingRoleToggleTech",
      this.GetItem(12),
      5,
    ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "FishingRoleToggleTech",
        this.GetItem(11),
        4,
      );
  }
  OnBeforeShow() {
    this.SPe?.PlayLevelSequenceByName("Switch");
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnFishingTechNodeRefresh,
      this.th_,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FishingTechViewComeBack,
        this.IK_,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFishingTechNodeRefresh,
      this.th_,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FishingTechViewComeBack,
        this.IK_,
      );
  }
  Og(e) {
    this.kpo = e;
    let i = "";
    i =
      4 === this.kpo
        ? 0 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()
          ? FishingDefine_1.FISHING_FEMALE_TEXTURE
          : FishingDefine_1.FISHING_MALE_TEXTURE
        : FishingDefine_1.FISHING_PHOEBE_TEXTURE;
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i),
      t =
        (this.SetTextureByPath(t, this.GetTexture(0)),
        ModelManager_1.ModelManager.FishingModel.RoleTechNodeMap.get(e) ?? []);
    this.rh_?.RefreshByData(t, () => {
      this.rh_?.GetUiAnimController()?.Play();
      for (const e of this.rh_?.GetLayoutItemList())
        if ((!this.ytc && e.Node === this.xz) || e.Node?.ConfigId === this.ytc)
          return (this.ytc = 0), void e.SelectToggle();
      this.rh_?.GetLayoutItemByIndex(0)?.SelectToggle();
    });
  }
}
exports.FishingRoleTechView = FishingRoleTechView;
class RoleTechToggle extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.OnClickToggleBack = void 0),
      (this.kqe = () => {
        this.OnClickToggleBack?.(this.GetExtendToggle(0));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  RefreshItem(e) {
    let i = "";
    i =
      4 === e
        ? 0 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()
          ? FishingDefine_1.FISHING_FEMALE_ICON_SPRITE
          : FishingDefine_1.FISHING_MALE_ICON_SPRITE
        : FishingDefine_1.FISHING_PHOEBE_ICON_SPRITE;
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetSpriteByPath(e, this.GetSprite(1), !1);
  }
  SelectToggle() {
    this.GetExtendToggle(0).SetToggleState(1, !0);
  }
}
//# sourceMappingURL=FishingRoleTechView.js.map
