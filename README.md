# NO2 Emissions Application
This repository contains a project to create an application that can take a given location, and return an accurate reading of the nitrogen dioxide concentration of the surrounding area. The project was done through the Earth Analytics Bootcamp at the University of Colorado, Boulder.

## Background
Nitrogen dioxide emissions have been on the increase for nearly 50 years, primarily caused by combustion of fossil fuels and energy derived from coal power plants. Although nitrogen oxide emissions are expected to decrease in countries with increased electric transportation, concentrations have seen an increase of about 50% in places still in the industrialization process, such as China An application that could inform someone about surrounding NO2 concentrations shows potential to both keep the public informed and potentially save lives.

## Tools Used
* The project was done in the ![Google Earth Engine coding program.](https://earthengine.google.com/) The application can be opened and used by anyone, and the code itself can be viewed by signing up with Google Earth Engine.  

* The files in this repository run off of Jupyter Notebook, which are python based. The tools to edit jupyter notebooks can be found on the ![Earth Analytics Website.](https://www.earthdatascience.org/)

## Data Used
1. **Tropomi Data:** The main source of NO2 data. Captured by the Sentinel 5-P satellite, tropomi data is updated regularly with real time updates.
2. **ERA5 Daily aggregates** provides aggregated values for each day for seven ERA5 climate reanalysis parameters. We are particularly interested in bands 8 and 9, which can be used to calculate wind direction and speed.
3. **Global Power Plant Database** used to find study areas, we are specifically interested in coal plants, as they are the biggest producer of NO2

* **Data Note:** All of these datasets can be accessed in the coding search bar of Google Earth Engine

## Files in this repository
* **ea-bootcamp-blogpost-evangallagher.ipynb:** A detailed overview of where I am at in the project, and what left I have to do.

## Workflow
1. Wind data: This is the largest problem to overcome in this application. It is believed that wind affects the way NO2 is dispersed, especially near coal plants. To create the most accurate reading possible, we should try and account for how wind affects NO2 dispersal. Once a working function for how wind affects NO2, we can move on.
2. Next, we need to apply this function to a study area. The one I have chosen is Pawnee Generating Plant, which has heavy NO2 concentrations. If we can make the data more accurately show up near the coal plants then we know the application is accurate.
3. The final step is to build the application outwards. With a working equation for wind, we simply need to create a function that can take any given location and read the NO2 data nearby. 
