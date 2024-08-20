#!/bin/bash
lowercase=$(echo $1 | tr '[:upper:]' '[:lower:]')
noCaseChange=$(echo $1)
lowercaseSedCommand="s/my/$lowercase/g"
noCaseChangeSedCommand="s/My/$noCaseChange/g"
for file in $(git ls-files | grep my | uniq); 
do 
  newFile=$(echo $file | sed -e $lowercaseSedCommand)
  dir=$(dirname $newFile)
  mkdir -p $dir
  git mv $file $newFile
done

echo "Files with 'my' in the name have been renamed to $lowercase"

for file in $(git ls-files | grep My | uniq); 
do 
  newFile=$(echo $file | sed -e $noCaseChangeSedCommand)
  dir=$(dirname $newFile)
  mkdir -p $dir
  git mv $file $newFile
done

echo "Files with 'My' in the name have been renamed to $1"

# Remove all empty directories
find . -type d -empty -delete

echo "Removed all empty folders."