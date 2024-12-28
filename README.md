# Online Code Editor

The application is a simplified code editor interface similar to leetcode.com. In it, the user can write code in one of two specified programming languages (JavaScript and Python), send it “to the server” (server simulation) for execution and get the results.

# Installation and startup instructions

**1. Cloning the repository**
```
git clone git@github.com:BohdanTaran/online-code-editor.git
```

**2. Installing dependencies and starting the application**
```
npm install
npm install json-server
npx json-server db.json
ng serve
```
The application will be available at http://localhost:4200

# Stack
- Angular 18
- Angular Material
- Json-server
- Monaco Editor
- Prettier
