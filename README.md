# Snap Gallery

A website for hosting an easy to set up, highly customizable image gallery for free on Github Pages. How the pages are organized and the image meta data is controlled through a json file called `gallery.json`, which is used by the site to determine how to present site content. 

Images can be hosted from anywere and merely linked through the `gallery.json` file.

Works on a variety of device types, including mobile, tablet, and desktop.

## Getting Started

Be sure to fork project and work off the forked version before custimizing your site. You'll need to do this in order to publish your changes to your own Github pages site.

## Building and Publishing

First enable Github pages from your project's settings page.

Change the name of the website in the `package.json` file's build script to your own.

If you're using a linux distro and want to to publish your changes to the live version of the website, run the the `ng run git-r-done` command. 
If you're using Windows and want to to publish your changes to the live version of the website, run the the `ng run git-r-done-on-windows` command. 

In your project settings page make sure you're on the `gh-pages` branch, then visit your website from your Github pages url.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

