var coal_plant = geometry.buffer(20000)

// This variable creates the area of interest
var polygon = ee.Geometry.Polygon([
  [[-104.3343153554145, 39.97221810099358],
  [-103.29336076557075, 39.97221810099358],
  [-103.29336076557075, 40.4535747006502],
  [-104.3343153554145, 40.4535747006502],
  [-104.3343153554145, 39.97221810099358]]]);

Map.addLayer(polygon, {color: "green"}, "Region")

// The following two variables create the desired timeframe of NO2

var start_date = '2019-12-01';
var end_date = '2019-12-02';


// Tropomi No2 Data
var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')
  .filterDate(start_date, end_date);

var band_viz = {
  min: 0,
  max: 0.0002,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

var tropomi_mean = collection.mean();

var tropomi_co = ee.Image(tropomi_mean)
  .clip(polygon);


Map.addLayer(tropomi_co, band_viz, 'S5P N02');
Map.centerObject(polygon);
Map.addLayer(coal_plant, {color: "yellow"}, "Coal");


// Wind Data - U and V bands

var u_band = ee.ImageCollection('NOAA/GFS0P25')
  .select('u_component_of_wind_10m_above_ground')
  .filterDate(start_date, end_date);

var u_mean = u_band.mean();

var u_clip = ee.Image(u_mean)
  .clip(polygon);

var v_band = ee.ImageCollection('NOAA/GFS0P25')
  .select('v_component_of_wind_10m_above_ground')
  .filterDate(start_date, end_date);

var v_mean = v_band.mean();

var v_clip = ee.Image(v_mean)
  .clip(polygon);


// Create a variable with all important bands

var multiband = ee.Image.cat([tropomi_co, u_clip, v_clip]);

// Using variables to calculate wind
var windSpeed = ((multiband
                    .select('u_component_of_wind_10m_above_ground')
                    .pow(2))
                    .add(
                         multiband
                         .select('v_component_of_wind_10m_above_ground')
                         .pow(2)
                    )
                    ).sqrt();


var LVw = multiband.select('NO2_column_number_density')
          .multiply(1.32)
          .multiply(windSpeed);


// Getting rid of 0 values for plotting

var u_less_than_one = multiband.select('u_component_of_wind_10m_above_ground').lt(1.0)

var u_less_than_one = u_less_than_one.where((u_less_than_one.eq(1)), -1);
var u_more_than_one = multiband.select('u_component_of_wind_10m_above_ground').gte(1.0)


var u_sign = u_less_than_one.add(u_more_than_one);

var v_less_than_one = multiband.select('v_component_of_wind_10m_above_ground').lt(1.0)

var v_less_than_one = v_less_than_one.where((v_less_than_one.eq(1)), -1);
var v_more_than_one = multiband.select('v_component_of_wind_10m_above_ground').gte(1.0)


var v_sign = v_less_than_one.add(v_more_than_one);


var countbyvalue = u_sign.reduceRegion(
  {reducer: ee.Reducer.frequencyHistogram(), bestEffort: true, geometry: polygon, scale: 30});
print(countbyvalue)
// Map.addLayer(LVw, band_math, 'math');

var xyGrad = LVw.gradient();

// Compute the magnitude of the gradient

//var gradient = ((xyGrad.select('x').pow(2).multiply(u_sign))
//         .add(xyGrad.select('y').pow(2).multiply(v_sign))).sqrt();


var gradient = ((xyGrad.select('x').pow(2))
         .add(xyGrad.select('y').pow(2))).sqrt();

//var direction = xyGrad.select('y').atan2(xyGrad.select('x'));


multiband = multiband.addBands(gradient);

// ((1.32 * tropomi_mean_jan) / 4) + gradient

var result = ((multiband.select('NO2_column_number_density')
          .multiply(1.32))
          .divide(4))
          .add(multiband.select('x'));


Map.addLayer(result, band_viz, 'Wind Calculation');



// Attempt at using reducers

//var countbyvalue = u_sign.reduceRegion(
//  {reducer: ee.Reducer.frequencyHistogram(), bestEffort: true, geometry: polygon, scale: 30});
