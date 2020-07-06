# NO2 Emissions Application
This repository contains a project to create an application that can take a given location, and return an accurate reading of the nitrogen dioxide concentration after accounting for wind and chemical loss. The project was done through the Earth Analytics Bootcamp at the University of Colorado, Boulder.

## Background
Nitrogen dioxide emissions have been on the increase for nearly 50 years, primarily caused by combustion of fossil fuels and energy derived from coal power plants. Although nitrogen oxide emissions are expected to decrease in countries with increased electric transportation, concentrations have seen an increase of about 50% in places still in the industrialization process, such as China. An application that could inform someone about surrounding NO2 concentrations shows potential to both keep the public informed and potentially save lives.

## Tools Used
* The project was done in Google Earth Engine. To find my current code you can follow <a href="https://earthengine.google.com/" target="blank">this link</a>

* The files in this repository run off of Jupyter Notebook, which are python based. The tools to edit jupyter notebooks can be found on the <a href="https://www.earthdatascience.org/" target="blank">Earth Analytics Website.</a>

## Access
The application can be opened and used by anyone. It is important to note, that you must sign up for Google Earth Engine, which may take a few days.  

## Data Used
1. **Tropomi Data:** The main source of NO2 data. Captured by the Sentinel 5-P satellite, tropomi data is updated regularly with real time NO2 updates.
2. **ERA5 Daily aggregates** provides aggregated values for each day for seven ERA5 climate reanalysis parameters. We are particularly interested in bands 8 and 9, which can be used to calculate wind direction and speed.
3. **Global Power Plant Database** used to find study areas, we are specifically interested in coal plants, as they are the biggest producer of NO2

* **Data Note:** All of these datasets can be accessed in the coding search bar of Google Earth Engine

## Files in this repository
* **NO2-final-report.ipynb:** A detailed overview of where I am at in the project, and what left I have to do.
* **ea-bootcamp-blogpost-evangallagher.ipynb** A blog for lay audiences covering my project
* **NO2-app-code.js** The current code for the project. An important note: while this is in the Javascript language, some functions are Google Earth Engine exclusive.

## **Current Link!** 
Google Earth Engine is wonderful for reproducibility, as you can essentially take a "snapshot" of what your code looks like and create a link where any one else can see it. My most recent code can be found with <a href="https://code.earthengine.google.com/92897eac1489af20b4d4905c8f0909db" target="blank">this link</a>

## Workflow
1. Wind data: This is the largest problem to overcome in this application. It is believed that wind affects the way NO2 is dispersed, especially near coal plants. To create the most accurate reading possible, we should try and account for how wind affects NO2 dispersal. Once we get a working equation for how wind affects NO2, we can move on.
2. Next, we need to apply this equation to a study area. The one I have chosen is Colorado's Pawnee Generating Plant, which has heavy NO2 concentrations. If we can make the tropomi data more accurately show up near the coal plants, then we know the application is accurate.
3. The final step is to build the application outwards. With a working equation for wind, we simply need to create a function that can input a location, and read the NO2 data nearby.

## Where I am at
At the moment I have not gotten a working calculation for how the wind works along with Tropomi. I have a couple theories as to what could be wrong:
* `Theory 1: The Gradient` Referring to the math section above, this is "step 3." I believe this could be the issue, because an incorrect gradient would be a primary cause of values being skewed together. In this case, the gradient could have become too large, which would mean we have meaningful values, but when plot onto the map, they are all lumped together in one bin.
* `Theory 2: The Chemical life` The next two theories relate to the chemical lifetime, which is calculated in "step 4." The very last step of the math is to divide by four, and then add the gradient. It seems possible that too many values are being divided by four, this fix could be as easy as changing around some parenthesis, to as complicated as restructuring how some of the code runs.
* `Theory 3: Just Use LVw` One interesting result of this project, was that just calculating the LVw(in other words stopping at "step 2" had interesting results. While not always consistent, just adding the wind as vector to Tropomi often moved the pixels more central to Pawnee Power Plant. This was inconsistent with the research article however, and so there was no way to compare these results to something meaningful.

If you want to use my code, or expand on my own code, please contact me and I would be more than happy to share.
