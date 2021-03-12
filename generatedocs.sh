rm -rf docs/
mkdir docs docs/frontend docs/media
var=""
for file in `find src -name "*.jsx"`
do
var=$(echo $file | sed -r "s/.+\/(.+)\..+/\1/");
jsdoc2md -c jsdoc.conf.json --files $file >> docs/frontend/$var.md;
done
cp -r documentation/* docs/
cp README.md docs/
cp src/assets/img/icon.png docs/media/
