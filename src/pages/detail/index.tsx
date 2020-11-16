import React, { useEffect, useState, useRef, useCallback } from "react";
import lottie, { AnimationItem } from "lottie-web";
import { lottieJsonList } from "../../config";
import ControlButton from "../../components/controlButton";
interface IProps {
  [props: string]: any;
}
type AnimationRealItem = AnimationItem & {
  totalFrames: number;
};
interface jsonData {
  json: JSON;
  name: string;
}

const Detail: React.FC<IProps> = (props) => {
  const initLottie = (
    jsonData: JSON,
    jsonName: string
  ): Promise<AnimationRealItem> => {
    return new Promise(async (resolve) => {
      /**
       *初始化动画
       * @param {JSON} animationData
       * @param {Name} animationName
       */
      const initLottieAnimation = async (animationData: JSON, name: string) => {
        const element = document.querySelector(".lottie_box");
        const lottieObject = (await lottie.loadAnimation({
          container: element as Element,
          renderer: "svg",
          name: name as string,
          loop: true,
          autoplay: true,
          animationData,
        })) as AnimationRealItem;
        return lottieObject;
      };
      const item = await initLottieAnimation(jsonData, jsonName);
      resolve(item);
    });
  };
  const [isLoading, setLoading] = useState(false);

  const loadRemoteJson = (url: string): Promise<JSON> => {
    return new Promise(async (resolve) => {
      const result = await fetch(url);
      const jsonData = await result.json();
      resolve(jsonData);
    });
  };

  const resItem = useRef({} as AnimationRealItem);

  const [jsonId, setJsonId] = useState("loading");

  const [animObj, setAnimObj] = useState({} as AnimationRealItem);
  const [duration, setDuration] = useState(0);
  const [nowFrame, setNowFrame] = useState(0);

  const getJsonData = (jsonId: string) => {
    const jsonIndex = lottieJsonList.findIndex((json) => json.id === jsonId);
    const jsonData =
      jsonIndex === -1 ? lottieJsonList[0] : lottieJsonList[jsonIndex];
    return jsonData;
  };

  const getJSON = async () => {
    let jsonData = getJsonData(props.location.search.slice(1));
    let json = jsonData.json;
    if (typeof jsonData.json === "string") {
      if (!isLoading) {
        jsonData = getJsonData("loading");
        json = jsonData.json;
      } else {
        json = await loadRemoteJson(json);
      }
    }
    return { json, name: jsonData.name };
  };
  const initWithEvent = useCallback(async () => {
    console.log(11);
    const { json, name } = await getJSON();
    if (isLoading) {
      if (Object.keys(animObj).length !== 0) {
        animObj.destroy();
      }
      setLoading(false);
    }
    initLottie(json, name).then((res) => {
      setAnimObj(res);
      setDuration(res.getDuration(false));
      resItem.current = res;
      if (name === "loading" && !isLoading) {
        setLoading(true);
        setJsonId(props.location.search.slice(1));
      }
      resItem.current.addEventListener("enterFrame", handler);
    });
    return () => {};
  }, [jsonId]);

  useEffect(() => {
    initWithEvent();
  }, [initWithEvent]);

  //整个路由销毁时取消监听
  useEffect(() => {
    return () => {
      resItem.current.removeEventListener("enterFrame", handler);
    };
  }, []);

  const handler = (i: { currentTime: number }) => {
    setNowFrame(Math.floor(i.currentTime));
  };

  return (
    <div className="container">
      <span>{`动画总帧数:${animObj.totalFrames}`}</span>
      <span>{`动画当前帧数:${nowFrame}`}</span>
      <span>{`动画总时间:${duration}`}</span>
      <ControlButton
        animObj={animObj}
        setDuration={(duration: number) => setDuration(duration)}
        initAnim={initWithEvent}
      />
      <div className="lottie_box" />
    </div>
  );
};

export default Detail;
