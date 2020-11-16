import json0 from "../json/loading.json";
import json1 from "../json/json1.json";
import json2 from "../json/json2.json";
import json3 from "../json/json3.json";
import json4 from "../json/json4.json";

const lottieJsonList: { json: any; name: string; id: string }[] = [
  { json: json0, name: "loading", id: "loading" },
  { json: json1, name: "火箭", id: "rocket" },
  { json: json2, name: "骑滑板车上班", id: "car" },
  { json: json3, name: "在线换装", id: "clothes" },
  { json: json4, name: "小黄人", id: "yellowMan" },
  {
    json: "https://assets10.lottiefiles.com/packages/lf20_4yzgsny3.json",
    name: "射箭",
    id: "archery",
  },
  {
    json: "https://assets8.lottiefiles.com/packages/lf20_heCGCZ.json",
    name: "感谢鸡",
    id: "chickens",
  },
];

export { lottieJsonList };
