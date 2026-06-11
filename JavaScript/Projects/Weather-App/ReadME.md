# Project: Weather App

### Instructions
1. Set up a blank HTML document with the appropriate links to your JavaScript and CSS files.

2. Write the functions that hit the API. You’re going to want functions that can take a location and return the weather data for that location. For now, just `console.log()` the information.

3. Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.

4. Set up a form that will let users input their location and will fetch the weather info (still just `console.log()` it).

5. Display the information on your webpage!
    - While you don’t have to, if you wish to display weather icons then there can be a lot of them to import, so have a look at [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import). Unlike plain template strings without an import, [Webpack can read dynamic imports](https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import) and still bundle all the relevant assets.

6. Add any styling you like!

7. Optional: add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API. Use DevTools to simulate network speeds.
