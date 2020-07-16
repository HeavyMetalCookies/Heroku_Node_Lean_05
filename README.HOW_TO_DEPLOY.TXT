
Deploy:

    SETTING_UP_REPO:

    1. Make sure your system is configured to show hidden files.
    2. If a .git file exists in this project folder, delete it.
    3. $   git init .  

    CREATING_HEROKU_ALLOCATION:

    4. Download heroku CLI and get a heroku account.
    5. [ heroku login ] on git bash terminal
    6. heroku apps:create "prj-name" 

    7. ( Below should all be on one line )

        heroku addons:create 
        heroku-postgresql:hobby-dev 
        --version=12 
        --app      "prj-name" 
        --name "dab-prj-name"

    LINK_REPO_TO_HEROKU_AND_DEPLOY:

    8. git remote add heroku "https://git.heroku.com/prj-name.git"
    9. git remote -v   ## verify remote has been setup
   10. git push heroku master
   11. Browser[ https://prj-name.herokuapp.com/ ]

    -John Mark Isaac Madison

    *NOTE:
        "$" denotes a command to run within gitbash on
        the project folder. To open gitbash in folder you
        usually can "right-click" and select "git bash her"
        from context menu in explorer.