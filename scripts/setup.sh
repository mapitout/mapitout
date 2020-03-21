CURRENT_PATH=`dirname $0`
cp $CURRENT_PATH/.env.template $CURRENT_PATH/../server/src/.env
npm i
npm i --prefix server
npm i --prefix client

echo "Setup Done!"
