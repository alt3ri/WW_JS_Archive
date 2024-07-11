"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DropDownTitle = exports.LordGymChallengeRecordView = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown");
const DropDownItemBase_1 = require("../../Common/DropDown/Item/DropDownItemBase");
const TitleItemBase_1 = require("../../Common/DropDown/Item/TitleItemBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const LordGymDefine_1 = require("../LordGymDefine");
const LordRecordItemView_1 = require("./LordRecordItemView");
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon");
const MIN_DIFFICULTY = 1;
const MAX_DIFFICULTY = 6;
class LordGymChallengeRecordView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.wSi = 1),
      (this.CLt = LordGymDefine_1.NONE_FILTER_TYPE),
      (this.BSi = void 0),
      (this.bSi = void 0),
      (this.qSi = (e, i) => {
        return new DropDownItem(e);
      }),
      (this.GSi = (e) => {
        return new DropDownTitle(e);
      }),
      (this.NSi = (e, i) => {
        (this.CLt = i.Id), this.OSi();
      }),
      (this.kSi = () => {
        (this.wSi = Math.max(MIN_DIFFICULTY, this.wSi - 1)), this.OSi();
      }),
      (this.FSi = () => {
        (this.wSi = Math.min(MAX_DIFFICULTY, this.wSi + 1)), this.OSi();
      }),
      (this.VSi = () => new LordRecordItemView_1.LoadRecordItemView());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [3, this.kSi],
        [4, this.FSi],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.BSi = new CommonDropDown_1.CommonDropDown(
      this.GetItem(5),
      this.qSi,
      this.GSi,
    )),
      await this.BSi.Init();
  }
  OnStart() {
    this.BSi.InitScroll(
      ConfigManager_1.ConfigManager.LordGymConfig.GetAllLordGymFilterTypeConfig(),
      (e) => e,
    ),
      this.BSi?.SetOnSelectCall(this.NSi),
      this.BSi?.SetShowType(1),
      (this.bSi = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(1),
        this.VSi,
      ));
  }
  OnBeforeDestroy() {
    this.BSi?.Destroy(), (this.BSi = void 0);
  }
  OnBeforeShow() {
    this.OSi();
  }
  HSi() {
    const e =
      ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymAllConfigByDifficulty(
        this.wSi,
      );
    return (
      e?.filter((e) => !e.IsDebug),
      this.CLt === LordGymDefine_1.NONE_FILTER_TYPE
        ? ConfigCommon_1.ConfigCommon.ToList(e)
        : e?.filter((e) => e.FilterType === this.CLt)
    );
  }
  OSi() {
    this.GetButton(3)?.SetSelfInteractive(this.wSi !== MIN_DIFFICULTY),
      this.GetButton(4)?.SetSelfInteractive(this.wSi !== MAX_DIFFICULTY);
    const e = this.HSi();
    e && this.bSi.RefreshByData(e),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(6),
        "LordGymDifficulty",
        this.wSi,
      );
  }
}
exports.LordGymChallengeRecordView = LordGymChallengeRecordView;
class DropDownItem extends DropDownItemBase_1.DropDownItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
    ];
  }
  OnShowDropDownItemBase(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name);
  }
  GetDropDownToggle() {
    return this.GetExtendToggle(0);
  }
}
const TEXT_INDEX = 0;
class DropDownTitle extends TitleItemBase_1.TitleItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[TEXT_INDEX, UE.UIText]];
  }
  ShowTemp(e, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(TEXT_INDEX), e.Name);
  }
}
exports.DropDownTitle = DropDownTitle;
// # sourceMappingURL=LordGymChallengeRecordView.js.map
