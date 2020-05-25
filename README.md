# Dwolla App

This repo contains each module from a Dwolla IT/IS Lunch and Learn. It showcases how to build an express application that uses the Dwolla API. Each module is numbered and builds off the previous. Each module will also have a README file to instruct you on what steps you need to take to reproduce the work completed in that module.

## Before You Start

1. Download [Node.js](https://nodejs.org/en/download/)
2. Download [Docker](https://www.docker.com/products/docker-desktop)

## Getting Started

In the `1-hello-world` folder open the `README.md` file. Follow the instructions to get started on your own project. When you are done with the first module, there is a `README.md` in the following modules to continue. In each module there is a `starter` and `final` folder. 

In the `starter` folder is what your code should look like when you start the module. In the `final` folder is what your code should look like when you are done with that module. If you ever get lost feel free to copy the contents of the `starter` folder and then start from the top of the `README.md` file. 

If you plan on on reusing the code in either the `starter` or `final`, remember to rename the project in the `package.json` file. It should match the name of the folder you copy the code into. If you do not update this, you may have an error with installing the dependencies into your `node_modules` folder.

## Cloning the Repo

It might be helpful to clone the repo as a reference. To run any of the instances of this project, navigate into a `starter` or `final` folder of the desired module. Then run the following:

```
npm install
npm run build-db
npm run dev
```

A reminder that if you move the code out of the `starter` or `final` folder then you need to rename the project within the `package.json`. Without doing this, you may get an error when installing the `node_modules` folder.