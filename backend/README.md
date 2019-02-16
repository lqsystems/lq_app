## Local Setup
Clone the repo from GitHub:
``` shell
git clone git@github.com:hayden7913/vue-express-example.git 
```
Install backend dependencies:
``` shell
cd vue-express-example/backend && npm i
```

Install frontend dependencies:
``` shell
cd ../frontend && npm i
```

Run the app:

(Make sure you're in the `vue-express-example/frontend` directory)

``` shell
npm start
```

Navigate to `localhost:8080` in your web browser

## A Pimer on Vue CLI

Understanding how Vue CLI works is key to understanding how a
Vue app can be deployed and served from a backend.

Vue CLI is an official scaffolding tool for Vue that streamlines 
the configuration of front end tools and provides some essential
utilities for building a Vue app.

For now, the most important thing to understand is how Vue CLI
bundles JavaScript and CSS files. 

Before going any further, take a quick look at the 
[frontend/src/components](https://github.com/hayden7913/vue-express-example/tree/master/frontend/src/components) folder. As you can see, this contains a bunch
of `.vue` files linked together with es6 `import` statements. 

Unfortunately, not all browsers know how to handle these `import` statements
(or the `.vue` files for that matter) so we can ask Vue CLI to extract 
all the JavaScript in our project and bundle it up into one big 
JavaScript file. The same goes for the CSS.

To see what that looks like open up the [app.0746e484.js](https://github.com/hayden7913/vue-express-example/blob/master/frontend/dist/js/app.0746e484.js)  file
in the `frontend/dist/js` folder.

It doesn't look pretty (it's been minified by Vue CLI to reduce the file size),
but believe it or not that includes all of the JavaScript that's in the 
`frontend/src/` folder.

Next take a look at the [index.html](https://github.com/hayden7913/vue-express-example/blob/master/frontend/dist/index.html) file in the `frontend/dist` folder. 

``` html
<!DOCTYPE html>
<html lang=en>
<head>
    <!-- ... other header stuff -->
    <link href=css/app.2831893f.css rel=stylesheet>
    <link href=css/chunk-vendors.efe834aa.css rel=preload as=style>
</head>
<body>
    <div id=app></div>
    <script src=js/app.0746e484.js></script>
    <script src=js/chunk-vendors.517b8dd4.js> </script>
</body>
</html
```
This should look pretty familiar. Just a bare bones html file but with 
script tags that link our JavaScript bundles and link tags with hrefs to our CSS bundles. 
If you've cloned this project locally, you could open this `index.html` file in a browser and you'd see the UI.

*NOTE: Under the hood, Vue CLI uses Webpack to do all of this 
bundling stuff. For more details check out the [Webpack docs](https://webpack.js.org/concepts/).*

#### Okay, so how do we tell Vue CLI to generate a bundle for us?

If you look at the scripts section in [frontend/package.json](https://github.com/hayden7913/vue-express-example/blob/master/frontend/package.json)
you'll see the following script.

``` json
 "build": "vue-cli-service build"
```

Running this script with `npm run build` tells Vue CLI to bundle up all of our
 `.vue` files and stick them in a `dist/` folder with an `index.html` file 
that links them together as shown above. If a `dist/` folder already exists it
will be automatically deleted and replaced with an updated one.

## Serving our Vue app from the backend
In the section above we learned how we can use Vue CLI to create
a `dist/` folder that contains our client app compiled into CSS and
JavaScript bundles that are linked together with an `index.html` file.

We can easily serve this `dist/` folder from our Express app in the backend.

First we simply copy the `dist/` folder from the frontend to the backend.

``` shell
# from the project root directory

# delete the old dist folder
rm -rf backend/dist 

# copy the new one
cp -r frontend/dist backend
```
Then we just need one line of code to tell Express to serve the `dist/` folder from our main server file.

``` js
// backend/dosis.js

// ...other express stuff
app.use(express.static('dist'));
```

To test this we can just run `node backend/dosis.js` from a terminal in the
root directory and navigate a browser to `localhost:3000`. 

The the live app should be running there. 

## Running the app in development
In the section above we showed how we can serve our `dist/` folder
from Express. 

In practice, the only time we're concerned about the backend 
serving the static frontend assets (ie the html/css/js) is during deployment.

For development Vue CLI provides a special development server that works
behind the scenes to serve our client side application on it's own port.

Vue CLI's development server comes with some very nice features. The 
most notable is Hot Module Replacement which watches for changes in 
the client app and automatically updates them in the browser without
having to refresh (which is pretty magical).

*NOTE: Behind the scenes, it's really [webpack-dev-server](https://webpack.js.org/configuration/dev-server/)
that does the heavy lifting
of running the development server. Vue CLI is really just a Webpack wrapper that 
let's us use Webpack magic without the configuration headaches.*

#### The catch
The only catch with this is that for our app to function beyond
rendering pretty sliders and switches it still needs to send and recieve
data from our server. 

This means we need to simultaneously run a devlopment server on one port
and the backend server on another port.

A simple way to accomplish this is to just open two terminals and run the frontend
server in one and the backend in the other. This works fine but
can be a bit cumbersome. Fortunately there's an easier way.
 
To see how, take a look at the `start` script in the [frontend/package.json](https://github.com/hayden7913/vue-express-example/blob/master/frontend/package.json) 

``` json
 "start": "concurrently \"cd ../backend && node dosis.js\" \"vue-cli-service serve\"",
```

`Concurrently` is an npm package that allows two processes to run simultaneously 
in the same terminal.

This part starts the backend server:
``` shell
cd ../backend && node dosis.js
```

And this is the Vue CLI command to start the development server:
``` shell
vue-cli-service serve
```


