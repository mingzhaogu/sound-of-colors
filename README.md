## MASH

### Background and Overview

As housing prices across the nation rises, the average American's salary does not follow suit.
MASH is a visual analysis of the median housing prices compared to the median household salary, across the United States, by state and by county.


### Functionality and MVP

- [ ] Users will be able to visually observe the median housing price by state.
- [ ] Users will be able to visually observe the median household salary by state.
- [ ] On click of individual state, users will be able to visually observe the median housing price by county.
- [ ] On click of individual state, users will be able to visually observe the median household salary by county.
- [ ] In addition, there will be a bar indicating the national median, and each state will be ranked by color on a spectrum.

As a bonus MVP:
- [ ] Users will be able to see how much a household salary needs to be in order to afford a house in that area.


### Wireframes

This single page app will consist of a map of the United States, color-coded by how each state's median housing price compares to the national median. On hover (or on click), each state will expand and show details of each county, and the estimated necessary household income to afford a house in that area.

![MASH](https://i.imgur.com/RbrK78t.png)


### Architecture and Technologies

This project will utilize the following technologies:
- Vanilla Javascript for data retrieval
- HTML5 ad D3 for data visualization
- Webpack to bundle and run scripts

The scripts necessary for this project are:
- `prices.js` for retrieving and saving housing data
- `income.js` for retrieving and saving income data
- `map.js` for creating and setting up the map

### Implementation Timeline

#### Over the weekend
- [ ] Decide on an idea
- [ ] Look for data/APIs to fetch data
- [ ] Set up initial project files
- [ ] Start learning D3 OR chart.js to implement data mapping

#### Day 1 - The main goal of this day is to be able to extract all the data needed, and organize them in preparation for Day 2.
- [ ] Write a skeleton of the scripts needed
- [ ] Set up `webpack.config.js` and `package.json`
- [ ] Learn more about chart.js
- [ ] Render a rough chart of data distribution

#### Day 2 - This day will be meant for learning the ins and outs of D3 data visualization. The main goal of this day will be to get a map up and running.
- [ ] learn more chart.js (animations, more ways to render data)
- [ ] Render each state individually
- [ ] Map data to US map

#### Day 3
- [ ] Implement expand on hover/click
- [ ] On hover, states will display data
- [ ] _not sure yet_

#### Day 4
- [ ] _not sure yet_


## Resources
- (Historical Income By State)[https://www.census.gov/data/tables/time-series/demo/income-poverty/historical-income-households.html]
- (Geoprojecting US Map)[https://github.com/d3/d3-geo/blob/master/README.md#geoConicEqualArea]
