<?php
/*
 * @Descripttion: 天气接口API（和风天气）
 * @version: 1.0.0
 * @Author: TanXiao
 * @Date: 2020-03-14 20:23:18
 * @LastEditors: TanXiao
 * @LastEditTime: 2020-04-06 22:07:59
 */

// 定义天气图标地址：https://dev.heweather.com/docs/refer/condition
define("CDN_URL", "https://cdn.txisfine.cn/cond-icon-heweather/");

// 获取天气信息（地理位置）
function getWeather($location)
{
    //准备请求参数
    $key = ""; // getNowWea KEY
    $curlPost = "key=" . $key . "&location=" . urlencode($location);
    //初始化请求链接
    $req = curl_init();
    //设置请求链接
    curl_setopt($req, CURLOPT_URL, 'https://free-api.heweather.net/s6/weather/now?' . $curlPost);
    //设置超时时长(秒)
    curl_setopt($req, CURLOPT_TIMEOUT, 3);
    //设置链接时长
    curl_setopt($req, CURLOPT_CONNECTTIMEOUT, 10);
    //设置头信息
    $headers = array("Accept: application/json", "Content-Type: application/json;charset=utf-8");
    curl_setopt($req, CURLOPT_HTTPHEADER, $headers);

    curl_setopt($req, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($req, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($req, CURLOPT_RETURNTRANSFER, true); // 获取数据返回
    curl_setopt($req, CURLOPT_BINARYTRANSFER, true); // 在启用 CURLOPT_RETURNTRANSFER 时候将获取数据返回
    $data = curl_exec($req);
    curl_close($req);
    return $data;
}

//PHP stdClass Object转array  
function object_array($array)
{
    if (is_object($array)) {
        $array = (array) $array;
    }
    if (is_array($array)) {
        foreach ($array as $key => $value) {
            $array[$key] = object_array($value);
        }
    }
    return $array;
}

// Main Function
function main($event, $context)
{
    $res = object_array(json_decode(getWeather($event->location)));

    //var_dump($res);

    // 获取API返回状态
    if ($res["HeWeather6"][0]["status"] == "ok") {

        $now = $res["HeWeather6"][0]["now"];
        // 获取当前天气
        $now_cond_txt = $now["cond_txt"];
        // 获取当前温度
        $now_cond_tmp = $now["tmp"] . " °C";
        //获取当前天气图片
        $now_cond_img = CDN_URL . $now["cond_code"] . ".png";

        // 返回值信息
        $response = array(
            'code' => '200', 'data' => array(
                "now_cond_txt" => $now_cond_txt,
                "now_cond_img" => $now_cond_img,
                "now_cond_tmp" => $now_cond_tmp
            )
        );

        return json_encode($response);
    } else {
        // 异常返回值
        $response = array('code' => '500', 'data' => array(
            "now_cond_txt" => '',
            "now_cond_img" => CDN_URL . "999.png",
            "now_cond_tmp" => ''
        ));

        return json_encode($response);
    }
}
