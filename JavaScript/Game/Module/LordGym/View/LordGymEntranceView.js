"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymEntranceView = void 0);
const ue_1 = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  HelpController_1 = require("../../Help/HelpController"),
  PayShopDefine_1 = require("../../PayShop/PayShopDefine"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  LordGymController_1 = require("../LordGymController"),
  LordGymItem_1 = require("./LordGymItem");
class LordGymEntranceView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.jSi = 0),
      (this.WSi = void 0),
      (this.KSi = 0),
      (this.O3e = 0),
      (this.QSi = !1),
      (this.XSi = 0),
      (this.$Si = void 0),
      (this.u6e = void 0),
      (this.YSi = () => {
        return new LordGymItem_1.LordGymItem(this.JSi, this.zSi);
      }),
      (this.rOe = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.xhi = () => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.ZSi = () => {
        0 < this.O3e && HelpController_1.HelpController.OpenHelpById(this.O3e);
      }),
      (this.eEi = () => {
        LordGymController_1.LordGymController.LordGymBeginRequest(
          this.KSi,
        ).then((e) => {
          e && this.CloseMe();
        });
      }),
      (this.tEi = () => {
        UiManager_1.UiManager.OpenView("LordGymChallengeRecordView");
      }),
      (this.iEi = () => {
        ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(
          5,
          PayShopDefine_1.LORD_GYM_TAB_INDEX,
        );
      }),
      (this.JSi = (e) => {
        this.KSi = e;
        var i = this.$Si?.GetGenericLayout(),
          t = i?.GetLayoutItemByKey(this.KSi),
          i =
            (i?.SelectGridProxy(t.GridIndex),
            ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(e)),
          r =
            (LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(6),
              "Text_InstanceDungeonRecommendLevel_Text",
              i.MonsterLevel.toString(),
            ),
            i.RewardId),
          r =
            ((this.QSi =
              !ModelManager_1.ModelManager.ExchangeRewardModel.GetRewardIfCanExchange(
                r,
              )),
            ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
              r,
            ));
        const s = ModelManager_1.ModelManager.LordGymModel?.GetLordGymIsFinish(
          this.KSi,
        );
        this.u6e.RefreshByDataAsync(r).finally(() => {
          for (const e of this.u6e.GetScrollItemList()) e.SetReceivedVisible(s);
        }),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(15),
            i.PlayDescription,
          ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.GymTitle);
        var r = ModelManager_1.ModelManager.LordGymModel.LordGymRecord.get(
            this.KSi,
          ),
          r =
            (void 0 !== r
              ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(24),
                  "BestPassTime",
                  TimeUtil_1.TimeUtil.GetTimeString(r.EAs),
                )
              : LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(24),
                  "NoPassRecord",
                ),
            i.HelpId
              ? (this.GetButton(10).RootUIComp.SetUIActive(!0),
                (this.O3e = i.HelpId))
              : this.GetButton(10).RootUIComp.SetUIActive(!1),
            !ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(
              this.KSi,
            )),
          o = ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(
            this.KSi,
          ),
          a = i.MonsterLevel > this.oEi();
        this.GetItem(20).SetUIActive(r || !o),
          this.GetItem(25).SetUIActive(a && !r && o),
          this.GetButton(19).RootUIComp.SetUIActive(!(r || !o)),
          r
            ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(21),
                i.LockDescription,
              )
            : o
              ? a &&
                LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(21),
                  "LordGymLowLevel",
                )
              : LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(21),
                  "LordGymLockTips",
                ),
          this.QSi
            ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(22),
                "Text_ButtonTextChallengeOneMore_Text",
              )
            : LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(22),
                "Text_StartBattle_Text",
              ),
          ModelManager_1.ModelManager.LordGymModel.GetLordGymHasRead(e) ||
            r ||
            !o ||
            (LordGymController_1.LordGymController.ReadLordGym(e),
            t?.RefreshByLordId(e));
      }),
      (this.zSi = (e) => this.KSi !== e);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, ue_1.UIText],
      [1, ue_1.UIButtonComponent],
      [2, ue_1.UIScrollViewWithScrollbarComponent],
      [3, ue_1.UIItem],
      [4, ue_1.UIItem],
      [5, ue_1.UIText],
      [6, ue_1.UIText],
      [7, ue_1.UITexture],
      [8, ue_1.UITexture],
      [9, ue_1.UITexture],
      [10, ue_1.UIButtonComponent],
      [11, ue_1.UIItem],
      [12, ue_1.UIItem],
      [13, ue_1.UIText],
      [14, ue_1.UIText],
      [15, ue_1.UIText],
      [16, ue_1.UIScrollViewWithScrollbarComponent],
      [17, ue_1.UIItem],
      [18, ue_1.UIButtonComponent],
      [19, ue_1.UIButtonComponent],
      [21, ue_1.UIText],
      [20, ue_1.UIItem],
      [22, ue_1.UIText],
      [23, ue_1.UIButtonComponent],
      [24, ue_1.UIText],
      [25, ue_1.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.xhi],
        [10, this.ZSi],
        [19, this.eEi],
        [18, this.tEi],
        [23, this.iEi],
      ]);
  }
  async rEi() {
    (this.$Si = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(2),
      this.YSi,
    )),
      (this.u6e = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(16),
        this.rOe,
      )),
      (this.jSi = this.OpenParam),
      (this.WSi =
        ModelManager_1.ModelManager.LordGymModel.GetLordGymEntranceList(
          this.jSi,
        )),
      this.WSi && 0 !== this.WSi.length
        ? await this.$Si.RefreshByDataAsync(this.WSi)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelPlay", 50, "获取领主道馆入口信息失败！", [
            "领主道馆入口Id:",
            this.jSi,
          ]);
  }
  async OnBeforeStartAsync() {
    await this.rEi();
  }
  OnStart() {
    var e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(
        this.WSi[0],
      ).MonsterList[0],
      e =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceName(
            this.jSi,
          ),
        ),
        ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterBigIcon(e));
    this.SetTextureByPath(e, this.GetTexture(9)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "SpecialRule"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), "FirstPassReward"),
      this.nEi();
  }
  nEi() {
    (this.XSi = this.WSi[0]),
      this.WSi.forEach((e) => {
        ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(e) &&
          ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(e) &&
          e >= this.XSi &&
          (this.XSi = e);
      });
    var e = this.$Si?.GetGenericLayout(),
      i = e?.GetLayoutItemByKey(this.XSi);
    e?.SelectGridProxy(i.GridIndex), this.JSi(this.XSi);
  }
  OnBeforeDestroy() {
    (this.$Si = void 0), (this.u6e = void 0);
  }
  oEi() {
    let e = 0,
      i = 0;
    for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()) {
      var t = r.Entity?.GetComponent(156);
      t &&
        ((e += t.GetCurrentValue(
          CharacterAttributeTypes_1.EAttributeId.Proto_Lv,
        )),
        i++);
    }
    return i ? e / i : 0;
  }
}
exports.LordGymEntranceView = LordGymEntranceView;
//# sourceMappingURL=LordGymEntranceView.js.map
