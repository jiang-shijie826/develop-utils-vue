<script>
export default {
  data() {
    return {
      weatherInfo: {},
    }
  },
  methods: {
    getLngLatLocation() {
      let that = this;
      AMap.plugin("AMap.CitySearch", function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息          
            AMap.plugin("AMap.Weather", function () {
              //创建天气查询实例
              var weather = new AMap.Weather();
              //执行实时天气信息查询
              weather.getLive(result.city, function (err, data) {              
                if (data) {
                  that.weather = data.weather;
                  that.temperature = data.temperature;
                  that.city = data.city;
                  that.province = data.province;
                  that.windDirection = data.windDirection;
                  let weatherObj = {
                    weather: data.weather,
                    temperature: data.temperature,
                    city: data.city,
                    province: data.province,
                    windDirection: data.windDirection,
                  };
                  localStorage.setItem(
                    "WEATHER_INFO",
                    JSON.stringify(weatherObj)
                  );                                    
                }else{
                  console.log(err);
                }
              });                         
            });
          }
        });
      });
    },
    getWeatherInfo() {
      this.getLngLatLocation();
      this.weatherInfo = eval("("+localStorage.getItem("WEATHER_INFO")+")");;
      console.log("weatherInfo-->", this.weatherInfo);
    }
  },
  beforeCreate() {
    this.$nextTick(() => {
      this.getWeatherInfo()
    })
    console.log("beforeCreate-->");
  }
}
</script>
<template>
    <v-mini-weather class="weather">
      <template #default="{weather, icon, type}">
        <!--插入图标-->
        <v-mini-weather-icon class="icon" :icon="icon" :type="type"></v-mini-weather-icon>
        <!--DIY内容-->
        <span class="city">{{weather.cityname}}/{{weather.weather}}/{{weather.temp}}°C</span>
      </template>
    </v-mini-weather>
</template>

<style scoped>
.weather {
    width: 190px;
    float: right;
    right: -20px;
}
.icon {
  width: 50px;
  height: 50px;
}
.city{
  float: right;
  position: relative;
  margin-top: -45px;
  margin-right: 35px;
}
</style>