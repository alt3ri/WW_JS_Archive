
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TimeOfDayConfig=void 0;const Log_1=require("../../../Core/Common/Log"),DaySelectPresetAll_1=require("../../../Core/Define/ConfigQuery/DaySelectPresetAll"),DaySelectPresetById_1=require("../../../Core/Define/ConfigQuery/DaySelectPresetById"),MultiTextLang_1=require("../../../Core/Define/ConfigQuery/MultiTextLang"),TimeOfDayById_1=require("../../../Core/Define/ConfigQuery/TimeOfDayById"),ConfigBase_1=require("../../../Core/Framework/ConfigBase"),GameplayTagUtils_1=require("../../../Core/Utils/GameplayTagUtils"),TimeOfDayDefine_1=require("./TimeOfDayDefine"),TimeOfDayModel_1=require("./TimeOfDayModel");class TimeOfDayConfig extends ConfigBase_1.ConfigBase{constructor(){super(...arguments),this.nIo=[],this.sIo=[]}aIo(){return TimeOfDayById_1.configTimeOfDayById.GetConfig(1)}GetInitTimeSecond(){return(this.aIo()?.InitTime??0)*TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE}GetMaxV(){return TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE*(this.aIo()?.V??0)}GetA(){return TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE*(this.aIo()?.A??0)}GetRate(){var e=this.aIo()?.Rate;return e||(Log_1.Log.CheckError()&&Log_1.Log.Error("TimeOfDay",17,"时间流速比未配置"),0)}InitDayStateTimeSpanList(){var e=this.aIo()?.StateSpan;return!(!e||e.size<=0||(this.nIo=Array.from(e),this.nIo.sort((e,i)=>e[0]<i[0]?1:0),0))}GetDayStateByGameTimeMinute(t){if(0===this.nIo.length&&!this.InitDayStateTimeSpanList())return Log_1.Log.CheckError()&&Log_1.Log.Error("TimeOfDay",17,"时间区间配置错误"),0;let r=0;return this.nIo.every((e,i)=>!TimeOfDayModel_1.TodDayTime.CheckInMinuteSpan(t,e)||(r=i,!1)),4<=r?(Log_1.Log.CheckError()&&Log_1.Log.Error("TimeOfDay",17,"时间区间配置超出范围"),0):r}GetBanGamePlayTags(){if(!(0<this.sIo.length)){var e=this.aIo()?.BanTag;if(e)for(const t of e){var i=GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(t);i&&this.sIo.push(i)}}return this.sIo}GetTimePresets(){return this.aIo()?.TimePreset??void 0}GetDayTimeChangePresets(){return DaySelectPresetAll_1.configDaySelectPresetAll.GetConfigList()}GetDayTimeChangeConfig(e){e=DaySelectPresetById_1.configDaySelectPresetById.GetConfig(e);if(e)return e}GetTimeChangeText(e){e=this.GetDayTimeChangeConfig(e);return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title)??""}}exports.TimeOfDayConfig=TimeOfDayConfig;
//# sourceMappingURL=TimeOfDayConfig.js.map