"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerHardLevelChoseItem = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class BabelTowerHardLevelChoseItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.gQl = !1),
      (this.y1c = !1),
      (this.yq = 0),
      (this.tFe = void 0),
      (this.OnClickButtonCallBack = void 0),
      (this.FTc = void 0),
      (this.nqe = (e) => {
        this.gQl && this.OnClickButtonCallBack?.(this.yq),
          this.FTc.StopCurrentSequence();
      }),
      (this.S1c = (e) => {
        UiManager_1.UiManager.OpenView("BabelTowerResetView", this.yq);
      }),
      (this.nFe = () => new RoleItem());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [3, UE.UIText],
      [2, UE.UIText],
      [1, UE.UITexture],
      [5, UE.UIItem],
      [4, UE.UIText],
      [12, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIHorizontalLayout],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIButtonComponent],
      [13, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UITexture],
      [16, UE.UITexture],
      [17, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.nqe],
        [11, this.S1c],
      ]);
  }
  OnStart() {
    (this.tFe = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(8),
      this.nFe,
    )),
      (this.FTc = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  Refresh(e, t, i) {
    this.GetText(2).SetText(i + 1 + ""),
      (this.yq = e.ELl),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(10).SetUIActive(!1);
    let s = 1;
    for (const o of e.dt1) {
      const r =
        ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerBuff(o);
      1 === s &&
        (this.GetItem(9).SetUIActive(!0),
        this.SetTextureByPath(r.Texture, this.GetTexture(15))),
        2 === s &&
          (this.GetItem(10).SetUIActive(!0),
          this.SetTextureByPath(r.Texture, this.GetTexture(16))),
        s++;
    }
    const r =
      ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
        e.ELl,
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), r.NameText),
      StringUtils_1.StringUtils.IsEmpty(r.DesText)
        ? this.GetText(4).SetUIActive(!1)
        : (this.GetText(4).SetUIActive(!0),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r.DesText)),
      this.SetTextureByPath(r.Texture, this.GetTexture(1));
    (i = e.dMs),
      this.GetItem(5).SetUIActive(i),
      this.GetItem(6).SetUIActive(!i),
      this.GetButton(11).RootUIComp.SetUIActive(i),
      i &&
        (this.GetText(7).SetText(e.jX_ + ""), this.tFe?.RefreshByData(e.ut1)),
      (i = MathUtils_1.MathUtils.LongToNumber(e.yzs));
    (this.gQl = i <= TimeUtil_1.TimeUtil.GetServerTimeStamp()),
      this.GetItem(12).SetUIActive(this.gQl),
      this.GetItem(13).SetUIActive(!this.gQl),
      this.gQl ||
        ((e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(
          (i - TimeUtil_1.TimeUtil.GetServerTimeStamp()) *
            TimeUtil_1.TimeUtil.Millisecond,
        )),
        this.GetText(14).SetText(e.CountDownText)),
      this.y1c
        ? RedDotController_1.RedDotController.UnBindGivenUi(
            "BabelTowerNewLevel",
            this.GetItem(17),
            this.yq,
          )
        : (this.y1c = !0),
      RedDotController_1.RedDotController.BindRedDot(
        "BabelTowerNewLevel",
        this.GetItem(17),
        void 0,
        this.yq,
      ),
      ModelManager_1.ModelManager.BabelTowerModel.LevelChoseHandle === this.yq
        ? this.PlayLoopSequence()
        : this.StopLoopSequence();
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "BabelTowerNewLevel",
      this.GetItem(17),
      this.yq,
    );
  }
  DisableButton() {
    this.GetButton(11).RootUIComp.SetUIActive(!1),
      this.GetItem(12).SetUIActive(!1);
  }
  PlayLoopSequence() {
    this.FTc.IsPlayingSequence("Loop_item")
      ? this.FTc.ReplaySequenceByKey("Loop_item")
      : this.FTc.PlayLevelSequenceByName("Loop_item");
  }
  StopLoopSequence() {
    this.FTc.StopCurrentSequence(!1, !0);
  }
  IsPlayingSequence() {
    return this.FTc.IsPlayingSequence("Loop_item");
  }
}
exports.BabelTowerHardLevelChoseItem = BabelTowerHardLevelChoseItem;
class RoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [2, UE.UITexture],
    ];
  }
  Refresh(e, t, i) {
    var s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    this.SetRoleIcon(s.Card, this.GetTexture(2), e);
  }
}
//# sourceMappingURL=BabelTowerHardLevelChoseItem.js.map
