start "MongoDB" mongod --dbpath=%~dp0db
start "NodeServer" node %~dp0\bin\www