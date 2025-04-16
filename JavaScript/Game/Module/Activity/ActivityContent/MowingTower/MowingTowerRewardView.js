"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingTowerRewardView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class MowingTowerRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.mll = void 0),
      (this.dll = void 0),
      (this.H3e = void 0),
      (this.bLl = void 0),
      (this.SPe = void 0),
      (this.JLl = () => {
        var e = new MowingTowerRewardTabItem();
        return e.SetClickCallBack(this.gll), e;
      }),
      (this.ZLl = () => {
        return new MowingTowerRewardItem();
      }),
      (this.gll = (e) => {
        this.dll?.SetToggleUnCheck(), (this.dll = e), this.Z3e();
      }),
      (this.Z3e = () => {
        this.H3e?.RefreshByData(
          this.bLl.GetRewardByLevelId(this.dll?.GetLevelId()),
          () => {
            var e = this.mll?.GetLayoutItemList();
            if (e)
              for (const t of e)
                t.SetRedDotActive(
                  this.bLl.HaveLevelRewardCanTake(t.GetLevelId() ?? 0),
                );
          },
          !0,
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
    ];
  }
  OnStart() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      this.lqe.SetTitleByTextIdAndArgNew("MowingTowerRewardViewTitle"),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshMowingTowerReward,
        this.Z3e,
      ),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.mll = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(1),
        this.JLl,
      )),
      (this.H3e = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(3),
        this.ZLl,
      ));
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      ModelManager_1.ModelManager.MowingTowerModel.CurrentSelectActivityId,
    );
    this.bLl = e;
  }
  OnBeforeShow() {
    this.mll?.RefreshByData(this.bLl.GetMowingTowerLevelDetailInfo(), () => {
      var e = this.mll?.GetLayoutItemList();
      if (e)
        for (const t of e)
          t.SetRedDotActive(
            this.bLl.HaveLevelRewardCanTake(t.GetLevelId() ?? 0),
          );
    }),
      this.SPe?.PlayLevelSequenceByName("Start");
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshMowingTowerReward,
      this.Z3e,
    );
  }
}
exports.MowingTowerRewardView = MowingTowerRewardView;
class MowingTowerRewardTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.m_i = void 0),
      (this.ClickCallBack = void 0),
      (this.kqe = () => {
        this.ClickCallBack?.(this);
      });
  }
  SetClickCallBack(e) {
    this.ClickCallBack = e;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  Refresh(e, t, i) {
    (this.m_i = e),
      0 === i
        ? (this.ClickCallBack?.(this),
          this.GetExtendToggle(0).SetToggleState(1))
        : this.SetToggleUnCheck();
    i = e.GetConfig();
    i &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.RewardName),
      this.SetTextureByPath(i.RewardTexture, this.GetTexture(2)));
  }
  SetToggleUnCheck() {
    this.GetExtendToggle(0).SetToggleState(0);
  }
  GetLevelId() {
    return this.m_i?.GetId();
  }
  SetRedDotActive(e) {
    this.GetItem(3)?.SetUIActive(e);
  }
}
class MowingTowerRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.$Tt = void 0),
      (this.s4e = void 0),
      (this.W2e = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.nqe = () => {
        this.$Tt?.ClickFunction?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.nqe]]);
  }
  OnStart() {
    this.s4e = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(2),
      this.W2e,
    );
  }
  Refresh(e, t, i) {
    (this.$Tt = e).NameTextArgs &&
      (this.GetText(1).SetText(e.NameTextArgs[1] + "/" + e.NameTextArgs[0]),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        "BossRushRewardText",
        e.NameTextArgs[0],
      )),
      this.GetButton(4).RootUIComp.SetUIActive(1 === e.RewardState),
      this.GetItem(5)?.SetUIActive(0 === e.RewardState),
      this.GetItem(6)?.SetUIActive(2 === e.RewardState),
      this.s4e?.RefreshByData(e.RewardList ?? []);
  }
}
//# sourceMappingURL=MowingTowerRewardView.js.map
