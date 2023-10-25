#!/bin/bash

for file in $*; do
	mv $file aspects/$file
	cp aspects/$file sprites/$file
done

for file in sprites/*.png; do
	outfile=sprites/gray/${file#sprites/}
	convert $file -channel RGBA -colorspace gray -separate -average -auto-level $outfile
	convert $outfile -alpha copy -channel alpha -negate +channel -fx '#000' $outfile
done

for file in sprites/*.png sprites/gray/*.png; do
	convert $file -filter Lanczos -resize 24x24 $file
done

git checkout -- sprites