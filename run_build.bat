start /b firebase emulators:start --import=./emulatorData --export-on-exit
start /b quasar build -d -m pwa
start /b quasar serve -p 4004 --history -m pwa ./dist/pwa
