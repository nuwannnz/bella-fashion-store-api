# API for the Bella Fashion Store

### How to setup after cloning

Run the below commands after cloning the project

    cd ./bella-fashion-store-api
    npm install

    // config the customized git commit message
    git config --local commit.template './.gitmessage'

### Running the project

    // start app in development mode
    npm run dev

    // start app in production mode
    npm run prod
    OR
    npm start

    /*
        start app in development mode and
        watch for changes
    */
    npm run watch:dev

### Commit message format

Please use the following command to commit your code (without `-m` flag)

    git commit

Types of prefixes for the commit messages

    - FEAT          : A new feature
    - FIX           : A bug fix
    - DOCS          : Documentation only chage
    - STYLE         : Changes that do not affect the meaning of the code
    - REFACTOR      : A code change that neither falls into FEAT or FIX
    - PERF          : A code change that improves performance
    - TEST          : Adding tests
    - SETUP         : Changes to the build scripts/process or libraries
